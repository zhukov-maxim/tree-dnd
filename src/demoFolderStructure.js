import { ItemTypes } from './constants';

const demoFILEStructure = {
  0: {
    type: ItemTypes.ROOT,
    content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  1: {
    type: ItemTypes.FILE,
    name: 'Answers'
  },
  2: {
    type: ItemTypes.FILE,
    name: 'Read'
  },
  3: {
    type: ItemTypes.FILE,
    name: 'Unread'
  },
  4: {
    type: ItemTypes.FILE,
    name: 'Empty FILE'
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
    type: ItemTypes.FILE,
    name: 'Another FILE'
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

export default demoFILEStructure;
