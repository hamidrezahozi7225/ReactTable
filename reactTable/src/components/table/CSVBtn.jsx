import PropTypes from 'prop-types';

const CSVBtn = ({ handleDownloadCsv, data }) => {
  return (
    <>
      <button type='button' onClick={() => handleDownloadCsv(data)}>
        Download as CSV
      </button>
    </>
  );
};

CSVBtn.propTypes = {
  handleDownloadCsv: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired, // Adjust the type as necessary
};

export default CSVBtn;
