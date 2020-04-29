//add background

const calculator = document.querySelector('#calculator');
calculator.addEventListener('click', respondToClick);

window.addEventListener('keydown', respondToKey);

const display = document.querySelector('#display');

let components = [''];
let validKeys = ['^', '!', 'Backspace', 'c', '%', '-', '1', '2', '3', '4', '5',
 '6', '7', '8', '9', '0', '*', 'x', '/', '.', '=', 'Enter', '+'];

let clearOnNumber = false;
let errorMessage = false;

let operators = ['^', '*', '÷', '+', '-']; //does not include immediate operators

showDisplay();

function respondToKey(e) {
  console.log(e.key);
  let userKey = validKeys.find(key => (e.key == key));
  if(userKey == 'Enter') userKey = '=';
  else if(userKey == 'x') userKey = '*';
  else if(userKey == '/') userKey = '÷'
  if(userKey) {
    let activeButton = document.querySelector(`.button[id='${userKey}']`);
    let currentClass;
    if(activeButton.classList.contains('number')) currentClass = 'number';
    else if(activeButton.classList.contains('operator')) currentClass = 'operator';
    else currentClass = 'special';
    activeButton.classList.add(`${currentClass}-active`);
    respondToClick(e, userKey);
    setTimeout(function() {
      activeButton.classList.remove(`${currentClass}-active`)
    }, 100);
    
  }
}
function respondToClick(e, keyValue) {
  let target;
  // console.log(e);
  if(errorMessage) {
    display.style = 'font-size: 5.5vh; color: black';
    display.textContent = 0;
    errorMessage = false;
    return;
  }
  if(keyValue) target = keyValue;
  else target = e.target.id;
  console.log(e.target);
  if(e.target.className == "fas fa-backspace") target='Backspace';
  if(target == 'display' || target == 'calculator') return;
  // console.log(target);
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
      case('c'):
        console.log(components[components.length - 1]);
        components = [''];
        showDisplay();
        return;
      case('Backspace'):
        backSpace();
        showDisplay();
        return;
    }
    if(components == '') {
      if(target == '!') {
        components[components.length-1] = 1;
        clearOnNumber = true;
      } else return;
    }
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
      case('='):
        operate();
        console.log(components.join(' '));
        clearOnNumber = true;
        break;
      //immediate operators: !, plus-minus, root, %, reciprocal:
      case('!'):
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
      case('%'):
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
      display.style = 'font-size: 5.5vh; color: black';
      display.textContent = 0;
      return;
    }
    let currentDisplay = components.join(' ');
    let longest = components.reduce((a, b) => `${a}`.length > `${b}`.length ? a : b);
    longest = `${longest}`;
    if(currentDisplay.length < 14 && longest.length < 6) {
      display.style = 'font-size: 5.5vh';
    } else if(currentDisplay.length < 20 && longest.length < 10) {
      display.style = 'font-size: 4vh';
    } else if(currentDisplay.length < 50 && longest.length < 20) {
      display.style = 'font-size: 3vh';
    } else if(currentDisplay.length < 100 && longest.length < 30) {
      display.style = 'font-size: 2vh';
    } else if(currentDisplay.length < 150 && longest.length < 45) {
      display.style = 'font-size: 1.5vh';
    } else {
      display.style = 'font-size: 2.4vh; color: red';
      display.textContent = 'Error: Your ambition is greater than that of this calculator.';
      errorMessage = true;
      components = [''];
      return;
    }
    console.log(`total length is ${currentDisplay.length}`);
    console.log(`longest string length is ${longest.length}`);
    display.textContent = currentDisplay;
  } else {
    // errorMessage = false;
    // do nothing;
  }
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
            display.style = 'font-size: 2.4vh; color: red';
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
    display.style = 'font-size: 2.4vh; color: red';
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