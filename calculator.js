const inputButton = document.querySelectorAll(".input-button");
inputButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    // take input and update it to screen.
    const output = document.querySelector("#screen");
    output.innerText += event.target.innerText;
    // Automatically scroll to the rightmost edge of the text
    output.scrollLeft = output.scrollWidth;
  });
});

const operatorInput = document.querySelectorAll(".operators");
operatorInput.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!flag) {
      //If its first operator, write it to screen and store it.
      operator = event.target.innerText;
      const output = document.querySelector("#screen");

      if ((operator === "=") | ((output.innerText === "") & (operator !== "-")))
        return;
      else if ((output.innerText === "") & (operator === "-")) {
        output.innerText += operator;
        return;
      }
      if ((output.innerText === "-") & (operator !== "+")) return;
      else if ((output.innerText === "-") & (operator === "+")) {
        output.innerText = "";
        return;
      }

      flag = 1; //Change the flag to indicate fisrt operator.
      output.innerText += operator;
    } else {
      let prevOperator = operator;
      const input = document.querySelector("#screen");
      let expression = input.innerText;
      operator = event.target.innerText;
      if (expression.at(-1) === prevOperator) {
        input.innerText = expression.slice(0, -1);
        input.innerText += operator;
        return;
      }

      let idx = expression.indexOf(prevOperator); //Index of the operator.
      let firstStr = expression.slice(0, idx),
        secondStr = expression.slice(idx + 1, expression.length);

      const result = operation(
        Number(firstStr),
        Number(secondStr),
        prevOperator,
      );
      if (operator === "=") {
        input.innerText = String(result);
        flag = 0;
        operator = "";
        return;
      }
      input.innerText = String(result) + operator;
      input.scrollLeft = input.scrollWidth;
    }
  });
});

function operation(num1, num2, operator) {
  const op = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "×": (a, b) => a * b,
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
    (lastChar === "×") |
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
