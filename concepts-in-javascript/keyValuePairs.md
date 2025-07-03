
## key-value mapping system in javascript
'espresso_single,steamed_milk,milk_foam': { name: 'Latte', visual: '🥛' }
i can design it however i really want to, they all don't have to have two attributes.

const sozluk = {
      'anahtar': "değer", 
      'baska_anahtar': 'başka_değer'
}

console.log(sozluk["anahtar"]);

const kahveRehberi = {
  'latte': ['espresso', 'süt', 'köpük'],
  'americano': ['espresso', 'sıcak_su'],
  'mocha': ['espresso', 'süt', 'çikolata', 'köpük']
}

"key1": "string value",     // string
"key2": 15,                 // number  
"key3": { },                // obje
"key4": [ ]                 // array