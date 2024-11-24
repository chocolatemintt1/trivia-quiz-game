class TriviaService {
    async fetchQuestions(category, difficulty) {
        let url = 'https://opentdb.com/api.php?amount=10';
        if (category) url += `&category=${category}`;
        if (difficulty) url += `&difficulty=${difficulty}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching questions:', error);
            return [];
        }
    }

    decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
}

export default new TriviaService();