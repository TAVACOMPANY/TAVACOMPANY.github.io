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
        question: 'Выбрать правильное описание функции',
        options: [
            ' <тип функции> (тип 1 параметр 1, тип 2 параметр 2 , …тип n параметр n)',
            ' <тип функции > имя функции (тип 1 параметр 1, тип 2 параметр 2 , …тип n параметр n)',
            '<обращение к функции > имя функции (параметр 1, параметр 2 , … параметр n);',
            '<тип функции >  (тип 1 параметр 1; тип 2 параметр 2 ; …тип n параметр n);',
            '<тип функции >  ( параметр 1, параметр 2 , …параметр n)',
        ],
        rightAnswer: 1
    },
    {
        question: 'Выбрать правильное описание вызова функции',
        options: [
            'Тип функции (параметр 1, параметр 2 , …параметр n);',
            'Имя функции = (параметр 1, параметр 2 , …параметр n);',
            'Имя функции =( тип 1 параметр 1, тип 2  параметр 2 , …тип n параметр n);',
            'Тип функции=(параметр 1, параметр 2 , …параметр n);',
            'Имя функции (параметр 1, параметр 2 , …параметр n);',
        ],
        rightAnswer: 4
    },
    {
        question: 'Где описываются локальные переменные?',
        options: [
            'До начала функции',
            'В конце основной программы',
            'В начале основной программы',
            'В конце функции',
            'В начале функции',
        ],
        rightAnswer: 4
    },
    {
        question: 'Для чего директива #define <идентификатор> <подстановка>?',
        options: [
            'Директива вызывает замену названного идентификатора на единицу',
            'Директива вызывает замену текста подстановки на названный идентификатор',
            'Директива вызывает удаление в последующем тексте названного идентификатора',
            'Директива вызывает замену в последующем тексте названного идентификатора на текст подстановки',
            'Директива вызывает замену  названного идентификатора на ноль',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как называется директива # define идентификатор ( идентификатор ,…идентификатор )',
        options: [
            'Директива определения макроподстановки указателя',
            'Директива определения макроподстановки текста',
            'Директива определения макроподстановки идентификатора',
            'Директива определения макроподстановки с аргументами',
            'Директива определения макроподстановки без аргументов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что устанавливает директива  #ifdef  идентификатор?',
        options: [
            'Устанавливает, не определён ли  в данный момент идентификатор',
            'Устанавливает, определена ли  макроподстановки без аргументов',
            'Устанавливает, определён ли  в данный момент идентификатор',
            'Устанавливает, определён ли  условный логический оператор',
            'Устанавливает, не определена ли макроподстановки с аргументами',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что устанавливает директива  #ifndef идентификатор?',
        options: [
            'Устанавливает, не определён ли  в данный момент аргумент',
            'Устанавливает, определена ли  макроподстановки без аргументов',
            'Устанавливает, не определен ли в данный момент указанный идентификатор',
            'Устанавливает,  определён ли  условный логический оператор',
            'Устанавливает, не определена ли макроподстановки с аргументами',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое директивы препроцессора?',
        options: [
            'Представляют собой команды компилятору, которые не позволяют управлять компиляцией программы',
            'Представляют собой команды компилятору, которые позволяют управлять компиляцией программы и сделать ее код более понятным',
            'Представляют собой команды компилятору, которые позволяют завершать компиляцию программы',
            'Представляют собой команды компилятору, которые позволяют сделать ее код более закрытым',
            'Представляют собой команды компилятору, которые не позволяют сделать ее код более понятным',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой результат будет при выполнении следующего фрагмента программы:' + br + '# define  NEW(X)  X*X' + br + 'y=100/NEW(2)',
        options: [
            '100',
            '50',
            '25',
            '20',
            '4',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой будет результат при выполнении следующего фрагмента программы:' + br + '# define NEW (X)  X+5' + br + 'y=NEW(10)/NEW(5)',
        options: [
            '16',
            '1.5',
            '20',
            '2',
            '15',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой будет результат при выполнении следующего фрагмента программы:' + br + '# define  NEW(X)  X+5' + br + 'y= NEW(2)*4+NEW(2)',
        options: [
            '30',
            '29',
            '32',
            '35',
            '28',
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
        msgofScore();
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

function msgofScore() {
    if(score == 3 || score == 1 || score == 2)  {
        msgOfResult.innerHTML = 'Junior';
    } 
     else if(score == 6 || score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Middle';
     }
     else if(score == 9 || score == 7 || score == 8) {
        msgOfResult.innerHTML = 'Senior';
     }
     else if(score == 0) {
        msgOfResult.innerHTML = 'Bydlo';
     } else {
        msgOfResult.innerHTML = 'Lead';
     }
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