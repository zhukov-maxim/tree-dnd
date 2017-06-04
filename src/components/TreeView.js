import React from 'react';
import PropTypes from 'prop-types';

const TreeView = ({ children }) => (
  <div className="TreeView" style={{ width: '180px' }}>
    {children}
  </div>
);

TreeView.propTypes = {
  children: PropTypes.node
};

TreeView.defaultProps = {
  children: []
};

export default TreeView;
