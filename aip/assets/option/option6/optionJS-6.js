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
        question: "Результат выполнения подпрограммы-функции в головную программу передается через:",
        options: [
            "Имя функции",
            "Массив",
            "Параметры-переменные",
            "Параметры-значения",
            "Метки",
        ],
        rightAnswer: 0
    },
    {
        question: "Результат выполнения подпрограммы-процедуры в головную программу передается через:",
        options: [
            "Параметры-переменные",
            "Массив",
            "Имя функции",
            "Параметры-значения",
            "Имя процедуры",
        ],
        rightAnswer: 0
    },
    {
        question: "Укажите верный заголовок подпрограммы-функции:",
        options: [
            "Function F(a, b: real);",
            "Function F(a, b: real): real;",
            "Function F(a, b: real) real;",
            "Function F(a, b): real;",
            "Function F: real;",
        ],
        rightAnswer: 1
    },
    {
        question: "Укажите верный заголовок подпрограммы-процедуры:",
        options: [
            "Procedure F(a, b: real; s: real):real;",
            "Procedure F(a, b: real; var s: real);",
            "Procedure F(a, b: real, var s: real);",
            "Prosedure F(a, b: real; var s: real);",
            "Procedura F(a, b: real; var s: real);",
        ],
        rightAnswer: 1
    },
    {
        question: "В подпрограмме c заголовком Procedure Pr(A: real; n, m: integer; var P: real; var k: integer); результат в головную программу будет передаваться через:",
        options: [
            "Переменную P",
            "Переменную Pr",
            "Переменные P, k",
            "Переменную k",
            "Переменные n, m",
        ],
        rightAnswer: 2
    },
    {
        question: "В подпрограмме, имеющей заголовок Function Sum (A: real; n, m: integer): real; результат в головную программу будет передаваться через:",
        options: [
            "Переменную A",
            "Переменную n",
            "Переменную Sum",
            "Переменную m",
            "Переменные n, m",
        ],
        rightAnswer: 2
    },
    {
        question: "Найдите правильный вариант обращения к подпрограмме-функции:",
        options: [
            "F(5, 3, A):=Y;",
            "F(5, 3, A);",
            "Y=F(5, 3, A);",
            "Y:=F(5, 3, A);",
            "Y=F(5, 3, A);",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите правильный вариант обращения к подпрограмме-процедуре:" ,
        options: [
            "Y:=F(n, m: real; A: t; var Sum: real);",
            "F(5; 3; A; Sum);",
            "Y:=F(5, 3, A, Sum);",
            "F(5, 3, A, Sum);",
            "F(n, m: real; A: integer; var Sum: real);",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите правильный фрагмент программы подсчета суммы элементов каждой строки матрицы А размером 3х5:",
        options: [
            "For i:=1 to 3 do begin k[i]:=0; for j:=1 to 5 do k[j]:=k[j]+a[i, j];  end;",
            "k[j]:=0; for i:=1 to 3 do for j:=1 to 5 do k[j]:=k[j]+a[i, j]; end;",
            "For i:=1 to 3 do k[i]:=0; for j:=1 to 5 do k[i]:=k[i]+a[i, j];",
            "For j:=1 to 5 do begin k[i]:=0; for j:=1 to 3 do k[i]:=k[i]+a[i, j]; end;",
            "For i:=1 to 3 do begin k[i]:=0; for j:=1 to 5 do k[i]:=k[i]+a[i, j]; end;",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите правильный фрагмент программы подсчета суммы элементов матрицы А размером 3х5:",
        options: [
            "For i:= to 3 do S:=0; for j:=1 to 5 do S:=S+a[i, j];",
            "S:=0; for i:=1 to 3 do for j:=1 to 5 do S:=S+1;",
            "For i:=1 to 3 do begin S:=0; for j:=1 to 5 do S:=S+a[i,j]; end;",
            "For i:=1 to 3 do begin S:=0; for j:=1 to 5 do S:=S+a[i,j]; end;",
            "S:=0; for i:=1 to 3 do for j:=1 to 5 do S:=S+a[i, j];",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите правильный фрагмент программы накапливания произведения элементов матрицы А размером 4х4:",
        options: [
            "P:=1; for i:=1 to 4 do for j:=1 to 4 do P:=P*a[i, j];",
            "For i:=1 to 4 do for j:=1 to 4 do P:=P*a[i, j];",
            "For i:=1 to 4 do begin P:=1; for j:=1 to 4 do P:=P+a[i, j]; end;",
            "For i:=1 to 4 do begin P:=1; for j:=1 to 4 do P:=P+a[i, j]; end;",
            "For i:=1 to 4 do P:=0; for j:=1 to 4 do P:=P*a[i, j];",
        ],
        rightAnswer: 0
    },
    {
        question: "Найдите правильный фрагмент программы подсчета суммы элементов каждого столбца матрицы А размером 4х3:",
        options: [
            "For j:=1 to 3 do begin k[j]:=0; for i:=1 to 4 do k[j]:=k[j]+a[i, j]; end;",
            "For j:=1 to 4 do begin k[j]:=0; for i:=1 to 3 do k[j]:=k[j]+a[i, j];",
            "For j:=1 to 3 do k[j]:=0; for i:=1 to 4 do k[j]:=k[j]+a[i, j];",
            "k[i]:=0; for i:=1 to 4 do for j:=1 to 3 do  k[j]:=k[j]+a[i, j];",
            "For j:=1 to 3 do begin k[j]:=1; for i:=1 to 4 do k[j]:=k[j]+a[i, j]; end;",
        ],
        rightAnswer: 0
    },
    {
        question: "Найдите правильный фрагмент поиска минимального элемента главной диагонали матрицы D размером 5х5:",
        options: [
            "For i:=2 to 5 do if d[i, i] < min then min:=d[i, i];",
            "min:=d[1,1]; for i:=2 to 5 do if d[i, i] < min then min:=d[i, i];",
            "min:=0; for  i:=2 to 5 do if d[i, i] < min then min:=d[i, i];",
            "min:=d[1,1]; for i:=2 to 5 do if d[i, i] > min then min:=d[i, i];",
            "min=d[1,1]; for i:=2 to 5 do if d[i, i] < min then min=d[i, i];",
        ],
        rightAnswer: 1
    },
    {
        question: "Найдите правильный фрагмент поиска суммы элементов главной диагонали матрицы А размером 5х5:",
        options: [
            "S:=1; for i:=1 to 5 do S:=S+a[i, i];",
            "S:=0; for i:=1 to 5 do S:=S+a[i, i];" ,
            "S:=0; for i:=1 to 5 do S:=S+1;",
            "For i:=1 to 5 do S:=S+a[i, i];",
            "For i:=1 to 5 do S:=S+a[i, i];",
        ],
        rightAnswer: 1
    },
    {
        question: "Найдите правильный фрагмент поиска произведения элементов побочной диагонали матрицы Р размером 4х4:",
        options: [
            "P:=1; for i:=1 to 4 do P:=P*b[5-i];",
            "P:=0; for i:=1 to 4 do P:=P*b[i, 5-i];",
            "P:=1; for i:=1 to 4 do P:=P*b[i, 5-i];",
            "P=0; for i:=1 to 4 do P:=P*b[i, i];",
            "P=0; for i:=1 to 4 do P:=P*b[i, i];",
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
