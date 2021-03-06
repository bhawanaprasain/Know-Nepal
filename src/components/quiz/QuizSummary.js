import React, {Component} from "react"
import { Link } from "react-router-dom"
import "../../styles/quizsummary.css"

class QuizSummary extends Component{
    constructor(props){
        super(props)

        this.state={
            score:0,
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            correctAnswers: 0,
            wrongAnswers:0,
            hintsUsed:0,
            fiftyFiftyUsed:0
        }
    }
componentDidMount(){
    const {state} = this.props.location
    if(state){
        this.setState({
            score:(state.score/state.numberOfQuestions)*100,
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            hintsUsed:state.hintsUsed,
            fiftyFiftyUsed:state.fiftyFiftyUsed  })
    }
}
    render(){
        const {state} = this.props.location
        const score = state.score
        let stats ,remark
        if (score<= 30){
            remark ="You need to practise more"
        }
        else if(score<=50 && score >= 31){
            remark="Better luck next time"
        }
        else if(score<=70 && score >= 51){
            remark="You can do better"
        }
        else if(score<=85 && score >= 71){
            remark="You did great"
        }
        else{
            remark="You are an absolute genius"
        }

        if(state !== undefined){
            stats = (
              <div className="stats bg-light boxshadow text-center p-3">
                <h1>QUIZ HAS ENDED</h1>
                <h4>{remark}</h4>
                <p>Score :{this.state.score}</p>
                <p>Total Questions :{this.state.numberOfQuestions}</p>
                <p>
                  Number Of Answered Questions :
                  {this.state.numberOfAnsweredQuestions}
                </p>
                <p>Correct Answers :{this.state.correctAnswers}</p>
                <p>Wrong Answers :{this.state.wrongAnswers}</p>
                <p>Hints Used :{this.state.hintsUsed}</p>
                <p>FiftyFifty Used :{this.state.fiftyFiftyUsed}</p>

                <section className="nextround">
                  <Link to="/">
                    <button className="btn btn-dark m-2">Back to home</button>
                  </Link>
                  <Link to="/play">
                    <button className="btn btn-dark m-2">Play again</button>
                  </Link>
                </section>
              </div>
            );
        }
        else{
            stats = (
              <div className="stats bg-light">
                <h1>No stats available please take quiz</h1>
                <section>
                  <Link to="/">Back to home</Link>
                  <Link to="/play">Play again</Link>
                </section>
              </div>
            );
        }
        return(
            <div>
                {stats}
            </div>
        )
    }
}

export default QuizSummary