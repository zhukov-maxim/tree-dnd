import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TreeView from './components/TreeView';
import Folder from './components/Folder';
import File from './components/File';
import { ItemTypes, ItemParts } from './constants';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      folderStructure: props.folderStructure,
      currentItemId: undefined,
      targetItem: {
        id: undefined,
        part: undefined
      }
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

  handleMoveFile(sourceId, targetId, targetPart) {
    if (targetPart === ItemParts.INSERT) {
      return;
    }

    const currentfolderStructure = this.state.folderStructure;

    const newFolderStructure = {
      ...currentfolderStructure
    };

    const entries = Object.entries(newFolderStructure);

    // Remove source from sourceParent.
    const sourceParent = entries.find(item =>
      item[1].content.includes(sourceId)
    );
    const sourceIndex = sourceParent[1].content.indexOf(sourceId);
    sourceParent[1].content.splice(sourceIndex, 1);

    // Find target parent.
    const targetParent = entries.find(item =>
      item[1].content.includes(targetId)
    );

    // Finde target index.
    const targetIndex = targetParent[1].content.indexOf(targetId);

    // Insert source.
    if (targetPart === ItemParts.BEFORE) {
      targetParent[1].content.splice(targetIndex, 0, sourceId);
    } else if (targetPart === ItemParts.AFTER) {
      targetParent[1].content.splice(targetIndex + 1, 0, sourceId);
    }

    this.setState({
      folderStructure: newFolderStructure,
      targetItem: {
        id: undefined,
        part: undefined
      }
    });
  }

  handleHoverTarget(targetId, targetPart) {
    if (targetId === this.state.targetItem.id &&
      targetPart === this.state.targetItem.part) {
      return;
    }

    this.setState({
      targetItem: {
        id: targetId,
        part: targetPart
      }
    });
  }

  handleClick(id) {
    this.setState({
      currentItemId: id
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
          isSelected={id === this.state.currentItemId}
          onClick={clickedId => this.handleClick(clickedId)}
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
          isSelected={id === this.state.currentItemId}
          isTargeted={this.state.targetItem.id === id ? this.state.targetItem.part : false}
          onClick={clickedId => this.handleClick(clickedId)}
          onHoverTarget={(targetId, targetPart) => this.handleHoverTarget(targetId, targetPart)}
          onFileDrop={(sourceId, part) => this.handleMoveFile(sourceId, id, part)}
        />
      );
    }

    return null;
  }

  render() {
    const { folderStructure } = this.state;

    return (
      <div className="App">
        <div className="App__tree-container">
          {this.renderItem(folderStructure, 0)}
        </div>
        <div className="App__content-container">
          {
            this.state.currentItemId &&
              this.state.folderStructure[this.state.currentItemId].name
          }
        </div>
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
