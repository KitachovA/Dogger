export default function collapse() {
    const questions = document.querySelectorAll('.faq__collapse-question'),
        answers = document.querySelectorAll('.faq__collapse-answer'),
        questionPaw = document.querySelectorAll('.faq__collapse-question span');


    function showAnswer(i = 0) {
        // answers[i].style.maxHeight = answers[i].scrollHeight + 20 + "px";
        answers[i].classList.add('show')
        questionPaw[i].classList.add('active')
        questionPaw[i].classList.remove('negative')
    }

    function closeAnswer(i = 0) {
        // answers[i].style.maxHeight = '0px'
        answers[i].classList.remove('show');

        questionPaw[i].classList.remove('active');
        questionPaw[i].classList.add('negative');
    }

    function closeAllAnswer() {
        for (let i = 0; i < answers.length; i++) {
            closeAnswer(i)
        }
    }

    questions.forEach((question, i) => {
        question.addEventListener('click', (e) => {
            if (e.target.nodeName === "SPAN" || e.target.classList.contains('faq__collapse-question')) {
                if (answers[i].classList.contains('show')) {
                    closeAnswer(i)
                } else {
                    closeAllAnswer();
                    showAnswer(i);
                }

            }
        })
    })


    showAnswer()
    closeAnswer()
    closeAllAnswer()
}

