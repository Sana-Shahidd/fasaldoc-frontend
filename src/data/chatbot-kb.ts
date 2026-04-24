type ML = { en: string; ur: string; pa: string; sd: string }

interface KBEntry { id: string; patterns: string[]; response: ML }

export const KB: KBEntry[] = [
  {
    id: 'greeting',
    patterns: ['hello', 'hi', 'salam', 'السلام', 'ہیلو', 'hey', 'assalam', 'good morning', 'good evening', 'namaste'],
    response: {
      en: "Hello! 👋 I'm your FasalDoc AI assistant. I can help with plant diseases, treatment advice, farming tips, and using the app. What would you like to know?",
      ur: "السلام علیکم! 👋 میں آپ کا فصل ڈاک AI معاون ہوں۔ میں آپ کو پودوں کی بیماریوں، علاج اور کاشتکاری کے مشوروں میں مدد کر سکتا ہوں۔ کیا جاننا چاہتے ہیں؟",
      pa: "ست سری اکال! 👋 میں تہاڈا فصل ڈاک AI معاون آں۔ پودیاں دیاں بیماریاں، علاج اتے کاشتکاری دے مشورے وچ مدد کر سکدا آں۔ کی پچھنا چاہندے ہو؟",
      sd: "هيلو! 👋 آئون توهانجو فصل ڊاڪ AI مددگار آهيان. پودن جي بيمارين، علاج ۽ زراعت جي صلاح ۾ مدد ڪري سگهان ٿو. ڇا ڄاڻڻ چاهيو ٿا؟"
    }
  },
  {
    id: 'scan_tips',
    patterns: ['photo', 'image', 'picture', 'scan', 'camera', 'capture', 'tصویر', 'تصویر', 'photo tips', 'accuracy'],
    response: {
      en: "📸 For best scanning results:\n• Hold the leaf flat under good natural light\n• Fill the frame with the leaf\n• Avoid shadows and blurry shots\n• Morning light gives best results\n• Use JPEG or PNG, under 5 MB",
      ur: "📸 بہترین اسکین کے لیے:\n• پتے کو اچھی قدرتی روشنی میں سیدھا پکڑیں\n• پتے کو فریم میں بھریں\n• سائے اور دھندلی تصویر سے بچیں\n• صبح کی روشنی بہترین ہے\n• JPEG یا PNG استعمال کریں، 5 MB سے کم",
      pa: "📸 بہترین سکین لئی:\n• پتے نوں چنگی قدرتی روشنی وچ سِدھا پکڑو\n• پتے نوں فریم وچ بھرو\n• پرچھاویں اتے دھندلیاں تصویراں توں بچو\n• صبح دی روشنی سب توں چنگی اے\n• JPEG یا PNG، 5 MB توں گھٹ",
      sd: "📸 بهترين اسڪين لاءِ:\n• پن کي چڱي قدرتي روشني ۾ سڌو رکو\n• پن سان فريم ڀريو\n• پاڇي ۽ ڌنڌلي تصوير کان بچو\n• صبح جي روشني بهترين آهي\n• JPEG يا PNG، 5 MB کان گهٽ"
    }
  },
  {
    id: 'apple_diseases',
    patterns: ['apple', 'apple scab', 'black rot', 'cedar rust', 'سیب', 'apple disease'],
    response: {
      en: "🍎 Common apple diseases I detect:\n\n• **Apple Scab** — Dark spots on leaves/fruit. Use Captan or Mancozeb. Spray every 7–10 days during wet weather.\n• **Black Rot** — Brown cankers on branches. Remove infected wood, apply Thiophanate-methyl.\n• **Cedar Apple Rust** — Orange spots on leaves. Apply myclobutanil before symptoms appear.\n\nOrganic: Neem oil spray, remove fallen leaves.",
      ur: "🍎 سیب کی عام بیماریاں:\n\n• **ایپل اسکیب** — پتوں/پھل پر گہرے دھبے۔ کیپٹان یا مینکوزیب استعمال کریں۔ بارش میں ہر 7-10 دن پھیلائیں۔\n• **بلیک روٹ** — شاخوں پر بھورے زخم۔ متاثرہ لکڑی ہٹائیں، تھیوفانیٹ میتھائل لگائیں۔\n• **سیڈر ایپل رسٹ** — پتوں پر نارنجی دھبے۔ علامات سے پہلے مائیکلوبیوٹانیل لگائیں۔\n\nقدرتی علاج: نیم کا تیل، گرے پتے ہٹائیں۔",
      pa: "🍎 سیب دیاں عام بیماریاں:\n\n• **ایپل اسکیب** — پتیاں/پھل تے گہرے دھبے۔ کیپٹان یا مینکوزیب ورتو۔ مینہ وچ ہر 7-10 دن چھڑکاؤ کرو۔\n• **بلیک روٹ** — ٹہنیاں تے بھورے زخم۔ متاثرہ لکڑی ہٹاؤ۔\n• **سیڈر رسٹ** — پتیاں تے نارنجی دھبے۔ مائیکلوبیوٹانیل لگاؤ۔\n\nقدرتی: نیم دا تیل، ڈِگے پتے ہٹاؤ۔",
      sd: "🍎 سيب جون عام بيماريون:\n\n• **ايپل اسڪيب** — پنن/ميوي تي ڪارا داغ. ڪيپٽان يا مينڪوزيب استعمال ڪريو.\n• **بليڪ روٽ** — شاخن تي ڀورا زخم. متاثر لڪڙي هٽايو.\n• **سيڊر رسٽ** — پنن تي نارنگي داغ. ميڪلوبيوٽانيل لڳايو.\n\nقدرتي: نيم جو تيل، ڪري پيل پن هٽايو."
    }
  },
  {
    id: 'potato_diseases',
    patterns: ['potato', 'aloo', 'آلو', 'early blight', 'late blight', 'potato disease'],
    response: {
      en: "🥔 Common potato diseases:\n\n• **Early Blight** — Brown spots with yellow rings (target-shaped). Apply Chlorothalonil or Mancozeb every 7–14 days.\n• **Late Blight** — Water-soaked, dark lesions. Very destructive! Use Metalaxyl + Mancozeb. Remove infected plants immediately.\n• **Healthy potatoes** — Water regularly but avoid waterlogging.\n\n🌿 Tip: Rotate crops every 2–3 years to prevent soil buildup.",
      ur: "🥔 آلو کی عام بیماریاں:\n\n• **ارلی بلائٹ** — زرد حلقوں والے بھورے دھبے۔ ہر 7-14 دن کلوروتھیلونیل یا مینکوزیب لگائیں۔\n• **لیٹ بلائٹ** — پانی بھرے سیاہ زخم۔ بہت خطرناک! میٹالیکسل + مینکوزیب استعمال کریں۔ فوری متاثرہ پودے ہٹائیں۔\n\n🌿 مشورہ: مٹی میں جراثیم کم کرنے کے لیے ہر 2-3 سال فصل بدلیں۔",
      pa: "🥔 آلو دیاں عام بیماریاں:\n\n• **ارلی بلائٹ** — زرد حلقیاں والے بھورے دھبے۔ ہر 7-14 دن کلوروتھیلونیل لگاؤ۔\n• **لیٹ بلائٹ** — بہت خطرناک! میٹالیکسل + مینکوزیب ورتو۔ متاثرہ پودے فوری ہٹاؤ۔\n\n🌿 مشورہ: ہر 2-3 سال فصل بدلو۔",
      sd: "🥔 آلو جون عام بيماريون:\n\n• **ارلي بلائيٽ** — زرد حلقن سان ڀورا داغ. ڪلوروٿيلونيل لڳايو.\n• **ليٽ بلائيٽ** — تمام خطرناڪ! ميٽالڪسل + مينڪوزيب استعمال ڪريو.\n\n🌿 صلاح: هر 2-3 سال فصل بدليو."
    }
  },
  {
    id: 'corn_diseases',
    patterns: ['corn', 'maize', 'makka', 'مکئی', 'مکی', 'rust corn', 'gray leaf spot', 'northern blight'],
    response: {
      en: "🌽 Common corn/maize diseases:\n\n• **Common Rust** — Orange/brown pustules on leaves. Apply propiconazole fungicide.\n• **Gray Leaf Spot** — Rectangular gray lesions. Use strobilurin fungicides. Improve air circulation.\n• **Northern Leaf Blight** — Long, cigar-shaped lesions. Apply mancozeb early.\n\n🌿 Resistant varieties are the best long-term solution. Plant in well-drained soil.",
      ur: "🌽 مکئی کی عام بیماریاں:\n\n• **زنگ** — پتوں پر نارنجی/بھورے دھبے۔ پروپیکونازول فنگیسائیڈ لگائیں۔\n• **گرے لیف اسپاٹ** — مستطیل سرمئی زخم۔ ہوا کی آمدورفت بہتر کریں۔\n• **نارتھرن لیف بلائٹ** — لمبے سگار جیسے زخم۔ مینکوزیب جلدی لگائیں۔\n\n🌿 مزاحم اقسام بہترین حل ہیں۔",
      pa: "🌽 مکئی دیاں عام بیماریاں:\n\n• **زنگ** — پتیاں تے نارنجی دھبے۔ پروپیکونازول لگاؤ۔\n• **گرے لیف اسپاٹ** — سرمئی زخم۔ ہوا دی آمدورفت بہتر کرو۔\n• **نارتھرن لیف بلائٹ** — مینکوزیب جلدی لگاؤ۔\n\n🌿 مزاحم اقسام بہترین نے۔",
      sd: "🌽 مڪئي جون عام بيماريون:\n\n• **زنگ** — پنن تي نارنگي داغ. پروپيڪونازول لڳايو.\n• **گري ليف اسپاٽ** — سرمئي زخم. هوا جي اچارو وڌايو.\n• **نارٿرن بلائيٽ** — مينڪوزيب جلدي لڳايو."
    }
  },
  {
    id: 'wheat_diseases',
    patterns: ['wheat', 'gandum', 'گندم', 'wheat rust', 'yellow rust', 'stripe rust', 'wheat blast'],
    response: {
      en: "🌾 Key wheat diseases in Pakistan:\n\n• **Yellow/Stripe Rust** — Yellow stripes on leaves. Most common in cool weather. Use Propiconazole 25% EC.\n• **Brown Rust** — Orange-brown pustules. Apply Tebuconazole.\n• **Loose Smut** — Black sooty heads. Seed treatment with Carboxin.\n• **Wheat Blast** — Bleached spikes. Avoid in humid regions.\n\n⚠️ Spray at first sign. Lost wheat cannot be recovered.",
      ur: "🌾 پاکستان میں گندم کی اہم بیماریاں:\n\n• **پیلی زنگ** — پتوں پر پیلی دھاریاں۔ ٹھنڈے موسم میں زیادہ۔ پروپیکونازول 25% EC استعمال کریں۔\n• **براؤن رسٹ** — نارنجی بھورے دھبے۔ ٹیبوکونازول لگائیں۔\n• **لوز اسمٹ** — کالے بیج۔ بیج کو کاربوکسن سے ٹریٹ کریں۔\n\n⚠️ پہلی علامت پر فوری چھڑکاؤ کریں۔",
      pa: "🌾 پاکستان وچ گندم دیاں اہم بیماریاں:\n\n• **پیلی زنگ** — پتیاں تے پیلیاں دھاریاں۔ پروپیکونازول 25% EC ورتو۔\n• **براؤن رسٹ** — نارنجی دھبے۔ ٹیبوکونازول لگاؤ۔\n• **لوز اسمٹ** — بیج کاربوکسن نال ٹریٹ کرو۔\n\n⚠️ پہلی علامت تے فوری چھڑکاؤ کرو۔",
      sd: "🌾 پاڪستان ۾ ڪڻڪ جون اهم بيماريون:\n\n• **پيلي زنگ** — پنن تي پيلي ڌاريون. پروپيڪونازول 25% EC استعمال ڪريو.\n• **براؤن رسٽ** — نارنگي داغ. ٽيبوڪونازول لڳايو.\n• **لوز اسمٽ** — ٻج کي ڪاربوڪسن سان ٽريٽ ڪريو."
    }
  },
  {
    id: 'cotton_diseases',
    patterns: ['cotton', 'kapas', 'کپاس', 'cotton leaf curl', 'whitefly', 'clcuv', 'cotton disease'],
    response: {
      en: "🌿 Key cotton diseases in Pakistan:\n\n• **Cotton Leaf Curl Virus (CLCuV)** — Leaves curl upward, veins thicken. **No direct cure** — remove infected plants, control whitefly (vector) with Imidacloprid.\n• **Bacterial Blight** — Water-soaked spots, angular lesions. Use copper-based bactericides.\n• **Alternaria Leaf Spot** — Circular brown spots. Apply Mancozeb.\n\n🐛 Whitefly control is crucial for CLCuV prevention.",
      ur: "🌿 پاکستان میں کپاس کی اہم بیماریاں:\n\n• **کاٹن لیف کرل وائرس** — پتے اوپر کو مڑتے ہیں، رگیں موٹی ہوتی ہیں۔ **براہ راست علاج نہیں** — متاثرہ پودے ہٹائیں، سفید مکھی کو Imidacloprid سے کنٹرول کریں۔\n• **بیکٹیریل بلائٹ** — تانبے والی دوائیں استعمال کریں۔\n• **ایلٹرنریا لیف اسپاٹ** — مینکوزیب لگائیں۔",
      pa: "🌿 پاکستان وچ کپاہ دیاں اہم بیماریاں:\n\n• **کاٹن لیف کرل وائرس** — پتے اوپر نوں مڑدے نے، نسیں موٹیاں ہندیاں نے۔ متاثرہ پودے ہٹاؤ، سفید مکھی Imidacloprid نال کنٹرول کرو۔\n• **بیکٹیریل بلائٹ** — تانبے والیاں دوائیاں ورتو۔\n• **ایلٹرنریا** — مینکوزیب لگاؤ۔",
      sd: "🌿 پاڪستان ۾ ڪپهه جون اهم بيماريون:\n\n• **ليف ڪرل وائرس** — پن مٿي ڦرن ٿا. متاثر پودا هٽايو، اڇي مکي Imidacloprid سان ڪنٽرول ڪريو.\n• **بيڪٽيريل بلائيٽ** — تانبي واريون دوائون استعمال ڪريو.\n• **ايلٽرنريا** — مينڪوزيب لڳايو."
    }
  },
  {
    id: 'tomato_diseases',
    patterns: ['tomato', 'tamatar', 'ٹماٹر', 'tomato blight', 'tomato spot', 'tomato disease'],
    response: {
      en: "🍅 Common tomato diseases:\n\n• **Early Blight** — Concentric ring spots on lower leaves. Remove infected leaves, apply Chlorothalonil.\n• **Late Blight** — Fast-spreading dark lesions. Apply Metalaxyl. Remove and destroy plants.\n• **Bacterial Spot** — Small, water-soaked spots. Use copper bactericides.\n• **Septoria Leaf Spot** — Small spots with dark border. Improve drainage, apply fungicide.\n\nWater at the base, not the leaves!",
      ur: "🍅 ٹماٹر کی عام بیماریاں:\n\n• **ارلی بلائٹ** — نچلے پتوں پر حلقوں والے دھبے۔ متاثرہ پتے ہٹائیں، کلوروتھیلونیل لگائیں۔\n• **لیٹ بلائٹ** — تیزی سے پھیلنے والے گہرے زخم۔ میٹالیکسل لگائیں۔\n• **بیکٹیریل اسپاٹ** — تانبے والی دوائیں استعمال کریں۔\n\nپانی پتوں پر نہیں، جڑ کے پاس دیں!",
      pa: "🍅 ٹماٹر دیاں عام بیماریاں:\n\n• **ارلی بلائٹ** — ہیٹھلے پتیاں تے حلقیاں والے دھبے۔ کلوروتھیلونیل لگاؤ۔\n• **لیٹ بلائٹ** — تیزی نال پھیلدے گہرے زخم۔ میٹالیکسل لگاؤ۔\n• **بیکٹیریل اسپاٹ** — تانبے والیاں دوائیاں ورتو۔",
      sd: "🍅 ٽماٽر جون عام بيماريون:\n\n• **ارلي بلائيٽ** — هيٺين پنن تي حلقن وارا داغ. ڪلوروٿيلونيل لڳايو.\n• **ليٽ بلائيٽ** — تيزيءَ سان پکڙجندڙ. ميٽالڪسل لڳايو.\n• **بيڪٽيريل اسپاٽ** — تانبي واريون دوائون استعمال ڪريو."
    }
  },
  {
    id: 'fungal_disease',
    patterns: ['fungal', 'fungus', 'fungi', 'پھپھوند', 'mold', 'mildew', 'powdery', 'downy', 'rust', 'scab', 'blight fungal'],
    response: {
      en: "🍄 Fungal diseases are the most common crop diseases. Key tips:\n\n✅ **Prevention:**\n• Good air circulation (don't overcrowd plants)\n• Water at the base, avoid wet leaves\n• Crop rotation every 2–3 years\n• Remove dead plant material\n\n✅ **Treatment:**\n• Mancozeb (broad-spectrum, affordable)\n• Copper-based fungicides (organic option)\n• Propiconazole (for rusts)\n• Apply in cool morning, not midday heat",
      ur: "🍄 پھپھوندی بیماریاں فصل کی سب سے عام بیماریاں ہیں۔ اہم مشورے:\n\n✅ **احتیاط:**\n• اچھی ہوا (پودے بہت قریب نہ لگائیں)\n• پانی جڑ کے پاس دیں، پتے گیلے نہ ہوں\n• ہر 2-3 سال فصل بدلیں\n• مردہ پودا مواد ہٹائیں\n\n✅ **علاج:**\n• مینکوزیب (سستی اور موثر)\n• تانبے والی دوائیں\n• صبح سویرے چھڑکاؤ کریں",
      pa: "🍄 پھپھوندی بیماریاں فصل دیاں سب توں عام بیماریاں نے۔\n\n✅ **احتیاط:**\n• چنگی ہوا (پودے بہت نزدیک نہ لگاؤ)\n• پانی جڑ دے نزدیک دیو\n• ہر 2-3 سال فصل بدلو\n\n✅ **علاج:**\n• مینکوزیب (سستی اتے موثر)\n• تانبے والیاں دوائیاں\n• صبح سویرے چھڑکاؤ کرو",
      sd: "🍄 پھپھوندي بيماريون فصل جون سڀ کان عام بيماريون آهن.\n\n✅ **احتياط:**\n• سٺي هوا (پودا گهڻو ويجهو نه لڳايو)\n• پاڻي پاڙ وٽ ڏيو\n• هر 2-3 سال فصل بدليو\n\n✅ **علاج:**\n• مينڪوزيب (سستي ۽ اثردار)\n• تانبي واريون دوائون"
    }
  },
  {
    id: 'bacterial_disease',
    patterns: ['bacterial', 'bacteria', 'جراثیم', 'blight bacterial', 'spot bacterial', 'canker'],
    response: {
      en: "🦠 Bacterial diseases:\n\n• Spread through water, insects, wounds, and infected tools.\n• **Signs:** Water-soaked spots, wilting, cankers, ooze from stems.\n\n✅ **Treatment:**\n• Copper hydroxide or Copper oxychloride sprays\n• Streptomycin (for severe cases)\n• Remove infected parts immediately\n• Disinfect pruning tools with bleach\n\n❌ **Antibiotics don't help** once the plant is severely infected. Prevention is key.",
      ur: "🦠 بیکٹیریل بیماریاں:\n\n• پانی، کیڑوں، زخموں اور آلودہ اوزاروں سے پھیلتی ہیں۔\n• **علامات:** پانی بھرے دھبے، مرجھانا، چھال پر زخم۔\n\n✅ **علاج:**\n• کاپر ہائیڈروکسائیڈ یا کاپر آکسیکلورائیڈ چھڑکاؤ\n• شدید حالت میں سٹریپٹومائسن\n• متاثرہ حصے فوری ہٹائیں\n• بلیچ سے اوزار صاف کریں\n\n❌ شدید انفیکشن کے بعد اینٹی بائیوٹک کم کام کرتی ہیں۔",
      pa: "🦠 بیکٹیریل بیماریاں:\n\n• پانی، کیڑیاں، زخماں اتے آلودہ اوزاراں توں پھیلدیاں نے۔\n\n✅ **علاج:**\n• کاپر ہائیڈروکسائیڈ چھڑکاؤ\n• شدید حالت وچ سٹریپٹومائسن\n• متاثرہ حصے فوری ہٹاؤ",
      sd: "🦠 بيڪٽيريل بيماريون:\n\n• پاڻي، ڪيڙن ۽ زخمن کان پکڙجن ٿيون.\n\n✅ **علاج:**\n• ڪاپر هائيڊروڪسائيڊ اسپري\n• شديد صورت ۾ اسٽريپٽومائسن\n• متاثر حصا فوري هٽايو"
    }
  },
  {
    id: 'organic_treatment',
    patterns: ['organic', 'natural', 'neem', 'home remedy', 'desi', 'قدرتی', 'desi remedy', 'neem oil', 'compost'],
    response: {
      en: "🌿 Organic / Natural treatments:\n\n• **Neem oil spray** — Effective against aphids, whitefly, fungal diseases. Mix 5ml neem oil + 1L water + few drops soap.\n• **Garlic spray** — Natural antibiotic. Blend 10 cloves in 1L water, filter and spray.\n• **Baking soda solution** — For powdery mildew. 1 tsp baking soda + 1L water + soap.\n• **Copper sulfate (Bordeaux mixture)** — Classic organic fungicide.\n• **Good compost** — Builds plant immunity.\n\n⚠️ Always test on a few leaves first!",
      ur: "🌿 قدرتی/نامیاتی علاج:\n\n• **نیم کا تیل** — افیڈز، سفید مکھی، پھپھوندی کے خلاف موثر۔ 5ml نیم تیل + 1L پانی + صابن۔\n• **لہسن کا اسپرے** — قدرتی جراثیم کش۔ 10 جوئے 1L پانی میں پیسیں، چھان کر چھڑکیں۔\n• **بیکنگ سوڈا** — پاؤڈری ملڈیو کے لیے۔ 1 چمچ + 1L پانی۔\n• **بورڈو مکسچر** — کلاسک قدرتی فنگیسائیڈ۔\n\n⚠️ پہلے چند پتوں پر آزمائیں!",
      pa: "🌿 قدرتی علاج:\n\n• **نیم دا تیل** — افیڈز، سفید مکھی خلاف موثر۔ 5ml نیم + 1L پانی + صابن۔\n• **لہسن دا اسپرے** — 10 جوئے 1L پانی وچ پیسو، چھانو کے چھڑکو۔\n• **بیکنگ سوڈا** — 1 چمچ + 1L پانی۔\n\n⚠️ پہلے تھوڑے پتیاں تے آزماؤ!",
      sd: "🌿 قدرتي علاج:\n\n• **نيم جو تيل** — افيڊس، اڇي مکي خلاف اثردار. 5ml نيم + 1L پاڻي + صابڻ.\n• **لهسڻ اسپري** — 10 ڏاڙا 1L پاڻي ۾ پيهيو، ڇاڻي ڪريو.\n• **بيڪنگ سوڊا** — 1 چمچ + 1L پاڻي.\n\n⚠️ پهريان ڪجهه پنن تي آزمايو!"
    }
  },
  {
    id: 'pesticide_safety',
    patterns: ['pesticide', 'chemical', 'spray', 'دوائی', 'کیڑا مار', 'safety', 'dosage', 'application', 'fungicide'],
    response: {
      en: "⚠️ Pesticide safety tips:\n\n🧤 **Personal protection:**\n• Always wear gloves, mask, and eye protection\n• Wash hands thoroughly after application\n• Never eat or drink while spraying\n\n⏰ **Best time to spray:**\n• Early morning (5–8 AM) or evening (5–7 PM)\n• Avoid spraying in strong wind or rain\n• Don't spray in midday heat (evaporation wastes chemical)\n\n📏 **Dosage:**\n• Follow label exactly — more is NOT better\n• Calibrate your sprayer before use",
      ur: "⚠️ کیڑا مار دوائیوں کے استعمال کے اہم اصول:\n\n🧤 **ذاتی حفاظت:**\n• ہمیشہ دستانے، ماسک اور آنکھوں کی حفاظت پہنیں\n• استعمال کے بعد ہاتھ اچھی طرح دھوئیں\n• چھڑکاؤ کے دوران کھانا پینا نہ کریں\n\n⏰ **چھڑکاؤ کا بہترین وقت:**\n• صبح سویرے (5-8 بجے) یا شام (5-7 بجے)\n• تیز ہوا یا بارش میں نہ چھڑکیں\n\n📏 **مقدار:**\n• لیبل کی ہدایت پر سختی سے عمل کریں",
      pa: "⚠️ کیڑا مار دوائیاں دے استعمال دے اصول:\n\n🧤 **ذاتی حفاظت:**\n• ہمیشہ دستانے، ماسک اتے آنکھاں دی حفاظت پاؤ\n• استعمال دے بعد ہتھ چنگی طرح دھوؤ\n\n⏰ **بہترین ویلا:**\n• صبح سویرے (5-8 وجے) یا شام (5-7 وجے)\n\n📏 **مقدار:**\n• لیبل دی ہدایت تے عمل کرو",
      sd: "⚠️ ڪيڙا مار دوائون استعمال جا اصول:\n\n🧤 **ذاتي حفاظت:**\n• هميشه دستانا، ماسڪ ۽ اکين جي حفاظت پائو\n• استعمال بعد هٿ سٺي طرح ڌوئو\n\n⏰ **بهترين وقت:**\n• صبح سوير (5-8 وڳي) يا شام (5-7 وڳي)\n\n📏 **مقدار:**\n• ليبل جي هدايت تي سختيءَ سان عمل ڪريو"
    }
  },
  {
    id: 'irrigation',
    patterns: ['water', 'irrigation', 'pani', 'پانی', 'آبپاشی', 'drip', 'flood irrigation', 'watering'],
    response: {
      en: "💧 Irrigation tips for healthy crops:\n\n• **Water at the base** — not on leaves to reduce fungal diseases\n• **Morning watering** is best — leaves dry by afternoon\n• **Avoid waterlogging** — most crops die from overwatering, not underwatering\n• **Drip irrigation** saves 30–50% water and reduces disease\n• **Check soil moisture** — push finger 5cm into soil. If dry, water. If wet, wait.\n\n🌾 **Wheat:** 4–5 irrigations per season\n🌿 **Cotton:** 8–10 irrigations\n🍚 **Rice:** Keep 5–10cm water layer",
      ur: "💧 صحت مند فصل کے لیے آبپاشی کے مشورے:\n\n• **جڑ کے پاس پانی دیں** — پتوں پر نہیں، پھپھوندی کم ہوگی\n• **صبح پانی دینا** بہترین ہے\n• **زیادہ پانی سے بچیں** — زیادہ تر فصلیں زیادہ پانی سے ضائع ہوتی ہیں\n• **ڈرپ آبپاشی** 30-50% پانی بچاتی ہے\n\n🌾 **گندم:** 4-5 آبپاشی\n🌿 **کپاس:** 8-10 آبپاشی\n🍚 **چاول:** 5-10 سینٹی میٹر پانی کی تہ",
      pa: "💧 صحتمند فصل لئی آبپاشی دے مشورے:\n\n• **جڑ دے نزدیک پانی دیو** — پتیاں تے نئیں\n• **صبح پانی دینا** بہترین اے\n• **بہت زیادہ پانی توں بچو**\n\n🌾 **گندم:** 4-5 آبپاشیاں\n🌿 **کپاہ:** 8-10 آبپاشیاں\n🍚 **چاول:** 5-10 سینٹی میٹر پانی",
      sd: "💧 صحتمند فصل لاءِ آبپاشي جون صلاحون:\n\n• **پاڙ وٽ پاڻي ڏيو** — پنن تي نه\n• **صبح پاڻي ڏيڻ** بهترين آهي\n• **گهڻي پاڻي کان بچو**\n\n🌾 **ڪڻڪ:** 4-5 آبپاشيون\n🌿 **ڪپهه:** 8-10 آبپاشيون\n🍚 **چانور:** 5-10 سينٽيميٽر پاڻي"
    }
  },
  {
    id: 'crop_rotation',
    patterns: ['rotation', 'crop rotation', 'فصل بدلنا', 'schedule', 'planting season', 'when to plant', 'kab lagaen'],
    response: {
      en: "🔄 Crop rotation benefits:\n\n✅ Breaks disease cycles\n✅ Improves soil health\n✅ Reduces pest buildup\n✅ Better yields over time\n\n**Pakistan crop calendar:**\n• **Kharif (May–Oct):** Cotton, Rice, Maize, Sugarcane, Vegetables\n• **Rabi (Oct–Apr):** Wheat, Mustard, Gram, Potato, Peas\n\n**Good rotations:**\n• Wheat → Cotton → Wheat\n• Potato → Wheat → Maize\n• Avoid same crop 2+ years in same field",
      ur: "🔄 فصل بدلنے کے فوائد:\n\n✅ بیماریوں کا چکر توڑتا ہے\n✅ مٹی کی صحت بہتر ہوتی ہے\n✅ کیڑوں میں کمی\n\n**پاکستان کا فصلی کیلنڈر:**\n• **خریف (مئی-اکتوبر):** کپاس، چاول، مکئی، گنا، سبزیاں\n• **ربیع (اکتوبر-اپریل):** گندم، سرسوں، چنا، آلو، مٹر\n\n**اچھی تبدیلی:**\n• گندم → کپاس → گندم\n• ایک ہی کھیت میں 2+ سال ایک ہی فصل نہ لگائیں",
      pa: "🔄 فصل بدلن دے فائدے:\n\n✅ بیماریاں دا چکر توڑدا اے\n✅ مٹی دی صحت بہتر ہندی اے\n\n**پاکستان دا فصلی کیلنڈر:**\n• **خریف (مئی-اکتوبر):** کپاہ، چاول، مکئی\n• **ربیع (اکتوبر-اپریل):** گندم، سرسوں، چنا، آلو\n\n**اکو کھیت وچ 2+ سال اکو فصل نہ لگاؤ**",
      sd: "🔄 فصل بدلڻ جا فائدا:\n\n✅ بيمارين جو چڪر ٽوڙي ٿو\n✅ مٽي جي صحت بهتر ٿئي ٿي\n\n**پاڪستان فصلي ڪيلينڊر:**\n• **خريف (مئي-آڪٽوبر):** ڪپهه، چانور، مڪئي\n• **ربيع (آڪٽوبر-اپريل):** ڪڻڪ، سرهون، چڻا، آلو\n\n**هڪ کيت ۾ 2+ سال ساڳي فصل نه لڳايو**"
    }
  },
  {
    id: 'fertilizer',
    patterns: ['fertilizer', 'khad', 'کھاد', 'nitrogen', 'urea', 'DAP', 'nutrient', 'soil', 'مٹی'],
    response: {
      en: "🌱 Fertilizer guide:\n\n**Basic NPK needs:**\n• Nitrogen (N) — Leaf growth, green color. Urea (46% N)\n• Phosphorus (P) — Root development. DAP (18-46-0)\n• Potassium (K) — Disease resistance, fruit quality. SOP/MOP\n\n**General schedule:**\n• Apply half nitrogen at planting, half at tillering\n• Phosphorus & potassium at planting\n\n⚠️ **Soil test first!** — Excess fertilizer causes salt buildup and burns roots\n🌿 **Compost** improves soil structure alongside chemical fertilizers",
      ur: "🌱 کھاد کی رہنمائی:\n\n**NPK کی ضروریات:**\n• نائٹروجن (N) — پتوں کی نشوونما۔ یوریا (46% N)\n• فاسفورس (P) — جڑ کی نشوونما۔ DAP\n• پوٹاشیم (K) — بیماری مزاحمت۔ SOP/MOP\n\n**عمومی شیڈول:**\n• نائٹروجن آدھا بوائی پر، آدھا کشتہ پر\n\n⚠️ **پہلے مٹی ٹیسٹ کروائیں!** — زیادہ کھاد نقصان دہ ہے",
      pa: "🌱 کھاد دی رہنمائی:\n\n**NPK ضروریات:**\n• نائٹروجن — پتیاں دی نشوونما۔ یوریا\n• فاسفورس — جڑ نشوونما۔ DAP\n• پوٹاشیم — بیماری مزاحمت۔ SOP\n\n⚠️ **پہلے مٹی ٹیسٹ کرواؤ!**",
      sd: "🌱 کهاد جي رهنمائي:\n\n**NPK ضرورتون:**\n• نائٽروجن — پنن جي واڌ. يوريا\n• فاسفورس — پاڙ واڌ. DAP\n• پوٽاشيم — بيماري مزاحمت. SOP\n\n⚠️ **پهريان مٽي ٽيسٽ ڪرايو!**"
    }
  },
  {
    id: 'emergency',
    patterns: ['emergency', 'urgent', 'dying', 'help', 'مدد', 'جلدی', 'فوری', 'whole crop', 'total loss', 'severe'],
    response: {
      en: "🚨 Emergency crop assistance:\n\n**Immediate steps:**\n1. Take photos with FasalDoc NOW to identify the problem\n2. Remove and destroy infected plants (don't compost them!)\n3. Stop overhead irrigation immediately\n4. Contact your local agricultural extension officer\n\n📞 **Pakistan Agricultural Helpline:** 0800-15000 (Free)\n\n⚠️ For large-scale losses, contact your provincial agriculture department for emergency assistance.",
      ur: "🚨 فوری فصل مدد:\n\n**فوری اقدامات:**\n1. ابھی فصل ڈاک سے تصویر لے کر مسئلہ پہچانیں\n2. متاثرہ پودے ہٹائیں اور جلائیں (کمپوسٹ نہ کریں!)\n3. اوپر سے پانی فوری بند کریں\n4. زرعی توسیع افسر سے رابطہ کریں\n\n📞 **پاکستان زرعی ہیلپ لائن:** 0800-15000 (مفت)",
      pa: "🚨 فوری فصل مدد:\n\n**فوری قدم:**\n1. ہُنے فصل ڈاک توں تصویر لو\n2. متاثرہ پودے ہٹاؤ اتے جلاؤ\n3. اوپروں پانی فوری بند کرو\n4. زرعی توسیع افسر نال رابطہ کرو\n\n📞 **زرعی ہیلپ لائن:** 0800-15000 (مفت)",
      sd: "🚨 فوري فصل مدد:\n\n**فوري قدم:**\n1. هاڻ فصل ڊاڪ کان تصوير وٺو\n2. متاثر پودا هٽايو ۽ ساڙيو\n3. مٿان پاڻي فوري بند ڪريو\n4. زرعي توسيع آفيسر سان رابطو ڪريو\n\n📞 **زرعي هيلپ لائن:** 0800-15000 (مفت)"
    }
  },
  {
    id: 'how_to_use_app',
    patterns: ['how', 'how to use', 'how does', 'app', 'use fasaldoc', 'استعمال', 'ایپ کیسے'],
    response: {
      en: "📱 How to use FasalDoc:\n\n1️⃣ **Scan** — Tap 'Open Camera' or 'Choose from Gallery'\n2️⃣ **Photo tips** — Good light, leaf flat, fill the frame\n3️⃣ **Results** — See disease name, confidence score, and severity\n4️⃣ **Treatment** — Tap 'View Treatment' for full treatment guide\n5️⃣ **Shops** — Find nearby shops that stock the medicine\n6️⃣ **Community** — Share experiences with other farmers\n7️⃣ **Videos** — Watch farming guide videos\n\n🌍 Works in English, Urdu, Punjabi, and Sindhi!",
      ur: "📱 فصل ڈاک کیسے استعمال کریں:\n\n1️⃣ **اسکین** — 'کیمرہ کھولیں' یا 'گیلری سے منتخب' کریں\n2️⃣ **تصویر** — اچھی روشنی، پتہ سیدھا، فریم بھریں\n3️⃣ **نتائج** — بیماری، اعتماد اور شدت دیکھیں\n4️⃣ **علاج** — مکمل علاج کی رہنمائی دیکھیں\n5️⃣ **دکانیں** — نزدیکی دکانیں ڈھونڈیں\n6️⃣ **کمیونٹی** — دوسرے کسانوں سے تجربے شیئر کریں\n7️⃣ **ویڈیوز** — رہنمائی ویڈیوز دیکھیں",
      pa: "📱 فصل ڈاک کیویں ورتیں:\n\n1️⃣ **سکین** — 'کیمرہ کھولو' یا 'گیلری توں چنو'\n2️⃣ **تصویر** — چنگی روشنی، پتا سِدھا\n3️⃣ **نتیجے** — بیماری، اعتماد اتے شدت ویکھو\n4️⃣ **علاج** — مکمل علاج دی رہنمائی ویکھو\n5️⃣ **دکانیں** — نزدیکی دکانیں لبھو",
      sd: "📱 فصل ڊاڪ ڪيئن استعمال ڪريو:\n\n1️⃣ **اسڪين** — 'ڪيمرو کوليو' يا 'گيلري مان چونڊيو'\n2️⃣ **تصوير** — چڱي روشني، پن سڌو\n3️⃣ **نتيجا** — بيماري، اعتماد ۽ شدت ڏسو\n4️⃣ **علاج** — مڪمل علاج جي رهنمائي ڏسو\n5️⃣ **دڪان** — ويجها دڪان ڳوليو"
    }
  },
  {
    id: 'thanks',
    patterns: ['thank', 'thanks', 'shukriya', 'شکریہ', 'jazakallah', 'جزاک اللہ', 'helpful', 'great', 'good', 'perfect'],
    response: {
      en: "You're welcome! 🌾 Happy farming! Feel free to ask anything anytime. I'm always here to help your crops stay healthy. May your harvest be abundant! 🙏",
      ur: "خوشی سے! 🌾 کاشتکاری مبارک ہو! جب بھی کوئی سوال ہو پوچھیں۔ آپ کی فصل ہمیشہ صحت مند رہے۔ اللہ آپ کو برکت دے! 🙏",
      pa: "خوشی نال! 🌾 کاشتکاری مبارک! جدوں وی کوئی سوال ہووے پچھو۔ تہاڈی فصل ہمیشہ صحتمند رہے۔ ربّ رکھا! 🙏",
      sd: "خوشيءَ سان! 🌾 زراعت مبارڪ! جڏهن به سوال هجي پڇو. توهانجي فصل هميشه صحتمند رهي. الله توهان کي برڪت ڏي! 🙏"
    }
  },
  {
    id: 'fallback',
    patterns: [],
    response: {
      en: "I'm not sure about that. Try asking about:\n• A specific disease (e.g., 'apple scab', 'wheat rust')\n• Organic treatments\n• Pesticide safety\n• Irrigation tips\n• How to use the app\n\nOr scan a leaf photo for instant diagnosis! 📸",
      ur: "مجھے یقین نہیں ہے۔ یہ پوچھنے کی کوشش کریں:\n• کوئی مخصوص بیماری (مثلاً 'گندم زنگ'، 'آلو بلائٹ')\n• قدرتی علاج\n• کیڑا مار دوائیوں کی حفاظت\n• آبپاشی کے مشورے\n\nیا فوری تشخیص کے لیے پتے کی تصویر اسکین کریں! 📸",
      pa: "مینوں پکا نئیں پتہ۔ ایہہ پچھن دی کوشش کرو:\n• کوئی خاص بیماری\n• قدرتی علاج\n• کیڑا مار دوائیاں دی حفاظت\n\nیا تصویر اسکین کرو! 📸",
      sd: "مون کي پڪ نه آهي. هي پڇڻ جي ڪوشش ڪريو:\n• ڪا مخصوص بيماري\n• قدرتي علاج\n• ڪيڙا مار دوائن جي حفاظت\n\nيا تصوير اسڪين ڪريو! 📸"
    }
  },
]

export function getResponse(input: string, lang: 'en' | 'ur' | 'pa' | 'sd'): string {
  const normalized = input.toLowerCase().trim()

  let bestMatch: KBEntry | null = null
  let bestScore = 0

  for (const entry of KB) {
    if (entry.id === 'fallback') continue
    let score = 0
    for (const pattern of entry.patterns) {
      if (normalized.includes(pattern.toLowerCase())) score++
    }
    if (score > bestScore) { bestScore = score; bestMatch = entry }
  }

  const entry = bestScore > 0 ? bestMatch! : KB.find(e => e.id === 'fallback')!
  return entry.response[lang]
}
