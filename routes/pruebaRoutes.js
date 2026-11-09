const express = require('express');
const PruebaController = require('../controllers/pruebaController');

const router = express.Router();
const pruebaC = new PruebaController();

router.get('/bienvenida', pruebaC.bienvenida);
router.get('/verificar', pruebaC.verificar);
router.post('/recibir', pruebaC.recibir);
router.post('/sumar', pruebaC.sumar);

module.exports = router;