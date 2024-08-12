import { questions, adultQuestions } from "./data.js";
import { Survey, Wizard } from "./model.js";
import { swiperInit } from "./swiper.js";

var x = window.matchMedia("(max-width: 600px)");

const playersImages = x.matches
  ? [
      "./assets/images/mobile/players/1.png",
      "./assets/images/mobile/players/2.png",
      "./assets/images/mobile/players/3.png",
    ]
  : [
      "./assets/images/players/slide-one.jpg",
      "./assets/images/players/slide-two.jpg",
      "./assets/images/players/slide-three.jpg",
    ];

const parentsImages = x.matches
  ? [
      "./assets/images/mobile/parents/1.png",
      "./assets/images/mobile/parents/2.png",
      "./assets/images/mobile/parents/3.png",
      "./assets/images/mobile/parents/4.png",
    ]
  : [
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

        // Remove the 4th slide entirely
        const slide4 = document.getElementById("image4")?.closest(".swiper-slide");
        if (slide4) slide4.remove();

        // init swiper
        swiperInit();
      } else {
        const questionsDiv = document.getElementById("parentIntro");
        questionsDiv.style.display = "flex";

        document.getElementById("image1").src = parentsImages[0];
        document.getElementById("image2").src = parentsImages[1];
        document.getElementById("image3").src = parentsImages[2];
        document.getElementById("image4").src = parentsImages[3];

        // init swiper
        swiperInit();
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
})();

window.addEventListener("beforeunload", function () {
  sessionStorage.removeItem("testType");
});
