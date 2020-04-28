
const calculator = document.querySelector('#calculator');
calculator.addEventListener('click', respondToClick);

const display = document.querySelector('#display');

let components = [''];

let clearOnNumber = false;
let errorMessage = false;

let operators = ['^', '*', '÷', '+', '-']; //does not include immediate operators

showDisplay();

function respondToClick(e) {
  let target = e.target.id;
  console.log(e);
  if(e.target.className == "fas fa-backspace") target='delete';
  if(target == 'display' || target == 'calculator') return;
  console.log(target);
  if(!isNaN(target)) {
    if(clearOnNumber) {
      components = [''];
      clearOnNumber = false
    }
    components[components.length - 1] += target;
  } else if(target == '.') {
    if(clearOnNumber) {
      components = [''];
      clearOnNumber = false
    }
    if(components[components.length-1].indexOf('.') == '-1') {
      if(components[components.length - 1] == '') components[components.length - 1] = 0 + target;
      else components[components.length - 1] += target;
    } else return;
  } else {
    clearOnNumber = false;
    switch(target) {
      case('clear'):
        console.log(components[components.length - 1]);
        components = [''];
        showDisplay();
        return;
      case('delete'):
        backSpace();
        showDisplay();
        return;
    }
    if(components == '') return;
    //all other options are operators... check if last item in components[] is an operator; 
    //if so replace that with new operator. (immediate operators don't need to be looked for)
    operators.forEach(function(operator) {
      if((components[components.length - 2] == operator) && (components[components.length - 1] == '')) {
        components.pop();
        components.pop();
        console.log(`found ${operator}`);
      }
    })
    switch(target) {
      case('equals'):
        operate();
        console.log(components.join(' '));
        clearOnNumber = true;
        break;
      //immediate operators: factorial, plus-minus, root, percent, reciprocal:
      case('factorial'):
        components[components.length-1] = factorial(components[components.length-1]);
        clearOnNumber = true;
        break;
      case('plus-minus'):
        if(components[components.length-1] == '') break;
        components[components.length-1] = +(components[components.length-1]) * -1;
        break;
      case('root'):
        components[components.length-1] = squareRoot(components[components.length-1]);
        clearOnNumber = true;
        break;
      case('percent'):
        components[components.length-1] = +(components[components.length-1] * 0.01);
        clearOnNumber = true;
        break;
      case('reciprocal'):
        components[components.length-1] = reciprocal(components[components.length-1]);
        clearOnNumber = true;
        break;
      //all other operators:
      default: //if current component is empty, add operator to it, otherwise push operator into new component
        if(components[components.length-1] == '') {
          components[components.length-1] = target;
          components.push('');
        }
        else {
        components.push(target);
        components.push('');
        }
    }
  }
  showDisplay();
}

function showDisplay() {
  if(!errorMessage) {
    if(components == '') {
      display.textContent = 0;
      return;
    }
    let currentDisplay = components.join(' ');
    if(currentDisplay.length < 16) {
      display.style = 'font-size: 5.5vh';
    }
    else if(currentDisplay.length < 40) {
      display.style = 'font-size: 4vh';
    } else if(currentDisplay.length < 50) {
      display.style = 'font-size: 3vh';
    } else {
      display.style = 'font-size: 2vh';
    }
    let longest = components.reduce((a, b) => `${a}`.length > `${b}`.length ? a : b);
    longest = `${longest}`;
    if(longest.length < 15) {
      //do nothing
    } else if(longest.length < 20) {
      display.style = 'font-size: 4vh';
    } else if(longest.length < 27) {
      display.style = 'font-size: 3vh';
    } else if(longest.length < 34) {
      display.style = 'font-size: 2.4vh';
    } else if (longest.length < 47) {
      display.style = 'font-size: 1.7vh';
    } else {
      display.style = 'font-size: 2.4vh';
      display.textContent = 'Error: Your ambition is greater than that of this calculator.';
      errorMessage = true;
      components = [''];
      display.style = 'font-size: 5.5vh';
      return;
    }
    display.textContent = currentDisplay;
  } else errorMessage = false;
}
function backSpace() {
  if(components == '') return;
  if(components[components.length - 1] !== '') {
    components[components.length-1] = components[components.length-1].toString();
    components[components.length - 1] = components[components.length - 1].slice(0, (components[components.length - 1].length - 1));
  } else {
    components.pop();
    backSpace();
  }
}
function operate() {
  operators.forEach(function(operator) {
    let index = components.findIndex(component => component == operator);
    console.log(index);
    while(index !== -1) {
      switch(operator) {
        case('^'):
          components[index - 1] = power(components[index - 1], components[index + 1]);
          break;
        case('*'):
          components[index - 1] = multiply(components[index - 1], components[index + 1]);
          break;
        case('÷'):
          if(components[index + 1] == 0) {
            display.style = 'font-size: 2.4vh';
            display.textContent = 'Sometimes the impossible really is impossible.';
            errorMessage = true;
            components = [''];
            return;
          }
          components[index - 1] = divide(components[index - 1], components[index + 1]);
          break;
        case('+'):
          components[index - 1] = add(components[index - 1], components[index + 1]);
          break;
        case('-'):
          components[index - 1] = subtract(components[index - 1], components[index + 1]);
          break;
        default:
          console.error('Operator not found.');
      }
      components.splice(index, 2);
      index = components.findIndex(component => component == operator);
    }
  })
}
function round(num) {
  return Math.round(num * 100000000) / 100000000;
}
function factorial(num) {
  if(!Number.isInteger(+num) || num > 100 || num < 0) {
    display.style = 'font-size: 2.4vh';
    display.textContent = 'Error: Your ambition is greater than that of this calculator.';
    errorMessage = true;
    components = [''];
    return;
  }
  else if(num == 0) return 1;
  for(let i = num - 1; i > 0; i--) {
    num *= i;
  }
  return num;
}
function squareRoot(num) {
  if(num < 0) {
    display.style = 'font-size: 2.4vh; color: red';
    display.textContent = 'Error: Your ambition is greater than that of this calculator.';
    errorMessage = true;
    components = [''];
    return;
  }
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
  return round(a / b);
}