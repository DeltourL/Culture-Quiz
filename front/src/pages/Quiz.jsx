/*
TODO
styles
*/

import { useEffect, useState } from "react";
import shuffle from "../components/Shuffle";
import { useParams, useNavigate } from "react-router-dom"

export default function Quiz() {
    const navigate = useNavigate();
    const { category } = useParams();

    const TIMER_IN_SECONDS = 30;
    const DELAY_BEFORE_NEXT_QUESTION_IN_MILLISECONDS = 2000;
    const COLOR_RED = "#FF0000";
    const COLOR_GREEN = "#00FF00";
    const NUMBER_OF_QUESTIONS = 10;

    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [countdownTimer, setCountdownTimer] = useState(TIMER_IN_SECONDS);
    const [score, setScore] = useState(0);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [isOver, setIsOver] = useState(false);

    // fetch questions
    useEffect(() => {
        fetch(`http://localhost:8080/questions/${category}`)
            .then(response => response.json())
            .then(data => {
                // pick questions randomly
                const shuffledQuestions = shuffle(data);
                setQuestions(shuffledQuestions.slice(0, NUMBER_OF_QUESTIONS));
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [category]);

    // set up answers
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

    // update countdown timer
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

    // go to results
    useEffect(() => {
        if (isOver)
            navigate(`/Results/${score}`);
    }, [isOver]);

    // check answer / timeout, move to next question
    function handleAnswer(answer) {
        // prevent from clicking other buttons
        setIsButtonsDisabled(true);

        // correct/wrong answer display
        if (answer !== '') {
            if (answer === questions[questionIndex].correctAnswer) {
                document.getElementById(answer).style.backgroundColor = COLOR_GREEN;
                setScore(score + 1);
            } else {
                document.getElementById(answer).style.backgroundColor = COLOR_RED;
            }
        }

        // small delay before moving to the next question, reset countdown timer
        setTimeout(() => {
            if (questionIndex < NUMBER_OF_QUESTIONS - 1) {
                setQuestionIndex(questionIndex + 1);
                setCountdownTimer(TIMER_IN_SECONDS);
                setIsButtonsDisabled(false);
            } else {
                setIsOver(true);
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
                <ul>
                    {answers.map((answer) =>
                        <li key={answer}>
                            <button
                                key={answer}
                                id={answer}
                                onClick={() => handleAnswer(answer)}
                                disabled={isButtonsDisabled}>
                                {answer}
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
