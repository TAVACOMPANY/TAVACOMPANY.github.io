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
        question: 'Часть программного обеспечения ЭВМ, поддерживающая управление адаптерами внешних устройств и представляющая стандартный интерфейс для обеспечения переносимости операционных систем между ЭВМ с одинаковым процессором',
        options: [
            'Система ввода-вывода',
            'Базовая система ввода-вывода',
            'Драйвер устройства',
            'Сетевые утилиты',
            'Прикладные программы',
        ],
        rightAnswer: 1
    },
    {
        question: 'BIOS',
        options: [
            'хранится в оперативной памяти компьютера',
            'формируется пользователем ЭВМ, хранится в основной памяти',
            'является частью операционной системы',
            'разрабатывается изготовителем ЭВМ, хранится в постоянном запоминающем устройстве и рассматривается как часть ЭВМ',
            'поставляется отдельно от ЭВМ, пользователь сам решает о необходимости установки данной части программного обеспечения ЭВМ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Самое распространенное блок-ориентированное устройство',
        options: [
            'Терминалы',
            'Диск',
            'Строчные принтеры',
            'Сетевые адаптеры',
            'Часы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что не относится к программному обеспечению ввода-вывода',
        options: [
            'Пользовательский слой программного обеспечения',
            'Независимый от устройств слой операционной системы',
            'Выделенные устройства ввода-вывода',
            'Обработка прерываний',
            'Драйверы устройств',
        ],
        rightAnswer: 2
    },
    {
        question: 'Драйвер диска имеет дело с',
        options: [
            'Внешней памятью',
            'Дорожками',
            'Секторами',
            'Цилиндрами',
            'Временем установления головки',
        ],
        rightAnswer: 0
    },
    {
        question: 'К типичным функциям для независимого от устройств слоя не относится',
        options: [
            'обеспечение общего интерфейса к драйверам устройств',
            'Архивация ошибок',
            'именование устройств',
            'распределение памяти на блок-ориентированных устройствах',
            'уведомление об ошибках',
        ],
        rightAnswer: 1
    },
    {
        question: 'Способ работы с выделенными устройствами в мультипрограммной системе',
        options: [
            'Драйвер устройства',
            'Независимый от устройств слой операционной системы',
            'Пользовательский слой программного обеспечения',
            'Система ввода-вывода',
            'Спулинг',
        ],
        rightAnswer: 4
    },
    {
        question: 'К выделенным устройствам можно отнести',
        options: [
            'Диски',
            'Драйверы устройств',
            'Принтеры',
            'Спулинг',
            'Систему ввода-вывода',
        ],
        rightAnswer: 2
    },
    {
        question: 'К основным задачам защиты операционных систем не относится',
        options: [
            'Аутентификация',
            'Антивирусная защита',
            'Идентификация',
            'протоколирование и аудит самой системы',
            'разграничение доступа пользователей к ресурсам',
        ],
        rightAnswer: 1
    },
    {
        question: 'Наиболее простой подход к аутентификации',
        options: [
            'ограничение сетевого доступа',
            'разграничение прав доступа к файлам',
            'применение пользовательского пароля',
            'шифрование',
            'кодирование',
        ],
        rightAnswer: 2
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
    coratten();
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";   
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});