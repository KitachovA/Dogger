export default function slider() {
    const carousel = document.querySelector('.slider__inner'),
        wrapper = document.querySelector('.slider__wrapper'),
        prev = document.querySelector('.arrow-back'),
        next = document.querySelector('.arrow-next');

    let timeoutId, isDragging = false, startX, startScrollLeft, clones = [];

    const getCardWidth = () => {
        const elem = carousel.querySelector('.slider__inner-item');
        return elem ? elem.getBoundingClientRect().width : 0;
    }

    const clearClones = () => {
        clones.forEach(clone => clone.remove());
        clones = [];
    }

    const buildClones = () => {
        clearClones();
        const slides = Array.from(carousel.querySelectorAll('.slider__inner-item'));
        if (!slides.length) return;

        const cardWidth = getCardWidth();
        const cardPerView = Math.max(1, Math.round(carousel.offsetWidth / cardWidth));

        slides.slice(-cardPerView).reverse().forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            carousel.insertBefore(clone, carousel.firstChild);
            clones.push(clone);
        });

        slides.slice(0, cardPerView).forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
            clones.push(clone);
        });

        requestAnimationFrame(() => {
            carousel.classList.add('no-transition');
            carousel.scrollLeft = carousel.offsetWidth;
            requestAnimationFrame(() => {
                carousel.classList.remove('no-transition');
            });
        })
    }

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        }
    }

    const onResize = debounce(() => {
        buildClones();
    }, 150);

    const dragStart = (e) => {
        isDragging = true;
        startX = e.pageX ?? e.clientX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add('dragging');
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const position = e.pageX ?? e.clientX;
        carousel.scrollLeft = startScrollLeft - (position - startX);
    };

    const dragStop = () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('dragging');
        snapToCenter();
    };

    const snapToCenter = () => {
        const cardWidth = getCardWidth();
        if (!cardWidth) return;
        const snap = Math.round(carousel.scrollLeft / cardWidth) * cardWidth;
        carousel.scrollLeft = snap;
    };

    const autoPlayStart = () => {
        if (window.innerWidth < 768) return;
        timeoutId = setInterval(() => {
            const width = getCardWidth();
            carousel.scrollLeft += width || 0;
        }, 5000);
    };
    const autoPlayStop = () => clearInterval(timeoutId);

    const infiniteScroll = () => {
        if (carousel.scrollLeft <= 1) {
            carousel.classList.add('no-transition');
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove('no-transition');
        } else if (Math.abs(carousel.scrollLeft - (carousel.scrollWidth - carousel.offsetWidth)) <= 1) {
            carousel.classList.add('no-transition');
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove('no-transition');
        }
    };

    buildClones();
    autoPlayStart();

    window.addEventListener('resize', onResize);
    carousel.addEventListener('pointerdown', dragStart);
    window.addEventListener('pointermove', dragging);
    window.addEventListener('pointerup', dragStop);
    carousel.addEventListener('scroll', infiniteScroll);
    wrapper.addEventListener('mouseenter', autoPlayStop);
    wrapper.addEventListener('mouseleave', () => { autoPlayStart(); });

    next.addEventListener('click', () => {
        const w = getCardWidth();
        carousel.scrollLeft += w || 0;
    });
    prev.addEventListener('click', () => {
        const w = getCardWidth();
        carousel.scrollLeft -= w || 0;
    });
}
//https://www.youtube.com/watch?v=6QE8dXq9SOE tutorial
