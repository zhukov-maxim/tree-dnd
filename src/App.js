import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TreeView from './components/TreeView';
import Folder from './components/Folder';
import File from './components/File';
import ItemTypes from './constants';

class App extends React.Component {
  static renderElement(element) {
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
          onDrop={id => console.log(`Dropped file id: ${id}`)}
        >
          {
            element.content ?
            App.renderFolderStructure(element.content) :
            null
          }
        </Folder>
      );
    }

    return null;
  }

  static renderFolderStructure(folderStructure) {
    return folderStructure.map(element => App.renderElement(element));
  }

  render() {
    const { folderStructure } = this.props;

    return (
      <div className="App">
        <TreeView>
          {App.renderFolderStructure(folderStructure)}
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
