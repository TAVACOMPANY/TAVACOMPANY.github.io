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
        question: 'Какой набор опций следует использовать с ls командой для того, чтобы увидеть подробный список файлов, включая скрытые файлы?',
        options: [
            'ls +lh',
            'ls –lh',
            'ls –l',
            'ls –al',
            'ls +l',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что такое пользователь root?',
        options: [
            'системная команда, определяющая учетную запись',
            'учётная запись, не рекомендуется использовать администратору системы',
            'единственная учётная запись, принадлежащая администратору системы',
            'учётная запись, которую рекомендуется использовать администратору системы, даже если у него имеется персональная учётная запись',
            'учётная запись, гарантированно дающая пользователю исключительные права работы в системе',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая команда используется для отображения информации о модуле ядра?',
        options: [
            'Modinfo',
            'Lsmod',
            'Showmod',
            'Modprobe',
            'Showls',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что происходит при страничной организации виртуальной памяти?',
        options: [
            'все перечисленные варианты верны',
            'размер страниц определяется программой при ее запуске',
            'размер страниц выбирается операционной системой в зависимости от объема свободной оперативной памяти',
            'страницы имеют одинаковый размер, количество страниц определяется программой при ее запуске',
            'все страницы имеют одинаковые размеры, а разбиение виртуального адресного пространства процесса на страницы выполняется системой автоматически',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что такое файловый менеджер?',
        options: [
            'программа, управления атрибутами и для перемещения по каталогам',
            'программа для создания, удаления, копирования файлов',
            'программа, выполняющая все перечисленные функции',
            'программа для перемещения по каталогам',
            'программа управления атрибутами и редактирования файлов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Отметьте верные высказывания для многопроцессорных операционных систем:',
        options: [
            'Симметричная ОС частично децентрализована и использует все процессоры, разделяя их между системными и прикладными задачами',
            'Асимметричная ОС частично децентрализована и не использует процессоры',
            'Асимметричная ОС выполняется на нескольких процессорах компьютера',
            'Асимметричная ОС целиком выполняется только на одном из процессоров компьютера, распределяя прикладные задачи по остальным процессорам',
            'В симметричной ОС процессоры одна половина процессоров отводится для системных задач, вторая – для прикладных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какую стоит выбрать файловую систему при установке ОС Linux?',
        options: [
            'любую из перечисленных',
            'FAT16 либо FAT32',
            'NTFS',
            'FAT32',
            'journalized ext3 FS',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как можно просмотреть состояние использования оперативной и виртуальной памяти?',
        options: [
            'cat /proc/meminfo',
            'mem',
            'ram',
            'memory',
            'show memory',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие существуют режимы работы редактора vi?',
        options: [
            'режим командной строки',
            'вставки, командный и режим командной строки',
            'текстовый и графический',
            'редактирования и копирования',
            'вставки и замены',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какие из перечисленных способов позволяют посмотреть смонтированные файловые системы?',
        options: [
            'mountp',
            'cat /etc/mtab',
            'cat /proc/etc',
            'cat /proc/mountsfs',
            'cat /etc/fstab',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});