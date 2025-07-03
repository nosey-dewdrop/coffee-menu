/*
floatingBeans


1. stepTitle

2. no id. 
      2.1 coffeeVisual
      2.2 ingredientsList
      2.3 coffeeName
      2.4 suggestions    
      2.5 priceDisplay   

3. optionsGrid
4. no id.
      4.1 resetBtn onclick="resetCoffee()"
      4.2 finishBtn onclick="finishCoffee()"
*/


let currentIngredients = [];
let currentStep = 'base';
let totalPrice = 0;

const coffeeRecognition = {
      
      "espresso_single,nothing": { name: 'Espresso', visual: '☕' },
      "espresso_double,nothing": { name: 'Doppio Espresso', visual: '☕' },
      'espresso_single': { name: 'Espresso Shot', visual: '☕' },
      'espresso_double': { name: 'Double Espresso Shot', visual: '☕' },

      'espresso_single,hot_water': { name: 'Americano', visual: '🫖' },
      'espresso_double,hot_water': { name: 'Long Americano', visual: '🫖' },

      'espresso_single,steamed_milk': { name: 'Flat White', visual: '🥛' },
      'espresso_single,steamed_milk,milk_foam': { name: 'Latte', visual: '🥛' },
      'espresso_double,steamed_milk,milk_foam': { name: 'Strong Latte', visual: '🥛' },
      'espresso_single,steamed_milk,no_foam': { name: 'Flat White', visual: '🥛' },

      'espresso_single,hot_milk,thick_foam': { name: 'Cappuccino', visual: '🍵' },
      'espresso_single,steamed_milk,thick_foam': { name: 'Cappuccino', visual: '🍵' },
      'espresso_double,steamed_milk,thick_foam': { name: 'Strong Cappuccino', visual: '🍵' },

      'espresso_single,milk_foam': { name: 'Espresso Macchiato', visual: '☕' },
      'espresso_double,milk_foam': { name: 'Doppio Macchiato', visual: '☕' },
      'espresso_single,thick_foam': { name: 'Macchiato', visual: '☕' },

      'espresso_single,chocolate': { name: 'Espresso con Cioccolato', visual: '🍫' },
      'espresso_single,chocolate,steamed_milk': { name: 'Mocha', visual: '🍫' },
      'espresso_single,chocolate,hot_milk': { name: 'Hot Chocolate Coffee', visual: '🍫' },
      'espresso_single,chocolate,steamed_milk,milk_foam': { name: 'Mocha Latte', visual: '🍫' },
      'espresso_single,chocolate,steamed_milk,thick_foam': { name: 'Mocha Cappuccino', visual: '🍫' },

      'espresso_single,warm_milk': { name: 'Cortado', visual: '🥛' },
      'espresso_double,warm_milk': { name: 'Gibraltar', visual: '🥛' },

      'espresso_single,steamed_milk,caramel': { name: 'Caramel Latte', visual: '🍯' },
      'espresso_single,steamed_milk,vanilla': { name: 'Vanilla Latte', visual: '🌟' },
      'espresso_single,cold_milk': { name: 'Iced Latte', visual: '🧊' },
      'espresso_single,whipped_cream': { name: 'Espresso con Panna', visual: '☁️' },

      'turkish_coffee': { name: 'Türk Kahvesi', visual: '☕' },

      'filter_coffee': { name: 'Filtre Kahve', visual: '☕' },
      'filter_coffee,hot_milk': { name: 'Café au Lait', visual: '🥛' }
};



/**
 * floating coffee beans animation creator
 * creates continuous falling beans effect in background
 * @returns {void}
 */
function createFloatingBeans() {
      const beansContainer = document.getElementById('floatingBeans');
      const beanSymbols = ['☕', '🫘', '☕', '🫘'];

      setInterval(function() {
            const bean = document.createElement('div');
            bean.className = 'bean';

            bean.textContent = beanSymbols[Math.floor(Math.random() * beanSymbols.length)];
            bean.style.left = Math.random() * 100 + '%';
            bean.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            beansContainer.appendChild(bean);
            
            setTimeout(function() {
                  bean.remove();
            }, 8000);
      }, 1200);
}

createFloatingBeans();

