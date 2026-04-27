// Food database — [calories, protein, carbs, fat] per 100g or 100ml
export const FOOD_DB = {

  // ── Fruit ──────────────────────────────────────────────────────────────────
  "apple": [52,0.3,14,0.2], "banana": [89,1.1,23,0.3], "orange": [47,0.9,12,0.1],
  "grapes": [69,0.7,18,0.2], "strawberries": [32,0.7,7.7,0.3], "blueberries": [57,0.7,14,0.3],
  "mango": [60,0.8,15,0.4], "pineapple": [50,0.5,13,0.1], "watermelon": [30,0.6,7.5,0.2],
  "avocado": [160,2,9,15], "pear": [57,0.4,15,0.1], "peach": [39,0.9,10,0.3],
  "kiwi": [61,1.1,15,0.5], "plum": [46,0.7,11,0.3], "raspberry": [52,1.2,12,0.7],
  "blackberries": [43,1.4,10,0.5], "cherries": [63,1.1,16,0.2], "lemon": [29,1.1,9,0.3],
  "lime": [30,0.7,11,0.2], "grapefruit": [42,0.8,11,0.1], "apricot": [48,1.4,11,0.4],
  "dates": [277,1.8,75,0.2], "pomegranate": [83,1.7,19,1.2], "coconut": [354,3.3,15,33],
  "papaya": [43,0.5,11,0.3], "nectarine": [44,1.1,11,0.3], "fig": [74,0.8,19,0.3],
  "tangerine": [53,0.8,13,0.3], "clementine": [47,0.9,12,0.1], "melon": [34,0.8,8,0.2],
  "cantaloupe": [34,0.8,8,0.2], "lychee": [66,0.8,17,0.4], "guava": [68,2.6,14,1],
  "dragon fruit": [60,1.2,13,0], "passion fruit": [97,2.2,23,0.7],
  "jackfruit": [95,1.7,23,0.6], "star fruit": [31,1,7,0.3],

  // ── Vegetables ─────────────────────────────────────────────────────────────
  "broccoli": [34,2.8,7,0.4], "spinach": [23,2.9,3.6,0.4], "carrot": [41,0.9,10,0.2],
  "tomato": [18,0.9,3.9,0.2], "cucumber": [15,0.7,3.6,0.1], "onion": [40,1.1,9.3,0.1],
  "potato": [77,2,17,0.1], "sweet potato": [86,1.6,20,0.1], "peas": [81,5.4,14,0.4],
  "corn": [86,3.2,19,1.2], "sweetcorn": [86,3.2,19,1.2], "mushroom": [22,3.1,3.3,0.3],
  "courgette": [17,1.2,3.1,0.3], "zucchini": [17,1.2,3.1,0.3],
  "pepper": [31,1,6,0.3], "red pepper": [31,1,6,0.3], "green pepper": [20,0.9,4.6,0.2],
  "yellow pepper": [27,1,6.3,0.2], "lettuce": [15,1.4,2.9,0.2], "celery": [16,0.7,3,0.2],
  "cabbage": [25,1.3,5.8,0.1], "red cabbage": [29,1.4,7,0.2],
  "cauliflower": [25,1.9,5,0.3], "kale": [49,4.3,9,0.9],
  "green beans": [31,1.8,7,0.2], "asparagus": [20,2.2,3.7,0.1],
  "beetroot": [43,1.6,10,0.1], "parsnip": [75,1.8,18,0.3], "leek": [61,1.5,14,0.3],
  "garlic": [149,6.4,33,0.5], "ginger": [80,1.8,18,0.8],
  "butternut squash": [45,1,12,0.1], "pumpkin": [26,1,6.5,0.1],
  "aubergine": [25,1,6,0.2], "eggplant": [25,1,6,0.2],
  "rocket": [25,2.6,3.6,0.7], "spring onion": [32,1.8,7.3,0.2], "fennel": [31,1.2,7.3,0.2],
  "swede": [38,1.1,9,0.1], "turnip": [28,0.9,6.4,0.1], "radish": [16,0.7,3.4,0.1],
  "watercress": [11,2.3,1.3,0.3], "pak choi": [13,1.5,2.2,0.2],
  "artichoke": [47,3.3,11,0.2], "brussels sprout": [43,3.4,9,0.3],
  "mangetout": [42,3.6,5.8,0.2], "sugar snap peas": [42,3.6,5.8,0.2],
  "baby corn": [26,2,4.6,0.4], "cherry tomato": [18,0.9,3.9,0.2],
  "vine tomato": [18,0.9,3.9,0.2], "sun dried tomato": [258,14,44,3],
  "olives": [115,0.8,6.3,10], "capers": [23,2.4,4.9,0.9],

  // ── Meat ───────────────────────────────────────────────────────────────────
  "chicken breast": [165,31,0,3.6], "chicken thigh": [209,26,0,11],
  "chicken drumstick": [172,26,0,6.9], "chicken wing": [203,20,0,13],
  "chicken mince": [144,17,0,8], "roast chicken": [177,27,0,7.5],
  "beef mince": [254,17,0,20], "lean beef mince": [136,22,0,5.5],
  "beef steak": [271,26,0,18], "sirloin steak": [207,26,0,11],
  "ribeye steak": [291,24,0,22], "fillet steak": [192,28,0,8.8],
  "roast beef": [182,26,0,8.5], "beef brisket": [233,26,0,14],
  "pork chop": [231,25,0,14], "pork mince": [185,19,0,12],
  "pork belly": [518,9.3,0,53], "pulled pork": [240,27,0,14],
  "bacon": [541,37,0,45], "back bacon": [215,25,0,13], "streaky bacon": [541,37,0,45],
  "sausage": [301,11,3,27], "pork sausage": [301,11,3,27],
  "chipolata": [280,11,4,25], "cumberland sausage": [310,12,3,28],
  "chorizo": [455,24,1.9,40], "ham": [107,17,0.5,4], "parma ham": [268,25,0.3,18],
  "salami": [425,21,2.5,37], "pepperoni": [494,21,1.5,45],
  "black pudding": [297,13,15,22], "lamb chop": [245,22,0,17],
  "lamb mince": [236,18,0,18], "lamb leg": [191,28,0,8.8],
  "turkey breast": [135,30,0,1.7], "turkey mince": [159,21,0,8],
  "duck breast": [133,21,0,5.6], "duck leg": [337,19,0,29],
  "venison": [158,26,0,6], "rabbit": [136,20,0,6],
  "liver": [135,21,3.9,3.8], "chicken liver": [116,17,0.9,4.8],

  // ── Fish & Seafood ─────────────────────────────────────────────────────────
  "salmon": [208,20,0,13], "smoked salmon": [142,23,0,6],
  "tuna": [132,28,0,1.3], "tinned tuna": [116,26,0,1],
  "cod": [82,18,0,0.7], "haddock": [79,17,0,0.6],
  "smoked haddock": [101,23,0,0.9], "mackerel": [305,19,0,25],
  "smoked mackerel": [354,18,0,31], "prawns": [99,21,0,1.1],
  "king prawns": [99,21,0,1.1], "sea bass": [97,18,0,2.5],
  "sea bream": [96,20,0,2], "trout": [141,20,0,6.2],
  "sardines": [208,25,0,12], "tinned sardines": [185,21,0,11],
  "herring": [203,18,0,14], "kipper": [193,19,0,13],
  "crab": [72,15,0.5,1], "crab sticks": [95,7.5,12,1.5],
  "mussels": [86,12,3.7,2.2], "scallops": [88,17,2.4,0.8],
  "squid": [92,16,3.1,1.4], "anchovies": [131,20,0,5.8],
  "fish fingers": [233,13,20,11], "fish cake": [175,9,17,7.4],

  // ── Dairy & Eggs ───────────────────────────────────────────────────────────
  "egg": [155,13,1.1,11], "free range egg": [155,13,1.1,11],
  "egg white": [52,11,0.7,0.2], "egg yolk": [322,16,3.6,27],
  "whole milk": [61,3.2,4.8,3.3], "full fat milk": [61,3.2,4.8,3.3],
  "semi skimmed milk": [46,3.4,4.7,1.6], "skimmed milk": [34,3.4,5,0.2],
  "oat milk": [46,1,6.6,1.5], "oatly oat milk": [46,1,6.6,1.5],
  "oatly barista": [60,1,7.5,3], "almond milk": [17,0.6,1.4,1.1],
  "soya milk": [39,3.3,2.5,1.8], "coconut milk": [230,2.3,5.5,24],
  "coconut milk light": [84,0.8,2.4,8], "rice milk": [47,0.3,9.2,1],
  "cheddar": [403,25,0.1,33], "mature cheddar": [416,25,0.1,35],
  "mild cheddar": [390,24,0.1,32], "mozzarella": [280,17,2.2,22],
  "parmesan": [431,38,3.2,29], "brie": [334,21,0.5,28],
  "camembert": [299,20,0.1,24], "stilton": [410,23,0.1,35],
  "gouda": [356,25,2.2,27], "feta": [264,14,4.1,21],
  "halloumi": [321,22,0.5,25], "goat cheese": [268,18,0.3,21],
  "cream cheese": [342,5.9,3.8,34], "philadelphia": [251,5.3,3.2,24],
  "cottage cheese": [98,11,3.4,4.3], "ricotta": [174,11,3,13],
  "mascarpone": [429,5.8,4.2,43], "quark": [67,12,4,0.2],
  "skyr": [63,11,4,0.2], "fromage frais": [58,6.8,5.7,0.8],
  "greek yogurt": [97,9,4,5], "full fat greek yogurt": [133,5.7,4.5,10],
  "yogurt": [61,3.5,7,1.5], "low fat yogurt": [51,5,5.5,0.5],
  "muller corner": [130,4.5,21,3.5], "muller light": [51,5.5,7,0.1],
  "activia yogurt": [95,4.5,14,2.5], "yeo valley yogurt": [110,4.5,13,4],
  "alpro soya yogurt": [62,4,5.5,2], "protein yogurt": [84,10,7,1.6],
  "butter": [717,0.9,0.1,81], "unsalted butter": [717,0.9,0.1,81],
  "lurpak": [717,0.9,0.1,81], "spreadable butter": [638,0.7,0.5,71],
  "double cream": [453,1.7,2.7,48], "single cream": [198,2.7,4.1,19],
  "whipping cream": [373,2.5,3.6,38], "sour cream": [193,2.1,4.6,19],
  "creme fraiche": [257,2.7,4.6,25], "clotted cream": [586,1.6,2.3,63],
  "custard": [118,3.5,16,4.5], "rice pudding": [130,3.4,20,4.3],

  // ── Grains, Bread & Pasta ──────────────────────────────────────────────────
  "white rice": [130,2.7,28,0.3], "brown rice": [123,2.6,26,1],
  "basmati rice": [131,3.5,28,0.4], "jasmine rice": [130,2.7,29,0.3],
  "wild rice": [101,4,21,0.3], "pasta": [131,5,25,1.1],
  "wholemeal pasta": [124,5.3,23,1.3], "spaghetti": [131,5,25,1.1],
  "penne": [131,5,25,1.1], "fusilli": [131,5,25,1.1],
  "egg noodles": [138,4.9,27,1.3], "rice noodles": [109,2,25,0.2],
  "udon noodles": [130,3.8,27,0.6], "soba noodles": [99,5,21,0.1],
  "white bread": [265,9,51,3.2], "wholemeal bread": [247,12,42,3.8],
  "sourdough": [260,9,49,1.5], "rye bread": [259,8.5,48,3.3],
  "granary bread": [235,9.5,44,3], "seeded bread": [259,10,43,6],
  "warburtons white": [234,8.5,45,2], "warburtons wholemeal": [218,10,38,3],
  "hovis best of both": [226,9.5,40,2.5], "kingsmill 50/50": [228,9.5,41,2.5],
  "bagel": [250,10,48,1.6], "naan": [317,8.9,56,7.4],
  "pitta": [274,9.1,56,1.2], "flatbread": [305,9.2,57,5.3],
  "tortilla wrap": [306,8.3,52,7.2], "corn tortilla": [218,5.7,46,3],
  "chapati": [328,9.1,61,7.3], "paratha": [385,8.2,55,16],
  "rice cake": [392,7.7,82,2.8], "oatcake": [404,10,60,16],
  "croissant": [406,8.2,46,21], "crumpet": [198,6.8,40,0.9],
  "english muffin": [247,9.2,47,2.8], "brioche": [369,9,44,17],
  "ciabatta": [271,9.6,51,3.5], "baguette": [263,9.4,53,1.8],
  "hot cross bun": [308,7.4,58,5.4], "scone": [364,8,57,14],
  "oats": [389,17,66,7], "rolled oats": [389,17,66,7],
  "porridge": [71,2.5,12,1.4], "overnight oats": [130,5.1,18,3.7],
  "granola": [471,10,64,20], "muesli": [363,8.4,70,6],
  "cornflakes": [357,7,84,0.9], "bran flakes": [319,9.8,67,1.5],
  "weetabix": [362,11,68,2], "weetabix protein": [382,18,57,4],
  "shredded wheat": [325,10,67,2], "shreddies": [349,10,73,1.8],
  "special k": [370,15,74,1], "coco pops": [382,5.5,83,2.3],
  "frosties": [380,5,88,0.5], "alpen": [364,9,67,6],
  "quinoa": [120,4.4,22,1.9], "couscous": [176,6.4,37,0.6],
  "bulgur wheat": [83,3.1,19,0.2], "pearl barley": [352,9.9,73,1.1],
  "spelt": [338,14,57,2.4], "freekeh": [356,15,66,2.7],
  "polenta": [71,1.6,15,0.3], "gnocchi": [160,4,34,0.5],
  "waffle": [291,7.9,41,11], "pancake": [227,5.9,31,9.7],

  // ── Pulses, Beans & Soy ────────────────────────────────────────────────────
  "chickpeas": [164,8.9,27,2.6], "tinned chickpeas": [121,7.2,20,2.1],
  "lentils": [116,9,20,0.4], "red lentils": [116,8.9,20,0.4],
  "puy lentils": [116,9,20,0.4], "kidney beans": [127,8.7,22,0.5],
  "tinned kidney beans": [100,6.9,17,0.5], "black beans": [132,8.9,24,0.5],
  "butter beans": [103,7.1,18,0.4], "cannellini beans": [93,6.9,17,0.4],
  "borlotti beans": [108,8.7,20,0.5], "edamame": [121,11,8.9,5.2],
  "baked beans": [88,5.5,16,0.4], "heinz baked beans": [78,4.9,13,0.4],
  "tofu": [76,8,1.9,4.8], "firm tofu": [76,8,1.9,4.8],
  "tempeh": [193,19,9.4,11], "seitan": [121,21,7.5,1.9],
  "quorn mince": [98,14,5.1,2.5], "quorn pieces": [86,13.4,3.8,2],
  "quorn fillet": [86,13,2,2.5], "split peas": [118,8.3,21,0.4],

  // ── Nuts & Seeds ──────────────────────────────────────────────────────────
  "almonds": [579,21,22,50], "walnuts": [654,15,14,65],
  "cashews": [553,18,30,44], "peanuts": [567,26,16,49],
  "hazelnuts": [628,15,17,61], "pecans": [691,9.2,14,72],
  "macadamia": [718,7.9,14,76], "brazil nuts": [656,14,12,67],
  "pine nuts": [673,14,13,68], "pistachios": [562,20,28,45],
  "mixed nuts": [607,16,18,54],
  "peanut butter": [588,25,20,50], "crunchy peanut butter": [585,24,21,49],
  "almond butter": [614,21,19,56], "cashew butter": [587,18,28,46],
  "sunflower seeds": [584,21,20,51], "pumpkin seeds": [559,30,11,49],
  "chia seeds": [486,17,42,31], "flaxseeds": [534,18,29,42],
  "sesame seeds": [573,18,23,50], "hemp seeds": [553,32,9,49],
  "tahini": [595,17,21,54], "hummus": [166,8,14,10],

  // ── Sweeteners & Spreads ───────────────────────────────────────────────────
  "honey": [304,0.3,82,0], "manuka honey": [304,0.5,82,0],
  "maple syrup": [260,0,67,0.1], "agave syrup": [310,0.1,76,0.5],
  "golden syrup": [325,0.3,85,0], "treacle": [290,0.3,74,0.1],
  "jam": [261,0.5,69,0.1], "strawberry jam": [261,0.5,69,0.1],
  "marmalade": [261,0.3,70,0], "lemon curd": [283,1.8,59,5.1],
  "marmite": [264,36,20,0.5], "nutella": [539,6.3,58,31],
  "chocolate spread": [539,6.3,58,31],
  "sugar": [387,0,100,0], "brown sugar": [377,0,98,0],
  "icing sugar": [398,0,100,0], "stevia": [0,0,0,0],

  // ── Oils, Condiments & Sauces ──────────────────────────────────────────────
  "olive oil": [884,0,0,100], "extra virgin olive oil": [884,0,0,100],
  "vegetable oil": [884,0,0,100], "sunflower oil": [884,0,0,100],
  "coconut oil": [862,0,0,100], "rapeseed oil": [884,0,0,100],
  "sesame oil": [884,0,0,100], "fry light": [267,1,1,27],
  "mayonnaise": [680,1,0.6,75], "light mayonnaise": [273,1.6,15,24],
  "ketchup": [112,1.5,27,0.1], "heinz ketchup": [112,1.5,27,0.1],
  "mustard": [66,4.4,5.3,3.3], "dijon mustard": [170,7.5,5.6,11],
  "wholegrain mustard": [140,7.5,6.9,9.9],
  "soy sauce": [53,8.1,5,0], "hot sauce": [31,1.3,5.6,0.6],
  "sriracha": [93,2.1,18,2.3], "worcestershire sauce": [78,1.3,18,0.1],
  "oyster sauce": [51,0.9,10,0.6], "fish sauce": [35,5.1,3.7,0],
  "hoisin sauce": [220,3.5,40,5], "sweet chilli sauce": [165,0.5,40,0.2],
  "teriyaki sauce": [89,4.1,18,0.4], "barbecue sauce": [172,2.4,40,1.3],
  "pesto": [430,6.8,5,43], "red pesto": [369,5.7,9.5,36],
  "tomato puree": [76,3.8,17,0.1], "passata": [32,1.5,6.5,0.2],
  "chopped tomatoes": [24,1.5,4.5,0.1], "tinned tomatoes": [24,1.5,4.5,0.1],
  "dolmio bolognese": [54,2.5,9,0.8],
  "caesar dressing": [490,4.1,3.9,51], "ranch dressing": [477,1.3,4.5,50],
  "balsamic vinegar": [88,0.5,17,0], "apple cider vinegar": [22,0,0.9,0],
  "gravy": [28,1.8,4,0.6], "branston pickle": [131,0.8,33,0.1],
  "mint sauce": [82,2,18,0.5], "horseradish sauce": [90,1.5,14,3],

  // ── Crisps, Snacks & Tortilla Chips ───────────────────────────────────────
  "crisps": [536,7,53,33], "potato crisps": [536,7,53,33],
  "walkers ready salted": [527,6.5,53,33], "walkers cheese and onion": [531,6,53,34],
  "walkers salt and vinegar": [527,6.5,54,33],
  "pringles original": [544,5,52,35], "pringles sour cream": [534,5,53,34],
  "doritos": [480,7,61,23], "doritos cool original": [480,7,61,23],
  "doritos chilli heatwave": [484,7,62,23],
  "tortilla chips": [480,7,62,23], "corn chips": [503,6.5,64,24],
  "lightly salted tortilla chips": [473,7,63,22],
  "cool original tortilla chips": [480,7,61,23],
  "tyrrells sea salt": [487,7,51,29], "sensations thai sweet chilli": [500,6,55,28],
  "popchips": [390,6,65,11], "pretzels": [380,9.6,80,1.7],
  "breadsticks": [396,11,69,9.1], "popcorn": [387,13,78,4.5],
  "sweet popcorn": [477,5.1,68,22], "rice cakes": [392,7.7,82,2.8],

  // ── Biscuits ──────────────────────────────────────────────────────────────
  "digestive biscuit": [471,6.3,63,20], "chocolate digestive": [493,6.2,65,23],
  "hobnob": [467,7,62,22], "chocolate hobnob": [486,7,64,24],
  "shortbread": [498,5.3,65,24], "custard cream": [476,4.7,68,21],
  "bourbon biscuit": [459,5,67,20], "rich tea": [456,7.5,72,14],
  "jaffa cake": [374,4.3,77,5.4], "fig roll": [356,4.3,68,7],
  "kit kat": [508,6.4,63,26], "twix": [496,5,64,24], "snickers": [488,9.3,57,26],
  "maltesers": [483,7.4,66,22],
  "nakd bar": [360,8,55,11], "trek protein bar": [398,20,44,14],
  "grenade carb killa bar": [358,38,30,13], "kind bar": [458,8.5,46,28],
  "nature valley bar": [450,7.5,66,18], "alpen light bar": [355,7,67,5],

  // ── Chocolate & Confectionery ─────────────────────────────────────────────
  "milk chocolate": [535,7.6,59,30], "dark chocolate": [598,5,46,43],
  "white chocolate": [529,5.9,59,30],
  "cadbury dairy milk": [534,8,57,30], "cadbury wispa": [519,7.2,58,30],
  "cadbury crunchie": [467,4.5,74,18], "cadbury flake": [522,7,58,29],
  "galaxy chocolate": [530,6.5,60,29],
  "lindt 70% dark": [530,10,43,37], "lindt 85% dark": [587,11,33,46],
  "ferrero rocher": [572,8.6,46,39], "kinder bueno": [562,9,49,33],
  "haribo starmix": [340,6.8,77,0.5], "wine gums": [340,4.4,79,0.1],
  "fruit pastilles": [340,4.5,80,0.1], "percy pigs": [340,5,79,0.5],
  "fudge": [406,2,78,10], "toffee": [445,2,72,18],

  // ── Ice Cream & Desserts ──────────────────────────────────────────────────
  "ice cream": [207,3.5,24,11], "vanilla ice cream": [207,3.5,24,11],
  "chocolate ice cream": [216,3.5,26,11], "gelato": [185,3.5,28,6.9],
  "sorbet": [130,0.3,33,0.1], "frozen yogurt": [127,2.9,22,3.1],
  "cheesecake": [321,5.5,26,22], "brownie": [466,5.2,55,26],
  "muffin": [377,5.6,51,18], "doughnut": [452,5.5,51,25],
  "flapjack": [480,6.5,60,24], "victoria sponge": [365,5.1,55,15],
  "custard tart": [278,5.1,33,14], "tiramisu": [280,4.8,26,17],
  "profiterole": [346,5.2,30,23], "crepe": [191,5.8,26,7.2],

  // ── Coffee (per 100ml) ────────────────────────────────────────────────────
  "espresso": [9,0.6,1.7,0.2], "double espresso": [18,1.2,3.4,0.4],
  "ristretto": [6,0.4,1.1,0.1], "americano": [5,0.4,0.7,0.1],
  "black coffee": [2,0.3,0,0], "filter coffee": [2,0.3,0,0],
  "instant coffee": [2,0.3,0,0],
  "latte": [55,3.8,5.3,2.1], "whole milk latte": [55,3.8,5.3,2.1],
  "oat milk latte": [52,1.4,7.8,1.8], "almond milk latte": [30,1.2,3.5,1.3],
  "soy latte": [42,3.1,4.8,1.4], "skinny latte": [35,3.5,5.1,0.2],
  "cappuccino": [40,2.8,3.8,1.6], "oat milk cappuccino": [44,1.2,6.5,1.5],
  "flat white": [55,3.9,5.3,2.2], "oat milk flat white": [52,1.4,7.5,1.8],
  "cortado": [48,3.2,4.5,1.9], "macchiato": [13,0.9,1.5,0.5],
  "latte macchiato": [55,3.8,5.3,2.1], "caramel macchiato": [70,3.2,10,2.4],
  "mocha": [80,3.5,11,3.2], "cold brew": [3,0.4,0.5,0.1],
  "iced latte": [48,3.2,5,1.8], "iced americano": [4,0.3,0.5,0.1],
  "caramel latte": [72,3.2,10,2.5], "vanilla latte": [68,3.2,9.5,2.3],
  "hazelnut latte": [68,3.2,9.5,2.3], "bulletproof coffee": [230,0.3,0,25],
  "frappuccino": [95,2.5,16,3.2],
  "green tea": [1,0,0.2,0], "black tea": [1,0,0.3,0],
  "herbal tea": [1,0,0.2,0], "peppermint tea": [1,0,0.2,0],
  "chai latte": [62,2.8,9.2,1.8], "matcha latte": [58,2.5,8,2],
  "hot chocolate": [75,2.4,13,1.8],

  // ── Cold Drinks (per 100ml) ────────────────────────────────────────────────
  "orange juice": [45,0.7,10,0.2], "apple juice": [46,0.1,11,0.1],
  "cranberry juice": [46,0.4,12,0.1], "grape juice": [60,0.4,15,0.1],
  "pineapple juice": [53,0.4,12,0.1], "coconut water": [19,0.7,3.7,0.2],
  "cola": [42,0,10.6,0], "diet cola": [0,0,0,0], "sparkling water": [0,0,0,0],
  "energy drink": [45,0.5,11,0], "redbull": [45,0.4,11,0],
  "monster energy": [46,0.5,11,0], "lucozade energy": [70,0,17,0],
  "lucozade sport": [26,0,6.4,0], "ribena": [48,0.1,12,0],
  "innocent smoothie": [55,0.8,13,0.2], "tropicana orange juice": [45,0.7,10,0.2],
  "beer": [43,0.5,3.6,0], "lager": [43,0.5,3.6,0], "ale": [49,0.5,4.5,0],
  "wine": [83,0.1,2.6,0], "red wine": [85,0.1,2.7,0],
  "white wine": [82,0.1,2.5,0], "prosecco": [67,0.1,2.5,0],
  "spirits": [222,0,0,0], "vodka": [222,0,0,0], "gin": [222,0,0,0],
  "protein shake": [42,5.9,3.7,0.7], "milkshake": [73,3.3,11,1.8],
  "smoothie": [55,0.8,13,0.2], "kombucha": [10,0,2.2,0],
  "kefir": [52,3.4,4.8,1.4],

  // ── Protein & Supplements (per 100g powder) ───────────────────────────────
  "whey protein": [382,75,8,5], "whey isolate": [370,86,3,1.5],
  "casein protein": [360,72,10,4], "pea protein": [357,75,7,5],
  "plant protein": [350,68,12,5], "collagen powder": [364,90,0,0.5],
  "colostrum powder": [430,37,35,17], "protein powder": [382,75,8,5],
  "myprotein impact whey": [403,82,4.5,7],
  "for goodness shakes protein": [53,7.7,4.9,0.6],
  "grenade carb killa shake": [52,7.8,4.2,0.9],
  "creatine": [0,0,0,0], "bcaa": [210,52,0,0],
  "pre workout": [130,5,28,0.5], "electrolyte powder": [20,0,5,0],
  "spirulina": [290,57,24,8], "greens powder": [280,18,45,4],
  "matcha powder": [324,25,38,5], "maca powder": [325,10,71,3],
  "omega 3": [900,0,0,100], "fish oil": [900,0,0,100],
  "psyllium husk": [200,3,75,1], "multivitamin": [0,0,0,0],
  "mass gainer": [370,22,64,3], "meal replacement": [380,25,52,8],

  // ── Fast Food & Takeaway ──────────────────────────────────────────────────
  "mcdonalds big mac": [257,13,24,12], "mcdonalds fries large": [279,3.5,35,14],
  "mcdonalds chicken nuggets": [249,14,16,14],
  "kfc original recipe": [246,19,11,14], "kfc zinger burger": [255,16,26,10],
  "greggs sausage roll": [383,10,29,27], "greggs steak bake": [360,13,30,21],
  "greggs vegan sausage roll": [347,11,30,21],
  "pizza slice": [266,11,33,10], "fish and chips": [595,28,61,28],
  "kebab": [263,18,21,12], "burger": [295,17,24,14],
  "chicken tikka masala": [150,12,10,7], "korma": [187,12,9,12],
  "dal": [116,7,18,2], "pilau rice": [155,3.2,31,2.5],
  "chow mein": [136,7.5,17,4.4], "fried rice": [163,4.2,26,5],
  "spring roll": [208,4.8,23,11], "sushi roll": [150,4.5,30,1.3],
  "burrito": [217,9.8,26,8.2], "nachos": [400,7.5,46,21],

  // ── Meals & Home Cooking ──────────────────────────────────────────────────
  "scrambled eggs": [148,10,1,11], "fried egg": [196,14,0.4,15],
  "boiled egg": [155,13,1.1,11], "poached egg": [143,12,0.4,10],
  "omelette": [154,11,0.4,12],
  "full english": [520,28,30,33], "avocado toast": [180,5.5,16,11],
  "eggs benedict": [270,13,15,17],
  "beans on toast": [310,15,55,3], "cheese on toast": [380,18,38,18],
  "jacket potato": [130,3.5,28,0.2], "mashed potato": [104,2,17,4],
  "roast potato": [149,2.4,23,5.9], "chips": [253,3.7,34,12],
  "pasta bolognese": [158,10,18,5.5], "spaghetti carbonara": [217,9.5,24,9],
  "mac and cheese": [164,6.4,20,6.8], "lasagne": [166,10,13,8.2],
  "risotto": [138,3.9,22,4.5], "shepherd pie": [118,8.3,11,4.6],
  "beef stew": [98,9.3,8.2,3.2], "chilli con carne": [120,11,9.8,4.3],
  "bolognese": [120,9.8,7.5,5.7], "curry": [150,12,10,7],
  "stir fry": [120,10,10,4.5],
  "tomato soup": [51,1.6,9.5,1.1], "chicken soup": [42,4.2,4.2,1],
  "lentil soup": [99,6.2,16,1.4], "heinz tomato soup": [48,1.1,9,0.9],
  "sandwich": [231,10,29,8.2], "wrap": [230,11,27,8],
  "tuna mayo sandwich": [258,14,27,10], "egg mayo sandwich": [248,12,28,9.5],
  "sausage roll": [399,11,27,29], "pasty": [298,8.8,32,15],
  "scotch egg": [257,13,12,18], "quiche lorraine": [290,11,18,19],
  "fish fingers": [233,13,20,11], "chicken nuggets": [296,15,17,18],

  // ── Spices (per 100g) ─────────────────────────────────────────────────────
  "salt": [0,0,0,0], "black pepper": [251,10,64,3.3],
  "cinnamon": [247,4,81,1.2], "turmeric": [354,8,65,10],
  "cumin": [375,18,44,22], "paprika": [282,14,54,13],
  "chilli powder": [282,14,50,14], "curry powder": [325,13,58,10],
  "garam masala": [379,14,57,16], "oregano": [265,9,69,4.3],
  "basil": [23,3.2,2.7,0.6], "parsley": [36,3,6.3,0.8],
  "mint": [44,3.3,8.5,0.7], "thyme": [101,5.6,24,1.7],
  "rosemary": [131,3.3,21,5.9], "nutmeg": [525,5.8,49,36],
  "vanilla extract": [288,0.1,12,0.1],
};

