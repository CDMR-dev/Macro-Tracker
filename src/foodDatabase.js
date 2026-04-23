// Food database — [calories, protein, carbs, fat] per 100g or 100ml
export const FOOD_DB = {
  // Fruit
  "banana": [89,1.1,23,0.3], "apple": [52,0.3,14,0.2], "orange": [47,0.9,12,0.1],
  "grapes": [69,0.7,18,0.2], "strawberries": [32,0.7,7.7,0.3], "blueberries": [57,0.7,14,0.3],
  "mango": [60,0.8,15,0.4], "pineapple": [50,0.5,13,0.1], "watermelon": [30,0.6,7.5,0.2],
  "avocado": [160,2,9,15], "pear": [57,0.4,15,0.1], "peach": [39,0.9,10,0.3],
  "kiwi": [61,1.1,15,0.5], "plum": [46,0.7,11,0.3], "raspberry": [52,1.2,12,0.7],
  "blackberries": [43,1.4,10,0.5], "cherries": [63,1.1,16,0.2], "lemon": [29,1.1,9,0.3],
  "lime": [30,0.7,11,0.2], "grapefruit": [42,0.8,11,0.1], "apricot": [48,1.4,11,0.4],
  "dates": [277,1.8,75,0.2], "pomegranate": [83,1.7,19,1.2], "coconut": [354,3.3,15,33],
  "papaya": [43,0.5,11,0.3], "nectarine": [44,1.1,11,0.3], "fig": [74,0.8,19,0.3],
  // Vegetables
  "broccoli": [34,2.8,7,0.4], "spinach": [23,2.9,3.6,0.4], "carrot": [41,0.9,10,0.2],
  "tomato": [18,0.9,3.9,0.2], "cucumber": [15,0.7,3.6,0.1], "onion": [40,1.1,9.3,0.1],
  "potato": [77,2,17,0.1], "sweet potato": [86,1.6,20,0.1], "peas": [81,5.4,14,0.4],
  "corn": [86,3.2,19,1.2], "mushroom": [22,3.1,3.3,0.3], "courgette": [17,1.2,3.1,0.3],
  "pepper": [31,1,6,0.3], "lettuce": [15,1.4,2.9,0.2], "celery": [16,0.7,3,0.2],
  "cabbage": [25,1.3,5.8,0.1], "cauliflower": [25,1.9,5,0.3], "kale": [49,4.3,9,0.9],
  "green beans": [31,1.8,7,0.2], "asparagus": [20,2.2,3.7,0.1], "beetroot": [43,1.6,10,0.1],
  "parsnip": [75,1.8,18,0.3], "leek": [61,1.5,14,0.3], "garlic": [149,6.4,33,0.5],
  "ginger": [80,1.8,18,0.8], "butternut squash": [45,1,12,0.1], "aubergine": [25,1,6,0.2],
  "rocket": [25,2.6,3.6,0.7], "spring onion": [32,1.8,7.3,0.2], "fennel": [31,1.2,7.3,0.2],
  "swede": [38,1.1,9,0.1], "turnip": [28,0.9,6.4,0.1],
  // Meat & Fish
  "chicken breast": [165,31,0,3.6], "chicken thigh": [209,26,0,11],
  "beef mince": [254,17,0,20], "beef steak": [271,26,0,18],
  "pork chop": [231,25,0,14], "bacon": [541,37,0,45], "sausage": [301,11,3,27],
  "salmon": [208,20,0,13], "tuna": [132,28,0,1.3], "cod": [82,18,0,0.7],
  "prawns": [99,21,0,1.1], "haddock": [79,17,0,0.6], "mackerel": [305,19,0,25],
  "turkey": [189,29,0,7], "lamb": [282,25,0,20], "duck": [337,19,0,29],
  "chorizo": [455,24,1.9,40], "ham": [107,17,0.5,4], "salami": [425,21,2.5,37],
  "pepperoni": [494,21,1.5,45], "sea bass": [97,18,0,2.5], "trout": [141,20,0,6.2],
  "sardines": [208,25,0,12], "crab": [72,15,0.5,1], "mussels": [86,12,3.7,2.2],
  "venison": [158,26,0,6], "liver": [135,21,3.9,3.8],
  // Dairy & Eggs
  "egg": [155,13,1.1,11], "whole milk": [61,3.2,4.8,3.3],
  "semi skimmed milk": [46,3.4,4.7,1.6], "skimmed milk": [34,3.4,5,0.2],
  "cheddar": [403,25,0.1,33], "greek yogurt": [97,9,4,5], "yogurt": [61,3.5,7,1.5],
  "butter": [717,0.9,0.1,81], "cream cheese": [342,5.9,3.8,34],
  "mozzarella": [280,17,2.2,22], "parmesan": [431,38,3.2,29],
  "double cream": [453,1.7,2.7,48], "sour cream": [193,2.1,4.6,19],
  "cottage cheese": [98,11,3.4,4.3], "brie": [334,21,0.5,28],
  "oat milk": [46,1,6.6,1.5], "almond milk": [17,0.6,1.4,1.1],
  "soya milk": [39,3.3,2.5,1.8], "coconut milk": [230,2.3,5.5,24],
  "feta": [264,14,4.1,21], "halloumi": [321,22,0.5,25], "stilton": [410,23,0.1,35],
  "skyr": [63,11,4,0.2], "quark": [67,12,4,0.2], "fromage frais": [58,6.8,5.7,0.8],
  // Grains & Bread
  "white rice": [130,2.7,28,0.3], "brown rice": [123,2.6,26,1],
  "pasta": [131,5,25,1.1], "white bread": [265,9,51,3.2],
  "wholemeal bread": [247,12,42,3.8], "sourdough": [260,9,49,1.5],
  "oats": [389,17,66,7], "porridge": [71,2.5,12,1.4],
  "granola": [471,10,64,20], "cornflakes": [357,7,84,0.9],
  "weetabix": [362,11,68,2], "bagel": [250,10,48,1.6],
  "naan": [317,8.9,56,7.4], "pitta": [274,9.1,56,1.2],
  "rice cake": [392,7.7,82,2.8], "croissant": [406,8.2,46,21],
  "quinoa": [120,4.4,22,1.9], "couscous": [176,6.4,37,0.6],
  "tortilla wrap": [306,8.3,52,7.2], "crumpet": [198,6.8,40,0.9],
  "english muffin": [247,9.2,47,2.8], "brioche": [369,9,44,17],
  "warburtons white": [234,8.5,45,2], "warburtons wholemeal": [218,10,38,3],
  "hovis best of both": [226,9.5,40,2.5], "kingsmill 50/50": [228,9.5,41,2.5],
  // Pulses & Nuts
  "chickpeas": [164,8.9,27,2.6], "lentils": [116,9,20,0.4],
  "kidney beans": [127,8.7,22,0.5], "black beans": [132,8.9,24,0.5],
  "edamame": [121,11,8.9,5.2], "tofu": [76,8,1.9,4.8],
  "almonds": [579,21,22,50], "walnuts": [654,15,14,65],
  "cashews": [553,18,30,44], "peanuts": [567,26,16,49],
  "peanut butter": [588,25,20,50], "almond butter": [614,21,19,56],
  "sunflower seeds": [584,21,20,51], "pumpkin seeds": [559,30,11,49],
  "chia seeds": [486,17,42,31], "tahini": [595,17,21,54],
  "hummus": [166,8,14,10],
  // Sweeteners & Spreads
  "honey": [304,0.3,82,0], "maple syrup": [260,0,67,0.1],
  "jam": [261,0.5,69,0.1], "marmite": [264,36,20,0.5],
  "nutella": [539,6.3,58,31], "sugar": [387,0,100,0],
  "golden syrup": [325,0.3,85,0], "peanut butter smooth": [588,25,20,50],
  // Oils & Condiments
  "olive oil": [884,0,0,100], "vegetable oil": [884,0,0,100],
  "coconut oil": [862,0,0,100], "mayonnaise": [680,1,0.6,75],
  "ketchup": [112,1.5,27,0.1], "mustard": [66,4.4,5.3,3.3],
  "soy sauce": [53,8.1,5,0], "hot sauce": [31,1.3,5.6,0.6],
  "pesto": [430,6.8,5,43], "tomato puree": [76,3.8,17,0.1],
  "heinz ketchup": [112,1.5,27,0.1], "heinz baked beans": [78,4.9,13,0.4],
  "branston pickle": [131,0.8,33,0.1],
  // Coffee & Drinks (per 100ml)
  "espresso": [9,0.6,1.7,0.2], "americano": [5,0.4,0.7,0.1],
  "latte": [55,3.8,5.3,2.1], "oat milk latte": [52,1.4,7.8,1.8],
  "cappuccino": [40,2.8,3.8,1.6], "flat white": [55,3.9,5.3,2.2],
  "cortado": [48,3.2,4.5,1.9], "macchiato": [13,0.9,1.5,0.5],
  "mocha": [80,3.5,11,3.2], "cold brew": [3,0.4,0.5,0.1],
  "black coffee": [2,0.3,0,0], "green tea": [1,0,0.2,0],
  "herbal tea": [1,0,0.2,0], "whole milk": [61,3.2,4.8,3.3],
  "orange juice": [45,0.7,10,0.2], "apple juice": [46,0.1,11,0.1],
  "cola": [42,0,10.6,0], "beer": [43,0.5,3.6,0],
  "wine": [83,0.1,2.6,0], "spirits": [222,0,0,0],
  "smoothie": [55,0.8,13,0.2], "energy drink": [45,0.5,11,0],
  "lucozade sport": [26,0,6.4,0], "ribena": [48,0.1,12,0],
  "oatly oat milk": [46,1,6.6,1.5], "oatly barista": [60,1,7.5,3],
  // Snacks & Biscuits
  "chocolate": [546,5,60,31], "milk chocolate": [535,7.6,59,30],
  "dark chocolate": [598,5,46,43], "crisps": [536,7,53,33],
  "popcorn": [387,13,78,4.5], "digestive biscuit": [471,6.3,63,20],
  "hobnob": [467,7,62,22], "shortbread": [498,5.3,65,24],
  "jaffa cake": [374,4.3,77,5.4], "kit kat": [508,6.4,63,26],
  "cadbury dairy milk": [534,8,57,30], "galaxy chocolate": [530,6.5,60,29],
  "walkers ready salted": [527,6.5,53,33], "pringles original": [544,5,52,35],
  "nakd bar": [360,8,55,11], "trek protein bar": [398,20,44,14],
  "grenade carb killa bar": [358,38,30,13],
  // Protein & Supplements (per 100g powder)
  "whey protein": [382,75,8,5], "whey isolate": [370,86,3,1.5],
  "casein protein": [360,72,10,4], "pea protein": [357,75,7,5],
  "plant protein": [350,68,12,5], "creatine": [0,0,0,0],
  "colostrum powder": [430,37,35,17], "collagen powder": [364,90,0,0.5],
  "bcaa": [210,52,0,0], "protein powder": [382,75,8,5],
  "spirulina": [290,57,24,8], "greens powder": [280,18,45,4],
  "for goodness shakes protein": [53,7.7,4.9,0.6],
  "myprotein impact whey": [403,82,4.5,7],
  "grenade carb killa shake": [52,7.8,4.2,0.9],
  // Meals & Ready food
  "scrambled eggs": [148,10,1,11], "fried egg": [196,14,0.4,15],
  "boiled egg": [155,13,1.1,11], "omelette": [154,11,0.4,12],
  "baked beans": [88,5.5,16,0.4], "beans on toast": [310,15,55,3],
  "fish and chips": [595,28,61,28], "fish fingers": [233,13,20,11],
  "chicken nuggets": [296,15,17,18], "pizza slice": [266,11,33,10],
  "burger": [295,17,24,14], "full english": [520,28,30,33],
  "chicken tikka masala": [150,12,10,7], "dal": [116,7,18,2],
  "bolognese": [120,9.8,7.5,5.7], "lasagne": [166,10,13,8.2],
  "tomato soup": [51,1.6,9.5,1.1], "chicken soup": [42,4.2,4.2,1],
  "heinz tomato soup": [48,1.1,9,0.9], "greggs sausage roll": [383,10,29,27],
  "greggs vegan sausage roll": [347,11,30,21],
};

