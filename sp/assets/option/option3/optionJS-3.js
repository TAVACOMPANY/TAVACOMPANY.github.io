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
        question: 'Функции работы с каталогами:',
        options: [
            'CreateThread())',
            'CreateDirectory()',
            'lpBackupFileName',
            'ReadFile()',
            'CopyFile()',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функция fd=open(pathname,flags,modes)n возвращает дескриптор в',
        options: [
            'flags',
            'pathname',
            'fd',
            'modes',
            'open',
        ],
        rightAnswer: 2
    },
    {
        question: 'POSIX совместимые системы:',
        options: [
            'UNIX, FreeBSD',
            'Windows , Linux, Open VMS',
            'Windows, FreeBSD',
            'Windows, UNIX',
            'Windows Mac OS X',
        ],
        rightAnswer: 0
    },
    {
        question: 'POSIX-совместимые системы это:',
        options: [
            'Linux, Windows',
            'Mac OS X',
            'Windows, FreeBSD',
            'Windows',
            'UNIX, Windows',
        ],
        rightAnswer: 1
    },
    {
        question: 'Выберите, какие существуют типы операционных систем:',
        options: [
            'монопрограммная',
            'однопрограммная или с низким приоритетом',
            'однопроцессорная или мультипроцессорная',
            'с высоким приоритетом',
            'с низким приоритетом',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для работы с каталогами применяются следующие функции:',
        options: [
            'RemoveDirectory()',
            'CreateThread()',
            'lpBackupFileName',
            'ReadFile()',
            'CopyFile()',
        ],
        rightAnswer: 0
    },
    {
        question: 'К POSIX совместимым системам относятся:',
        options: [
            'Mac OS X, Windows',
            'Windows, OpenVMS',
            'Windows, FreeBSD',
            'UNIX, Windows',
            'Linux, Open VMS,',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кластер это:',
        options: [
            'область, состоящая из нескольких секторов',
            'наибольшая область магнитного диска',
            'область, которая может быть записана на диск',
            'область, состоящая из нескольких цилиндров',
            'область, состоящая из нескольких дорожек',
        ],
        rightAnswer: 3
    },
    {
        question: 'По определению, кластер это:',
        options: [
            'область, состоящая из нескольких цилиндров',
            'область, которая может быть записана или прочитана с диска',
            'область, которая может быть прочитана с диска',
            '@ область, которая может быть записана на диск',
            '@ область, состоящая из нескольких дорожек',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сектор это:',
        options: [
            'область дорожки нумерация, которой начинается с 2',
            'область дорожки нумерация, которой начинается с 0',
            'наименьшая область одной дорожки магнитного диска',
            'область дорожки размером 2048 байт',
            'наибольшая область одной дорожки магнитного диска',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});