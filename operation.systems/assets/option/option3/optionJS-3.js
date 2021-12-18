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
        question: 'Имя файла состоит из',
        options: [
            'Собственности имени, расширения имени и свойств',
            'Собственно имени и расширения имени',
            'Только из имени',
            'Цифрового имени и расширения',
            'Атрибутов и свойств файла',
        ],
        rightAnswer: 1
    },
    {
        question: 'Расширение имени файла определяет',
        options: [
            'Местонахождение файла в сети',
            'Свойства файла',
            'Атрибуты файла',
            'Тип файла и принадлежность к тем или иным программа',
            'Местоположение файла',
        ],
        rightAnswer: 3
    },
    {
        question: 'Такие расширения имеют программы и исполняемые файлы',
        options: [
            'Sys, dll',
            'Exe, bat, com, msi',
            'Doc, docx',
            'Txt',
            'Avi, mov, wmv, mkv',
        ],
        rightAnswer: 1
    },
    {
        question: 'Такие расширения имеют системные файлы и библиотеки',
        options: [
            'Doc, docx',
            'Avi, mov, wmv, mkv',
            'Sys, dll',
            'Txt',
            'Exe, bat, com, msi',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дополнительная информация (только чтение, архивный, скрытый), относящаяся к файлу',
        options: [
            'Атрибуты файла',
            'Свойства файла',
            'Имя файла',
            'Имя каталога',
            'Расширение файла',
        ],
        rightAnswer: 0
    },
    {
        question: 'Атрибут, который указывает, что данный файл не подлежит изменению',
        options: [
            'Архивный',
            'Только чтение',
            'Скрытый',
            'Переменный',
            'Постоянный',
        ],
        rightAnswer: 1
    },
    {
        question: 'Вся совокупность файлов на диске и взаимосвязей между ними называется',
        options: [
            'Каталогом',
            'Сетью',
            'Операционной системой',
            'Системной структурой',
            'Файловой структурой',
        ],
        rightAnswer: 4
    },
    {
        question: 'Множество именованных наборов данных, организованное по принятым спецификациям, которые определяют способы получения адресной информации, необходимой для доступа к этим файлам –',
        options: [
            'Файловая структура',
            'Операционная система',
            'Файловая система',
            'Табличная структура',
            'Последовательная структура',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой файловой системы не существует:',
        options: [
            'VFAT',
            'FaT64',
            'FAT32',
            'HPFS',
            'NTFS',
        ],
        rightAnswer: 1
    },
    {
        question: 'В процессе форматирования магнитная головка дисковода расставляет в определенных местах диска',
        options: [
            'Табличные метки',
            'Метки секторов и кластеров',
            'Метки дорожек и секторов',
            'Метки файлов и каталогов',
            'Метки кластеров и дорожек',
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