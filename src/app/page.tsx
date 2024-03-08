import { AceternityLogo } from "./_components/aceternity-logo";
import ParticleLogo from "./_components/particle-logo";
import ShiftingLines from "./_components/shifting-lines";
import VocabularyLogo from "./_components/vocabulary-logo";

export default async function Home() {
  return (
    <>
      <AceternityLogo title={"Portfolio"} />
      <ParticleLogo />
      <VocabularyLogo />
      <ShiftingLines />
    </>
  );
}
