import React from "react"
import {Link} from "react-router-dom"
import "../../styles/quizinstructions.css"

const QuizInstructions =()=>{

    return (
      <div>
        <div className="instructions bg-light p-3 text-center boxshadow">
          <h1>Read these instructions before playing quiz</h1>
          <ul>
            <li>You will have 30 seconds for quiz</li>
            <li>15 questions are available</li>
            <li>You will get 2 options for fifty-fifty help</li>
            <li>You will get 5 hints</li>
          </ul>
          <div className="optionbtns">
            <Link to="/">
              <button className="btn btn-dark"> Back </button>
            </Link>
            <Link to="/play">
              {" "}
              <button className="btn btn-dark">Lets Play</button>
            </Link>
          </div>
        </div>
      </div>
    );
}


export default QuizInstructions