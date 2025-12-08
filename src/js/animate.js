export default function animate() {
    const animationElements = document.querySelectorAll('.animation-on-welcome');
    const fadeLeftElement = document.querySelectorAll(".fade-left");
    const fadeRightElement = document.querySelectorAll(".fade-right")
    const wrapper = document.querySelector('.sticky-wrapper');
    const header = document.querySelector('.header')


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target)
            }
        })

    }, {
        threshold: 0.1
    })


    animationElements.forEach(elem => {
        observer.observe(elem)
    })

    fadeLeftElement.forEach(elem => {
        observer.observe(elem)
    })
    fadeRightElement.forEach(elem => {
        observer.observe(elem)
    })


    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            wrapper.style.position = 'fixed';
            header.style.backgroundColor = 'white'
        } else {
            wrapper.style.position = 'absolute'
            header.style.backgroundColor = '#f8f9fa'
        }
    });
}