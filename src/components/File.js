import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes, ItemParts } from '../constants';

const fileSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const fileTarget = {
  hover(props, monitor, component) {
    // Determine rectangle on screen.
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const threshold = 0.2;

    // Get top and bottom quarters.
    const hoverTopPartY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * threshold;
    const hoverBottomPartY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * (1 - threshold);

    // Determine mouse position.
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top.
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // TODO: (Rewrite) The target is hovered and we need to show its dropzones:
    if (hoverClientY < hoverTopPartY) {
      props.onHoverTarget(props.id, ItemParts.BEFORE);
    } else if (hoverClientY > hoverBottomPartY) {
      props.onHoverTarget(props.id, ItemParts.AFTER);
    } else {
      props.onHoverTarget(props.id, ItemParts.INSIDE);
    }
  },

  drop(props, monitor, component) {
    const droppedItemId = monitor.getItem().id;

    // Determine rectangle on screen.
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const threshold = 0.2;

    // Get top and bottom quarters.
    const hoverTopPartY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * threshold;
    const hoverBottomPartY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * (1 - threshold);

    // Determine mouse position.
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top.
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // TODO: (Rewrite) The target is hovered and we need to show its dropzones:
    if (hoverClientY < hoverTopPartY) {
      props.onFileDrop(droppedItemId, ItemParts.BEFORE);
    } else if (hoverClientY > hoverBottomPartY) {
      props.onFileDrop(droppedItemId, ItemParts.AFTER);
    }
  }
};

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const File = ({ id, name, isSelected, isTargeted, onClick, connectDragSource, isDragging, connectDropTarget }) => (
  connectDragSource(
    connectDropTarget(
      <div
        className="element File"
        style={{
          opacity: isDragging ? 0.3 : 1,
          backgroundColor: isSelected ? '#ddd' : null
        }}
        onClick={() => onClick(id)}
      >
        { isTargeted === ItemParts.BEFORE && <div className="drop-line drop-line_before" /> }
        {name}
        { isTargeted === ItemParts.AFTER && <div className="drop-line drop-line_after" /> }
      </div>
    )
  )
);

File.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isTargeted: PropTypes.oneOf([
    false,
    ItemParts.BEFORE,
    ItemParts.INSIDE,
    ItemParts.AFTER
  ]),
  onClick: PropTypes.func,
  // onFileDrop: PropTypes.func.isRequired, // It's used in folderTarget
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onHoverTarget: PropTypes.func.isRequired
};

export default
  DropTarget(
    [ItemTypes.FILE, ItemTypes.FOLDER], fileTarget, collectTarget)(
      DragSource(ItemTypes.FILE, fileSource, collectSource)(File)
  );
