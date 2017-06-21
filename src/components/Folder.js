import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes, ItemParts } from '../constants';

const folderSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

const folderTarget = {
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

  canDrop() {
    return true;
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
    } else {
      props.onFileDrop(droppedItemId, ItemParts.INSIDE);
    }
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

const Folder = ({ id, name, children, isSelected, isTargeted, onClick,
      collapsed, onClickToggle,
      connectDragSource, isDragging,
      connectDropTarget }) => (
        <div className={'Folder ' + (collapsed ? 'Folder_collapsed' : null)}>
          <div className="Folder__toggle" onClick={() => onClickToggle(id)} />
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
                  {isTargeted === ItemParts.BEFORE && <div className="drop-line drop-line_before" />}
                  {name}
                  {isTargeted === ItemParts.INSIDE && <div className="drop-area" />}
                  {isTargeted === ItemParts.AFTER && <div className="drop-line drop-line_after" />}
                </div>
              )
            )
          }
          <div className="Folder__content">
            {children}
          </div>
        </div>
);

Folder.propTypes = {
  // TODO: Make dependencies explicit.
  // id: PropTypes.number.isRequired, // It's used in folderSource
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isTargeted: PropTypes.oneOf([
    false,
    ItemParts.BEFORE,
    ItemParts.INSIDE,
    ItemParts.AFTER
  ]),
  onClick: PropTypes.func,
  collapsed: PropTypes.bool,
  onClickToggle: PropTypes.func,
  // onFileDrop: PropTypes.func.isRequired, // It's used in folderTarget
  children: PropTypes.node,
  // onDrop: PropTypes.func.isRequired, // It's used in folderTarget
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

Folder.defaultProps = {
  isSelected: false,
  isTargeted: false,
  onClick: undefined,
  collapsed: false,
  onClickToggle: undefined,
  children: []
};

export default
  DropTarget(
    [ItemTypes.FILE, ItemTypes.FOLDER], folderTarget, collectTarget)(
      DragSource(ItemTypes.FOLDER, folderSource, collectSource)(Folder)
);
