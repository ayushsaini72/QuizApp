import { useState } from 'react'
import Questions from "./components/Questions"
import QuestionsPage from './components/QuestionsPage';
import StartPage from './components/StartPage'
import "./index.css"
import blobbottom from "./assets/blob1.png"
import blobtop from "./assets/blob2.png"
import { nanoid } from 'nanoid'
import shuffle from './Utls/shuffle';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [allData, setAllData] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [categoryId, setCategoryId] = useState("");
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [rightAnsweredCount, setRightAnsweredCount] = useState(0);
  
  //fetching data from Api and setting it to state allData
  const fetchData = (event) => {
    !checkAnswers && event.preventDefault();
    fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple&category=${categoryId}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAllData(data.results.map((dta) => {
          return {
            ...dta,
            allAns: shuffle([...dta.incorrect_answers.map(
              wrngAns => {
               return {
                value: wrngAns,
                isHeld: false,
                isTrue: false
              }}
            ),
            {
              value: dta.correct_answer,
              isHeld: false,
              isTrue: true
            }])
          }
        }))
        setStartGame(true)
        setCheckAnswers(false)
        setRightAnsweredCount(0)
      })
  }

  //function to toggle startGame value
  function toggleStart() {
    setStartGame(prev => !prev)
  }

  return (
    <div className="App">
        <img src={blobtop} alt="illustration" className='blob1 blob'/>
        <img src={blobbottom} alt="illustration" className='blob2 blob'/>
        <img src={blobtop} alt="illustration" className='blob3 blob'/>
        <img src={blobbottom} alt="illustration" className='blob4 blob'/>
        {startGame ?
        <QuestionsPage 
            allData={allData}
            setAllData={setAllData}
            fetchData={fetchData}
            checkAnswers={checkAnswers}
            setCheckAnswers={setCheckAnswers}
            numQuestions={numQuestions}
            rightAnsweredCount={rightAnsweredCount}
            setRightAnsweredCount={setRightAnsweredCount}
        />
        :
          <StartPage 
            fetchData={fetchData}
            numQuestions={numQuestions}
            setNumQuestions={setNumQuestions}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        }
    </div>
  )
}

export default App
