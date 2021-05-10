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
        question: 'Errors in computer programs are called:',
        options: [
            'Spam',
            'error',
            'virus',
            'Mistakes',
            'Bugs',
        ],
        rightAnswer: 4
    },
    {
        question: 'Which of the following is not the characteristic of a computer?',
        options: [
            'computer cannot think at its own',
            'computer processes information error free',
            'computer is an operating system',
            'computer is an electrical machine',
            'computer can hold data for any length of time',
        ],
        rightAnswer: 3
    },
    {
        question: 'Word processing, spreadsheet, and photo-editing are examples of:',
        options: [
            'storage device' + br + 'a process',
            'output device' + br + 'operating system software',
            'application software' + br + 'data processing',
            'system software',
            'operating system software',
        ],
        rightAnswer: 2
    },
    {
        question: 'A system that attempts to stop spammers and bots by asking you to re-type letters and numbers shown in an image to prove that you are a real person.',
        options: [
            'Teleworking',
            'Captcha' + br + '<img src="captha.png" class="captha">',
            'Ripping',
            'Specification',
            'Streaming',
        ],
        rightAnswer: 1
    },
    {
        question: 'The steps and tasks needed to process data, such as responses to questions or clicking an icon, are called:',
        options: [
            'instructions',
            'Intranet',
            'application software',
            'Virus',
            'the operating system',
        ],
        rightAnswer: 0
    },
    {
        question: 'A small portable laptop computer designed for wireless communication and access to the Internet',
        options: [
            'Workstation',
            'mainframe',
            'communicator',
            'laptop',
            'netbook',
        ],
        rightAnswer: 4
    },
    {
        question: 'Servers are computers that provide resources to other computers connected to a:',
        options: [
            'communication',
            'artificial intelligence',
            'laptop',
            'network ',
            'supercomputer',
        ],
        rightAnswer: 3
    },
    {
        question: 'gif, jpg, bmp, png are used as extensions for files which store',
        options: [
            'Virtual data',
            'Video data',
            'Image data',
            'Text data',
            'Audio data',
        ],
        rightAnswer: 2
    },
    {
        question: 'A piece of software your computer uses to communicate with hardware (like printers and scanners).',
        options: [
            'Batch' + br + 'DOS',
            'Driver' + br + 'utility',
            'operating system',
            'hardware',
            'Microwave',
        ],
        rightAnswer: 1
    },
    {
        question: 'The ____________, also called the “brains” of the computer, is responsible for processing data',
        options: [
            'central processing unit (CPU)',
            'motherboard',
            'software',
            'memory',
            'USB flash drive',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which of the following statements is correct?',
        options: [
            'Virus is a part of hardware',
            'Virus improves the speed of processing information through computer',
            'Virus is an operating system',
            'Internet does not allow the virus to spread',
            'Virus is a part of software',
        ],
        rightAnswer: 4
    },
    {
        question: 'The term bit is short for:',
        options: [
            'number system',
            'binary language',
            'zero',
            'binary digit' + br + '0 or 1',
            'binary number' + br + '0 and 1',
        ],
        rightAnswer: 3
    },
    {
        question: 'Computers process data into information by working exclusively with:',
        options: [
            'storage',
            'multimedia',
            'numbers',
            'mainframe',
            'client',
        ],
        rightAnswer: 2
    },
    {
        question: 'A network of servers accessed via the internet by many organizations.',
        options: [
            'hybrid cloud',
            'Public Cloud',
            'On-Premise Cloud',
            'Private Cloud',
            'Website',
        ],
        rightAnswer: 1
    },
    {
        question: ' ____________ is the science revolving around the use of nano structures to build devices on an extremely small scale.',
        options: [
            'Nanotechnology ',
            'Artificial intelligence',
            'Computer forensics',
            'Micro-technology',
            'Micro technology',
        ],
        rightAnswer: 0
    },
    {
        question: 'Open wireless protocol over a short distance that allows devices to communicate using radio waves instead of wires.',
        options: [
            'Webpage',
            'Website',
            'WiFi',
            'Wireless personal area network' + br + 'WPAN' + br + 'Bluetooth',
            'anti-spyware',
        ],
        rightAnswer: 3
    },
    {
        question: 'Computers use the ____________ language to process data.',
        options: [
            'processing',
            'binary digit',
            'binary' + br + '0 and 1',
            'UTF-8',
            'representational',
        ],
        rightAnswer: 2
    },
    {
        question: '1 Byte is equal to:',
        options: [
            'kilobyte ',
            'bit',
            'byte',
            'gigabyte',
            'megabyte',
        ],
        rightAnswer: 1
    },
    {
        question: 'A type of computer where the monitor, keyboard, pointing device and processor are integrated into one portable unit.',
        options: [
            'Workstation',
            'Mainframe',
            'Supercomputer',
            'smartphone' + br + 'tablet',
            'netbook' + br + 'laptop',
        ],
        rightAnswer: 4
    },
    {
        question: 'A system where it is possible to connect to a network or single computer through wireless communications.',
        options: [
            'WiFi' + br + 'Wireless Fidelity',
            'web',
            'Webpage',
            'Website',
            'Window',
        ],
        rightAnswer: 0
    },
    {
        question: 'Which is the largest unit of storage among the following?',
        options: [
            'Megabit',
            'Terabyte',
            'Gigabyte',
            'Megabyte',
            'Kilobyte',
        ],
        rightAnswer: 1
    },
    {
        question: 'Which of the following is the appropriate format of URL of e-mail',
        options: [
            'www_mail.com',
            'www.mail.com',
            'www@mail.com' + br + '777@mail.com',
            '_mail.com',
            'www',
        ],
        rightAnswer: 2
    },
    {
        question: 'A phone offering advanced features. the ability to send emails, surf the Internet.',
        options: [
            'Communicator',
            'Workstation',
            'laptop ',
            'Camera phone',
            'mobile phone' + br + 'smartphone' + br + 'communicator',
        ],
        rightAnswer: 4
    },
    {
        question: 'A ____________ is approximately a million bytes.',
        options: [
            'eight megabyte ',
            'kilobyte',
            'gigabyte',
            'megabyte',
            'eight petabyte',
        ],
        rightAnswer: 3
    },
    {
        question: 'Which of the following options best describes the function of the shortcut key combination: Ctrl+P ?',
        options: [
            'Pressing Ctrl+P will paste the contents of your document',
            'Pressing Ctrl+P will close the Page Layout dialogue box',
            'Pressing Ctrl+P will print your document',
            'Pressing Ctrl+P will open the Page Layout dialogue box',
            'Pressing Ctrl+P will launch the Print area of the Backstage view',
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