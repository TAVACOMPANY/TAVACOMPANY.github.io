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
        question: 'Усовершенствованный интерфейс малых устройств специализированный интерфейс накопителей на жестких дисках, разработанный фирмой Maxtor.',
        options: [
            'ISА',
            'IDЕ',
            'ESDI',
            'EISA',
            'АТА',
        ],
        rightAnswer: 2
    },
    {
        question: 'Скорость передачи данных между двумя модемами измеряется в',
        options: [
            'Битах',
            '1 с/м',
            'См3',
            'Бодах',
            '2 битах',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какова основная функция интерфейса',
        options: [
            'Передача данных из системы в накопитель и обратно',
            'Сокращение числа ошибок данных',
            'Увеличение объема данных',
            'Дублирование данных системы',
            'Удаление данных из системы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD IBM 30.7 IDE 7200 rpm, определите скорость вращения.',
        options: [
            '30 об/мин',
            '7200 об/мин ',
            '30.7 об/мин',
            '72 об/мин',
            '1024 об/мин',
        ],
        rightAnswer: 1
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Quantum 30.0 GB IDE 7200 rpm. , где производителем является фирма',
        options: [
            'IDE',
            'HDD',
            'Rpm',
            'GB',
            'Quantum ',
        ],
        rightAnswer: 4
    },
    {
        question: 'В качестве продолжительности цикла обращения к памяти принимается величина',
        options: [
            'tобр = max(tобр_с * tобр_з )',
            'tобр = max(tобр_с + tобр_з )',
            'tобр = max(tобр_с / tобр_з )',
            'tобр = max(tобр_с , tобр_з )',
            'tобр = max(tобр_с - tобр_з )',
        ],
        rightAnswer: 3
    },
    {
        question: 'Продолжительность самого физического процесса считывания',
        options: [
            'tрег',
            'tдост_з ',
            'tсчит',
            'tдост_с',
            'tзап',
        ],
        rightAnswer: 2
    },
    {
        question: 'Эти микросхемы динамической RАМ представляют самый медленный и самый дешевый тип памяти для графических плат.',
        options: [
            'DRAM',
            'SGRAM',
            'VRAM',
            'Rambus DRAM',
            'Rambus DRAM',
        ],
        rightAnswer: 0
    },
    {
        question: 'Масштабируемая базово-индексная адресация со смещением',
        options: [
            'EA = Base –(Index + Scale)',
            'EA = (Base *Index) / (Scale * Disp)',
            'EA = Base * Index -Scale',
            'EA = (Base *Index) + (Scale * Disp)',
            'Base + Index * Scale + Disp',
        ],
        rightAnswer: 4
    },
    {
        question: 'Интерфейс, определенный стандартом Ассоциации электронной промышленности (EIA), подразумевает наличие оборудования двух видов:',
        options: [
            'последовательного DТ и связного DС',
            'терминального DТЕ и связного DСЕ.',
            'параллельного XT и связного DСЕ',
            'терминального DТЕ и параллельного XTВ',
            'параллельного XT и последовательного DТ',
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