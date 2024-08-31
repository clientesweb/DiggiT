document.addEventListener('DOMContentLoaded', () => {
    const btnRegistrarVenta = document.getElementById('registrar-venta');

    btnRegistrarVenta.addEventListener('click', () => {
        // Obtener los valores de los campos del formulario
        const perfil = document.getElementById('perfil').value;
        const numeroConfirmacion = document.getElementById('numeroConfirmacion').value;
        const monto = parseFloat(document.getElementById('monto').value);
        const entregado = document.getElementById('entregado').checked;

        // Validar los campos (esto es opcional si ya usas el atributo 'required' en HTML)
        if (!perfil || !numeroConfirmacion || isNaN(monto)) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        // Crear un objeto para almacenar la venta
        const venta = {
            perfil,
            numeroConfirmacion,
            monto,
            entregado,
            fecha: new Date().toISOString() // Agregar la fecha de la venta
        };

        // Almacenar la venta en LocalStorage
        let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        ventas.push(venta);
        localStorage.setItem('ventas', JSON.stringify(ventas));

        // Limpiar el formulario
        document.getElementById('perfil').value = '';
        document.getElementById('numeroConfirmacion').value = '';
        document.getElementById('monto').value = '';
        document.getElementById('entregado').checked = false;

        alert('Venta registrada con éxito!');
    });
});
