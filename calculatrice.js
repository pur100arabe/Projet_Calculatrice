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
        
        // Si 0, remplacer par le nouveau chiffre
        // Sinon, mettre le chiffre à la suite
        if (currentDisplay === '0') {
            currentDisplay = number;
        } else {
            currentDisplay += number;
        }

        // MAJ de l'affichage
        display.innerHTML = currentDisplay;
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
