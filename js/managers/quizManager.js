import triviaService from '../services/triviaService.js';

class QuizManager {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
    }

    async initializeQuiz(category, difficulty) {
        this.questions = await triviaService.fetchQuestions(category, difficulty);
        this.currentQuestion = 0;
        this.score = 0;
        return this.questions.length > 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestion];
    }

    checkAnswer(selectedAnswer) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = selectedAnswer === triviaService.decodeHTML(currentQuestion.correct_answer);
        if (isCorrect) this.score++;
        return {
            isCorrect,
            correctAnswer: currentQuestion.correct_answer
        };
    }

    moveToNextQuestion() {
        this.currentQuestion++;
        return this.currentQuestion < this.questions.length;
    }

    getProgress() {
        return ((this.currentQuestion + 1) / this.questions.length) * 100;
    }

    getResults() {
        return {
            score: this.score,
            totalQuestions: this.questions.length,
            accuracy: ((this.score / this.questions.length) * 100).toFixed(1)
        };
    }
}

export default new QuizManager();