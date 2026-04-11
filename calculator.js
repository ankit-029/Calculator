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
      output.innerText = secondStr;
    }
  });
});

let firstNum,
  secondNum,
  firstStr = "",
  secondStr = "",
  flag = 0;
