const display = document.getElementById('display');

function push(val) {
    display.value += val;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

// Factorial Logic (Casio style)
function factorial() {
    let num = parseInt(display.value);
    if (isNaN(num)) return;
    if (num < 0) return display.value = "Math Error";
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    display.value = result;
}

function calculate() {
    try {
        let expression = display.value;

        // Auto-close brackets logic taake syntax error na aaye
        const openBrackets = (expression.match(/\(/g) || []).length;
        const closeBrackets = (expression.match(/\)/g) || []).length;
        for (let i = 0; i < (openBrackets - closeBrackets); i++) {
            expression += ')';
        }

        // Eval expression
        const result = eval(expression);
        
        if (result === Infinity) {
            display.value = "Math Error";
        } else {
            // Decimals ko professional tareeqe se handle karna
            display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
        }
    } catch (err) {
        display.value = "Syntax Error";
        setTimeout(clearDisplay, 1500);
    }
}