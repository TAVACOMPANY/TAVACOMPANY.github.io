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
        question: 'What is the meaning of (CPU)?',
        options: [
            'Crucial Processing Unit',
            'Critical Processing Unit.',
            'Central Printing Union',
            'Central Printing Unit',
            'Central Processing Unit',
        ],
        rightAnswer: 4
    },
    {
        question: 'The name of the interface used by blind persons to perform operations on a computer is',
        options: [
            'Touch screen',
            'Sensor',
            'Folder',
            'Braille',
            'Icon',
        ],
        rightAnswer: 3
    },
    {
        question: 'Which is the characteristic of Bioinformatics?',
        options: [
            'uses of nano technology',
            'uses of space technology',
            'A combination of biological data',
            'there are additional tips',
            'technology dependent security',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which are examples of the advantages of a using a paper based database?',
        options: [
            'They are expensive to set up',
            'They are portable',
            'Decorative element not needed',
            'They generally require special training',
            'They can be updated easily',
        ],
        rightAnswer: 1
    },
    {
        question: 'The name for the way that computers manipulate data into information is called:',
        options: [
            'processing',
            'terabyte',
            'animation',
            'storing',
            'programming',
        ],
        rightAnswer: 0
    },
    {
        question: 'What is hierarchical structure of websites?',
        options: [
            'link up between two pages',
            'web based communications',
            'driver logs',
            'Home page dependent websites',
            'link up with each page',
        ],
        rightAnswer: 4
    },
    {
        question: 'The decimal equivalent of 00001111 is',
        options: [
            '22',
            '18',
            '25',
            '15',
            '32',
        ],
        rightAnswer: 3
    },
    {
        question: 'In a Database, what is Data or Information stored in?',
        options: [
            'Garage',
            'Online Server',
            'Table',
            'Filing cabinet',
            'Storeroom',
        ],
        rightAnswer: 2
    },
    {
        question: 'A persons` First name, Last name, Date of Birth (DOB), Height, Eye colour and Address are all types of what?',
        options: [
            'Tags',
            'Fields',
            'Files',
            'Attributes',
            'Records',
        ],
        rightAnswer: 1
    },
    {
        question: '____________ is the science that attempts to produce machines that display the same type of intelligence that humans do.',
        options: [
            'Artificial intelligence (AI)',
            'Nanotechnology',
            'uses of space technology',
            'Simulation',
            'Nanoscience',
        ],
        rightAnswer: 0
    },
    {
        question: 'What is a collection of data or information called, that is stored in a logical and structured way?',
        options: [
            'Field',
            'Spreadsheet',
            'Column',
            'Capital',
            'Database',
        ],
        rightAnswer: 4
    },
    {
        question: 'Maximum speed of voice band is',
        options: [
            '6900 kpbs',
            '6900 bps',
            '69000 kbps',
            '9600 bps',
            '9600 kbps',
        ],
        rightAnswer: 3
    },
    {
        question: 'If huge data saved in database then' + br + '(i) need indexing to find the data quickly' + br + '(ii) Normally found the data quickly' + br + '(iii) Find the data is time consuming matter' + br + 'Which is correct below ?',
        options: [
            'i, ii & iii',
            'i & ii',
            'i & iii',
            'ii & iii',
            'only iii',
        ],
        rightAnswer: 2
    },
    {
        question: 'Surgeons can perform delicate operations by manipulating devices through computers instead of manually. This technology is known as:',
        options: [
            'computer forensics',
            'robotics',
            'forecasting',
            'simulation',
            'fornsica',
        ],
        rightAnswer: 1
    },
    {
        question: '____________terminals (formerly known as cash registers) are often connected to complex inventory and sales computer systems.',
        options: [
            'Point-of-sale' + br + 'POS',
            'Data',
            'Query',
            'Sales',
            '0111000',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which of the following is NOT a function of the control unit?',
        options: [
            'Direct operations',
            'write instructions',
            'Interpret instructions',
            'Execute instructions',
            'Read instructions',
        ],
        rightAnswer: 3
    },
    {
        question: 'In word processing, an efficient way to move the 3rd paragraph to place it after the 5th paragraph is',
        options: [
            'Copy and copy',
            'Paste and paste',
            'Cut and paste',
            'Copy, cut and paste',
            'Cut, copy and paste',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which one is not a real audio codec?',
        options: [
            'WMA',
            'Dolby Codec',
            'Ogg Vorbis',
            'MP2',
            'FLAC',
        ],
        rightAnswer: 1
    },
    {
        question: 'An airline reservation system is an example of',
        options: [
            'Interactive processing',
            'Distributed processing',
            'Write processing',
            'Batch processing',
            'Real time processing',
        ],
        rightAnswer: 4
    },
    {
        question: 'What is hotspot ?',
        options: [
            'Wireless Internet system',
            'cable connected Internet system',
            'Wired headphone',
            'special kind of software',
            'Bluetooth',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which language is used to build website?',
        options: [
            'css book',
            'HTML',
            'Python',
            'COBOL',
            'FORTRAN',
        ],
        rightAnswer: 1
    },
    {
        question: 'What is unauthorized transfer or copying ?',
        options: [
            'Keep your computer password protected',
            'Hacking in to a user`s system',
            'Copying or transfering software without the permission of the user',
            'Only transfering software with the permission of the user',
            'Download an anti-virus program',
        ],
        rightAnswer: 2
    },
    {
        question: 'What does malware do to your computer?',
        options: [
            'Deletes your personal files and applications',
            'Bad computer performance',
            'Download an anti-virus program',
            'Slows down your system',
            'Gains access to a users system in order to carry out certain tasks which a hacker has scheduled' + br + 'to reproduce itself and spread from one file or program to another',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which one of these is a real File System?',
        options: [
            'NTSF',
            'EXT5',
            'FSX2',
            'BTRFS',
            'HTFSN',
        ],
        rightAnswer: 3
    },
    {
        question: 'The pair of files used to produce merged letters during a mail merge is',
        options: [
            'Data source and merged letters',
            'Primary document and merged letters',
            'Primary document and data source',
            'Primary document',
            'Primary document and current letter',
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