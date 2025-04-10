import React, { useState } from 'react';
import starEmpty from './assets/star-empty.png'
import starFull from './assets/star-full.png'
import starFocus from './assets/star-focus.png'
import starCharges from './assets/star-charges.png'
import './App.css'

function Star ({ type }) {
  const  [isFull, setIsFull] = useState(true)

  let image = starFull

  const toggleStar = () => {
    setIsFull(!isFull)
  }

  if (type === "focus") image = starFocus
  else if (type === "staff") image = starCharges

  return (
    <>
      <div className="star-wrapper">
        <img
          className="star"
          src={ !isFull ? starEmpty : image }
          alt={ type }
          onClick={ toggleStar }
        />
      </div>
    </>
  )
}

function SpellRange({ name, slots, type }) {

  let colors = "#f8c82b"
  if (type == "focus") colors = "#9262c9"
  if (type == "staff") colors = "#04cb0c"

  const titleStyle = {
    color: colors,
    opacity: "50%"
  }
  
  return (
    <div className="range">
      <span style={titleStyle}>{name}</span>
      <div className="slots-range">
        {Array.from({ length: Number(slots) }).map((_, i) => (
          <Star key={i} type={type} />
      ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="spellTracker">
        <SpellRange name={"R1"} slots={3} type={"spell"} />
        <SpellRange name={"R2"} slots={3} type={"spell"}/>
        <SpellRange name={"R3"} slots={3} type={"spell"}/>
        <SpellRange name={"R4"} slots={3} type={"spell"}/>
        <SpellRange name={"R5"} slots={2} type={"spell"}/>
        <SpellRange name={"Staff"} slots={5} type={"staff"}/>
        <SpellRange name={"Focus"} slots={4} type={"focus"}/>
      </div>
    </>
  )
}

export default App
