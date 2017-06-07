import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants';

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
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves.
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen.
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle.
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position.
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top.
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the item's height.
    // When dragging downwards, only move when the cursor is below 50%.
    // When dragging upwards, only move when the cursor is above 50%.

    // Dragging downwards.
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards.
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Change order.
    const dragId = monitor.getItem().id;
    props.onChangeOrder(dragId, hoverIndex);
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

const File = ({ name, connectDragSource, isDragging, connectDropTarget }) => (
  connectDragSource(
    connectDropTarget(
      <div className="element File" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {name}
      </div>
    )
  )
);

File.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onChangeOrder: PropTypes.func.isRequired
};

export default
  DropTarget(
    [ItemTypes.FILE, ItemTypes.FOLDER], fileTarget, collectTarget)(
      DragSource(ItemTypes.FILE, fileSource, collectSource)(File)
  );
