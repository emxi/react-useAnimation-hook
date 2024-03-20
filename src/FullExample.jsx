import { useState } from 'react';
import useAnimation from './useAnimation';

const VELOCITY = 50;

export default function FullExample() {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(1);

    const [currentTime, setCurrentTime] = useState(0); // Just for log
    const [currentDeltaTime, setCurrentDeltaTime] = useState(0); // Just for log
    const [isTimeOut, setIsTimeOut] = useState(false); // Just for log

    const [startAnimation, pauseAnimation, stopAnimation, resetAnimation, updateTime] =
        useAnimation(
            (deltaTime, time) => {
                setCurrentTime(time); // Just for log
                setCurrentDeltaTime(deltaTime); // Just for log

                //* MAIN LOGIC FOR ANIMATION
                if (position > 200) {
                    setDirection(-1);
                } else if (position < 0) {
                    setDirection(1);
                }
                setPosition((prev) => prev + direction * VELOCITY * (deltaTime / 1000));
            },
            10000,
            () => {
                setIsTimeOut(true); // Just for log
            }
        );

    return (
        <div>
            <button onClick={() => startAnimation()}>Start Animation</button>
            <button onClick={() => pauseAnimation()}>Pause Animation</button>
            <button onClick={() => stopAnimation()}>Stop Animation</button>
            <button onClick={() => resetAnimation()}>Reset Animation</button>
            <button onClick={() => updateTime(3000)}>Update Time To 3s</button>
            <div style={{ position: 'relative', height: 100 }}>
                <div
                    style={{
                        position: 'absolute',
                        left: position,
                        backgroundColor: '#f00',
                        width: 50,
                        height: 50,
                    }}
                ></div>
            </div>
            <div>
                <p>Current Time: {Math.round(currentTime)}</p>
                <p>Delta Time: {Math.round(currentDeltaTime)}</p>
                <p>Position: {Math.round(position)}</p>
                <p>Direction: {direction}</p>
                <p>FPS: {Math.round(1000 / currentDeltaTime)}</p>
                <p>Is Time Out: {isTimeOut ? 'True' : 'False'}</p>
            </div>
        </div>
    );
}
