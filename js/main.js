import quizManager from './managers/quizManager.js';
import uiManager from './managers/uiManager.js';

class Game {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelector('.start-btn').addEventListener('click', async() => {
            if (uiManager.showQuizScreen()) { // Only proceed if validation passes
                const category = uiManager.categorySelect.value;
                const difficulty = uiManager.difficultySelect.value;
                const success = await quizManager.initializeQuiz(category, difficulty);
                if (success) {
                    uiManager.displayQuestion(quizManager.getCurrentQuestion());
                }
            }
        });
        document.querySelector('.restart-btn').addEventListener('click', () => this.restartGame());
        document.querySelector('.options').addEventListener('click', (e) => {
            if (e.target.classList.contains('option')) {
                this.handleAnswer(e.target);
            }
        });
    }

    async startGame() {
        const category = document.querySelector('.category-select').value;
        const difficulty = document.querySelector('.difficulty-select').value;

        const success = await quizManager.initializeQuiz(category, difficulty);
        if (!success) {
            alert('Failed to load questions. Please try again.');
            return;
        }

        uiManager.showQuizScreen();
        this.displayCurrentQuestion();
    }

    displayCurrentQuestion() {
        const question = quizManager.getCurrentQuestion();
        uiManager.displayQuestion(question);
        uiManager.updateProgress(quizManager.getProgress());
    }

    handleAnswer(selectedOption) {
        const result = quizManager.checkAnswer(selectedOption.textContent);
        uiManager.showAnswerFeedback(selectedOption, result.isCorrect, result.correctAnswer);

        setTimeout(() => {
            if (quizManager.moveToNextQuestion()) {
                this.displayCurrentQuestion();
            } else {
                uiManager.showResultsScreen(quizManager.getResults());
            }
        }, 1500);
    }

    restartGame() {
        uiManager.showSetupScreen();
    }
}

// Initialize the game
new Game();