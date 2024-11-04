import { useState, useEffect } from 'react'
import Question from "./Question"
import { nanoid } from 'nanoid'
import './App.css'

const apiKey = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch(apiKey)
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(q => ({
        ...q,
        id: nanoid()
      }))))
  }, [])

  function handleAnswerChange(questionId, answer) {
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }))
  }

  function checkAnswers() {
    let correctAnswersCount = 0
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct_answer) {
        correctAnswersCount += 1
      }
    })
    setScore(correctAnswersCount)
    setShowResults(true)
  }

  function resetQuiz() {
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
    setHasStarted(false)
  }

  function getQuestions() {
    return questions.map(question => (
      <Question
        key={question.id}
        id={question.id}
        question={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        handleAnswerChange={handleAnswerChange}
        showResults={showResults}
      />
    ))
  }


  return (
    <div>
      {
        !hasStarted ?
          <div>
            <h1>Quizzical</h1>
            <button onClick={() => setHasStarted(true)}>Start Quiz</button>
          </div>
          :
          <>
            {getQuestions()}
            <div className={showResults ? "app--results-container" : "app--button-container"}>
              {showResults && <p className='app--score'>You scored {score}/{questions.length} correct answers</p>}
              <button onClick={showResults ? resetQuiz : checkAnswers} className='app--check-btn'>
              {showResults ? "Play again" : "Check answers"}
            </button>
            </div>
          </>
      }
    </div>
  )
}

export default App
