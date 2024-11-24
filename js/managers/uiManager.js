import triviaService from '../services/triviaService.js';

class UIManager {
    constructor() {
        this.setupScreen = document.querySelector('.setup-screen');
        this.quizScreen = document.querySelector('.quiz-screen');
        this.resultsScreen = document.querySelector('.results-screen');
        this.questionElement = document.querySelector('.question');
        this.optionsElement = document.querySelector('.options');
        this.progressElement = document.querySelector('.progress');
    }

    showSetupScreen() {
        this.setupScreen.style.display = 'flex';
        this.quizScreen.style.display = 'none';
        this.resultsScreen.style.display = 'none';
        this.progressElement.style.width = '0%';
    }

    showQuizScreen() {
        this.setupScreen.style.display = 'none';
        this.quizScreen.style.display = 'block';
        this.resultsScreen.style.display = 'none';
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