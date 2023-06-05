import {useEffect,useState} from "react"
import {decode} from "html-entities"
export default function({question, correctAnswer, incorrectAnswers, getUserAnswers,questionNumber, isFinished, correctAnswers,userAnswersArr}){
    const allChoices = [...incorrectAnswers, correctAnswer].flat()
    
    const [choices, setChoices] = useState([])
    
    const getRandomChoice = arr => {
        const randomNumber = Math.floor(Math.random()*arr.length)
        return arr.splice(randomNumber , 1)[0]
    }

    useEffect(()=> 
        {
             setChoices ([
                {choice: getRandomChoice(allChoices)},
                {choice: getRandomChoice(allChoices)},
                {choice: getRandomChoice(allChoices)},
                {choice: getRandomChoice(allChoices)}
             ])
        },[]
        )
        const styles = (value) => {
            return {
                backgroundColor : correctAnswers.includes(value) ? "#94D7A2" : 
                userAnswersArr.includes(value) ? "#F8BCBC"
                : ""
            }
        }

        
    let i = 0
    const labelElements = choices.map(choice =>{
        i++
        return <div key={`${i}id`}>
            <input 
                type="radio"
                value={choice.choice}
                name={questionNumber}
                id={choice.choice}
                
                
            />
            <label style={isFinished ? styles(choice.choice): {}} htmlFor={choice.choice}>{decode(choice.choice)}</label>
        </div>
        })

        console.log(isFinished)
    return(
        <div className="question">
            <h3>{question}</h3>
            <div className="labels">
                <form onChange={getUserAnswers}>
                    {labelElements}
                </form>
            </div>
            
        </div>
    )
}

// .true{
//     background-color: #94D7A2;
//   }
//   .false{
//     background-color: #F8BCBC;
//   }