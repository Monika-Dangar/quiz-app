# Quiz Application

This is a simple quiz application that fetches quiz questions from an external API, allows users to answer them, and tracks their score. The application currently supports **Multiple Choice Questions (MCQs)**.

## Features

- Fetches quiz questions from an external API.
- Displays the question, description, and possible answers.
- Allows the user to select an answer and displays the correct answer after selection.
- Tracks the user's score.
- Supports **Multiple Choice Questions (MCQs)**.
- Displays an explanation for the answer after the user has selected an option.

## Technologies Used

- **HTML**: For the structure of the webpage.
- **CSS**: For styling the page and making it responsive.
- **JavaScript**: For the functionality of the quiz, including fetching quiz data, handling user interactions, and updating the UI dynamically.
- **API**: [QuizAPI](https://quizapi.io/) for fetching questions and answers.

## Setup

### Getting Started

1. Clone or download the repository to your local machine.
2. Open the project folder in your preferred text editor (e.g., Visual Studio Code).
3. Open the `index.html` file in a web browser.

### API Key

This project uses the [QuizAPI](https://quizapi.io/) to fetch quiz questions. You need to replace the API key in the JavaScript file with your own. To get an API key:

1. Visit [QuizAPI](https://quizapi.io/).
2. Register an account and generate your API key.
3. Replace the `API_TOKEN` variable in the `script.js` file with your API key:

```javascript
const API_TOKEN = 'YOUR_API_KEY';
```

### Running the Application

1. Open the `index.html` file in your browser.
2. Select the difficulty level and category of the quiz.
3. Click "Start Quiz" to begin the quiz.
4. Answer the questions, and the score will update accordingly.
5. Once you finish answering, click "Next" to load the next question or restart the quiz.

## Code Explanation

### Main Functions

- **`fecthQuiz(difficulty, category)`**: Fetches quiz questions from the QuizAPI based on the selected difficulty and category.
- **`renderQuizQuestion(quiz)`**: Displays a quiz question along with possible answers and updates the UI dynamically.
- **`updateScore(restart)`**: Updates the user's score after each correct answer.
- **`disableOtherOptions()`**: Disables all the answer options after a user selects one, ensuring that no further answers can be selected.

### Key Logic

- **Multiple-Choice Questions (MCQ)**: The app supports multiple-choice questions where only one answer is correct.
- **Answer Validation**: When the user selects an answer, the app checks whether the answer is correct and highlights the button with a green or red color.
- **Next Button**: The "Next" button fetches the next question. It ensures only one question is fetched at a time to prevent multiple requests.

## Contributing

Feel free to fork the repository, make changes, and open a pull request. Contributions are welcome!

## Acknowledgments

- Thanks to [QuizAPI](https://quizapi.io/) for providing the quiz questions API.
- Thanks to open-source libraries and resources that helped in building this project.