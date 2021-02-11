import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin",
        email: "admin@campus-market.com",
        password: bcrypt.hashSync('123456', 10), 
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync('123456', 10), 
        // isAdmin default to false
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync('123456', 10), 
    },   
]

export default users;