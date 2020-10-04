import React from "react"
import "../styles/home.css"


const Home =()=>{
    return(
            // <div id="home">

            //     <div className="heading">
            //         <h1>Know Nepal</h1>
            //     </div>
            //     <div className="description">
            //         <p>Take part in the quiz to know about Nepal  </p>
            //     </div>
            //     <div className="play">
            //         <ul>
            //             <a href="/playnow/instruction"><button>Play now</button></a> 
            //         </ul>
            //     </div>
            // </div>
            <div className="container centered">
                <div className="row bg-light p-4 boxshadow">
                    <div className="col-12">
                        <img src={require('../assets/images/home.svg')} height="300" alt="Index page"/>
                    </div>
                    <div className="col-12">
                        <h1 className="mt-2">Know Nepal</h1>
                       <p>Take part in the quiz to know about Nepal</p>
                    <a href="/playnow/instruction"><button className="btn btn-dark">Play Now</button></a>
                    </div>
                </div>
            </div>
    )
}

export default Home