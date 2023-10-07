import { useEffect, useState } from "react";

type CountDownerProps = {
    seconds: number;
    onDone: () => void;
    running: boolean;
};
const CountDowner = ({ seconds, onDone, running } : CountDownerProps) => {

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

    return (
        <div>
            <h1>Next note in {count}</h1>
        </div>
    );
}

export default CountDowner;