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
        question: 'Which of the following is NOT a type of transmission medium?',
        options: [
            'Twisted pair',
            'Plotter',
            'Microwave',
            'Coaxial',
            'Modem',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which of the following technologies does NOT facilitate the transferring of data between computers in adjacent buildings?',
        options: [
            'Fibre optic',
            'Controller',
            'Twisted pair',
            'Microwave',
            'Modem',
        ],
        rightAnswer: 3
    },
    {
        question: 'At present, for employment…' + '<br/>' + 'i. Works are found at home' + '<br/>' + 'ii) taking internet facility' + '<br/>' + 'iii) getting different type of web facility' + '<br/>' + 'Which is correct ?',
        options: [
            'ii>i',
            'i & ii',
            'i, ii & iii',
            'I do not know',
            'ii & iii',
        ],
        rightAnswer: 2
    },
    {
        question: 'In computer networking system, Placement of the computer in different rooms of the same building is called',
        options: [
            'MAN',
            'LAN',
            'PAN',
            'WAN',
            'a and d',
        ],
        rightAnswer: 1
    },
    {
        question: 'What does malware do to your computer?',
        options: [
            'Gains access to a users system in order to carry out certain tasks which a hacker has scheduled' + '<br/>' + 'to reproduce itself and spread from one file or program to another',
            'Deletes your personal files and applications' + '<br/>' + 'Download an anti-virus program',
            'Slows down your system',
            'Bad computer performance',
            'Bad computer performance' + '<br/>' + 'Slows down your system',
        ],
        rightAnswer: 0
    },
    {
        question: 'What could you install on your computer in order to keep it safe and secure from viruses?',
        options: [
            'Copying or transfering software',
            'Download Spyware',
            'Download Malware',
            'Hacking in to a user`s system',
            'Download an Anti-Virus program',
        ],
        rightAnswer: 4
    },
    {
        question: '____________ is the study of molecules and structures whose size ranges from 1 to 100 nanometers.',
        options: [
            'Biology',
            'Molecular physics',
            'Microelectrodes',
            'Nanoscience',
            'Planimetry',
        ],
        rightAnswer: 3
    },
    {
        question: 'The ability to recover and read deleted or damaged files from a criminal computer is an example of a law enforcement specialty called:',
        options: [
            'seven dimensional' + br + 'robotics',
            'presentation',
            'computer forensics' + br + 'fornsica',
            'digital forensics',
            'animation' + br + 'simulation',
        ],
        rightAnswer: 2
    },
    {
        question: 'Hexadecimal has a base value of:',
        options: [
            '66',
            '16',
            '8',
            '18',
            '6',
        ],
        rightAnswer: 1
    },
    {
        question: 'Computers gather data, which means that they allow users to ____________ data.',
        options: [
            'input' + br + 'enter',
            'keep' + br + 'output',
            'present',
            'output',
            'store',
        ],
        rightAnswer: 0
    },
    {
        question: 'One piece of information stored about a thing or person is called a _____.',
        options: [
            'Column',
            'Store',
            'Sector',
            'Segment',
            'Field',
        ],
        rightAnswer: 4
    },
    {
        question: 'The technology used to read pencil or pen marks on a multiple choice answer sheet is?',
        options: [
            'OCR',
            'POS',
            'PWR',
            'OMR',
            'MICR',
        ],
        rightAnswer: 3
    },
    {
        question: 'What is unauthorized transfer or copying ?',
        options: [
            'Download an anti-virus program',
            'Only transfering software with the permission of the user',
            'Copying or transfering software without the permission of the user',
            'Hacking in to a user`s system',
            'Keep your computer password protected',
        ],
        rightAnswer: 2
    },
    {
        question: '____________ tags, when placed on an animal, can be used to record and track in a database all of the animal movements.',
        options: [
            'RRID',
            'RFID',
            'GPS',
            'POS',
            'Point-of-sale',
        ],
        rightAnswer: 1
    },
    {
        question: 'How many bits in Unicode?',
        options: [
            '16',
            '64',
            '38',
            '8',
            '4',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which is the general color of twisted pair cable?',
        options: [
            'b and c',
            'orange',
            'Brown',
            'white',
            'Black',
        ],
        rightAnswer: 3
    },
    {
        question: 'Which of the following storage media provides sequential access only?',
        options: [
            'CD disk',
            'Floppy disk',
            'Magnetic tape',
            'Magnetic disk',
            'Optical disk',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which of the items is an input device?',
        options: [
            'Printer',
            'Mouse' + br + 'Keyboard' + br + 'Scanner',
            'Display Board' + br + 'Computer Monitor',
            'Overhead Projector',
            'Computer Monitor',
        ],
        rightAnswer: 1
    },
    {
        question: 'In a Database, a RECORD is...?',
        options: [
            'is the diagonal line of data made up from a number of random fields.',
            'he field that contains unique identifiers',
            'is the single identification label given to a person or item.',
            'is the name of the vinyl disk to store music recordings',
            'is all of the data about one person or item',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which is the Universal gate?',
        options: [
            'NOR',
            'NOT',
            'AND',
            'OR',
            'b and c',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which one of these is a type of viruses?',
        options: [
            'Hacking',
            'Internet Worm' + br + 'Spyware' + br + 'Adware',
            'Red hat' + br + 'White hat',
            'Bad internet',
            'Red hat' + br + 'Hacking',
        ],
        rightAnswer: 1
    },
    {
        question: 'What kind of image is created in virtual reality?',
        options: [
            'one dimensional',
            'two dimensional',
            'three dimensional',
            'Multi dimensional',
            'seven dimensional',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which one of these is a real File System?',
        options: [
            'EXT5',
            'NTSF',
            'FSX2',
            'HTFSN',
            'BTRFS',
        ],
        rightAnswer: 4
    },
    {
        question: 'A(n) ____________ system is a small, wireless handheld computer that scans an items tag and pulls up the current price (and any special offers) as you shop.',
        options: [
            'POS',
            'seven dimensional',
            'data mining' + br + 'POS',
            'PSS' + br + 'hand scanner' + br + 'CCD',
            'inventory',
        ],
        rightAnswer: 3
    },
    {
        question: 'How can you prevent spyware from accessing your computer?',
        options: [
            'Copying or transfering software',
            'Keep your computer password protected',
            'Dont click on advertisements',
            'Hacking in to a user`s system',
            'Download an anti-virus program',
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