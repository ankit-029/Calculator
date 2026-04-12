const inputButton = document.querySelectorAll(".input-button");
inputButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!flag) {
      firstStr += event.target.innerText;
      const output = document.querySelector("#screen");
      output.innerText = firstStr;
    } else {
      secondStr += event.target.innerText;
      const output = document.querySelector("#screen");
      output.innerText += event.target.innerText;
    }
  });
});

const operatorInput = document.querySelectorAll(".operators");
operatorInput.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!flag) {
      operator = event.target.innerText;
      flag = 1;
      const output = document.querySelector("#screen");
      output.innerText += operator;
    } else {
      const operator2 = operator;
      operator = event.target.innerText;
      const result = operation(Number(firstStr), Number(secondStr), operator2);
      const formattedResult = result.toFixed(3);
      const output = document.querySelector("#screen");

      if (Number.isInteger(result)) output.innerText = result + operator;
      else output.innerText = formattedResult + operator;
      firstStr = String(result);
      secondStr = "";
    }
  });
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  if (operator != "") {
    const result = operation(Number(firstStr), Number(secondStr), operator);
    const formattedResult = result.toFixed(3);
    const output = document.querySelector("#screen");

    if (Number.isInteger(result)) output.innerText = result;
    else output.innerText = formattedResult;
    firstStr = String(result);
    secondStr = "";
    flag = 0;
  }
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

let firstNum,
  secondNum,
  firstStr = "",
  secondStr = "",
  flag = 0,
  operator = "";
