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
const img = document.getElementById('image');

let score = 0; // Итоговый Результат

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: "Найдите правильный фрагмент программы, подсчитывающий количество букв А в строке S:",
        options: [
            "k:=0; for i:=1 to pos (‘A’,S) do concat (‘A’,S,k);",
            "k:=copy (S,pos(‘A’,S), length(S));",
            "k:=0; while pos (‘A’,S) do k:=k+1;",
            "k:=0; for i:=1 to length(s) do if s[i]=’A’ then k:=k+1;",
            "k:=0; while S <> ” do begin if pos (‘A’,S) <> 0 then k:=k+1; delete (S,1,pos(‘A’,S)); end;",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите правильный фрагмент программы, удаляющий в строке S первое слово и следующий за ним пробел: ",
        options: [
            "for i:=1 to ‘ ‘ do s[i]:=’ ‘;",
            "insert (pos(‘ ‘,s),s);",
            "delete (s,1,pos(‘ ‘,s));",
            "for i:=1 to pos(‘ ‘,s) do s[i]:=0;",
            "delete (s, pos(‘ ‘,s));",
        ],
        rightAnswer: 2
    },
    {
        question: "Найдите правильный фрагмент программы, выделяющий из строки S первое слово (до первого пробела):",
        options: [
            "s1:=copy (s,1,pos(‘ ‘,s)-1);",
            "s1:=insert (s,1,pos(‘ ‘,s)-1);",
            "s1:=copy (s,1,pos(’ ‘,s));",
            "s1:=copy (s,1,pos(’ ‘,s));",
            "s1:=s[1..pos(‘ ‘,s)];",
        ],
        rightAnswer: 0
    },
    {
        question: "Найдите правильный фрагмент программы, удаляющий в строке S все точки:",
        options: [
            "while length(s)<>0 do delete (s,pos(‘.’,s),1);",
            "while pos(‘.’,s)=0 do delete (s,pos(‘.’,s),’.’);",
            "while s <> ’’ do delete (s,pos(‘.’,s),1);",
            "for i:=1 to length(s) do if s[i]=’.’ Then s[i]:=0;",
            "while pos(‘.’,s)<>0 do delete (s,pos(‘.’,s),1);",
        ],
        rightAnswer: 4
    },
    {
        question: "В результате выполнения фрагмента программы s:=''; for c:='a' to 'd' do begin s:=s+c; write (s,','); end; на экран будет выведено:",
        options: [
            "a,b,c,d,",
            "a,ab,abc,abcd,",
            "abcd,abc,ab,a,",
            "abcd",
            "a,ba,cba,dcba,",
        ],
        rightAnswer: 1
    },
    {
        question: "В результате выполнения фрагмента программы s:=''; for c:='a' to 'd' do begin s:=c+s; write (s,','); end; на экран будет выведено:",
        options: [
            "a,b,c,d,",
            "abcd,abc,ab,a,",
            "a,ba,cba,dcba,",
            "abcd",
            "a,ab,abc,abcd,",
        ],
        rightAnswer: 2
    },
    {
        question: "Найдите правильный фрагмент программы заменяющий тире на двоеточие в строке S:",
        options: [
            "repeat if pos(‘-‘,s)<>0 then s[pos(‘-‘,s)]:=’:’;",
            "while length(s)<>0 do copy(s,’-‘,’:);",
            "while length(s)<>0 do copy(s,’-‘,’:);",
            "while s<>’’ do pos (‘-‘,s):=’:’;",
            "for i:=1 to length(s) do if s[i]:=’-‘ then s[i]:=’:’;",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите пример правильного описания переменных и массивов:" ,
        options: [
            "var a:array[0..12,10..20] of real; b:char;",
            "var a:string[1..5,1..10]; b:real;",
            "var a:string[1..5,1..10];",
            "var a:array[1..10]; b:char;,",
            "var a:array[1…15] of integer; b:array[1…3,1…6] of real;",
        ],
        rightAnswer: 0
    },
    {
        question: "Найдите правильный фрагмент программы, в котором элементы вектора А переписываются в вектор В в обратном порядке. В векторе находится 10 элементов:",
        options: [
            "for i:=1 to 10 do b[i]:=a[11-i];.",
            "for i:=1 to 10 do b[i]:=a[10-i];.",
            "for i:=1 to 10 do b[i+10]:=a[i];.",
            "for i:=1 to 10 do b[11+i]:=a[i];.",
            "for i:=1 to 10 do b[10-i]:=a[i];.",
        ],
        rightAnswer: 0
    },
    {
        question: "Найдите правильный фрагмент программы, в котором в вектор В записываются все отрицательные элементы вектора А. В векторе А находится 10 элементов",
        options: [
            "k:=0;" + "<br/>" + "for i:=1 to 10 do " + "<br/>" + "begin" + "<br/>" + "  if a[i]<0 then" + "<br/>" + "b[k]:= a[i];" + "<br/>" + "k:=k+1;" + "<br/>" + "end;",
            "k:=1;" + '<br/>' + "for i:=1 to 10 do " + "<br/>" + "if a[i]<0 then" + "<br/>" + " b[k]:= a[i];" + "<br/>" + " k:=k+1;",
            "k:=0;" + "<br/>" + "for i:=1 to 10 do " + "<br/>" + "if a[i]<0 then" + "<br/>" + "b[i]:= a[k];" + "<br/>" + "k:=k+1;",
            "k:=1;" + '<br/>' + "for i:=1 to 10 do " + "<br/>" + "begin" + "<br/>" + "if a[i]<0 then" + "<br/>" + "b[i]:= a[k];" + "<br/>" + "k:=k+1;" + "<br/>" + "end;",
            "k:=1;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + " if a[i]<0 then" + "<br/>" + " begin" + "<br/>" + " b[k]:= a[i];" + "<br/>" + " k:=k+1;" + "<br/>" + "end;",
        ],
        rightAnswer: 4
    },
    {
        question: "Найдите правильный фрагмент программы, в котором подсчитывается сумма четных элементов  вектора А. В векторе находится 10 элементов:",
        options: [
            "s:=1;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i] mod 2 = 0 then" + "<br/>" + "s:=s+a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to 10 do" + '<br/>' + "if a[i] mod 2 = 0 then" + "<br/>" + "s:=s+a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i] div 2 = 0 then" + "<br/>" + "s:=s+a[i];",
            "s:=1;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i] div 2 = 1 then" + "<br/>" + "s:=s+a[i];",
            "s:=1;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i] mod 2 = 1 then" + "<br/>" + "s:=s+a[i];",
        ],
        rightAnswer: 1
    },
    {
        question: "Найдите правильный фрагмент программы, в котором в векторе А меняются местами элементы: первый с последним, второй с предпоследним и т.д. В векторе находится 10 элементов:",
        options: [
            "for i:=1 to 5 do" + "<br/" + "b:= a[i];" + "<br/>" + "a[i]:=a[11-i];" + "<br/>" + "a[11-i]:=b;",
            "for i:=1 to 5 do" + "<br/>" + "begin" + "<br/>" + "b:= a[i];" + "<br/>" + "a[i]:=a[10-i];" + "<br/>" + "a[10-i]:=b;" + "<br/>" + "end;",
            "for i:=1 to 5 do" + "<br/>" + "begin" + "<br/>" + "b:= a[i];" + "<br/>" + "a[i]:=a[11-i];" + "<br/>" + "a[11-i]:=b;" + "<br/>" + "end;",
            "for i:=1 to 10 do" + "<br/>" + "begin" + "<br/>" + "b:= a[i];" + "<br/>" + "a[i]:=a[11-i];" + "<br/>" + "a[11-i]:=b;" + "<br/>" + "end;",
            "for i:=1 to 10 do" + '<br/>' + "begin" + "<br/>" + "b:= a[i];" + "<br/>" + "a[i]:=a[10-i];" + "<br/>" + "a[10-i]:=b;" + "<br/>" + "end;",
        ],
        rightAnswer: 2
    },
    {
        question: "Найдите правильный фрагмент программы, в котором в векторе А находится сумма элементов, расположенных на четных местах. В векторе находится 10 элементов:",
        options: [
            "s:=1;" + "<br/>" + "for i:=1 to 5 do" + "<br/>" + "s:=s+a[i*2-2];",
            "s:=1;" + "<br/>" + "for i:=1 to 5 do" + "<br/>" + "s:=s+a[i*2+2];",
            "s:=0;" + "<br/>" + "for i:=1 to 5 do" + "<br/>" + "s:=s+a[i*2-1];",
            "s:=0;" + "<br/>" + "for i:=1 to 5 do" + "<br/>" + "s:=s+a[i*2];",
            "s:=0;" + '<br/>' + "for i:=1 to 5 do" + "<br/>" + "s:=s+a[i+2];",
        ],
        rightAnswer: 3
    },
    {
        question: "Найдите правильный фрагмент программы, в котором в векторе А находится сумма элементов, расположенных перед первым нулем. В векторе находится 10 элементов:",
        options: [
            "s:=0;" + "<br/>" + "for i:=1 downto 10 do" + "<br/>" + "if a[i]  = 0 then" + "<br/>" + " k:=i;" + "<br/>" + "break;" + "<br/>" + "for i:=1 to k-1 do" + "<br/>" + "s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i]  = 0 then" + "<br/>" + "begin" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=1 to k-1 do" + "<br/>" + "s:= s+a[i];", 
            "s:=0;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i]  = 0 then" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "for i:=1 to k-1 do" + "<br/>" + "s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=10 downto 1 do" + "<br/>" + "if a[i]  = 0 then" + "<br/>" + " k:=i;" + "<br/>" + "break;" + "<br/>" + "for i:=1 to k+1 do" + "<br/>" + " s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=10 downto 1 do" + "<br/>" + "begin" + "<br/>" + "if a[i]  = 0 then" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=1 to k+1 do" + "<br/>" + "s:= s+a[i];",
        ],
        rightAnswer: 1
    },
    {
        question: "Найдите правильный фрагмент программы, в котором в векторе А находится сумма элементов, расположенных после последнего нуля. В векторе находится 10 элементов:",
        options: [
            "s:=0;" + "<br/>" + "for i:=10 downto 1 do" + "<br/>" + "if a[i] = 0 then" + "<br/>" + "begin" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=k+1 to 10 do" + "<br/>" + "s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "if a[i] = 0 then" + "<br/>" + "begin" + "<br/>" + " k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=k+1 to 10 do" + "<br/>" + "s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=10 downto 1 do" + "<br/>" + "if a[i] = 0 then" + "<br/>" + "begin" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=k-1 to 10 do" + "<br/>" + "s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=10 downto 1 do" + "<br/>" + "if a[i] = 0 then" + "<br/>" + "begin" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=1 to k+1 do" + "<br/>" + "s:= s+a[i];",
            "s:=0;" + "<br/>" + "for i:=1 to 10 do" + "<br/>" + "begin" + "<br/>" + "if a[i] = 0 then" + "<br/>" + "k:=i;" + "<br/>" + "break;" + "<br/>" + "end;" + "<br/>" + "for i:=k-1 to 10 do" + "<br/>" + "s:= s+a[i];",
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
    timerset();
});

const attention = document.getElementById('attention');

function coratten() {
    if (score >= 12) {
        attention.innerHTML = 'Ты настоящий джедай Pascal!';
    } else {
        attention.innerHTML = 'Тебе не стать программистом!';
    }
};
