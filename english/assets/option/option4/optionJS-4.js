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
        question: 'Choose the right sentence:',
        options: [
            'This is my friend’s flat',
            'This is my flat’s friend',
            'This is my friends flat',
            'This is my friend flat',
            'This is my flats friend',
        ],
        rightAnswer: 0
    },
    {
        question: 'Marat is fond … pop music.',
        options: [
            'in',
            'for',
            'after',
            'of',
            'with',
        ],
        rightAnswer: 3
    },
    {
        question: 'I asked her … … … … and she said her name was Maral.',
        options: [
            'what her visit was' + '<br/>' + 'what her sister was',
            'what her mother was' + '<br/>' + 'what her friend was',
            'what her name was' + '<br/>' + 'what her surname was',
            'what her book was' + '<br/>' + 'what her home was',
            'what her mother was' + '<br/>' + 'what her sister was',
        ],
        rightAnswer: 2
    },
    {
        question: 'Sentences with the correct indefinite pronouns:',
        options: [
            'There isn’t anybody in the classroom' + '<br/>' + 'There is someone at the door',
            'They need some care and attention' + '<br/>' + 'They didn’t have some oranges in the market',
            'Would you like some juice, please? – Yes, please' + '<br/>' + 'Do you know some good hotels in London?',
            'Don’t buy some tea! We have some' + '<br/>' + 'I want to wash my hair. Is there any shampoo?',
            'They didn’t have some oranges in the market' + '<br/>' + 'They need some care and attention',
        ],
        rightAnswer: 0
    },
    {
        question: 'Choose the correct word order in the interrogative sentence:',
        options: [
            'How old are you today?',
            'You are old how today?',
            'Today how are you old?',
            'How old you are today?',
            'Old how are you today?',
        ],
        rightAnswer: 0
    },
    {
        question: 'Correct sentences with Participle I:',
        options: [
            'She can’t write with her broken right arm',
            'Dancing is supposed to be a very emotional hobby',
            'Hitch-hiking is so cool' + '<br/>' + 'I enjoy travelling in summer',
            'Switch on TV quickly! There is the breaking news' + '<br/>' + 'Go on writing in the test papers',
            'The sleeping cat didn’t bother anyone' + '<br/>' + 'She was watching her dancing child with pleasure',
        ],
        rightAnswer: 4
    },
    {
        question: 'Choose the equivalent of the word “Заяц”.',
        options: [
            'hear',
            'here',
            'hear',
            'hare',
            'hair',
        ],
        rightAnswer: 3
    },
    {
        question: 'A jar of ...',
        options: [
            'milk',
            'water',
            'honey',
            'bread',
            'oil',
        ],
        rightAnswer: 2
    },
    {
        question: 'Select the interrogative pronoun for the selected word:' + '<br/>' + 'They are usually at home in the evening.',
        options: [
            'Where',
            'When',
            'Who',
            'How',
            'Why',
        ],
        rightAnswer: 0
    },
    {
        question: 'Find the antonym:“To remember”',
        options: [
            'To forget',
            'To forgive',
            'To love',
            'To remind',
            'To please.',
        ],
        rightAnswer: 0
    },
    {
        question: 'I’ll pass all my exams if … .',
        options: [
            'I shall work hard at school',
            'I have work hard at school',
            'I worked hard at school',
            'I will work hard at school',
            'I work hard at school',
        ],
        rightAnswer: 4
    },
    {
        question: 'Put words into the right order:',
        options: [
            'He does exercises always morning.',
            'Doed he always morning exercises?',
            'Exercises he always does morning.',
            'He always does morning exercises.',
            'He does always morning exercises.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Synonym of the word “clever” is:',
        options: [
            'Silent',
            'Shy',
            'Smart',
            'Lively',
            'Lazy',
        ],
        rightAnswer: 2
    },
    {
        question: 'You can’t stop me ____ what I want.',
        options: [
            'from doing',
            'that I do',
            'do',
            'to do',
            'be doing',
        ],
        rightAnswer: 0
    },
    {
        question: 'The correct word order in the imperative sentence:',
        options: [
            'Do not forget to lock the door!',
            'Not do forget to lock the door!',
            'Forget do not to lock the door!',
            'To the door do not forget lock!',
            'The door not do forget to lock!',
        ],
        rightAnswer: 0
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