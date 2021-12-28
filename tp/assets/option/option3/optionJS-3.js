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
        question: 'В языке С++ для программирования ветвящихся алгоритмов относятся:',
        options: [
            'операторы while, switch и for',
            'операция “условиe ?:”, условный оператор if и опе¬ратор выбора switch.',
            'условный оператор if, операторы while и for',
            'операторы switch, break и for.',
            'операторы while, switch. и if',
        ],
        rightAnswer: 1
    },
    {
        question: 'В языке С++ правильный вариант записи' + '<img src="f22.png" class="std">',
        options: [
            'y=(1+cos(y-2))/(pow(x,4)/2+sqr(sin(z));',
            'y=1+cos(y-2)/(pow(x,4)/2+pow(sin(z),2));',
            'y:=(1+cos(y-2))/(pow(x,4)/2+sqr(sin(z));',
            'y=(1+cos(y-2))/(pow(4,x)/2+pow(2,sin(z)));',
            'y=(1+cos(y-2))/(pow(x,4)/2+pow(sin(z),2));',
        ],
        rightAnswer: 4
    },
    {
        question: 'В языке С++ правильный вариант записи:' + '<img src="f23.png" class="slong">',
        options: [
            'y:=pow(pow(x,3)+4,1/5)+ pow(sin(4,x))+ pow(tg(x,3));',
            'y=pow(1/5, pow(x,3)+4)+ pow(sin(x,4))+tg(pow(3,x));',
            'y=pow(1/5,pow(x,3)+4)+sin(pow(4, x))+tan(pow(3, x));',
            'y=pow(pow(x,3)+4,1/5)+sin(pow(x,4)+tan(pow(x,3);',
            "y=pow((pow(x,3)+4),1/5)+sin(pow(x,4))+ tan( pow (x,3));",
        ],
        rightAnswer: 4
    },
    {
        question: 'В языке С++ правильный вариант записи выражений: ' + '<img src="f24a.png" class="slong">',
        options: [
            'a=2*cos(x-3.14)/(3+sin(pow(y,2)); b=1+pow(z,2)/(3+pow(z,2)/5);',
            'a=2cos(x-3.14)/(3+sin(pow(y,2)); b=1+pow(z,2)/(3+pow(z.2)/5);',
            'a=2cos(x-3,14)/(3+pow(sin(y),2)); b=1+pow(z,2)/(3+pow(z,2)/5);',
            'a=2*cos(x-3.14)/(3+pow(sin(y),2)); b=1+pow(z,2)/(3+pow(z,2)/5);',
            'a:=2*cos(x-3.14)/(3+pow(sin(y,2)); b=1+pow(z,2)/(3+pow(z.2)/5);',
        ],
        rightAnswer: 3
    },
    {
        question: 'В языке С++ правильный вариант описания функции' + '<img src="f25.png" class="slong">',
        options: [
            'y=pow(cos(x),2)+pow((3.14+pow((2-x),1/5)),3);',
            'y:=pow(cos(x),2)+pow((3,14+pow((2-x),5)),1/3);',
            'y= cos (pow (x,2)+pow((3,14+pow((2-x),5)),1/3);',
            'y=pow(cos(x),2)+pow((3.14+pow((2-x),5)),1/3);',
            'y= cos (pow (x,2)+pow((3.14+pow((2-x),5)),1/3);',
        ],
        rightAnswer: 3
    },
    {
        question: 'В языке С++ правильный вариант описания функции' + '<img src="f26.png" class="slong">',
        options: [
            'y=pow(cos(x),2)+pow((3.14+pow((2-x),1/5)),3);',
            'y:=pow(cos(x),2)+pow((3,14+pow((2-x),5)),1/3);',
            'y=pow(cos(x),2)+pow((3.14+pow((2-x),5)),1/3);',
            'y= cos (pow (x,2)+pow((3.14+pow((2-x),5)),1/3);',
            'y= cos (pow (x,2)+pow((3,14+pow((2-x),5)),1/3);',
        ],
        rightAnswer: 2
    },
    {
        question: 'В языке С++ инструкции препроцессора называются',
        options: [
            'переменными',
            'операторами',
            'директивами',
            'функциями',
            'процедурами',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выполнения фрагмента программы на языке С++:' + br + 'main()' + br + '{int a,b,c;' + br + 'a=b=15%3+(2+8/2+4)-12+24%5;' + br + 'c=(a+b)*4;' + br + 'printf( “a=%d, b=%d, c=%d”, a, b, c);}',
        options: [
            'a=4, b=4, c=32',
            'a=2, b=2, c=16',
            'a=2, b=2, c=8',
            'a=4, b=4, c=16',
            'a=3, b=4, c=12',
        ],
        rightAnswer: 1
    },
    {
        question: 'В языке С++ правильный вариант вывода на экран переменных i и b:',
        options: [
            'int i = 10;' + br + 'float b = 12.5;' + br + 'printf ("%d/n", i);' + br + 'printf ("%f/n", b);',
            'int i = 10;' + br + 'float b = 12.5;' + br + 'printf ("%f/n", i);' + br + 'printf ("%d/n", b);',
            'int i = 10;' + br + 'float b = 12.5;' + br + 'scanf ("%f/n", i);' + br + 'scanf ("%d/n", b);',
            'int i = 10;' + br + 'float b = 12.5;' + br + 'cout ("%f/n", i);' + br + 'cout ("%d/n", b);',
            'int i = 10;' + br + 'float b = 12.5;' + br + 'cout ("%d/n", i);' + br + 'cout ("%f/n", b);',
        ],
        rightAnswer: 0
    },
    {
        question: 'Оператор для выхода из оператора SWITCH и операторов цикла?',
        options: [
            'break',
            'continue',
            'goto',
            'typedef',
            'return',
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