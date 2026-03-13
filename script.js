// ─── FLOATING BEANS ───
function createFloatingBeans() {
      const beansContainer = document.getElementById("floatingBeans");
      const beanSymbols = ["☕", "🫘", "☕", "🫘"];

      setInterval(function () {
            const bean = document.createElement("div");
            bean.className = "bean";
            bean.textContent = beanSymbols[Math.floor(Math.random() * beanSymbols.length)];
            bean.style.left = Math.random() * 100 + "%";
            bean.style.animationDuration = (Math.random() * 3 + 5) + "s";
            beansContainer.appendChild(bean);

            setTimeout(() => bean.remove(), 9000);
      }, 1200);
}

createFloatingBeans();

// ─── STATE ───
let currentOrder = {
      type: "",
      sugar: "Sade",
      extras: [],
      method: "V60",
      bean: "Etiyopya",
      milkLevel: 0,
      drinkName: "Espresso",
      syrups: []
};

// ─── NAVIGATION ───
function goTo(screenId) {
      document.querySelectorAll(".screen").forEach(s => {
            s.classList.remove("active");
      });
      setTimeout(() => {
            document.getElementById(screenId).classList.add("active");
      }, 50);
}

// ─── GRIND SELECTION ───
function selectGrind(type) {
      currentOrder.type = type;
      if (type === "turk") goTo("screenTurk");
      else if (type === "espresso") goTo("screenEspresso");
      else if (type === "filtre") goTo("screenFiltre");
}

