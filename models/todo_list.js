const mongoose = require('mongoose');
// creating schema 
const todoListSchema = new mongoose.Schema({
        description: {
            type: 'string',
            required: true,
        },
        category: {
            type: 'string',
            required: true,

        },
        dueDate: {
            type: 'string',
            required: true,

        }


    })
    // giving name to this schema

const TodoList = mongoose.model('TodoList', todoListSchema)
    // export this to use the
module.exports = TodoList;