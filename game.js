let playerClass = "";

function selectClass(chosenClass) {
  playerClass = chosenClass;
  document.getElementById("class-selection").style.display = "none";
  document.getElementById("actions").style.display = "block";
  document.getElementById("class-title").textContent = `Класс: ${playerClass}`;
}

function attack() {
  log(`Вы атаковали как ${playerClass}`);
}

function defend() {
  log(`Вы защищаетесь как ${playerClass}`);
}

function showStatus() {
  log(`Класс: ${playerClass}. Пока что без характеристик.`);
}

function log(text) {
  document.getElementById("log").textContent = text;
}
