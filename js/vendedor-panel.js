document.addEventListener('DOMContentLoaded', () => {
    const usuarioAutenticado = localStorage.getItem('vendedorAutenticado');
    
    if (!usuarioAutenticado) {
        window.location.href = 'index.html'; // Redirigir a la p�gina de inicio de sesi�n si no est� autenticado
        return;
    }
    
    // Funci�n para mostrar las ventas del vendedor
    function mostrarVentas() {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const usuarioVentas = ventas.filter(v => v.vendedor === usuarioAutenticado);
        
        const tablaVentas = document.getElementById('tabla-ventas').getElementsByTagName('tbody')[0];
        tablaVentas.innerHTML = ''; // Limpiar tabla antes de volver a cargar

        let totalVentas = 0;
        usuarioVentas.forEach(venta => {
            const fila = tablaVentas.insertRow();
            fila.insertCell(0).textContent = venta.perfil;
            fila.insertCell(1).textContent = venta.numeroConfirmacion;
            fila.insertCell(2).textContent = `$${parseFloat(venta.monto).toFixed(2)}`;
            fila.insertCell(3).textContent = venta.entregado;
            totalVentas += parseFloat(venta.monto);
        });

        document.getElementById('total-ventas').textContent = totalVentas.toFixed(2);
    }

    // Funci�n para agregar una nueva venta
    document.getElementById('agregar-venta').addEventListener('click', () => {
        const perfil = document.getElementById('perfil').value;
        const numeroConfirmacion = document.getElementById('numero-confirmacion').value;
        const monto = document.getElementById('monto').value;
        const entregado = document.getElementById('entregado').value;

        if (!usuarioAutenticado || !perfil || !numeroConfirmacion || !monto) {
            document.getElementById('mensaje-error').textContent = 'Por favor, complete todos los campos.';
            return;
        }

        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        ventas.push({
            perfil,
            numeroConfirmacion,
            monto,
            entregado,
            vendedor: usuarioAutenticado
        });
        localStorage.setItem('ventas', JSON.stringify(ventas));

        // Limpiar campos del formulario
        document.getElementById('perfil').value = '';
        document.getElementById('numero-confirmacion').value = '';
        document.getElementById('monto').value = '';
        document.getElementById('entregado').value = 's�';

        mostrarVentas();
    });

    // Funci�n para cerrar sesi�n
    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('vendedorAutenticado');
        window.location.href = 'login.html'; // Redirigir a la p�gina de inicio de sesi�n
    });

    // Mostrar ventas al cargar la p�gina
    mostrarVentas();
});
