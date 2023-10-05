const wrap = document.querySelector(".wrap");

const mathProblems = [
  // { expression: "2 + 3", answer: 5 },
  // { expression: "5 - 1", answer: 4 },
  // { expression: "4 * 6", answer: 24 },
  // { expression: "8 / 2", answer: 4 },
  // { expression: "10 + 7", answer: 17 },
  // { expression: "15 - 9", answer: 6 },
  // { expression: "3 * 5", answer: 15 },
  // { expression: "12 / 4", answer: 3 },
  // { expression: "9 + 6", answer: 15 },
  // { expression: "18 - 7", answer: 11 },
];

const usedIndexes = [];

class Quiz {
  constructor(index) {
    this.mathIndex = index;
    this.epsilon = 1e-6;
    this.template = document.querySelector("#template");
    this.initializeQuiz();
  }

  generateRandomMathProblem() {
    const isNaturalNumber = (num) => num % 1 === 0 && num > 0;

    let randomNum1, randomNum2, result;

    do {
      randomNum1 = Math.floor(Math.random() * 9) + 1;
      randomNum2 = Math.floor(Math.random() * 9) + 1;

      var operation = Math.floor(Math.random() * 4);

      switch (operation) {
        case 0:
          result = randomNum1 + randomNum2;
          break;
        case 1:
          result = randomNum1 - randomNum2;
          break;
        case 2:
          result = randomNum1 * randomNum2;
          break;
        case 3:
          result = randomNum2 !== 0 ? randomNum1 / randomNum2 : 0;
          break;
        default:
          throw new Error("Invalid operation");
      }
    } while (!isNaturalNumber(result));

    return `${randomNum1} ${
      operation === 0
        ? "+"
        : operation === 1
        ? "-"
        : operation === 2
        ? "*"
        : "/"
    } ${randomNum2}`;
  }

  setRandomMath() {
    const expression = this.generateRandomMathProblem();

    let result;
    try {
      result = eval(expression);
      console.log(result);
    } catch (error) {
      console.error("Error while evaluating expression:", error);
      throw new Error("Error evaluating expression");
    }

    mathProblems.push({
      expression: expression,
      answer: result,
    });

    this.currentMath = mathProblems.at(-1);
    console.log(this.currentMath);
    this.text.textContent = `Oblicz: ${this.currentMath.expression}`;
  }

  showAnswer() {
    const userInput = parseFloat(this.input.value);

    if (!isNaN(userInput)) {
      const isCorrect =
        Math.abs(userInput - this.currentMath.answer) < this.epsilon;
      this.display.textContent = isCorrect
        ? "Poprawna odpowiedź!"
        : "Błędna odpowiedź.";
      this.input.setAttribute("disabled", "");
      this.reset();
    } else {
      this.display.textContent =
        "Wystąpił błąd w obliczeniach. Spróbuj ponownie.";
    }
  }

  initializeQuiz(callback) {
    const clone = this.template.content.cloneNode(true);
    const btn = clone.querySelector("button");

    this.input = clone.querySelector("input");
    this.display = clone.querySelector(".quest");
    this.text = clone.querySelector(".text");

    wrap.appendChild(clone);
    this.setRandomMath();

    btn.addEventListener("click", () => {
      this.showAnswer();
      if (callback) {
        callback();
      }
    });
  }

  reset() {
    this.mathIndex = null;
    this.input = null;
    this.display = null;
    this.text = null;
    this.currentMath = null;
  }
}

const activateQuiz = () => {
  const createNextQuiz = () => {
    for (let currentIndex = 0; currentIndex < 10; currentIndex++) {
      new Quiz(currentIndex, createNextQuiz);
    }
  };

  createNextQuiz();
};

onload = activateQuiz;
