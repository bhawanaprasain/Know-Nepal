import React , {Component, Fragment} from "react"
import questions from "../../questions"
import isEmpty from "../../utils/isempty";

import buttonSound from "../../assets/audios/button.wav";
import correctNotification from "../../assets/audios/correct_answer.wav";
import wrongNotification from "../../assets/audios/wrong_answer.wav";

import "../../styles/play.css"

class Play extends Component{
    constructor(props){
        super(props);
        this.state={
            questions ,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: " ",
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex:0,
            score:0,
            correctAnswers:0,
            wrongAnswers:0,
            hints:5,
            fiftyFifty:2,
            usedFifty:false,
            previousRandomNumbers:[],
            time:{},
            nextButtonDisabled: false,
            previousButtonDisabled: true

        }
        this.interval= null
    }

    componentDidMount(){
        const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion)
        this.startTimer()
    }

    componentWillUnmount(){ 
        clearInterval(this.interval)
    }
    displayQuestions=(questions= this.state.questions, currentQuestion, nextQuestion,previousQuestion)=>{

        let {currentQuestionIndex} = this.state
        if(!isEmpty(this.state.questions)){
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex]
            nextQuestion = questions[currentQuestionIndex+1]
            previousQuestion = questions[currentQuestionIndex-1]
            const answer = currentQuestion.answer
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            },()=>{
                this.showOptions()
                this.handleDisableButton()
            })
        }
    }

    handleOptionClick =(e)=>{
    if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
        setTimeout(()=>{
            document.getElementById("correct-sound").play()

        },500)
        this.correctAnswer()
    }
    else{
        setTimeout(()=>{
            document.getElementById("wrong-sound").play()

        },500)
        this.wrongAnswer()
    }
        
    }

    handleNextButtonClick = ()=>{
        if(this.state.nextQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex+1
            }), ()=>{
                this.displayQuestions(this.state.questions, this.state.currentQuestion,this.state.nextQuestion, this.state.previousQuestion)
            })
        }
    }

    handlePreviousButtonClick = ()=>{
        if(this.state.previousQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex-1
            }), ()=>{
                this.displayQuestions(this.state.questions, this.state.prevoiusQuestion,this.state.nextQuestion, this.state.previousQuestion)
            })
        }
    }

    handleQuitButtonClick= ()=>{
        if(window.confirm("are you sure you want to quit")){
            this.props.history.push("/")
        }
    }
    handleButtonClick =(e)=>{
        document.getElementById("button-sound").play()
        switch(e.target.id){
            case("next-button"):
                this.handleNextButtonClick()
                break
            case("previous-button"):
                this.handlePreviousButtonClick()
                break
            case("quit-button"):
                this.handleQuitButtonClick()
                break    
            default:
                break
            }
        


    }

    correctAnswer =()=>{
       
        this.setState(prevState=>({
            score: prevState.score+1,
            correctAnswers: prevState.correctAnswers+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1

        }), ()=>{
            if(this.state.nextQuestion === undefined){
                this.endGame()
            }
            else{

            const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state
            this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion)
            }
        })
    }

    wrongAnswer =()=>{
        

        this.setState(prevState=>({
            wrongAnswers : prevState.wrongAnswers +1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
        }), ()=>{
            if(this.state.nextQuestion === undefined){
                this.endGame()
            }
            else{

            const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state
            this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion)
            }
        })
    }


    showOptions =()=>{
        const options = Array.from(document.querySelectorAll('.option'))

        options.forEach((option)=>{
            option.style.visibility ="visible"
        })
    }
    handleHints =()=>{
        if(this.state.hints> 0){
            const options = Array.from(document.querySelectorAll('.option'))
            let indexOfAnswer
            options.forEach((option,index)=>{
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer= index
                }
            })
    
            while(true){
                const randomNumber = Math.round(Math.random()*3)
                if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                    options.forEach((option, index)=>{
                        if(index===randomNumber){
                            option.style.visibility = "hidden"
                            this.setState((prevState)=>({
                                hints: prevState.hints -1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }))
                        }
                       
                    })
    
                    break;
                }
                if(this.state.previousRandomNumbers.length>=3)
                    break
            }
    
        }
    }

    handleFiftyFifty=()=>{
   
        if (this.state.fiftyFifty > 0 && this.state.usedFifty === false) {
            const options = Array.from(document.querySelectorAll(".option"));
            console.log(options);
            const randomNumbers = [];
            let indexOfAnswer;
            options.forEach((option, index) => {
              if (
                option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
              ) {
                indexOfAnswer = index;
              }
            });
            let count = 0;
            do {
              const randomNumber = Math.round(Math.random() * 3);
              if (randomNumber !== indexOfAnswer) {
                if (
                  randomNumbers.length < 2 &&
                  !randomNumbers.includes(randomNumber) 
                ) {
                  randomNumbers.push(randomNumber);
                  count++;
                } else {
                  while (true) {
                    const newRandomNumber = Math.round(Math.random() * 3);
                    if (
                      !randomNumbers.includes(newRandomNumber) &&
                      !randomNumbers.includes(indexOfAnswer)
                    ) {
                      randomNumbers.push(newRandomNumber);
                      count++;
                      break;
                    }
                  }
                }
              }
            } while (count < 2);
            options.forEach((option, index) => {
              if (randomNumbers.includes(index)) {
                option.style.visibility = "hidden";
              }
            });
            this.setState(prevState => ({
              fiftyFifty: prevState.fiftyFifty - 1,
              usedFiftyFifty: true
            }));
          }
              
    }

    startTimer =()=>{

        const countDownTime = Date.now() +30000;
        this.interval = setInterval(() => {
          const now = new Date();
          const distance = countDownTime - now;
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          if (distance < 0) {
            clearInterval(this.interval);
            this.setState(
              {
                time: {
                  minutes: 0,
                  seconds: 0,
                },
              },
              () => {
                this.endGame();
              }
            );
          } else {
            this.setState({
              time: {
                minutes: minutes,
                seconds: seconds,
              },
            });
          }
        }, 1000);
    }

    endGame = () => {
        const { state } = this;
        const playerStats = {
          score: state.score,
          numberOfQuestions: state.numberOfQuestions,
          numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
          correctAnswers: state.correctAnswers,
          wrongAnswers: state.wrongAnswers,
          fiftyFiftyUsed: 2 - state.fiftyFifty,
          hintsUsed: 5 - state.hints
        };
        console.log(playerStats);
        setTimeout(() => {
          this.props.history.push("/play/quizsummary", playerStats);
        }, 1000);
      };

      handleDisableButton=()=>{
          if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0){

            this.setState({
                previousButtonDisabled:true
            })
          }
          else{
            this.setState({
                previousButtonDisabled:false
            })
          }

          if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex+1 === this.state.questions.length){

            this.setState({
                nextButtonDisabled:true
            })
          }
          else{
            this.setState({
                nextButtonDisabled:false
            })
          }
      }

    render(){
    const {currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty, time} = this.state
    const secondsRadius = mapNumber(time.seconds, 30, 0, 0, 360);
        return (
          //   <div className="bg-light">
          //
          //     <div className="questions">
          //       <div className="lifeline-container">
          //         <div className="left">
          //           <div onClick={this.handleFiftyFifty}>
          //             <button className="fiftybtn" style={{borderRadius: '50%'}}>Click for 50-50 </button>
          //             <span>{fiftyFifty} remaining</span>
          //           </div>
          //           <div>
          //             <span>
          //               {currentQuestionIndex + 1} of {numberOfQuestions} answered
          //             </span>
          //           </div>
          //         </div>
          //         <div className="right">
          //           <div onClick={this.handleHints}>
          //             <button className="hintsbtn"> Click for hints </button>
          //             <span> {hints} remaining </span>
          //           </div>
          //           <div>
          //             Countdown: {time.minutes}:{time.seconds}
          //           </div>
          //         </div>
          //       </div>

          //       <div className="quiz-container">
          //         <h1>{currentQuestion.question}</h1>
          //         <div className="option-container">
          //           <div className="top">
          //             <button onClick={this.handleOptionClick} className="option">
          //               {currentQuestion.optionA}
          //             </button>
          //             <button onClick={this.handleOptionClick} className="option">
          //               {currentQuestion.optionB}
          //             </button>
          //           </div>
          //           <div className="bottom">
          //             <button onClick={this.handleOptionClick} className="option">
          //               {currentQuestion.optionC}
          //             </button>
          //             <button onClick={this.handleOptionClick} className="option">
          //               {currentQuestion.optionD}
          //             </button>
          //           </div>
          //         </div>
          //       </div>

          //       <div className="button-container">
          //         <button id="previous-button" onClick={this.handleButtonClick}>
          //           Previous
          //         </button>
          //         <button id="next-button" onClick={this.handleButtonClick}>
          //           Next
          //         </button>
          //         <button id="quit-button" onClick={this.handleButtonClick}>
          //           Quit
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          <div className="container bg-light p-3">
            <Fragment>
              <audio id="correct-sound" src={correctNotification}></audio>
              <audio id="wrong-sound" src={wrongNotification}></audio>
              <audio id="button-sound" src={buttonSound}></audio>
            </Fragment>
            <div>
                <h1 style={{letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase'}}>Countdown</h1>
                <div className="countdown-wrapper">  
                        <div className="countdown-item">
                            <SVGCircle radius={secondsRadius} />
                            {time.seconds}
                            <span>seconds</span>
                        </div>
                </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
              <span>
               {currentQuestionIndex + 1} of {numberOfQuestions} answered
              </span>
              <h1>{currentQuestion.question}</h1>
              </div>
              <div className="col-6 text-center">
              <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
              </div>
              <div className="col-6 text-center">
              <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
              </div>
              <div className="col-6 text-center">
              <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
              </div>
              <div className="col-6 text-center">
              <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
              </div>
              <div className="col-12 d-flex justify-content-center">
              <button id="previous-button" className="btn btn-dark" onClick={this.handleButtonClick}>
               Previous
             </button>
              <button id="next-button" className="btn btn-dark ml-2" onClick={this.handleButtonClick}>
                 Next
                </button>
                 <button id="quit-button" className="btn btn-dark ml-2" onClick={this.handleButtonClick}>
                   Quit
               </button>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-12">
                <hr style={{backgroundColor: '#2f3640'}}/>
                <h3 className="text-center">LifeLines</h3>
              </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-2">
                  <p className="lifeline" onClick={this.handleFiftyFifty}>50:50
                  <span className="m-1 badge badge-light">{fiftyFifty}</span></p>
              </div>
              <div className="col-2 special">
                  <p className="lifeline" onClick={this.handleHints}>Hints
                  <span className="m-1 badge badge-light">{hints}</span>
                  </p> 
              </div>
            </div>
          </div>
        );
    }
}

// svg editing
const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
      <path
          fill="none"
          stroke="#333"
          strokeWidth="4"
          d={describeArc(50, 50, 48, 0, radius)}
      />
  </svg>
);

// helper function
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
  ].join(' ');

  return d;
}


function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}


export default Play