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

function showOptions(step) {
    currentStep = step;
    const stepData = coffeeData[step];

    document.getElementById('stepTitle').textContent = stepData.title;

    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';

    for (let i = 0; i < stepData.options.length; i++) {
        const option = stepData.options[i];
        
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.innerHTML = 
            '<span class="option-icon">' + option.icon + '</span>' +
            '<div class="option-title">' + option.title + '</div>' +
            '<div class="option-desc">' + option.desc + '</div>' ;
        
        optionCard.addEventListener('click', function() {
            selectOption(option);
        });
        
        optionsGrid.appendChild(optionCard);
    }
}

function selectOption(option) {     
      currentIngredients.push(option.id);
      updateCoffeeDisplay();

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

function findOptionById(id) {
    for (const step in coffeeData) {
        for (let i = 0; i < coffeeData[step].options.length; i++) {
            if (coffeeData[step].options[i].id === id) {
                return coffeeData[step].options[i];
            }
        }
    }
    return null;
}

function updateCoffeeDisplay() {
    const ingredientsList = document.getElementById('ingredientsList');
    const coffeeVisual = document.getElementById('coffeeVisual');
    const coffeeName = document.getElementById('coffeeName');
    
    ingredientsList.innerHTML = '';
    for (let i = 0; i < currentIngredients.length; i++) {
        const option = findOptionById(currentIngredients[i]);
        if (option) {
            const chip = document.createElement('div');
            chip.className = 'ingredient-chip';
            chip.innerHTML = option.icon + ' ' + option.title + 
                           '<button class="remove-btn" onclick="removeIngredient(' + i + ')">×</button>';
            ingredientsList.appendChild(chip);
        }
    }
    
    const coffeeKey = currentIngredients.join(',');
    const recognizedCoffee = coffeeRecognition[coffeeKey];
    if (recognizedCoffee) {
        coffeeName.textContent = recognizedCoffee.name;
        coffeeVisual.textContent = recognizedCoffee.visual;
    }
    
    showSuggestions();
}

function showSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    // html'deki suggestions id'li ürünleri getiriyor ama. öyle id bir ürün yok? ekliyor muyum? 
    const coffeeKey = currentIngredients.join(',');
    const suggestions = coffeeSuggestions[coffeeKey];
    
    if (suggestions && currentIngredients.length > 0 && currentIngredients.length < 3) {
        suggestionsDiv.style.display = 'block';
        suggestionsDiv.innerHTML = `
            <h4>☕️ Suggestions:</h4>
            ${suggestions.map(s => 
                `<div class="suggestion-item" onclick="applySuggestion('${s.ingredients[0]}')">${s.suggestion}</div>`
            ).join('')}
        `;
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

function removeIngredient(index) {
    currentIngredients.splice(index, 1);
    updateCoffeeDisplay();

    if (currentIngredients.length === 0) {
        document.getElementById('coffeeVisual').textContent = '🫗';
        document.getElementById('coffeeName').textContent = 'Empty.';
        showOptions('base');
    } 

    else {
        if (currentIngredients.length === 1) {
            showOptions('addition');
        } 
        else if (currentIngredients.length === 2) {
            const secondIngredient = currentIngredients[1];
            if (secondIngredient === 'steamed_milk' || secondIngredient === 'hot_milk') {
                showOptions('foam');
            } 
            else {
                showOptions('addition');
            }
        }
    }
}

function applySuggestion(ingredientId) {
    // find the suggested ingredient
    const optionData = findOptionById(ingredientId);
    if (optionData) {
        // add it like a normal selection
        selectOption(optionData);
}
}

function finalizeCoffee() {
    // change title to completion message
    document.getElementById('stepTitle').textContent = "🎉 Your coffee is ready!";

    // hide all option cards
    document.getElementById('optionsGrid').innerHTML = '';

    // show action buttons
    document.getElementById('resetBtn').style.display = 'inline-block';
    document.getElementById('finishBtn').style.display = 'inline-block';

    // final coffee recognition
    const coffeeKey = currentIngredients.join(',');
    const recognizedCoffee = coffeeRecognition[coffeeKey];

    if (recognizedCoffee) {
        document.getElementById('coffeeName').textContent = recognizedCoffee.name;
        document.getElementById('coffeeVisual').textContent = recognizedCoffee.visual;
    }
}

function resetCoffee() {
    currentIngredients = [];
    currentStep = 'base';
    totalPrice = 0;
    
    document.getElementById('ingredientsList').innerHTML = '';
    document.getElementById('coffeeVisual').textContent = '🫗';
    document.getElementById('coffeeName').textContent = 'Empty.';
    document.getElementById('suggestions').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'none';
    
    showOptions('base');
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

function createCelebration() {
    const colors = ['#d4a574', '#f4c430', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'confetti-fall 3s linear forwards'; 
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

initializeCoffeeBuilder();

function finishCoffee() {
    const coffeeName = document.getElementById('coffeeName').textContent;
    alert(`🎉Order received!!\nOrdered: ${coffeeName}\nPreparing...`);
    createCelebration();
    
    setTimeout(() => {
        resetCoffee();
    }, 3000);
}