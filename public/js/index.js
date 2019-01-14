
/** Toggle Password */
function showPassword() {
    const x = document.getElementById('formPassword');
    if (x.type === 'password') {
        x.type = 'text';
    } else {
        x.type = 'password';
    }
}
