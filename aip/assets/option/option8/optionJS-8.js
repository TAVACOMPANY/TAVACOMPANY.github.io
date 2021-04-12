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
        question: "Какой фрагмент программы из ниже перечисленных находит максимальный элемент одномерного массива A размерностью N элементов:",
        options: [
            "for i:=1 to n do" + "<br/>" + "begin" + "<br/>" + "m:=A[1];" + "<br/>" + "if a[i] > m then m:=a[i]" + "<br/>" + "end;",
            "m:=A[1];" + "<br/>" + "for i:=2 to n do" + "<br/>" + "if A[i] > m then m:=A[i];",
            "m:=A[1];" + "<br/>" + "for i:=2 to n do" + "<br/>" + "if A[i] < m then m:=A[i];",
            "m:=A[1];" + "<br/>" + "for i:=2 to n do" + "<br/>" + "if A[i] > m then m:=A[i] else m:=A[i-1];",
            "нет правильного ответа ",
        ],
        rightAnswer: 1
    },
    {
        question: "Какой фрагмент программы из ниже перечисленных находит минимальный элемент в одномерном массиве А размерностью n элементов:",
        options: [
            "m:=a[1];" + "<br/>" + "for i:=1 to n do" + "<br/>" + "if a[i] > m then m:=a[i];",
            "m:=a[1];" + "<br/>" + "for i:=1 to n do" + "<br/>" + "if a[i] < m then m:=a[i] else m:=a[i-1];",
            "for i:=2 to n do" + "<br/>" + "begin" + "<br/>" + "m:=a[1];" + "<br/>" + "if a[i] < m then m:=a[i]" + "<br/>" + "end;",
            "for i:=n downto 1 do" + "<br/>" + "begin" + "<br/>" + "m:=a[1];" + "<br/>" + "if a[i] < m then m:=a[i]" + "<br/>" + "end;",
            "m:=a[1];" + "<br/>" + "for i:=2 to n do" + "<br/>" + "if a[i] < m then m:=a[i];",
        ],
        rightAnswer: 4
    },
    {
        question: "Какой фрагмент программы из ниже перечисленных находит сумму элементов одномерного массива A размерностью n элементов:",
        options: [
            "s:=0;" + "<br/>" + "for i:=n downto 1 do s:=a[i];",
            "s:=1;" + "<br/>" + "for i:=1 to n do s:=s+a[i];",
            "s:=1;" + "<br/>" + "for i:=1 to n do s:=s*a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to n do s:=s*a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to n do s:=s+a[i];",
        ],
        rightAnswer: 4
    },
    {
        question: "Дан одномерный массив A размерностью n элементов. Какой фрагмент из ниже перечисленных находит значение y=a[1]-a[2]+a[3]-a[4]+ ... -a[n-1]+a[n] ?",
        options: [
            "y:=0; k:=1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "begin" + "k:=k*(-1);" + "<br/>" + "y:=y+k*a[i]" + "<br/>" + "end;",
            "y:=0; k:= -1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "begin" + "<br/>" + "y:=y+k*a[i];" + "<br/>" + "k:=k*(-1)" + "<br/>" + "end;",
            "y:=0; k:= -1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "begin" + "<br/>" + "k:=k*(-1);" + "<br/>" + "y:=y+k*a[i]" + "<br/>" + "end;",
            "y:=0; k:= 1;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "y:=y+a[i]*k;" + "<br/>" + "k:=k*(-1);",
            "y:=0; k:= -1;" + "<br/>" + "for i:=n diwnto 1 do" + "<br/>" + "begin" + "<br/>" + "y:=y+k*a[i];" + "<br/>" + "k:=k*(-1)" + "<br/>" + "end;",
        ],
        rightAnswer: 2
    },
    {
        question: "Какой фрагмент из ниже перечисленных находит максимальный элемент матрицы A размером N x N ?",
        options: [
            "m:=a[1,1];" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,i] > m then m:=a[i,i];",
            "m:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "m:=m+a[i,j];" + "<br/>" + "m:=m/(n*n);",
            "for i:=1 to n do" + "<br/>" + "begin" + "<br/>" + "m:=a[i,1];" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] > m then m:=a[i,j]" + "<br/>" + "end;",
            "m:=a[1,1];" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] > m then m:=a[i,j];",
            "m:=a[1,1];" + "<br/>" + "for i:=n downto 1 do" + "<br/>" + "for j:=n downto 1 do" + "<br/>" + "if a[i,i] > m then m:=a[i,j];",
        ],
        rightAnswer: 3
    },
    {
        question: "Какой фрагмент из ниже перечисленных находит минимальный элемент матрицы A размером N x N?",
        options: [
            "m:=0;" + "<br/>" + "for i:=n downto 1 do" + "<br/>" + "for j:=n to 1 do" + "<br/>" + "if a[i,j] < a[i,j+1] then m:=a[i,j] else m:=a[i,j+1];",
            "m:=a[1,1];" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] < m then m:=a[i,j];",
            "m:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] < a[i,j+1] then m:=a[i,j] else m:=a[i,j+1];",
            "m:=a[1,1];" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,i] < m then m:=a[i,j];",
            "for i:=1 to n do" + "<br/>" + "begin" + "<br/>" + "m:=a[i,1];" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] < m then m:=a[i,j]" + "<br/>" + "end;",
        ],
        rightAnswer: 1
    },
    {
        question: "Какой фрагмент из ниже перечисленных выводит на экран сумму элементов каждой строки матрицы A размером N x N?",
        options: [
            "s:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "begin" + '<br/>' + "for j:=1 to n do" + '<br/>' + "s:=s+a[i,j];" + "<br/>" + "writeln(s);" + "<br/>" + "end;",
            "s:=0;" + "<br/>" + "for i:=1 to n do" + "<br/>" + "for i:=1 to n do" + "<br/>" + "s:=s+a[i,j];" + "<br/>" + "writeln(s);",
            "for i:=1 to n do" + "<br/>" + "begin" + "<br/>" + "s:=0;" + "<br/>" + "for j:=1 to n do" + "<br/>" + "s:=s+a[i,j];" + "<br/>" + "writeln(s);" + "<br/>" + "end;",
            "for i:=1 to n do" + '<br/>' + "begin" + "<br/>" + "s:=0;" + "<br/>" + "for j:=1 to n do" + "<br/>" + "s:=s+a[i,j];" + "<br/>" + "end;" + "<br/>" + "writeln(s);",
            "s:=0;" + "<br/>" + "for i:=n downto 1 do" + "<br/>" + "begin" + "<br/>" + "for j:=1 to n do" + "<br/>" + "s:=s+a[i,j];" + "<br/>" + "writeln(s);" + "<br/>" + "end;",
        ],
        rightAnswer: 2
    },
    {
        question: "Какой фрагмент из ниже перечисленных меняет отрицательные элементы матрицы A размером N x N на нули?" ,
        options: [
            "for i:=n downto 1 do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] > 0 then" + "<br>" + "a[i-1,j]:=0;",
            "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] > 0 then" + "<br/>" + "a[i-1,j]:=0;",
            "for i:=1 to n do" + "<br/>" + "for j:=1 to n do if a[i,j] < 0 then" + "<br/>" + "begin" + "<br/>" + "x:=i;" + "<br/>" + "y:=j" + "<br/>" + "end;",
            "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] < 0 then a[i,j]:=0;",
            "for i:=1 to n do" + "<br/>" + "for j:=1 to n do" + "<br/>" + "if a[i,j] > 0 then a[i,j-1]:=0;",
        ],
        rightAnswer: 3
    },
    {
        question: "Именованная область внешней памяти, содержащая последовательность компонент одного типа, причем число компонент не оговаривается, называется ",
        options: [
            "Массивом",
            "Файлом ",
            "Строкой ",
            "Записью ",
            "Множеством",
        ],
        rightAnswer: 1
    },
    {
        question: "Процедура, которая открывает новый файл для записи, при этом указатель файла устанавливается на его начало. Если уже имелся файл с этим именем, он уничтожается.",
        options: [
            "Rewrite ",
            "Append",
            "Close",
            "Reset",
            "Assign",
        ],
        rightAnswer: 0
    },
    {
        question: "Процедура, которая открывает существующий текстовый файл для его дополнения, при этом указатель файла устанавливается на конец файла",
        options: [
            "Rewrite",
            "Close",
            "Append",
            "Reset",
            "Assign",
        ],
        rightAnswer: 2
    },
    {
        question: "Функция, которая возвращает значения TRUE, если достигнут конец файла f:",
        options: [
            "Seekeof(f)",
            "Seekeoln(f)",
            "Write(f)",
            "Eof(f)",
            "Eoln(f)",
        ],
        rightAnswer: 3
    },
    {
        question: "Функция, которая возвращает значение TRUE, если достигнут конец строки в файле f (указатель находится сразу за последним элементом строки), и FALSE в противном случае:",
        options: [
            "Eof(f)",
            "Seekeoln(f)",
            "Write(f)",
            "Seekeof(f)",
            "Eoln(f) ",
        ],
        rightAnswer: 4
    },
    {
        question: "Процедура, которая записывает значение переменной z в открытый для записи файл, связанный с файловой переменной f",
        options: [
            "Rewrite(f,z)",
            "Write(f,z)" ,
            "Read(f,z)",
            "Reset(f,z)",
            "Read(z,f)",
        ],
        rightAnswer: 1
    },
    {
        question: "Процедура, которая считывает значение компоненты файла f по указателю файла в переменную z",
        options: [
            "Read(f,z)",
            "Rewrite(f,z)",
            "Write(f,z)",
            "Reset(f,z)",
            "Write(z,f)",
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
