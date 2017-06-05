import ItemTypes from './constants';

const demoFolderStructure = {
  0: {
    type: ItemTypes.ROOT,
    content: [1, 7]
  },
  1: {
    type: ItemTypes.FOLDER,
    name: 'Answers',
    content: [2, 3, 6]
  },
  2: {
    type: ItemTypes.FOLDER,
    name: 'Read',
    content: []
  },
  3: {
    type: ItemTypes.FOLDER,
    name: 'Unread',
    content: [4, 5]
  },
  4: {
    type: ItemTypes.FOLDER,
    name: 'Empty Folder',
    content: []
  },
  5: {
    type: ItemTypes.FILE,
    name: 'From Baleog.msg'
  },
  6: {
    type: ItemTypes.FILE,
    name: 'From Olaf.msg'
  },
  7: {
    type: ItemTypes.FILE,
    name: 'From Erik.msg'
  }
};

export default demoFolderStructure;
