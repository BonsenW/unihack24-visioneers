const articles = document.querySelectorAll('.form-container article');
const tabs = document.querySelectorAll('.tabs div');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        console.log("reached")
        tabs.forEach(tab => tab.classList.remove('active-tab'));
        articles.forEach(article => article.classList.remove('active-form'));

        tab.classList.add('active-tab');
        articles[index].classList.add('active-form');
    })
})