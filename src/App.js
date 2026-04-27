import React, { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { lookupFood, FOOD_DB, FOOD_VARIANTS } from './foodDatabase';

// ─── Constants ───────────────────────────────────────────────────────────────
const COLORS = { protein: '#f97316', carbs: '#3b82f6', fat: '#a855f7', calories: '#22c55e' };
const DAILY_GOALS = { calories: 2000, protein: 150, carbs: 200, fat: 65 };
const LOCAL_KEY = 'macro-guest-diary';

function todayStr() { return new Date().toISOString().slice(0, 10); }
function formatDate(d) {
  const today = todayStr();
  const yest = new Date(); yest.setDate(yest.getDate() - 1);
  const yStr = yest.toISOString().slice(0, 10);
  if (d === today) return 'Today';
  if (d === yStr) return 'Yesterday';
  return new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
function sumEntries(entries) {
  return entries.reduce((a, e) => ({
    calories: a.calories + (e.calories || 0),
    protein: a.protein + (e.protein || 0),
    carbs: a.carbs + (e.carbs || 0),
    fat: a.fat + (e.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
}

// ─── Supabase diary helpers ───────────────────────────────────────────────────
async function dbLoadDiary(userId) {
  const { data, error } = await supabase
    .from('diary')
    .select('date, entries')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw error;
  const diary = {};
  (data || []).forEach(row => { diary[row.date] = row.entries; });
  return diary;
}

async function dbSaveDay(userId, date, entries) {
  const { error } = await supabase
    .from('diary')
    .upsert({ user_id: userId, date, entries }, { onConflict: 'user_id,date' });
  if (error) throw error;
}

// ─── Favourites helpers ────────────────────────────────────────────────────────
async function dbLoadFavourites(userId) {
  const { data } = await supabase
    .from('favourites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return data || [];
}

async function dbAddFavourite(userId, item) {
  const { data, error } = await supabase
    .from('favourites')
    .insert({ user_id: userId, name: item.food, macros: item })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function dbRemoveFavourite(userId, id) {
  await supabase.from('favourites').delete().eq('id', id).eq('user_id', userId);
}

// ─── Recent foods helpers ──────────────────────────────────────────────────────
async function dbLoadRecents(userId) {
  const { data } = await supabase
    .from('recents')
    .select('*')
    .eq('user_id', userId)
    .order('used_at', { ascending: false })
    .limit(20);
  return data || [];
}

async function dbUpsertRecent(userId, item) {
  // Use food name as unique key per user — update timestamp if exists
  await supabase.from('recents').upsert(
    { user_id: userId, name: item.food, macros: item, used_at: new Date().toISOString() },
    { onConflict: 'user_id,name' }
  );
}

// ─── Meal template helpers ─────────────────────────────────────────────────────
async function dbLoadMealTemplates(userId) {
  const { data } = await supabase
    .from('meal_templates')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return data || [];
}

async function dbSaveMealTemplate(userId, name, entries) {
  const { data, error } = await supabase
    .from('meal_templates')
    .insert({ user_id: userId, name, entries })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function dbDeleteMealTemplate(userId, id) {
  await supabase.from('meal_templates').delete().eq('id', id).eq('user_id', userId);
}

// ─── Open Food Facts search ───────────────────────────────────────────────────
async function searchOFF(query) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8&fields=product_name,brands,nutriments,serving_quantity,serving_size&lc=en&countries_tags=en:united-kingdom`;
  const res = await fetch(url, { headers: { 'User-Agent': 'MacroTracker/1.0' } });
  const data = await res.json();
  return (data.products || [])
    .filter(p => p.product_name && p.nutriments?.['energy-kcal_100g'] != null)
    .map(p => {
      const n = p.nutriments;
      const servingG = parseFloat(p.serving_quantity) || 100;
      const f = servingG / 100;
      const lbl = p.serving_size ? ` (${p.serving_size})` : ' (per 100g)';
      return {
        food: (p.brands ? `${p.brands} ` : '') + p.product_name + lbl,
        calories: Math.round((n['energy-kcal_100g'] || 0) * f),
        protein: Math.round((n['proteins_100g'] || 0) * f * 10) / 10,
        carbs: Math.round((n['carbohydrates_100g'] || 0) * f * 10) / 10,
        fat: Math.round((n['fat_100g'] || 0) * f * 10) / 10,
      };
    });
}

function parseOFFProduct(p) {
  const n = p.nutriments || {};
  // Try energy-kcal first, fall back to energy (kJ) converted
  const cal100 = n['energy-kcal_100g'] ?? n['energy-kcal'] ??
    (n['energy_100g'] ? n['energy_100g'] / 4.184 : null) ??
    (n['energy'] ? n['energy'] / 4.184 : 0);
  const pro100 = n['proteins_100g'] ?? n['proteins'] ?? 0;
  const carb100 = n['carbohydrates_100g'] ?? n['carbohydrates'] ?? 0;
  const fat100 = n['fat_100g'] ?? n['fat'] ?? 0;
  const servingG = parseFloat(p.serving_quantity) || 100;
  const f = servingG / 100;
  const lbl = p.serving_size ? ` (${p.serving_size})` : ' (per 100g)';
  const name = p.product_name_en || p.product_name_gb || p.product_name || 'Unknown product';
  const brand = p.brands ? p.brands.split(',')[0].trim() + ' ' : '';
  const amount = servingG;
  return {
    food: brand + name + lbl,
    calories: Math.round(cal100 * f),
    protein: Math.round(pro100 * f * 10) / 10,
    carbs: Math.round(carb100 * f * 10) / 10,
    fat: Math.round(fat100 * f * 10) / 10,
    source: 'barcode',
    amount,
    unit: 'g',
    // store per-100 base so user can rescale quantity later
    basePer100: {
      calories: Math.round(cal100), protein: Math.round(pro100 * 10) / 10,
      carbs: Math.round(carb100 * 10) / 10, fat: Math.round(fat100 * 10) / 10,
      amount,
    },
  };
}

async function lookupBarcode(barcode) {
  // Try multiple endpoints — UK first, then world, with full nutriment fields
  const endpoints = [
    `https://uk.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name,product_name_en,product_name_gb,brands,nutriments,serving_quantity,serving_size`,
    `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name,product_name_en,product_name_gb,brands,nutriments,serving_quantity,serving_size`,
    // v0 fallback
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
  ];
  for (const url of endpoints) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'MacroTracker/1.0 (https://github.com/CDMR-dev/Macro-Tracker)' } });
      const d = await r.json();
      const product = d.product || (d.status === 1 ? d.product : null);
      if (product && (product.nutriments?.['energy-kcal_100g'] != null || product.nutriments?.energy_100g != null)) {
        return parseOFFProduct(product);
      }
    } catch {}
  }
  return null;
}

// ─── UI Components ────────────────────────────────────────────────────────────

function MacroRing({ label, value, goal, color }) {
  const pct = Math.min((value / goal) * 100, 100);
  const r = 28, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1e293b" strokeWidth="7" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 36 36)" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
        <text x="36" y="40" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="monospace">
          {Math.round(value)}
        </text>
      </svg>
      <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{label.toUpperCase()}</span>
      <span style={{ fontSize: 10, color, fontFamily: 'monospace' }}>/ {goal}{label === 'calories' ? '' : 'g'}</span>
    </div>
  );
}

function MacroBreakdown({ totals }) {
  const pCal = totals.protein * 4, cCal = totals.carbs * 4, fCal = totals.fat * 9;
  const total = pCal + cCal + fCal;
  if (total === 0) return null;
  const pPct = Math.round((pCal / total) * 100);
  const cPct = Math.round((cCal / total) * 100);
  const fPct = 100 - pPct - cPct;
  const segs = [['Protein', pPct, COLORS.protein], ['Carbs', cPct, COLORS.carbs], ['Fat', fPct, COLORS.fat]];
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
        {segs.map(([l, p, c]) => <div key={l} style={{ width: p + '%', background: c, transition: 'width 0.5s' }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {segs.map(([l, p, c]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#94a3b8' }}>{l} <span style={{ color: c }}>{p}%</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodEntry({ entry, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  // base macros per 100g/ml (stored on entry when first logged, or derived from current macros)
  const [base, setBase] = useState(null);
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('g');
  const [draft, setDraft] = useState({});
  const [mode, setMode] = useState('quantity'); // 'quantity' | 'manual'

  function startEdit() {
    const loggedAmount = entry.amount || 100;
    // Build per-100g base — either stored on entry, or back-calculated from logged amount
    const b = entry.basePer100 ? entry.basePer100 : {
      calories: loggedAmount > 0 ? Math.round((entry.calories / loggedAmount) * 100) : entry.calories,
      protein:  loggedAmount > 0 ? Math.round((entry.protein  / loggedAmount) * 1000) / 10 : entry.protein,
      carbs:    loggedAmount > 0 ? Math.round((entry.carbs    / loggedAmount) * 1000) / 10 : entry.carbs,
      fat:      loggedAmount > 0 ? Math.round((entry.fat      / loggedAmount) * 1000) / 10 : entry.fat,
    };
    setBase(b);
    setQty(String(loggedAmount));
    setUnit(entry.unit || 'g');
    // Set draft macros to current entry values (already correct for loggedAmount)
    setDraft({ food: entry.food, calories: entry.calories, protein: entry.protein, carbs: entry.carbs, fat: entry.fat });
    setMode('quantity');
    setEditing(true);
  }

  // Recalculate macros — takes base explicitly to avoid stale state closure
  function recalcFromQty(newQty, currentBase) {
    const b = currentBase || base;
    if (!b) return;
    const amount = parseFloat(newQty) || 0;
    const factor = amount / 100; // b is always per-100g
    setDraft(d => ({
      food: d.food,
      calories: Math.round(b.calories * factor),
      protein:  Math.round(b.protein  * factor * 10) / 10,
      carbs:    Math.round(b.carbs    * factor * 10) / 10,
      fat:      Math.round(b.fat      * factor * 10) / 10,
    }));
  }

  function handleQtyChange(v) {
    setQty(v);
    recalcFromQty(v, base);
  }

  function handleSave() {
    const amount = parseFloat(qty) || 100;
    onEdit(entry.id, {
      ...draft,
      calories: +draft.calories,
      protein:  +draft.protein,
      carbs:    +draft.carbs,
      fat:      +draft.fat,
      amount,
      unit,
      basePer100: base, // always save so future edits scale correctly
    });
    setEditing(false);
  }

  const inpStyle = (color) => ({
    width: '100%', background: '#0a1628', border: '1px solid #334155',
    borderRadius: 6, color: color || 'white', fontFamily: 'monospace',
    fontSize: 12, padding: '5px 6px', boxSizing: 'border-box',
  });

  if (editing) {
    return (
      <div style={{ background: '#0f172a', border: '1px solid #f97316', borderRadius: 10, padding: '12px' }}>
        {/* Food name */}
        <input value={draft.food} onChange={e => setDraft(d => ({ ...d, food: e.target.value }))}
          style={{ ...inpStyle(), fontSize: 13, marginBottom: 10 }} />

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: '#0a1628', borderRadius: 8, padding: 3, marginBottom: 10, border: '1px solid #1e293b' }}>
          {[['quantity', '⚖️ Adjust quantity'], ['manual', '✏️ Edit macros']].map(([m, l]) => (
            <button key={m} onClick={() => setMode(m)}
              style={{ flex: 1, padding: '6px 4px', border: 'none', borderRadius: 6, fontSize: 11,
                fontFamily: 'monospace', cursor: 'pointer',
                background: mode === m ? '#f97316' : 'none',
                color: mode === m ? 'white' : '#475569' }}>
              {l}
            </button>
          ))}
        </div>

        {mode === 'quantity' ? (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', marginBottom: 6 }}>
              AMOUNT (macros scale automatically)
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                type="text"
                inputMode="decimal"
                value={qty}
                onChange={e => {
                  const v = e.target.value.replace(/[^0-9.]/g, '');
                  handleQtyChange(v);
                }}
                onFocus={e => e.target.select()}
                placeholder="e.g. 150"
                style={{ ...inpStyle(COLORS.calories), flex: 2, fontSize: 18, padding: '8px 10px', fontWeight: 700 }} />
              <select value={unit} onChange={e => { setUnit(e.target.value); }}
                style={{ flex: 1, background: '#0a1628', border: '1px solid #334155', borderRadius: 6,
                  color: '#94a3b8', fontFamily: 'monospace', fontSize: 12, padding: '5px 6px' }}>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="oz">oz</option>
                <option value="serving">serving</option>
              </select>
            </div>
            <div style={{ marginTop: 8, padding: '8px 10px', background: '#0a1628', borderRadius: 8, display: 'flex', gap: 12 }}>
              {[['cal', draft.calories, COLORS.calories], ['pro', draft.protein + 'g', COLORS.protein],
                ['carb', draft.carbs + 'g', COLORS.carbs], ['fat', draft.fat + 'g', COLORS.fat]].map(([l, v, c]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c, fontFamily: 'monospace' }}>{v}</div>
                  <div style={{ fontSize: 9, color: '#475569', fontFamily: 'monospace' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
            {[['calories', 'kcal', COLORS.calories], ['protein', 'pro', COLORS.protein],
              ['carbs', 'carb', COLORS.carbs], ['fat', 'fat', COLORS.fat]].map(([f, l, c]) => (
              <div key={f}>
                <div style={{ fontSize: 9, color: c, fontFamily: 'monospace', marginBottom: 2 }}>{l.toUpperCase()}</div>
                <input type="number" min="0" value={draft[f]}
                  onChange={e => setDraft(d => ({ ...d, [f]: e.target.value }))}
                  style={inpStyle(c)} />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={handleSave}
            style={{ flex: 1, background: '#f97316', border: 'none', borderRadius: 7, padding: 8,
              color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'monospace' }}>
            Save
          </button>
          <button onClick={() => setEditing(false)}
            style={{ flex: 1, background: '#1e293b', border: 'none', borderRadius: 7, padding: 8,
              color: '#94a3b8', fontSize: 12, cursor: 'pointer', fontFamily: 'monospace' }}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const sourceColors = { barcode: '#3b82f6', off: '#a855f7', manual: '#22c55e' };
  const sourceLabel = { barcode: 'SCAN', off: 'OFF', manual: 'MANUAL' };

  return (
    <div onClick={onEdit ? startEdit : undefined}
      style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10,
        padding: '10px 12px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 10, cursor: onEdit ? 'pointer' : 'default' }}
      onMouseOver={e => { if (onEdit) e.currentTarget.style.borderColor = '#334155'; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = '#1e293b'; }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
          {sourceColors[entry.source] && (
            <span style={{ fontSize: 9, background: sourceColors[entry.source] + '20',
              color: sourceColors[entry.source], borderRadius: 3, padding: '1px 5px',
              fontFamily: 'monospace', flexShrink: 0 }}>
              {sourceLabel[entry.source]}
            </span>
          )}
          <span style={{ color: 'white', fontWeight: 600, fontSize: 13, overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {entry.food}
          </span>
          {onEdit && <span style={{ fontSize: 10, color: '#334155', flexShrink: 0 }}>✏︎</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {entry.amount && (
            <span style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace' }}>
              {entry.amount}{entry.unit || 'g'}
            </span>
          )}
          {[['cal', entry.calories, COLORS.calories], ['pro', entry.protein + 'g', COLORS.protein],
            ['carb', entry.carbs + 'g', COLORS.carbs], ['fat', entry.fat + 'g', COLORS.fat]].map(([l, v, c]) => (
            <span key={l} style={{ fontSize: 10, fontFamily: 'monospace', color: c,
              background: c + '18', borderRadius: 3, padding: '1px 6px' }}>{l}: {v}</span>
          ))}
        </div>
      </div>
      {onDelete && <button onClick={e => { e.stopPropagation(); onDelete(entry.id); }}
        style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer',
          fontSize: 15, padding: '2px 5px', flexShrink: 0 }}
        onMouseOver={e => e.target.style.color = '#ef4444'}
        onMouseOut={e => e.target.style.color = '#334155'}>✕</button>}
    </div>
  );
}

function VariantPicker({ foodKey, onSelect, onClose }) {
  const variants = FOOD_VARIANTS[foodKey];
  if (!variants) return null;
  return (
    <div style={{ background: '#0a1628', border: '1px solid #22c55e', borderRadius: 10,
      marginTop: -6, marginBottom: 10, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e293b',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'monospace' }}>
          SELECT VARIANT — {foodKey}
        </span>
        <button onClick={onClose} style={{ background: 'none', border: 'none',
          color: '#475569', cursor: 'pointer', fontSize: 14 }}>✕</button>
      </div>
      {variants.map((v, i) => (
        <button key={i} onClick={() => onSelect(v, foodKey)}
          style={{ width: '100%', background: 'none', border: 'none',
            borderBottom: '1px solid #0f172a', padding: '10px 14px',
            color: '#94a3b8', fontSize: 12, fontFamily: 'monospace',
            cursor: 'pointer', textAlign: 'left' }}
          onMouseOver={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
          <div style={{ marginBottom: 3 }}>{v.label}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['cal', v.calories, '#22c55e'], ['pro', v.protein + 'g', '#f97316'],
              ['carb', v.carbs + 'g', '#3b82f6'], ['fat', v.fat + 'g', '#a855f7']].map(([l, val, c]) => (
              <span key={l} style={{ fontSize: 10, color: c }}>{l}: {val}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

function Suggestions({ query, onSelect }) {
  if (!query || query.length < 2) return null;
  const q = query.toLowerCase().replace(/s$/, '');
  const matches = Object.keys(FOOD_DB).filter(k => k.includes(q) || q.includes(k)).slice(0, 4);
  if (!matches.length) return null;
  return (
    <div style={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: 10, marginTop: -6, marginBottom: 10, overflow: 'hidden' }}>
      {matches.map(m => (
        <button key={m} onClick={() => onSelect(m)}
          style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid #0f172a', padding: '9px 14px', color: '#94a3b8', fontSize: 13, fontFamily: 'monospace', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}
          onMouseOver={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
          <span>{m}</span>
          <span style={{ color: '#475569', fontSize: 11 }}>{FOOD_DB[m][0]} kcal/100g</span>
        </button>
      ))}
    </div>
  );
}

function OFFResults({ results, onSelect, onClose }) {
  if (!results) return null;
  return (
    <div style={{ background: '#0a1628', border: '1px solid #a855f7', borderRadius: 10, marginTop: -6, marginBottom: 10, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#a855f7', fontFamily: 'monospace' }}>BRANDED PRODUCTS — Open Food Facts</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 14 }}>✕</button>
      </div>
      {results.length === 0
        ? <div style={{ padding: '12px 14px', color: '#475569', fontSize: 13, fontFamily: 'monospace' }}>No branded products found. Try a different spelling.</div>
        : results.map((r, i) => (
          <button key={i} onClick={() => onSelect(r)}
            style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid #0f172a', padding: '9px 14px', color: '#94a3b8', fontSize: 12, fontFamily: 'monospace', cursor: 'pointer', textAlign: 'left' }}
            onMouseOver={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
            <div style={{ marginBottom: 2 }}>{r.food}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['cal', r.calories, COLORS.calories], ['pro', r.protein + 'g', COLORS.protein], ['carb', r.carbs + 'g', COLORS.carbs], ['fat', r.fat + 'g', COLORS.fat]].map(([l, v, c]) => (
                <span key={l} style={{ fontSize: 10, color: c }}>{l}: {v}</span>
              ))}
            </div>
          </button>
        ))}
    </div>
  );
}

function DayCard({ dateStr, entries, onClick }) {
  const totals = sumEntries(entries);
  const calPct = Math.min((totals.calories / DAILY_GOALS.calories) * 100, 100);
  const isOver = totals.calories > DAILY_GOALS.calories;
  return (
    <button onClick={onClick} style={{ width: '100%', background: '#0a1628', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}
      onMouseOver={e => e.currentTarget.style.borderColor = '#334155'}
      onMouseOut={e => e.currentTarget.style.borderColor = '#1e293b'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{formatDate(dateStr)}</div>
          <div style={{ color: '#475569', fontSize: 11, fontFamily: 'monospace' }}>{entries.length} item{entries.length !== 1 ? 's' : ''}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: isOver ? '#ef4444' : COLORS.calories, fontWeight: 700, fontSize: 18, fontFamily: 'monospace' }}>{Math.round(totals.calories)}</div>
          <div style={{ color: '#475569', fontSize: 10, fontFamily: 'monospace' }}>kcal</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
        <div style={{ height: 6, background: '#1e293b', borderRadius: 3, flex: 1, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: calPct + '%', background: isOver ? '#ef4444' : COLORS.calories, borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', flexShrink: 0 }}>{Math.round(calPct)}%</span>
      </div>
    </button>
  );
}

function DayDetail({ dateStr, entries, onClose }) {
  const totals = sumEntries(entries);
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000f0', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 500, background: '#020817', borderRadius: '20px 20px 0 0', border: '1px solid #1e293b', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{formatDate(dateStr)}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 22 }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          <div style={{ background: '#0a1628', borderRadius: 12, padding: '16px 8px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
              {[['calories', totals.calories, DAILY_GOALS.calories, COLORS.calories], ['protein', totals.protein, DAILY_GOALS.protein, COLORS.protein], ['carbs', totals.carbs, DAILY_GOALS.carbs, COLORS.carbs], ['fat', totals.fat, DAILY_GOALS.fat, COLORS.fat]].map(([l, v, g, c]) => (
                <MacroRing key={l} label={l} value={v} goal={g} color={c} />
              ))}
            </div>
            <div style={{ padding: '0 8px' }}><MacroBreakdown totals={totals} /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {entries.map(e => <FoodEntry key={e.id} entry={e} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function BarcodeScanner({ onDetected, onClose, onPermissionDenied }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('Starting camera…');
  const [camError, setCamError] = useState('');
  useEffect(() => {
    let stopped = false, stream = null;
    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } });
        if (stopped) { stream.getTracks().forEach(t => t.stop()); return; }
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatus('Point camera at a barcode…');
        const { BrowserMultiFormatReader } = await import('@zxing/browser');
        if (stopped) return;
        new BrowserMultiFormatReader().decodeFromStream(stream, videoRef.current, (result) => {
          if (stopped || !result) return;
          stopped = true;
          onDetected(result.getText());
        });
      } catch (e) {
        if (stopped) return;
        if (e?.name === 'NotAllowedError') onPermissionDenied();
        else setCamError(`Camera error: ${e?.message || e?.name}`);
      }
    }
    start();
    return () => { stopped = true; try { stream?.getTracks().forEach(t => t.stop()); } catch {} };
  }, [onDetected, onPermissionDenied]);
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000f0', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#0a1628', borderRadius: 16, overflow: 'hidden', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #1e293b' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>📷 Scan Barcode</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 22 }}>✕</button>
        </div>
        <div style={{ position: 'relative', background: '#000', aspectRatio: '4/3' }}>
          <video ref={videoRef} playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ width: '72%', height: '32%', border: '2px solid #f97316', borderRadius: 8, boxShadow: '0 0 0 2000px rgba(0,0,0,0.38)' }} />
          </div>
        </div>
        <div style={{ padding: '12px 16px', textAlign: 'center' }}>
          {camError ? <p style={{ color: '#ef4444', fontSize: 12, fontFamily: 'monospace' }}>{camError}</p>
            : <p style={{ color: '#94a3b8', fontSize: 13, fontFamily: 'monospace' }}>⚡ {status}</p>}
        </div>
      </div>
    </div>
  );
}

function ManualEntryModal({ onAdd, onClose }) {
  const [draft, setDraft] = useState({ food: '', calories: '', protein: '', carbs: '', fat: '' });
  const [error, setError] = useState('');

  function handleSave() {
    if (!draft.food.trim()) { setError('Please enter a food name.'); return; }
    if (!draft.calories) { setError('Please enter calories.'); return; }
    onAdd({
      food: draft.food.trim(),
      calories: parseFloat(draft.calories) || 0,
      protein: parseFloat(draft.protein) || 0,
      carbs: parseFloat(draft.carbs) || 0,
      fat: parseFloat(draft.fat) || 0,
    });
    onClose();
  }

  const inp = (field, placeholder, type = 'text') => (
    <input
      type={type} min="0" step="0.1"
      placeholder={placeholder}
      value={draft[field]}
      onChange={e => { setDraft(d => ({ ...d, [field]: e.target.value })); setError(''); }}
      onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
      style={{ width: '100%', background: '#0a1628', border: '1px solid #1e293b', borderRadius: 8,
        padding: '10px 12px', color: 'white', fontSize: 14, fontFamily: 'monospace',
        outline: 'none', boxSizing: 'border-box' }}
      onFocus={e => e.target.style.borderColor = '#f97316'}
      onBlur={e => e.target.style.borderColor = '#1e293b'}
    />
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000cc', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#0a1628', borderRadius: 16,
        border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 16px', borderBottom: '1px solid #1e293b' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>✏️ Add manually</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 22 }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ marginBottom: 10 }}>{inp('food', 'Food name (e.g. Tesco chicken wrap)')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: '#22c55e', fontFamily: 'monospace', marginBottom: 4 }}>CALORIES (kcal)</div>
              {inp('calories', '0', 'number')}
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#f97316', fontFamily: 'monospace', marginBottom: 4 }}>PROTEIN (g)</div>
              {inp('protein', '0', 'number')}
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#3b82f6', fontFamily: 'monospace', marginBottom: 4 }}>CARBS (g)</div>
              {inp('carbs', '0', 'number')}
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#a855f7', fontFamily: 'monospace', marginBottom: 4 }}>FAT (g)</div>
              {inp('fat', '0', 'number')}
            </div>
          </div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: '8px 12px', marginBottom: 12,
            fontSize: 11, color: '#475569', fontFamily: 'monospace', lineHeight: 1.6 }}>
            💡 Tip: find macros on the back of the packet under "Nutrition" and enter them here.
          </div>
          {error && <div style={{ color: '#ef4444', fontSize: 12, fontFamily: 'monospace', marginBottom: 10 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave}
              style={{ flex: 1, background: '#f97316', border: 'none', borderRadius: 10,
                padding: 12, color: 'white', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: 'monospace' }}>
              Add to log
            </button>
            <button onClick={onClose}
              style={{ flex: 1, background: '#1e293b', border: 'none', borderRadius: 10,
                padding: 12, color: '#94a3b8', fontSize: 14,
                cursor: 'pointer', fontFamily: 'monospace' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAddPanel({ recents, favourites, mealTemplates, onAddFood, onToggleFavourite, onAddTemplate, onDeleteTemplate, onSaveAsTemplate, todayEntries, isFavourite }) {
  const [activeTab, setActiveTab] = useState("recents");
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const tabs = [
    ["recents", "🕐 Recent"],
    ["favourites", "⭐ Saved"],
    ["templates", "🍽️ Meals"],
  ];

  const MacroChips = ({ item }) => (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 3 }}>
      {[["cal", item.calories, COLORS.calories], ["pro", (item.protein || 0) + "g", COLORS.protein],
        ["carb", (item.carbs || 0) + "g", COLORS.carbs], ["fat", (item.fat || 0) + "g", COLORS.fat]].map(([l, v, c]) => (
        <span key={l} style={{ fontSize: 10, color: c, background: c + "18", borderRadius: 3, padding: "1px 5px", fontFamily: "monospace" }}>{l}: {v}</span>
      ))}
    </div>
  );

  return (
    <div style={{ background: "#0a1628", border: "1px solid #1e293b", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e293b" }}>
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ flex: 1, padding: "10px 4px", border: "none", background: "none",
              fontSize: 11, fontFamily: "monospace", cursor: "pointer",
              color: activeTab === id ? "#f97316" : "#475569",
              borderBottom: activeTab === id ? "2px solid #f97316" : "2px solid transparent" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Recents */}
      {activeTab === "recents" && (
        <div>
          {recents.length === 0 ? (
            <div style={{ padding: "20px 14px", color: "#334155", fontSize: 12, fontFamily: "monospace", textAlign: "center" }}>
              Foods you log will appear here automatically.
            </div>
          ) : recents.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #0f172a", padding: "10px 14px", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "white", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{r.macros?.food || r.name}</div>
                <MacroChips item={r.macros || {}} />
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => onToggleFavourite(r.macros || {})}
                  title={isFavourite(r.macros?.food || r.name) ? "Remove from saved" : "Save"}
                  style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer",
                    color: isFavourite(r.macros?.food || r.name) ? "#f97316" : "#334155" }}>
                  {isFavourite(r.macros?.food || r.name) ? "★" : "☆"}
                </button>
                <button onClick={() => onAddFood(r.macros || {})}
                  style={{ background: "#f97316", border: "none", borderRadius: 6, padding: "5px 10px",
                    color: "white", fontSize: 11, fontFamily: "monospace", cursor: "pointer", fontWeight: 700 }}>
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Favourites */}
      {activeTab === "favourites" && (
        <div>
          {favourites.length === 0 ? (
            <div style={{ padding: "20px 14px", color: "#334155", fontSize: 12, fontFamily: "monospace", textAlign: "center" }}>
              Star foods from your recent list to save them here.
            </div>
          ) : favourites.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #0f172a", padding: "10px 14px", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "white", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{f.macros?.food || f.name}</div>
                <MacroChips item={f.macros || {}} />
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => onToggleFavourite(f.macros || {}, f.id)}
                  title="Remove from saved"
                  style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "#f97316" }}>★</button>
                <button onClick={() => onAddFood(f.macros || {})}
                  style={{ background: "#f97316", border: "none", borderRadius: 6, padding: "5px 10px",
                    color: "white", fontSize: 11, fontFamily: "monospace", cursor: "pointer", fontWeight: 700 }}>
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Meal Templates */}
      {activeTab === "templates" && (
        <div>
          {/* Save today as template */}
          {todayEntries.length > 0 && (
            <div style={{ padding: "10px 14px", borderBottom: "1px solid #0f172a" }}>
              {savingTemplate ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <input value={templateName} onChange={e => setTemplateName(e.target.value)}
                    placeholder="Meal name e.g. My usual breakfast"
                    style={{ flex: 1, background: "#0f172a", border: "1px solid #334155", borderRadius: 6,
                      color: "white", fontFamily: "monospace", fontSize: 12, padding: "6px 8px" }}
                    onKeyDown={e => { if (e.key === "Enter" && templateName.trim()) { onSaveAsTemplate(templateName.trim()); setSavingTemplate(false); setTemplateName(""); } }} />
                  <button onClick={() => { if (templateName.trim()) { onSaveAsTemplate(templateName.trim()); setSavingTemplate(false); setTemplateName(""); } }}
                    style={{ background: "#f97316", border: "none", borderRadius: 6, padding: "6px 10px",
                      color: "white", fontSize: 11, fontFamily: "monospace", cursor: "pointer", fontWeight: 700 }}>
                    Save
                  </button>
                  <button onClick={() => { setSavingTemplate(false); setTemplateName(""); }}
                    style={{ background: "#1e293b", border: "none", borderRadius: 6, padding: "6px 10px",
                      color: "#94a3b8", fontSize: 11, cursor: "pointer" }}>✕</button>
                </div>
              ) : (
                <button onClick={() => setSavingTemplate(true)}
                  style={{ width: "100%", background: "#1e293b", border: "1px dashed #334155", borderRadius: 8,
                    padding: "8px", color: "#94a3b8", fontSize: 12, fontFamily: "monospace", cursor: "pointer" }}>
                  💾 Save today's log as a meal template
                </button>
              )}
            </div>
          )}

          {mealTemplates.length === 0 ? (
            <div style={{ padding: "20px 14px", color: "#334155", fontSize: 12, fontFamily: "monospace", textAlign: "center" }}>
              Save today's log as a template to quickly re-add whole meals.
            </div>
          ) : mealTemplates.map((t, i) => {
            const totals = (t.entries || []).reduce((a, e) => ({
              calories: a.calories + (e.calories || 0), protein: a.protein + (e.protein || 0),
              carbs: a.carbs + (e.carbs || 0), fat: a.fat + (e.fat || 0),
            }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
            return (
              <div key={i} style={{ borderBottom: "1px solid #0f172a", padding: "10px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => onDeleteTemplate(t.id)}
                      style={{ background: "none", border: "none", color: "#334155", cursor: "pointer", fontSize: 14 }}
                      onMouseOver={e => e.target.style.color = "#ef4444"}
                      onMouseOut={e => e.target.style.color = "#334155"}>✕</button>
                    <button onClick={() => onAddTemplate(t.entries)}
                      style={{ background: "#f97316", border: "none", borderRadius: 6, padding: "5px 10px",
                        color: "white", fontSize: 11, fontFamily: "monospace", cursor: "pointer", fontWeight: 700 }}>
                      + Add all
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace", marginBottom: 4 }}>
                  {(t.entries || []).length} items
                </div>
                <MacroChips item={totals} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleGoogle() {
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) { setError(error.message); setLoading(false); }
  }

  async function handleEmail() {
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setLoading(true); setError(''); setMessage('');
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); }
      else onClose();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); }
      else { setMessage('Check your email to confirm your account, then log in.'); }
      setLoading(false);
    }
  }

  const inp = { width: '100%', background: '#0a1628', border: '1px solid #1e293b', borderRadius: 10, padding: '11px 14px', color: 'white', fontSize: 14, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000cc', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 380, background: '#0a1628', borderRadius: 16, border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #1e293b' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{mode === 'login' ? 'Log In' : 'Create Account'}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 22 }}>✕</button>
        </div>
        <div style={{ padding: 20 }}>
          <button onClick={handleGoogle} disabled={loading}
            style={{ width: '100%', background: 'white', border: 'none', borderRadius: 10, padding: '11px', color: '#1a1a1a', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#1e293b' }} />
            <span style={{ color: '#475569', fontSize: 12, fontFamily: 'monospace' }}>or use email</span>
            <div style={{ flex: 1, height: 1, background: '#1e293b' }} />
          </div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ ...inp, marginBottom: 8 }} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={{ ...inp, marginBottom: 12 }}
            onKeyDown={e => { if (e.key === 'Enter') handleEmail(); }} />
          {error && <div style={{ color: '#ef4444', fontSize: 12, fontFamily: 'monospace', marginBottom: 10 }}>{error}</div>}
          {message && <div style={{ color: '#22c55e', fontSize: 12, fontFamily: 'monospace', marginBottom: 10 }}>{message}</div>}
          <button onClick={handleEmail} disabled={loading}
            style={{ width: '100%', background: '#f97316', border: 'none', borderRadius: 10, padding: 12, color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'monospace', marginBottom: 12 }}>
            {loading ? '…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
          <button onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(''); setMessage(''); }}
            style={{ width: '100%', background: 'none', border: 'none', color: '#475569', fontSize: 12, fontFamily: 'monospace', cursor: 'pointer' }}>
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [diary, setDiary] = useState({});
  const [view, setView] = useState('today');
  const [detailDate, setDetailDate] = useState(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [scanning, setScanning] = useState(false);
  const [barcodeLoading, setBarcodeLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [offResults, setOffResults] = useState(null);
  const [variantKey, setVariantKey] = useState(null);
  const [offLoading, setOffLoading] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [recents, setRecents] = useState([]);
  const [mealTemplates, setMealTemplates] = useState([]);
  const inputRef = useRef(null);
  const today = todayStr();

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load diary + user-specific data
  useEffect(() => {
    if (user) {
      dbLoadDiary(user.id).then(setDiary).catch(() => {});
      dbLoadFavourites(user.id).then(setFavourites).catch(() => {});
      dbLoadRecents(user.id).then(setRecents).catch(() => {});
      dbLoadMealTemplates(user.id).then(setMealTemplates).catch(() => {});
    } else {
      try { const s = localStorage.getItem(LOCAL_KEY); if (s) setDiary(JSON.parse(s)); } catch {}
      setFavourites([]); setRecents([]); setMealTemplates([]);
    }
  }, [user]);

  const todayEntries = diary[today] || [];
  const totals = sumEntries(todayEntries);
  const historyDates = Object.keys(diary).filter(d => d !== today).sort((a, b) => b.localeCompare(a));

  async function saveDiary(newDiary) {
    setDiary(newDiary);
    if (user) {
      setSaveStatus('saving');
      try {
        await dbSaveDay(user.id, today, newDiary[today] || []);
        setSaveStatus('saved');
      } catch { setSaveStatus('error'); }
      setTimeout(() => setSaveStatus(''), 2000);
    } else {
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(newDiary)); } catch {}
    }
  }

  function addEntry(result, source = 'text') {
    const entry = { ...result, id: Date.now(), source };
    const newDiary = { ...diary, [today]: [...todayEntries, entry] };
    saveDiary(newDiary);
    // Track in recents for logged-in users
    if (user && result.food) {
      dbUpsertRecent(user.id, result).then(() =>
        dbLoadRecents(user.id).then(setRecents)
      ).catch(() => {});
    }
  }

  function handleAddFromQuick(item) {
    addEntry({ ...item, source: 'text' });
  }

  async function handleToggleFavourite(item, existingId) {
    if (!user) return;
    const alreadyFav = existingId || favourites.find(f => f.name === item.food)?.id;
    if (alreadyFav) {
      await dbRemoveFavourite(user.id, alreadyFav);
      setFavourites(prev => prev.filter(f => f.id !== alreadyFav));
    } else {
      const saved = await dbAddFavourite(user.id, item);
      setFavourites(prev => [saved, ...prev]);
    }
  }

  function isFavourite(foodName) {
    return favourites.some(f => f.name === foodName);
  }

  async function handleAddTemplate(entries) {
    entries.forEach(e => {
      const { id: _id, ...rest } = e;
      addEntry({ ...rest, source: 'text' });
    });
  }

  async function handleSaveAsTemplate(name) {
    if (!user) return;
    const saved = await dbSaveMealTemplate(user.id, name, todayEntries);
    setMealTemplates(prev => [saved, ...prev]);
  }

  async function handleDeleteTemplate(id) {
    if (!user) return;
    await dbDeleteMealTemplate(user.id, id);
    setMealTemplates(prev => prev.filter(t => t.id !== id));
  }

  function handleAdd(value) {
    const query = (value || input).trim();
    if (!query) return;
    setError(''); setOffResults(null); setVariantKey(null);
    const result = lookupFood(query);
    if (result) {
      // Check if this food has variants
      const q = query.toLowerCase().replace(/^[\d.]+\s*(g|ml|l|kg|oz|grams?)?\s+/, '').replace(/s$/, '').trim();
      const varKey = Object.keys(FOOD_VARIANTS).find(k => q.includes(k) || k.includes(q));
      if (varKey) {
        setInput(varKey);
        setVariantKey(varKey);
        return;
      }
      // Derive the logged amount from the query (e.g. "150g chicken" → 150)
      const metricMatch = query.match(/^([\d.]+)\s*(g|ml|l(?:itres?)?)/i);
      const loggedAmount = metricMatch ? parseFloat(metricMatch[1]) : 100;
      const loggedUnit = metricMatch ? (metricMatch[2].toLowerCase().startsWith('l') ? 'ml' : metricMatch[2].toLowerCase()) : 'g';
      // Store per-100 base so quantity can be adjusted later
      const factor = loggedAmount / 100;
      const basePer100 = {
        calories: factor > 0 ? Math.round(result.calories / factor) : result.calories,
        protein:  factor > 0 ? Math.round((result.protein  / factor) * 10) / 10 : result.protein,
        carbs:    factor > 0 ? Math.round((result.carbs    / factor) * 10) / 10 : result.carbs,
        fat:      factor > 0 ? Math.round((result.fat      / factor) * 10) / 10 : result.fat,
      };
      addEntry({ ...result, amount: loggedAmount, unit: loggedUnit, basePer100 });
      setInput(''); inputRef.current?.focus(); return;
    }
    // Not in local DB — search Open Food Facts
    setOffLoading(true);
    searchOFF(query).then(results => {
      setOffResults(results);
      setOffLoading(false);
    }).catch(() => {
      setError(`"${query}" not found. Try a different spelling or more specific name.`);
      setOffLoading(false);
    });
  }

  function handleVariantSelect(variant, foodKey) {
    addEntry({
      food: foodKey + ' (' + variant.label + ')',
      calories: variant.calories,
      protein: variant.protein,
      carbs: variant.carbs,
      fat: variant.fat,
      basePer100: variant,
      amount: 100,
      unit: 'g',
    });
    setVariantKey(null);
    setInput('');
    inputRef.current?.focus();
  }

  function handleOFFSelect(result) {
    addEntry({ ...result, source: 'off' });
    setOffResults(null);
    setInput('');
    inputRef.current?.focus();
  }

  function handleDeleteToday(id) {
    const newDiary = { ...diary, [today]: todayEntries.filter(e => e.id !== id) };
    saveDiary(newDiary);
  }

  function handleEditToday(id, updates) {
    const newDiary = { ...diary, [today]: todayEntries.map(e => e.id === id ? { ...e, ...updates } : e) };
    saveDiary(newDiary);
  }

  function handleManualAdd(result) {
    addEntry({ ...result, source: 'manual' });
  }

  const handleDetected = useCallback(async (barcode) => {
    setScanning(false); setBarcodeLoading(true); setError('');
    const result = await lookupBarcode(barcode);
    if (result) {
      const entry = { ...result, id: Date.now(), source: 'barcode' };
      setDiary(prev => {
        const todayList = prev[todayStr()] || [];
        const newDiary = { ...prev, [todayStr()]: [...todayList, entry] };
        if (user) {
          dbSaveDay(user.id, todayStr(), newDiary[todayStr()]).catch(() => {});
        } else {
          try { localStorage.setItem(LOCAL_KEY, JSON.stringify(newDiary)); } catch {}
        }
        return newDiary;
      });
    } else {
      setError('Barcode not found. Try typing the product name.');
    }
    setBarcodeLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020817; color: white; font-family: monospace; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes slideUp { from { transform:translateY(40px); opacity:0; } to { transform:none; opacity:1; } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
      `}</style>

      {scanning && <BarcodeScanner onDetected={handleDetected} onClose={() => setScanning(false)} onPermissionDenied={() => setScanning(false)} />}
      {detailDate && <DayDetail dateStr={detailDate} entries={diary[detailDate] || []} onClose={() => setDetailDate(null)} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showManual && <ManualEntryModal onAdd={handleManualAdd} onClose={() => setShowManual(false)} />}

      <div style={{ minHeight: '100vh', background: '#020817', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 60px' }}>
        <div style={{ width: '100%', maxWidth: 500 }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: '#f97316', letterSpacing: '0.2em', marginBottom: 4 }}>NUTRITION TRACKER · UK</div>
              <h1 style={{ fontSize: 32, fontFamily: 'Fraunces, serif', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>Macro Tracker</h1>
              {saveStatus && <div style={{ fontSize: 11, color: saveStatus === 'error' ? '#ef4444' : saveStatus === 'saving' ? '#475569' : '#22c55e', marginTop: 4 }}>
                {saveStatus === 'saving' ? 'saving…' : saveStatus === 'saved' ? '✓ saved' : '⚠ save failed'}
              </div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              {user ? (
                <div>
                  <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>{user.email || 'Logged in'}</div>
                  <button onClick={() => supabase.auth.signOut()}
                    style={{ background: '#1e293b', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#94a3b8', fontSize: 11, cursor: 'pointer', fontFamily: 'monospace' }}>
                    Log out
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Guest mode</div>
                  <button onClick={() => setShowAuth(true)}
                    style={{ background: '#f97316', border: 'none', borderRadius: 8, padding: '6px 12px', color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}>
                    Log in / Sign up
                  </button>
                </div>
              )}
            </div>
          </div>

          {!user && (
            <div style={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
              👋 You're using guest mode — your data saves in this browser only. <button onClick={() => setShowAuth(true)} style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', padding: 0 }}>Create a free account</button> to save your diary permanently and access it on any device.
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#0a1628', borderRadius: 10, padding: 3, marginBottom: 20, border: '1px solid #1e293b' }}>
            {[['today', 'Today'], ['history', 'History']].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)}
                style={{ flex: 1, padding: 9, border: 'none', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', fontWeight: 600, cursor: 'pointer', background: view === v ? '#f97316' : 'none', color: view === v ? 'white' : '#475569' }}>
                {l}
              </button>
            ))}
          </div>

          {/* Today */}
          {view === 'today' && <>
            <div style={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: 16, padding: '20px 16px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: totals.calories > 0 ? 16 : 0 }}>
                {[['calories', totals.calories, DAILY_GOALS.calories, COLORS.calories], ['protein', totals.protein, DAILY_GOALS.protein, COLORS.protein], ['carbs', totals.carbs, DAILY_GOALS.carbs, COLORS.carbs], ['fat', totals.fat, DAILY_GOALS.fat, COLORS.fat]].map(([l, v, g, c]) => (
                  <MacroRing key={l} label={l} value={v} goal={g} color={c} />
                ))}
              </div>
              <MacroBreakdown totals={totals} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input ref={inputRef} value={input}
                onChange={e => { setInput(e.target.value); setError(''); setOffResults(null); }}
                onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
                placeholder="e.g. 1 banana, 150g chicken breast, For Goodness Shakes…"
                style={{ flex: 1, background: '#0a1628', border: '1px solid #1e293b', borderRadius: 10, padding: '12px 14px', color: 'white', fontSize: 14, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#f97316'}
                onBlur={e => e.target.style.borderColor = '#1e293b'} />
              <button onClick={() => handleAdd()} disabled={offLoading}
                style={{ background: '#f97316', border: 'none', borderRadius: 10, padding: '12px 16px', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {offLoading ? '…' : '+ Log'}
              </button>
            </div>

            <Suggestions query={input} onSelect={s => { setInput(s); inputRef.current?.focus(); }} />
            <OFFResults results={offResults} onSelect={handleOFFSelect} onClose={() => setOffResults(null)} />
            {variantKey && <VariantPicker foodKey={variantKey} onSelect={handleVariantSelect} onClose={() => setVariantKey(null)} />}

            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button onClick={() => { setError(''); setScanning(true); }}
                style={{ flex: 1, background: '#0a1628', border: '1px dashed #334155', borderRadius: 10, padding: 11, color: barcodeLoading ? '#f97316' : '#94a3b8', fontSize: 13, fontFamily: 'monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {barcodeLoading ? '⚡ Looking up…' : '📷 Scan Barcode'}
              </button>
              <button onClick={() => { setError(''); setOffResults(null); setShowManual(true); }}
                style={{ flex: 1, background: '#0a1628', border: '1px dashed #334155', borderRadius: 10, padding: 11, color: '#94a3b8', fontSize: 13, fontFamily: 'monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94a3b8'; }}>
                ✏️ Add manually
              </button>
            </div>

            {/* Quick Add button — only for logged-in users */}
            {user && (
              <button onClick={() => setShowQuickAdd(p => !p)}
                style={{ width: '100%', marginBottom: 12, background: showQuickAdd ? '#1e293b' : '#0a1628',
                  border: '1px solid ' + (showQuickAdd ? '#f97316' : '#1e293b'),
                  borderRadius: 10, padding: '9px 14px', color: showQuickAdd ? '#f97316' : '#475569',
                  fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>⭐ Recent & saved foods {recents.length > 0 ? `(${recents.length})` : ''}</span>
                <span>{showQuickAdd ? '▲' : '▼'}</span>
              </button>
            )}

            {showQuickAdd && user && (
              <QuickAddPanel
                recents={recents}
                favourites={favourites}
                mealTemplates={mealTemplates}
                onAddFood={handleAddFromQuick}
                onToggleFavourite={handleToggleFavourite}
                onAddTemplate={handleAddTemplate}
                onSaveAsTemplate={handleSaveAsTemplate}
                onDeleteTemplate={handleDeleteTemplate}
                todayEntries={todayEntries}
                isFavourite={isFavourite}
              />
            )}

            {error && <div style={{ background: '#ef444415', border: '1px solid #ef4444', borderRadius: 8, padding: '10px 14px', color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</div>}

            {todayEntries.length > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: '#475569', fontSize: 11, letterSpacing: '0.12em' }}>TODAY — {todayEntries.length} ITEM{todayEntries.length !== 1 ? 'S' : ''}</span>
                  <button onClick={() => saveDiary({ ...diary, [today]: [] })}
                    style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', padding: '2px 6px' }}
                    onMouseOver={e => e.target.style.color = '#ef4444'} onMouseOut={e => e.target.style.color = '#475569'}>clear all</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {todayEntries.map(e => <FoodEntry key={e.id} entry={e} onDelete={handleDeleteToday} onEdit={handleEditToday} />)}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 20px', color: '#1e293b', fontSize: 12, lineHeight: 2 }}>
                No food logged yet.<br />
                Try: "1 banana" · "150g chicken breast"<br />
                "2 eggs" · "For Goodness Shakes protein"
              </div>
            )}
          </>}

          {/* History */}
          {view === 'history' && (
            !user ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#475569', fontSize: 13, lineHeight: 2 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
                Diary history requires an account.<br />
                <button onClick={() => setShowAuth(true)}
                  style={{ background: '#f97316', border: 'none', borderRadius: 10, padding: '10px 20px', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'monospace', marginTop: 16 }}>
                  Create free account
                </button>
              </div>
            ) : historyDates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#1e293b', fontSize: 13, lineHeight: 2 }}>
                No history yet.<br />Past days will appear here automatically.
              </div>
            ) : (
              <div>
                <div style={{ color: '#475569', fontSize: 11, letterSpacing: '0.12em', marginBottom: 12 }}>{historyDates.length} PREVIOUS DAY{historyDates.length !== 1 ? 'S' : ''}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {historyDates.map(d => <DayCard key={d} dateStr={d} entries={diary[d] || []} onClick={() => setDetailDate(d)} />)}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
