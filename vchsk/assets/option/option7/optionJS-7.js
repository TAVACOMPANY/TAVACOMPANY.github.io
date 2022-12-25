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
      btnTryAgain = document.getElementById('btn-try-again'),
      msgOfResult = document.getElementById('msgOfResult'),
      br = '</br>';

const questions = [
    {
        question: 'Какой метод в С# определяет открытие формы как модального диалогового окна',
        options: [
            'Show()',
            'ShowDialog()',
            'DialogShow()',
            'ShowModal()',
            'Open()',
        ],
        rightAnswer: 1
    },
    {
        question: 'Укажите основное составляющее оперативного мышления',
        options: [
            'Обнаружение объекта',
            'Опознавание',
            'Формирование алгоритма.',
            'Динамическое указание',
            'Узнавание',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какие из указанных слов присутствуют в переводе на русский язык аббревиатуры WIMP?',
        options: [
            'Окно',
            'Язык',
            'Пользователь',
            'Объект',
            'Речь',
        ],
        rightAnswer: 0
    },
    {
        question: 'В каком году создан WWW консорциум:',
        options: [
            '1995',
            '1994',
            '2000',
            '1996',
            '1999',
        ],
        rightAnswer: 1
    },
    {
        question: 'Установите соотвествие между типами пользовательского интерфейса и способами, которыми они управляются.' + br + 'Укажите соответствие для всех 4 вариантов ответа:' + br + '1) Командный интерфейс __ Движения' + br + '2) SILK __ Последовательности символов' + br + '3) WIMP __ Манипулятор' + br + '4)__ Речь',
        options: [
            '2213',
            '2131',
            '2132',
            '1231',
            '3211',
        ],
        rightAnswer: 2
    },
    {
        question: 'Представление о состоянии реального объекта управления, созданное в сознании оператора на основе восприятия информационной модели, называется … моделью',
        options: [
            'Концептуальной',
            'Эталонной',
            'Коммуникативной',
            'Информационной',
            'Информационной',
        ],
        rightAnswer: 0
    },
    {
        question: 'Бинокулярное зрение состоит из:',
        options: [
            'Из участка, видимого только одним глазом',
            'Участка, видимого правым глазом',
            'Участков периферийной области, входящих в поле зрения обоих глаз',
            'Участков периферийной области, входящих в поле зрения только одного из глаз',
            'Участка, видимого одновременно двумя глазами',
        ],
        rightAnswer: 4
    },
    {
        question: 'При проектировании пользовательского интерфейса в постановку задачи не входит следующее:',
        options: [
            'Определить команду разработчиков',
            'Определить сроки разработки',
            'Определить финансовые затраты',
            'Определить объем продукта',
            'Определить затраты трудовых ресурсов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Применение языка UML существенно упрощает последовательное использование механизмов:',
        options: [
            'Создания плана работ',
            'Спецификации, дополнения',
            'Выработки требований',
            'Конструирования ПО',
            'Тестирования программного обеспечения',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что строится на основе ощущения и восприятия?',
        options: [
            'Представление',
            'Опознавание',
            'Форма объекта',
            'Очертания объекта',
            'Различение',
        ],
        rightAnswer: 0
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});