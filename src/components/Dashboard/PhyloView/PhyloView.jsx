import { useEffect, useRef } from "react";

const PhyloViewer = () => {
  const containerOneRef = useRef(null);
  const containerTwoRef = useRef(null);

  const newickFirstString = sessionStorage.getItem("newickFirst") || "";
  const newickSecondString = sessionStorage.getItem("newickSecond") || "";

  const isSecondStringDefault =
    newickSecondString ===
    "Paste or drag and drop your trees in newick format separated by ;";

  useEffect(() => {
    if (!newickFirstString || newickFirstString.trim() === "") {
      console.error("Brak danych Newick dla pierwszego drzewa!");
      return;
    }

    const onLoadPhylo = () => {
      if (window.PhyloIO) {
        const phylo = window.PhyloIO.init();
        const c1 = phylo.create_container(containerOneRef.current.id);
        const customSettings = {
          name: "moje drzewo",
          data_type: "newick",
          use_branch_length: true,
          collapse_level: 2,
        };
        c1.add_tree(newickFirstString, customSettings);

        let c2 = null;

        if (
          newickSecondString &&
          newickSecondString.trim() !== "" &&
          !isSecondStringDefault
        ) {
          c2 = phylo.create_container(containerTwoRef.current.id);
          c2.add_tree(newickSecondString, customSettings);
          phylo.settings.compareMode = true;
          phylo.bound_container = [c1, c2];
        } else {
          phylo.settings.compareMode = false;
        }

        phylo.start();
      } else {
        console.error("PhyloIO nie zostało poprawnie załadowane.");
      }
    };

    const loadScript = (src, onLoad) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    loadScript(
      "https://cdn.jsdelivr.net/gh/DessimozLab/phylo-io@refactor/dist/phylo.js",
      onLoadPhylo
    );
  }, [newickFirstString, newickSecondString, isSecondStringDefault]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: !isSecondStringDefault ? "space-between" : "center",
      }}
    >
      <div
        id="container1"
        ref={containerOneRef}
        style={{
          display: "inline-block",
          width: !isSecondStringDefault ? "45%" : "100%",
          height: "720px",
          backgroundColor: "#fff",
          margin: "16px",
        }}
      />
      {!isSecondStringDefault && newickSecondString.trim() !== "" && (
        <div
          id="container2"
          ref={containerTwoRef}
          style={{
            display: "inline-block",
            width: "45%",
            height: "720px",
            backgroundColor: "#fff",
            margin: "16px",
          }}
        />
      )}
    </div>
  );
};

export default PhyloViewer;
