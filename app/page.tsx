"use client";

import Image from 'next/image'
import NoteShower, { Note, aMajor, aMinor, dorianScale, harmonicMinorScale, locrianScale, lydianScale, majorScale, melodicMinorScale, minorScale, mixolydianScale, pentatonicMajorScale, pentatonicMinorScale, phrygianScale } from './noteshower'
import { use, useEffect, useState } from 'react';

export default function Home() {

  const [note, setNote] = useState<Note>(Note.A);
  const [scaleFunc, setScaleFunc] = useState<(root: Note) => Note[]>(() => pentatonicMinorScale);
  const [scale, setScale] = useState<Note[]>([Note.A]);
  const [wait, setWait] = useState<number>(5);

  useEffect(() => {
    if (!scaleFunc || !note) return;
    console.log("Scale changed");
    console.log("Calling with " + note)
    console.log(scaleFunc);
    console.log("Finding scale");
    setScale(scaleFunc(note));
    console.log("Scale found");
    console.log(scale);
  }, [note, scaleFunc]);

  const names: any = {
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

  useEffect(() => {
  }, [scale, wait]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <select className="bg-gray-100 rounded-lg p-2" onChange={(e) => setNote(e.target.value as Note)}>
          <option value={Note.A}>A</option>
          <option value={Note.B}>B</option>
          <option value={Note.C}>C</option>
          <option value={Note.D}>D</option>
          <option value={Note.E}>E</option>
          <option value={Note.F}>F</option>
          <option value={Note.G}>G</option>
        </select>
        <div className="flex flex-col items-center justify-between">
          <select className="bg-gray-100 rounded-lg p-2" onChange={(e) => setScaleFunc(() => names[e.target.value])}>
            {Object.keys(names).map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="bg-gray-100 rounded-lg p-2" onClick={() => setWait(wait - 1)}>-</button>
          <text>{wait}</text>
          <button className="bg-gray-100 rounded-lg p-2" onClick={() => setWait(wait + 1)}>+</button>
        </div>
        <text>{scale.join(', ')}</text>
        <NoteShower root={note} scale={scale} wait={wait} />

      </div>
    </main>
  )
}
