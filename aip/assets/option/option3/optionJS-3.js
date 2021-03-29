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
        question: "В результате выполнения фрагмента программы: y=1 ; a:=1; while a>0.01 do begin a:=a/10; y:=y+a; end;",
        options: [
            "y=1.11",
            "y=1.111",
            "y=1.1111",
            "y=1.1",
            "y=10",
        ],
        rightAnswer: 0
    },
    {
        question: "В результате выполнения фрагмента программы: x:=10; while x<10 do x:=x+1;",
        options: [
            "x=1",
            "x=10",
            "x=100",
            "x=12",
            "x=11",
        ],
        rightAnswer: 1
    },
    {
        question: "В результате выполнения фрагмента программы: y:=5; repeat y:=y-1; until y<6;",
        options: [
            "y=0,",
            "y=3",
            "y=4",
            "y=5",
            "y=6",
        ],
        rightAnswer: 2
    },
    {
        question: "Согласно описания: VAR A:Real; A является ... ",
        options: [
            "записью",
            "переменной логического типа",
            "переменной целого типа",
            "переменной вещественного типа",
            "переменной целого типа",
        ],
        rightAnswer: 3
    },
    {
        question: "В результате выполнения какого оператора на экране отобразится число 1.234 при х=0.1234E1 ?",
        options: [
            "Write(x:1:333);",
            "Write(x);",
            "Write(x:3:5);",
            "Write(x:5);",
            "Write(x:5:3);",
        ],
        rightAnswer: 4
    },
    {
        question: "Раздел описания меток начинается служебным словом … ",
        options: [
            "program",
            "var ",
            "begin",
            "const",
            "label",
        ],
        rightAnswer: 4
    },
    {
        question: "Раздел описания переменных начинается служебным словом … ",
        options: [
            "begin",
            "program",
            "label",
            "var",
            "const",
        ],
        rightAnswer: 3
    },
    {
        question: "Какой группой операторов на экран выводятся все четные числа от 1 до 20?" ,
        options: [
            "Правильного ответа нет",
            "d)	i:=2; " + "<br/>" + "Repeat" + "<br/>" + "i:=i+2;" + "<br/>" + "Write (i);" + "<br/>" + "Until not(i=20);",
            "for i:=1 to 20 do" + "<br/>" + "if i mod 2 =0 then Write(i);",
            "for i:=1 to 20 do " + "<br/>" + "write (i);",
            "i:=2;" + "<br/>" + "Repeat" + "<br/>" + "i:=i+2;" + "<br/>" + "Write (i);" + "<br/>" + "Until i=20;",
        ],
        rightAnswer: 2
    },
    {
        question: "VAR A:boolean; Укажите недопустимый оператор.",
        options: [
            "If A Then ",
            "A:=Sqr(A)",
            "A:=2>3 ",
            "A:=not A",
            "все операторы недопустимы",
        ],
        rightAnswer: 1
    },
    {
        question: "Согласно описания: VAR A:String; A является ... ",
        options: [
            "строкой ",
            "переменной целого типа",
            "переменной вещественного типа",
            "переменной логического типа",
            "переменной символьного типа",
        ],
        rightAnswer: 0
    },
    {
        question: "В каком случае верно записана на Паскале формула " + "<br/>" + "<img src='ph1.png'>" ,
        options: [
            "(Sqrt(Sqr(X)*X)-Cos(Sqr(X)))/Ln(X-1)+1 ",
            "(Sqrt(Sqr(X)*X)-Cos(Sqr(X)))/(Ln(X+1)+1)",
            "Sqrt(Sqr(X)*X)-Cos(Sqr(X))/(Ln(X-1)+1)",
            "Sqrt(Sqr(X)*X)-Cos(Sqr(X)) / Ln(X-1)+1",
            "все варианты верны.",
        ],
        rightAnswer: 1
    },
    {
        question: "В каком случае в записи идентификатора допущена ошибка?",
        options: [
            "во всех перечисленных случаях",
            "Isb",
            "5Abc",
            "L123",
            "Kl5m234dfsff323df",
        ],
        rightAnswer: 2
    },
    {
        question: "Для объединения нескольких операторов в один составной в языке Паскаль используются …",
        options: [
            "все перечисленные способы.",
            "фигурные скобки " + "<b> { }; </b>",
            "квадратные скобки " + "<b> [ ]; </b>",
            "операторные скобки" + "<b> begin end; </b>",
            "круглые скобки " + "<b> ( ); </b>",
        ],
        rightAnswer: 3
    },
    {
        question: "Для создания комментариев в языке Паскаль используются …",
        options: [
            "все перечисленные способы.,",
            "операторные скобки " + "<b> begin end; </b>",
            "квадратные скобки" + "<b> [ ]; </b>",
            "круглые скобки" + "<b> ( ); </b>",
            "фигурные скобки " + "<b> { }; </b>",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите пример правильного оператора цикла:",
        options: [
            "for i:=1 to 20 do y:=y+i*i;",
            "for n=10 while x>0 do y:=x+5;",
            "for i:=5 to 10 y:=y+i;",
            "for i=1 to 10 do write (i);",
            "for i=1..10 do k:=k+i;",
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

