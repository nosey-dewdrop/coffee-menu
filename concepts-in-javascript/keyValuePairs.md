const basit = {
  'anahtar': 'değer'
}

const icIce = {
  'anahtar': {          // ← Dış key
    'ic_anahtar': 'değer'   // ← İç key
  }
}

const coffeeRecognition = {
  // DIŞ KEY: malzeme listesi
  'espresso_single,steamed_milk': {
    // İÇ KEY-VALUE'LAR:
    name: 'Flat White',  // name = iç key, 'Flat White' = iç value
    visual: '🥛'         // visual = iç key, '🥛' = iç value
  }
}