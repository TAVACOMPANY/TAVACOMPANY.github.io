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
        question: 'В языке С++ правильный фрагмент программы для нахождения суммы чисел от 1 до 10:',
        options: [
            'main()' + br + '{ int i, s=0;' + br + 'for (i=1; i<=10; i++) s*=i;' + br + 'printf ( "s=%d" ,  s);}',
            'main()' + br + '{ int i, s=0;' + br + 'for (i=1; i<=10; i++) s+=i;' + br + 'printf( "s=%d" ,  s);}',
            'main()' + br + '{ int i, s=0;' + br + 'for (i=1; i<=10; i++) s+=i;' + br + 'printf ( "s=%f" ,  s);}',
            'main()' + br + '{ int i, s=0;' + br + 'for (i=1; i<=10; i++) s+=i;' + br + 'printf ( "i=%d" ,  i);}',
            'main()' + br + '{ int i, s=0;' + br + 'for (i=1; i<10; i++) s+=i;' + br + 'printf ( "s=%d" ,  s);}',
        ],
        rightAnswer: 1
    },
    {
        question: 'В языке С++ правильное описание цикла WHILE для вычисления' + '<img src="f72.png" class="std">',
        options: [
            'i=1; s=1;' + br + 'while (i<=n)' + br + '{ s+=i*x+1; i--; }',
            's=0;' + br + 'while (i<=n)' + br + 's+=i*x+1; i+-;',
            'i=1; s=1;' + br + 'while i>=n' + br + 's+=i*x+1; i++;',
            'i=1; s=0;' + br + 'while (i<n)' + br + '{ s+=ix+1;  i++; }',
            'i=1; s=0;' + br + 'while (i<=n)' + br + '{ s+=i*x+1; i++; }',
        ],
        rightAnswer: 4
    },
    {
        question: 'Правильное описание цикла WHILE на языке С++ для вычисления' + '<img src="f73.png" class="std">?',
        options: [
            'k=1; s=1;' + br + 'while (k<=n)' + br + '{ s+=k*x+10; k--; }',
            's=0;' + br + 'while (k<=n)' + br + 's+=k*x+10; i++;',
            'k=1; s=1;' + br + 'while k<=n' + br + 's+=k*x+10; k++;',
            'k=1; s=0;' + br + 'while (k<n)' + br + '{ s+=kx+10; k++; }',
            'k=1; s=0;' + br + 'while (k<=n)' + br + '{ s+=k*x+10; k++;}',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0; i=3;' + br + 'do' + br + '{k += i; i––;}' + br + 'while (i >= 0);',
        options: [
            '–6',
            '4',
            '3',
            '6',
            '–3',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0; i=3;' + br + 'do' + br + '{k –= i; i––;}' + br + 'while (i > 0);',
        options: [
            '–2',
            '0',
            '–3',
            '–6',
            '–4',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 1; i=3;' + br + 'do' + br + '{k–– ; i––;}' + br + 'while (i >= 0);',
        options: [
            '–5',
            '–6',
            '–3',
            '0',
            '–2',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k=0;' + br + 'for (i = 1, j=2; i <= 2; i++)' + br + 'k += i+j;',
        options: [
            '15',
            '2',
            '7',
            '5',
            '10',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0;' + br + 'for (j = 1; j <= 3; j++)' + br + 'k += j;',
        options: [
            '5',
            '6',
            '4',
            '2',
            '7',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'for (i = 1, k=0; i <= 2; i++)' + br + 'for (j = 1; j <= 3; j++)' + br + 'k += i+j;',
        options: [
            '21',
            '5',
            '10',
            '20',
            '15',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0;' + br + 'for (i = 1; i <= 2; i++)' + br + 'for (j = 1; j <= 3; j++)' + br + 'k += j;',
        options: [
            '12',
            '5',
            '6',
            '10',
            '15',
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