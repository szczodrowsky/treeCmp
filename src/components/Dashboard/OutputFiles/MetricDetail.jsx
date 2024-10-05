import PropTypes from "prop-types";

const MetricsDetail = ({ fileContent }) => {
  return (
    <div>
      <h1>Zawartość Output File</h1>
      <pre>{fileContent || "Brak zawartości"}</pre>
    </div>
  );
};

MetricsDetail.propTypes = {
  fileContent: PropTypes.string.isRequired,
};

export default MetricsDetail;
