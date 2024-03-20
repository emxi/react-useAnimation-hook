import { useState } from 'react';
import useAnimation from './useAnimation';

const VELOCITY = 50;

export default function SimpleExample() {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(1);

    const [startAnimation, pauseAnimation] = useAnimation((deltaTime) => {
        if (position > 200) {
            setDirection(-1);
        } else if (position < 0) {
            setDirection(1);
        }
        setPosition((prev) => prev + direction * VELOCITY * (deltaTime / 1000));
    });

    return (
        <div>
            <button onClick={() => startAnimation()}>Start Animation</button>
            <button onClick={() => pauseAnimation()}>Pause Animation</button>
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
        </div>
    );
}
