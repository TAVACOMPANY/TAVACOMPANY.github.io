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
        question: 'В каком из приведенных операторов будет найдена сумма' + '<img src="f6.png" class="std">',
        options: [
            'for (s = 0, i = 1; i <= 5; i++, s += i);',
            'for (s = 0, i = 1; i <= 5; i++)  s += i;',
            'for (s = 0, i = 1; i <= 5; s += ++i);',
            'for (s = 0, i = 1; i <= 5; s += (++i));',
            'for (s = 0, i = 1; i <= 5; ++i, s += i);',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком из приведенных операторов будет найдена сумма' + '<img src="f7.png" class="std">',
        options: [
            'int i=1, s=0;' + br + 'while (i<5)' + br + '{++i;s += i;}',
            'int i=1, s=0;' + br + 'while (i<=5)' + br + '{i++; s+=i;};',
            'int i=1, s=0;' + br + 'while (i<=5)' + br + 's += i; i++;',
            'int i=1, s=0;' + br + 'while (++i<=5)' + br + 'i++;s += i;',
            'int i=1, s=0;' + br + 'while (i<=5)' + br + '{s + = i; i++;}',
        ],
        rightAnswer: 4
    },
    {
        question: 'В каком из приведенных операторов будет получена сумма' + '<img src="f8.png" class="std">' ,
        options: [
            'int i=1, s=0;' + br + 'do' + br + '{++i;' + br + 's += i;' + br + '}' + br + 'while (i>=5);',
            'int i=1, s=0;' + br + 'do' + br + '{  i++;' + br + 's + = i;' + br + '}' + br + 'while (i<=5);',
            'int i=1, s=0;' + br + 'do' + br + 'i++;' + br + 's += i;' + br + 'while (i<=5);',
            'int i=1, s=0;' + br + 'do' + br + 's += i;' + br + 'i++;' + br + 'while (i<=5);',
            'int i=1, s=0;' + br + 'do' + br + '{s += i;' + br + ' i++;' + br + '}' + br + 'while (i<=5);',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая команда прерывает работу операторов цикла:',
        options: [
            'default',
            'case',
            'swith',
            'break',
            'continue',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0;' + br + 'for (i = 1; i <= 5; i++)' + br + 'k++;',
        options: [
            '10',
            '4',
            '6',
            '5',
            '1',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 1;' + br + 'for (i = 1; i <= 3; i++)' + br + 'k *= i;',
        options: [
            '4',
            '3',
            '6',
            '5',
            '9',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k= 1;' + br + 'for (i = 1; i <= 3; i++)' + br + 'k -= i;',
        options: [
            '–4',
            '0',
            '–5',
            '–3',
            '–1',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0; i =1;' + br + 'do' + br + '{k++ ; i++;}' + br + 'while (i <= 3);',
        options: [
            '4',
            '3',
            '6',
            '9',
            '5',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 1; i =1;' + br + 'do' + br + '{k *= i; i++;}' + br + 'while (i <= 3);',
        options: [
            '6',
            '4',
            '3',
            '5',
            '9',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0; i =1;' + br + 'do' + br + '{k += i; i++;}' + br + 'while (i <= 5);',
        options: [
            '15',
            '6',
            '5',
            '20',
            '10',
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