export const SERVING_SIZES = {
  banana: 120, apple: 180, orange: 160, egg: 60,
  "boiled egg": 60, "fried egg": 60, "scrambled eggs": 120,
  "omelette": 150, "digestive biscuit": 14, hobnob: 13,
  "pizza slice": 120, burger: 150,
};

export function lookupFood(raw) {
  const input = raw.toLowerCase().trim();
  let factor = null, foodStr = input;

  const metricMatch = input.match(/^(\d+(?:\.\d+)?)\s*(ml|millilitres?|milliliters?|l(?:itres?|iters?)?|g(?:rams?)?)\s+(?:of\s+)?(.+)/);
  if (metricMatch) {
    const amount = parseFloat(metricMatch[1]);
    const unit = metricMatch[2];
    foodStr = metricMatch[3];
    if (unit === "l" || unit.startsWith("litre") || unit.startsWith("liter")) {
      factor = (amount * 1000) / 100;
    } else {
      factor = amount / 100;
    }
  } else {
    const qtyMatch = input.match(/^(a|an|one|two|three|four|five|half|\d+(?:\.\d+)?)\s+(?:large\s+|small\s+|medium\s+)?(.+)/);
    if (qtyMatch) {
      const qtyMap = { a:1, an:1, one:1, two:2, three:3, four:4, five:5, half:0.5 };
      const qty = qtyMap[qtyMatch[1]] ?? parseFloat(qtyMatch[1]);
      foodStr = qtyMatch[2];
      foodStr = foodStr.replace(/s$/, "").trim();
      const serving = SERVING_SIZES[foodStr] || 100;
      factor = qty * (serving / 100);
    }
  }

  foodStr = foodStr.replace(/s$/, "").trim();
  let match = FOOD_DB[foodStr];
  if (!match) {
    const key = Object.keys(FOOD_DB).find(k => foodStr.includes(k) || k.includes(foodStr));
    if (key) match = FOOD_DB[key];
  }
  if (!match) return null;
  if (factor === null) factor = 1;

  const [cal, pro, carb, fat] = match;
  return {
    food: raw.trim(),
    calories: Math.round(cal * factor),
    protein: Math.round(pro * factor * 10) / 10,
    carbs: Math.round(carb * factor * 10) / 10,
    fat: Math.round(fat * factor * 10) / 10,
  };
}
