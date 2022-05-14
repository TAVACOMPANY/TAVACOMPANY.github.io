/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все вопросы */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страниц

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый Результат

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Состояние Т-триггера изменяется на противоположное',
        options: [
            'С приходом 1 на S-вход.',
            'По истечению заданного времени',
            'С приходом каждого входного импульса.',
            'С приходом 1 на R-вход.',
            'С одновременным приходом импульсов на R и S входы.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Аналоговый компаратор выполняет',
        options: [
            'Генерирует периодическую последовательность импульсов',
            'Операцию вычитания двух входных сигналов',
            'Логическую операцию дизьюнкцию',
            'Операцию сравнения двух входных напряжений',
            'Логическую операцию коньюнкцию',
        ],
        rightAnswer: 3
    },
    {
        question: 'Состояние D-триггера определяется',
        options: [
            'Состоянием D-входа по приходу синхроимпульса и сохраняется до следующего синхроимпульса ',
            'Частотой синхроимпульсов',
            'Состоянием D-входа в текущий момент времени',
            'Длительностью синхроимпульса ',
            'Совпадением сигналов на R и S входах',
        ],
        rightAnswer: 0
    },
    {
        question: 'Триггер со статической синхронизацией реагирует на информационные входы',
        options: [
            'По срезу синхроимпульса',
            'При наличии 1 на синхровходе',
            'С запаздыванием на один период',
            'Если находится в состояние 0',
            'По фронту синхроимпульса',
        ],
        rightAnswer: 1
    },
    {
        question: 'Триггер с прямым динамическим синхровходом реагирует на информационные входы',
        options: [
            'При наличии 1 на синхровходе',
            'Если находится в состояние 0',
            'С запаздыванием на один период',
            'По срезу синхроимпульса',
            'По фронту синхроимпульса',
        ],
        rightAnswer: 4
    },
    {
        question: 'Триггер с инверсным динамическим синхровходом реагирует на информационные входы',
        options: [
            'По фронту синхроимпульса',
            'Если находится в состояние 0',
            'С запаздыванием на один период',
            'По срезу синхроимпульса',
            'При наличии 1 на синхровходе',
        ],
        rightAnswer: 3
    },
    {
        question: 'Состояние асинхронного триггера изменяется',
        options: [
            'По фронту синхроимпульса',
            'По истечению заданного времени',
            'При соответствующих изменениях сигналов на R и S входах',
            'При соответствующем изменении сигнала на D-входе',
            'По срезу синхроимпульса',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сигнал на выходе логического элемента И равен',
        options: [
            '1, если все входные сигналы 1, иначе 0',
            '0, если все входные сигналы 1, иначе 1',
            '1, если хотя бы один входной сигнал 0, иначе 0',
            '1, если хотя бы один входной сигнал 1, иначе 0',
            '0, если хотя бы один входной сигнал 1, иначе 1',
        ],
        rightAnswer: 0
    },
    {
        question: 'Логический элемент HE',
        options: [
            'Сглаживает входной импульсный сигнал',
            'Увеличивает амплитуду входного сигнала',
            'Изменяет полярность входного сигнала произвольной формы',
            'Изменяет фазу входного синусоидального сигнала',
            'Изменяет входной цифровой сигнал на противоположный',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сигнал на выходе логического элемента ИЛИ равен',
        options: [
            '0, если все входные сигналы 1, иначе 1',
            '1, если хотя бы один входной сигнал 1, иначе 0 ',
            '1, если хотя бы один входной сигнал 0, иначе 0',
            '1, если все входные сигналы 1, иначе 0',
            '0, если хотя бы один входной сигнал 1, иначе 1',
        ],
        rightAnswer: 1
    },
];
  
numberOfAllQuestion.innerHTML = questions.length;  // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    option5.innerHTML = questions[indexOfQuestion].options[4];

    numberOfQuestion.innerHTML = indexOfPage + 1; // устоновка номера страницы 
    indexOfPage++;
};

let comletedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(comletedAnswers.length > 0) {
            comletedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(comletedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    comletedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
         const div = document.createElement('div');
         answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const attModal = document.querySelector('.attention-over-modal');
const btnClosed = document.getElementById("btn-close");

btnClosed.addEventListener('click', function () {
    attModal.classList.remove('actived');
});

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
       attModal.classList.add('actived');
    } else {
        randomQuestion();
        enableOptions();
    }

};

btnNext.addEventListener('click', validate);

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";
    coratten();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});