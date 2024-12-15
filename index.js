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

function updateScore(restart) {
    if (restart === 0) {
        score = 0;
        scoreValue.textContent = score;
    } else {

        score += 10;
        scoreValue.textContent = score;
    }
}

let nextButton;

async function fetchQuiz(difficulty, category) {
    try {
        // Disable the next button to prevent multiple clicks during fetch
        if (nextButton) {
            explanation.classList.add("hidden");
            nextButton.disabled = true;
        }

        const response = await fetch(`${API}/questions?apiKey=${API_TOKEN}&limit=1&difficulty=${difficulty}&category=${category}`);
        const quizData = await response.json();
        displayQuiz(quizData);

        // Enable the next button once the new quiz is loaded
        if (nextButton) {
            nextButton.disabled = false;
        }

    } catch (error) {
        console.error(`Error while fetching quiz: ${error}`);
        if (nextButton) {
            nextButton.disabled = false;
        }
    }
}

function displayQuiz(quizData) {
    const { restartButton, nextButton: newNextButton } = renderQuizQuestion(quizData);

    // Remove any previous event listener to prevent multiple fetches
    if (nextButton) {
        nextButton.removeEventListener("click", nextButtonClick);
    }

    // Store the new nextButton reference
    nextButton = newNextButton;

    // Add the event listener for the new nextButton
    nextButton.addEventListener("click", nextButtonClick);

    // Add the event listener for the restart button
    restartButton.addEventListener("click", restartBtn);
}

function nextButtonClick() {
    // Only fetch new question if the button is not disabled
    if (!nextButton.disabled) {
        fetchQuiz(difficulty, category);
    }
}

function restartBtn() {
    updateScore(0);
    initalSetUp.classList.remove("hidden");
    quizContent.classList.add("hidden");

    // Disable next button on restart to prevent accidental fetch
    if (nextButton) {
        nextButton.disabled = true;
    }
}

function renderQuizQuestion(quiz) {
    const quizInfo = quiz[0];
    initalSetUp.classList.add("hidden");
    quizContent.classList.remove("hidden");

    const quizTitle = document.querySelector("#quizTitle");
    quizTitle.textContent = quizInfo.tags[0]?.name || 'No category';

    const mcqOrmsq = document.querySelector("#mcqOrmsq");
    mcqOrmsq.textContent = quizInfo.multiple_correct_answers ? 'Multiple Select Question' : 'Multiple Choice Question';

    const question = document.querySelector("#question");
    question.textContent = `Question - ${quizInfo.question}`;

    const description = document.querySelector("#description");
    description.textContent = quizInfo.description ? `Description - ${quizInfo.description}` : '';

    const restartNextButtons = document.querySelector("#restart-next-buttons");
    restartNextButtons.classList.remove("hidden");

    const restartButton = document.querySelector("#restartButton");
    const nextButton = document.querySelector("#nextButton");

    answersContainer.innerHTML = ''; // Clear previous answers
    const answerOptions = quizInfo.answers; // This is an object
    const correctAnswers = quizInfo.correct_answers;

    let rightAnswers = [];
    if (quizInfo.multiple_correct_answers === true) {
        // Collect all correct answers for MSQ (Multiple Select Question)
        for (let answer in correctAnswers) {
            if (correctAnswers[answer] === "true") {
                const correctAnswer = answer.replace('_correct', '');
                rightAnswers.push(correctAnswer);
            }
        }
    } else {
        // Only one correct answer for MCQ (Multiple Choice Question)
        for (let answer in correctAnswers) {
            if (correctAnswers[answer] === "true") {
                const correctAnswer = answer.replace('_correct', '');
                rightAnswers = [correctAnswer];
                break;
            }
        }
    }

    const explanationOfAnswer = quizInfo.explanation;

    // Iterate over the answer options (Object.entries converts object to an array of [key, value] pairs)
    Object.entries(answerOptions).forEach(([answerKey, answerText]) => {
        if (answerText != null) {
            const option = document.createElement("button");
            option.classList.add("w-full", "bg-blue-500", "text-white", "py-2", "rounded", "hover:bg-blue-600", "focus:outline-none");
            option.textContent = answerText;

            let isAnswered = false;
            option.addEventListener('click', () => {
                if (isAnswered) return;
                isAnswered = true;

                // Check if the selected answer is correct
                const isCorrect = rightAnswers.includes(answerKey);

                if (isCorrect) {
                    option.classList.add("bg-green-700");
                    updateScore();
                } else {
                    option.classList.add("bg-red-800");
                    if (explanationOfAnswer) {
                        const explanationText = document.createElement("p");
                        explanationText.textContent = explanationOfAnswer;
                        explanation.appendChild(explanationText);
                        explanation.classList.remove("hidden");
                    }
                }

                disableOtherOptions();
            });

            answersContainer.appendChild(option);
        }
    });

    restartNextButtons.appendChild(restartButton);
    restartNextButtons.appendChild(nextButton);
    quizContent.appendChild(quizTitle);
    quizContent.appendChild(mcqOrmsq);
    quizContent.appendChild(question);
    quizContent.appendChild(description);
    quizContent.appendChild(explanation);
    quizContent.appendChild(answersContainer);
    quizContent.appendChild(restartNextButtons);

    return { restartButton, nextButton };
}

function disableOtherOptions() {
    const buttons = answersContainer.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

startQuizBtn.addEventListener('click', () => {
    difficulty = document.querySelector("#difficulty").value;
    category = document.querySelector("#category").value;
    fetchQuiz(difficulty, category);
});
