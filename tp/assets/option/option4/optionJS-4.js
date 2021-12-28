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
        question: 'В результате выполнения какого фрагмента программы будет решена задача:' + br + '<img src="f31.png" class="std">',
        options: [
            'swith(n)' + br + '{case "1":y=x; break;' + br + 'case "2": y=x*x; break;' + br + 'case "3": y=x*x*x; break;' + br + 'default;' + br + 'break;  }',
            'swith(n)' + br + '{ case 1: y=x; break;' + br + 'case 2: y=x*x; break;' + br + 'case 3: y=x*x*x; break;' + br + 'default:' + br + 'break;   }',
            'swith(n)' + br + '{ case 1 y=x; break' + br + 'case 2 y=x*x; break' + br + 'case 3 y=x*x*x; break' + br + 'default;' + br + 'break  }',
            'swith(n)' + br + '{ case 1 y=x;' + br + 'case 2 y=x*x;' + br + 'case 3  y=x*x;' + br + 'default; }',
            'swith(n)' + br + '{ case 1; y=y; break;' + br + 'case 2; y=x; break;' + br + 'case 3; y=x*x*x; break;' + br + 'default;' + br + 'break;}',
        ],
        rightAnswer: 1
    },
    {
        question: 'Укажите неправильно записанную операцию отношения',
        options: [
            '==',
            '!=',
            '>',
            '<=',
            '<>',
        ],
        rightAnswer: 4
    },
    {
        question: 'К логическим операциям  в языке С++ относятся –',
        options: [
            '!, &,  | |, <, >=',
            '!=, &&,  or',
            'not, and, or, xor',
            'not, &&,  | |',
            '!, &&,  | |',
        ],
        rightAnswer: 4
    },
    {
        question: 'В языке С++ формат условного оператора…',
        options: [
            'if (выражение) оператор1; еlse continue;',
            'if (выражение) then оператор1 еlse оператор2;',
            'if (выражение) оператор1 goto  оператор2;',
            'if (выражение) оператор1; еlse оператор2;',
            'if (выражение) оператор1  еlse оператор2;',
        ],
        rightAnswer: 3
    },
    {
        question: 'К какому типу данных относится признак выбора в операторе switch?',
        options: [
            'default',
            'double',
            'unsigned float',
            'int (char)',
            'float',
        ],
        rightAnswer: 3
    },
    {
        question: 'В языке С++ фрагмент программы' + br + 'main ()' + br + '{int a, b, max;' + br + 'max = а > b ? а : b' + br + 'определяет:',
        options: [
            'присвоить переменной а значение переменной b, если а > b',
            'Если а больше  b, то переменной max будет присвоено значение b, иначе –значение а',
            'Если а больше  b, то переменной max будет присвоено значение а, иначе –значение b',
            'ввод целых чисел типа а, max  и  b',
            'ввод символов а  и  b',
        ],
        rightAnswer: 2
    },
    {
        question: 'Правильный вариант записи функции' + '<img src="f37.png" class="slong">',
        options: [
            'if (x>-2) && (x<5) f=5*sqr(x)+6; else if (x>=5) f=pow(x,3)+7;',
            'if (x>-2 ! x<5) f=5*pow(x,2)+6 else if (x>=5) f=pow(3,x)+7;',
            'if (x>-2 && x<5) f=5*pow(x,2)+6; else if (x>=5) f=pow(x,3)+7;',
            'if (x>-2 & x<5) f=5pow(x,2)+6 else if (x>=5) f=pow(x,3)+7;',
            'if (x>-2 || x<5) f=5*sqr(x)+6; else if (x>=5) f=pow(3,x)+7;',
        ],
        rightAnswer: 2
    },
    {
        question: 'Правильный вариант записи функции' + '<img src="f38.png" class="slong">',
        options: [
            'if (x>0 & x<1) f=sqr(3*pow(x,3)+4)+cos(x);' + br + 'else if (x>=1) f=5-pow(sin(pow(x,9)),2);',
            'if (x>0 && x<1) f=sqrt(3*pow(x,3)+4)+cos(x);' + br + 'else if (x>=1) f=5-pow(sin(pow(x,9)),2);',
            'if (x>0 || x<1) f=sqrt(3*pow(x,3)+4)+cos(x)' + br + 'else if (x=>1) f=5-pow(sin(pow(x,9)),2);',
            'if (x>0) && (x<1) f=sqr(3*pow(x,3)+4)+cos(x);' + br + 'else if (x=>1) f=5-pow(sin(pow(x,9)),2);',
            'if (x>0) && (x<1) f=sqrt(3*pow(x,3)+4)+cos(x)' + br + 'else if (x>1) f=5-pow(sin(pow(x,9),2);',
        ],
        rightAnswer: 1
    },
    {
        question: 'Правильный вариант фрагмента для решения задачи: если а <= b и  с < 5, то а присвоить (с+b)',
        options: [
            'if (a<=b && c<5) a=c+b;',
            'if ((a<=B. || c<5) a=c+b;',
            'if (a<=B. && (c<5) a+=c+b;',
            'if (a<=b !! c<5) a=c+b;',
            'if (a<=b & c<5) a=c+b;',
        ],
        rightAnswer: 0
    },
    {
        question: 'Правильное описание условного оператора для решения задачи: если сумма двух чисел меньше единицы, то найти среднее арифметическое этих чисел, в противном случае – их среднее геометрическое:',
        options: [
            'if (x+y<1) s=(x+y)/2; else s=sqrt(x*y);',
            'if (x+y>1) s=(x+y)/2; else s=sqr(x*y);',
            'if (x+y>1) s=x+y/2; else s=sqr(x*y);',
            'if (x+y<=1) s=(x+y)/2 else s=sqrt(x*y);',
            'if (x+y<1) then s=x+y/2 else s=sqrt(x*y);',
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