import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// categories: mythology is 20,science and nature is 17, science computers is 18, science math is 19,
function Homepage({ onSubmit, setOutputURL }) {
    const [quizForm, setQuizForm] = useState({
        name: '',
        category: '',
        difficulty: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const outputURL = `https://opentdb.com/api.php?amount=10&category=${quizForm.category}&difficulty=${quizForm.difficulty}&type=multiple`;
        onSubmit?.({ name: quizForm.name, outputURL});
        setQuizForm({ name: '', category: '', difficulty: '' })
        displayQuestions();
    };

    return (
        <form onSubmit={handleSubmit} className='card'>
            <input
                type='text'
                placeholder='Enter Your Name.'
                value={quizForm.name}
                onChange={e => setQuizForm({ ...quizForm, name: e.target.value })}
                required
            />
            <select
                value={quizForm.category}
                onChange={e => setQuizForm({ ...quizForm, category: e.target.value })}
                required
            >
                <option value="">Choose a Category</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Math</option>
                <option value="20">Mythology</option>
            </select>

            <select
                value={quizForm.difficulty}
                onChange={e => setQuizForm({ ...quizForm, difficulty: e.target.value })}
                required
            >
                <option value="">Choose a Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button type='submit'>Start Quiz</button>
        </form>
    )
}

export default Homepage;
