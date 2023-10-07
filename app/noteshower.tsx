import React, { useEffect, useState } from "react";
import CountDowner from "./countdowner";
import { ElectricPiano, SplendidGrandPiano, Reverb } from "smplr";
import { Note, getInterval, semitonesToNamedInterval } from "./note";
import Notebox from "./notebox";
import PlayerConfig from "./playerconfig";






type NoteShowerProps = {
    scale: Note[];
    wait: number;
    root: Note;
};

const NoteShower = ({ scale, wait, root }: NoteShowerProps) => {

    const [note, setNote] = React.useState<Note>(scale[0]);

    const [nextNote, setNextNote] = React.useState<Note>(scale[1]);

    const [running, setRunning] = React.useState<boolean>(false);

    const [synth, setSynth] = React.useState<any | null>(null);

    useEffect(() => {

        const context = new AudioContext();
        const piano = new SplendidGrandPiano(context);
        piano.output.addEffect("reverb", new Reverb(context), 0.2);
        setSynth(piano);
    }, []);

    useEffect(() => {
        setNextNote(root);
        setNote(root);
    }, [scale]);


    const playNote = (n: Note) => {
        if (!synth) {
            console.warn("synth not initialized");
            return;
        }

        console.log("Playing note: " + n);

        //play a middle 'C' for the duration of an 8th note
        synth.start({ note: n + "4" });
    }

    const updateNote = () => {
        console.log("updateNote");
        setNote(nextNote);
        let next: Note = scale[Math.floor(Math.random() * scale.length)];
        while (next === note) {
            next = scale[Math.floor(Math.random() * scale.length)];
        }
        setNextNote(next);

    }

    const [showInterval, setShowInterval] = React.useState<boolean>(true);
    const [showSemitones, setShowSemitones] = React.useState<boolean>(true);
    const [showNote, setShowNote] = React.useState<boolean>(true);

    useEffect(() => {
    }, [note, nextNote, updateNote]);

    useEffect(() => {
    }, [wait]);

    const [countdown, setCountdown] = useState(0);



    return (
        <div>
            <Notebox note={nextNote} prevNote={note} countdown={countdown} interval={semitonesToNamedInterval(getInterval(root, nextNote))} semitones={getInterval(root, nextNote)} />
            <br />
            <PlayerConfig updateState={(state) => {
                setShowInterval(state.showInterval);
                setShowSemitones(state.showSemitones);
                setShowNote(state.showNote);
                setRunning(state.running);
            }} scale={scale}/>
            
            <CountDowner seconds={wait} running={running} onDone={() => {
                playNote(nextNote);
                updateNote();
            }} onTick={(seconds : number) => {
                setCountdown(seconds);
            }} />
        </div>
    );
};

export default NoteShower;