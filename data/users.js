const bcrypt = require('bcryptjs');

// user storage
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('user123', 10),
    role: 'user'
  },
   {
    id: 3,
    username: 'udayan',
    password: bcrypt.hashSync('Udayan@123', 10),
    role: 'admin'
  }
];

module.exports = { users }; 