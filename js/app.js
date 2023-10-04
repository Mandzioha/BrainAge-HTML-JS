const screen = document.querySelector(".quest");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const text = document.querySelector(".text");
const wrap = document.querySelector('.wrap');

let temp, item, i;

class Question {
  constructor(input, display, text) {
    this.input = input;
    this.display = display;
    this.text = text;
    this.math = [
      { expression: "2 + 3", answer: 5 },
      { expression: "5 - 1", answer: 4 },
      { expression: "4 * 6", answer: 24 },
      { expression: "8 / 2", answer: 4 },
      { expression: "10 + 7", answer: 17 },
      { expression: "15 - 9", answer: 6 },
      { expression: "3 * 5", answer: 15 },
      { expression: "12 / 4", answer: 3 },
      { expression: "9 + 6", answer: 15 },
      { expression: "18 - 7", answer: 11 },
    ];
  }

  getRandomMath() {
    const random = Math.floor(Math.random() * this.math.length);
    return this.math[random];
  }

  setRandomMath() {
    this.currentMath = this.getRandomMath();
    this.text.textContent = `Oblicz: ${this.currentMath.expression}`;
  }

  showAnswer() {
    const userInput = parseFloat(this.input.value);
    const epsilon = 1e-6; 

    if (!isNaN(userInput)) {
      console.log(userInput, this.currentMath);
      (Math.abs(userInput - this.currentMath.answer) < epsilon)
        ? (this.display.textContent = "Poprawna odpowiedź!")
        : (this.display.textContent = "Błędna odpowiedź. Spróbuj ponownie.");
    } else {
      this.display.textContent =
        "Wystąpił błąd w obliczeniach. Spróbuj ponownie.";
    }
  }
}

function initializeQuiz() {
    console.log('work');
    const template = document.querySelector('#template');
    const clone = template.content.cloneNode(true);
    wrap.appendChild(clone);
  
    const Question1 = new Question(input, screen, text);
    onload = () => Question1.setRandomMath();
  
    const addOnClick = () => {
      Question1.showAnswer();
    };
  
    btn.addEventListener("click", addOnClick);
  }

initializeQuiz();