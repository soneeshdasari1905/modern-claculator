/**
 * ============================================================================
 * MODERN MINIMALIST CALCULATOR - JAVASCRIPT LOGIC
 * ============================================================================
 * 
 * Welcome! This script controls all the math, button clicks, and screen updates.
 * We'll break it down into 4 clear parts:
 * 
 *  1. DOM Elements (Selecting items from HTML)
 *  2. Calculator State (Remembering what numbers and operator were typed)
 *  3. Core Functions (Math operations, formatting, and screen rendering)
 *  4. Event Listeners (Listening for mouse clicks and keyboard typing)
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. DOM ELEMENTS
// ---------------------------------------------------------------------------
// We use document.getElementById and querySelectorAll to find our HTML elements.
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const actionButtons = document.querySelectorAll('[data-action]');

// ---------------------------------------------------------------------------
// 2. CALCULATOR STATE
// ---------------------------------------------------------------------------
// These variables store the "memory" of our calculator.
let currentOperand = '0';      // The number currently being entered or shown
let previousOperand = '';     // The stored number from before the operator
let operation = null;         // The selected operator (+, −, ×, ÷)
let shouldResetScreen = false; // Flag to know if the next digit starts a new number

// ---------------------------------------------------------------------------
// 3. CORE FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Resets the calculator completely back to starting state (AC).
 */
function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
  shouldResetScreen = false;
  updateDisplay();
}

/**
 * Removes the last typed digit (DEL / Backspace).
 */
function deleteDigit() {
  // If screen shows an error or was just calculated, reset it
  if (shouldResetScreen || currentOperand === 'Error') {
    clearAll();
    return;
  }

  // If there's only 1 character left, reset back to '0'
  if (currentOperand.length <= 1) {
    currentOperand = '0';
  } else {
    // Slice off the last character
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

/**
 * Appends a number or decimal point to the current operand.
 * @param {string} number - The digit or dot clicked (e.g. '7' or '.')
 */
function appendNumber(number) {
  // If a calculation was just finished, start a fresh number
  if (shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }

  // Prevent multiple decimal points (e.g. avoid '3.14.15')
  if (number === '.' && currentOperand.includes('.')) return;

  // If the current number is just '0' and we type another digit, replace '0'
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }

  updateDisplay();
}

/**
 * Selects an arithmetic operator (+, −, ×, ÷).
 * If a calculation is already pending, it computes it first!
 * @param {string} op - The operator symbol
 */
function chooseOperation(op) {
  // If the user has an error on screen, do nothing until cleared
  if (currentOperand === 'Error') return;

  // Allow switching the operator if user clicks a different one before typing the next number
  if (currentOperand === '' && previousOperand !== '') {
    operation = op;
    updateDisplay();
    return;
  }

  // If we already have a previous operand waiting, calculate the intermediate result
  if (previousOperand !== '') {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  shouldResetScreen = false;
  updateDisplay();
}

/**
 * Calculates percentage (%) on the current operand.
 */
function calculatePercentage() {
  if (currentOperand === 'Error' || currentOperand === '') return;

  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;

  // Standard percentage: value divided by 100
  // e.g. 50% = 0.5
  currentOperand = (current / 100).toString();
  updateDisplay();
}

/**
 * Performs the arithmetic calculation based on previousOperand, operation, and currentOperand.
 */
function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // If either number isn't valid, don't calculate
  if (isNaN(prev) || isNaN(current) || !operation) return;

  // Perform math based on chosen operator
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
    case '−':
      result = prev - current;
      break;
    case '×':
    case '*':
      result = prev * current;
      break;
    case '÷':
    case '/':
      // Division by zero safeguard
      if (current === 0) {
        currentOperand = 'Error';
        previousOperand = '';
        operation = null;
        shouldResetScreen = true;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Fix floating point precision issues (e.g. 0.1 + 0.2 = 0.30000000000000004)
  // Rounding to 12 decimal places cleanly eliminates precision bugs
  result = Math.round(result * 1e12) / 1e12;

  currentOperand = result.toString();
  operation = null;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

/**
 * Formats a raw number string with thousands separators (e.g. 1,000,000)
 * while preserving decimals during active typing.
 * @param {string} numberString
 * @returns {string} Formatted number
 */
function formatDisplayNumber(numberString) {
  if (numberString === '' || numberString === null) return '';
  if (numberString === 'Error') return 'Error';

  // Split into integer part and decimal part
  const parts = numberString.split('.');
  const integerPart = parseFloat(parts[0]);
  const decimalPart = parts[1];

  let integerDisplay = '';
  if (isNaN(integerPart)) {
    // Handles typing '-' or empty values
    integerDisplay = parts[0] === '-' ? '-' : '';
  } else {
    // Format integer with commas using standard locale
    integerDisplay = integerPart.toLocaleString('en-US');
    // Preserve negative sign if user enters -0
    if (numberString.startsWith('-') && integerPart === 0) {
      integerDisplay = `-${integerDisplay}`;
    }
  }

  // If user typed a decimal point, attach it back with decimal digits
  if (decimalPart !== undefined) {
    return `${integerDisplay}.${decimalPart}`;
  } else {
    return integerDisplay;
  }
}

/**
 * Renders the state variables onto the screen.
 */
function updateDisplay() {
  currentOperandElement.innerText = formatDisplayNumber(currentOperand) || '0';

  if (operation != null && previousOperand !== '') {
    previousOperandElement.innerText = `${formatDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

// ---------------------------------------------------------------------------
// 4. EVENT LISTENERS
// ---------------------------------------------------------------------------

// A. Number Buttons (0-9, .)
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.dataset.number);
  });
});

// B. Operator Buttons (+, −, ×, ÷)
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.dataset.operator);
  });
});

// C. Action Buttons (AC, DEL, %, =)
actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'clear') {
      clearAll();
    } else if (action === 'delete') {
      deleteDigit();
    } else if (action === 'percent') {
      calculatePercentage();
    } else if (action === 'calculate') {
      compute();
    }
  });
});

// D. Keyboard Support (Bonus user experience!)
window.addEventListener('keydown', (e) => {
  // Prevent default scrolling for Space/Enter
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
  }

  // Digits & Decimal Point
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendNumber(e.key);
  }

  // Operators
  if (e.key === '+') chooseOperation('+');
  if (e.key === '-') chooseOperation('-');
  if (e.key === '*') chooseOperation('×');
  if (e.key === '/') chooseOperation('÷');

  // Equals / Enter
  if (e.key === 'Enter' || e.key === '=') {
    compute();
  }

  // Backspace (Delete)
  if (e.key === 'Backspace') {
    deleteDigit();
  }

  // Escape (Clear All)
  if (e.key === 'Escape') {
    clearAll();
  }

  // Percent
  if (e.key === '%') {
    calculatePercentage();
  }
});

