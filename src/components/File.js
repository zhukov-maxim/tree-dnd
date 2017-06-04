import React from 'react';
import PropTypes from 'prop-types';

const File = ({ name }) => (
  <div className="element File">
    {name}
  </div>
);

File.propTypes = {
  name: PropTypes.string.isRequired
};

export default File;
