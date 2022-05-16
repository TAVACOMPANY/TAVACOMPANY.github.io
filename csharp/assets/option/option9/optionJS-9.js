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
      br = '</br>';

const questions = [
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'k = 0; i =3;' + br + 'do' + br + '{k – = i; i – –;}' + br + 'while (i > 0);',
        options: [
            '-3',
            '-4',
            '-6',
            '-2',
            '0',
        ],
        rightAnswer: 2
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
        question: 'Какая команда используется для передачи управления на начало цикла:',
        options: [
            'continue',
            'while',
            'break',
            'swith',
            'default',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд:' + br + 'for (i = 1; i < = 2; i + +)' + br + 'for (j = 1; j < = 3; j + +)' + br + 'k + = i +j',
        options: [
            '5',
            '21',
            '10',
            '20',
            '15',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое значение получит переменная к при выполнении следующих команд:' + br + 'k = 0;' + br + 'for (i = 1; i < = 2; i + +)' + br + 'for (j = 1; j < = 3; j + +)' + br + 'k + = j;',
        options: [
            '15',
            '10',
            '6',
            '5',
            '12',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какой результат  будет выведен после выполнения программы:' + br + 'using System;' + br + 'class StringSwitch {' + br + 'public static void Main() {' + br + 'string[] strs = { "один", "два", "три", "два", "один" };' + br + 'foreach(string s in strs) {' + br + 'switch(s) {' + br + 'case "один":' + br + 'Console.Write(In-' + br + 'break;' + br + 'case "два":' + br + 'Console.Write(2);' + br + 'break;' + br + 'case "три":' + br + 'Console.Write (3);' + br + 'break;' + br + '   }' + br + '}' + br + 'Console.WriteLine();' + br + '   }' + br + '}',
        options: [
            '12231',
            '32121',
            '21321',
            '12321',
            '13221',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой результат выполнения этой программы:' + br + '// Использование типа byte.' + br + 'using System;' + br + 'class Use_byte {' + br + 'public static void Main() {' + br + 'byte x;' + br + 'int sum;' + br + 'sum =0;' + br + 'for(x = 1; x <= 10; x++)' + br + 'sum = sum + x;' + br + 'Console.WriteLine("Сумма чисел от 1 до 10 равна " + sum) ;' + br + '    }' + br + '}',
        options: [
            'Сумма чисел от 1 до 10  равна  50',
            'Сумма чисел от 1 до 10  равна 100',
            'Сумма чисел от 1 до 10  равна 55',
            'Сумма чисел от 1 до 10 равна 45 ',
            'Сумма чисел от 1 до 10 равна 10',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое значение получит переменная k при выполнении следующих команд: ' + br + 'k = 1; for (i = 1; i < = 3; i + +) k* = i;',
        options: [
            '6',
            '3',
            '4',
            '5',
            '9',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое значение получит переменная к при выполнении следующих команд:' + br + 'k = 0;' + br  + 'for (i = 3; i > = 0; i - -) k + +;',
        options: [
            '-4',
            '6',
            '-3',
            '3',
            '4',
        ],
        rightAnswer: 4
    },
    {
        question: 'В каком из приведенных фрагментов  будет правильно найдена сумма ' + '<img src="sum.png">', 
        options: [
            'int i=1, s=0;' + br + 'while (++i<=5)' + br + 'i++;s + = i;',
            'int i=1, s=0;' + br + 'while (i<=5)' + br + '{s + = i; i + +;}',
            'int i=1, s=0;' + br + 'while (i<=5)' + br + 's + = i; i++;',
            'int i=1, s=0;' + br + 'while (i>=5)' + br + '{i++;s+=i;};',
            'int i=1, s=0;' + br + 'while (i<5)' + br + '{++i; s + = i;}{++i; s + = i;}',
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
});