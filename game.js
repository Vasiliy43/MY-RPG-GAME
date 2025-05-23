let playerClass = "";
let playerHP = 100;
let enemyHP = 100;
let isDefending = false;

function selectClass(chosenClass) {
  playerClass = chosenClass;
  playerHP = 100;
  enemyHP = 100;
  isDefending = false;
  document.getElementById("class-selection").style.display = "none";
  document.getElementById("actions").style.display = "block";
  document.getElementById("city").style.display = "none";
  document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
  updateHP();
  log(`Вы выбрали класс: ${playerClass}`);
  saveProgress();
}

function attack() {
  const damage = getRandom(15, 25);
  enemyHP -= damage;
  log(`Вы нанесли ${damage} урона врагу.`);
  checkBattleEnd();
  if (enemyHP > 0) {
    enemyAttack();
  }
  updateHP();
  saveProgress();
}

function defend() {
  isDefending = true;
  log("Вы встали в защиту. Урон по вам будет уменьшен.");
  enemyAttack();
  updateHP();
  saveProgress();
}

function enemyAttack() {
  let damage = getRandom(10, 20);
  if (isDefending) {
    damage = Math.floor(damage / 2);
    isDefending = false;
  }
  playerHP -= damage;
  logAppend(`Враг атакует и наносит ${damage} урона вам.`);
  checkBattleEnd();
}

function showStatus() {
  log(`Класс: ${playerClass}, Ваше здоровье: ${playerHP}, Здоровье врага: ${enemyHP}`);
}

function updateHP() {
  document.getElementById("player-hp").textContent = Math.max(playerHP, 0);
  document.getElementById("enemy-hp").textContent = Math.max(enemyHP, 0);
}

function checkBattleEnd() {
  if (playerHP <= 0) {
    log("Вы проиграли! 🪦");
    disableButtons();
  } else if (enemyHP <= 0) {
    log("Вы победили врага! 🎉 Переход в город...");
    disableButtons();
    setTimeout(goToCity, 2000);
  }
}

function disableButtons() {
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = true);
}

function log(text) {
  document.getElementById("log").textContent = text;
}

function logAppend(text) {
  const current = document.getElementById("log").textContent;
  document.getElementById("log").textContent = current + "\n" + text;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function goToCity() {
  document.getElementById("actions").style.display = "none";
  document.getElementById("city").style.display = "block";
  document.getElementById("city-log").textContent = "";
}

function rest() {
  playerHP = 100;
  updateHP();
  document.getElementById("city-log").textContent = "Вы отдохнули и восстановили здоровье.";
  saveProgress();
}

function shop() {
  document.getElementById("city-log").textContent = "Магазин ещё не работает. Зайдите позже.";
}

function startQuest() {
  enemyHP = 100;
  isDefending = false;
  document.getElementById("city").style.display = "none";
  document.getElementById("actions").style.display = "block";
  updateHP();
  log("Вы вышли на новое задание!");
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);
  saveProgress();
}

function restart() {
  document.getElementById("city").style.display = "none";
  document.getElementById("actions").style.display = "none";
  document.getElementById("class-selection").style.display = "block";
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);
  localStorage.removeItem("rpgSave");
  playerClass = "";
  playerHP = 100;
  enemyHP = 100;
  isDefending = false;
  log("");
  updateHP();
}

// Сохранение
function saveProgress() {
  const data = {
    playerClass,
    playerHP,
    enemyHP,
    isDefending
  };
  localStorage.setItem("rpgSave", JSON.stringify(data));
}

// Загрузка
function loadProgress() {
  const data = JSON.parse(localStorage.getItem("rpgSave"));
  if (data && data.playerClass) {
    playerClass = data.playerClass;
    playerHP = data.playerHP;
    enemyHP = data.enemyHP;
    isDefending = data.isDefending;
    document.getElementById("class-selection").style.display = "none";
    document.getElementById("actions").style.display = "block";
    document.getElementById("city").style.display = "none";
    document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
    updateHP();
    log(`Загружено сохранение. Вы — ${playerClass}`);
    checkBattleEnd();
  }
}

window.onload = loadProgress;
