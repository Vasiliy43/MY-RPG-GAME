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

  document.getElementById("class-selection").style.display = "none";
  document.getElementById("actions").style.display = "block";
  document.getElementById("city").style.display = "none";

  document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
  updateHP();
  log(`Вы выбрали класс: ${playerClass}`);
  saveProgress();
}

// Атака игрока
function attack() {
  console.log("Атака нажата");
  const damage = getRandom(15, 25);
  enemyHP -= damage;
  log(`Вы нанесли ${damage} урона врагу.`);
  updateHP();
  checkBattleEnd();
  if (enemyHP > 0) {
    enemyAttack();
  }
  updateHP();
  saveProgress();
}

// Защита игрока
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

// Показать статус
function showStatus() {
  log(`Класс: ${playerClass}, Ваше здоровье: ${playerHP}, Здоровье врага: ${enemyHP}`);
}

// Обновить HP на странице
function updateHP() {
  document.getElementById("player-hp").textContent = Math.max(playerHP, 0);
  document.getElementById("enemy-hp").textContent = Math.max(enemyHP, 0);
}

// Проверка конца боя
function checkBattleEnd() {
  if (playerHP <= 0) {
    log("Вы проиграли! 🪦");
    disableButtons();
  } else if (enemyHP <= 0) {
    log("Вы победили врага! 🎉 Переход в город...");
    disableButtons();
    setTimeout(goToCity, 1500);
  }
}

// Отключить кнопки боя
function disableButtons() {
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = true);
}

// Логирование текста (замена)
function log(text) {
  document.getElementById("log").textContent = text;
}

// Логирование текста (добавление)
function logAppend(text) {
  const current = document.getElementById("log").textContent;
  document.getElementById("log").textContent = current + "\n" + text;
}

// Случайное число от min до max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Переход в город
function goToCity() {
  console.log("Переход в город");
  document.getElementById("actions").style.display = "none";
  document.getElementById("city").style.display = "block";
  document.getElementById("log").textContent = "";
  document.getElementById("city-log").textContent = "Вы в безопасности. Выберите действие.";
}

// Действия в городе
function rest() {
  playerHP = 100;
  updateHP();
  document.getElementById("city-log").textContent = "Вы отдохнули и восстановили здоровье!";
  saveProgress();
}

function shop() {
  document.getElementById("city-log").textContent = "Магазин в разработке...";
}

function startQuest() {
  // Сбросить врага и перейти к бою
  enemyHP = 100;
  playerHP = playerHP > 0 ? playerHP : 100;
  isDefending = false;

  document.getElementById("city").style.display = "none";
  document.getElementById("actions").style.display = "block";
  updateHP();
  log("Новое задание началось! Бой начался.");
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);
  saveProgress();
}

// Возврат к выбору класса и перезапуск игры
function restart() {
  document.getElementById("city").style.display = "none";
  document.getElementById("actions").style.display = "none";
  document.getElementById("class-selection").style.display = "block";
  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);
  playerClass = "";
  playerHP = 100;
  enemyHP = 100;
  isDefending = false;
  log("");
  updateHP();
  localStorage.removeItem("rpgSave");
}

// Сохранение прогресса
function saveProgress() {
  const data = {
    playerClass,
    playerHP,
    enemyHP,
    isDefending
  };
  localStorage.setItem("rpgSave", JSON.stringify(data));
}

// Загрузка прогресса
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

window.onload = function () {
  console.log("Игра загружена");
  loadProgress();
};