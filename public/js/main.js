// HTML references
const form = document.querySelector('form');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

const sendMail = async e => {
    e.preventDefault();

    error.textContent, success.textContent = '';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const response = await fetch('emailing/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { msg } = await response.json();

    if (response.status > 300) {
        error.textContent = msg;
        return;
    }

    form.reset();
    success.textContent = 'Email send successfully!'
};

const main = () => {
    form.addEventListener('submit', sendMail);
};

document.addEventListener('DOMContentLoaded', () => {
    main();
});