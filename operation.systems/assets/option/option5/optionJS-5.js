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
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Управляют работой вычислительной системы, обеспечивая в первую очередь автоматическую смену заданий для поддержания непрерывного режима работы ЭВМ при переходе от одной программы к другой без вмешательства оператора',
        options: [
            'Обрабатывающие программы',
            'Управляющие программы',
            'Исполняющие программы',
            'Использующие программы',
            'Обеспечивающие программы',
        ],
        rightAnswer: 1
    },
    {
        question: 'К основным составляющим современной операционной системы не относится',
        options: [
            'Файловая система',
            'Командный процессор',
            'Ядро',
            'Прикладные программы',
            'Подсистема ввода-вывода',
        ],
        rightAnswer: 3
    },
    {
        question: 'Первая операционная система для персональных компьютеров, которая получила широкое распространение',
        options: [
            'Windows 7',
            'MS DOS',
            'Windows 95',
            'UNIX',
            'OS/2',
        ],
        rightAnswer: 1
    },
    {
        question: 'Очень короткая программа (около 512 байт), находящаяся в первом секторе каждого диска с операционной системой DOS',
        options: [
            'Файл автозагрузки AUTOEXEC.BAT',
            'Драйверы устройств',
            'Блок начальной загрузки (Boot Record)',
            'Командный процессор DOS',
            'Дисковые файлы IO.SYS и MSDOS.SYS',
        ],
        rightAnswer: 2
    },
    {
        question: 'Помещаются в оперативную память при загрузке и остаются в ней постоянно',
        options: [
            'Дисковые файлы IO.SYS и MSDOS.SYS',
            'Файл автозагрузки AUTOEXEC.BAT',
            'Драйверы устройств',
            'Командный процессор DOS',
            'Блок начальной загрузки (Boot Record)',
        ],
        rightAnswer: 0
    },
    {
        question: 'Обрабатывает команды, вводимые пользователем',
        options: [
            'Драйверы устройств',
            'Командный процессор DOS',
            'Блок начальной загрузки (Boot Record)',
            'Дисковые файлы IO.SYS и MSDOS.SYS',
            'Файл автозагрузки AUTOEXEC.BAT',
        ],
        rightAnswer: 1
    },
    {
        question: 'Специальные программы, которые дополняют систему ввода - вывода DOS и обеспечивают обслуживание новых или нестандартное использование имеющихся устройств',
        options: [
            'Командный процессор DOS',
            'Дисковые файлы IO.SYS и MSDOS.SYS',
            'Блок начальной загрузки (Boot Record)',
            'Файл автозагрузки AUTOEXEC.BAT',
            'Драйверы устройств',
        ],
        rightAnswer: 4
    },
    {
        question: 'Служит для загрузки прикладных программ (например, Norton Commander) сразу же после загрузки ОС',
        options: [
            'Командный процессор DOS',
            'Блок начальной загрузки (Boot Record)',
            'Файл автозагрузки AUTOEXEC.BAT',
            'Драйверы устройств',
            'Дисковые файлы IO.SYS и MSDOS.SYS',
        ],
        rightAnswer: 2
    },
    {
        question: 'Программы, поставляемые вместе с операционной системой в виде отдельных файлов (для их выполнения программа подгружается в оперативную память по требованию пользователя (format, copydisk))',
        options: [
            'Драйверы устройств',
            'Внешние команды DOS',
            'Файл автозагрузки AUTOEXEC.BAT',
            'Дисковые файлы IO.SYS и MSDOS.SYS',
            'Командный процессор DOS',
        ],
        rightAnswer: 1
    },
    {
        question: 'Способ общения пользователя с персональным компьютером, пользователя с прикладными программами и программ между собой',
        options: [
            'Оболочка',
            'Система',
            'Интерфейс',
            'Связь',
            'Операционная система',
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