document.addEventListener('DOMContentLoaded', () => {
    const usuarioAutenticado = localStorage.getItem('vendedorAutenticado');

    if (!usuarioAutenticado) {
        window.location.href = 'login.htm'; // Redirigir a la página de inicio de sesión si no está autenticado
        return;
    }

    // Función para mostrar las ventas del vendedor
    function mostrarVentas(pagina = 1) {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const usuarioVentas = ventas.filter(v => v.vendedor === usuarioAutenticado);

        const filtro = document.getElementById('filtro-ventas').value.toLowerCase();
        const ventasFiltradas = usuarioVentas.filter(v =>
            v.perfil.toLowerCase().includes(filtro) ||
            v.numeroConfirmacion.toLowerCase().includes(filtro)
        );

        const itemsPorPagina = 10;
        const totalPaginas = Math.ceil(ventasFiltradas.length / itemsPorPagina);
        const ventasPagina = ventasFiltradas.slice((pagina - 1) * itemsPorPagina, pagina * itemsPorPagina);

        const tablaVentas = document.getElementById('tabla-ventas').getElementsByTagName('tbody')[0];
        tablaVentas.innerHTML = ''; // Limpiar tabla antes de volver a cargar

        let totalVentas = 0;
        ventasPagina.forEach(venta => {
            const fila = tablaVentas.insertRow();
            fila.insertCell(0).textContent = venta.perfil;
            fila.insertCell(1).textContent = venta.numeroConfirmacion;
            fila.insertCell(2).textContent = `$${parseFloat(venta.monto).toFixed(2)}`;
            fila.insertCell(3).textContent = venta.entregado;
            totalVentas += parseFloat(venta.monto);
        });

        document.getElementById('total-ventas').textContent = totalVentas.toFixed(2);

        // Actualizar la paginación
        const paginaAnterior = document.getElementById('pagina-anterior');
        const paginaSiguiente = document.getElementById('pagina-siguiente');
        paginaAnterior.classList.toggle('disabled', pagina <= 1);
        paginaSiguiente.classList.toggle('disabled', pagina >= totalPaginas);

        paginaAnterior.dataset.page = pagina - 1;
        paginaSiguiente.dataset.page = pagina + 1;
    }

    // Función para agregar una nueva venta
    document.getElementById('agregar-venta').addEventListener('click', () => {
        const perfil = document.getElementById('perfil').value;
        const numeroConfirmacion = document.getElementById('numero-confirmacion').value;
        const monto = document.getElementById('monto').value;
        const entregado = document.getElementById('entregado').value;

        if (!usuarioAutenticado || !perfil || !numeroConfirmacion || !monto) {
            mostrarNotificacion('error', 'Por favor, complete todos los campos.');
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
        document.getElementById('entregado').value = 'sí';

        mostrarVentas();
        mostrarNotificacion('success', 'Venta agregada exitosamente.');
    });

    // Función para mostrar notificaciones
    function mostrarNotificacion(tipo, mensaje) {
        const notificacion = document.getElementById('notificacion');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        notificacion.style.display = 'block';
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 5000);
    }

    // Función para cerrar sesión
    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('vendedorAutenticado');
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    });

    // Función para manejar el cambio de página en la paginación
    document.querySelectorAll('.pagination-button').forEach(button => {
        button.addEventListener('click', () => {
            const pagina = parseInt(button.dataset.page, 10);
            if (pagina > 0) {
                mostrarVentas(pagina);
            }
        });
    });

    // Función para filtrar ventas
    document.getElementById('filtro-ventas').addEventListener('input', () => {
        mostrarVentas();
    });

    // Mostrar ventas al cargar la página
    mostrarVentas();
});