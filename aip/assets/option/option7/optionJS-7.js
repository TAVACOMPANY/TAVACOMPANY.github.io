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
const img = document.getElementById('image');

let score = 0; // Итоговый Результат

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: "В результате выполнения фрагмента программы: a:=’оценка’; b:=pos(‘цен’, a); c:=pos(‘ока’, a);:",
        options: [
            "b=1, c=2",
            "b=’ока’, с=’окаоценка’",
            "b=5, c=0",
            "a=3, c=1",
            "b=2, c=0",
        ],
        rightAnswer: 4
    },
    {
        question: "Укажите верное значение функции copy(‘abcde’, 2, 3):",
        options: [
            "‘cd’",
            "‘bbb’",
            "23",
            "‘abbbcde’",
            "‘bcd’",
        ],
        rightAnswer: 4
    },
    {
        question: "В результате выполнения фрагмента программы: S:=’монитор’ ; delete(S, 2, 3);",
        options: [
            "S=0",
            "S=’мнитор’",
            "S=7",
            "S=’мтор’",
            "S=’мотор’",
        ],
        rightAnswer: 3
    },
    {
        question: "В результате выполнения фрагмента программы: h:=’27’; x:=’abcd’; insert(h, x, 2);",
        options: [
            "h=x=’27’",
            "h=x=’27abcd’",
            "h=’27’, x=’ab27cd’",
            "h=’27’, x:=’a27bcd’;",
            "h=’2abcd7’, x=’abcd’",
        ],
        rightAnswer: 3
    },
    {
        question: "В результате выполнения фрагмента программы: y:=1; if length(‘дом’)>3 then y:=0;",
        options: [
            "будет выдано сообщение об ошибкеx",
            "y=0",
            "y=1",
            "y=3",
            "y=10",
        ],
        rightAnswer: 2
    },
    {
        question: "В результате выполнения фрагмента программы: x:=’12309354231’; y:=pos(‘23’,x); z:=pos(‘32‘, x);",
        options: [
            "y=’2312309354231’, z=0",
            "y=2, z=12",
            "y=2, z=0",
            "y=9, z=2",
            "y=9, z=0",
        ],
        rightAnswer: 2
    },
    {
        question: "Какой тип имеет функция pos(‘1.2’, x)?",
        options: [
            "строковый",
            "вещественный",
            "целый",
            "символьный",
            "символьный",
        ],
        rightAnswer: 2
    },
    {
        question: "В результате выполнения процедуры str(2/3: 6: 4, y);" ,
        options: [
            "y=0.6666",
            "y=’0.6666’",
            "y=’0.666’",
            "y=0.666",
            "y=0",
        ],
        rightAnswer: 1
    },
    {
        question: "В результате выполнения фрагмента программы var a, x: integer; … val(‘236’,x, a);",
        options: [
            "x=’236’, a=0",
            "x=236, a=0",
            "x=0, a=236",
            "x=0, a=’236’",
            "x=0, a=0",
        ],
        rightAnswer: 1
    },
    {
        question: "В результате выполнения фрагмента программы: var a, x: integer; ...x:=0; val(‘2.36’, x, a);",
        options: [
            "x=0, a=2",
            "x=2.36, a=0",
            "x=’0’, a=2",
            "x=2, a=23",
            "x=’2’, a=23",
        ],
        rightAnswer: 0
    },
    {
        question: "Оператор while a[length(a)]=’ ‘ do delete(a, length(a), 1);",
        options: [
            "удалит в строке а ведомые пробелы (пробелы после текста)",
            "удалит в строке а ведущие пробелы (пробелы перед текстом)",
            "вставит в строке а пробел после каждого слова",
            "удалит в строке а все пробелы",
            "оставит самый левый пробел",
        ],
        rightAnswer: 0
    },
    {
        question: "Оператор x:=x+’ ‘;",
        options: [
            "добавит пробел в начале строки х",
            "добавит пробел в конце строки х",
            "удвоит числовое значение х",
            "обнулит х",
            "добавит пробел после каждого слова строки х",
        ],
        rightAnswer: 1
    },
    {
        question: "Пусть х-строка из слов, разделенных пробелами. Тогда функция copy(x, 1, pos(‘ ‘, x) возвращает;",
        options: [
            "первое слово строки х без пробела в конце",
            "первое слово строки х с пробелом в конце",
            "первое слово строки х с пробелом в начале",
            "символ пробел",
            "строку х",
        ],
        rightAnswer: 1
    },
    {
        question: "В каком из предложенных вариантов правильно описан двумерный массив, состоящий из элементов вещественного типа:",
        options: [
            "A:array[1..4,1..7] of integer; ",
            "A:array[1..5] of real;" ,
            "A:array[1..2,1..9] of real;",
            "A:array[1...3,1...5]of real;",
            "нет правильного ответа",
        ],
        rightAnswer: 2
    },
    {
        question: "В каком из предложенных вариантов правильно описан одномерный массив, состоящий из элементов целого типа: ",
        options: [
            "нет правильного ответа ",
            "A:array[1...7] of integer;",
            "A:array[1..6] of integer;",
            "A:array[1..4,1..4] of integer; ",
            "DIM A(4)",
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
    timerset();
});

const attention = document.getElementById('attention');

function coratten() {
    if (score >= 12) {
        attention.innerHTML = 'Ты настоящий джедай Pascal!';
    } else {
        attention.innerHTML = 'Тебе не стать программистом!';
    }
};
