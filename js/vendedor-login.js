document.getElementById('iniciar-sesion').addEventListener('click', () => {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    const vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    const vendedorAutenticado = vendedores.find(v => v.usuario === usuario && v.contrasena === contrasena);

    if (vendedorAutenticado) {
        localStorage.setItem('vendedorAutenticado', JSON.stringify(vendedorAutenticado));
        window.location.href = 'vendedor-panel.html'; // Redirigir a la página de registro de ventas
    } else {
        document.getElementById('mensaje-error').textContent = 'Usuario o contraseña incorrectos';
    }
});
