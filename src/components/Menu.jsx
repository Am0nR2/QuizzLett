import React from "react"
import {useState} from "react"
export default function({startQuiz, categories, getSettings, settings}){
    // States
   const [isSettings, setIsSettings] =  useState(false)

    // API CALLS
    
    
    // MAPPING AREA
    if(categories.length){

        var optionElements = categories.map(category => {
            return <option key = {category.id} value={category.id}>{category.name}</option>
        })
    }

    // Functions
   const openSettings = ()=> {
    setIsSettings(prevState=>!prevState)
   }

    return(
    <div>
        {
        isSettings && 
        <div className="settings">
            <h2>Settings</h2>
          
                
            <select 
            name="category" 
            id="category"
            value={settings.category}
            onChange={(e)=>getSettings(e)}
            >
                {optionElements}
            </select>
            <div className="difficulty">
                

                    <input  onChange={(e)=>getSettings(e)} type="radio" name="difficulty" id="easy" value="easy" checked={settings.difficulty === "easy"} />
                    <label htmlFor="easy">Easy</label>

                    <input  onChange={(e)=>getSettings(e)} type="radio" name="difficulty" id="medium" value="medium" checked={settings.difficulty === "medium"} />
                    <label htmlFor="medium">Medium</label>

                    <input  onChange={(e)=>getSettings(e)} type="radio" name="difficulty" id="hard" value="hard" checked={settings.difficulty === "hard"}/>
                    <label htmlFor="hard">Hard</label>
               
            </div>
           
                
        </div>
        }
        
        <i onClick={openSettings} className="settings--icon fa-solid fa-gear"></i>   
        
        <div className="welcome--menu">
            <h1>QuizzLett</h1>
            <h3>Test Your Skills & Knowledge...</h3>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    
    </div>            
    )
}