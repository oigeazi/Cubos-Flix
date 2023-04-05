const btnTheme = document.querySelector('.btn-theme');
const logo = document.querySelector('.header__container-logo img');
const close = document.querySelector('.modal__close');
const root = document.querySelector(':root');

function changeTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        logo.src = './assets/logo.svg';
        btnTheme.src = './assets/dark-mode.svg';
        btnPrev.src = './assets/arrow-left-light.svg';
        btnNext.src = './assets/arrow-right-light.svg';
        close.src = './assets/close.svg';

        root.style.setProperty('--background', '#1B2028');
        root.style.setProperty('--input-color', '#3E434D');
        root.style.setProperty('--bg-secondary', '#2D3440');
        root.style.setProperty('--text-color', '#FFFFFF');
        root.style.setProperty('--bg-modal', '#2D3440');
        return;
    }
    logo.src = './assets/logo-dark.png';
    btnTheme.src = './assets/light-mode.svg';
    btnPrev.src = './assets/arrow-left-dark.svg';
    btnNext.src = './assets/arrow-right-dark.svg';
    close.src = './assets/close-dark.svg';

    root.style.setProperty('--background', '#fff');
    root.style.setProperty('--input-color', '#979797');
    root.style.setProperty('--bg-secondary', '#ededed');
    root.style.setProperty('--text-color', '#1b2028');
    root.style.setProperty('--bg-modal', '#ededed');
}

changeTheme();

btnTheme.addEventListener('click', (event) => {
    event.preventDefault();
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    changeTheme();
});