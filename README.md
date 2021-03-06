# Calculator
Created as part of the curriculum for The Odin Project.

[Live Page](https://andrewjh271.github.io/calculator/)

### Functionality

- The calculator also functions with the following keys: '^', '!', 'Backspace', 'c', '%', '-', '1', '2', '3', '4', '5',
   '6', '7', '8', '9', '0', '*', 'x', '/', '.', '=', 'Enter', '+'.
- Certain operators evaluate immediately: factorial, plus-minus, root, percent, and reciprocal. After performing one of these operations, the user can continue adding components to the current expression, but if a number or '.' is chosen, that will reset the calculator.
- The calculator functions the same way after an expression is evaluated: a number or '.' will reset the calculator, but an operator will continue the expression using the evaluation.
- An 'empty' display will always show 0.
- If '.' is entered into an empty component, '0.' is inserted.
- If an operator is pressed immediately after another (non-immediate) operator, it simply replaces the old one.
- Backspace can delete both numbers and operators.
- Factorial and square root have various error messages for negative numbers, etc.
- An error message is displayed if the display gets too long, but before that happens the font size gets progressively smaller to account for a longer expression.
- Evaluations are rounded to 8 decimal places.

### Thoughts

It took me a while to figure out exactly how I wanted the calculator to function. Eg:

-  Whether the current expression should be shown on the display
-  What operators should be included
- What an empty display should look like

I spent a long time debugging and accounting for various combinations the user could input that would mess up operations:

- If an operator is pressed immediately after another (non-immediate) operator, it simply replaces the old one. I had some trouble debugging this. (See line 90)
- A '.' entered into a component that already has one is simply ignored.
- Backspace can be pressed any number of times with no errors.
- Factorial and square root have various error messages for negative numbers, etc.
- An error message is displayed if the display gets too long.

I ran into problems a number of times forgetting that I needed to make sure the components I was dealing with were either all numbers or all Strings, depending on what I needed. My component[] array tended to be filled with strings, but not necessarily (if a component was the result of an immediate operator).

I restructured the code a bit since, but at one point I wanted to do something like:

```javascript
components.forEach(component => round(component));
```
I struggled with this for a while before coming to the understanding that I am passing the value of each item in the array into the function, not the item itself. Since Number is a primitive type, the function is dealing with a new value that is equal to the value inside my components array. I did this sort of thing a lot in previous projects, but always for Objects. In that case, the code worked, because I was passing a reference to an Object and was able to modify the Object with it. I learned there is another optional index parameter in forEach that would have allowed me to do what I wanted:
```javascript
components.forEach((component, index) => components[index] = round(component));
```
I used a rather convoluted if else statement to incrementally decrease the font size of the display. I suspect there was a better solution to this problem.

I could have saved time by being a bit more organized and outlining my ideas a little before diving into implementing them. Originally I had an empty components array show a blank display, and had a more complicated backSpace() function. I needed to change it quite a bit when I switched to having a '0' always show on the screen. I suspect my clearOnNumber and errorMessage booleans are a slightly clunky way of dealing with various states. The code was getting so long by that point — it was hard to remember everything that needed addressing in various states. If I had thought earlier about what I wanted to happen after an error message or after an expression was evaluated, I think I may have made my code a little cleaner.

I ran into a couple issues when I was trying to make the calculator buttons show their active states on key presses. This line:
```javascript
let activeButton = document.querySelector(`.button[id='${userKey}']`);
```
only works with the class named at the beginning of the string.
```javascript
let activeButton = document.querySelector([id=`${userKey}`]);
```
did not work.

I could not add a pseudostate to my button like this:

```javascript
activeButton.classList.add(`${currentClass}:active`);
```
Instead, I had to make a new, duplicate class:
```javascript
activeButton.classList.add(`${currentClass}-active`);
```
I was happy to get this line into the code:
```javascript
let longest = components.reduce((a, b) => `${a}`.length > `${b}`.length ? a : b);
```
I had to go through the Source step function in Chrome Devtools a number of times. It's such a powerful tool.

I don't know if it's considered good practice to have element id's with names like '÷'. It simplified my Javascript code a little bit, but I had to make alternate class names so that I could reference the elements in CSS.

-Andrew Hayhurst
