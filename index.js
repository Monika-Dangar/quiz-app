const API_TOKEN = 'hUmyCuBGF4tizVOXsdL4q48rBcDnxrQrAW5wVcOw'
const API = 'https://quizapi.io/api/v1'

const startQuizBtn = document.querySelector("#startQuizBtn");
const initalSetUp = document.querySelector("#inital-setup");
const quizContent = document.querySelector("#quiz-content")

// Global variables to store category and difficulty
let difficulty, category;

async function fecthQuiz(difficulty, category) {

    try {
        const quiz = await fetch(`${API}/questions?apiKey=${API_TOKEN}&limit=1&difficulty=${difficulty}&category=${category}`)
        const quizData = await quiz.json()
        displayQuiz(quizData);

    } catch (error) {
        console.log(`Error while fetching quiz: ${error}`);
        return;
    }
}

function singleQuizQuestion(quiz) {
    console.log(quiz);

    initalSetUp.classList.add("hidden")
    quizContent.classList.remove("hidden")

    const quizTitle = document.querySelector("h1");
    quizTitle.textContent = quiz.tags[0].name;
    console.log(quizTitle);

    const question = document.querySelector("#question");
    question.textContent = quiz.question;

    const restartNextButtons = document.querySelector("#restart-next-buttons");
    restartNextButtons.classList.remove("hidden");

    const restartButton = document.querySelector("#restartButton");
    const nextButton = document.querySelector("#nextButton")

    const answersContainer = document.querySelector("#answers-container")
    answersContainer.innerHTML = ''; // Clears previous answers

    const answerOptions = document.querySelector("#answer-option");

    for (let ans in quiz.answers) {
        const answerText = quiz.answers[ans];

        if (answerText != null) {
            const option = answerOptions.cloneNode(true);
            option.textContent = answerText;
            answersContainer.appendChild(option);
            // console.log(quiz.answers[ans]);
        }
    }

    restartNextButtons.appendChild(restartButton);
    restartNextButtons.appendChild(nextButton);

    quizContent.appendChild(quizTitle);
    quizContent.appendChild(question);
    quizContent.appendChild(answersContainer)
    quizContent.appendChild(restartNextButtons);

    return { restartButton, nextButton };
}

function nextBtn() {
    fecthQuiz(difficulty, category)
}

function restartBtn() {
    initalSetUp.classList.remove("hidden")
    quizContent.classList.add("hidden")
}

function displayQuiz(quizData) {

    const { restartButton, nextButton } = singleQuizQuestion(quizData);

    restartButton.addEventListener("click", () => restartBtn())
    nextButton.addEventListener("click", () => nextBtn());
};


startQuizBtn.addEventListener('click', () => {
    difficulty = document.querySelector("#difficulty").value;
    category = document.querySelector("#category").value;
    console.log(difficulty);
    console.log(category);

    fecthQuiz(difficulty, category);
})