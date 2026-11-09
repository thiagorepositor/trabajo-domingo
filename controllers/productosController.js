let conectar = require('../conexion/bd');

class ProductosController {
    validar(datos) {
        const { nombre, precio, stock } = datos || {};

        if (!nombre) {
            return 'El nombre es obligatorio';
        }
        if (precio === undefined || precio === null || precio === '' || isNaN(Number(precio))) {
            return 'El precio es obligatorio y debe ser un número';
        }
        if (Number(precio) < 0) {
            return 'El precio no puede ser negativo';
        }
        if (stock === undefined || stock === null || stock === '' || isNaN(Number(stock))) {
            return 'El stock es obligatorio y debe ser un número';
        }
        if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
            return 'El stock debe ser un número entero mayor o igual a cero';
        }
        return null;
    }

    guardar(req, res) {
        const { nombre, descripcion, precio, stock } = req.body || {};

        const problema = this.validar(req.body || {});
        if (problema) {
            return res.json({ mensaje: problema });
        }

        conectar.query(
            "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
            [nombre, descripcion || null, precio, stock],
            (error) => {
                if (error) {
                    res.json({ mensaje: "error al registrar producto" });
                } else {
                    res.json({ mensaje: "producto registrado correctamente" });
                }
            }
        );
    }

    traer(req, res) {
        conectar.query("SELECT * FROM productos", (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al traer datos de productos" });
            } else {
                res.json(resultados);
            }
        });
    }

    buscar(req, res) {
        const { id } = req.params;
        conectar.query("SELECT * FROM productos WHERE id = ?", [id], (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al buscar producto" });
            } else if (resultados.length === 0) {
                res.json({ mensaje: "producto no encontrado" });
            } else {
                res.json(resultados[0]);
            }
        });
    }

    actualizar(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body || {};

        const problema = this.validar(req.body || {});
        if (problema) {
            return res.json({ mensaje: problema });
        }

        conectar.query(
            "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
            [nombre, descripcion || null, precio, stock, id],
            (error, resultados) => {
                if (error) {
                    res.json({ mensaje: "error al actualizar producto" });
                } else if (resultados.affectedRows === 0) {
                    res.json({ mensaje: "producto no encontrado para actualizar" });
                } else {
                    res.json({ mensaje: "producto actualizado correctamente" });
                }
            }
        );
    }

    eliminar(req, res) {
        const { id } = req.params;
        conectar.query("DELETE FROM productos WHERE id = ?", [id], (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al eliminar producto" });
            } else if (resultados.affectedRows === 0) {
                res.json({ mensaje: "producto no encontrado para eliminar" });
            } else {
                res.json({ mensaje: "producto eliminado correctamente" });
            }
        });
    }

    agotados(req, res) {
        conectar.query("SELECT * FROM productos WHERE stock = 0", (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al consultar productos agotados" });
            } else {
                res.json(resultados);
            }
        });
    }

    bajoStock(req, res) {
        conectar.query("SELECT * FROM productos WHERE stock < 5", (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al consultar productos con bajo stock" });
            } else {
                res.json(resultados);
            }
        });
    }
}

module.exports = ProductosController;