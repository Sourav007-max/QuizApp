    import React from 'react'
    import { data } from './data'
    import './style.css'
    import { useState, useEffect } from 'react'

    export default function QuizApp() {
        const [index, setIndex] = useState(0);
        const [score, setScore] = useState(0);
        const [quizFinished, setQuizFinished] = useState(false);
        const [option, setOption] = useState('');
        const [timeLeft, setTimeLeft] = useState(120);

        const correctAnswers = [
            'Option3','Option2','Option1','Option2','Option1',
            'Option1','Option3','Option3', 'Option1','Option2'];

            useEffect(() => {
                const timer = setInterval(() => {
                    setTimeLeft(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setQuizFinished(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            
                return () => clearInterval(timer);
            }, []);

        const handleSelect = (SelectedOption) => {
            setOption(SelectedOption);
        }

        const handleNext = ()=>{
            if (index < data.length - 1) {
                if(correctAnswers[index] === option) {
                    setScore(score + 1)
                }
                setIndex(index + 1);
                setOption('')
            } else {
                setQuizFinished(true);
            }
        };
        
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        if(quizFinished) {
            return (
                <>
                <div className='scorePage'>
                <h1>Quiz Finished...!</h1>
                <h3>Your Score is: {score} out of {data.length}</h3>
                </div>
                </>
            );
        }
            
        return (
            <div className='quiz-container'>
                <h1>Quiz</h1>
                <p className="timer">Time Remaining: {formatTime(timeLeft)}</p>
                <h2>{data[index].Question}</h2>
                <ul>
                    <li className={option === 'Option1' ? 'selected' : ''} 
                    onClick={()=>handleSelect('Option1')}>{data[index].Option1}</li>
                    <li className={option === 'Option2' ? 'selected' : ''}
                    onClick={()=>handleSelect('Option2')}>{data[index].Option2}</li>
                    <li className={option === 'Option3' ? 'selected' : ''}
                    onClick={()=>handleSelect('Option3')}>{data[index].Option3}</li>
                    <li className={option === 'Option4' ? 'selected' : ''}
                    onClick={()=>handleSelect('Option4')}>{data[index].Option4}</li>
                </ul>

                <button onClick={handleNext} disabled={!option}>Next</button>
                <h5>Question {index + 1} of {data.length}</h5>
            </div>

        )
    }