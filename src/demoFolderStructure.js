import ItemTypes from './constants';

const demoFolderStructure = [
  {
    id: 1,
    type: ItemTypes.FOLDER,
    name: 'Answers',
    content: [
      {
        id: 2,
        type: ItemTypes.FOLDER,
        name: 'Read'
      },
      {
        id: 3,
        type: ItemTypes.FOLDER,
        name: 'Unread',
        content: [
          {
            id: 4,
            type: ItemTypes.FOLDER,
            name: 'Empty Folder'
          },
          {
            id: 5,
            type: ItemTypes.FILE,
            name: 'From Baleog.msg'
          }
        ]
      },
      {
        id: 6,
        type: ItemTypes.FILE,
        name: 'From Olaf.msg'
      }
    ]
  },
  {
    id: 7,
    type: ItemTypes.FILE,
    name: 'From Erik.msg'
  }
];

export default demoFolderStructure;
