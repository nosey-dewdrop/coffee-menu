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
      syrups: [],
      foam: false
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

// ─── ESPRESSO - BASE SELECTION ───
const milkDrinks = [
      { name: "Macchiato", ratio: "1:0.5", desc: "Bir damla süt lekesi, yoğun espresso.", color: "#3a2010", height: "40%" },
      { name: "Cortado", ratio: "1:1", desc: "Eşit miktarda süt, dengeli lezzet.", color: "#5c3a24", height: "50%" },
      { name: "Flat White", ratio: "1:3", desc: "Kadifemsi mikro köpük, güçlü kahve.", color: "#8a6240", height: "65%" },
      { name: "Latte", ratio: "1:4", desc: "Bol süt, yumuşak kahve deneyimi.", color: "#b08968", height: "80%" }
];

function selectBase(btn, base) {
      document.querySelectorAll(".base-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const milkSection = document.getElementById("milkSection");
      const espressoLiquid = document.querySelector(".espresso-liquid");

      if (base === "none") {
            currentOrder.drinkName = "Espresso";
            currentOrder.milkLevel = 0;
            milkSection.classList.add("hidden");
            espressoLiquid.style.height = "35%";
            espressoLiquid.style.background = "linear-gradient(180deg, #2a1506, #1a0e06)";
            document.getElementById("espressoDrinkName").textContent = "Espresso";
            document.getElementById("drinkDesc").textContent = "Saf ve yoğun bir shot.";
      } else if (base === "water") {
            currentOrder.drinkName = "Americano";
            currentOrder.milkLevel = 0;
            milkSection.classList.add("hidden");
            espressoLiquid.style.height = "70%";
            espressoLiquid.style.background = "linear-gradient(180deg, #3a2010, #2a1506)";
            document.getElementById("espressoDrinkName").textContent = "Americano";
            document.getElementById("drinkDesc").textContent = "Sıcak su ile seyreltilmiş espresso.";
      } else if (base === "milk") {
            milkSection.classList.remove("hidden");
            document.getElementById("milkSlider").value = 0;
            updateMilk(0);
      }
}

function updateMilk(value) {
      const val = parseInt(value);
      currentOrder.milkLevel = val + 1;

      const drink = milkDrinks[val];
      currentOrder.drinkName = drink.name;

      updateDrinkDisplay();

      // Homojen renk değişimi — süt arttıkça açılıyor
      const espressoLiquid = document.querySelector(".espresso-liquid");
      espressoLiquid.style.height = drink.height;
      espressoLiquid.style.background = drink.color;
}

// ─── FOAM TOGGLE ───
function toggleFoam() {
      currentOrder.foam = !currentOrder.foam;
      const btn = document.getElementById("foamBtn");
      const hint = document.getElementById("foamHint");

      if (currentOrder.foam) {
            btn.classList.add("active");
            hint.textContent = "Kalın süt köpüğü eklendi";
      } else {
            btn.classList.remove("active");
            hint.textContent = "";
      }

      // Update drink display (cappuccino logic)
      if (currentOrder.milkLevel > 0) {
            updateDrinkDisplay();
      }
}

// ─── DYNAMIC DRINK NAME (Mocha etc.) ───
function updateDrinkDisplay() {
      const baseDrink = milkDrinks[currentOrder.milkLevel - 1];
      if (!baseDrink) return;

      let name = baseDrink.name;
      let desc = baseDrink.desc;
      let ratio = baseDrink.ratio;

      const hasCikolata = currentOrder.syrups.some(s => s.name === "cikolata");
      const hasKaramel = currentOrder.syrups.some(s => s.name === "karamel");
      const hasFoam = currentOrder.foam;

      // Köpük + orta-çok süt = Cappuccino
      if (hasFoam && (name === "Flat White" || name === "Latte")) {
            name = "Cappuccino";
            ratio = "1:1:1";
            desc = "Eşit espresso, süt ve kalın köpük. Klasik İtalyan.";
      }

      // Latte + çikolata = Mocha
      if (name === "Latte" && hasCikolata) {
            name = "Mocha";
            desc = "Espresso, süt ve çikolata üçlüsü.";
      }
      // Cappuccino + çikolata = Mocha
      else if (name === "Cappuccino" && hasCikolata) {
            name = "Mocha";
            desc = "Espresso, köpüklü süt ve çikolata.";
      }
      // Latte + karamel = Caramel Latte
      else if (name === "Latte" && hasKaramel) {
            name = "Caramel Latte";
            desc = "Karamel soslu, tatlı ve kremamsı.";
      }

      currentOrder.drinkName = name;
      document.getElementById("espressoDrinkName").textContent = name;
      document.getElementById("drinkDesc").textContent = `(${ratio}) ${desc}`;
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

      // Update drink name if milk is active (mocha, caramel latte etc.)
      if (currentOrder.milkLevel > 0) {
            updateDrinkDisplay();
      }
}

// ─── BREW KNOWLEDGE ───
const brewInfo = {
      turk: {
            steps: [
                  "Cezve ısınıyor...",
                  "Kahve ve su karıştırılıyor...",
                  "Köpük yükseliyor...",
                  "İkinci taşma bekleniyor...",
                  "Fincanına dökülüyor..."
            ],
            facts: [
                  "Türk kahvesi UNESCO somut olmayan kültürel miras listesinde.",
                  "Cezve adı Arapça 'közde pişen' anlamına gelir.",
                  "İdeal su sıcaklığı 65-70°C arasında yavaşça kaynatılır.",
                  "Köpük ne kadar bol olursa, o kadar ustalıklı demlenmiş sayılır.",
                  "Osmanlı'da kahve o kadar önemliydi ki, kocanın kahve almaması boşanma sebebiydi."
            ]
      },
      filtre: {
            "V60": {
                  steps: [
                        "Filtre kağıdı ıslatılıyor...",
                        "Kahve yatağı hazırlanıyor...",
                        "Ön demleme (bloom) yapılıyor...",
                        "Dairesel hareketlerle su dökülüyor...",
                        "Son damlalar süzülüyor..."
                  ],
                  facts: [
                        "V60'ın adı 60 derecelik koni açısından gelir.",
                        "1921'de Hario tarafından Japonya'da tasarlandı.",
                        "İç yüzeyindeki spiral oluklar havanın çıkmasını sağlar, böylece kahve eşit demlenir.",
                        "Ön demleme (bloom): İlk 30 saniye az su dökerek CO₂'nin çıkmasını bekle.",
                        "İdeal su sıcaklığı: 92-96°C. Kaynadıktan sonra 30 sn beklet."
                  ]
            },
            "Chemex": {
                  steps: [
                        "Kalın filtre kağıdı yerleştiriliyor...",
                        "Kahve ölçülüyor...",
                        "Ön demleme başlıyor...",
                        "Yavaşça su ekleniyor...",
                        "Temiz ve berrak kahve süzülüyor..."
                  ],
                  facts: [
                        "Chemex 1941'de bir kimyager olan Peter Schlumbohm tarafından icat edildi.",
                        "MoMA'nın kalıcı koleksiyonunda 'en iyi tasarlanmış nesnelerden biri' olarak yer alır.",
                        "Filtre kağıdı normal kağıtlardan %20-30 daha kalın — yağları süzer, çok temiz bir tat verir.",
                        "Kahve/su oranı: 1:15. Yani 30g kahve için 450ml su.",
                        "James Bond 'From Russia with Love' filminde Chemex kullanır."
                  ]
            },
            "French Press": {
                  steps: [
                        "Kaba çekilmiş kahve ekleniyor...",
                        "Sıcak su dökülüyor...",
                        "4 dakika bekleniyor...",
                        "Piston yavaşça bastırılıyor...",
                        "Dolgun gövdeli kahve hazır..."
                  ],
                  facts: [
                        "French Press aslında İtalyan patenti! 1929'da Attilio Calimani tasarladı.",
                        "Metal filtre yağları geçirir — bu yüzden en dolgun gövdeli kahveyi verir.",
                        "4 dakikadan fazla bekletme: acılaşır. Az bekletme: sulu kalır.",
                        "Kahveyi bastırdıktan sonra hemen dök, yoksa demleme devam eder.",
                        "Orta-kaba öğütme şart. İnce öğütürsen pistondan geçer, fincanın çamurlu olur."
                  ]
            },
            "Aeropress": {
                  steps: [
                        "Filtre ıslatılıyor...",
                        "Kahve ve su ekleniyor...",
                        "Karıştırılıyor...",
                        "Basınçla presleniyor...",
                        "Yoğun ve pürüzsüz kahve hazır..."
                  ],
                  facts: [
                        "Aeropress'i 2005'te frisbee'yi icat eden adam (Alan Adler) tasarladı.",
                        "Her yıl dünya Aeropress şampiyonası düzenlenir — WAC.",
                        "Hava basıncıyla çalışır, bu yüzden espressoya yakın yoğunluk verir.",
                        "Toplam demleme süresi sadece 1-2 dakika — en hızlı yöntemlerden.",
                        "Ters çevirme (inverted) metodu ile erken damlamayı önleyebilirsin."
                  ]
            }
      },
      espresso: {
            steps: [
                  "Çekirdekler öğütülüyor...",
                  "Portafilter'a tamping yapılıyor...",
                  "9 bar basınçla extraction...",
                  "Crema oluşuyor...",
                  "Son damlalar..."
            ],
            facts: [
                  "Espresso İtalyanca 'hızlı' demek — 25-30 saniyede çekilir.",
                  "9 bar basınç = deniz seviyesinin 9 katı atmosfer basıncı.",
                  "Bir shot espresso, bir fincan filtre kahveden daha az kafein içerir.",
                  "Crema, kahvedeki CO₂ ve yağların basınçla emülsiyonlaşmasıyla oluşur.",
                  "İtalya'da espresso ayakta içilir, oturarak içersen daha pahalı ödersin."
            ]
      }
};

// ─── BREW ───
function startBrew(type) {
      goTo("screenBrew");

      const brewText = document.getElementById("brewText");
      const brewFact = document.getElementById("brewFact");

      let steps, facts;

      if (type === "filtre") {
            const method = currentOrder.method;
            steps = brewInfo.filtre[method].steps;
            facts = brewInfo.filtre[method].facts;
      } else {
            steps = brewInfo[type].steps;
            facts = brewInfo[type].facts;
      }

      // Shuffle facts so it's different each time
      const shuffledFacts = [...facts].sort(() => Math.random() - 0.5);

      let i = 0;
      brewText.textContent = steps[0];
      brewFact.textContent = shuffledFacts[0];
      brewFact.classList.remove("fact-exit");
      brewFact.classList.add("fact-enter");

      const stepDuration = 2500;
      const totalDuration = steps.length * stepDuration;

      const interval = setInterval(() => {
            i++;
            if (i < steps.length) {
                  brewText.textContent = steps[i];

                  brewFact.classList.remove("fact-enter");
                  brewFact.classList.add("fact-exit");

                  setTimeout(() => {
                        brewFact.textContent = shuffledFacts[i % shuffledFacts.length];
                        brewFact.classList.remove("fact-exit");
                        brewFact.classList.add("fact-enter");
                  }, 300);
            }
      }, stepDuration);

      // Store facts for result screen
      currentOrder._brewFacts = facts;

      setTimeout(() => {
            clearInterval(interval);
            showResult();
      }, totalDuration);
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
            if (currentOrder.drinkName === "Americano" || currentOrder.milkLevel > 0) {
                  const milkDesc = currentOrder.drinkName === "Americano" ? "Su eklendi" : "Süt eklendi";
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

      // Add brew tips section
      if (currentOrder._brewFacts && currentOrder._brewFacts.length > 0) {
            html += `<div class="result-tips">
                  <h4>Biliyor muydun?</h4>
                  ${currentOrder._brewFacts.map(f => `<p class="tip-item">${f}</p>`).join("")}
            </div>`;
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
            syrups: [],
            foam: false
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
      document.querySelectorAll(".base-btn").forEach((b, i) => {
            b.classList.toggle("active", i === 0);
      });

      // Reset espresso visuals
      document.getElementById("foamBtn").classList.remove("active");
      document.getElementById("foamHint").textContent = "";
      document.getElementById("milkSlider").value = 0;
      document.getElementById("milkSection").classList.add("hidden");
      document.getElementById("espressoDrinkName").textContent = "Espresso";
      document.getElementById("drinkDesc").textContent = "Saf ve yoğun bir shot.";
      document.getElementById("syrupDrizzle").style.height = "0%";
      document.getElementById("syrupDrizzle").style.opacity = "0";

      const espressoLiquid = document.querySelector(".espresso-liquid");
      espressoLiquid.style.height = "35%";
      espressoLiquid.style.background = "linear-gradient(180deg, #2a1506, #1a0e06)";

      goTo("screenWelcome");
}
