import { questions, adultQuestions } from "./data.js";
import { Survey, Wizard } from "./model.js";
import { swiperInit } from "./swiper.js";

const playersImages = [
  "./assets/images/players/slide-one.jpg",
  "./assets/images/players/slide-two.jpg",
  "./assets/images/players/slide-three.jpg",
];

const parentsImages = [
  "./assets/images/parents/slide-one.jpg",
  "./assets/images/parents/slide-two.jpg",
  "./assets/images/parents/slide-three.jpg",
  "./assets/images/parents/slide-four.jpg",
];

(() => {
  const wizard = new Wizard();

  function startPlayerSurvey() {
    questions.forEach((question, index) => {
      const answers = question.answers;
      const surveyStep = new Survey(question.question, index + 1, answers);
      wizard.addStep(surveyStep);
    });

    const playerInfoDiv = document.getElementById("playerIntro");
    playerInfoDiv.style.display = "none";

    const questionsDiv = document.getElementById("questions");
    questionsDiv.style.display = "flex";
    wizard.start();
  }

  function startParentSurvey() {
    adultQuestions.forEach((question, index) => {
      const answers = question.answers;
      const surveyStep = new Survey(question.question, index + 1, answers);
      wizard.addStep(surveyStep);
    });

    const parentInfoDiv = document.getElementById("parentIntro");
    parentInfoDiv.style.display = "none";
    const questionsDiv = document.getElementById("questions");
    questionsDiv.style.display = "flex";
    wizard.start();
  }

  function moveToSecondSec() {
    const sex = document.getElementById("sex").value.trim();
    const age = document.getElementById("age").value.trim();
    if (sex === "" || age === "") {
      document.getElementById("error-message").style.display = "block";
      return;
    }
    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.style.display = "none";

    const questionsDiv = document.getElementById("chooseTest");
    questionsDiv.style.display = "flex";
  }

  function moveToThirdSec() {
    const selectedOption = document.querySelector('input[name="role"]:checked');
    sessionStorage.setItem("testType", selectedOption.value);
    if (selectedOption) {
      const questionsDiv = document.getElementById("chooseTest");
      questionsDiv.style.display = "none";

      if (selectedOption?.value == "player") {
        const questionsDiv = document.getElementById("playerIntro");
        questionsDiv.style.display = "flex";

        document.getElementById("image1").src = playersImages[0];
        document.getElementById("image2").src = playersImages[1];
        document.getElementById("image3").src = playersImages[2];
        document.getElementById("image4").remove();
      } else {
        const questionsDiv = document.getElementById("parentIntro");
        questionsDiv.style.display = "flex";

        document.getElementById("image1").src = parentsImages[0];
        document.getElementById("image2").src = parentsImages[1];
        document.getElementById("image3").src = parentsImages[2];
        document.getElementById("image4").src = parentsImages[3];
      }
    } else {
      document.getElementById("error-message-two").style.display = "block";
      return;
    }
  }

  // Assign event listeners
  document.getElementById("first-next-button").onclick = moveToSecondSec;
  document.getElementById("second-next-button").onclick = moveToThirdSec;
  document.getElementById("player-start-button").onclick = startPlayerSurvey;
  document.getElementById("parent-start-button").onclick = startParentSurvey;
  document.getElementById("start-btn").addEventListener("click", function () {
    document.getElementById("home-banner").style.display = "none";
    document.getElementById("userInfo").style.display = "flex";
    document.getElementById("qc").classList.remove("home-bg");
    document.getElementById("qcc").classList.remove("primary");
  });

  // init swiper
  swiperInit();
})();

window.addEventListener("beforeunload", function () {
  sessionStorage.removeItem("testType");
});
