const inputButton = document.querySelectorAll(".input-button");
inputButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    // take input and update it to screen.
    const output = document.querySelector("#screen");
    output.innerText += event.target.innerText;
  });
});

const operatorInput = document.querySelectorAll(".operators");
operatorInput.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!flag) {
      //If its first operator, write it to screen and store it.
      operator = event.target.innerText;
      if (operator === "=") return;
      flag = 1; //Change the flag to indicate fisrt operator.
      const output = document.querySelector("#screen");
      output.innerText += operator;
    } else {
      const operator2 = operator;
      operator = event.target.innerText;

      const input = document.querySelector("#screen");
      let expression = input.innerText;
      let idx = expression.indexOf(operator2); //Index of the operator.
      let firstStr = expression.slice(0, idx),
        secondStr = expression.slice(idx + 1, expression.length);

      const result = operation(Number(firstStr), Number(secondStr), operator2);
      if (operator === "=") {
        input.innerText = String(result);
        flag = 0;
        operator = "";
        return;
      }
      input.innerText = String(result) + operator;
    }
  });
});

function operation(num1, num2, operator) {
  const op = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  return op[operator](num1, num2);
}

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
  const inputExpression = document.querySelector("#screen");
  let s = inputExpression.innerText;
  let lastChar = s.at(-1);
  if (
    (lastChar === "+") |
    (lastChar === "-") |
    (lastChar === "*") |
    (lastChar === "/")
  )
    flag = 0;
  inputExpression.innerText = s.slice(0, -1);
});

const allClear = document.querySelector("#clear");
allClear.addEventListener("click", () => {
  const input = document.querySelector("#screen");
  input.innerText = "";
  flag = 0;
});

let flag = 0,
  operator = "";
