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
        question: 'В операционной системе Windows имеются следующие потоки:',
        options: [
            'потоки приложений пользователя',
            'системные',
            'серверные',
            'пользовательские прерывания',
            'кластерные',
        ],
        rightAnswer: 1
    },
    {
        question: 'В операционной системе Windows различают следующие виды потоков:',
        options: [
            'серверные',
            'потоки приложений пользователя',
            'пользовательские',
            'канальные',
            'потоки системных прерываний',
        ],
        rightAnswer: 2
    },
    {
        question: 'Если функция WaitForSingleObject, завершается успешно, то она возвращает значение:',
        options: [
            'wait_timeout',
            'waitexit',
            'wait_finally',
            'wait abandoned',
            'wait_forsingie',
        ],
        rightAnswer: 0
    },
    {
        question: 'Значение функции WaitForSingleObject, в случае успешного завершения:',
        options: [
            'waitexit',
            'wait_abandoned',
            'wait_finally',
            'wait_forsingie',
            'wait_time_out',
        ],
        rightAnswer: 1
    },
    {
        question: 'Именованные каналы имеют следующие характеристики:',
        options: [
            'соединение сервера с экземпляром именованного канала',
            'соединение клиента с экземпляром именованного',
            'могут быть как полудуплексные, так и дуплексные',
            'обмен данными может быть только синхронным или асинхронным',
            'создание именованного канала сервером',
        ],
        rightAnswer: 2
    },
    {
        question: 'Именованные каналы характеризуются следующими возможностями:',
        options: [
            'возможность моделирования любой топологии связей',
            'соединение клиента с экземпляром именованного',
            'соединение сервера с экземпляром именованного канала',
            'обмен данными может быть только синхронным или асинхронным',
            'создание именованного канала сервером',
        ],
        rightAnswer: 0
    },
    {
        question: 'Наследуемый дескриптор процессу-клиенту анонимного канала передается одним из способов:',
        options: [
            'через поле hStdInput структуры STARTUPEKFO',
            'по именованному каналу',
            'через поле hStdError структуры STARTUPINFO',
            'посредством сообщения WM COPYDATA',
            'через поля hStdInput, hStdOutput и hStdError структуры STARTUPINFO',
        ],
        rightAnswer: 4
    },
    {
        question: 'Передача наследуемого дескриптора процессу-клиенту анонимного канала может выполняется посредством:',
        options: [
            'через поле hStdInput структуры STARTUPEKFO',
            'по именованному каналу',
            'через поле hStdError структуры STARTUPINFO',
            'посредством сообщения WM_COPYDATA',
            'по электронной почте',
        ],
        rightAnswer: 3
    },
    {
        question: 'Функция WaitForSingleObject, в случае успешного завершения возвращает следующее значение:',
        options: [
            'waitexit',
            'wait_object_o',
            'wait_finally',
            'wait_forsingie',
            'wait_time_in',
        ],
        rightAnswer: 1
    },
    {
        question: 'Характеристики именованных каналов:',
        options: [
            'соединение сервера с экземпляром именованного канала',
            'соединение клиента с экземпляром именованного',
            'обмен данными может быть как синхронным, так и асинхронным',
            'обмен данными может быть только синхронным или асинхронным',
            'создание именованного канала сервером',
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