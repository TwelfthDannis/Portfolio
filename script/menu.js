function OpenMenu() {
    const menu = document.querySelector(".nav");
    menu.classList.toggle("openMenu")
    menu.querySelector("path").setAttribute('d', menu.classList.contains("openMenu") ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6");
    window.addEventListener("click",(e)=>{
        if(!e.target.closest(".nav") && !e.target.closest(".nav_btn")){
            menu.classList.remove("openMenu")
            menu.querySelector("path").setAttribute('d', menu.classList.contains("openMenu") ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6");
        }
    })
}

document.addEventListener('mousemove', function (event) {
    const cursor = document.getElementById('cursor');
    const card = document.querySelector('.card');
    const mainSection = document.getElementById('main');
    cursor.style.display = (isCursorOverElement(event, card) || !isCursorOverElement(event, mainSection)) ? 'none' : 'block';

    if (!isCursorOverElement(event, card)) {
        cursor.style.left = event.pageX - 60 + 'px';
        cursor.style.top = event.pageY - 60 + 'px';
    }
});

function isCursorOverElement(event, element) {
    const {left, right, top, bottom} = element.getBoundingClientRect();
    return event.pageX >= left && event.pageX <= right && event.pageY >= top && event.pageY <= bottom;
}

const parentContainer = document.querySelector('.home');
const numberOfSpans = (window.innerWidth > 900) ? 5 : 1;
setTimeout(bg_text, 300);

function bg_text() {
    for (let i = 0; i < numberOfSpans; i++) {
        const span = document.createElement('span');
        span.className = 'home_text_span';
        span.textContent = 'Welcome!';
        span.style.animationDelay = `${i + i}s`;
        parentContainer.prepend(span);
    }
}

function toggleTheme() {
    const body = document.body;
    const currentBgColor = getComputedStyle(body).getPropertyValue('--light-dark');
    const currentColor = getComputedStyle(body).getPropertyValue('--light-light');

    const newBgColor = (currentBgColor === '#333') ? '#eee' : '#333';
    const newColor = (currentColor === '#eee') ? '#333' : '#eee';

    body.style.setProperty('--light-dark', newBgColor);
    body.style.setProperty('--light-light', newColor);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const correspondingLink = document.querySelector(`.nav_link[href="#${targetId}"]`);

            document.querySelectorAll('.nav_link.section_view').forEach(link => link.classList.remove('section_view'));
            correspondingLink?.classList.add('section_view');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.scroll').forEach(section => observer.observe(section));


function openFilter(){
    const filter=document.querySelector(".filter")
    filter.style.transform="translateX(0)"
    window.addEventListener("click",e=>{
        !e.target.closest(".filter") && !e.target.closest(".filter_btn") ? filter.style.transform="translateX(-100%)":null

    })
}

