/*
TODO
timeout message ?
keep track of score
display result
*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function Quiz() {
    const { category } = useParams()

    const TIMER_IN_SECONDS = 30;
    const DELAY_BEFORE_NEXT_QUESTION_IN_MILLISECONDS = 2000;
    const COLOR_RED = "#FF0000";
    const COLOR_GREEN = "#00FF00";

    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [countdownTimer, setCountdownTimer] = useState(TIMER_IN_SECONDS);
    const [score, setScore] = useState(0);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${category}`)
            .then(response => response.json())
            .then(data => {
                // pick 10 questions randomly
                const shuffledQuestions = shuffle(data);
                setQuestions(shuffledQuestions.slice(0, 10));
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [category]);


    useEffect(() => {
        if (questions.length <= 0)
            return;

        const currentQuestion = questions[questionIndex];

        // pick 3 random wrong answers
        let wrongAnswers = currentQuestion.wrongAnswers;
        wrongAnswers = shuffle(wrongAnswers);
        wrongAnswers = wrongAnswers.slice(0, 3);

        // get the correct answer
        const correctAnswer = currentQuestion.correctAnswer;

        // merge together & shuffle
        const answers = [correctAnswer, ...wrongAnswers];
        const shuffledAnswers = shuffle(answers);
        setAnswers(shuffledAnswers)
    }, [questionIndex, questions]);

    useEffect(() => {
        if (questions.length <= 0)
            return;

        const timer = setInterval(() => {
            if (countdownTimer <= 0) {
                clearInterval(timer);
                handleAnswer('');
            } else {
                setCountdownTimer(countdownTimer - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [countdownTimer, answers]);

    function handleAnswer(answer) {
        // prevent from clicking other buttons
        setButtonsDisabled(true);

        // correct/wrong answer display
        if (answer !== '') {
            if (answer === questions[questionIndex].correctAnswer) {
                document.getElementById(answer).style.backgroundColor = COLOR_GREEN;
                setScore(score + 1);
            } else {
                document.getElementById(answer).style.backgroundColor = COLOR_RED;
            }
        }

        setTimeout(() => {
            if (questionIndex < 9) {
                setQuestionIndex(questionIndex + 1);
                setCountdownTimer(TIMER_IN_SECONDS);
                setButtonsDisabled(false);
            } else {
                // TODO results
                console.log("results");
            }
        }, DELAY_BEFORE_NEXT_QUESTION_IN_MILLISECONDS);
    }

    if (questions.length === 0)
        return <div>Loading...</div>;

    return (
        <div>
            <div className="timer">
                <h2>{countdownTimer}</h2>
            </div>
            <div className="question">
                <h3>{questions[questionIndex].text}</h3>
            </div>
            <div className="answers">
                {answers.map((answer) =>
                    <button
                        key={answer}
                        id={answer}
                        onClick={() => handleAnswer(answer)}
                        disabled={buttonsDisabled}>
                        {answer}
                    </button>
                )}
            </div>
        </div>
    );
}

function shuffle(array) {
    const newArray = Array.from(array);
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}