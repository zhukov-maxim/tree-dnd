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

  renerItem(structure, id) {
    const item = structure[id];

    if (item.type === ItemTypes.ROOT) {
      return (
        <TreeView>
          {item.content.map(childId => this.renerItem(structure, childId))}
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
          {item.content.sort((a, b) => {
            // Folders go before files.
            if (structure[a].type === ItemTypes.FOLDER &&
              structure[b].type === ItemTypes.FILE) {
              return -1;
            } else if (structure[a].type === ItemTypes.FILE &&
              structure[b].type === ItemTypes.FOLDER) {
              return 1;
            }

            // Sort by name.
            if (structure[a].name < structure[b].name) {
              return -1;
            } else if (structure[a].name > structure[b].name) {
              return 1;
            }
            return 0;
          }).map(childId => this.renerItem(structure, childId))}
        </Folder>
      );
    } else if (item.type === ItemTypes.FILE) {
      return (
        <File key={id} id={id} name={item.name} />
      );
    }

    return null;
  }

  render() {
    const { folderStructure } = this.state;

    return (
      <div className="App">
        {this.renerItem(folderStructure, 0)}
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
