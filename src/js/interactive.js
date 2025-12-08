export default function interactive() {
    const burger = document.querySelector('.burger');
    const sidebar = document.querySelector("#sidebar");
    const overlay = document.querySelector('#overlay');
    const close = document.querySelector('.cross span');
    const collapseMenu = document.querySelectorAll('.collapse');
    const collapseBtn = document.querySelectorAll(".arrow-collapse");
    const navMenu = document.querySelectorAll('.header__nav .has-children>.header__link');
    const dropDownMenu = document.querySelectorAll('.dropdown');


    burger.addEventListener('click', () => {
        overlay.style.visibility = 'visible'
        overlay.style.opacity = '1'
        sidebar.style.right = '0'
        document.body.style.overflow = 'hidden'
    })

    close.addEventListener('click', () => {
        overlay.style.visibility = 'hidden'
        overlay.style.opacity = '0'
        sidebar.style.right = '-250px'
        document.body.style.overflow = ''
    })

    navMenu.forEach((item, i) => {
        item.addEventListener('mouseenter', () => {
            dropDownMenu[i].style.display = 'block';
        });

        item.addEventListener('mouseleave', (e) => {
            handleClose(e, dropDownMenu[i]);
        });

        dropDownMenu[i].addEventListener('mouseleave', (e) => {
            handleClose(e, dropDownMenu[i]);
        });
    });

    function handleClose(e, dropdown) {
        const related = e.relatedTarget;
        if (!dropdown.contains(related)) {
            dropdown.style.display = 'none';
        }
    }

    collapseBtn.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            if (e.target === btn) {
                toggleClass(collapseMenu[i], collapseBtn[i])
            }
            if (i === 0) {
                collapseMenu[1].style.maxHeight = '0px';
                collapseMenu[1].classList.remove("active");
            }
            if (i === 0) {
                collapseBtn[1].classList.remove("active");
            }
        })
    })

    function toggleClass(elem, btn) {
        const isVisible = elem.classList.contains("active");
        const isVisibleArrow = btn.classList.contains('active');

        if (isVisible && isVisibleArrow) {
            elem.style.maxHeight = '0px';
            elem.classList.remove("active");
            btn.classList.remove('active')
        } else {
            elem.style.maxHeight = elem.scrollHeight + 'px';
            elem.classList.add("active");
            btn.classList.add('active')
        }
    }


}

