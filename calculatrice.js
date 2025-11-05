let number1 = "";
let number2 = "";
let operator = "";
let display = document.querySelector('.display');
let operatorButtons = document.querySelectorAll('.operator');
let clearButton = document.querySelector('.clear');

const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch);

const buttons = document.querySelectorAll('[data-number]');
let currentDisplay = '0';

let isFirstInput = true;

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
    });
});


// Ajouter un écouteur d'événement à chaque bouton numérique
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
            updateNumbersFromDisplay();
            return;
        }

        // Si le dernier caractère est un opérateur, on commence un nouveau nombre
        if (isOperator(lastChar)) {
            currentDisplay = number;
            display.innerHTML = disp + number;
            updateNumbersFromDisplay();
            return;
        }

        // Sinon on est en train d'entrer le même nombre -> concaténer
        currentDisplay = (currentDisplay === '0' || currentDisplay === '') ? number : currentDisplay + number;
        display.innerHTML = disp + number;
        updateNumbersFromDisplay();
    });
});

clearButton.addEventListener('click', () => {
    currentDisplay = '0';
    number1 = "";
    number2 = "";
    operator = "";
    display.innerHTML = currentDisplay;
});

document.addEventListener('keydown', (e) => {
    const key = String(e.key);
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        currentDisplay = '0';
        number1 = "";
        number2 = "";
        operator = "";
        display.innerHTML = currentDisplay;
    }
});
