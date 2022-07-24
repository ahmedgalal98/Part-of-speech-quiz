import React from "react";
import "./answer.css";


function Answer({ answers, checkAnswer }) {
  return (
    <>
     
      <ul className="Answers">
        <div className="correct">
         
      
        </div>
        {answers.map((el, idx) => {
          return (
            <>
              <li className="" key={idx} onClick={() => checkAnswer(el)}>
                {el}
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default Answer;
