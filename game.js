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
}

function defend() {
  isDefending = true;
  log("Вы встали в защиту. Урон по вам будет уменьшен.");
  enemyAttack();
  updateHP();
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
  log(`Класс: ${playerClass}\nВаше здоровье: ${playerHP}\nЗдоровье врага: ${enemyHP}`);
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
  document.getElementById("log").textContent = "";
}

function rest() {
  playerHP = 100;
  updateHP();
  document.getElementById("city-log").textContent = "Вы хорошо отдохнули. Здоровье восстановлено.";
}

function shop() {
  document.getElementById("city-log").textContent = "Магазин в разработке. Скоро появятся товары.";
}

function startQuest() {
  playerHP = 100;
  enemyHP = 100;
  isDefending = false;

  document.getElementById("city").style.display = "none";
  document.getElementById("actions").style.display = "block";

  const buttons = document.querySelectorAll("#actions button");
  buttons.forEach(btn => btn.disabled = false);

  document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
  updateHP();
  log("Вы отправились в новое приключение!");
}