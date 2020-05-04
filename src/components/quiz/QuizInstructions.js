import React from "react"
import {Link} from "react-router-dom"
import "../../styles/quizinstructions.css"

const QuizInstructions =()=>{

    return(
        <div>
           <div className="instructions">
                <h1>Read these instructions before playing quiz</h1>
                <ul>
                    <li>You will have 30 seconds for quiz</li>
                    <li>15 questions are available</li>
                    <li>You will get 2 options for fifty-fifty help</li>
                    <li>You will get 5 hints</li>
                </ul>
                <div className="optionbtns">
                <Link to="/"><button> Back </button></Link>
                <Link to="/play"> <button>Lets Play</button></Link>
           </div>
           </div>
          

            
        </div>
    )
}


export default QuizInstructions