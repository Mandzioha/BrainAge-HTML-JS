const wrap = document.querySelector('.wrap');

const mathProblems = [
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

class Quiz {
  constructor() {
    this.usedIndexes = [];
    this.epsilon = 1e-6;
    this.template = document.querySelector('#template');
    this.initializeQuiz();
  }

  getRandomUniqueIndex(arr) {
    let index;
    do {
      index = Math.floor(Math.random() * arr.length);
    } while (this.usedIndexes.includes(index));
    this.usedIndexes.push(index);
    return index;
  }

  setRandomMath() {
    const index = this.getRandomUniqueIndex(mathProblems);
    this.currentMath = mathProblems[index];
    this.text.textContent = `Oblicz: ${this.currentMath.expression}`;
  }

  showAnswer() {
    const userInput = parseFloat(this.input.value);

    if (!isNaN(userInput)) {
      const isCorrect = Math.abs(userInput - this.currentMath.answer) < this.epsilon;
      this.display.textContent = isCorrect ? "Poprawna odpowiedź!" : "Błędna odpowiedź.";
    } else {
      this.display.textContent = "Wystąpił błąd w obliczeniach. Spróbuj ponownie.";
    }
  }

  initializeQuiz() {
    const clone = this.template.content.cloneNode(true);
    const btn = clone.querySelector("button");

    this.input = clone.querySelector("input");
    this.display = clone.querySelector(".quest");
    this.text = clone.querySelector(".text");

    wrap.appendChild(clone);

    onload = () => this.setRandomMath();

    btn.addEventListener("click", () => this.showAnswer());
  }
}

const question1 = new Quiz();
