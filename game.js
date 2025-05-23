let playerClass = "";
let playerHP = 100;
let enemyHP = 100;
let isDefending = false;

// Выбор класса
function selectClass(chosenClass) {
  playerClass = chosenClass;
  playerHP = 100;
  enemyHP = 100;
  isDefending = false;
  document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
  updateHP();
  log(`Вы выбрали класс: ${playerClass}`);
  saveProgress();
  showSection("actions");
}

// Атака
function attack() {
  const damage = getRandom(15, 25);
  enemyHP -= damage;
  log(`Вы нанесли ${damage} урона врагу.`);
  checkBattleEnd();
  if (enemyHP > 0) enemyAttack();
  updateHP();
  saveProgress();
}

// Защита
function defend() {
  isDefending = true;
  log("Вы встали в защиту. Урон по вам будет уменьшен.");
  enemyAttack();
  updateHP();
  saveProgress();
}

// Атака врага
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

// Проверка конца боя
function checkBattleEnd() {
  if (playerHP <= 0) {
    log("Вы проиграли! 🪦");
    disableButtons();
  } else if (enemyHP <= 0) {
    log("Вы победили врага! 🎉");
    disableButtons();
    setTimeout(goToCity, 1500); // Через 1.5 секунды в город
  }
}

// Обновление HP
function updateHP() {
  document.getElementById("player-hp").textContent = Math.max(playerHP, 0);
  document.getElementById("enemy-hp").textContent = Math.max(enemyHP, 0);
}

// Логи
function log(text) {
  document.getElementById("log").textContent = text;
}
function logAppend(text) {
  const current = document.getElementById("log").textContent;
  document.getElementById("log").textContent = current + "\n" + text;
}

// Статус
function showStatus() {
  const text = `Класс: ${playerClass}, Ваше HP: ${playerHP}, HP врага: ${enemyHP}`;
  if (document.getElementById("city").style.display === "block") {
    document.getElementById("city-log").textContent = text;
  } else {
    log(text);
  }
}

// Кнопки
function disableButtons() {
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = true);
}
function enableButtons() {
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);
}

// Переключение секций
function showSection(id) {
  ["class-selection", "actions", "city"].forEach(s => {
    document.getElementById(s).style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// Город
function goToCity() {
  showSection("city");
  document.getElementById("city-log").textContent = "Вы прибыли в город.";
}
function rest() {
  playerHP = 100;
  updateHP();
  document.getElementById("city-log").textContent = "Вы восстановили здоровье.";
  saveProgress();
}
function goToBattle() {
  enemyHP = 100;
  isDefending = false;
  updateHP();
  log("Вы вступили в бой!");
  enableButtons();
  showSection("actions");
  saveProgress();
}

// Случайное число
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Сохранение и загрузка
function saveProgress() {
  const data = { playerClass, playerHP, enemyHP, isDefending };
  localStorage.setItem("rpgSave", JSON.stringify(data));
}
function loadProgress() {
  const data = JSON.parse(localStorage.getItem("rpgSave"));
  if (data && data.playerClass) {
    playerClass = data.playerClass;
    playerHP = data.playerHP;
    enemyHP = data.enemyHP;
    isDefending = data.isDefending;
    document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
    updateHP();
    if (enemyHP <= 0) {
      goToCity();
    } else {
      showSection("actions");
      log(`Загружено сохранение. Вы — ${playerClass}`);
    }
  } else {
    showSection("class-selection");
  }
}

window.onload = loadProgress;
