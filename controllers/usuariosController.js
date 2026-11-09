let conectar = require('../conexion/bd');

class UsuariosController {
    guardar(req, res) {
        const { nombre, apellido, direccion, telefono } = req.body;
        conectar.query(
            "INSERT INTO usuarios (nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?)",
            [nombre, apellido, direccion, telefono],
            (error) => {
                if (error) {
                    res.json({ mensaje: "error al registrar usuario" });
                } else {
                    res.json({ mensaje: "usuario registrado correctamente" });
                }
            }
        );
    }

    traer(req, res) {
        conectar.query("SELECT * FROM usuarios", (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al traer datos de usuario" });
            } else {
                res.json(resultados);
            }
        });
    }

    buscar(req, res) {
        const { id } = req.params;
        conectar.query("SELECT * FROM usuarios WHERE id = ?", [id], (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al buscar usuario" });
            } else if (resultados.length === 0) {
                res.json({ mensaje: "usuario no encontrado" });
            } else {
                res.json(resultados[0]);
            }
        });
    }

    actualizar(req, res) {
        const { id } = req.params;
        const { nombre, apellido, direccion, telefono } = req.body;
        conectar.query(
            "UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE id = ?",
            [nombre, apellido, direccion, telefono, id],
            (error, resultados) => {
                if (error) {
                    res.json({ mensaje: "error al actualizar usuario" });
                } else if (resultados.affectedRows === 0) {
                    res.json({ mensaje: "usuario no encontrado para actualizar" });
                } else {
                    res.json({ mensaje: "usuario actualizado correctamente" });
                }
            }
        );
    }

    eliminar(req, res) {
        const { id } = req.params;
        conectar.query("DELETE FROM usuarios WHERE id = ?", [id], (error, resultados) => {
            if (error) {
                res.json({ mensaje: "error al eliminar usuario" });
            } else if (resultados.affectedRows === 0) {
                res.json({ mensaje: "usuario no encontrado para eliminar" });
            } else {
                res.json({ mensaje: "usuario eliminado correctamente" });
            }
        });
    }
}

module.exports = UsuariosController;