import React from 'react'
import './progress.css'


function Progress({questionNumber,max}) {
return (
    <>
    <div className="progress">
    <progress value={questionNumber} max={max}/>
    <span>{Math.floor((questionNumber/max)*100)}%</span>
    </div>
    </>
)
}

export default Progress