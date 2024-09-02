document.addEventListener('DOMContentLoaded', () => {
    const usuarioAutenticado = localStorage.getItem('vendedorAutenticado');
    
    if (!usuarioAutenticado) {
        window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión si no está autenticado
        return;
    }

    const usuarioNombreElement = document.getElementById('usuario-nombre');
    usuarioNombreElement.textContent = usuarioAutenticado; // Nombre de usuario en el panel

    // Función para mostrar las ventas del vendedor
    function mostrarVentas(pagina = 1, porPagina = 10) {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const usuarioVentas = ventas.filter(v => v.vendedor === usuarioAutenticado);

        const tablaVentas = document.getElementById('tabla-ventas').getElementsByTagName('tbody')[0];
        tablaVentas.innerHTML = ''; // Limpiar tabla antes de volver a cargar

        const totalVentas = usuarioVentas.reduce((total, venta) => total + parseFloat(venta.monto), 0);
        document.getElementById('total-ventas').textContent = totalVentas.toFixed(2);

        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        const ventasPagina = usuarioVentas.slice(inicio, fin);

        ventasPagina.forEach(venta => {
            const fila = tablaVentas.insertRow();
            fila.insertCell(0).textContent = venta.perfil;
            fila.insertCell(1).textContent = venta.numeroConfirmacion;
            fila.insertCell(2).textContent = `$${parseFloat(venta.monto).toFixed(2)}`;
            fila.insertCell(3).textContent = venta.entregado;
        });
        
        // Actualizar paginación
        document.getElementById('pagina-anterior').disabled = pagina <= 1;
        document.getElementById('pagina-siguiente').disabled = pagina >= Math.ceil(usuarioVentas.length / porPagina);
    }

    // Función para agregar una nueva venta
    document.getElementById('agregar-venta').addEventListener('click', () => {
        const perfil = document.getElementById('perfil').value;
        const numeroConfirmacion = document.getElementById('numero-confirmacion').value;
        const monto = document.getElementById('monto').value;
        const entregado = document.getElementById('entregado').value;

        if (!perfil || !numeroConfirmacion || !monto) {
            mostrarNotificacion('Por favor, complete todos los campos.', 'error');
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

        mostrarVentas(); // Actualizar la lista de ventas
    });

    // Función para cerrar sesión
    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('vendedorAutenticado');
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    });

    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje, tipo) {
        const notificaciones = document.getElementById('notificaciones');
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        notificaciones.appendChild(notificacion);
        setTimeout(() => notificaciones.removeChild(notificacion), 5000); // Ocultar después de 5 segundos
    }

    // Función para manejar la búsqueda y filtros
    document.getElementById('filtro-busqueda').addEventListener('input', (e) => {
        const valorBusqueda = e.target.value.toLowerCase();
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const usuarioVentas = ventas.filter(v => v.vendedor === usuarioAutenticado);
        const ventasFiltradas = usuarioVentas.filter(venta => 
            venta.perfil.toLowerCase().includes(valorBusqueda) ||
            venta.numeroConfirmacion.toLowerCase().includes(valorBusqueda)
        );
        mostrarVentasFiltradas(ventasFiltradas);
    });

    // Función para actualizar la tabla con ventas filtradas
    function mostrarVentasFiltradas(ventasFiltradas, pagina = 1, porPagina = 10) {
        const tablaVentas = document.getElementById('tabla-ventas').getElementsByTagName('tbody')[0];
        tablaVentas.innerHTML = ''; // Limpiar tabla antes de volver a cargar

        const totalVentas = ventasFiltradas.reduce((total, venta) => total + parseFloat(venta.monto), 0);
        document.getElementById('total-ventas').textContent = totalVentas.toFixed(2);

        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        const ventasPagina = ventasFiltradas.slice(inicio, fin);

        ventasPagina.forEach(venta => {
            const fila = tablaVentas.insertRow();
            fila.insertCell(0).textContent = venta.perfil;
            fila.insertCell(1).textContent = venta.numeroConfirmacion;
            fila.insertCell(2).textContent = `$${parseFloat(venta.monto).toFixed(2)}`;
            fila.insertCell(3).textContent = venta.entregado;
        });

        // Actualizar paginación
        document.getElementById('pagina-anterior').disabled = pagina <= 1;
        document.getElementById('pagina-siguiente').disabled = pagina >= Math.ceil(ventasFiltradas.length / porPagina);
    }

    // Función para manejar la paginación
    let paginaActual = 1;
    document.getElementById('pagina-anterior').addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarVentas(paginaActual);
        }
    });
    document.getElementById('pagina-siguiente').addEventListener('click', () => {
        paginaActual++;
        mostrarVentas(paginaActual);
    });

    // Inicialización
    mostrarVentas();
});