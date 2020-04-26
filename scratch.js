function respondToClick(e) {
  let target = e.target.id;
  console.log(target);
  switch(target) {
    case(!isNaN):
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
      operate(target);
      console.log(elements.join(' ')); //temporary
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
    default:
      elements.push(target);
      elements.push('');
  }
}