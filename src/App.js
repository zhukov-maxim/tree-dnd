import React from 'react';
import PropTypes from 'prop-types';
import TreeView from './components/TreeView';
import Folder from './components/Folder';
import File from './components/File';
import { FILE, FOLDER } from './constants';

class App extends React.Component {
  static renderElement(element) {
    if (element.type === FILE) {
      return (
        <File key={element.name} name={element.name} />
      );
    } else if (element.type === FOLDER) {
      return (
        <Folder key={element.name} name={element.name}>
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

export default App;
