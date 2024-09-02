document.addEventListener('DOMContentLoaded', () => {
    const botonIniciarSesion = document.getElementById('iniciar-sesion-admin');
    const mensajeError = document.getElementById('mensaje-error-admin');

    botonIniciarSesion.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el envío del formulario
        
        const usuario = document.getElementById('usuario-admin').value.trim();
        const contrasena = document.getElementById('contrasena-admin').value.trim();

        console.log('Usuario:', usuario);
        console.log('Contraseña:', contrasena);

        if (!usuario || !contrasena) {
            mensajeError.textContent = 'Por favor, complete todos los campos.';
            console.log('Campos vacíos');
            return;
        }

        // Ejemplo básico de autenticación
        if (usuario === 'admin' && contrasena === 'admin123') {
            console.log('Autenticación exitosa');
            window.location.href = '/admin.html'; // Asegúrate de que la ruta sea correcta
        } else {
            mensajeError.textContent = 'Usuario o contraseña incorrectos.';
            console.log('Autenticación fallida');
        }
    });
});