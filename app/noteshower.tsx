import React, { useEffect } from "react";
import CountDowner from "./countdowner";
import { ElectricPiano, SplendidGrandPiano, Reverb } from "smplr";



export enum Note {
    C = "C",
    Cs = "C#",
    Df = "Db",
    D = "D",
    Ds = "D#",
    Ef = "Eb",
    E = "E",
    F = "F",
    Fs = "F#",
    Gf = "Gb",
    G = "G",
    Gs = "G#",
    Af = "Ab",
    A = "A",
    As = "A#",
    Bf = "Bb",
    B = "B",
}

export const aChromatic = [Note.A, Note.As, Note.B, Note.C, Note.Cs, Note.D, Note.Ds, Note.E, Note.F, Note.Fs, Note.G, Note.Gs];
export const aMajor = [Note.A, Note.B, Note.Cs, Note.D, Note.E, Note.Fs, Note.Gs];
export const aMinor = [Note.A, Note.B, Note.C, Note.D, Note.E, Note.F, Note.G];



const getInterval = (note1: Note, note2: Note) => {
    const index1 = aChromatic.indexOf(note1);
    const index2 = aChromatic.indexOf(note2);
    const interval = index2 - index1;
    return interval < 0 ? interval + 12 : interval;
}

const semitonesToNamedInterval = (semitones: number) => {
    switch (semitones) {
        case 0: return "unison";
        case 1: return "minor second";
        case 2: return "major second";
        case 3: return "minor third";
        case 4: return "major third";
        case 5: return "perfect fourth";
        case 6: return "tritone";
        case 7: return "perfect fifth";
        case 8: return "minor sixth";
        case 9: return "major sixth";
        case 10: return "minor seventh";
        case 11: return "major seventh";
        case 12: return "octave";
        default: return "unknown";
    }
}

const addInterval = (note: Note, interval: number) => {
    const index = aChromatic.indexOf(note);
    const newIndex = index + interval;
    return aChromatic[newIndex % 12];
}

export const scale = (root: Note, intervals: number[]) => {

    console.log("Called scale with intervals: " + intervals + " and root: " + root);
    const scale = [root];
    for (let i = 0; i < intervals.length - 1; i++) {
        scale.push(addInterval(scale[i], intervals[i]));
    }
    return scale;
}

const arrayRotate = (arr: any[], steps: number) => {
    let out = arr.slice();
    for (let i = 0; i < steps; i++) {
        out.push(out.shift());
    }
    return out;
}

const majorIntervals = [2, 2, 1, 2, 2, 2, 1];

export const majorScale = (root: Note) => {
    return scale(root, majorIntervals);
}

export const dorianScale = (root: Note) => {
    const intervals = arrayRotate(majorIntervals, 1);
    return scale(root, intervals);
}

export const phrygianScale = (root: Note) => {
    const intervals = arrayRotate(majorIntervals, 2);
    return scale(root, intervals);
}

export const lydianScale = (root: Note) => {
    const intervals = arrayRotate(majorIntervals, 3);
    return scale(root, intervals);
}

export const mixolydianScale = (root: Note) => {
    const intervals = arrayRotate(majorIntervals, 4);
    return scale(root, intervals);
}

export const minorScale = (root: Note) => {
    const intervals = arrayRotate(majorIntervals, 5);
    return scale(root, intervals);
}

export const locrianScale = (root: Note) => {
    const intervals = arrayRotate(majorIntervals, 6);
    return scale(root, intervals);
}

export const harmonicMinorScale = (root: Note) => {
    return scale(root, [2, 1, 2, 2, 1, 3, 1]);
}

export const melodicMinorScale = (root: Note) => {
    return scale(root, [2, 1, 2, 2, 2, 2, 1]);
}

export const pentatonicMajorScale = (root: Note) => {
    return scale(root, [2, 2, 3, 2, 3]);
}

export const pentatonicMinorScale: (root: Note) => Note[] = (root: Note) => {
    console.log("Root: " + root);
    return scale(root, [3, 2, 2, 3, 2]);
}




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



    return (
        <div className="w-1/2">
            <h1>Root: {root}</h1>
            <h2>{note}</h2>
            <text className="text-2xl">Next: </text>
            {showNote && <text className="text-2xl"> {nextNote}, </text>}
            {showInterval && <text className="text-2xl">{semitonesToNamedInterval(getInterval(root, nextNote))}, </text>}
            {showSemitones && <text className="text-2xl">{getInterval(root, nextNote)} semitones</text>}
            <br />
            <button onClick={() => setRunning(!running)}>{running ? "Stop" : "Start"}</button>
            <br />
            <input type="checkbox" checked={showNote} onChange={() => setShowNote(!showNote)} /> Show note
            <br />
            <input type="checkbox" checked={showInterval} onChange={() => setShowInterval(!showInterval)} /> Show interval
            <br />
            <input type="checkbox" checked={showSemitones} onChange={() => setShowSemitones(!showSemitones)} /> Show semitones
            <br />
            <CountDowner seconds={wait} running={running} onDone={() => {
                playNote(nextNote);
                updateNote()
            }
            } />
        </div>
    );
};

export default NoteShower;