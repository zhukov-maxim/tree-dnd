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
    content: [4, 8, 9, 5, 10, 11]
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
  },
  8: {
    type: ItemTypes.FILE,
    name: 'From Balrog.msg'
  },
  9: {
    type: ItemTypes.FOLDER,
    name: 'Another Folder',
    content: []
  },
  10: {
    type: ItemTypes.FILE,
    name: 'Gandalf'
  },
  11: {
    type: ItemTypes.FILE,
    name: 'Frodo'
  }
};

export default demoFolderStructure;
