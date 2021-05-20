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
        question: "Какой из ниже предложенных операторов для А типа Integer вызовет ошибку?",
        options: [
            "Writeln('Ответ:',A:3);",
            "A:=35/7;",
            "A:=3;",
            "A:=A*5-1;",
            "A:=A*5-1;",
        ],
        rightAnswer: 1
    },
    {
        question: "Var Y:Real; A:Integer; Укажите недопустимый оператор.",
        options: [
            "A:=5;",
            "A:=SQR(Y) div A - SQR(A)",
            "A:=A*Trunc(A/Y)",
            "A:=Chr(Trunc(Y))",
            "A:=Trunc(A/Y)",
        ],
        rightAnswer: 3
    },
    {
        question: "Что выведется на экран в результате выполнения операторов:" + "<br/>" + "Read(A,B,A); Writeln(A,B,A);" + "<br/>" + "если для ввода заданы числа 1,2 и 3?",
        options: [
            "3 2 3",
            "1 2 3",
            "3 2 1",
            "1 2 1",
            "2 3 2",
        ],
        rightAnswer: 0
    },
    {
        question: "В каком случае верно записана на Паскале формула ?",
        options: [
            "((X*Y*Z)-0.33E1*ABS(X^10+Y^(1/4))/(10^10+SQRT(X))",
            "((X*Y*Z)-0.33E1*ABS(X+Y^(1/4))/(10^7+SQRT(4*X))",
            "(X*Y*Z-3.3*Abs(X+SQRT(SQRT(Y))))/(1E7+SQRT(4*X))",
            "(XYZ-3.3*Abs(X+SQRT(Y)))/(1E8+SQRT(4*X))",
            "XYZ-3.3*ABS(X+SQR(SQRT(Y)))/1E7+SQRT(4X)",
        ],
        rightAnswer: 2
    },
    {
        question: "В каком случае верно записана на Паскале формула  ?",
        options: [
            "Cos(X^2)+ (Sin(X))^2",
            "Sqr(Cos(X))+Sqr(Sin(X))",
            "Cos(Sqr(X))+Sin(Sqr(X))",
            "Cos(Sqr(X))+Sqr(Sin(X))",
            "Sqr(Cos(X))+Sin(Sqr(X))",
        ],
        rightAnswer: 4
    },
    {
        question: "Какой функции из ниже перечисленных в языке Паскаль нет?",
        options: [
            "Abs(x)",
            "Tan(x)",
            "Int(x)",
            "Exp(x)",
            "Ln(X)",
        ],
        rightAnswer: 1
    },
    {
        question: "В результате выполнения операторов:" + "<br/>" + "A:=79;" + "<br/>" + "If (A div 5=15) and (a<79) Then Write('*') Else Write('+');" + "<br/>" + "Write('$');" + "<br/>" + "на экран выведется ... ",
        options: [
            "* +",
            "* + $",
            "* $ ",
            "+ $",
            "В этих операторах допущена ошибка; они не будут работать!",
        ],
        rightAnswer: 3
    },
    {
        question: "Результатом какой операции будет значение True при A=True и B=False?" ,
        options: [
            "not A or not B and A",
            "not A and not B and A",
            "not A and not B or not A",
            "(not B or not A) and B or not A",
            "(not B or A) and B or not A",
        ],
        rightAnswer: 0
    },
    {
        question: "При каком X в результате выполнения операторов" + "<br/>" + "If X>3 Then If X<12 Then Y:=SQR(X)+1 Else Y:=X+3 Else" + "<br/>" + "If X>=2 Then Y:=X-2 Else Y:=SQRT(ABS(X-3));" + "<br/>" + "Writeln(y);" + "<br/>" + "на экран будет выведено число 1.",
        options: [
            "X=-7",
            "X=2.5",
            "X=3",
            "X=19",
            "X=6",
        ],
        rightAnswer: 2
    },
    {
        question: "Результатом какой операции будет значение False?",
        options: [
            "not((3>5) or (7<3))",
            "not((3>5) and (7>3))",
            "not(3>5) or (7<3)",
            "not((3>5) and (7<3))",
            "not(3<5) and (7>3)",
        ],
        rightAnswer: 4
    },
    {
        question: "Определить значение переменной S после выполнения следующих операторов:" + "<br/>" + "S:=0; I:=0;" + "<br/>" + "while I<5 do I:=I+1; S:=S+1/I;",
        options: [
            "2.18333",
            "2.13333",
            "0.2",
            "0.25",
            "1.8",
        ],
        rightAnswer: 2
    },
    {
        question: "Определить значение переменной S после выполнения следующих операторов:" + "<br/>" + "S:=0;" + "<br/>" + "I:=1;" + "while I>1 do begin S:=S+1/I; I:=I-1 end;",
        options: [
            "в результате выполнения операторов произойдет зацикливание",
            "1.5",
            "2",
            "1",
            "0",
        ],
        rightAnswer: 4
    },
    {
        question: "Определить значение переменной S после выполнения операторов:" + "<br/>" + "S:=0; I:=1;" + "<br/>" + "Repeat" + "<br/>" + "S:=S+1/I;" + "<br/>" + "I:=I-1" + "<br/>" + "Until I<=1;",
        options: [
            "5",
            "в результате выполнения операторов произойдет зацикливание",
            "1",
            "0",
            "2",
        ],
        rightAnswer: 2
    },
    {
        question: "Что выведется на экран в результате выполнения операторов:" + "<br/>" + "Read(A,B); Writeln(B,A);" + "<br/>" + "если для ввода набраны числа 1 и 5?",
        options: [
            "55",
            "5" ,
            "15",
            "11",
            "51",
        ],
        rightAnswer: 4
    },
    {
        question: "Определить значение переменной S после выполнения следующих операторов:" + "<br/>" + "S:=0;" + "<br/>" + "while S<3 do S:=S+1;",
        options: [
            "3",
            "6",
            "10",
            "1",
            "0",
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
