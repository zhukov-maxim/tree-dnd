import { ItemTypes } from './constants';

const demoFolderStructure = {
  0: {
    type: ItemTypes.ROOT,
    content: [1, 7]
  },
  1: {
    type: ItemTypes.FOLDER,
    name: 'Folder 1',
    content: [2, 3, 6]
  },
  2: {
    type: ItemTypes.FOLDER,
    name: 'Folder 2',
    content: []
  },
  3: {
    type: ItemTypes.FOLDER,
    name: 'Folder 3',
    content: [4, 8, 9, 5, 10, 11]
  },
  4: {
    type: ItemTypes.FOLDER,
    name: 'Folder 4',
    content: []
  },
  5: {
    type: ItemTypes.FILE,
    name: 'File 5'
  },
  6: {
    type: ItemTypes.FILE,
    name: 'File 6'
  },
  7: {
    type: ItemTypes.FILE,
    name: 'File 7'
  },
  8: {
    type: ItemTypes.FILE,
    name: 'File 8'
  },
  9: {
    type: ItemTypes.FOLDER,
    name: 'Folder 9',
    content: []
  },
  10: {
    type: ItemTypes.FILE,
    name: 'File 10'
  },
  11: {
    type: ItemTypes.FILE,
    name: 'File 11'
  }
};

export default demoFolderStructure;
