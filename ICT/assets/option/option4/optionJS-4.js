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
      br = '<br/>';

const questions = [
    {
        question: 'The components that process data are located in the:',
        options: [
            'storage component',
            'CPU',
            'input devices' + br + 'output devices',
            'storage component',
            'system unit' + br + 'monoblock',
        ],
        rightAnswer: 4
    },
    {
        question: 'A software program which provides access to web pages pages, eg., Internet Explorer, Mozilla Firefox, etc',
        options: [
            'Apple Mac Os X',
            'Linux',
            'NetWare',
            'Browser',
            'Microsoft Windows',
        ],
        rightAnswer: 3
    },
    {
        question: 'Which one of the following is not a network device?',
        options: [
            'Switch',
            'Modem' + br + 'Router',
            'CPU' + br + 'Motherboard' + br + 'Video Card',
            'Hub',
            'Switch' + br + 'Router' + br +'Modem',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which one of the following is not an Operating System?',
        options: [
            'Linux',
            'Yahoo' + br + 'Firefox' + br + 'Yandex',
            'Mac OS',
            'Microsoft Windows',
            'IBM AIX',
        ],
        rightAnswer: 1
    },
    {
        question: 'The two broad categories of software are:',
        options: [
            'Windows and Mac OS',
            'transaction and application',
            'Switch and modem',
            'Internet and Intranet',
            'system and application',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which of the following options best describes the function of the shortcut key combination: Ctrl+P ?',
        options: [
            'Pressing Ctrl+P will close the Page Layout dialogue box',
            'Pressing Ctrl+P will paste the contents of your document',
            'Pressing Ctrl+P will launch the Print area of the Backstage view',
            'Pressing Ctrl+P will open the Page Layout dialogue box',
            'Pressing Ctrl+P will print your document',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which of the following is an instant messaging application?',
        options: [
            'Facebook',
            'Yandex',
            'Yahoo' + br + 'Yandex',
            'Viber' + br + 'Google Talk' + br + 'WhatsApp',
            'Mozilla',
        ],
        rightAnswer: 3
    },
    {
        question: 'The post-industrial society is designated as',
        options: [
            'Agricultural society',
            'Windows society',
            'Information society',
            'Technology society',
            'Mediated society',
        ],
        rightAnswer: 2
    },
    {
        question: 'The first Web Browser is',
        options: [
            'Firefox',
            'World Wide Web',
            'Internet Explorer',
            'Opera',
            'Yandex',
        ],
        rightAnswer: 1
    },
    {
        question: ' HTML is used to create',
        options: [
            'web page',
            'program',
            'language program',
            'web server',
            'machine language program',
        ],
        rightAnswer: 0
    },
    {
        question: 'A network of servers accessed via the internet by a single organization.',
        options: [
            'hybrid cloud',
            'On-Premise Cloud',
            'Public Cloud',
            'Webpage',
            'Private Cloud',
        ],
        rightAnswer: 4
    },
    {
        question: 'All of the following are examples of input devices',
        options: [
            'multimedia',
            'keyboard' + br + 'mouse',
            'printer',
            'scanner' + br + 'gamepad' + br + 'microphone',
            'CD drives',
        ],
        rightAnswer: 3
    },
    {
        question: 'Working from home but staying in touch with others with the help of technology',
        options: [
            'Streaming' + br + 'Ripping',
            'Storyboard',
            'freelance' + br + 'Teleworking' + br + 'remote work',
            'Specification',
            'Ripping',
        ],
        rightAnswer: 2
    },
    {
        question: 'Software that detects and removes/ isolates computer viruses.',
        options: [
            'anti-spyware',
            'nod32' + br + 'anti-virus' + br + 'Dr.Web',
            'Website' + br + 'Webpage',
            'Bluetooth',
            'Webpage' + br + 'anti-spyware',
        ],
        rightAnswer: 1
    },
    {
        question: 'Internet explorer is a type of',
        options: [
            'Browser',
            'Compiler',
            'IP address',
            'Operating System',
            'language program',
        ],
        rightAnswer: 0
    },
    {
        question: 'The CPU and memory are located on the:',
        options: [
            'USB flash drive',
            'storage device',
            'ROM',
            'motherboard',
            'platform software',
        ],
        rightAnswer: 3
    },
    {
        question: '_________ is a general term used to describe a new class of network based computing that takes place over the Internet',
        options: [
            'platform software',
            'virtual infrastructure',
            'сloud сomputing',
            'system software',
            'operating system software',
        ],
        rightAnswer: 2
    },
    {
        question: 'What is ICT?',
        options: [
            'Internet & Information Technology',
            'Information & Communication Technology',
            'Information Technology',
            'Information & Computer Technology',
            'Internet & Communication Technology',
        ],
        rightAnswer: 1
    },
    {
        question: 'A message displayed by your internet browser which means that it is unable to find the webpage you are looking for.',
        options: [
            '405 error',
            '504 error',
            '503 error',
            '406 error',
            '404 error',
        ],
        rightAnswer: 4
    },
    {
        question: 'What is blog?',
        options: [
            'A personal or corporate website in the form of an online journal',
            'Spam',
            'Virus',
            'A personal or corporate Google search',
            'Intranet',
        ],
        rightAnswer: 0
    },
    {
        question: 'What is a following is NOT a feature of Mobile Operating System?',
        options: [
            'Voice Search',
            'Burning ',
            'Lightening',
            'Wi-Fi',
            'Bluetooth',
        ],
        rightAnswer: 1
    },
    {
        question: 'GIF stands for',
        options: [
            'Graphics Internet Format',
            'Graphics Information Form',
            'Graphics Interchange Format',
            'Graphics Information Format',
            'Graphics Interchange File',
        ],
        rightAnswer: 2
    },
    {
        question: 'The combination of different types of media such as audio, video and text.',
        options: [
            'Coaxial',
            'Media',
            'Microwave',
            'Batch',
            'multimedia technology' + br + 'Multimedia',
        ],
        rightAnswer: 4
    },
    {
        question: '_____________ is an abbreviation for application, usually refers to a software for a specific device or purpose',
        options: [
            'LAN',
            'IOS',
            'Linux',
            'App',
            'WWW',
        ],
        rightAnswer: 3
    },
    {
        question: 'A device that allows computers to connect to a network using the existing telephone cable network.',
        options: [
            'tablet',
            'Workstation',
            'router' + br + 'modem' + br + 'modulator / demodulator',
            'tablet',
            'Supercomputer',
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
    coratten();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
