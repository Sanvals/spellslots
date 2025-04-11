import React, { useState } from 'react';
import starEmpty from './assets/star-empty.png'
import starFull from './assets/star-full.png'
import starFocus from './assets/star-focus.png'
import starCharges from './assets/star-charges.png'
import './App.css'

const starImages = {
  spell: starFull,
  focus: starFocus,
  staff: starCharges,
}

const starColors = {
  spell: '#f8c82b',
  focus: '#9262c9',
  staff: '#04cb0c',
};

function Star ({ type }) {
  const  [isFull, setIsFull] = useState(true)

  return (
    <div className="star-wrapper">
      <img
        className="star"
        src={ isFull ? starImages[type] : starEmpty }
        alt={ type }
        onClick={ () => setIsFull(!isFull) }
      />
    </div>
  )
}

function SpellRange({ name, slots, type }) {
  return (
    <div className="range">
      <span style={{ color: starColors[type] }}>{name}</span>
      <div className="slots-range">
        {Array.from({ length: Number(slots) }).map((_, i) => (
          <Star key={i} type={type} />
      ))}
      </div>
    </div>
  );
}

function App() {
  const spellGroups = [
    { name: 'R1', slots: 3, type: 'spell' },
    { name: 'R2', slots: 3, type: 'spell' },
    { name: 'R3', slots: 3, type: 'spell' },
    { name: 'R4', slots: 3, type: 'spell' },
    { name: 'R5', slots: 2, type: 'spell' },
    { name: 'Staff', slots: 5, type: 'staff' },
    { name: 'Focus', slots: 4, type: 'focus' },
  ];

  return (
    <div className="spellTracker">
      {spellGroups.map((group, i) => (
        <SpellRange key={i} {...group} />
      ))}
    </div>
  );
}

export default App
