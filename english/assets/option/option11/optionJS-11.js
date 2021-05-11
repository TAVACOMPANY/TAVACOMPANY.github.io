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
        question: 'Auxiliary verbs in the Future Continuous Tense:',
        options: [
            'would be',
            'will be',
            'has',
            'will have been',
            'would',
        ],
        rightAnswer: 1
    },
    {
        question: 'How many boys … there in your class?',
        options: [
            'was',
            'is',
            'am',
            'are',
            'be',
        ],
        rightAnswer: 3
    },
    {
        question: 'The possessive form of the noun in singular: I stayed at …',
        options: [
            'my sister’s house',
            'of my sister house',
            'my sister house',
            'the house of my sister',
            'my sisters’ house',
        ],
        rightAnswer: 0
    },
    {
        question: 'You … have an annual check-up.',
        options: [
            'should',
            'can’t',
            'must to',
            'don’t need',
            'can to',
        ],
        rightAnswer: 0
    },
    {
        question: '___ did you show the letter to?',
        options: [
            'what kind of',
            'what',
            'whose',
            'whom',
            'which',
        ],
        rightAnswer: 3
    },
    {
        question: 'Dіd you meet ... on your way home?',
        options: [
            'any',
            'anybody',
            'nobody',
            'some',
            'something',
        ],
        rightAnswer: 1
    },
    {
        question: 'A large bird which cannot fly is a (an)…',
        options: [
            'eagle',
            'swan',
            'ostrich',
            'parrot',
            'swallow',
        ],
        rightAnswer: 2
    },
    {
        question: 'The British money is …',
        options: [
            'dinar',
            'crone',
            'frank',
            'dollar',
            'pound',
        ],
        rightAnswer: 4
    },
    {
        question: 'Part of speech of the highlighted word: We missed our interesting lessons.',
        options: [
            'Причастие',
            'Глагол',
            'Наречие',
            'Местоимение' + '<br/>' + 'E @ Adjective',
            'The Pronoun',
        ],
        rightAnswer: 1
    },
    {
        question: 'Translate the sentence: The children are in the street.',
        options: [
            'Ребенок в саду',
            'На улице дети',
            'Ученики на улице',
            'Дети на улице',
            'Ребенок на улице',
        ],
        rightAnswer: 3
    },
    {
        question: 'This is … beautiful painting.',
        options: [
            'at',
            'an',
            '-',
            'a ',
            'the',
        ],
        rightAnswer: 3
    },
    {
        question: 'Correlate this idiom with its meaning: Watch your mouth.',
        options: [
            'Stop talking',
            'Be careful about what you say',
            'Don’t tolerate more',
            'Don’t turn the truth into a lie',
            'Win the prize',
        ],
        rightAnswer: 1
    },
    {
        question: 'The correct use of the tenses in the sentences:',
        options: [
            'She watched a video after the children were going to bed',
            'Before he had sung a song he played the guitar',
            'Susan turned on the radio after she had washed the dishes' + '<br/>' + 'After John had made breakfast he phoned his friend' + '<br/>' + 'They had ridden their bikes before they met their friends', 
            'Before he had sung a song he played the guitar' + '<br/>' + 'I was very tired because I have studied too much',
            'After my brother has come home he fed the cat' + '<br/>' + 'When she had arrived the match already started' + '<br/>' + 'I was very tired because I have studied too much',
        ],
        rightAnswer: 2
    },
    {
        question: 'Give the English translation for “Дайте мне 2 килограмма огурцов” / “Маған екі килограмм қияр беріңізші.”',
        options: [
            'Can I have two kilos of potatoes?',
            'Can I have two kilos of apples?',
            'Can I have two kilos of potatoes?',
            'Can I have two kilos of carrots?',
            'Can I have two kilos of cucumbers?',
        ],
        rightAnswer: 4
    },
    {
        question: 'Hotels are becomіng ... nowadays.',
        options: [
            'more expensіve',
            'the expensіver',
            'the most expensіve',
            'the expensіvest',
            'expensіver',
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