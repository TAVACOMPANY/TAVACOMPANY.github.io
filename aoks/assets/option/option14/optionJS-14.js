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
        question: 'Начало пакета данных всегда отмечает',
        options: [
            'вертикальный уровень стартового бита',
            'высокий уровень стартового бита',
            'низкий уровень стартового бита',
            '10 уровень стартового бита',
            'главный уровень стартового бита',
        ],
        rightAnswer: 2
    },
    {
        question: 'Чем больше потребляемый монитором ток, тем ___________его тепловой нагрев.',
        options: [
            'Больше на 10%',
            'Ниже',
            'Меньше на 15%',
            'Выше',
            'Меньше в 2 раза',
        ],
        rightAnswer: 3
    },
    {
        question: 'Запись 8Е1 обозначает протокол обмена данными с числом бит',
        options: [
            '8 ',
            '6',
            '0',
            '1',
            'Е',
        ],
        rightAnswer: 0
    },
    {
        question: 'Cодержимое индексного регистра. Обычно используется для выбора элемента массива.',
        options: [
            'Адресация (Address)',
            'Индекс (Index) ',
            'База (Base)',
            'Смещение (Displacement)',
            'Масштаб (Scale)',
        ],
        rightAnswer: 1
    },
    {
        question: 'Если на одном процессоре решение может быть получено за N*lоg2N шагов, то на N процессорах требуется в',
        options: [
            'N +1 раз меньше шагов',
            'N-1 раз больше шагов',
            'N*2 раз больше шагов',
            'N раз больше шагов',
            'N раз меньше шагов ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что определяет, как часто в течение одной секунды заново формируется изображение на экране монитора',
        options: [
            'Электроника жесткого диска',
            'Операционная система',
            'Электронная таблица',
            'Частота вертикальной развертки ',
            'Головка считывания/записи',
        ],
        rightAnswer: 3
    },
    {
        question: 'Каждая ячейка памяти, адресуемая с помощью младших разрядов адреса команды перехода, содержит ______, который говорит о том, был ли предыдущий переход выполняемым или нет.',
        options: [
            '10 бит',
            '16 бит',
            '1 бит',
            '10^6 бит',
            '10^2 бит',
        ],
        rightAnswer: 2
    },
    {
        question: 'В одном секторе располагается',
        options: [
            '512 байт',
            '1 Мб',
            '32 Кб',
            '1Тб',
            '512 Гб',
        ],
        rightAnswer: 0
    },
    {
        question: 'Первый накопитель на жестких дисках был создан в',
        options: [
            '1983',
            '2000',
            '1987',
            '1999',
            '1973 г',
        ],
        rightAnswer: 4
    },
    {
        question: 'Официальное название интерфейса IDЕ, признанного ANSI в марте 1989 г.',
        options: [
            'ANS',
            'АТА',
            'ADA',
            'DNS',
            'IBM',
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