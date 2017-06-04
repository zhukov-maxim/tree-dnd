import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants';

const folderTarget = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    const droppedItemId = monitor.getItem().id;
    props.onDrop(droppedItemId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Folder extends React.Component {
  static renderOverlay(color) {
    return (
      <div
        className="drop-zone"
        style={{
          backgroundColor: color
        }}
      />
    );
  }

  render() {
    const { name, children, connectDropTarget, isOver, canDrop } = this.props;

    return (
      <div className="Folder">
        {isOver}
        {connectDropTarget(
          <div className="element Folder__name">
            {name}
            {isOver && !canDrop && Folder.renderOverlay('red')}
            {isOver && canDrop && Folder.renderOverlay('green')}
          </div>
        )}
        <div className="Folder__content">
          {children}
        </div>
      </div>
    );
  }
}

Folder.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  // onDrop: PropTypes.func.isRequired, // It's used in folderTarget
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

Folder.defaultProps = {
  children: []
};

export default DropTarget(ItemTypes.FILE, folderTarget, collect)(Folder);
