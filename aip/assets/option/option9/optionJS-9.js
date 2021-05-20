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
        question: "Структура данных, состоящая из фиксированного числа компонент, которые называются полями и могут быть различного типа – это ",
        options: [
            "Массив",
            "Запись",
            "Строка ",
            "Множество",
            "Файл ",
        ],
        rightAnswer: 1
    },
    {
        question: "Процедура, которая закрывает ранее открытый файл:",
        options: [
            "Append",
            "Rewrite",
            "Close",
            "Assign",
            "Reset",
        ],
        rightAnswer: 2
    },
    {
        question: "Пусть REC-запись, имеющая поля nom, fio, addres, причем поле fio имеет вложенные поля im и fam. Найдите правильное обращение к полю fam данной записи:",
        options: [
            "fam. fio. REC",
            "REC. fio. fam.",
            "REC. fam. fio.",
            "nom. fio. im. fam.",
            "REC. nom. fio. fam.",
        ],
        rightAnswer: 1
    },
    {
        question: "Назовите оператор, позволяющий обращаться к полям, не указывая каждый раз имя всей записи:",
        options: [
            "Goto",
            "Case",
            "If",
            "With",
            "For",
        ],
        rightAnswer: 3
    },
    {
        question: "Процедура, которая служит для установления связи между файловой переменной и именем того файла, за действия с которым эта переменная будет отвечать:",
        options: [
            "Close",
            "Assign",
            "Append",
            "Reset",
            "Rewrite",
        ],
        rightAnswer: 1
    },
    {
        question: "Процедура, которая служит для открытия существующего файла и считывания из него информации:",
        options: [
            "Rewrite",
            "Assign",
            "Close",
            "Append",
            "Reset",
        ],
        rightAnswer: 4
    },
    {
        question: "Какой оператор правильно вызывает процедуру PROCEDURE Kop(x:integer; var y:integer);",
        options: [
            "Kop(3,7);",
            "Kop(3.5,a);",
            "Kop(4,a);",
            "Kop(9;y);",
            "n:=Kop(5,a);",
        ],
        rightAnswer: 2
    },
    {
        question: "Какой оператор правильно вызывает процедуру PROCEDURE Ct(x,y:char; var z:real);" ,
        options: [
            "Ct('a','b',3.5);",
            "Ct('a','b',b);",
            "Ct(3,a,b);",
            "Ct(a,b,c,d);",
            "s:=Ct(a,b,’3.5’);",
        ],
        rightAnswer: 1
    },
    {
        question: "Процедура, которая открывает уже существующий файл для чтения или изменения, при этом указатель файла устанавливается на его начало.",
        options: [
            "Append",
            "Close ",
            "Reset",
            "Rewrite",
            "Assign",
        ],
        rightAnswer: 2
    },
    {
        question: "С помощью какой функции можно найти и вернуть в основную программу сумму, вычисляемую по формуле " + "<img src='ph55.png'>",
        options: [
            "function sum(n:integer):integer;" + "<br/>" + "var i,sum:integer;" + "<br/>" + "begin" + "<br/>" + "sum:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "sum:=sum+i+5;" + "<br/>" + "end;",
            "function sum(n:integer):integer;" + "<br/>" + "var i,s:integer;" + "<br/>" + "begin" + "<br/>" + "s:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "s:=s+i+5;" + "<br/>" + "end;",
            "function sum(n:integer):integer;" + "<br/>" + "var i:integer;" + "<br/>" + " begin" + "<br/>" + "begin" + "<br/>" + "sum:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "sum:=sum+i+5;" + "<br/>" + "end;",
            "function sum(n:integer):integer;" + "<br/>" + "var i:integer;" + "<br/>" + " s:real;" + "<br/>" + "begin" + "<br/>" + "s:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "s:=s+i+5;" + "<br/>" + "sum:=s;" + "<br/>" + "end;",
            "function sum(n:integer):real;" + "<br/>" + "var i,s:integer;" + "<br/>" + "begin" + "<br/>" + "s:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "s:=s+i+5;" + "<br/>" + "end;",
        ],
        rightAnswer: 2
    },
    {
        question: "С помощью какой процедуры можно найти и вернуть в основную программу произведение, вычисляемое по формуле " + "<img src='ph56.png'>",
        options: [
            "procedure pr(var n:integer;  p:integer);" + "<br/>" + "var i:integer;" + "<br/>" + "begin" + "<br/>" + "p:=1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "p:=p*(i+2);" + "<br/>" + "end;",
            "procedure pr(var n:integer;  p:integer):integer;" + "<br/>" + "var i:integer;" + "<br/>" + "begin" + "<br/>" + "p:=1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "p:=p*(i+2);" + "<br/>" + "end;",
            "procedure pr(n:integer; var p:integer);" + "<br/>" + "var i:integer;" + "<br/>" + "begin" + "<br/>" + "p:=1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "p:=p*(i+2);" + "<br/>" + "end;",
            "procedure pr( n:integer; var p:integer):integer;" + '<br/>' + "var i:integer;" + "<br/>" + "begin" + "<br/>" + "p:=1;" + "<br/>" + "for i:=1 to n do" + '<br/>' + "p:=p*(i+2);" + "<br/>" + "end;",
            "procedure pr(var n:integer;  p:integer);;" + "<br/>" + "var i,p:integer;" + "<br/>" + "begin" + "<br/>" + "p:=1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "p:=p*(i+2);" + "<br/>" + "end;",
        ],
        rightAnswer: 2
    },
    {
        question: "Найдите правильный фрагмент программы ввода с клавиатуры десятиэлементного вектора А:",
        options: [
            "for i:=1 to 10 do write (A[i]);",
            "for i:=1 to 10 read(A);",
            "const A:array[1..10] of real;",
            "for i:=1 to 10 do read (A[i]);",
            "var A:array[1..10] of real; ",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите правильный фрагмент программы вывода на экран значений десятиэлементного вектора A:",
        options: [
            "while A <> 0 do write (A);",
            "write (A:array[1..10]);",
            "for i:=1 to 10 do write (A[i]);",
            "for i:=1 to 10 write (A);",
            "write (A);",
        ],
        rightAnswer: 2
    },
    {
        question: "Оператор While A[1]=’ ‘ do delete (A,1,1);",
        options: [
            "удалит в строке A ведомые пробелы (пробелы после текста)",
            "вставит в строке A пробел после каждого слова" ,
            "вставит в строке A пробел после каждого слова",
            "добавит пробел в начале строки",
            "удалит в строке А ведущие пробелы (пробелы перед текстом);",
        ],
        rightAnswer: 4
    },
    {
        question: "В результате выполнения программы const a=2; b=4; c=15; begin write (a,b); write (c); end; на экран монитора будет выведено:",
        options: [
            "2 4 15",
            "2 4" + "<br/>" + "15",
            "2415",
            "24" + "<br/>" + "15",
            "2" + "<br/>" + "4" + "<br/>" + "15",
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
});

const attention = document.getElementById('attention');

function coratten() {
    if (score >= 12) {
        attention.innerHTML = 'Ты настоящий джедай Pascal!';
    } else {
        attention.innerHTML = 'Тебе не стать программистом!';
    }
};
