import triviaService from '../services/triviaService.js';

class UIManager {
    constructor() {
        this.setupScreen = document.querySelector('.setup-screen');
        this.quizScreen = document.querySelector('.quiz-screen');
        this.resultsScreen = document.querySelector('.results-screen');
        this.questionElement = document.querySelector('.question');
        this.optionsElement = document.querySelector('.options');
        this.progressElement = document.querySelector('.progress');

        // Update selectors to match your HTML classes
        this.categorySelect = document.querySelector('.category-select');
        this.difficultySelect = document.querySelector('.difficulty-select');
        this.startButton = document.querySelector('.start-btn');
        this.errorMessage = document.createElement('div');
        this.initializeErrorMessage();
    }

    initializeErrorMessage() {
        this.errorMessage.className = 'error-message';
        this.errorMessage.style.cssText = `
            color: red;
            margin-top: 10px;
            display: none;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
        `;
        this.startButton.parentNode.insertBefore(this.errorMessage, this.startButton.nextSibling);
    }

    validateSelections() {
        const category = this.categorySelect.value;
        const difficulty = this.difficultySelect.value;

        if (!category || !difficulty) {
            this.showError('Please select both category and difficulty before starting the quiz.');
            return false;
        }

        this.hideError();
        return true;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';

        // Add visual feedback to dropdowns
        if (!this.categorySelect.value) {
            this.categorySelect.style.borderColor = 'red';
            this.categorySelect.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
        }
        if (!this.difficultySelect.value) {
            this.difficultySelect.style.borderColor = 'red';
            this.difficultySelect.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
        }
    }

    hideError() {
        this.errorMessage.style.display = 'none';
        this.categorySelect.style.borderColor = '';
        this.categorySelect.style.boxShadow = '';
        this.difficultySelect.style.borderColor = '';
        this.difficultySelect.style.boxShadow = '';
    }

    showSetupScreen() {
        this.setupScreen.style.display = 'flex';
        this.quizScreen.style.display = 'none';
        this.resultsScreen.style.display = 'none';
        this.progressElement.style.width = '0%';
        this.hideError(); // Reset error state when returning to setup
    }

    showQuizScreen() {
        if (!this.validateSelections()) {
            return false;
        }
        this.setupScreen.style.display = 'none';
        this.quizScreen.style.display = 'block';
        this.resultsScreen.style.display = 'none';
        return true;
    }

    showResultsScreen(results) {
        this.quizScreen.style.display = 'none';
        this.resultsScreen.style.display = 'block';

        document.querySelector('.score').textContent = `Score: ${results.score}/${results.totalQuestions}`;
        document.querySelector('.total-questions').textContent = results.totalQuestions;
        document.querySelector('.correct-answers').textContent = results.score;
        document.querySelector('.accuracy').textContent = `${results.accuracy}%`;
    }

    displayQuestion(question) {
        this.questionElement.innerHTML = triviaService.decodeHTML(question.question);

        const options = [...question.incorrect_answers, question.correct_answer]
            .sort(() => Math.random() - 0.5);

        this.optionsElement.innerHTML = options
            .map(option => `<div class="option">${triviaService.decodeHTML(option)}</div>`)
            .join('');
    }

    updateProgress(progress) {
        this.progressElement.style.width = `${progress}%`;
    }

    showAnswerFeedback(selectedOption, isCorrect, correctAnswer) {
        const options = this.optionsElement.querySelectorAll('.option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            if (option.textContent === triviaService.decodeHTML(correctAnswer)) {
                option.classList.add('correct');
            } else if (option === selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    }
}

export default new UIManager();