import { useEffect, useRef } from "react";

const PhyloViewer = () => {
  const containerOneRef = useRef(null);
  const containerTwoRef = useRef(null);

  let newickFirstString = sessionStorage.getItem("newickFirst") || "";
  let newickSecondString = sessionStorage.getItem("newickSecond") || "";

  const isSecondStringEmptyOrDefault =
    !newickSecondString.trim() ||
    newickSecondString ===
      "Paste or drag and drop your trees in newick format separated by ;";

  // Log and clear second string to prevent carry-over issues
  console.log("Newick First String:", newickFirstString);
  console.log("Newick Second String:", newickSecondString);
  console.log(
    "Is Second String Empty or Default?",
    isSecondStringEmptyOrDefault
  );

  if (isSecondStringEmptyOrDefault) {
    console.log("Clearing Newick Second String from session storage...");
    sessionStorage.removeItem("newickSecond");
    newickSecondString = ""; // reset local variable as well
  }

  useEffect(() => {
    if (!newickFirstString.trim()) {
      console.error("No Newick data for the first tree!");
      return;
    }

    const onLoadPhylo = () => {
      if (window.PhyloIO) {
        const phylo = window.PhyloIO.init();
        const c1 = phylo.create_container(containerOneRef.current.id);
        const customSettings = {
          name: "Tree's",
          data_type: "newick",
          use_branch_length: true,
          collapse_level: 2,
          show_histogram: true,
        };
        c1.add_tree(newickFirstString, customSettings);

        if (!isSecondStringEmptyOrDefault) {
          const c2 = phylo.create_container(containerTwoRef.current.id);
          c2.add_tree(newickSecondString, customSettings);
          phylo.settings.compareMode = true;
          phylo.bound_container = [c1, c2];
        } else {
          phylo.settings.compareMode = false;
        }

        phylo.start();
      } else {
        console.error("PhyloIO not loaded correctly.");
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

    const hideElements = () => {
      const elementsToHide = document.querySelectorAll(
        ".corner_placeholder, .top, .left, .__web-inspector-hide-shortcut__"
      );
      elementsToHide.forEach((element) => {
        element.style.display = "none";
      });
    };

    hideElements();

    const observer = new MutationObserver(hideElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [newickFirstString, newickSecondString, isSecondStringEmptyOrDefault]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: !isSecondStringEmptyOrDefault
          ? "space-between"
          : "center",
      }}
    >
      <style>
        {`
          .corner_placeholder .scale, .colorlegend_node {
            display: none !important;
          }
          #menu-node {
            display: none !important;
          }
        `}
      </style>
      <div
        id="container1"
        ref={containerOneRef}
        style={{
          display: "inline-block",
          width: !isSecondStringEmptyOrDefault ? "45%" : "100%",
          height: "720px",
          backgroundColor: "#fff",
          margin: "16px",
        }}
      />
      {!isSecondStringEmptyOrDefault && (
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
