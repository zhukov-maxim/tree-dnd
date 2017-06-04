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

    // TODO: Implement movement the source into the target.
    const newFolderStructure = currentfolderStructure;

    console.log(`Moving ${source} to ${target}`);

    this.setState({
      folderStructure: newFolderStructure
    });
  }

  renderFolderStructure(folderStructure) {
    return folderStructure.map(element => this.renderElement(element));
  }

  renderElement(element) {
    if (element.type === ItemTypes.FILE) {
      return (
        <File key={element.id} id={element.id} name={element.name} />
      );
    } else if (element.type === ItemTypes.FOLDER) {
      return (
        <Folder
          key={element.id}
          id={element.id}
          name={element.name}
          onDrop={id => this.handleMoveItem(id, element.id)}
        >
          {
            element.content ?
            this.renderFolderStructure(element.content) :
            null
          }
        </Folder>
      );
    }

    return null;
  }

  render() {
    const { folderStructure } = this.state;

    return (
      <div className="App">
        <TreeView>
          {this.renderFolderStructure(folderStructure)}
        </TreeView>
      </div>
    );
  }
}

App.propTypes = {
  folderStructure: PropTypes.arrayOf(PropTypes.object)
};

App.defaultProps = {
  folderStructure: []
};

export default DragDropContext(HTML5Backend)(App);
