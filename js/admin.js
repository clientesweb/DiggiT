document.addEventListener('DOMContentLoaded', () => {
    const tablaVentasBody = document.querySelector('#tabla-ventas tbody');
    const totalVentasElem = document.getElementById('total-ventas');
    const graficoPorProducto = document.getElementById('grafico-por-producto').getContext('2d');
    const graficoPorVendedor = document.getElementById('grafico-por-vendedor').getContext('2d');
    const btnLimpiarDatos = document.getElementById('limpiar-datos');

    // Verificar autenticaci�n
    const adminAutenticado = localStorage.getItem('adminAutenticado');
    if (adminAutenticado !== 'true') {
        window.location.href = 'admin-login.html'; // Redirigir al login si no est� autenticado
        return;
    }

    // Funci�n para cargar todas las ventas y crear gr�ficos
    function cargarVentas() {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        tablaVentasBody.innerHTML = '';
        let totalMonto = 0;
        const productos = {};
        const vendedores = {};

        ventas.forEach(venta => {
            // A�adir fila a la tabla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venta.vendedor}</td>
                <td>${venta.perfil}</td>
                <td>${venta.numeroConfirmacion}</td>
                <td>$${parseFloat(venta.monto).toFixed(2)}</td>
                <td>${venta.entregado ? 'S�' : 'No'}</td>
            `;
            tablaVentasBody.appendChild(row);
            totalMonto += parseFloat(venta.monto);

            // Contar ventas por producto y vendedor
            if (!productos[venta.perfil]) {
                productos[venta.perfil] = 0;
            }
            productos[venta.perfil] += parseFloat(venta.monto);

            if (!vendedores[venta.vendedor]) {
                vendedores[venta.vendedor] = 0;
            }
            vendedores[venta.vendedor] += parseFloat(venta.monto);
        });

        // Mostrar total de ventas
        totalVentasElem.textContent = totalMonto.toFixed(2);

        // Crear gr�ficos
        crearGraficoPorProducto(Object.keys(productos), Object.values(productos));
        crearGraficoPorVendedor(Object.keys(vendedores), Object.values(vendedores));
    }

    // Funci�n para crear gr�fico por producto
    function crearGraficoPorProducto(productos, montos) {
        new Chart(graficoPorProducto, {
            type: 'bar',
            data: {
                labels: productos,
                datasets: [{
                    label: 'Ventas por Producto',
                    data: montos,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Funci�n para crear gr�fico por vendedor
    function crearGraficoPorVendedor(vendedores, montos) {
        new Chart(graficoPorVendedor, {
            type: 'pie',
            data: {
                labels: vendedores,
                datasets: [{
                    label: 'Ventas por Vendedor',
                    data: montos,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }

    // Funci�n para cerrar sesi�n
    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('adminAutenticado');
        window.location.href = 'admin-login.html'; // Redirigir al login
    });

    // Funci�n para limpiar todos los datos
    btnLimpiarDatos.addEventListener('click', () => {
        if (confirm('�Est�s seguro de que deseas eliminar todos los datos?')) {
            localStorage.removeItem('ventas'); // Limpiar ventas
            cargarVentas(); // Recargar la tabla y gr�ficos vac�os
        }
    });

    // Inicializar
    cargarVentas();
});
