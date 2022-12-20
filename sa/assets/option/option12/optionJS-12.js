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
        question: 'Чем определяют права доступа к файлу?',
        options: [
            'с помощью 9 символов или трехзначного шестнадцатеричного числа',
            'с помощью трехзначного двоичного числа',
            'с помощью 3 символов или трехзначного восьмеричного числа',
            'с помощью 9 символов или трехзначного восьмеричного числа',
            'с помощью 9 символов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой ключ утилиты IPConfig позволяет очистить кэш имен DNS?',
        options: [
            'Release',
            'Register',
            'Flushdns',
            'Registerdns',
            'Renew',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой результат выполнения следующей программы?' + br + '<img src="qst126.png" class="flong">',
        options: [
            '123',
            '321',
            '23',
            'Возникнет ошибка',
            '3',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой протокол используется для связи без установления соединения?',
        options: [
            'RARP',
            'FTP',
            'ARP',
            'TCP',
            'UDP',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что называют конвейером?',
        options: [
            'параллельное выполнение нескольких команд',
            'последовательное выполнение нескольких команд',
            'параллельное выполнение нескольких команд, при этом вывод одной команды перенаправляется на стандартный ввод следующей',
            'последовательное выполнение нескольких команд, причем каждая следующая команда начинает выполняться после завершения предыдущей',
            'параллельное выполнение нескольких команд, причем переключение между ними производится в строгой очередности',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что присуще жесткой ссылке на файл в ОС Linux:',
        options: [
            'является дополнительным ярлыком для файла',
            'это указатель на начало файла',
            'структура, содержащая сведения о расположении и размере файла',
            'представляет собой другое имя файла',
            'указатель на конец файла',
        ],
        rightAnswer: 3
    },
    {
        question: 'Основными элементами окон является:',
        options: [
            'Панель инструментов',
            'Полоса задач',
            'Кнопки сворачивания, разворачивания и закрытия окна',
            'Палитра цветов',
            'Строка заголовка	',
        ],
        rightAnswer: 4
    },
    {
        question: 'В каком домене находится запись ресурса PTR для компьютера с IP-адресом 10.11.86.4?',
        options: [
            '4.86.11.10.in-addr.arpa',
            'in-addr.arpa.4.86.11.10',
            '10.00.86.4.in-addr.arpa',
            '10.11.86.4.in-addr.arpa',
            '4.86.110.100.in-addr.arpa',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите расположение журнала Безопастность по умолчанию',
        options: [
            '%SystemRoot%\system32\config\AppEvent.Evt',
            '%SystemRoot%\system 32\сопfig\SecEvent.Evt',
            '%SystemRoot%\system32\config\\',
            'SystemRoot%\system32\config\SysEvont.Evt',
            '%SystemRoot% \config\AppEvent.Evt',
        ],
        rightAnswer: 1
    },
    {
        question: 'С помощью чего операционные системы сохраняют данные на диске?',
        options: [
            'графического интерфейса',
            'файловых систем',
            'папок',
            'жесткого диска',
            'дисков',
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