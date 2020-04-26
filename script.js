
const calculator = document.querySelector('#calculator');
calculator.addEventListener('click', respondToClick);

const display = document.querySelector('#display');

let elements = [''];


function respondToClick(e) {
  let target = e.target.id;
  console.log(target);
  if(!isNaN(target)) elements[elements.length - 1] += target;
  else {
    switch(target) {
      case('.'):
        elements[elements.length - 1] += target;
        break;
      case('clear'):
        console.log(elements[elements.length - 1]);
        elements = [''];
        //clear display
        break;
      case('delete'):
        backSpace();
        break;
      case('equals'):
        operate();
        console.log(elements.join(' ')); //temporary
        //immediate operators: factorial, plus-minus, root, percent, reciprocal:
        break;
      case('factorial'):
        elements[elements.length-1] = factorial(elements[elements.length-1]);
        elements.push('');
        break;
      case('plus-minus'):
        elements[elements.length-1] = +(elements[elements.length-1]) * -1;
        elements.push('');
        break;
      case('root'):
        elements[elements.length-1] = squareRoot(elements[elements.length-1]);
        elements.push('');
        break;
      case('percent'):
        elements[elements.length-1] = +(elements[elements.length-1] * 0.01);
        elements.push('');
        break;
      case('reciprocal'):
        elements[elements.length-1] = reciprocal(elements[elements.length-1]);
        elements.push('');
        break;
      //all other operators:
      default:
        elements.push(target);
        elements.push('');
    }
  }
  display.textContent = elements.join(' ');
}
function backSpace() {
  
  if(elements[elements.length - 1]) {
    elements[elements.length-1] = elements[elements.length-1].toString();
    elements[elements.length - 1] = elements[elements.length - 1].slice(0, (elements[elements.length - 1].length - 1));
  } else {
        elements.pop();
        if(elements.length !== 0) backSpace();
        else return;
  }
}

// let operators = {
//   1: '^',
//   2: '*',
//   3: '÷',
//   4: '+',
//   5: '-',
// }
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


// function operator(sign, a, b) {
//   switch(sign) {
//     case('+'):
//       return add(a, b);
//       break;
//     case('-'):
//       return subtract(a, b);
//       break;
//     case('*'):
//       return multiply(a,b);
//       break;
//     case('/'):
//       return divide(a,b);
//       break;
//     default:
//       console.error('No match for first argument (sign)')
//   }
// }

function factorial(num) {
  for(let i = num-1; i > 1; i--) {
    num *= i;
  }
  return num;
}
function squareRoot(num) {
  return Math.round(Math.sqrt(num) * 100) / 100;
}
function reciprocal(num) {
  return Math.round(1 / num * 100) / 100;
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