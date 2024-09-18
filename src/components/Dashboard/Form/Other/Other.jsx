import PropTypes from "prop-types";
import styles from "./Other.module.css";

export function Other({
  normalizedDistances,
  pruneTrees,
  includeSummary,
  zeroWeightsAllowed,
  bifurcatingTreesOnly,
  onOptionChange,
}) {
  const handleNormalizedDistancesChange = (e) => {
    onOptionChange("normalizedDistances", e.target.checked);
  };

  const handlePruneTreesChange = (e) => {
    onOptionChange("pruneTrees", e.target.checked);
  };

  const handleIncludeSummaryChange = (e) => {
    onOptionChange("includeSummary", e.target.checked);
  };

  const handleZeroWeightsAllowedChange = (e) => {
    onOptionChange("zeroWeightsAllowed", e.target.checked);
  };

  const handleBifurcatingTreesOnlyChange = (e) => {
    onOptionChange("bifurcatingTreesOnly", e.target.checked);
  };

  return (
    <div>
      <h3>Other Options</h3>
      <ul className={styles.list}>
        <li>
          <input
            type="checkbox"
            checked={normalizedDistances}
            onChange={handleNormalizedDistancesChange}
          />{" "}
          Normalized distances
        </li>
        <li>
          <input
            type="checkbox"
            checked={pruneTrees}
            onChange={handlePruneTreesChange}
          />{" "}
          Prune trees
        </li>
        <li>
          <input
            type="checkbox"
            checked={includeSummary}
            onChange={handleIncludeSummaryChange}
          />{" "}
          Include summary
        </li>
        <li>
          <input
            type="checkbox"
            checked={zeroWeightsAllowed}
            onChange={handleZeroWeightsAllowedChange}
          />{" "}
          Zero weights allowed
        </li>
        <li>
          <input
            type="checkbox"
            checked={bifurcatingTreesOnly}
            onChange={handleBifurcatingTreesOnlyChange}
          />{" "}
          Bifurcating trees only
        </li>
      </ul>
    </div>
  );
}

Other.propTypes = {
  normalizedDistances: PropTypes.bool.isRequired,
  pruneTrees: PropTypes.bool.isRequired,
  includeSummary: PropTypes.bool.isRequired,
  zeroWeightsAllowed: PropTypes.bool.isRequired,
  bifurcatingTreesOnly: PropTypes.bool.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};
