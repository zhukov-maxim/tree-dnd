import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from '../constants';

const fileSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const File = ({ name, connectDragSource, isDragging }) => (
  connectDragSource(
    <div className="element File" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
    </div>
  )
);

File.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.FILE, fileSource, collect)(File);
