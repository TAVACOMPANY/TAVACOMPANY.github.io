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
        question: 'Which is the uses of Robot?',
        options: [
            'a and c',
            'To make the design of Tennis ball',
            'To produce new varieties of seeds',
            'Verifying the signature of a person',
            'Complex Surgery Treatment',
        ],
        rightAnswer: 4
    },
    {
        question: '____________ is data that has been organized or presented in a meaningful fashion.',
        options: [
            'Table',
            'Storage',
            'Formula',
            'Multimedia',
            'Information',
        ],
        rightAnswer: 4
    },
    {
        question: 'What is not a real chat protocol?',
        options: [
            'MSN',
            'Bonjour',
            'Jadder',
            'IRC',
            'Gadu-Gadu',
        ],
        rightAnswer: 2
    },
    {
        question: 'What is the full meaning of SQL?',
        options: [
            'Standard Query Language',
            'Structured Query Language',
            'Standard and Quick Language',
            'Simulation for Query Language',
            'Search and Query Language',
        ],
        rightAnswer: 1
    },
    {
        question: 'After a picture has been taken with a digital camera and processed appropriately, the actual print of the picture is considered:',
        options: [
            'output',
            'CD drives',
            'the process',
            'present',
            'data',
        ],
        rightAnswer: 0
    },
    {
        question: 'What effect can adware have on your system?',
        options: [
            'Download an anti-virus program',
            'Bad internet connection',
            'Hacking in to a user`s system',
            'Viruses attacking your system',
            'Bad computer performance',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which of the following formatting features is unique to numbers in spreadsheets?',
        options: [
            'Bold',
            'Soft-modem',
            'Indent',
            'Custom',
            'Color',
        ],
        rightAnswer: 3
    },
    {
        question: 'How many numerical bit of ASCII-8 code?',
        options: [
            '38',
            '16',
            '4',
            '32',
            '2',
        ],
        rightAnswer: 2
    },
    {
        question: 'Bangla Alphabet in which code included?',
        options: [
            'ARIAL',
            'UNICODE',
            'BCD',
            'CALIBRI',
            'EBCDIC',
        ],
        rightAnswer: 1
    },
    {
        question: 'Technology no longer protected by copyright, available to everyone, is considered to be:',
        options: [
            'proprietary' + '<br/>' + 'intellectual property',
            'experimental' + '<br/>' + 'uses of space technology',
            'closed' + '<br/>' + 'open',
            'in the public domain',
            'uses of space technology',
        ],
        rightAnswer: 0
    },
    {
        question: 'The MOST suitable device for the output of architectural drawings is a',
        options: [
            'Light pen',
            'Laser printer',
            'Printer',
            'Graphics tablet',
            'Plotter',
        ],
        rightAnswer: 4
    },
    {
        question: 'What is MS Surface?',
        options: [
            'The new OS that will replace Vista',
            'A new Aero effect for Vista Ultimate',
            'The new beta mobile browser from MS',
            'A multi touch platform from MS.',
            'MS first mobile phone',
        ],
        rightAnswer: 3
    },
    {
        question: 'How many bits make a byte?',
        options: [
            '12 bits',
            '16 bits',
            '8 bits',
            '32',
            '64',
        ],
        rightAnswer: 2
    },
    {
        question: 'All of the following are examples of real security and privacy risks EXCEPT:',
        options: [
            'viruses',
            'spam',
            'hackers',
            'identity theft',
            'CPU',
        ],
        rightAnswer: 1
    },
    {
        question: 'The process of starting or restarting a computer is called:',
        options: [
            'Booting',
            'Start up point',
            'Connecting',
            'Resetting',
            'Starting',
        ],
        rightAnswer: 0
    },
    {
        question: 'What kind of data is “Name” ?',
        options: [
            'Number',
            'Logical',
            'Currency',
            'Text',
            '011101',
        ],
        rightAnswer: 3
    },
    {
        question: 'What are online threats ?',
        options: [
            'They are different types of ICT Shortcuts',
            'Bad internet connection' + '<br/>' + 'Bad computer performance',
            'They are types of viruses which can harm your computer' + '<br/>' + 'any threat that uses the WWW to facilitate cybercrime',
            'They help your computer in being safe' + '<br/>' + 'They are different types of ICT Shortcuts',
            'Bad computer performance',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which is logical operator?',
        options: [
            '+*',
            '>=',
            'AND',
            '+',
            '-',
        ],
        rightAnswer: 1
    },
    {
        question: 'A process known as ____________ is used by large retailers to study trends.',
        options: [
            'POS',
            'sorting information',
            'data conversion' + '<br/>' + 'data selection',
            'dimensional' + '<br/>' + 'space technology',
            'data mining' + '<br/>' + 'search for information',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which is used to exchange alpha numeric data?' + '<br/>' + '(i) ASCII Code' + '<br/>' + '(ii) EBCDIC Code' + '<br/>' + '(iii) UNICODE',
        options: [
            'i & iii ',
            'ii & iii',
            'i & ii',
            'ii',
            'i, ii & iii',
        ],
        rightAnswer: 0
    },
    {
        question: 'A field in a table that appears as a match of the primary key in another table is called a',
        options: [
            'Composite key',
            'Foreign key',
            'Double key',
            'Account Type',
            'Secondary key',
        ],
        rightAnswer: 1
    },
    {
        question: 'Which of the following is NOT one of the four major data processing functions of a computer?',
        options: [
            'storing the data',
            'dimensional' + '<br/>' + 'storing the data or' + '<br/>' + 'gathering data',
            'analyzing the data or information' + '<br/>' + 'sorting information' + '<br/>' + 'presentation',
            'processing data into information',
            'accumulation',
        ],
        rightAnswer: 2
    },
    {
        question: 'Each website on the Internet can be accessed by entering a unique address. This address is referred to as the',
        options: [
            'HTTP',
            'FTP',
            'FTTPP',
            'UTL',
            'URL',
        ],
        rightAnswer: 4
    },
    {
        question: 'What are computer shortcuts ?',
        options: [
            'They are a slower and hard way to navigate through your computer' + '<br/>' + 'A type of virus',
            'Red hat',
            'A type of virus',
            'They are and easier and faster way to navigate through your computer' + '<br/>' + 'They help provide usually quicker method of navigating commands in computer software',
            'White hat',
        ],
        rightAnswer: 3
    },
    {
        question: 'The pair of files used to produce merged letters during a mail merge is',
        options: [
            'Primary document and current letter',
            'Primary document and merged letters',
            'Primary document and data source',
            'Data source and merged letters',
            'Primary document',
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