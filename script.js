

function createFloatingBeans(){
      const beansContainer = document.getElementById("floatingBeans");
      const beanSymbols = ["☕️", "🫘", "☕️", "🫘"];

      setInterval(
            function() {
                  console.log("new beans on the way!! use cmd + opt + i to see the log. not on terminal");
                  
                  const bean = document.createElement("div");
                  bean.className = "bean";

                  const randomSymbol = beanSymbols[Math.floor(Math.random() * beanSymbols.length)];
                  bean.textContent = randomSymbol;

                  bean.style.left = Math.random() * 100 + "%";
                  bean.style.animationDuration = (Math.random() * 3 + 5) + "s";

                  beansContainer.appendChild(bean);

            }

      , 1200);
}



createFloatingBeans();