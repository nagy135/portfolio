"use client";

import { AceternityLogo } from "./_components/aceternity-logo";
import { Drag } from "./_components/drag";
import ParticleLogo from "./_components/particle-logo";
import ShiftingLines from "./_components/shifting-lines";
import VocabularyLogo from "./_components/vocabulary-logo";
import Waves from "./_components/waves";

export default async function Home() {
  return (
    <>
      <AceternityLogo title={"Welcome"} />
      <p className="text-center m-3 mt-5">
        Simple particles returning to original position (mouse move)
      </p>
      <ParticleLogo />
      <p className="text-center m-5">
        Moving parts of svg using css (mouse move)
      </p>
      <VocabularyLogo />
      <p className="text-center my-5 mb-10">
        Generating svg on fly to shift lines (click)
      </p>
      <ShiftingLines />
      <p className="text-center my-20">
        Simple animation of propagating waves as random movement of particles (click)
      </p>
      <Waves />
      <p className="text-center my-20">
        Drag demo using framer motion
      </p>
      <Drag />
    </>
  );
}
