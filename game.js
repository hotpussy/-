const wallet = { value: 100 };
const land = { count: 0, price: 50 };
const building = { count: 0, price: 500 };
let techLevel = 1;
let incomePerSecond = 0;

function updateDisplay() {
    document.getElementById('wallet').innerText = `钱包: ${wallet.value} 元宇宙币`;
    document.getElementById('landIncome').innerText = `土地收入: ${land.count * 1 * techLevel} 元宇宙币/秒`;
    document.getElementById('buildingIncome').innerText = `建筑收入: ${building.count * 5 * techLevel} 元宇宙币/秒`;
    document.getElementById('landResource').innerText = `购买土地 (成本: ${land.price} 元宇宙币)`;
    document.getElementById('buildingResource').innerText = `购买建筑 (成本: ${building.price} 元宇宙币)`;
    document.getElementById('techResource').innerText = `升级科技 (成本: ${1000 * techLevel} 元宇宙币)`;
}

function buyResource(resource) {
    if (wallet.value >= resource.price) {
        wallet.value -= resource.price;
        resource.count++;
        resource.price = Math.round(resource.price * 1.1);
        calculateIncome();
        updateDisplay();
    }
}

function upgradeTech() {
    if (wallet.value >= 1000 * techLevel) {
        wallet.value -= 1000 * techLevel;
        techLevel++;
        updateDisplay();
    }
}

function calculateIncome() {
    incomePerSecond = (land.count * 1 * techLevel) + (building.count * 5 * techLevel);
}

function rebirth() {
    Object.assign(wallet, { value: 100 });
    Object.assign(land, { count: 0, price: 50 });
    Object.assign(building, { count: 0, price: 500 });
    techLevel = 1;
    calculateIncome();
    updateDisplay();
}

document.getElementById('landResource').addEventListener('click', () => buyResource(land));
document.getElementById('buildingResource').addEventListener('click', () => buyResource(building));
document.getElementById('techResource').addEventListener('click', upgradeTech);
document.getElementById('rebirthButton').addEventListener('click', rebirth);
document.getElementById('gameOverContainer').addEventListener('click', restartGame);

function restartGame() {
    rebirth();
    document.getElementById('gameOverContainer').style.display = 'none';
}

setInterval(() => {
    wallet.value += incomePerSecond;
    updateDisplay();
}, 1000);

updateDisplay();
