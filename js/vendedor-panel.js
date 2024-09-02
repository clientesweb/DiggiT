document.addEventListener('DOMContentLoaded', () => {
    const usuarioAutenticado = localStorage.getItem('vendedorAutenticado');
    
    if (!usuarioAutenticado) {
        window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión si no está autenticado
        return;
    }
    
    // Mostrar nombre del usuario y avatar
    function mostrarUsuario() {
        const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
        document.getElementById('nombre-usuario').textContent = nombreUsuario;
        document.getElementById('avatar-usuario').classList.add('fa', 'fa-user'); // Puedes cambiar el icono si lo deseas
    }

    // Función para mostrar las ventas del vendedor con paginación, filtros y búsqueda
    function mostrarVentas(pagina = 1, filtro = '', busqueda = '') {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const usuarioVentas = ventas.filter(v => v.vendedor === usuarioAutenticado);
        
        // Aplicar filtro y búsqueda
        const ventasFiltradas = usuarioVentas.filter(v =>
            v.perfil.toLowerCase().includes(busqueda.toLowerCase())
        ).filter(v =>
            filtro === '' || v.entregado === filtro
        );

        // Implementar paginación
        const itemsPorPagina = 5;
        const totalPaginas = Math.ceil(ventasFiltradas.length / itemsPorPagina);
        const ventasPaginas = ventasFiltradas.slice((pagina - 1) * itemsPorPagina, pagina * itemsPorPagina);

        const tablaVentas = document.getElementById('tabla-ventas').getElementsByTagName('tbody')[0];
        tablaVentas.innerHTML = ''; // Limpiar tabla antes de volver a cargar

        let totalVentas = 0;
        ventasPaginas.forEach(venta => {
            const fila = tablaVentas.insertRow();
            fila.insertCell(0).textContent = venta.perfil;
            fila.insertCell(1).textContent = venta.numeroConfirmacion;
            fila.insertCell(2).textContent = `$${parseFloat(venta.monto).toFixed(2)}`;
            fila.insertCell(3).textContent = venta.entregado;
            totalVentas += parseFloat(venta.monto);
        });

        document.getElementById('total-ventas').textContent = totalVentas.toFixed(2);

        // Actualizar paginación
        const paginacion = document.getElementById('paginacion');
        paginacion.innerHTML = '';
        for (let i = 1; i <= totalPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.classList.add('pagination-button');
            if (i === pagina) {
                boton.classList.add('active');
            }
            boton.addEventListener('click', () => mostrarVentas(i, filtro, busqueda));
            paginacion.appendChild(boton);
        }
    }

    // Función para agregar una nueva venta
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
        document.getElementById('entregado').value = 'sí';

        mostrarVentas();
    });

    // Función para cerrar sesión
    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('vendedorAutenticado');
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    });

    // Función para aplicar filtros
    document.getElementById('filtro-entregado').addEventListener('change', () => {
        const filtro = document.getElementById('filtro-entregado').value;
        mostrarVentas(1, filtro, document.getElementById('busqueda').value);
    });

    // Función para buscar ventas
    document.getElementById('busqueda').addEventListener('input', () => {
        mostrarVentas(1, document.getElementById('filtro-entregado').value, document.getElementById('busqueda').value);
    });

    // Mostrar ventas y usuario al cargar la página
    mostrarVentas();
    mostrarUsuario();
});