import { scoreRanges, scoreRangesParents } from "./data.js";
import { sendRequest } from "./service.js";

export class Survey {
  constructor(question, questionNum, answers) {
    this.question = question;
    this.questionNum = questionNum;
    this.answers = answers;
    this.prevQuestions = {};
  }

  extractInfo() {
    const answers = {};
    questions.forEach((q, index) => {
      const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
      if (selectedAnswer) {
        answers[`q-${index}`] = parseInt(selectedAnswer.value, 10);
      }
    });
    return answers;
  }

  saveScore() {
    const selectedAnswer = document.querySelector(`input[name="q-${this.questionNum}"]:checked`);
    if (selectedAnswer) {
      const score = parseInt(selectedAnswer.value, 10);
      const selectedAnswerText = selectedAnswer.nextSibling.textContent.trim();
      const questionScore = {
        question: this.questionNum + 1,
        score: score,
        selectedAnswer: selectedAnswerText,
      };
      this.prevQuestions = questionScore;
      return score;
    }
  }

  render(onClick) {
    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = "";

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<p>${this.question}</p>`;

    const optionsCDiv = document.createElement("div");
    optionsCDiv.id = "optionsC";

    for (let key in this.answers) {
      const answer = this.answers[key];
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${this.questionNum}`;
      input.value = answer.score;
      input.onclick = onClick;

      const label = document.createElement("label");
      label.style.fontSize = "16px";
      label.style.color = "#fff";
      label.appendChild(input);
      label.appendChild(document.createTextNode(answer.text));
      optionsCDiv.appendChild(label);
      //  optionsCDiv.appendChild(document.createElement("br"));
    }

    questionDiv.appendChild(optionsCDiv);

    questionsDiv.appendChild(questionDiv);
  }
}

export class Wizard {
  constructor() {
    this.currentStepIndex = 0;
    this.steps = [];
    this.finalScore = 0;
  }

  addStep(step) {
    this.steps.push(step);
  }

  nextStep() {
    const currentStep = this.steps[this.currentStepIndex];
    setTimeout(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.finalScore += currentStep.saveScore();

        this.currentStepIndex++;
        this.renderCurrentStep();
      } else {
        this.finalScore += currentStep.saveScore();
        this.finish();
      }
    }, 100);
  }

  renderCurrentStep() {
    const currentStep = this.steps[this.currentStepIndex];
    currentStep.render(this.nextStep.bind(this));
  }

  start() {
    this.renderCurrentStep();
  }

  async finish() {
    this.renderresults();

    const sex = document.getElementById("sex").value.trim();
    const age = document.getElementById("age").value.trim();

    // send API request
    const body = {
      sex,
      age,
      totalScore: this.finalScore,
    };
    sendRequest(body);
  }

  renderresults() {
    // reflect the DOM
    const { imageUrl, message, className } = renderMessage(this.finalScore);
    const resultBaseId = "result";
    const resultsectionDisplay = "flex";
    const questionSection = document.getElementById("questions");
    const resultSection = document.getElementById(`${resultBaseId}`);
    const resultTxt = document.getElementById(`${resultBaseId}-txt`);
    const resultImg = document.getElementById(`${resultBaseId}-img`);

    resultSection.classList.add(className);

    resultSection.style.display = resultsectionDisplay;
    questionSection.style.display = "none";
    resultTxt.innerText = message;

    resultImg.setAttribute("src", imageUrl);
  }
}



function renderMessage(finalScore) {
  const testType = sessionStorage.getItem("testType");

  const matchedRange =
    testType == "player"
      ? scoreRanges.find((range) => {
          return finalScore >= range.min && finalScore <= range.max;
        })
      : scoreRangesParents.find((range) => {
          return finalScore >= range.min && finalScore <= range.max;
        });

  if (matchedRange) {
    return {
      message: matchedRange.message,
      imageUrl: matchedRange.imageUrl,
      className: matchedRange.class,
    };
  } else {
    return {
      message: "No message found for the provided score range.",
      imageUrl: "",
      className: "",
    };
  }
}
