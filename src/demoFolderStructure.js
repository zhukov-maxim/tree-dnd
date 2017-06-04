import { FILE, FOLDER } from './constants';

const demoFolderStructure = [
  {
    type: FOLDER,
    name: 'Answers',
    content: [
      {
        type: FOLDER,
        name: 'Read'
      },
      {
        type: FOLDER,
        name: 'Unread',
        content: [
          {
            type: FOLDER,
            name: 'Empty Folder'
          },
          {
            type: FILE,
            name: 'From Baleog.msg'
          }
        ]
      },
      {
        type: FILE,
        name: 'From Olaf.msg'
      }
    ]
  },
  {
    type: FILE,
    name: 'From Erik.msg'
  }
];

export default demoFolderStructure;
