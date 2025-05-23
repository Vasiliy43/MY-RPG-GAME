let playerClass = "";
let playerHP = 100;
let enemyHP = 100;
let isDefending = false;

function selectClass(chosenClass) {
  playerClass = chosenClass;
  playerHP = 100;
  enemyHP = 100;
  isDefending = false;
  showSection("actions");
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
  if (enemyHP > 0) enemyAttack();
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
  const statusText = `Класс: ${playerClass}, Ваше здоровье: ${playerHP}, Здоровье врага: ${enemyHP}`;
  if (document.getElementById("city").style.display === "block") {
    document.getElementById("city-log").textContent = statusText;
  } else {
    log(statusText);
  }
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
    log("Вы победили врага! 🎉");
    setTimeout(goToCity, 1500); // Переход в город через 1.5 секунды
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

// Город
function goToCity() {
  showSection("city");
  document.getElementById("city-log").textContent = "Вы прибыли в город.";
}

function rest() {
  playerHP = 100;
  updateHP();
  document.getElementById("city-log").textContent = "Вы восстановили здоровье в таверне.";
  saveProgress();
}

function goToBattle() {
  enemyHP = 100;
  isDefending = false;
  updateHP();
  log("Вы вышли на новый бой!");
  enableButtons();
  showSection("actions");
  saveProgress();
}

function enableButtons() {
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);
}

// Скрыть/показать нужную часть
function showSection(id) {
  document.getElementById("class-selection").style.display = "none";
  document.getElementById("actions").style.display = "none";
  document.getElementById("city").style.display = "none";
  document.getElementById(id).style.display = "block";
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
    if (enemyHP <= 0) {
      goToCity();
    } else {
      showSection("actions");
      document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
      updateHP();
      log(`Загружено сохранение. Вы — ${playerClass}`);
      checkBattleEnd();
    }
  }
}

window.onload = loadProgress;
