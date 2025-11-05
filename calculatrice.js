let number1 = "";
let number2 = "";
let operator = "";
let display = document.querySelector('.display');
let operatorButtons = document.querySelectorAll('.operator');
let clearButton = document.querySelector('.clear');
let resultButton = document.querySelector('.equals');

const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch);

const buttons = document.querySelectorAll('[data-number]');
let currentDisplay = '0';

let isFirstInput = true;

// Gestion des opérateurs
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.getAttribute('data-operator');

        if (isFirstInput) {
            number1 = currentDisplay;
            isFirstInput = false;
        } else {
            number2 = currentDisplay;
        }

        const current = String(display.innerHTML);
        const trimmed = current.trim();

        if (trimmed.length === 0 || trimmed === '0') {
            return;
        }

        const lastChar = trimmed.slice(-1);

        if (isOperator(lastChar)) {
            display.innerHTML = trimmed.slice(0, -1) + operator;
        } else {
            display.innerHTML = trimmed + operator;
        }
        currentDisplay = '';
    });
});


//Gestion des chiffres
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        if (!display) return;

        const disp = String(display.innerHTML).trim();
        const lastChar = disp.slice(-1);

        // Cas : affichage initial vide ou "0" -> remplacer
        if (disp === '' || disp === '0') {
            currentDisplay = number;
            display.innerHTML = number;
        }
        // Si le dernier caractère est un opérateur, on commence un nouveau nombre
        else if (isOperator(lastChar)) {
            currentDisplay = number;
            display.innerHTML = disp + number;
        }
        // Sinon on continue le même nombre
        else {
            currentDisplay = (currentDisplay === '0' || currentDisplay === '') 
                ? number 
                : currentDisplay + number;
            display.innerHTML = disp + number;
        }

        // 🔥 Mise à jour dynamique de number1 ou number2
        if (operator === "") {
            number1 = currentDisplay; // avant qu’un opérateur soit choisi
        } else {
            number2 = currentDisplay; // après qu’un opérateur ait été choisi
        }

        console.log(`number1: ${number1}, operator: ${operator}, number2: ${number2}`);
    });
});


// Bouton Clear (C ou Esc)
function Clear() {
    currentDisplay = '0';
    number1 = "";
    number2 = "";
    operator = "";
    display.innerHTML = currentDisplay;
}
clearButton.addEventListener('click', Clear);

// Touches clavier pour Clear et Result
document.addEventListener('keydown', (e) => {
    const key = String(e.key);
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        Clear();
    }
    if(key === 'Enter' || key === '='){
        Result();
    }
});

function Result() {
        if (number1 !== "" && operator !== "" && number2 !== "") {
        let result;
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;  
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : 'Error';
                break;
            default:
                return;
        }   
        display.innerHTML = String(result);
        currentDisplay = String(result);
        number1 = String(result);
        number2 = "";
        operator = "";
        isFirstInput = true;
    }
}

resultButton.addEventListener('click', Result);