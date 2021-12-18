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
        question: 'Самая первая дорожка магнитного диска (нулевая) считается',
        options: [
            'Дополнительной',
            'Служебной',
            'Главной',
            'Второстепенной',
            'Запасной',
        ],
        rightAnswer: 1
    },
    {
        question: 'На гибком диске минимальным адресуемым элементом является',
        options: [
            'Ячейка',
            'Таблица',
            'Дорожка',
            'Сектор',
            'Кластер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Минимальным адресуемым элементом жесткого диска является',
        options: [
            'Ячейка',
            'Кластер',
            'Таблица',
            'Дорожка',
            'Сектор',
        ],
        rightAnswer: 1
    },
    {
        question: 'Размер кластера жесткого диска зависит от',
        options: [
            'Только от емкости жесткого диска',
            'Только от типа используемой таблицы FAT',
            'Типа используемой таблицы FAT и от емкости жесткого диска',
            'Типа используемой таблицы NTFS и от емкости жесткого диска',
            'Типа используемой таблицы FAT и от емкости гибкого диска',
        ],
        rightAnswer: 2
    },
    {
        question: 'Улучшенная файловая система, обеспечивающая уровень быстродействия и безопасности',
        options: [
            'NTFS',
            'NFS',
            'FAT',
            'FAT32',
            'VFAT',
        ],
        rightAnswer: 0
    },
    {
        question: 'Процесс разметки устройств хранения или носителей информации: жестких дисков, устройств хранения на основе флеш-памяти, оптических носителей и пр. При этом, вся информация находящаяся на носителе теряется или уничтожается.',
        options: [
            'Дефрагментация диска',
            'Форматирование диска',
            'Разметка диска',
            'Архивирование диска',
            'Кластеризация диска',
        ],
        rightAnswer: 1
    },
    {
        question: 'При данном виде форматирования перезаписывается лишь таблица файловой системы',
        options: [
            'Программное',
            'Полное',
            'Частичное',
            'Файловое',
            'Быстрое',
        ],
        rightAnswer: 4
    },
    {
        question: 'Исправляет физические и логические дефекты на диске, помечает сбойные блоки, чтобы данные не записывались в них',
        options: [
            'Антивирусная проверка диска',
            'Дефрагментация диска',
            'Проверка диска',
            'Архивация диска',
            'Форматирование диска',
        ],
        rightAnswer: 2
    },
    {
        question: 'Перераспределяет информацию на жестком диске, оптимизируя ее организацию',
        options: [
            'Проверка диска',
            'Дефрагментация диска',
            'Форматирование диска',
            'Архивация диска',
            'Очистка диска',
        ],
        rightAnswer: 1
    },
    {
        question: 'Основные компоненты операционных систем',
        options: [
            'Управляющие и исполняющие программы',
            'Исполняющие и обрабатывающие программы',
            'Управляющие и обрабатывающие программы',
            'Использующие и управляющие программы',
            'Обеспечивающие и исполняющие программы',
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