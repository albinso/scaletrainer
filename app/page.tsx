"use client";

import Image from 'next/image'
import NoteShower from './noteshower';
import { use, useEffect, useState } from 'react';
import { Note, majorScale, minorScale, pentatonicMajorScale, pentatonicMinorScale, dorianScale, phrygianScale, lydianScale, mixolydianScale, locrianScale, harmonicMinorScale, melodicMinorScale } from './note';

export default function Home() {

  const [note, setNote] = useState<Note>(Note.C);
  const [scaleFunc, setScaleFunc] = useState<(root: Note) => Note[]>(() => majorScale);
  const [scale, setScale] = useState<Note[]>([Note.C]);
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

  

  useEffect(() => {
  }, [scale, wait]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10  w-full items-center justify-between content-center font-mono text-sm lg:flex">
        
        <NoteShower root={note} scale={scale} wait={wait} />
        

      </div>
    </main>
  )
}
