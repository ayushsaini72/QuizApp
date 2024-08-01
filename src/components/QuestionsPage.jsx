import React from "react";
import Questions from "./Questions";
import he from 'he';
import { useState } from "react";

function QuestionsPage({
        allData,
        setAllData, 
        fetchData, 
        checkAnswers, 
        setCheckAnswers, 
        numQuestions,
        rightAnsweredCount, 
        setRightAnsweredCount 
    }) {
    const questionsElement = allData.map((question, i) => {
        return (
            <Questions
                question={question.question}
                correctAns={question.correct_answer}
                allAns={question.allAns}
                handleClick={handleClick}
                i={i}
                checkAnswers={checkAnswers}
            />
        )
    })

    function handleClick(answer, i) {
        if(checkAnswers) {
            return
        }
        setAllData(prev => prev.map((quesObj, index) => {
            if(index === i) {
                return {...quesObj, allAns: quesObj.allAns.map(ans => {
                    if(ans.value === answer.value) {
                        return {...ans, isHeld: !ans.isHeld}
                    } else {
                        
                        return {...ans, isHeld: false}
                    }
                })}
            } else {
                return quesObj
            }
        }))
    }

    function showResult() {
        setCheckAnswers(true)
        allData.map(item => {
            item.allAns.map(ans => {
                if(ans.isHeld && ans.isTrue) {
                    setRightAnsweredCount(prev => prev + 1)
                }
            })
        })
        console.log(rightAnsweredCount)
    }

    return(
        <main className="quiz-container">
            <div className="quiz-list">
                {questionsElement}
                <div className="submit-btn-container">
                {checkAnswers ? 
                        <p className="right-answers">You have correctly answered {rightAnsweredCount}/{numQuestions} question</p>
                    : ""
                }
                    <button type="submit" className="submit-btn" onClick={checkAnswers ? () => fetchData() :() => showResult()}>{checkAnswers ? "New Game" : "Check Answers"}</button>
                </div>
            </div>
        </main>
    )
}

export default QuestionsPage;