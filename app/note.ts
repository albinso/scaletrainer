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



export const getInterval = (note1: Note, note2: Note) => {
    const index1 = aChromatic.indexOf(note1);
    const index2 = aChromatic.indexOf(note2);
    const interval = index2 - index1;
    return interval < 0 ? interval + 12 : interval;
}

export const semitonesToNamedInterval = (semitones: number) => {
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

