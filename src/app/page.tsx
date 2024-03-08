import { AceternityLogo } from "./_components/aceternity-logo";
import ParticleLogo from "./_components/particle-logo";
import ShiftingLines from "./_components/shifting-lines";
import VocabularyLogo from "./_components/vocabulary-logo";

export default async function Home() {
  return (
    <>
      <AceternityLogo title={"Portfolio"} />
      <p className="text-center m-3 mt-5">
        Simple particles returning to original position (mouse move)
      </p>
      <ParticleLogo />
      <p className="text-center m-3">
        Moving parts of svg using css (mouse move)
      </p>
      <VocabularyLogo />
      <p className="text-center m-3">
        Generating svg on fly to shift lines (click)
      </p>
      <ShiftingLines />
    </>
  );
}
