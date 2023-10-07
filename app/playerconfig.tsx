import { useEffect, useState } from "react";
import { Note, dorianScale, harmonicMinorScale, locrianScale, lydianScale, majorScale, melodicMinorScale, minorScale, mixolydianScale, pentatonicMajorScale, pentatonicMinorScale, phrygianScale } from "./note";

type PlayerConfigProps = {
    updateState: (state: any) => void;
    scale: Note[];
};

const PlayerConfig = (props: PlayerConfigProps) => {

    const [config, setConfig] = useState({
        note: Note.C,
        scaleFunc: () => majorScale,
        wait: 5,
        showNote: true,
        showInterval: true,
        showSemitones: true,
        running: false,
    });

    useEffect(() => {
        props.updateState(config);
    }, [config]);

    const scaleFuncs: any = {
        major: majorScale,
        minor: minorScale,
        pentatonicMajor: pentatonicMajorScale,
        pentatonicMinor: pentatonicMinorScale,
        dorian: dorianScale,
        phrygian: phrygianScale,
        lydian: lydianScale,
        mixolydian: mixolydianScale,
        locrian: locrianScale,
        harmonicMinor: harmonicMinorScale,
        melodicMinor: melodicMinorScale,
    }

    return (
        <div className="space-x-3 space-y-3 align-middle grid-auto-cols-auto">
            <div className="flex flex-col items-center justify-between m-auto">
            <button className="outline-1 outline-white outline rounded-lg w-4/5 h-4/5" onClick={() => setConfig(prevState => ({ ...prevState, running: !prevState.running }))}>{config.running ? "Stop" : "Start"}</button>
            </div>
            <br />
            <div className="inline-block m-auto">
                <input type="checkbox" checked={config.showNote} onChange={() => setConfig(prevState => ({ ...prevState, showNote: !prevState.showNote }))} /> Show note
                <br />
                <input type="checkbox" checked={config.showInterval} onChange={() => setConfig(prevState => ({ ...prevState, showInterval: !prevState.showInterval }))} /> Show interval
                <br />
                <input type="checkbox" checked={config.showSemitones} onChange={() => setConfig(prevState => ({ ...prevState, showSemitones: !prevState.showSemitones }))} /> Show semitones
                <br />
            </div>
            
            <div className="items-center justify-between text-black inline-flex space-x-1 m-auto">
            <select className="bg-gray-100 rounded-lg p-2 text-black" onChange={(e) => setConfig(prevState => ({ ...prevState, note: e.target.value as Note }))}>
                <option value={Note.C}>C</option>
                <option value={Note.D}>D</option>
                <option value={Note.E}>E</option>
                <option value={Note.F}>F</option>
                <option value={Note.G}>G</option>
                <option value={Note.A}>A</option>
                <option value={Note.B}>B</option>
            </select>
                <select className="bg-gray-100 rounded-lg p-2" onChange={(e) => setConfig(prevState => ({ ...prevState, scaleFunc: scaleFuncs[e.target.value] }))}>
                    {Object.keys(scaleFuncs).map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>
            <div className="flex flex-col items-center justify-between m-auto">
                <button className="bg-gray-100 rounded-lg p-2 text-black" onClick={() => setConfig(prevState => ({ ...prevState, wait: prevState.wait + 1 }))}>+</button>
                <text>{config.wait} seconds</text>
                <button className="bg-gray-100 rounded-lg p-2 text-black" onClick={() => setConfig(prevState => ({ ...prevState, wait: prevState.wait - 1 }))}>-</button>

            </div>
            <div className="flex flex-col items-center justify-between m-auto">
            <text>{props.scale.join(', ')}</text>
            </div>
        </div>
    )
}

export default PlayerConfig;