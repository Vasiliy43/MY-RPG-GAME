function chooseClass(characterClass) {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = `
        <p>Вы выбрали: <b>${characterClass}</b></p>
        <p>Что хотите сделать?</p>
        <button onclick="attack()">Атаковать</button>
        <button onclick="defend()">Защищаться</button>
        <button onclick="showStatus()">Посмотреть статус</button>
        <div id="actionResult" style="margin-top: 15px; color: #ffd700;"></div>
    `;

    // Сохраняем выбранный класс в глобальную переменную
    window.playerClass = characterClass;
    window.playerHP = 100;  // Здоровье
    window.playerDefense = 10;  // Защита
}

function attack() {
    const result = document.getElementById('actionResult');
    result.textContent = `Вы нанесли урон врагу как ${window.playerClass}!`;
}

function defend() {
    const result = document.getElementById('actionResult');
    result.textContent = `Вы повысили защиту, готовясь к следующему ходу.`;
}

function showStatus() {
    const result = document.getElementById('actionResult');
    result.textContent = `Класс: ${window.playerClass}, Здоровье: ${window.playerHP}, Защита: ${window.playerDefense}`;
}
