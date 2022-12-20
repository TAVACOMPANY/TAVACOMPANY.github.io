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
        question: 'Что из себя представляет классическая иерархическая файловая система?',
        options: [
            'набор папок на диске С',
            'рабочий стол с папками и ярлыками',
            'диски, папки',
            'вложенные друг в друга папки, в которых могут содержаться и файлы',
            'файлы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие минимальные разрешения NTFS требуются, чтобы пользователи могли открывать файлы и запускать программы из общей папки?',
        options: [
            'список содержимого папки (List Folder Contents)',
            'Чтение',
            'чтение и выполнение (Read and Execute)',
            'выполнение (Execute)',
            'запись (Write)',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что позволяет делать контроль учетных записей пользователей?',
        options: [
            'позволяет предотвращать несанкционированные изменения в компьютере, обеспечивает защиту, запрашивая разрешение перед совершением потенциально опасных для компьютера действий',
            'может регулярно проверять наличие обновлений и автоматически их устанавливать',
            'показывает текущее состояние защиты компьютера',
            'рекомендует меры по усилению безопасности',
            'защищает компьютер, предотвращает доступ к нему хакеров и вредоносных программ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Windows 2003 Server позволяет модернизировать ОС при установке, при условии, что',
        options: [
            'предыдущая ОС была Windows XP',
            'предыдущая ОС была Windows 98',
            'предыдущая ОС была Windows 95',
            'предыдущая ОС была Windows 2008 Server',
            'предыдущая ОС была Windows 2000 Advanced Server',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что будет в практике означать, что система Linux многопользовательская?',
        options: [
            'что нужно пройти курсы пользователей ПК',
            'что нужно создать учеьную запись',
            'что нужно зарегистрироваться',
            'что нужно обновить версию OC',
            'все варианты верны',
        ],
        rightAnswer: 2
    },
    {
        question: 'Вы настраиваете принтер на компьютере под управлением Windows Server 2003. Компьютер будет использоваться в качестве сервера печати. Вы планируете использовать принтер, в настоящий момент подключенный к сети как изолированное устройство печати. Принтер какого типа следует добавить на сервер печати?',
        options: [
            'Сетевой',
            'Канальный',
            'Удаленный',
            'Общий',
            'Локальный',
        ],
        rightAnswer: 3
    },
    {
        question: 'Отметьте протоколы маршрутизации',
        options: [
            'RIR',
            'OSFP',
            'ICMR',
            'ICMP',
            'OSPF',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из перечисленных условий работы удаленного помощника связаны с брандмауэрами?',
        options: [
            'порт 3389 должен быть открыт',
            'нельзя использовать механизм Общий доступ к подключению Интернета (Internet Connection Sharing)',
            'порт 3389 должен быть закрыт',
            'нельзя использовать NAT',
            'необходимо использовать NAT',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое дистрибутив?',
        options: [
            'В папке содержатся все остальные папки и файлы',
            'не просто набор программ, а ряд решений для различных задач пользователей, объединенных едиными системами установки, обновления и удаления программных пакетов',
            'Одна из папок является вершиной файловой системы',
            'вложенные друг в друга папки, в которых могут содержаться и файлы',
            'ежедневно обновляемый репозиторий пакетов, позволяет пользователям легко обновлять свои системы и быть в курсе всех новостей мира свободных программ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какая файловая система используются для жестких дисков:',
        options: [
            'FAT16',
            'FAT32',
            'FAT26',
            'NTFS',
            'FAT12',
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