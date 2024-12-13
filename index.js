const API_TOKEN = 'hUmyCuBGF4tizVOXsdL4q48rBcDnxrQrAW5wVcOw'
const API = 'https://quizapi.io/api/v1'

const startQuizBtn = document.querySelector("#startQuizBtn");
const initalSetUp = document.querySelector("#inital-setup");
const quizContent = document.querySelector("#quiz-content");
const answersContainer = document.querySelector("#answers-container")
const explanation = document.querySelector("#explanation")
let scoreValue = document.querySelector("#scoreValue");

let score = 0;
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

function displayQuiz(quizData) {

    const { restartButton, nextButton } = singleQuizQuestion(quizData);

    restartButton.addEventListener("click", () => restartBtn())
    nextButton.addEventListener("click", () => fecthQuiz(difficulty, category));
};

function updateScore(restart) {
    if (restart === 0) {
        score = 0;
        scoreValue.textContent = score;
    } else {

        score += 10;
        scoreValue.textContent = score;
    }
}

function singleQuizQuestion(quiz) {
    console.log(quiz);

    initalSetUp.classList.add("hidden")
    quizContent.classList.remove("hidden")

    const quizTitle = document.querySelector("#quizTitle");
    quizTitle.textContent = quiz[0].tags[0].name;

    const mcqOrmsq = document.querySelector("#mcqOrmsq");

    if (quiz[0].multiple_correct_answers === true) {
        mcqOrmsq.textContent = `Multiple Select Question`;
    } else {
        mcqOrmsq.textContent = `Multiple Choice Question`;
    }

    const question = document.querySelector("#question");
    question.textContent = `Question - ${quiz[0].question}`;

    const description = document.querySelector("#description");
    if (quiz[0].description != null) {
        description.textContent = `Description - ${quiz[0].description}`;
    }

    const restartNextButtons = document.querySelector("#restart-next-buttons");
    restartNextButtons.classList.remove("hidden");

    const restartButton = document.querySelector("#restartButton");
    const nextButton = document.querySelector("#nextButton")

    answersContainer.innerHTML = ''; // Clears previous answers

    const answerOptions = quiz[0].answers;

    const correctAnswers = quiz[0].correct_answers;
    // console.log(correctAnswers);

    let rightAnswer = '';
    const rightAnswers = [];

    for (let answer in correctAnswers) {

        // if MSQ so correct answer > 1 , store in arr
        if (quiz[0].multiple_correct_answers === "true") {

            if (correctAnswers[answer] === "true") {
                rightAnswers.push(answer);
            }

            // In MCQ only 1 ans is correct so store it
        } else {
            if (correctAnswers[answer] === "true") {
                rightAnswer = answer;
                break;
            }
        }
    }
    // console.log(rightAnswer);

    const explanationOfAnswer = quiz[0].explanation;
    console.log(explanationOfAnswer);


    for (let answerText in answerOptions) {
        if (answerOptions[answerText] != null) {
            const option = document.createElement("button");
            option.classList.add("w-full", "bg-blue-500", "text-white", "py-2", "rounded", "hover:bg-blue-600", "focus:outline-none");
            option.textContent = answerOptions[answerText];

            let isAnswered = false;

            option.addEventListener('click', () => {
                if (isAnswered) return;

                isAnswered = true;

                console.log(answerText);

                if (quiz[0].multiple_correct_answers === "false") {
                    let ans = rightAnswer.slice(0, 8);
                    console.log(ans);
                    if (answerText === ans) {
                        option.classList.add("bg-green-700")
                        // console.log(`Ans selected: ${answerText}`);
                        updateScore();
                    } else {
                        if (explanationOfAnswer != null) {
                            const explanationText = document.createElement("p");
                            explanationText.textContent = explanationOfAnswer;
                            explanation.appendChild(explanationText)

                            explanation.classList.toggle("hidden");
                        }

                        option.classList.add("bg-red-800")
                    }
                }

                disableOtherOptions();
            })

            answersContainer.appendChild(option);
        }
    }

    restartNextButtons.appendChild(restartButton);
    restartNextButtons.appendChild(nextButton);

    quizContent.appendChild(quizTitle);
    quizContent.appendChild(mcqOrmsq);
    quizContent.appendChild(question);
    quizContent.appendChild(description);
    quizContent.appendChild(explanation);
    quizContent.appendChild(answersContainer)
    quizContent.appendChild(restartNextButtons);

    return { restartButton, nextButton };
}


function nextBtn() {
    console.log("btn cliclks");
    fecthQuiz(difficulty, category)
}

function restartBtn() {
    updateScore(0);
    initalSetUp.classList.remove("hidden")
    quizContent.classList.add("hidden")
}

function disableOtherOptions() {
    const buttons = answersContainer.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.disabled = true;
    })
}

// function displayQuiz(quizData) {

//     const { restartButton, nextButton } = singleQuizQuestion(quizData);

//     restartButton.addEventListener("click", () => restartBtn())
//     nextButton.addEventListener("click", () => fecthQuiz(difficulty, category));
// };


startQuizBtn.addEventListener('click', () => {
    difficulty = document.querySelector("#difficulty").value;
    category = document.querySelector("#category").value;
    console.log(difficulty);
    console.log(category);

    fecthQuiz(difficulty, category);
})