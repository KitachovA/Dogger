export default function animate() {


    const welcomeElements = document.querySelectorAll('.welcome__intro'),
        fadeLeftElement = document.querySelectorAll(".left-fade"),
        fadeRightElement = document.querySelectorAll(".right-fade "),
        aboutSection = document.querySelectorAll(".about"),
        trainersBox = document.querySelectorAll(".trainers__item"),
        pricingFade = document.querySelectorAll(".pricing__fade"),
        pricingBox = document.querySelectorAll(".pricing__box"),
        wrapper = document.querySelector('.sticky-wrapper'),
        header = document.querySelector('.header');


    const groups = [
        welcomeElements,
        fadeLeftElement,
        fadeRightElement,
        aboutSection,
        trainersBox,
        pricingFade,
        pricingBox
    ];
    let scrolling = false

    function checkElement(elements) {
        elements.forEach(element => {
            const position = element.getBoundingClientRect();

            if (position.top <= window.innerHeight && position.bottom >= 0) {
                element.classList.add('animate');
            }

            if (position.top >= window.innerHeight) {
                element.classList.remove('animate');
            }

        });
    }

    function handleScroll() {
        groups.forEach(group => checkElement(group));

        const scrolled = window.scrollY > 50;

        wrapper.style.position = scrolled ? 'fixed' : 'absolute';
        header.style.backgroundColor = scrolled ? 'white' : '#f8f9fa';
        header.style.boxShadow = scrolled ? '4px 0 20px -5px rgba(0, 0, 0, 0.1)' : 'none';
    }

    window.addEventListener('scroll', () => {
        if (!scrolling) {
            scrolling = true;

            requestAnimationFrame(() => {
                handleScroll();
                scrolling = false;
            });
        }
    });

    handleScroll();
}