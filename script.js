
const calculator = document.querySelector('#calculator');
calculator.addEventListener('click', respondToClick);

const display = document.querySelector('#display');

let elements = ['0'];
// let clearOnClick = false;
let clearOnNumber = false;

display.textContent = elements.join(' ');
function respondToClick(e) {
  // if(clearOnClick) {
  //   elements = ['0'];
  //   clearOnClick = false;
  // }
  let target = e.target.id;
  console.log(target);
  if(!isNaN(target)) {
    if(clearOnNumber) {
      elements = ['0'];
      clearOnNumber = false
    }
    if(elements[0] == '0' && elements.length == 1) {
      elements = [target];
      //replace 0 with first number
    } else {
      elements[elements.length - 1] += target;
    }
  } else if(target == '.') {
    if(clearOnNumber) {
      elements = ['0'];
      clearOnNumber = false
    }
    if(elements[elements.length-1].indexOf('.') == '-1') {
      if(elements[elements.length-1] == '') elements[elements.length - 1] = 0 + target;
      else elements[elements.length - 1] += target;
    } else return;
  } else if(elements[0] == '0' && elements.length == 1) {
    return;
  } else {
    clearOnNumber = false;
    switch(target) {
      case('clear'):
        console.log(elements[elements.length - 1]);
        elements = ['0'];
        // clearOnClick = true;
        break;
      case('delete'):
        backSpace();
        break;
      case('equals'):
        operate();
        console.log(elements.join(' '));
        clearOnNumber = true;
        break;
      //immediate operators: factorial, plus-minus, root, percent, reciprocal:
      case('factorial'):
        elements[elements.length-1] = factorial(elements[elements.length-1]);
        clearOnNumber = true;
        break;
      case('plus-minus'):
        if(elements[elements.length-1] == '') break;
        elements[elements.length-1] = +(elements[elements.length-1]) * -1;
        break;
      case('root'):
        elements[elements.length-1] = squareRoot(elements[elements.length-1]);
        clearOnNumber = true;
        break;
      case('percent'):
        elements[elements.length-1] = +(elements[elements.length-1] * 0.01);
        clearOnNumber = true;
        break;
      case('reciprocal'):
        elements[elements.length-1] = reciprocal(elements[elements.length-1]);
        clearOnNumber = true;
        break;
      //all other operators:
      default:
        if(elements[elements.length-1] == '') {
          elements[elements.length-1] = target;
          elements.push('');
        }
        else {
        elements.push(target);
        elements.push('');
        }
    }
  }
  showDisplay();
}
function showDisplay() {
  elements.forEach(element => element = round(element));
  display.textContent = elements.join(' ');
}
function backSpace() {
  if(elements[0] == '0' && elements.length == 1) return;
  if(elements[elements.length - 1] !== '0') {
    elements[elements.length-1] = elements[elements.length-1].toString();
    elements[elements.length - 1] = elements[elements.length - 1].slice(0, (elements[elements.length - 1].length - 1));
  } else {
        elements.pop();
        if(elements.length !== 0) backSpace();
        else elements = ['0']
  }
  if(!elements[0]) elements[0] = '0';
}
let operators = ['^', '*', '÷', '+', '-'];
function operate() {
  operators.forEach(function(operator) {
    let index = elements.findIndex(element => element == operator);
    console.log(index);
    while(index !== -1) {
      switch(operator) {
        case('^'):
          elements[index - 1] = power(elements[index - 1], elements[index + 1]);
          break;
        case('*'):
          elements[index - 1] = multiply(elements[index - 1], elements[index + 1]);
          break;
        case('÷'):
          elements[index - 1] = divide(elements[index - 1], elements[index + 1]);
          break;
        case('+'):
          elements[index - 1] = add(elements[index - 1], elements[index + 1]);
          break;
        case('-'):
          elements[index - 1] = subtract(elements[index - 1], elements[index + 1]);
          break;
        default:
          console.error('Operator not found.');
      }
      elements.splice(index, 2);
      index = elements.findIndex(element => element == operator);
    }
  })
}
function round(num) {
  return Math.round(num * 10000) / 10000;
}
function factorial(num) {
  for(let i = num-1; i > 1; i--) {
    num *= i;
  }
  return num;
}
function squareRoot(num) {
  return round(Math.sqrt(num));
}
function reciprocal(num) {
  return round(1/num)
}
function power(a, b) {
  return a ** b;
}
function add(a, b) {
  return +a + +b;
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