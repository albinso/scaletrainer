import { useEffect } from "react";
import { Note } from "./note";


type NoteboxProps = {
    note: Note;
    interval: string;
    semitones: number;
    prevNote: Note;
    countdown: number;
}
const Notebox = (props : NoteboxProps) => {

    useEffect(() => {
    }, [props.note, props.interval, props.semitones, props.prevNote, props.countdown]);

    return (
        <div className="flex flex-col items-center justify-between text-gray-600">
            <h1 className="text-4xl">{props.prevNote}</h1>
            <h1 className="text-9xl">{props.note}</h1>
            <h2 className="text-8xl">{props.interval}</h2>
            <h3 className="text-7xl">{props.semitones} semitones</h3>
            <h3 className="text-7xl">{props.countdown}</h3>
        </div>
    );
}

export default Notebox;

