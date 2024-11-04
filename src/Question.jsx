import React, { useState } from "react"
import { decode } from "he"
import { nanoid } from 'nanoid'

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [shuffledAnswers, setShuffledAnswers] = useState(
    [...props.incorrectAnswers, props.correctAnswer]
    .sort(() => Math.random() - 0.5)
  )
  function handleAnswerChange(event) {
    setSelectedAnswer(event.target.value)
    props.handleAnswerChange(props.id, event.target.value)
  }

 

    const answersEl = shuffledAnswers.map(answer => {
    const answerId = nanoid()
    const isCorrect = props.showResults && answer === props.correctAnswer
    const isSelected = selectedAnswer === answer
    const isSelectedResuts = props.showResults && selectedAnswer === answer
    const isIncorrect = props.showResults && isSelected && answer !== props.correctAnswer

    const className = isCorrect ? "correct" : isIncorrect ? "incorrect" : isSelected ?  "selected" : isSelectedResuts ? "selectedResult" : props.showResults ?
    "answerResult" : ""

    return (
      <React.Fragment key={answerId}>
        <input
          type="radio"
          name={props.question}
          value={answer}
          id={answerId}
          checked={selectedAnswer === answer}
          onChange={handleAnswerChange}
          disabled={props.showResults}
        />
        <label htmlFor={answerId} className={className}>
          {decode(answer)}
        </label>
      </React.Fragment>
    )
  })

  return (
    <div className="question--main-container">
      <p className="question--title">{decode(props.question)}</p>
      <div className="question--answers-container">{answersEl}</div>
    </div>
  )
}
