import React from "react";
import he from 'he';

function Questions({allAns, question, handleClick, correctAns, i, checkAnswers}) {
  const answersList = allAns.map(answer => {
    return <span 
                className={`option 
                            ${  
                                checkAnswers ? 
                                    answer.isTrue ? 
                                    "correct" : 
                                    answer.isHeld && !answer.isTrue ? "incorrect noDisplay" : "noDisplay"
                                 :
                                    answer.isHeld ? "selected" : ""
                              }
                          `} 
                onClick={() => handleClick(answer, i)}
            >
              {he.decode(answer.value)}
            </span>
  })
  return (
    <div className="question-container">
        <h1 className="question">{he.decode(question)}</h1>
        <div className="option-container">
          {answersList}
        </div>
        <hr />
    </div>
  );
}

export default Questions;
