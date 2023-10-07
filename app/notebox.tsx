import { useEffect } from "react";
import { Note } from "./note";


type NoteboxProps = {
    note: Note;
    interval: string;
    semitones: number;
    prevNote: Note;
    countdown: number;
}
const Notebox = (props: NoteboxProps) => {

    useEffect(() => {
    }, [props.note, props.interval, props.semitones, props.prevNote, props.countdown]);

    return (
        <div className="flex flex-col items-center justify-between text-gray-600 padding-3 align-center">
            <h1 className="text-4xl">{props.prevNote}</h1>
            <h1 className="text-9xl">{props.note}</h1>
            <div className="items-center justify-between text-gray-600 padding-3 inline-block w-4/5 align-center items-center space-x-3">
            <text className="text-3xl align-center items-center text-center">{props.interval.split(' ')[0]}</text>
            <text className="text-3xl align-center items-center text-center">{props.interval.split(' ').length >= 2 ? props.interval.split(' ')[1] : ''}</text>
            </div>



            <div className="items-center justify-between text-gray-600 padding-3 inline-block w-4/5 align-center items-center space-x-3">
                <text className="text-3xl align-center items-center text-center">{props.semitones}</text>
                <text className="text-3xl align-center items-center text-center">semitones</text>
            </div>


            <h3 className="text-7xl">{props.countdown}</h3>
        </div>
    );
}

export default Notebox;

