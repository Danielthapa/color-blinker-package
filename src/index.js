import React, { useState } from "react";
import "./style.css";

const RgbLights = ({ delay, colors }) => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkInterval, setBlinkInterval] = useState(null);

  const startBlinking = () => {
    const intervalDelay = delay || 2000;
    const interval = setInterval(() => {
      setCurrentColor(
        colors[Math.floor(Math.random() * (colors.length - 1)) + 1]
      );
    }, intervalDelay);
    setBlinkInterval(interval);
    setIsBlinking(true);
  };

  const stopBlinking = () => {
    clearInterval(blinkInterval);
    setBlinkInterval(null);
    setIsBlinking(false);
  };

  return (
    <div className="outer-container">
      <div
        style={{ backgroundColor: currentColor.colorCode }}
        className="main-container"
      >
        {currentColor.name}
      </div>
      <button
        onClick={() => {
          isBlinking ? stopBlinking() : startBlinking();
        }}
      >
        {isBlinking ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default RgbLights;
