import { useState, useEffect } from 'react'
import Quiz from "./components/Quiz"
import Menu from './components/Menu'
import Loader from "./components/Loader"
function App() {
  // States
  const [quizStarted, setQuizStarted] = useState(false) 
  const [categories, setCategories] = useState("")
  const [settings, setSettings] = useState({difficulty: 'medium', category: '27'})
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  // API CALLS
  useEffect(()=>{
    async function getCategories(){
      setLoading(true)
      const res = await fetch("https://opentdb.com/api_category.php")
      const data = await res.json()
      setCategories(data.trivia_categories)
      setLoading(false)
    }
    getCategories()
  },[])

  // FUNCTIONS
  const startQuiz = () => setQuizStarted(prevState=> !prevState)
  const getSettings = (e) => setSettings(prevState=> ({
    ...prevState,
    [e.target.name] : e.target.value
  })) 

  return (
    <div className='main--seciton'>
      <img className='top--image' src="./blob 5-1.png" />      
      
        {
        quizStarted ?
        <Quiz
         questions={questions}
         settings= {settings}
         setQuestions = {setQuestions}
         startQuiz={startQuiz}
         loading = {loading}
         setLoading = {setLoading}
        ></Quiz> : 
        loading ? <Loader></Loader> :
        <Menu
         startQuiz={startQuiz}
         categories = {categories}
         getSettings = {getSettings}
         settings= {settings}
        ></Menu>
        }

      <img className='bottom--image' src="./blob 5.png" />      

    </div>
  )
}

export default App