export const SERVING_SIZES = {
  banana: 120, apple: 180, orange: 160, egg: 60,
  "free range egg": 60, "boiled egg": 60, "fried egg": 60, "poached egg": 60,
  "scrambled eggs": 120, "omelette": 150,
  "digestive biscuit": 14, hobnob: 13, "rich tea": 10,
  "jaffa cake": 12, "kit kat": 20, "snickers": 50,
  "pizza slice": 120, burger: 150,
  "croissant": 65, "crumpet": 60, "bagel": 95,
  "naan": 130, "pitta": 75, "english muffin": 55,
  "hot cross bun": 75, "scone": 55,
};

export function lookupFood(raw) {
  const input = raw.toLowerCase().trim();
  let factor = null, foodStr = input;

  // Match metric amounts: "350ml", "350g", "1.5l", "200 grams" etc.
  const metricMatch = input.match(/^(\d+(?:\.\d+)?)\s*(ml|millilitres?|milliliters?|l(?:itres?|iters?)?|g(?:rams?)?)\s+(?:of\s+)?(.+)/);
  if (metricMatch) {
    const amount = parseFloat(metricMatch[1]);
    const unit = metricMatch[2];
    foodStr = metricMatch[3];
    if (unit === 'l' || unit.startsWith('litre') || unit.startsWith('liter')) {
      factor = (amount * 1000) / 100;
    } else {
      factor = amount / 100;
    }
  } else {
    // Match count-based: "2 eggs", "a banana", "half an avocado"
    const qtyMatch = input.match(/^(a|an|one|two|three|four|five|six|half|\d+(?:\.\d+)?)\s+(?:large\s+|small\s+|medium\s+)?(.+)/);
    if (qtyMatch) {
      const qtyMap = { a:1, an:1, one:1, two:2, three:3, four:4, five:5, six:6, half:0.5 };
      const qty = qtyMap[qtyMatch[1]] ?? parseFloat(qtyMatch[1]);
      foodStr = qtyMatch[2];
      foodStr = foodStr.replace(/s$/, '').trim();
      const serving = SERVING_SIZES[foodStr] || 100;
      factor = qty * (serving / 100);
    }
  }

  foodStr = foodStr.replace(/s$/, '').trim();

  // Exact match first
  let match = FOOD_DB[foodStr];

  // Partial match — prefer longer (more specific) key matches
  if (!match) {
    const keys = Object.keys(FOOD_DB);
    const containedBy = keys.filter(k => k.includes(foodStr)).sort((a, b) => a.length - b.length);
    const contains = keys.filter(k => foodStr.includes(k)).sort((a, b) => b.length - a.length);
    const best = containedBy[0] || contains[0];
    if (best) match = FOOD_DB[best];
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

// ── Food variants — shown as options when user selects certain foods ──────────
// Format: { label, calories, protein, carbs, fat } per 100g
export const FOOD_VARIANTS = {
  "beef mince": [
    { label: "5% fat (extra lean)", calories: 137, protein: 22, carbs: 0, fat: 5 },
    { label: "10% fat (lean)", calories: 175, protein: 21, carbs: 0, fat: 10 },
    { label: "15% fat (standard)", calories: 215, protein: 19, carbs: 0, fat: 15 },
    { label: "20% fat (regular)", calories: 254, protein: 17, carbs: 0, fat: 20 },
    { label: "30% fat (fatty)", calories: 332, protein: 14, carbs: 0, fat: 30 },
  ],
  "pork mince": [
    { label: "5% fat (lean)", calories: 121, protein: 22, carbs: 0, fat: 5 },
    { label: "10% fat (standard)", calories: 160, protein: 20, carbs: 0, fat: 10 },
    { label: "20% fat (regular)", calories: 243, protein: 17, carbs: 0, fat: 20 },
  ],
  "chicken mince": [
    { label: "3% fat (breast mince)", calories: 114, protein: 20, carbs: 0, fat: 3 },
    { label: "8% fat (thigh mince)", calories: 144, protein: 17, carbs: 0, fat: 8 },
    { label: "15% fat (mixed mince)", calories: 195, protein: 15, carbs: 0, fat: 15 },
  ],
  "turkey mince": [
    { label: "1% fat (breast mince)", calories: 105, protein: 24, carbs: 0, fat: 1 },
    { label: "7% fat (standard)", calories: 159, protein: 21, carbs: 0, fat: 7 },
    { label: "15% fat (thigh mince)", calories: 210, protein: 18, carbs: 0, fat: 15 },
  ],
  "lamb mince": [
    { label: "10% fat (lean)", calories: 183, protein: 22, carbs: 0, fat: 10 },
    { label: "20% fat (standard)", calories: 260, protein: 19, carbs: 0, fat: 20 },
    { label: "30% fat (fatty)", calories: 340, protein: 16, carbs: 0, fat: 30 },
  ],
  "greek yogurt": [
    { label: "0% fat (total 0%)", calories: 57, protein: 10, carbs: 4, fat: 0 },
    { label: "2% fat (low fat)", calories: 73, protein: 9.5, carbs: 4, fat: 2 },
    { label: "5% fat (total 5%)", calories: 97, protein: 9, carbs: 4, fat: 5 },
    { label: "10% fat (full fat)", calories: 133, protein: 5.7, carbs: 4.5, fat: 10 },
  ],
  "yogurt": [
    { label: "0% fat", calories: 38, protein: 5.7, carbs: 5.5, fat: 0 },
    { label: "low fat", calories: 51, protein: 5, carbs: 5.5, fat: 0.5 },
    { label: "full fat", calories: 61, protein: 3.5, carbs: 7, fat: 1.5 },
  ],
  "skyr": [
    { label: "0% fat", calories: 57, protein: 11, carbs: 4, fat: 0 },
    { label: "2% fat", calories: 75, protein: 10, carbs: 4, fat: 2 },
  ],
  "cottage cheese": [
    { label: "fat free", calories: 63, protein: 12, carbs: 3.4, fat: 0.2 },
    { label: "low fat (2%)", calories: 84, protein: 11, carbs: 3.4, fat: 2 },
    { label: "full fat (4%)", calories: 110, protein: 11, carbs: 3.5, fat: 4.3 },
  ],
  "cheddar": [
    { label: "reduced fat (30% less)", calories: 270, protein: 28, carbs: 0.1, fat: 18 },
    { label: "mild", calories: 390, protein: 24, carbs: 0.1, fat: 32 },
    { label: "mature / regular", calories: 403, protein: 25, carbs: 0.1, fat: 33 },
    { label: "extra mature", calories: 416, protein: 25, carbs: 0.1, fat: 35 },
  ],
  "milk": [
    { label: "skimmed (0.1% fat)", calories: 34, protein: 3.4, carbs: 5, fat: 0.2 },
    { label: "semi-skimmed (1.7% fat)", calories: 46, protein: 3.4, carbs: 4.7, fat: 1.6 },
    { label: "whole (3.5% fat)", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  ],
  "cream cheese": [
    { label: "light / reduced fat", calories: 155, protein: 8, carbs: 4.5, fat: 12 },
    { label: "medium fat", calories: 251, protein: 5.3, carbs: 3.2, fat: 24 },
    { label: "full fat", calories: 342, protein: 5.9, carbs: 3.8, fat: 34 },
  ],
  "sour cream": [
    { label: "light (15% fat)", calories: 136, protein: 3.1, carbs: 5.2, fat: 12 },
    { label: "full fat (20% fat)", calories: 193, protein: 2.1, carbs: 4.6, fat: 19 },
  ],
  "oat milk": [
    { label: "original", calories: 46, protein: 1, carbs: 6.6, fat: 1.5 },
    { label: "barista", calories: 60, protein: 1, carbs: 7.5, fat: 3 },
    { label: "semi (reduced fat)", calories: 38, protein: 1, carbs: 5.5, fat: 1 },
  ],
  "soya milk": [
    { label: "unsweetened", calories: 33, protein: 3.3, carbs: 1.2, fat: 1.8 },
    { label: "sweetened", calories: 45, protein: 3.2, carbs: 3.8, fat: 1.8 },
    { label: "barista", calories: 52, protein: 3.5, carbs: 4.2, fat: 2.2 },
  ],
  "coconut milk": [
    { label: "light (reduced fat)", calories: 84, protein: 0.8, carbs: 2.4, fat: 8 },
    { label: "full fat", calories: 230, protein: 2.3, carbs: 5.5, fat: 24 },
  ],
  "mayo": [
    { label: "light mayonnaise", calories: 273, protein: 1.6, carbs: 15, fat: 24 },
    { label: "regular mayonnaise", calories: 680, protein: 1, carbs: 0.6, fat: 75 },
  ],
  "mayonnaise": [
    { label: "light / reduced fat", calories: 273, protein: 1.6, carbs: 15, fat: 24 },
    { label: "regular / full fat", calories: 680, protein: 1, carbs: 0.6, fat: 75 },
  ],
  "peanut butter": [
    { label: "reduced fat", calories: 486, protein: 28, carbs: 30, fat: 27 },
    { label: "smooth", calories: 588, protein: 25, carbs: 20, fat: 50 },
    { label: "crunchy", calories: 585, protein: 24, carbs: 21, fat: 49 },
    { label: "natural (no added sugar/salt)", calories: 600, protein: 26, carbs: 18, fat: 51 },
  ],
  "salmon": [
    { label: "fresh / raw", calories: 208, protein: 20, carbs: 0, fat: 13 },
    { label: "smoked", calories: 142, protein: 23, carbs: 0, fat: 6 },
    { label: "tinned in brine", calories: 130, protein: 22, carbs: 0, fat: 5 },
    { label: "tinned in oil", calories: 199, protein: 20, carbs: 0, fat: 14 },
  ],
  "tuna": [
    { label: "fresh / steak", calories: 144, protein: 23, carbs: 0, fat: 5.8 },
    { label: "tinned in water / brine", calories: 116, protein: 26, carbs: 0, fat: 1 },
    { label: "tinned in oil (drained)", calories: 189, protein: 27, carbs: 0, fat: 9 },
    { label: "tinned in oil (not drained)", calories: 210, protein: 25, carbs: 0, fat: 12 },
  ],
  "chicken breast": [
    { label: "raw (skinless)", calories: 105, protein: 22, carbs: 0, fat: 1.7 },
    { label: "grilled / cooked", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { label: "roasted with skin", calories: 189, protein: 28, carbs: 0, fat: 8.5 },
    { label: "breaded / crispy", calories: 230, protein: 17, carbs: 14, fat: 11 },
  ],
  "bacon": [
    { label: "back bacon (grilled)", calories: 215, protein: 25, carbs: 0, fat: 13 },
    { label: "streaky bacon (grilled)", calories: 349, protein: 29, carbs: 0, fat: 26 },
    { label: "back bacon (raw)", calories: 215, protein: 16, carbs: 0, fat: 17 },
    { label: "medallion / lean back", calories: 134, protein: 22, carbs: 0, fat: 5 },
  ],
  "dark chocolate": [
    { label: "50–60% cocoa", calories: 546, protein: 5, carbs: 57, fat: 31 },
    { label: "70% cocoa", calories: 530, protein: 10, carbs: 43, fat: 37 },
    { label: "80% cocoa", calories: 560, protein: 10, carbs: 38, fat: 42 },
    { label: "85–90% cocoa", calories: 587, protein: 11, carbs: 33, fat: 46 },
    { label: "100% cocoa (unsweetened)", calories: 600, protein: 12, carbs: 25, fat: 50 },
  ],
  "bread": [
    { label: "white sliced", calories: 265, protein: 9, carbs: 51, fat: 3.2 },
    { label: "wholemeal / brown", calories: 247, protein: 12, carbs: 42, fat: 3.8 },
    { label: "sourdough", calories: 260, protein: 9, carbs: 49, fat: 1.5 },
    { label: "rye", calories: 259, protein: 8.5, carbs: 48, fat: 3.3 },
    { label: "seeded / granary", calories: 259, protein: 10, carbs: 43, fat: 6 },
  ],
  "pasta": [
    { label: "white (cooked)", calories: 131, protein: 5, carbs: 25, fat: 1.1 },
    { label: "wholemeal (cooked)", calories: 124, protein: 5.3, carbs: 23, fat: 1.3 },
    { label: "white (dry weight)", calories: 355, protein: 13, carbs: 68, fat: 1.8 },
    { label: "wholemeal (dry weight)", calories: 348, protein: 14, carbs: 64, fat: 2.5 },
    { label: "gluten free (cooked)", calories: 138, protein: 2.8, carbs: 30, fat: 0.9 },
  ],
  "rice": [
    { label: "white (cooked)", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { label: "brown (cooked)", calories: 123, protein: 2.6, carbs: 26, fat: 1 },
    { label: "basmati (cooked)", calories: 131, protein: 3.5, carbs: 28, fat: 0.4 },
    { label: "white (dry weight)", calories: 361, protein: 6.7, carbs: 80, fat: 0.4 },
    { label: "brown (dry weight)", calories: 357, protein: 7.5, carbs: 75, fat: 2.8 },
  ],
  "eggs": [
    { label: "whole egg (large)", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { label: "egg white only", calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
    { label: "scrambled (with butter & milk)", calories: 166, protein: 9.5, carbs: 1.8, fat: 13.5 },
    { label: "poached", calories: 143, protein: 12, carbs: 0.4, fat: 10 },
    { label: "fried (in oil)", calories: 196, protein: 14, carbs: 0.4, fat: 15 },
    { label: "boiled", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  ],
  "oats": [
    { label: "dry oats / porridge oats", calories: 389, protein: 17, carbs: 66, fat: 7 },
    { label: "porridge (made with water)", calories: 46, protein: 1.7, carbs: 8.3, fat: 1 },
    { label: "porridge (made with whole milk)", calories: 71, protein: 2.5, carbs: 12, fat: 1.4 },
    { label: "overnight oats", calories: 130, protein: 5.1, carbs: 18, fat: 3.7 },
  ],
};
