import React from 'react';
import Play from "./components/quiz/Play"
import Home from "./components/Home"
import QuizSummary from "./components/quiz/QuizSummary"
import QuizInstructions from "./components/quiz/QuizInstructions"
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/playnow/instruction" component={QuizInstructions} />
      <Route path="/play" exact component={Play} />
      <Route path="/play/quizsummary" exact component={QuizSummary } />
    </Router>
  );
}

export default App;
