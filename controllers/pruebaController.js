class PruebaController {
    bienvenida(req, res) {
        res.json({ mensaje: 'Bienvenido a la API REST de la comercializadora de tecnología' });
    }

    verificar(req, res) {
        res.json({ mensaje: 'El servidor funciona correctamente', activo: true });
    }

    recibir(req, res) {
        const { nombre, edad } = req.body || {};

        if (!nombre || edad === undefined || edad === null || edad === '') {
            return res.status(400).json({ mensaje: 'Debe enviar nombre y edad' });
        }
        if (isNaN(Number(edad))) {
            return res.status(400).json({ mensaje: 'La edad debe ser un número' });
        }

        res.json({ mensaje: `Datos recibidos: nombre ${nombre}, edad ${edad}` });
    }

    sumar(req, res) {
        const { numero1, numero2 } = req.body || {};

        if (numero1 === undefined || numero2 === undefined) {
            return res.status(400).json({ mensaje: 'Debe enviar numero1 y numero2' });
        }
        if (isNaN(Number(numero1)) || isNaN(Number(numero2))) {
            return res.status(400).json({ mensaje: 'numero1 y numero2 deben ser números' });
        }

        const resultado = Number(numero1) + Number(numero2);
        res.json({ resultado });
    }
}

module.exports = PruebaController;