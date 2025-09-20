const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { isAuth } = require('../middlewares/auth');

router.get('/', controller.index);
router.get('/new', isAuth, controller.form);
router.post('/new', isAuth, controller.create);
router.get('/edit/:id', isAuth, controller.editForm);
router.post('/edit/:id', isAuth, controller.update);
router.get('/delete/:id', isAuth, controller.delete);

module.exports = router;
