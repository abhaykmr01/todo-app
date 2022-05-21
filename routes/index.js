const express = require('express');

// creating a router
const router = express.Router();
console.log("router looaded")
const homeController = require('../controllers/home_controller');
// for home page
// router accessing the homecontroller
router.get('/', homeController.home);

router.post('/update_todo/', homeController.updateTodo);
router.post('/add_todo/', homeController.addTodo);
router.post('/delete_todo/', homeController.deleteTodo);

module.exports = router;