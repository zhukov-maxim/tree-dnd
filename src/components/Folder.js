import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants';

const folderSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

const folderTarget = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    const droppedItemId = monitor.getItem().id;
    props.onDrop(droppedItemId);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
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
    const {
      id, name, children, isSelected, onClick,
      connectDragSource, isDragging,
      connectDropTarget, isOver, canDrop
    } = this.props;

    return (
      <div className="Folder">
        {isOver}
        {
          connectDragSource(
            connectDropTarget(
              <div
                className="element Folder__name"
                style={{
                  opacity: isDragging ? 0.5 : 1,
                  backgroundColor: isSelected ? '#ddd' : null
                }}
                onClick={() => onClick(id)}
              >
                {name}
                {isOver && !canDrop && Folder.renderOverlay('red')}
                {isOver && canDrop && Folder.renderOverlay('green')}
              </div>
            )
          )
        }
        <div className="Folder__content">
          {children}
        </div>
      </div>
    );
  }
}

Folder.propTypes = {
  // TODO: Make dependencies explicit.
  // id: PropTypes.number.isRequired, // It's used in folderSource
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  // onDrop: PropTypes.func.isRequired, // It's used in folderTarget
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

Folder.defaultProps = {
  isSelected: false,
  onClick: undefined,
  children: []
};

export default
  DropTarget(
    [ItemTypes.FILE, ItemTypes.FOLDER], folderTarget, collectTarget)(
      DragSource(ItemTypes.FOLDER, folderSource, collectSource)(Folder)
);
