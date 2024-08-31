document.getElementById('registrar-vendedor').addEventListener('click', () => {
    const usuario = document.getElementById('usuario-vendedor').value;
    const contrasena = document.getElementById('contrasena-vendedor').value;

    const vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    const vendedorExistente = vendedores.find(v => v.usuario === usuario);

    if (vendedorExistente) {
        document.getElementById('mensaje-error').textContent = 'El usuario ya existe';
        return;
    }

    vendedores.push({ usuario, contrasena });
    localStorage.setItem('vendedores', JSON.stringify(vendedores));
    alert('Vendedor registrado con éxito');
    document.getElementById('usuario-vendedor').value = '';
    document.getElementById('contrasena-vendedor').value = '';
});
