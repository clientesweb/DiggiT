document.addEventListener('DOMContentLoaded', () => {
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const botonIniciarSesion = document.getElementById('iniciar-sesion');
    const mensajeError = document.getElementById('mensaje-error');

    // Datos de ejemplo. En un entorno real, deberías obtener estos datos de una base de datos segura
    const usuariosValidos = [
        { nombre: 'vendedor1', contrasena: '1234' },
        { nombre: 'vendedor2', contrasena: '5678' }
    ];

    botonIniciarSesion.addEventListener('click', () => {
        const usuario = usuarioInput.value.trim();
        const contrasena = contrasenaInput.value.trim();

        const usuarioValido = usuariosValidos.find(u => u.nombre === usuario && u.contrasena === contrasena);

        if (usuarioValido) {
            localStorage.setItem('vendedorAutenticado', usuario);
            window.location.href = 'vendedor-panel.html'; // Redirigir al panel del vendedor
        } else {
            mensajeError.textContent = 'Nombre de usuario o contraseña incorrectos.';
        }
    });
});
