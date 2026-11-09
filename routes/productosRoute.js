const express = require('express');
const ProductosController = require('../controllers/productosController');

const router = express.Router();
const productosC = new ProductosController();

router.post('/productos', productosC.guardar.bind(productosC));
router.get('/productos', productosC.traer);

// Rutas fijas antes de /productos/:id
router.get('/productos/agotados', productosC.agotados);
router.get('/productos/bajo-stock', productosC.bajoStock);

router.get('/productos/:id', productosC.buscar);
router.put('/productos/:id', productosC.actualizar.bind(productosC));
router.delete('/productos/:id', productosC.eliminar);

module.exports = router;