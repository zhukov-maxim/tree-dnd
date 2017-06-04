import React from 'react';
import PropTypes from 'prop-types';

const Folder = ({ name, children }) => (
  <div className="Folder">
    <div className="element Folder__name">
      {name}
    </div>
    <div className="Folder__content">
      {children}
    </div>
  </div>
);

Folder.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

Folder.defaultProps = {
  children: []
};

export default Folder;
