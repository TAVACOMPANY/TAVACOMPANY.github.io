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
        question: 'В результате выполнения фрагмента программы var a, b: integer; c, d: real; … a:=1; b:=2; c:=3; d:=4.856; write(a, b, c, d: 5: 2); на экран монитора будет выведена строка:',
        options: [
            '12 3.0000000000E+00 4.86',
            '1 2 3E0 4.856',
            '1 2 3 4.86',
            '12 3.0 4.856',
            '12 3.0000000000E+00 4.856',
        ],
        rightAnswer: 0
    },
    {
        question: 'В результате выполнения фрагмента программы: a:=’12’+’8’; b:=’10’; c:=a+b; write(a, b, c); на экран монитора будет выведена строка: ',
        options: [
            '1281012810',
            '201030',
            '12+8+10',
            '128 10 138',
            '20 10 30',
        ],
        rightAnswer: 0
    },
    {
        question: 'Согласно описания: VAR A:integer; A является ... ',
        options: [
            'переменной символьного типа',
            'переменной вещественного типа ',
            'переменной целого типа',
            'переменной логического типа',
            'записью',
        ],
        rightAnswer: 2
    },
    {
        question: 'Согласно описания: VAR A:char; A является ... ',
        options: [
            'переменной логического типа ',
            'переменной вещественного типа',
            'переменной целого типа',
            'переменной символьного типа',
            'записью',
        ],
        rightAnswer: 3
    },
    {
        question: 'Согласно описания: VAR A:boolean; A является ... ',
        options: [
            'переменной символьного типа',
            'переменной вещественного типа ',
            'переменной целого типа',
            'записью',
            'переменной логического типа',
        ],
        rightAnswer: 4
    },
    {
        question: 'В результате выполнения какого оператора на экране отобразится число 1.333 при х=1.3333333333 ? ',
        options: [
            'Write(x:5:3);',
            'Write(x:5);',
            'Write(x:3:2);',
            'Write(x);',
            'Write(x:1:333); ',
        ],
        rightAnswer: 0
    },
    {
        question: 'В результате выполнения какой последовательности операторов будет выведена информация:' + '<br />' + 'РЕЗУЛЬТАТ РАСЧЕТА' + '<br />' + 'y=5  x=10',
        options: [
            `y:=5;x:=10; Write('РЕЗУЛЬТАТ РАСЧЕТА'); Write('y=', y,'x='',x); `,
            `y:=5; x:=10; Writeln('РЕЗУЛЬТАТ РАСЧЕТА'); Writeln('y=',y, 'x=',x); `,
            `y:=5; x:=10; writeln('РЕЗУЛЬТАТ РАСЧЕТА'); Writeln('y=',y); writeln('x=',x); `,
            `y:=5; x:=10; write('РЕЗУЛЬТАТ РАСЧЕТА'); Writeln('y=',y,'x=',x); `,
            `write('РЕЗУЛЬТАТ РАСЧЕТА'); Writeln('y=',5,'x=',10); `,
        ],
        rightAnswer: 1
    },
    {
        question: 'В результате выполнения какой последовательности операторов будет выведена следующая информация:' + '<br />' + 'Привет!!!' + '<br />' + ' ' + '<br />' + 'Hello!',
        options: [
            `Write('Привет!!!'); Write; Writeln('Hello!');`,
            `Write('Привет!!!'); Writeln; Writeln('Hello!');`,
            `Writeln('Привет!!!'); Writeln; Writeln('Hello!');`,
            `Writeln('Привет!!!'); Writeln('Привет!!!');`,
            `Write('Привет!!!'); Writeln('Hello!');`,
        ],
        rightAnswer: 2
    },
    {
        question: 'Оператор Case - это ... ',
        options: [
            'оператор присвоения ',
            'оператор цикла',
            'оператор безусловного перехода  ',
            'оператор выбора',
            'условный оператор',
        ],
        rightAnswer: 3
    },
    {
        question: 'Оператор IF ... THEN ... ELSE ... - это ... ',
        options: [
            'оператор условного перехода',
            'оператор цикла с постусловием',
            'оператор присвоения ',
            'оператор выбора',
            'условный оператор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Оператор Goto - это ...',
        options: [
            'оператор безусловного перехода',
            'оператор выбора',
            'оператор цикла',
            'условный оператор ',
            'оператор присвоения ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Результатом какой операции будет число 5?',
        options: [
            '4 DIV 20 ',
            '11 DIV 2',
            '5 DIV 5',
            '1 DIV 5',
            '17 DIV 6 ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Результатом какой операции будет число 3? ',
        options: [
            '12 MOD 4  ',
            '11 MOD 3 ',
            '13 MOD 5',
            '12 MOD 3',
            '3 MOD 2',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой из ниже предложенных операторов для А типа Integer вызовет ошибку?',
        options: [
            'A:=A*A-50*A;',
            'A:=A*5-1; ',
            'A:=3;',
            'A:=35/7;',
            'Writeln(`Ответ:`,A:3);',
        ],
        rightAnswer: 3
    },
    {
        question: 'Var Y:Real; A:Integer; Укажите недопустимый оператор.',
        options: [
            'A:=5; ',
            'A:=SQR(A) div A ',
            'A:=A*Trunc(A/Y)',
            'A:=Trunc(A/Y)',
            'A:=Chr(Trunc(Y))',
        ],
        rightAnswer: 4
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

const attention = document.getElementById('attention');

function coratten() {
    if (score >= 12) {
        attention.innerHTML = 'Ты настоящий джедай Pascal!';
    } else {
        attention.innerHTML = 'Тебе не стать программистом!';
    }
};