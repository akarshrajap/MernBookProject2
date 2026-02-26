const express = require('express');
const router = express.Router();


const {createBook, getAllBooks, updateBook, deleteBook} = require("../controllers/taskcontroller");

router.route('/').post(createBook);
router.route('/').get(getAllBooks);
router.route('/:id').put(updateBook);
router.route('/:id').delete(deleteBook);

module.exports = router;