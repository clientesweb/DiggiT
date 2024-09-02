document.addEventListener('DOMContentLoaded', () => {
    const usuarioAutenticado = localStorage.getItem('vendedorAutenticado');

    if (!usuarioAutenticado) {
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión si no está autenticado
        return;
    }

    // Establecer el nombre del usuario
    document.getElementById('nombre-usuario').textContent = usuarioAutenticado;

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