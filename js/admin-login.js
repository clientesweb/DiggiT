document.addEventListener('DOMContentLoaded', () => {
    const botonIniciarSesion = document.getElementById('iniciar-sesion-admin');
    const mensajeError = document.getElementById('mensaje-error-admin');
    
    botonIniciarSesion.addEventListener('click', () => {
        const usuario = document.getElementById('usuario-admin').value.trim();
        const contrasena = document.getElementById('contrasena-admin').value.trim();

        if (!usuario || !contrasena) {
            mensajeError.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        // Aquí debes implementar la lógica de autenticación real.
        // Ejemplo básico:
        if (usuario === '' && contrasena === '') {
            // Redirigir a la página del panel de administrador
            window.location.href = 'admin.html';
        } else {
            mensajeError.textContent = 'Usuario o contraseña incorrectos.';
        }
    });
});