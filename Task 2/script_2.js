// Task 2
const btn = document.querySelector('.j-btn-alert');

btn.addEventListener('click', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    alert(`Ширина экрана: ${width}px\nВысота экрана: ${height}px`);
});
