
const calculator = document.querySelector('#calculator');
calculator.addEventListener('click', respondToClick);

let elements = [''];

let operators = {
  1: '^',
  2: '*',
  3: '÷',
  4: '+',
  5: '-',
}

function respondToClick(e) {
  let target = e.target.id;
  console.log(target);
  if(!isNaN(target) || (target == '.')) {
    elements[elements.length - 1] += target;
  } else if(target == 'factorial') {
    elements[elements.length-1] = factorial(elements[elements.length-1]);
    elements.push('');
  } else if(target == 'plus-minus') {
    elements[elements.length-1] = +(elements[elements.length-1]) * -1;
    elements.push('');
  } else if (target == 'clear') {
    console.log(elements[elements.length - 1]);
    elements = [''];
    //clear display
  } else if(target == 'delete') {
    backSpace();
  }
  else if(target == 'equals') {
    operate(target);
    console.log(elements.join(''));
  } else {
      elements.push(target);
      elements.push('');
  }
}
function backSpace() {
  if(elements[length - 1].length > 0) {
    elements[elements.length - 1] = 
      elements[elements.length - 1].slice(0, (elements[elements.length - 1].length - 1));
    } else {
        elements.pop();
        if(elements) backSpace();
        else return;
    }
}
function operate(target) {
  console.log(elements);
  //immediate operators: factorial, plus-minus, root, percent, reciprocal
  if(target == 'factorial') {
    elements[elements.length-1] = factorial(elements[elements.length-1]);
  } else if(target == 'plus-minus') {
    elements[elements.length-1] = +(elements[elements.length-1]) * -1;
  } else if(target == 'root') {
    elements[elements.length-1] = squareRoot(elements[elements.length-1]);
  } else if(target == 'percent') {
    elements[elements.length-1] = +(elements[elements.length-1] * 0.01);
  } else if(target == 'reciprocal') {
    elements[elements.length-1] = reciprocal(elements[elements.length-1]);
  }
}


function operator(sign, a, b) {
  switch(sign) {
    case('+'):
      return add(a, b);
      break;
    case('-'):
      return subtract(a, b);
      break;
    case('*'):
      return multiply(a,b);
      break;
    case('/'):
      return divide(a,b);
      break;
    default:
      console.error('No match for first argument (sign)')
  }
}

function factorial(num) {
  return num;
}
function squareRoot(num) {
  return num;
}
function reciprocal(num) {
  return num;
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}