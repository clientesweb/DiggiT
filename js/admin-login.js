document.addEventListener('DOMContentLoaded', () => {
    const botonIniciarSesion = document.getElementById('iniciar-sesion-admin');
    const mensajeError = document.getElementById('mensaje-error-admin');
    
    botonIniciarSesion.addEventListener('click', () => {
        const usuario = 'admin' document.getElementById('usuario-admin').value.trim();
        const contrasena = 'admin123' document.getElementById('contrasena-admin').value.trim();

        if (!usuario || !contrasena) {
            mensajeError.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        // Aquí debes implementar la lógica de autenticación real.
        // Ejemplo básico:
        if (usuario === 'admin' && contrasena === 'admin123') {
            // Redirigir a la página del panel de administrador
            window.location.href = 'admin.html';
        } else {
            mensajeError.textContent = 'Usuario o contraseña incorrectos.';
        }
    });
});