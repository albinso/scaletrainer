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

    return (
        <div>
            <h1>CountDowner</h1>
            <h2>{count}</h2>
        </div>
    );
}

export default CountDowner;