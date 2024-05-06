import { Tree } from "../Tree/Tree.jsx";
import { RootedMetrics } from "../RootedMetrics/RootedMetrics.jsx";
import { UnrootedMetrics } from "../UnrootedMetrics/UnrootedMetrics.jsx";
import { Other } from "../Other/Other.jsx";
import { Button } from "../Button/Button.jsx";

export function Form() {
  return (
    <>
      <Tree />
      <RootedMetrics />
      <UnrootedMetrics />
      <Other />
      <Button />
    </>
  );
}
