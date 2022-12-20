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
        question: 'Отметьте то, что относится к файловым системам:',
        options: [
            'ROOT',
            'NTF',
            'Windows',
            'FAT32',
            'Linux',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что входит в дистрибутив операционной системы:',
        options: [
            'операционную систему, программу ее установки и наиболее популярные прикладные программы',
            'только операционную систему и программу ее установки',
            'операционную систему, программу ее установки и настройки, сопровождение и регулярное обновление',
            'операционную систему, программу ее установки и наиболее популярные системные утилиты от сторонних разработчиков',
            'популярные прикладные программы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для каких целей служит лицензия на программное обеспечение?',
        options: [
            'определить круг прав пользователя по отношению к этому программному обеспечению',
            'определить, на каких условиях можно продавать данное программное обеспечение',
            'указать, кто является обладателем всех прав на это программное обеспечение',
            'сделать данное программное обеспечение свободным',
            'определить перечень прав пользователей',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое привилегированный режим работы программы? ',
        options: [
            'режим монопольного владения программой',
            'режим, при котором программа в любой момент может монопольно завладеть процессором',
            'режим неограниченного доступа ко всем ресурсам компьютера',
            'режим, при котором программа имеет привилегии перед другими программами в условиях многозадачности',
            'режим монопольного владения процессором на время работы программы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какую программу ядро запускает первой при загрузке системы?',
        options: [
            'Lilo',
            'Upstart',
            'Init',
            'Loader',
            'Systemv',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое командная оболочка операционной системы?',
        options: [
            'часть операционной системы, которая выполняет команды пользователя',
            'программа, которая делает заданный каталог текущим и выводит список файлов',
            'программа, которая выполняет команды пользователя',
            'программа, которая преобразует команды пользователя в действия операционной системы',
            'часть операционной системы, выводит на экран список файлов текущего каталога',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для какого приложения наиболее эффективно использовать RAID 3?',
        options: [
            'E-mail',
            'Резервное перемещение',
            'OLTP',
            'электронная коммерции',
            'Резервное копирование',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какой процесс в Linux не имеет родительского процесса?',
        options: [
            'Init',
            'Hald',
            'Bash',
            '/etc/init',
            'Xorg',
        ],
        rightAnswer: 0
    },
    {
        question: 'По какой лицензии распространяется ОС?',
        options: [
            'Линуса Торвальдса',
            'GNU',
            'NTFS',
            'фирмы Microsoft',
            'компании GNU',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что нужно для установки программы в ОС Linux?',
        options: [
            'распаковать пакет, содержащий программу',
            'запустить менеджер пакетов и выбрать пакет с устанавливаемой программой',
            'выполнить команду setup',
            'скопировать пакет, содержащий программу, в отдельный каталог',
            'распаковать пакет и выполнить команду setup',
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