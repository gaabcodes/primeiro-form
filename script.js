const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const radios = document.querySelectorAll('input[name="option"]');
const desc = document.querySelector("#mensagem");
const spanMensagem = document.querySelector('#mensagem + .span-required');
const termo = document.querySelector('#termo');
const spanCheckbox = termo.parentElement.querySelector('.span-required');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    nameValidate();
    lastnameValidate();
    emailValidate();
    radioValidate();
    messageValidate();
    checkboxValidate();

    if (isFormValid()) {
        showSuccessAlert();

        // ✅ Exibir no console de forma organizada
        console.log("First Name:", campos[0].value);
        console.log("Last Name:", campos[1].value);
        console.log("Email:", campos[2].value);

        const radioSelecionado = Array.from(radios).find(radio => radio.checked);
        console.log("Opção selecionada:", radioSelecionado ? radioSelecionado.value : "Nenhuma");

        console.log("Mensagem:", desc.value);
        console.log("Termo aceito:", termo.checked);

        form.reset();
    } else {
        console.log("Formulário inválido. Corrija os erros antes de enviar.");
    }
});

function setError(index) {
    campos[index].style.border = '2px solid red';
    spans[index].style.display = 'block';
}

function removeError(index) {
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

function validate(index) {
    if (campos[index].value.length < 8) {
        setError(index);
    } else {
        removeError(index);
    }
}

function nameValidate() {
    validate(0);
}

function lastnameValidate() {
    validate(1);
}

function emailValidate() {
    if (!emailRegex.test(campos[2].value)) {
        setError(2);
    } else {
        removeError(2);
    }
}

function radioValidate() {
    let checked = false;

    radios.forEach((radio) => {
        if (radio.checked) {
            checked = true;
        }
    });

    if (!checked) {
        spans[3].style.display = 'block';
    } else {
        spans[3].style.display = 'none';
    }
}

function messageValidate() {
    if (desc.value.length < 100) {
        desc.style.border = '2px solid red';
        spanMensagem.style.display = 'block';
    } else {
        desc.style.border = '';
        spanMensagem.style.display = 'none';
    }
}

desc.addEventListener("keypress", function(e) {
    const inputLength = desc.value.length;
    const maxChars = 100;

    if (inputLength >= maxChars) {
        e.preventDefault();
        console.log("Máximo aceito de 100 dígitos");
    }
});

function checkboxValidate() {
    if (!termo.checked) {
        spanCheckbox.style.display = 'block';
    } else {
        spanCheckbox.style.display = 'none';
    }
}

function isFormValid() {
    return (
        campos[0].value.length >= 8 &&
        campos[1].value.length >= 8 &&
        emailRegex.test(campos[2].value) &&
        Array.from(radios).some(r => r.checked) &&
        desc.value.length >= 100 &&
        termo.checked
    );
}

function showSuccessAlert() {
    const alert = document.createElement('div');

    alert.style.position = 'absolute';
    alert.style.top = '-60px';
    alert.style.left = '50%';
    alert.style.backgroundColor = '#1E3A3A';
    alert.style.color = '#FFFFFF';
    alert.style.padding = '20px 40px';
    alert.style.borderRadius = '8px';
    alert.style.display = 'flex';
    alert.style.justifyContent = 'flex-start';
    alert.style.alignItems = 'center';
    alert.style.gap = '15px';
    alert.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    alert.style.fontFamily = 'Arial, sans-serif';
    alert.style.zIndex = '9999';
    alert.style.opacity = '0';
    alert.style.transform = 'translate(-50%, -10px)';
    alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    alert.style.minWidth = '350px';
    alert.style.maxWidth = '600px';

    const icon = document.createElement('span');
    icon.textContent = '✅';

    const textContainer = document.createElement('div');

    const title = document.createElement('strong');
    title.textContent = 'Message Sent!';
    title.style.display = 'block';
    title.style.marginBottom = '4px';

    const description = document.createElement('p');
    description.textContent = "Thanks for completing the form. We'll be in touch soon!";
    description.style.margin = '0';
    description.style.fontSize = '14px';
    description.style.color = '#CBD5E1';

    textContainer.appendChild(title);
    textContainer.appendChild(description);

    alert.appendChild(icon);
    alert.appendChild(textContainer);

    form.style.position = 'relative';
    form.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = '1';
        alert.style.transform = 'translate(-50%, 0)';
    }, 100);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}
