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
        question: 'Формат оператора цикла с параметром;',
        options: [
            'for начальный_параметр to конечный_параметр do тело_цикла',
            'for  (выражение 1; выражение 2; выражение 3)' + br + '{тело_цикла}',
            'while (условие)' + br + '{ тело_цикла }',
            'do' + br + '{тело_ цикла }' + br + 'while (условие);',
            'while (условие) do' + br + '{ тело_цикла }',
        ],
        rightAnswer: 1
    },
    {
        question: 'Формат оператора цикла с предусловием;',
        options: [
            'do' + br + '{тело_ цикла }' + br + 'while (условие);',
            'while (условие) do' + br + '{ тело_цикла }',
            'for  (выражение 1; выражение 2; выражение 3)' + br + '{тело_цикла}',
            'for начальный_параметр to конечный_параметр do тело_цикла' ,
            'while (условие)' + br + '{ тело_цикла }',
        ],
        rightAnswer: 4
    },
    {
        question: 'Формат оператора цикла с постусловием;',
        options: [
            'while (условие)' + br + '{ тело_цикла }',
            'do (условие)' + br + '{ тело_цикла }' + br + 'while;',
            'do (условие)' + br + '{ тело_цикла }',
            'for  (выражение 1; выражение 2; выражение 3) ' + br + '{тело_цикла}',
            'do' + br + '{тело_ цикла } while (условие);',
        ],
        rightAnswer: 4
    },
    {
        question: 'Оператор continue –',
        options: [
            'оператор циклического сдвига',
            'оператор возврата из функции',
            'оператор безусловного перехода',
            'oператор перехода к следующей итерации цикла, пропускает все операторы, оставшиеся до конца тела цикла, и передает управление на начало следующей итерации',
            'используется внутри операторов цикла, if или switch для обеспечения перехода в точку программы, находящуюся непосредственно за оператором, внутри которого находится break',
        ],
        rightAnswer: 3
    },
    {
        question: 'Cледующий фрагмент программы на языке С++'  + br + 'for (i=1; i<=100; i++)'  + br + '{ if(i%2) continue;'  + br + 'printf(“/t %d”, i); }',
        options: [
            'обеспечивает вывод на экран всех нечетных чисел в диапазоне от 1 до 99',
            'обеспечивает вывод на экран всех чисел в диапазоне от 1 до 100',
            'обеспечивает вывод на экран всех нечетных чисел в диапазоне от 1 до 100',
            'обеспечивает вывод на экран всех четных чисел в диапазоне от 1 до 100',
            'обеспечивает вывод на экран всех четных чисел в диапазоне от 1 до 99',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком из приведенных фрагментов программы будут найдены значение y=ax2 +bx+c при x изменяющимся от 1 до 10 с шагом 1:',
        options: [
            'for ( x=1; x<=10; x++)' + br + 'prntf(“%d   %d”,x,y);' + br + 'y=a*x*x+b*x+c;',
            'for ( x=1; x<=10; ++x)' + br + '{prntf(“%d   %d”,x,y);' + br + 'y=a*x*x+b*x+c;' + br + '}',
            'for ( x=1; x<=10; x++)'  + br + '{y=a*x*x+b*x+c;' + br + 'prntf(“%d   %d”,x,y);' + br + '}',
            'for ( x=1; x<=10; x++)' + br + 'y=a*x*x+b*x+c;' + br + 'prntf(“%d   %d”,x,y);',
            'for ( x=1; x<10; ++x)' + br + 'y=a*x*x+b*x+c;' + br + 'prntf(“%d   %d”,x,y);',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0;'  + br + 'for (i = 1; i< = 5; i++)' + br + 'k += i;',
        options: [
            '10',
            '20',
            '15',
            '6',
            '5',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная к при выполнении следующих команд:' + br + 'k = 0;' + br + 'for (i = 3; i > = 0; i--)' + br + 'k++;',
        options: [
            '3',
            '4',
            '–3',
            '6',
            '–4',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 1;' + br + 'for (i = 3; i >= 0; i--)' + br + 'k *= i;',
        options: [
            '0',
            '6',
            '3',
            '4',
            '–3',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 1;' + br + 'for (i = 3; i > 0; i --)' + br + 'k *= i;',
        options: [
            '6',
            '4',
            '–3',
            '3',
            '–6',
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