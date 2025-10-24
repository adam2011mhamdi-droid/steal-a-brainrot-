// script.js
(() => {
  // CONFIG -> remplace GAME_ID par l'ID de ton jeu Roblox
  const GAME_ID = "GAME_ID"; // ex: "1234567890"
  const ROBLOX_URL = `https://www.roblox.com/games/${GAME_ID}`;

  // DOM
  const playButton = document.getElementById("playButton");
  const joinDiscord = document.getElementById("joinDiscord");
  const shopItemsEl = document.getElementById("shopItems");
  const leaderList = document.getElementById("leaderList");
  const fakeScoreForm = document.getElementById("fakeScoreForm");
  const playerNameInput = document.getElementById("playerName");
  const playerScoreInput = document.getElementById("playerScore");
  const clearBtn = document.getElementById("clearLeaderboard");
  const previewText = document.getElementById("previewText");

  // sample shop data (modifie comme tu veux)
  const SHOP = [
    { id: "skin_red", name: "Skin Rouge", price: 100, desc: "Change la couleur du cerveau (cosmétique)" },
    { id: "lock", name: "Verrou de porte", price: 50, desc: "Verrouille la porte de ta base" },
    { id: "wall", name: "Mur", price: 30, desc: "Pose un mur décoratif" }
  ];

  // handlers
  playButton.addEventListener("click", () => {
    if (GAME_ID === "GAME_ID") {
      alert("Remplace GAME_ID dans script.js par l'ID de ton jeu Roblox pour que ce bouton ouvre le jeu.");
      return;
    }
    window.open(ROBLOX_URL, "_blank");
  });

  joinDiscord.addEventListener("click", () => {
    // Remplace par ton lien Discord si tu veux
    const discordUrl = "https://discord.gg/TON_INVITE";
    window.open(discordUrl, "_blank");
  });

  // render shop items
  function renderShop(){
    shopItemsEl.innerHTML = "";
    SHOP.forEach(item => {
      const el = document.createElement("div");
      el.className = "card shop-item";
      el.innerHTML = `
        <strong>${item.name}</strong>
        <div class="muted">${item.desc}</div>
        <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:600">${item.price} Coins</div>
          <button class="btn small" data-id="${item.id}">Acheter</button>
        </div>
      `;
      shopItemsEl.appendChild(el);
    });
    // attach buy handlers (local mock)
    shopItemsEl.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        alert("Achat simulé : " + id + " (implémente côté serveur pour vrai paiement)");
      });
    });
  }

  // Leaderboard (localStorage)
  const LB_KEY = "steal_brainrot_leaderboard_v1";

  function loadLeaderboard(){
    const raw = localStorage.getItem(LB_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  function saveLeaderboard(list){
    localStorage.setItem(LB_KEY, JSON.stringify(list));
  }
  function renderLeaderboard(){
    const list = loadLeaderboard().sort((a,b)=>b.score-a.score).slice(0,10);
    leaderList.innerHTML = "";
    list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} — ${item.score}`;
      leaderList.appendChild(li);
    });
  }

  fakeScoreForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = playerNameInput.value.trim();
    const score = parseInt(playerScoreInput.value,10);
    if(!name || isNaN(score)) return;
    const list = loadLeaderboard();
    list.push({name, score, ts: Date.now()});
    saveLeaderboard(list);
    renderLeaderboard();
    playerNameInput.value = "";
    playerScoreInput.value = "";
  });

  clearBtn.addEventListener("click", () => {
    if(confirm("Effacer le leaderboard local ?")) {
      localStorage.removeItem(LB_KEY);
      renderLeaderboard();
    }
  });

  // init
  renderShop();
  renderLeaderboard();
  previewText.textContent = "Prototype web : personnalise la page, remplace l'ID du jeu et ajoute ton design !";
})();
