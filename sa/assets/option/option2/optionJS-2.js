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
        question: 'Что делает распознаватель в первую очередь при разрешении DNS-имени?',
        options: [
            'выполняет широковещание в локальной подсети',
            'cчитывает файл Hosts',
            'проверяет наличие принтера',
            'проверяет локальный кэш',
            'определяет адрес компьютера в сети',
        ],
        rightAnswer: 3
    },
    {
        question: 'Название подключения в одну из папок целой файловой системы, которые находятся где-то на другом устройстве:',
        options: [
            'файловой системой',
            'размонтированием',
            'монтирование',
            'точкой перезагрузки',
            'точкой монтирования',
        ],
        rightAnswer: 2
    },
    {
        question: 'Витая пара — это',
        options: [
            'среда передачи информации из перекрученных между собой электрических проводов, характеризующаяся простотой монтажа и низкой стоимостью',
            'среда передачи информации, электрический кабель, состоящий из центрального проводника и металлической оплетки, разделенных диэлектриком',
            'среда передачи информации, разделенная диэлектриком',
            'среда передачи информации, представляющая собой стеклянное или пластиковое волокно в оболочке, по которому распространяется световой сигнал',
            'среда передачи информации из перекрученных между собой электрических проводов, представляющая собой стеклянное или пластиковое волокно',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая команда будет корректной для создания права доступа 755 к директории /etc/test?',
        options: [
            'chmod 755/test/etc',
            'modchange 755 /etc/test',
            'modchange/etc/test',
            'changemod 755 /test',
            'chmod 755/etc/test',
        ],
        rightAnswer: 4
    },
    {
        question: 'Вы берите верное определение состоянию процесса: состояние, в котором находится процесс, программу которого выполняет процессор:',
        options: [
            'Блокировка',
            'Готовность',
            'Работа',
            'Сон',
            'Перезагрузка',
        ],
        rightAnswer: 2
    },
    {
        question: 'Где происходит преимущественное хранение конфигурационных файлов в ОС Linux?',
        options: [
            'в зашифрованном виде, недоступном для просмотра',
            'в зашифрованном виде, просмотр – с помощью программы-конфигуратора',
            'в зашифрованном формате, режиме «только для чтения»',
            'в текстовом формате, просмотр и редактирование – любым текстовым редактором',
            'в текстовом формате, просмотр и редактирование – только с помощью редактора vi',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что входит в пакет с программным обеспечением в Linux?',
        options: [
            'собранную программу, информацию о зависимостях от других пакетов, программу-установщик setup либо install',
            'собранную программу и программу-установщик setup либо install',
            'собранную программу, сценарии действий до установки и после нее',
            'программу-установщик, информацию о зависимостях от других пакетов',
            'собранную программу, сценарии действий до установки и после нее, информацию о зависимостях от других пакетов',
        ],
        rightAnswer: 4
    },
    {
        question: 'С помощью какой утилиты можно проследить путь прохождения пакета от данного компьютера до удаленного узла (отображаются промежуточные узлы маршрутизаторы)?',
        options: [
            'Tracert',
            'Route',
            'Nbtstat',
            'Iproute',
            'Remoteroute',
        ],
        rightAnswer: 0
    },
    {
        question: 'Закончите предложение, вставив недостающие слова из списка ответов: Количество ячеек таблицы FAT соответствует количеству … на диске, а значениями ячеек являются цепочки размещения файлов, т.е. последовательности адресов … , в которых хранятся файлы.',
        options: [
            'Папок',
            'Кластеров',
            'Данных',
            'Информации',
            'Файлов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Как можно узнать релиз ядра Linux?',
        options: [
            'kernel –uname',
            'uname –r',
            'uname –kernel',
            'kerne –r',
            'uname –f',
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