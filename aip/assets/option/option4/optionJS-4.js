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
        question: "В результате выполнения программы const a=2; b=4; c=15; begin write (a,b); write (c); end; на экран монитора будет выведено:",
        options: [
            "2" + "<br/>" + "4" + "<br/>" + "15",
            "24" + "<br/>" + "15",
            "2 4" + "<br/>" + "15",
            "2 4 15",
            "2415",
        ],
        rightAnswer: 4
    },
    {
        question: "В результате выполнения программы const a=2; b=4; c=15; begin writeln(a,b); write (c); end; на экран монитора будет выведено:",
        options: [
            "2 4 15",
            "24" + "<br/>" + "15",
            "2 4" + "<br/>" + "15",
            "24" + "<br/>" + "15;",
            "2415",
        ],
        rightAnswer: 3
    },
    {
        question: "В результате выполнения программы const a=’14’; b=’8’; begin writeln(a+b); end; на экран будет выведено:",
        options: [
            "сообщение об ошибке",
            "2 2",
            "148",
            "22",
            "14 8",
        ],
        rightAnswer: 2
    },
    {
        question: "В результате выполнения оператора for n:=7 to 11 do write (n:2); на экран будет выведено:",
        options: [
            "7 8 9 10 11",
            "7 8 91011",
            "7891011",
            "  7  8  9  10  11",
            "7 8" + "<br/>" + "9 10" + "<br/>" + "11",
        ],
        rightAnswer: 1
    },
    {
        question: "В результате выполнения оператора for a:=’f’ downto ’b’ do write(a); на экран будет выведено:",
        options: [
            "fedcb",
            "bf",
            "bcdef",
            "fb",
            "сообщение об ошибке",
        ],
        rightAnswer: 0
    },
    {
        question: "Найдите пример правильного условного оператора:",
        options: [
            "if x>=2 and x<=5 then y:=x*x",
            "if (x>=2) and (x<=5) then y:=x*x;",
            "if 2<=x<=5 then y:=x*x;",
            "if x>2 then y:=x; else y:=x*x;",
            "if x>2 do y:=x;",
        ],
        rightAnswer: 1
    },
    {
        question: "Назовите пример правильного оператора выбора:",
        options: [
            "case n" + "<br/>" + "1…5: y:=2;" + "<br/>" + "10,14: y:=3;" + "<br/>" + "end;",
            "case n of" + "<br/>" + "2; 7; 8: y:=5;" + "<br/>" + "6; 12; y:=10;" + "<br/>" + "end;",
            "case n of" + "<br/>" + "1, 10: y:=x-8;" + "<br/>" + "2..7: y:=cos(x);" + "<br/>" + "else y:=sin(x);" + "<br/>" + "end;",
            "case n of" + "<br/>" + "1.9: y:=x-8;" + "<br/>" + "2..7: y=cos(x);" + "<br/>" + "else y:=sin(x)" + "<br/>" + "end;",
            "case n of" + "<br/>" + "12: then y:=1;" + "<br/>" + "else y:=2;",
        ],
        rightAnswer: 2
    },
    {
        question: "Укажите значение Y после выполнения оператора" + "<br/>" + "case x of " + "<br/>" + "1, 4, 9: y:=10;" + "<br/>" + "11..17: y:=9;" + "<br/>" + "21: y:=14;" + "<br/>" + "else y:=7;" + "<br/>" + "end;" + "<br/>" + "при x=15:" ,
        options: [
            "15",
            "7",
            "14",
            "9",
            "10",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите правильный фрагмент программы, вычисляющий и выводящий на экран" + "<br/>" + "y=cos2x3 при х изменяющемся от 0 до 2,5 с шагом 0,1:",
        options: [
            "x:=0; while x<=2.5 do begin y:=sqr(cos(x*x*x)); x:=x+0.1; end; writeln (x,y);",
            "x:=0; while x<=2.5 do begin y:=sqr(cos(x*x*x)); writeln (x,y); end; x:=x+0.1;",
            "for x:=0 to 2.5 step 0.1 do begin y:=sqr(cox(x*x*x)); writeln (x,y); end;",
            "x:=0; repeat y:=sqr(cos(x*x*x)); writeln (x,y); x:=x+0.1; until x<=2.5;",
            "x:=0; repeat y:=sqr(cos(x*x*x)); writeln (x,y); x:=x+0.1; until x>2.5;",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите пример правильного описания переменных:",
        options: [
            "type a:char; b:string;",
            "var a:=realite; b:=integer;",
            "var a:real; b,c:integer; d:logic;",
            "var a:string, b:char;",
            "var a:real; b,c:integer; d:boolean;",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите пример правильного описания переменных:" ,
        options: [
            "var a:string[1..20]; b:integer;",
            "var a:string[1..20]; b:integer;",
            "var a:string; b:array of real;",
            "var a:string[10]; b:real;",
            "var a:string[1000]; b:array of real;",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите пример правильного условного оператора:",
        options: [
            "if x>=4 to y:=y+a;",
            "if 2<x<3 then y:=y+a;",
            "if a<>2 then writeln(a) else y:=y+1;",
            "while x>7 then x:=x-1;",
            "until x<6 do x:=x+2;",
        ],
        rightAnswer: 2
    },
    {
        question: "Найдите пример правильного оператора цикла:",
        options: [
            "until x>5 do y:=cos(x); writeln (x,y); x:=x+0.3; end;",
            "repeat y:=ln(x); writeln (x,y); x:=x+0.5; until x>5;",
            "until x>5 do y:=cos(x); writeln (x,y); x:=x+0.3; end;",
            "while y:=6 do a:=y;",
            "repeat y:=y+a while y<10;",
        ],
        rightAnswer: 1
    },
    {
        question: "Какой из ниже перечисленных типов не является простым?",
        options: [
            "Массивы",
            "Real" ,
            "Integer",
            "Boolean",
            "Char",
        ],
        rightAnswer: 0
    },
    {
        question: "В каком из ниже перечисленных случаев переменная A описана как переменная целого типа?",
        options: [
            "Var A:Real;",
            "Var A:Integer;",
            "Var A:Boolean;",
            "Var A:Char;",
            "Var A:String;",
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
