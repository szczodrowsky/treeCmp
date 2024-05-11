import { useState } from "react";
import { Tree } from "../Tree/Tree.jsx";
import { RootedMetrics } from "../RootedMetrics/RootedMetrics.jsx";
import { UnrootedMetrics } from "../UnrootedMetrics/UnrootedMetrics.jsx";
import { Other } from "../Other/Other.jsx";
import { Button } from "../Button/Button.jsx";

export function Form() {
  const [rootedCommands, setRootedCommands] = useState([]);
  const [unrootedCommands, setUnrootedCommands] = useState([]);
  const [comandRadio, setComandRadio] = useState("");
  const [treeValue1, setTreeValue1] = useState(
    "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [treeValue2, setTreeValue2] = useState(
    "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [inputValue, setInputValue] = useState("");

  // Separate state for "Other" methods
  const [normalizedDistances, setNormalizedDistances] = useState(false);
  const [pruneTrees, setPruneTrees] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [zeroWeightsAllowed, setZeroWeightsAllowed] = useState(false);

  const [bifurcatingTreesOnly, setBifurcatingTreesOnly] = useState(false);

  // Function to handle changes in the "Other" checkboxes
  const handleOtherCheckboxChange = (optionName, value) => {
    switch (optionName) {
      case "normalizedDistances":
        setNormalizedDistances(value);
        break;
      case "pruneTrees":
        setPruneTrees(value);
        break;
      case "includeSummary":
        setIncludeSummary(value);
        break;
      case "zeroWeightsAllowed":
        setZeroWeightsAllowed(value);
        break;
      case "bifurcatingTreesOnly":
        setBifurcatingTreesOnly(value);
        break;
      default:
        break;
    }
  };

  // Update metrics state based on checkbox selections
  const handleRootedChange = (commandName, isChecked) => {
    setRootedCommands((prev) => {
      if (isChecked) {
        return [...prev, commandName];
      } else {
        return prev.filter((name) => name !== commandName);
      }
    });
  };

  const handleUnrootedChange = (commandName, isChecked) => {
    setUnrootedCommands((prev) => {
      if (isChecked) {
        return [...prev, commandName];
      } else {
        return prev.filter((name) => name !== commandName);
      }
    });
  };

  // Send all data to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    const Newick = {
      comandRadio,
      inputValue,
      treeValue1,
      treeValue2,
      rootedCommands,
      unrootedCommands,
      normalizedDistances,
      pruneTrees,
      includeSummary,
      zeroWeightsAllowed,
      bifurcatingTreesOnly,
    };
    fetch("http://localhost:8080", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Newick),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tree
        checked={comandRadio}
        setComandRadio={setComandRadio}
        treeValue1={treeValue1}
        setTreeValue1={setTreeValue1}
        treeValue2={treeValue2}
        setTreeValue2={setTreeValue2}
        onInputChange={setInputValue}
        setNormalizedDistances={setNormalizedDistances}
        setPruneTrees={setPruneTrees}
        setIncludeSummary={setIncludeSummary}
        setZeroWeightsAllowed={setZeroWeightsAllowed}
        setBifurcatingTreesOnly={setBifurcatingTreesOnly}
      />
      <RootedMetrics onCommandChange={handleRootedChange} />
      <UnrootedMetrics onCommandChange={handleUnrootedChange} />
      <Other
        normalizedDistances={normalizedDistances}
        pruneTrees={pruneTrees}
        includeSummary={includeSummary}
        zeroWeightsAllowed={zeroWeightsAllowed}
        bifurcatingTreesOnly={bifurcatingTreesOnly}
        onOptionChange={handleOtherCheckboxChange}
      />
      <Button type="submit" onClick={handleSubmit} />
    </form>
  );
}
