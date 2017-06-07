import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TreeView from './components/TreeView';
import Folder from './components/Folder';
import File from './components/File';
import ItemTypes from './constants';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      folderStructure: props.folderStructure
    };
  }

  handleMoveItem(source, target) {
    const currentfolderStructure = this.state.folderStructure;

    const newFolderStructure = {
      ...currentfolderStructure
    };

    const entries = Object.entries(newFolderStructure);

    // Remove source from previous folder.
    entries.map((item) => {
      if (item[1].type === ItemTypes.FILE) {
        return item;
      } else if (item[1].content.includes(source)) {
        const index = item[1].content.indexOf(source);
        item[1].content.splice(index, 1);
      }
      return item;
    });

    // Put source to target folder.
    newFolderStructure[target].content.push(source);

    this.setState({
      folderStructure: newFolderStructure
    });
  }

  handleChangeOrder(id, nextIndex) {
    const currentfolderStructure = this.state.folderStructure;

    const newFolderStructure = {
      ...currentfolderStructure
    };

    const entries = Object.entries(newFolderStructure);

    const parent = entries.find(item =>
      item[1].type !== ItemTypes.FILE && item[1].content.includes(id)
    );

    const currentIndex = parent[1].content.indexOf(id);

    // Remove from the currentIndex.
    parent[1].content.splice(currentIndex, 1);

    // Insert to the nextIndex.
    parent[1].content.splice(nextIndex, 0, id);

    this.setState({
      folderStructure: newFolderStructure
    });
  }

  renderItem(structure, id, index = 0) {
    const item = structure[id];

    if (item.type === ItemTypes.ROOT) {
      return (
        <TreeView>
          {item.content.map((childId, childIndex) =>
            this.renderItem(structure, childId, childIndex))}
        </TreeView>
      );
    } else if (item.type === ItemTypes.FOLDER) {
      return (
        <Folder
          key={id}
          id={id}
          name={item.name}
          onDrop={sourceId => this.handleMoveItem(sourceId, id)}
        >
          {item.content.map((childId, childIndex) =>
            this.renderItem(structure, childId, childIndex))}
        </Folder>
      );
    } else if (item.type === ItemTypes.FILE) {
      return (
        <File
          key={id}
          id={id}
          index={index}
          name={item.name}
          onChangeOrder={(dragId, nextIndex) =>
            this.handleChangeOrder(dragId, nextIndex)}
        />
      );
    }

    return null;
  }

  render() {
    const { folderStructure } = this.state;

    return (
      <div className="App">
        {this.renderItem(folderStructure, 0)}
      </div>
    );
  }
}

App.propTypes = {
  // TODO: Specify shapes.
  folderStructure: PropTypes.PropTypes.objectOf(PropTypes.object)
};

App.defaultProps = {
  folderStructure: []
};

export default DragDropContext(HTML5Backend)(App);
