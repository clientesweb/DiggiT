document.addEventListener('DOMContentLoaded', () => {
            const botonIniciarSesion = document.getElementById('iniciar-sesion-admin');
            const mensajeError = document.getElementById('mensaje-error-admin');

            botonIniciarSesion.addEventListener('click', (event) => {
                event.preventDefault(); // Evita el envío del formulario
                
                const usuario = document.getElementById('usuario-admin').value.trim();
                const contrasena = document.getElementById('contrasena-admin').value.trim();

                if (!usuario || !contrasena) {
                    mensajeError.textContent = 'Por favor, complete todos los campos.';
                    return;
                }

                // Ejemplo básico de autenticación
                if (usuario === 'admin' && contrasena === 'admin123') {
                    window.location.href = 'admin.html'; // Asegúrate de que la ruta sea correcta
                } else {
                    mensajeError.textContent = 'Usuario o contraseña incorrectos.';
                }
            });
        });
    </script>