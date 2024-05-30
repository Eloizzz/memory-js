function checkPasswordStrength(password) {
    // Si le mot de passe contient moins de 6 caractères, il est faible
    if (password.length < 6) {
        return 'Faible';
    }
    // Sinon, vérifier s'il contient un symbole ou un nombre
    else if (/[!@#$%^&*(),.?":{}|<>]/.test(password) || /\d/.test(password)) {
        // S'il contient plus de 6 caractères avec un symbole ou un nombre, il est moyen
        if (password.length > 6) {
            return 'Moyen';
        }
        // Sinon, il est toujours faible
        else {
            return 'Faible';
        }
    }
    // Sinon, le mot de passe ne contient que des lettres et est faible
    else {
        return 'Faible';
    }
}

document.getElementById('password').addEventListener('input', function() {
    let password = this.value;
    let strength = checkPasswordStrength(password);
    document.getElementById('passwordStrength').textContent = strength;
});
