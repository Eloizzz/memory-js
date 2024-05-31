// Manager
// Dépendances (imports)
import { validateEmail, validatePassword } from "../memory-js/js/modules/validator.js";
import { saveUser } from "./modules/storage.js";

// Target
const $form = document.getElementById('contactForm')

$form.addEventListener('submit', (event) => {
    // Variables de gestion
    const errors = []
    const user = {}
    // Block auto
    event.preventDefault()
    // Select inputs
    // console.log(event.target.querySelectorAll('input'));
    const $inputs = event.target.querySelectorAll('input')

    // Parcours
    $inputs.forEach(input => {
        switch (input.id) {
            case "mail":
                console.log("mail");
                if (!validateEmail(input.value)) errors.push([input.id, "L'email n'est pas valide, Custom"])
                else user.mail = input.value
                break;
            case "motdepasse":
                console.log("motdepasse");
                 if (!validatePassword(input.value)) errors.push([input.id, "motdepasse n'est pas valide, Custom"])
                 else user.motdepasse = input.value
                break;
            default:
                break;
        }
    });

    // Check Final
    console.log('Errors', errors);
    if (errors.length > 0) {
        // Insertion des errors
        errors.forEach(error => {
            console.log('error', error);
            const $displayErrorTarget = document.getElementById(`erreur-${error[0]}`)
            $displayErrorTarget.innerHTML = ''
            $displayErrorTarget.innerHTML = error[1]
        })
    } else {
        // Sauvegarde
        saveUser(user)
        document.getElementById('message-succes').textContent = "User saved"
    }
})