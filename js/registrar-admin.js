document.getElementById('registrar-admin').addEventListener('click', () => {
    const usuario = document.getElementById('usuario-admin').value;
    const contrasena = document.getElementById('contrasena-admin').value;

    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const adminExistente = admins.find(a => a.usuario === usuario);

    if (adminExistente) {
        document.getElementById('mensaje-error').textContent = 'El usuario ya existe';
        return;
    }

    admins.push({ usuario, contrasena });
    localStorage.setItem('admins', JSON.stringify(admins));
    alert('Administrador registrado con éxito');
    document.getElementById('usuario-admin').value = '';
    document.getElementById('contrasena-admin').value = '';
});
