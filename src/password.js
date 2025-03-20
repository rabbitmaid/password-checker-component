const inputPassword = document.querySelector('.input__password');
const inputIcon = document.querySelector('.input__icon');
const strengthContainer = document.querySelector(".password-strength");
const strengthIcon = document.getElementById("password-strength-icon");
const strengthText = document.getElementById("password-strength-text");
const strengthItems = document.querySelector('.password-strength-items');


const strength = {
    weak: {
        icon: 'weak.svg',
        text: 'WEAK',
        class: 'text-lg, font-medium, text-red-600'
    },

    moderate: {
        icon: 'moderate.svg',
        text: 'MODERATE',
        class: 'text-lg, font-medium, text-orange-500'
    },

    strong: {
        icon: 'strong.svg',
        text: 'STRONG',
        class: 'text-lg, font-medium, text-green-700'
    },

}


    
const criteria = [
    { regex: /.{12,}/, text: "At least 12 characters" },
    { regex: /[a-z]/, text: "At least one lowercase letter" },
    { regex: /[A-Z]/, text: "At least one uppercase letter" },
    { regex: /\d/, text: "At least one number (0-9)" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least one symbol (!@#$%^&*())" }
];

inputIcon.addEventListener("click", (e) => {
    e.preventDefault();
    togglePasswordVisibility();
});

inputIcon.addEventListener("keydown", (e) => {
    if(e.key === "Enter") togglePasswordVisibility();
});

function togglePasswordVisibility(){
    inputIcon.setAttribute('src', inputPassword.getAttribute('type') === 'password' ? 'eye-slash.svg' : 'eye.svg');

    inputPassword.setAttribute( 'type', inputPassword.getAttribute('type') === 'password' ? 'text' : 'password');
}

inputPassword.addEventListener("input", () => {
    const password = inputPassword.value;
    let passedChecks = 0;
    strengthItems.innerHTML = ""
    
    toggleHidden(strengthContainer, password.length);

    criteria.forEach(({ regex, text }) => {
        const isValid = regex.test(password);
        if (isValid) passedChecks++;
        
        const listItem = document.createElement("li");
        listItem.classList.add("flex", "gap-2", "items-center");
        
        const icon = document.createElement("img");
        icon.src = isValid ? "check.svg" : "cross.svg";
        icon.classList.add("w-8");
        
        listItem.appendChild(icon);
        listItem.appendChild(document.createTextNode(text));
        strengthItems.appendChild(listItem);
    });

    updateStrengthIndicator(passedChecks);
});




function updateStrengthIndicator(score) {
    if (score === 5) {
        strengthText.textContent = strength.strong.text;
        strengthText.classList = strength.strong.class;
        strengthIcon.src = strength.strong.icon;
    } else if (score >= 3) {
        strengthText.textContent = strength.moderate.text;
        strengthText.classList = strength.moderate.class;
        strengthIcon.src = strength.moderate.icon;
    } else {
        strengthText.textContent = strength.weak.text;
        strengthText.classList = strength.weak.class;
        strengthIcon.src = strength.weak.icon
    }
}

function toggleHidden(el, passwordLength) {
    if (passwordLength > 0) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}
