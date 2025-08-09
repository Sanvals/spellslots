import React, { useState, useEffect } from 'react';
import starEmpty from './assets/star-empty.png'
import starFull from './assets/star-full.png'
import starFocus from './assets/star-focus.png'
import starCharges from './assets/star-charges.png'
import starBlind from './assets/star-blind.png'
import n1 from './assets/1.png'
import n2 from './assets/2.png'
import n3 from './assets/3.png'
import n4 from './assets/4.png'
import n5 from './assets/5.png'
import imageStaff from './assets/staff.png'
import imageWeapon from './assets/weapon.png'
import './App.css'

const star = {
  images: {
    spell: starFull,
    focus: starFocus,
    staff: starCharges
  },
  colors: {
    spell: '#f8c82b',
    focus: '#9262c9',
    staff: '#04cb0c',
  }
}

const rangeLogos = {
  R1: n1,
  R2: n2,
  R3: n3,
  R4: n4,
  R5: n5,
  Staff: imageStaff,
  Focus: imageWeapon
}

function Star ({ type, isFull, toggle }) {
  return (
    <div className="star-wrapper">
      <img
        className="star"
        src={ isFull ? star.images[type] : starEmpty }
        alt={ type }
        onClick={ toggle }
      />
    </div>
  );
}


function SpellRange({ name, slots, type }) {
  const storageKey = `spell-range-${name}`;
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : Array(Number(slots)).fill(true);
  });

  const toggleStar = (index) => {
    setStars(prev =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  const resetStars = () => {
    setStars(Array(Number(slots)).fill(true));
  };

  const allEmpty = stars.every(s => !s);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(stars));
  }, [stars]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "r" || e.key === "R") {
        resetStars();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="range">
      <img
        className="rangeLogo"
        src={rangeLogos[name]}
        style={{ opacity: allEmpty ? 0.5 : 1 }}
      />
      <div className="slots-range">
        {
          stars.map((isFull, i) => (
            <Star
              key={i}
              type={type}
              isFull={isFull}
              toggle={() => toggleStar(i)}
            />
          ))
        }
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
    { name: 'R5', slots: 3, type: 'spell' },
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
