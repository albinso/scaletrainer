import { useEffect, useState } from "react";

type CountDownerProps = {
    seconds: number;
    onDone: () => void;
    running: boolean;
    onTick: (seconds: number) => void;
};
const CountDowner = ({ seconds, onDone, running, onTick } : CountDownerProps) => {

    const [count, setCount] = useState<number>(seconds);


    useEffect(() => {
        const timer = setTimeout(() => {
            if(!running) return;
            setCount(count - 1);
        }, 1000);
        if (count <= 0) {
            onDone();
            setCount(seconds);
        }
        return () => clearTimeout(timer);
    }, [count, setCount, running]);

    useEffect(() => {
        setCount(seconds);
    }, [seconds]);

    useEffect(() => {
        onTick(count);
    }, [count]);

    return (
        <div>
        </div>
    );
}

export default CountDowner;