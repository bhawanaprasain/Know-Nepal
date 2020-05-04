import React from "react"
import "../styles/home.css"
import {Link, BrowserRouter as Router } from "react-router-dom"


const Home =()=>{
    return(

        <Router>
            <div id="home">

                <div className="heading">
                    <h1>Know Nepal</h1>
                </div>
                <div className="description">
                    <p>Take part in the quiz to know about Nepal  </p>
                </div>
                <div className="play">
                    <ul>
                        <li>
                            <Link to="playnow/instruction"><button>Play now</button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Router>
    )
}

export default Home