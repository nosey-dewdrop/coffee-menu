let currentIngredients = [];
let currentStep = "base";
let totalPrice = 0;

const coffeeRecognition = {
    "espresso_single,nothing": { "name": "Espresso", "visual": "☕" },
    "espresso_double,nothing": { "name": "Doppio Espresso", "visual": "☕" },
    "espresso_single": { "name": "Espresso Shot", "visual": "☕" },
    "espresso_double": { "name": "Double Espresso Shot", "visual": "☕" },
    
    "espresso_single,hot_water": { "name": "Americano", "visual": "🫖" },
    "espresso_double,hot_water": { "name": "Long Americano", "visual": "🫖" },
    
    "espresso_single,steamed_milk": { "name": "Flat White", "visual": "🥛" },
    "espresso_single,steamed_milk,milk_foam": { "name": "Latte", "visual": "🥛" },
    "espresso_double,steamed_milk,milk_foam": { "name": "Strong Latte", "visual": "🥛" },
    "espresso_single,steamed_milk,no_foam": { "name": "Flat White", "visual": "🥛" },
    
    "espresso_single,hot_milk,thick_foam": { "name": "Cappuccino", "visual": "🍵" },
    "espresso_single,steamed_milk,thick_foam": { "name": "Cappuccino", "visual": "🍵" },
    "espresso_double,steamed_milk,thick_foam": { "name": "Strong Cappuccino", "visual": "🍵" },
    
    "espresso_single,milk_foam": { "name": "Espresso Macchiato", "visual": "☕" },
    "espresso_double,milk_foam": { "name": "Doppio Macchiato", "visual": "☕" },
    "espresso_single,thick_foam": { "name": "Macchiato", "visual": "☕" },
    
    "espresso_single,chocolate": { "name": "Espresso con Cioccolato", "visual": "🍫" },
    "espresso_single,chocolate,steamed_milk": { "name": "Mocha", "visual": "🍫" },
    "espresso_single,chocolate,hot_milk": { "name": "Hot Chocolate Coffee", "visual": "🍫" },
    "espresso_single,chocolate,steamed_milk,milk_foam": { "name": "Mocha Latte", "visual": "🍫" },
    "espresso_single,chocolate,steamed_milk,thick_foam": { "name": "Mocha Cappuccino", "visual": "🍫" },
    
    "espresso_single,warm_milk": { "name": "Cortado", "visual": "🥛" },
    "espresso_double,warm_milk": { "name": "Gibraltar", "visual": "🥛" },
    
    "espresso_single,steamed_milk,caramel": { "name": "Caramel Latte", "visual": "🍯" },
    "espresso_single,steamed_milk,vanilla": { "name": "Vanilla Latte", "visual": "🌟" },
    "espresso_single,cold_milk": { "name": "Iced Latte", "visual": "🧊" },
    "espresso_single,whipped_cream": { "name": "Espresso con Panna", "visual": "☁️" },
    
    "turkish_coffee": { "name": "Türk Kahvesi", "visual": "☕" },
    "filter_coffee": { "name": "Filtre Kahve", "visual": "☕" },
    "filter_coffee,hot_milk": { "name": "Café au Lait", "visual": "🥛" }
};

const coffeeData = {
    "base": {
        "title": "1. Choose your coffee base",
        "options": [
            {
                "id": "espresso_single",
                "icon": "☕",
                "title": "Single Shot Espresso",
                "desc": "Classic single shot espresso",
                "price": 15,
                "visual": "☕"
            },
            {
                "id": "espresso_double",
                "icon": "☕☕",
                "title": "Double Shot Espresso",
                "desc": "Strong double shot espresso",
                "price": 20,
                "visual": "☕"
            }
        ]
    },
    
    "addition": {
        "title": "2. What would you like to add?",
        "options": [
            {
                "id": "hot_water",
                "icon": "💧",
                "title": "Hot Water",
                "desc": "For making Americano",
                "price": 0,
                "makes": "Americano"
            },
            {
                "id": "steamed_milk",
                "icon": "🥛",
                "title": "Steamed Milk",
                "desc": "For Latte/Cappuccino",
                "price": 5,
                "visual": "🥛"
            },
            {
                "id": "hot_milk",
                "icon": "🥛",
                "title": "Hot Milk",
                "desc": "For smooth taste",
                "price": 3,
                "visual": "🥛"
            },
            {
                "id": "warm_milk",
                "icon": "🥛",
                "title": "Warm Milk",
                "desc": "For Cortado/Gibraltar",
                "price": 4,
                "visual": "🥛"
            },
            {
                "id": "cold_milk",
                "icon": "🧊",
                "title": "Cold Milk",
                "desc": "For Iced Latte",
                "price": 4,
                "visual": "🧊"
            },
            {
                "id": "chocolate",
                "icon": "🍫",
                "title": "Chocolate Sauce",
                "desc": "For Mocha",
                "price": 4,
                "visual": "🍫"
            },
            {
                "id": "caramel",
                "icon": "🍯",
                "title": "Caramel Sauce",
                "desc": "For Caramel Latte",
                "price": 4,
                "visual": "🍯"
            },
            {
                "id": "vanilla",
                "icon": "🌟",
                "title": "Vanilla Syrup",
                "desc": "For Vanilla Latte",
                "price": 3,
                "visual": "🌟"
            },
            {
                "id": "whipped_cream",
                "icon": "☁️",
                "title": "Whipped Cream",
                "desc": "For Espresso con Panna",
                "price": 3,
                "visual": "☁️"
            },
            {
                "id": "nothing",
                "icon": "✋",
                "title": "Nothing",
                "desc": "Plain espresso",
                "price": 0,
                "makes": "Espresso"
            }
        ]
    },
    
    "foam": {
        "title": "3. Would you like to add foam?",
        "options": [
            {
                "id": "milk_foam",
                "icon": "☁️",
                "title": "Milk Foam",
                "desc": "Light foam layer",
                "price": 2
            },
            {
                "id": "thick_foam",
                "icon": "☁️☁️",
                "title": "Thick Foam",
                "desc": "Rich foam",
                "price": 3
            },
            {
                "id": "no_foam",
                "icon": "🚫",
                "title": "I don't want foam",
                "desc": "No foam preference",
                "price": 0
            }
        ]
    }
};

