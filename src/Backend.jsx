import { useState, useEffect, useMemo, useCallback } from 'react';


function Backend({ outputURL, name }) {
    const [quizData, setQuizData] = useState([]);
    const [index, setIndex] = useState(0);
    const [choice, setChoice] = useState('');
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);

    //Fisher-Yates shuffle function
function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const y = Math.floor(Math.random() * (i + 1));
        // switcheroo
        [arr[i], arr[y]] = [arr[y], arr[i]];
    }
    return arr;
}

    function fetchQuiz () {
        console.log("In the fetchQuiz")
        console.log(outputURL, "output URL");
        // if (!outputURL) return;
        console.log("Fetching API...", outputURL);
        fetch(outputURL)
            .then(res => res.json())
            .then(data => {
                console.log("Got API", data.results)
                setQuizData([0, 1])
                console.log("data", quizData)
            })
            // .catch(err => {
            //     console.error("fetch failed", err);
            //     setQuizData({ results: [] });
            // });
    };


        fetchQuiz();
 
       
    

    // if (!quizData || !quizData.results) {
    //     return <div>Loading...</div>
    // }
    // if (quizData.results.length === 0) {
    //     return <div>No questions found. Please try a different category or difficulty.</div>;
    // }
    console.log(quizData);
    const currentQuestion = quizData.results[index];
    
    if (!currentQuestion) {
        return <div>Loading question...</div>;
    }

//     const answerBank = useMemo(() => { 
//         // if (!quizData) return [];
//         return shuffle([
//         ...currentQuestion.incorrect_answers,
//         currentQuestion.correct_answer
//     ]);
// }, [currentQuestion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (choice === currentQuestion.correct_answer) {
            //The score updates only after the next question renders
            setResult(`Correct, ${name}. Score: ${score + 1}`);
            setScore(prevScore => prevScore + 1);
        } else {
            setResult(`Wrong! And you're not just wrong, ${name}. You're stupid. The answer was ${currentQuestion.correct_answer}. Score: ${score}`);
        }
    };

    const handleNext = () => {
        setIndex(index + 1);
        setChoice('');
        setResult(null);
    };

    // const hardReset = () => {
    //     setQuizData();
    //     setIndex(0);
    //     setChoice('');
    //     setResult(null);
    //     setScore(0);
    //     fetchQuiz();

    // };

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div>
            <h2>{decodeHtml(currentQuestion.question)}</h2>
            <form onSubmit={handleSubmit}>
                {answerBank.map((answer, idx) => (
                    <label key={idx}>
                        <input
                            type='radio'
                            name='answer'
                            value={answer}
                            checked={choice === answer}
                            onChange={() => setChoice(answer)}
                            disabled={!!result} //prevents changing answer after submission
                            required
                        />
                        {decodeHtml(answer)}
                    </label>
                ))}
                <button type='submit' disabled={!!result}>Submit</button>
            </form>
            {result && <div>{result}</div>}
            {result && index < quizData.results.length - 1 && (<button onClick={handleNext}>Next Question</button>)}
            {/* {result && index === quizData.results.length - 1 && (<button onClick={handleNext}>Finish Quiz</button>)} */}
            {result && index === quizData.results.length - 1 && (<button onClick={hardReset}>You've completed the quiz with a score of {choice === currentQuestion.correct_answer ? score + 1 : score}/10. Click here to try again. </button>)}
        </div>
    );
}

export default Backend;