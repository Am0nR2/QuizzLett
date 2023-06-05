import {useEffect, useState} from "react"
import {decode} from 'html-entities';
import Question from "./Question"
import Loader from "./Loader";

export default function({questions ,settings, setQuestions, startQuiz, loading, setLoading}){
    // State Declorations
    const [userAnswers, setUserAnswers] = useState({
        one: "",
        two: "",
        three: "",
        four: "",
        five: ""
    })
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [isFinished, setIsFinished] = useState(false) 
    const [score, setScore] = useState(0)
    const questionsArr =["one", "two","three", "four","five"]
    const userAnswersArr = Object.values(userAnswers)

    // API DECLORATION
    useEffect(()=> {
        async function getQuestions(){
            setLoading(true)            
            const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`)
            const data = await res.json()
            setQuestions(data.results)
            setCorrectAnswers(data.results.map(question => question.correct_answer))
            setLoading(false)
        }
        getQuestions()

    },[])
    
    // MAPPING FUNCTIONS
    const quizElements = questions.map(question => 
    <Question
        key={decode(question.question)}
        question ={decode(question.question)}
        correctAnswer = {question.correct_answer}
        incorrectAnswers = {question.incorrect_answers}
        getUserAnswers = {(e)=>getUserAnswers(e)}
        questionNumber = {questionsArr.shift()}
        isFinished = {isFinished}
        correctAnswers = {correctAnswers}
        userAnswersArr = {userAnswersArr}
    />
    )

    // GENERAL FUNCTIONS
        function getUserAnswers(e){
            setUserAnswers(prevState=> ({
                ...prevState,
                [e.target.name] : e.target.value
            }))

        }
        function startOrFinish(){
            if(!isFinished){

                for(let i =0; i< correctAnswers.length; i++){
                    if(correctAnswers[i] === userAnswersArr[i]){
                        setScore(prevCount => prevCount + 1)
                    } 
                }
                setIsFinished(true)
            } else {
                startQuiz()
            }
            
        }
    
    return(
        !loading ? 
        <div className="quiz">
            {quizElements}
            <div className="results">
                <button onClick={startOrFinish} className="finish-btn">{isFinished ? "New Quiz" : "Check Answers"}</button>
                <h3>Your Score is {score} / 5</h3>
            </div>
        </div>
        : <Loader/>
    )
}