// ─── TÜRK KAHVESİ ───
function selectSugar(btn, level) {
      document.querySelectorAll(".sugar-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentOrder.sugar = level;
}

function toggleExtra(btn) {
      btn.classList.toggle("active");
      const text = btn.textContent.trim();
      if (btn.classList.contains("active")) {
            currentOrder.extras.push(text);
      } else {
            currentOrder.extras = currentOrder.extras.filter(e => e !== text);
      }
}

// ─── FİLTRE KAHVE ───
function selectMethod(btn, method) {
      document.querySelectorAll(".method-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentOrder.method = method;
}

function selectBean(btn, bean) {
      document.querySelectorAll(".bean-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentOrder.bean = bean;
}

// ─── ESPRESSO - MILK SLIDER ───
const milkDrinks = [
      { name: "Espresso", desc: "Saf ve yoğun bir shot." },
      { name: "Americano", desc: "Sıcak su ile seyreltilmiş espresso." },
      { name: "Cortado", desc: "Eşit miktarda süt, dengeli lezzet." },
      { name: "Ristretto Bianco", desc: "Yoğun espresso, ipeksi süt." },
      { name: "Flat White", desc: "Kadifemsi mikro köpük, güçlü kahve." },
      { name: "Latte", desc: "Bol süt, yumuşak kahve deneyimi." }
];

function updateMilk(value) {
      const val = parseInt(value);
      currentOrder.milkLevel = val;

      const drink = milkDrinks[val];
      currentOrder.drinkName = drink.name;

      document.getElementById("espressoDrinkName").textContent = drink.name;
      document.getElementById("drinkDesc").textContent = drink.desc;

      const milkLayer = document.getElementById("milkLayer");
      const espressoLiquid = document.querySelector(".espresso-liquid");

      if (val === 0) {
            milkLayer.style.height = "0%";
            espressoLiquid.style.height = "35%";
      } else if (val === 1) {
            // Americano: water, not milk
            milkLayer.style.height = "0%";
            milkLayer.style.background = "none";
            espressoLiquid.style.height = "70%";
            espressoLiquid.style.background = "linear-gradient(180deg, #3a2010, #2a1506)";
      } else {
            // Milk drinks
            milkLayer.style.background = "linear-gradient(180deg, rgba(255,252,245,0.9), rgba(245,235,220,0.95))";
            const milkHeights = [0, 0, 20, 30, 40, 55];
            milkLayer.style.height = milkHeights[val] + "%";
            espressoLiquid.style.height = "35%";
            espressoLiquid.style.background = "linear-gradient(180deg, #2a1506, #1a0e06)";
      }
}

// ─── SYRUPS ───
function toggleSyrup(btn, name, color) {
      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
            currentOrder.syrups.push({ name, color });
      } else {
            currentOrder.syrups = currentOrder.syrups.filter(s => s.name !== name);
      }

      const drizzle = document.getElementById("syrupDrizzle");
      if (currentOrder.syrups.length > 0) {
            const lastColor = currentOrder.syrups[currentOrder.syrups.length - 1].color;
            drizzle.style.background = lastColor;
            drizzle.style.height = "15%";
            drizzle.style.opacity = "0.5";
      } else {
            drizzle.style.height = "0%";
            drizzle.style.opacity = "0";
      }
}

// ─── BREW ───
function startBrew(type) {
      goTo("screenBrew");

      const brewText = document.getElementById("brewText");
      const messages = {
            turk: ["Cezve ısınıyor...", "Köpük yükseliyor...", "Neredeyse hazır..."],
            filtre: ["Su ısıtılıyor...", "Demleniyor...", "Damla damla süzülüyor..."],
            espresso: ["Basınç artıyor...", "Extraction başladı...", "Son damlalar..."]
      };

      const msgs = messages[type] || messages.espresso;
      let i = 0;
      brewText.textContent = msgs[0];

      const interval = setInterval(() => {
            i++;
            if (i < msgs.length) {
                  brewText.textContent = msgs[i];
            }
      }, 800);

      setTimeout(() => {
            clearInterval(interval);
            showResult();
      }, 2800);
}

// ─── RESULT ───
function showResult() {
      const card = document.getElementById("resultCard");
      let html = "";

      if (currentOrder.type === "turk") {
            html = `
                  <h3>Türk Kahvesi</h3>
                  <div class="result-item">
                        <span class="result-label">Şeker</span>
                        <span class="result-value">${currentOrder.sugar}</span>
                  </div>
            `;
            if (currentOrder.extras.length > 0) {
                  html += `
                        <div class="result-item">
                              <span class="result-label">Yanında</span>
                              <span class="result-value">${currentOrder.extras.join(", ")}</span>
                        </div>
                  `;
            }
      } else if (currentOrder.type === "filtre") {
            html = `
                  <h3>Filtre Kahve</h3>
                  <div class="result-item">
                        <span class="result-label">Yöntem</span>
                        <span class="result-value">${currentOrder.method}</span>
                  </div>
                  <div class="result-item">
                        <span class="result-label">Çekirdek</span>
                        <span class="result-value">${currentOrder.bean}</span>
                  </div>
            `;
      } else if (currentOrder.type === "espresso") {
            html = `
                  <h3>${currentOrder.drinkName}</h3>
            `;
            if (currentOrder.milkLevel > 0) {
                  const milkDesc = currentOrder.milkLevel === 1 ? "Su eklendi" : "Süt eklendi";
                  html += `
                        <div class="result-item">
                              <span class="result-label">Eklenen</span>
                              <span class="result-value">${milkDesc}</span>
                        </div>
                  `;
            }
            if (currentOrder.syrups.length > 0) {
                  const syrupNames = currentOrder.syrups.map(s => {
                        return s.name.charAt(0).toUpperCase() + s.name.slice(1);
                  });
                  html += `
                        <div class="result-item">
                              <span class="result-label">Sos/Şurup</span>
                              <span class="result-value">${syrupNames.join(", ")}</span>
                        </div>
                  `;
            }
      }

      card.innerHTML = html;
      goTo("screenResult");
}

// ─── RESET ───
function resetAll() {
      currentOrder = {
            type: "",
            sugar: "Sade",
            extras: [],
            method: "V60",
            bean: "Etiyopya",
            milkLevel: 0,
            drinkName: "Espresso",
            syrups: []
      };

      // Reset UI states
      document.querySelectorAll(".sugar-btn").forEach((b, i) => {
            b.classList.toggle("active", i === 0);
      });
      document.querySelectorAll(".extra-chip").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".method-btn").forEach((b, i) => {
            b.classList.toggle("active", i === 0);
      });
      document.querySelectorAll(".bean-btn").forEach((b, i) => {
            b.classList.toggle("active", i === 0);
      });
      document.querySelectorAll(".syrup-chip").forEach(b => b.classList.remove("active"));

      // Reset espresso visuals
      document.getElementById("milkSlider").value = 0;
      document.getElementById("espressoDrinkName").textContent = "Espresso";
      document.getElementById("drinkDesc").textContent = "Saf ve yoğun bir shot.";
      document.getElementById("milkLayer").style.height = "0%";
      document.getElementById("syrupDrizzle").style.height = "0%";
      document.getElementById("syrupDrizzle").style.opacity = "0";

      const espressoLiquid = document.querySelector(".espresso-liquid");
      espressoLiquid.style.height = "35%";
      espressoLiquid.style.background = "linear-gradient(180deg, #2a1506, #1a0e06)";

      goTo("screenWelcome");
}