const coffeeSuggestions = {

      "espresso_single,steamed_milk": [
        { suggestion: "Add milk foam to make a Latte", ingredients: ["milk_foam"] },
        { suggestion: "Add thick foam to make a Cappuccino", ingredients: ["thick_foam"] },
        { suggestion: "Add chocolate to make a Mocha", ingredients: ["chocolate"] }
      ],
      "espresso_single,chocolate": [
        { suggestion: "Add steamed milk to make a complete Mocha", ingredients: ["steamed_milk"] },
        { suggestion: "Add hot milk for hot chocolate flavor", ingredients: ["hot_milk"] }
      ],
      "espresso_single": [
        { suggestion: "Add hot water to make an Americano", ingredients: ["hot_water"] },
        { suggestion: "Add steamed milk to make a Latte", ingredients: ["steamed_milk"] },
        { suggestion: "Add milk foam to make a Macchiato", ingredients: ["milk_foam"] }
      ]
};

function initializeCoffeeBuilder() {
      showOptions("base");
      createFloatingBeans();
}

document.addEventListener('DOMContentLoaded', function() {
      initializeCoffeeBuilder();
});

function selectOption(option) {     
      currentIngredients.push(option.id);

      if (currentStep == "base"){
            showOptions("addition");
      }
      else if(currentStep == "addition"){
            if (option.makes){

                  finalizeCoffee();
            }
            else if (option.id === 'steamed_milk' || option.id === 'hot_milk') {
                  showOptions('foam');
            }
            else {
                  finalizeCoffee();
            }
      }
      else if(currentStep == "foam"){
            finalizeCoffee();
      }
}

/**
 * creates continuous floating coffee beans animation in background
 * generates beans with random positions and fall speeds
 * automatically removes beans after animation completes
 * @returns {void}
 */
function createFloatingBeans() {
    const beansContainer = document.getElementById("floatingBeans");
    const beanSymbols = ["☕", "🫘", "☕", "🫘"];
    
    // create new bean every 1.2 seconds
      setInterval(function() {
            const bean = document.createElement("div");
            bean.className = "bean";
            
            // random bean symbol selection
            const randomSymbol = beanSymbols[Math.floor(Math.random() * beanSymbols.length)];
            bean.textContent = randomSymbol;
            
            // random horizontal position (0-100%)
            bean.style.left = Math.random() * 100 + "%";
            
            // random fall duration (5-8 seconds)
            bean.style.animationDuration = (Math.random() * 3 + 5) + "s";
            
            beansContainer.appendChild(bean);
            
            // remove bean after animation completes
            setTimeout(function() { bean.remove(); }, 8000);
      }, 1200);

}

/**

initializeCoffeeBuilder()
      calls => showOptions(step)

showOptions(step)    
      updates stepTitle
      updates optionsGrid 

updateCoffeeDisplay()
      updates ingredientList
      update coffeeVisual
      displays coffeeName
      * real time display *


showSuggestions() 
      shows suggestions.
      update suggestions div
      lists suggestions. click function to suggestions.
      

selectOption(option)
      add the option.id (what ve added) to currentIngredients

removeIngredient(index)

applySuggestion(ingredientId)

finalizeCoffee()

findOptionById(id)

resetCoffee()

finishCoffee()

createCelebration()
 */


/**
 * Interactive Coffee Builder - Clean Version
 * HTML Elements:
 * - floatingBeans (container)
 * - stepTitle (displays current step)
      * - coffeeVisual (emoji display)
      * - ingredientsList (selected ingredients)
      * - coffeeName (recognized coffee name)
      * - suggestions (recommendations)
      * - priceDisplay (total price)
 * - optionsGrid (available choices)
      * - resetBtn (restart button)
      * - finishBtn (complete order button)
 */