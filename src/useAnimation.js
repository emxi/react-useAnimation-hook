import { useEffect, useRef } from 'react';

export default function useAnimation(callback, duration = Infinity, onTimeout) {
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const timeRef = useRef(0);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => stopAnimation();
    }, []);

    function animate(time) {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            timeRef.current += deltaTime;

            if (timeRef.current >= duration) {
                timeRef.current = duration;
            }

            callbackRef.current(deltaTime, timeRef.current);
        }
        previousTimeRef.current = time;
        if (timeRef.current >= duration) {
            stopAnimation();
            onTimeout && onTimeout();
        } else {
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    function startAnimation() {
        if (!requestRef.current) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    function pauseAnimation() {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            previousTimeRef.current = undefined;
            requestRef.current = undefined;
        }
    }

    function stopAnimation() {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            previousTimeRef.current = undefined;
            requestRef.current = undefined;
            timeRef.current = 0;
        }
    }

    function resetAnimation() {
        timeRef.current = 0;
    }

    function updateTime(time) {
        timeRef.current = time;
        previousTimeRef.current = undefined;
    }

    return [startAnimation, pauseAnimation, stopAnimation, resetAnimation, updateTime];
}
