import React, {useState, useEffect} from 'react';
import TinderCard from "react-tinder-card";
import {Button} from "@vkontakte/vkui";


const QuestionCard = React.forwardRef(({achievementGet, currentIndex, questionSwiped, questionIndex, questionItem}, ref) => {
    const adsOrQuestion = (questionItem.type === "ads" ? "ads-card" : "question-card")
    const activeClass = (currentIndex === questionIndex) ? (adsOrQuestion + " active-question") : (adsOrQuestion + " question-card")

    return (
        <TinderCard
            ref={ref}
            preventSwipe={["up", "down"]}
            onSwipe={(e) => {
                questionSwiped(questionIndex, e)
            }}
            className={activeClass}
        >
            <div className="text-center question-index">Вопрос {questionIndex} из 20</div>
            <div className="text-center question-text">
                <div className="question-text-box">
                    {questionItem.text}
                </div>
                {
                    questionItem.type === "ads" &&
                    <Button href={questionItem.link} target="_blank" onclick={() => {achievementGet(4)}} style={{marginTop: 20, border: "solid 2px white", color: "white!important"}}>
                        {questionItem.action}
                    </Button>
                }
            </div>
        </TinderCard>
    )
})

export default QuestionCard;
