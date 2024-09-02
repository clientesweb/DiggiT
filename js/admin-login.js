document.getElementById('iniciar-sesion-admin').addEventListener('click', () => {
    const usuarioAdmin = document.getElementById('usuario-admin').value;
    const contrasenaAdmin = document.getElementById('contrasena-admin').value;

    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const adminAutenticado = admins.find(a => a.usuario === usuarioAdmin && a.contrasena === contrasenaAdmin);

    if (adminAutenticado) {
        localStorage.setItem('adminAutenticado', 'true');
        window.location.href = 'admin.html'; // Redirigir al panel de administraci�n
    } else {
        document.getElementById('mensaje-error-admin').textContent = 'Usuario o contrase�a incorrectos';
    }
});

// Agrega un enlace a la p�gina de registro de administradores
document.getElementById('registrar-admin-enlace').addEventListener('click', () => {
    window.location.href = 'registrar-admin.html';
});
