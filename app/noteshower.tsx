import React, { useEffect, useState } from "react";
import CountDowner from "./countdowner";
import { ElectricPiano, SplendidGrandPiano, Reverb } from "smplr";
import { Note, getInterval, majorScale, semitonesToNamedInterval } from "./note";
import Notebox from "./notebox";
import PlayerConfig, { PlayerConfigState } from "./playerconfig";






type NoteShowerProps = {
    wait: number;
};

const NoteShower = ({ wait }: NoteShowerProps) => {

    const [root, setRoot] = React.useState<Note>(Note.C);

    const [note, setNote] = React.useState<Note>(Note.C);

    const [nextNote, setNextNote] = React.useState<Note>(Note.D);

    const [running, setRunning] = React.useState<boolean>(false);

    const [synth, setSynth] = React.useState<any | null>(null);

    const [waitTime, setWaitTime] = React.useState<number>(wait);

    const [scale, setScale] = React.useState<Note[]>([Note.C]);

    const [scaleFunc, setScaleFunc] = React.useState<(root: Note) => Note[]>(() => majorScale);

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
    }, [wait, scale]);

    useEffect(() => {
        setScale(scaleFunc(root));
    }, [root, scaleFunc]);

    const [countdown, setCountdown] = useState(0);



    return (
        <div>
            <Notebox note={nextNote} showNote={showNote} prevNote={note} countdown={countdown} interval={semitonesToNamedInterval(getInterval(root, nextNote))} showInterval={showInterval} semitones={getInterval(root, nextNote)} showSemitones={showSemitones} root={root} />
            <br />
            <PlayerConfig updateState={(state : PlayerConfigState) => {
                setShowInterval(state.showInterval);
                setShowSemitones(state.showSemitones);
                setShowNote(state.showNote);
                setRunning(state.running);
                setWaitTime(state.wait);
                setRoot(state.note);
                setScaleFunc(() => state.scaleFunc);
                
            }} scale={scale}/>
            
            <CountDowner seconds={waitTime} running={running} onDone={() => {
                playNote(nextNote);
                updateNote();
            }} onTick={(seconds : number) => {
                setCountdown(seconds);
            }} />
        </div>
    );
};

export default NoteShower;