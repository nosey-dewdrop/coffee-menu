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

const coffeeData = {
    base: {
        title: "1. Choose the base",
        options: [
            {
                id: 'espresso_single',
                icon: '☕',
                title: 'Sıngle Shot Espresso',
                desc: 'Single Shot Espresso',
                price: 15,
                visual: '☕'
            },
            {
                id: 'espresso_double',
                icon: '☕☕',
                title: 'Double Shot Espresso',
                desc: 'Double Shot espresso',
                price: 20,
                visual: '☕'
            }
        ]
    },
    addition: {
        title: "2. Add.",
        options: [
            {
                id: 'hot_water',
                icon: '💧',
                title: 'Hot water.',
                desc: 'For Americano',
                price: 0,
                makes: 'Americano'
            },
            {
                id: 'steamed_milk',
                icon: '🥛',
                title: 'Steamed Milk',
                desc: 'For latte and cappucino.',
                price: 5,
                visual: '🥛'
            },
            {
                id: 'hot_milk',
                icon: '🥛',
                title: 'Hot Milk',
                desc: 'Blonde TSTE',
                price: 3,
                visual: '🥛'
            },
            {
                id: 'warm_milk',
                icon: '🥛',
                title: 'Put the shot for a smaller glass and pour milk.',
                desc: 'For cortado.',
                price: 4,
                visual: '🥛'
            },
            {
                id: 'cold_milk',
                icon: '🧊',
                title: 'Cold Milk',
                desc: 'Iced Latte',
                price: 4,
                visual: '🧊'
            },
            {
                id: 'chocolate',
                icon: '🍫',
                title: 'Chocolate',
                desc: 'Mocha',
                price: 4,
                visual: '🍫'
            },
            {
                id: 'caramel',
                icon: '🍯',
                title: 'Caramel',
                desc: 'For Caramel Latte',
                price: 4,
                visual: '🍯'
            },
            {
                id: 'vanilla',
                icon: '🌟',
                title: 'Vanilla',
                desc: 'For Vanilla Latte',
                price: 3,
                visual: '🌟'
            },
            {
                id: 'whipped_cream',
                icon: '☁️',
                title: 'Whipped Cream',
                desc: 'For Espresso con Panna',
                price: 3,
                visual: '☁️'
            },
            {
                id: 'nothing',
                icon: '✋',
                title: 'Hiçbir Şey',
                desc: 'Espresso',
                price: 0,
                makes: 'Espresso'
            }
        ]
    },
    foam: {
        title: "3. Köpük eklemek ister misin?",
        options: [
            {
                id: 'milk_foam',
                icon: '☁️',
                title: 'Süt Köpüğü',
                desc: 'Hafif köpük tabakası',
                price: 2
            },
            {
                id: 'thick_foam',
                icon: '☁️☁️',
                title: 'Kalın Köpük',
                desc: 'Bol köpük',
                price: 3
            },
            {
                id: 'no_foam',
                icon: '🚫',
                title: 'Köpük İstemiyorum',
                desc: 'Köpüksüz tercih',
                price: 0
            }
        ]
    }
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

