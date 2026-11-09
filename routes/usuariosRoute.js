const mysql = require('mysql2');
const express = require('express');
const UsuariosController = require('../controllers/usuariosController');

const router = express.Router();
const usuariosC = new UsuariosController();

router.post('/usuarios', usuariosC.guardar);
router.get('/usuarios', usuariosC.traer);
router.get('/usuarios/:id', usuariosC.buscar);
router.put('/usuarios/:id', usuariosC.actualizar);
router.delete('/usuarios/:id', usuariosC.eliminar);

module.exports = router;