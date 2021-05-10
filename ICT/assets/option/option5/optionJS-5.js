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
        question: 'The operating system is the most common type of ____________ software.',
        options: [
            'storage',
            'system',
            'application',
            'storage',
            'communication',
        ],
        rightAnswer: 4
    },
    {
        question: 'When used at the end of a web address, this means that the website is related to education.',
        options: [
            '.org',
            '.net',
            '.kz',
            '.edu',
            '.gov',
        ],
        rightAnswer: 3
    },
    {
        question: 'A ____________ is approximately one billion bytes.',
        options: [
            'eight terabyte',
            'eight megabyte' + br + 'megabyte',
            'gigabyte' + br + 'eight gigabit' + br + 'thousand megabyte',
            'kilobyte',
            'bit',
        ],
        rightAnswer: 2
    },
    {
        question: 'In the binary language each letter of the alphabet, each number and each special character is made up of a unique combination of:',
        options: [
            'eight bytes' + br + 'one bit' + br + '10 bit',
            'eight bits' + br + '1 byte' + br + 'one byte',
            'eight characters',
            'eight kilobytes',
            'one bit',
        ],
        rightAnswer: 1
    },
    {
        question: 'The statement “the study, design, development, implementation, support or management of computer-based information systems, particularly software applications and computer Hardware” refers to',
        options: [
            'Information Technology (IT) ',
            'Information and Data Technology (IDT)',
            'Information and Collaborative Technology (ICT)',
            'Read Only Memory (ROM)',
            'Artificial Intelligence (AI)',
        ],
        rightAnswer: 0
    },
    {
        question: 'A successor to 3G mobile standards, which supports very fast mobile internet and the ability to use different mobile service providers.',
        options: [
            '3G',
            '3GP',
            'Batch' + br + '3D TV',
            'UMTS' + br + 'WCDMA',
            '4G' + br + 'LTE',
        ],
        rightAnswer: 4
    },
    {
        question: 'A set of rules that governs data communication',
        options: [
            'Standards',
            'software',
            'RFCs',
            'Protocols',
            'document',
        ],
        rightAnswer: 3
    },
    {
        question: 'Which one of the following is an example of Operating System?',
        options: [
            'Microsoft Word',
            'Microsoft Excel',
            'Ubuntu' + br + 'SUSE Linux' + br + 'Microsoft Windows',
            'Microsoft Access',
            'Microsoft Power Point',
        ],
        rightAnswer: 2
    },
    {
        question: 'Virtual memory is',
        options: [
            'Operating System',
            'an illusion of extremely large main memory',
            'a type of memory used in super computers.',
            'an extremely large main memory.',
            'language program',
        ],
        rightAnswer: 1
    },
    {
        question: '____________ is operating system designed primarily for touchscreen mobile devices such as smartphones and tablet computers.',
        options: [
            'Apple iOS' + br + 'Android' + br + 'Symbian OS',
            'Linux' + br + 'Microsoft Windows',
            'Apple Mac Os X' + br + 'Linux',
            'QMAx',
            'NetWare',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which one of the following is a term for an audio or video recording posted on a web site that can be downloaded and played later?',
        options: [
            'Server',
            'web-page',
            'blog',
            'Feed',
            'podcast',
        ],
        rightAnswer: 4
    },
    {
        question: 'The software used to navigate through the web is known as',
        options: [
            'Network',
            'World Wide Web',
            'Website',
            'Web Browser',
            'Yandex',
        ],
        rightAnswer: 3
    },
    {
        question: 'Software that allows you to display webpages from an intranet or the internet.',
        options: [
            'Website',
            'Webpage',
            'web browser',
            'web',
            'Linux',
        ],
        rightAnswer: 2
    },
    {
        question: 'Identify the IP address from the following',
        options: [
            '300 .215.317.3',
            '202.50.20.148',
            '202-50-20-148',
            '302.215 /417.7',
            '202-53-20-149',
        ],
        rightAnswer: 1
    },
    {
        question: '_________________ is a small, hand-held computing device, typically having a display screen with touch input and a miniature keyboard',
        options: [
            'mobile device' + br + 'the tablet',
            'output device',
            'system software',
            'Personal Computer',
            'operating system software',
        ],
        rightAnswer: 0
    },
    {
        question: 'A standard for mobile phones, which means that your phone is able to access the internet via mobile broadband',
        options: [
            '3D TV',
            '2G',
            'LTE' + br + '4G',
            '3G' + br + 'WCDMA' + br + 'UMTS',
            '3GP',
        ],
        rightAnswer: 3
    },
    {
        question: 'Writing an online diary with personal thoughts and opinions',
        options: [
            'Streaming',
            'chat',
            'Blogging',
            'whatsapp',
            'Ripping',
        ],
        rightAnswer: 2
    },
    {
        question: 'A string of eight 0s and 1s is called a:',
        options: [
            'terabyte',
            'byte' + br + 'eight bits',
            'petabyte',
            'gigabyte',
            'megabyte',
        ],
        rightAnswer: 1
    },
    {
        question: '____________ is any part of the computer that you can physically touch.',
        options: [
            'CPU',
            'RAM',
            'An application',
            'A device',
            'Hardware',
        ],
        rightAnswer: 4
    },
    {
        question: 'All of the following are examples of storage devices EXCEPT:',
        options: [
            'printers' + br + 'platform software' + br + 'CD drives',
            'ROM',
            'hard disk drives',
            'RAM',
            'floppy disk drives' + br + 'USB flash drive',
        ],
        rightAnswer: 0
    },
    {
        question: '____________ is data that has been organized or presented in a meaningful fashion.',
        options: [
            'Wi-Fi',
            'Information',
            'A process',
            '3G',
            'Software',
        ],
        rightAnswer: 1
    },
    {
        question: 'Unsolicited junk email sent to large numbers of email addresses.',
        options: [
            'Spyware',
            'Server',
            'Spam',
            'Bot',
            'Port',
        ],
        rightAnswer: 2
    },
    {
        question: 'Computers process data into information by working exclusively with:',
        options: [
            'code',
            'words',
            'symbol',
            'characters',
            'numbers',
        ],
        rightAnswer: 4
    },
    {
        question: 'Computers on an internet are identified by',
        options: [
            'none of the above',
            'language program',
            'IT address',
            'IP address',
            'operating system',
        ],
        rightAnswer: 3
    },
    {
        question: 'A piece of text, image or other item on a website which, when clicked on, takes you to a different web pagе',
        options: [
            'Coaxial',
            'Microwave',
            'hyperlink' + br + 'link',
            'DOS',
            'transition',
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