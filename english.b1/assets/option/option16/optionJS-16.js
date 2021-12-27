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
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'Mark is a vegetarian. He . . . meat.',
        options: [
            'doesn’t eat',
            'eat',
            'not eat',
            'don’t eat',
            'eats',
        ],
        rightAnswer: 0
    },
    {
        question: 'Next term we . . . two new subjects.',
        options: [
            'studied',
            'is studying',
            'will study',
            'has studied',
            'studies',
        ],
        rightAnswer: 2
    },
    {
        question: 'There was no one else at the box office. I  ...  in a queue.',
        options: [
            'needed',
            'needn’t have waited',
            'needn’t wait',
            'mustn’t wait',
            "didn’t need to wait",
        ],
        rightAnswer: 4
    },
    {
        question: 'They were excited about their holiday because they ... abroad before.',
        options: [
            'had ever been',
            'had never been',
            'ever had be',
            'hadn’t never been',
            'weren’t',
        ],
        rightAnswer: 1
    },
    {
        question: 'When I was at school, I ... in the choir.',
        options: [
            'sung',
            'singed',
            'sing',
            'sang',
            'have sung',
        ],
        rightAnswer: 3
    },
    {
        question: 'London is the ... city in the UK.',
        options: [
            'biggest',
            'bigger',
            'most big',
            'big',
            'more big',
        ],
        rightAnswer: 0
    },
    {
        question: 'When I got to the theatre the play . . . already.',
        options: [
            'has started',
            'would start',
            'had started',
            'started',
            'will start',
        ],
        rightAnswer: 2
    },
    {
        question: 'a large natural stream of water flowing in an ocean or in other streams of water',
        options: [
            'lake',
            'plain',
            'ocean',
            'valley',
            'river',
        ],
        rightAnswer: 4
    },
    {
        question: 'We ... skiing last winter.',
        options: [
            'did went',
            'went',
            'would go',
            'have gone',
            'used to go',
        ],
        rightAnswer: 1
    },
    {
        question: 'These students entered the university . . . last year.',
        options: [
            'on',
            'in',
            'from',
            '____',
            'at',
        ],
        rightAnswer: 3
    },
    {
        question: 'That student is good, she will … all the examinations well.',
        options: [
            'pass',
            'understand',
            'take',
            'require',
            'forget',
        ],
        rightAnswer: 0
    },
    {
        question: 'I felt nervous because I ... a speech in public before.',
        options: [
            'have never given',
            'did never give',
            'had never given',
            'wasn’t given',
            'never gave',
        ],
        rightAnswer: 2
    },
    {
        question: '... Peter go skiing with you last year?',
        options: [
            'Was',
            'do',
            'does',
            'Has',
            'Did',
        ],
        rightAnswer: 4
    },
    {
        question: 'A great deal of cotton is . . . the south of this country.',
        options: [
            'eaten',
            'grown',
            'imported',
            'manufactured',
            'bought',
        ],
        rightAnswer: 1
    },
    {
        question: 'Where in Singapore ... you live?',
        options: [
            'was',
            'have',
            'were',
            'did',
            'are',
        ],
        rightAnswer: 3
    },
    {
        question: 'I think, he … now.',
        options: [
            'is sleeping',
            'slept',
            'was sleeping',
            'sleeps',
            'sleep',
        ],
        rightAnswer: 0
    },
    {
        question: '… you bring me the menu, please.',
        options: [
            'must',
            'have',
            'would',
            'may',
            'should',
        ],
        rightAnswer: 2
    },
    {
        question: 'I don’t understand this sentence. What . . . ?',
        options: [
            'this word means',
            'means this word',
            'this word does mean',
            'does mean this word',
            'does this word mean',
        ],
        rightAnswer: 4
    },
    {
        question: 'Could you ............... me up from the airport, please?',
        options: [
            'take',
            'pick',
            'collect',
            'last',
            'tell',
        ],
        rightAnswer: 1
    },
    {
        question: 'Edward would make a great nurse because he’s so .............. He never gets anxious when things go wrong.',
        options: [
            'disorganized',
            'creative',
            'generous',
            'level-headed',
            'critical',
        ],
        rightAnswer: 3
    },
    {
        question: 'Would you mind if I _____ early?',
        options: [
            'left',
            'would leave',
            'am leaving',
            'was left',
            'would left',
        ],
        rightAnswer: 0
    },
    {
        question: "It _____ a good meeting if Rosa hadn't been there.",
        options: [
            'would have',
            'would be',
            "wouldn't have been",
            "wouldn't be",
            "hadn't been",
        ],
        rightAnswer: 2
    },
    {
        question: "What's your hometown like?",
        options: [
            'we have it',
            'he is ok',
            'they like',
            "I'm all right",
            "It's fine",
        ],
        rightAnswer: 4
    },
    {
        question: 'I’m very ............... on cooking. It’s a great way to relax.',
        options: [
            'serious',
            'keen',
            'popular',
            'fond',
            'interested',
        ],
        rightAnswer: 1
    },
    {
        question: "I very much hope it'll rain soon. We _____ a drop for over a month.",
        options: [
            "haven't",
            "has",
            "hadn't",
            "haven't had",
            "didn't have",
        ],
        rightAnswer: 3
    },
    {
        question: 'If you drove more slowly, you _____ so many accidents.',
        options: [
            "wouldn't have had",
            "shouldn't have",
            "hadn't had",
            'had had',
            'would not have',
        ],
        rightAnswer: 0
    },
    {
        question: 'Will you do me a favour if _____ you?',
        options: [
            'I want',
            'we all would like',
            'I ask',
            'somebody wants it',
            'we speak',
        ],
        rightAnswer: 2
    },
    {
        question: 'Most ... the territory of Kazakhstan is occupied ... lowlands',
        options: [
            'at, for',
            'in, of',
            'of, with',
            'at, with',
            'of , by',
        ],
        rightAnswer: 4
    },
    {
        question: 'If everybody _____, we could hold a meeting tomorrow.',
        options: [
            'agrees',
            'agreed',
            'would be agreed',
            'agree',
            'will be agreed',
        ],
        rightAnswer: 1
    },
    {
        question: 'They first met when they ... for a big company in Madrid.',
        options: [
            'work',
            'was working',
            'working',
            'were working',
            'have worked',
        ],
        rightAnswer: 3
    },
    {
        question: 'Before I had an internet connection, I used to ... to the library two or three times a week.',
        options: [
            'go',
            'have gone',
            'went',
            'have going',
            'going',
        ],
        rightAnswer: 0
    },
    {
        question: 'These are my friends. . . .names are Dave and Jake. I like . . . .',
        options: [
            'them/ theirs',
            'they / them',
            'their/them',
            'their/ they',
            'theirs/they',
        ],
        rightAnswer: 2
    },
    {
        question: 'Last year I ............... a lot of business trips.',
        options: [
            'worked',
            'have',
            'was',
            'travelled',
            'went on',
        ],
        rightAnswer: 4
    },
    {
        question: "I can't call him now because I _____ his telephone number.",
        options: [
            'am lost',
            'have lost',
            'was lost',
            'loses',
            'have been losing',
        ],
        rightAnswer: 1
    },
    {
        question: 'I wish I ___ have to work tomorrow, but unfortunately I do.',
        options: [
            'don’t',
            'wouldn’t',
            'should',
            'didn’t',
            'will',
        ],
        rightAnswer: 3
    },
    {
        question: 'The lecture was not interesting and there were . . . students at the lecture.',
        options: [
            'few',
            'many',
            'much',
            'small',
            'little',
        ],
        rightAnswer: 0
    },
    {
        question: 'In the South the USA … on Mexico.',
        options: [
            'is located',
            'is surrounded',
            'borders',
            'consists',
            'is situated',
        ],
        rightAnswer: 2
    },
    {
        question: 'What ... the weather like on your holiday?',
        options: [
            'Were',
            'being',
            'was been',
            'was being',
            'Was',
        ],
        rightAnswer: 4
    },
    {
        question: 'My friend … never … to the USA.',
        options: [
            'have … been',
            'has … been',
            'have … be',
            'was … been',
            'was … being',
        ],
        rightAnswer: 1
    },
    {
        question: 'It’s two years ___ Richard.',
        options: [
            'for to see',
            'since I don’t see',
            'since I seen',
            'since I last saw',
            'since I have saw',
        ],
        rightAnswer: 3
    },
    {
        question: 'It’s up to you. You ............ come.',
        options: [
            "don’t have to",
            "might to",
            "must",
            "should",
            "mustn’t",
        ],
        rightAnswer: 0
    },
    {
        question: 'If you _____ so long to do the shopping, dinner would have been ready by now.',
        options: [
            "wouldn't take",
            "wouldn't have taken",
            "hadn't taken",
            "haven't taken",
            "had took",
        ],
        rightAnswer: 2
    },
    {
        question: 'In my job I have to ............... with a lot of difficult customers.',
        options: [
            'act',
            'make',
            'treat',
            'show',
            'deal',
        ],
        rightAnswer: 4
    },
    {
        question: 'We didn’t like Pr.Brown’s lecture yesterday, it was . . . .',
        options: [
            'fantastic',
            'boring',
            'exciting',
            'great',
            'interesting',
        ],
        rightAnswer: 1
    },
    {
        question: 'The first period at the university starts . . . 8.15',
        options: [
            'by',
            'on',
            'from',
            'at',
            'in',
        ],
        rightAnswer: 3
    },
    {
        question: 'Fleet Street … known for the newspaper offices.',
        options: [
            'is',
            'will be',
            'were',
            'Was',
            'are',
        ],
        rightAnswer: 0
    },
    {
        question: '… you ever … Hollywood?',
        options: [
            'has … visit',
            'has … visited',
            'have … visited',
            'have … visit',
            'was … visit',
        ],
        rightAnswer: 2
    },
    {
        question: 'I remember my grandfather as a very kind man who ... never lose his temper or be impatient.',
        options: [
            "won’t",
            "used",
            "hasn’t",
            "didn't",
            'would',
        ],
        rightAnswer: 4
    },
    {
        question: 'He did not enter the university because he … in mathematics.',
        options: [
            'prepared',
            'failed',
            'learned',
            'worked',
            'studied',
        ],
        rightAnswer: 1
    },
    {
        question: 'Americans are good … baseball.',
        options: [
            'in',
            'on',
            'of',
            'at',
            'from',
        ],
        rightAnswer: 3
    },
    {
        question: 'Sandra told me she really ... the party last week.',
        options: [
            'enjoyed',
            'enjoys',
            'would enjoyed',
            'enjoy',
            'enjoying',
        ],
        rightAnswer: 0
    },
    {
        question: 'You made many mistakes in your last test. I think, this is your . . . work.',
        options: [
            'better',
            'bad',
            'worst',
            'worse',
            'good',
        ],
        rightAnswer: 2
    },
    {
        question: 'He … just … over Great Britain.',
        options: [
            'have flown',
            'flown',
            'flew',
            'fly',
            'has flown',
        ],
        rightAnswer: 4
    },
    {
        question: 'I didn’t recognise my old school friend because she ... so much.',
        options: [
            'changes',
            'had changed',
            'changing',
            'was changed',
            'have changed',
        ],
        rightAnswer: 1
    },
    {
        question: 'Was John waiting for you when you got to the station?',
        options: [
            'No, it is',
            'Yes, I was.',
            'No, he isn’t',
            'Yes, he was.',
            "No, he didn't.",
        ],
        rightAnswer: 3
    },
    {
        question: 'I didn’t ... to the swimming pool yesterday.',
        options: [
            'go',
            'have gone',
            'gone',
            'went',
            'going',
        ],
        rightAnswer: 0
    },
    {
        question: 'What … your new friend … in the USA a year ago?',
        options: [
            'does … do',
            'did … did',
            'did … do',
            'do …do',
            'did … does',
        ],
        rightAnswer: 2
    },
    {
        question: 'They are very ... on sport.',
        options: [
            'bored',
            'like',
            'interested',
            'good',
            'keen',
        ],
        rightAnswer: 4
    },
    {
        question: 'Sam’s going to ............... with friends.',
        options: [
            'tidy',
            'meet',
            'like',
            'chop',
            'have',
        ],
        rightAnswer: 1
    },
    {
        question: 'He wouldn’t have started talking if you _____ him.',
        options: [
            "did ask",
            "would ask",
            "wouldn't ask",
            "hadn't asked",
            "didn't ask",
        ],
        rightAnswer: 3
    },
    {
        question: 'If you want to get fit, you ............ go to the gym.',
        options: [
            'should',
            'must',
            'has to',
            'mustn’t',
            'don’t have to',
        ],
        rightAnswer: 0
    },
    {
        question: 'Tom . . . his hand when he was cooking the dinner.',
        options: [
            'was burning',
            'were burning',
            'burnt',
            'is burning',
            'burns',
        ],
        rightAnswer: 2
    },
    {
        question: 'Watch out! You ............ touch that.',
        options: [
            'mustn’t',
            'must',
            'should',
            'can’t',
            'shouldn’t',
        ],
        rightAnswer: 4
    },
    {
        question: '“How . . . ?” – “Nobody knows”',
        options: [
            'did happen the accident',
            'did the accident happen',
            'happened the accident',
            'was the accident happened',
            'the accident happened',
        ],
        rightAnswer: 1
    },
    {
        question: 'You look very bad! You … visit a doctor.',
        options: [
            'ought',
            'might to',
            'has to',
            'should',
            'can',
        ],
        rightAnswer: 3
    },
    {
        question: 'If I _____ rich, I would buy a fine house.',
        options: [
            'were',
            'am',
            'should be',
            'will be',
            'would be',
        ],
        rightAnswer: 0
    },
    {
        question: 'I ............ waiting in queues. It drives me crazy.',
        options: [
            'love',
            'don’t mind',
            'can’t stand',
            'am',
            'like',
        ],
        rightAnswer: 2
    },
    {
        question: 'If I didn’t have a big heart, I _____ you.',
        options: [
            "can't forgive",
            "mustn't have forgiven",
            "won't forgive",
            "will be",
            'wouldn’t have been able to forgive',
        ],
        rightAnswer: 4
    },
    {
        question: 'Paul would be a good artist if he …….... more patience.',
        options: [
            'had had',
            'had',
            'have',
            'will have',
            'has',
        ],
        rightAnswer: 1
    },
    {
        question: 'Sting has just ............... a new album.',
        options: [
            'won',
            'published',
            'had',
            'released',
            'liberated',
        ],
        rightAnswer: 3
    },
    {
        question: 'If I lived in the country, I _____ a lot of animals.',
        options: [
            'would have',
            'had had',
            'had',
            'would have had',
            'will have',
        ],
        rightAnswer: 0
    },
    {
        question: 'David _____ work at five.',
        options: [
            'had finished',
            'has finished',
            'finished',
            'will be finished',
            'was finished',
        ],
        rightAnswer: 2
    },
    {
        question: 'He is very slow. We always wait for . . . .',
        options: [
            'his',
            'her',
            'they',
            'its',
            'him',
        ],
        rightAnswer: 4
    },
    {
        question: "The chemist's was open, so luckily I ...     buy some aspirin.",
        options: [
            "can't",
            "could",
            "can",
            "did can",
            "couldn’t",
        ],
        rightAnswer: 1
    },
    {
        question: 'I would have gone by air if I ...money.',
        options: [
            'had',
            'have',
            'had have',
            'had had',
            'has',
        ],
        rightAnswer: 3
    },
    {
        question: '“Do you think it will rain?” “I ___!”',
        options: [
            'hope not',
            'didn’t hope',
            'don’t hope it',
            'don’t hope so',
            'won’t hope',
        ],
        rightAnswer: 0
    },
    {
        question: 'They ... clean our holiday villa, so I rang the owners to complain.',
        options: [
            "wasn't",
            "hasn’t",
            "didn't",
            "hadn't",
            "don’t",
        ],
        rightAnswer: 2
    },
    {
        question: 'I ... to take much exercise, but now I go to the gym regularly.',
        options: [
            "has used to",
            "using",
            "am not used",
            "don't use",
            "didn't use",
        ],
        rightAnswer: 4
    },
    {
        question: 'My friend moved … New York five years ago.',
        options: [
            'for',
            'to',
            'on',
            'from',
            'in',
        ],
        rightAnswer: 1
    },
    {
        question: 'Alice doesn’t work ___ . She left a few weeks ago.',
        options: [
            'much more',
            'here more',
            'any more here',
            'here any more',
            'no more here',
        ],
        rightAnswer: 3
    },
    {
        question: '... I carry that bag for you? ~ Oh, thank you.',
        options: [
            'Shall',
            'Would',
            'Have',
            'Will',
            'Do',
        ],
        rightAnswer: 0
    },
    {
        question: 'The doctor says I’m stressed out and that I ............... go on holiday for a month or so.',
        options: [
            'don’t have to',
            'mustn’t',
            'should',
            'am supposed to',
            'has to',
        ],
        rightAnswer: 2
    },
    {
        question: 'It’s a secret and no one knows about it yet so you ............... tell anyone.',
        options: [
            'don’t have to',
            'doesn’t have to',
            'has to',
            'must',
            'mustn’t',
        ],
        rightAnswer: 4
    },
    {
        question: 'She ............... her hair when you rang last night.',
        options: [
            'was washed',
            'was washing',
            'wash',
            'washes',
            'washed',
        ],
        rightAnswer: 1
    },
    {
        question: 'She doesn’t mind ............... me with my computer.',
        options: [
            'to help',
            'helps',
            'to helping',
            'helping',
            'help',
        ],
        rightAnswer: 3
    },
    {
        question: 'If they _____ machines, they would have finished much sooner.',
        options: [
            'had used',
            'used',
            'were using',
            'have used',
            'use',
        ],
        rightAnswer: 0
    },
    {
        question: 'Jane works six days ___ week.',
        options: [
            'some',
            'any',
            'a',
            'to the',
            'the',
        ],
        rightAnswer: 2
    },
    {
        question: 'He was not ready for the lesson yesterday and he . . .the teacher’s questions.',
        options: [
            'does not answer',
            'will not answer',
            'do not answer',
            'not to answer',
            'did not answer',
        ],
        rightAnswer: 4
    },
    {
        question: 'We missed the first part of the film because it ... by the time we got to the cinema.',
        options: [
            'started',
            'had started',
            'was starting',
            'starts',
            'starting',
        ],
        rightAnswer: 1
    },
    {
        question: 'I ... French at school, but I’m not really very good at it.',
        options: [
            'studying',
            'had study',
            'had studied',
            'studied',
            'Study',
        ],
        rightAnswer: 3
    },
    {
        question: "Susan has to work very hard. I ...do her job, I'm sure.",
        options: [
            "shouldn't",
            "couldn't",
            "mightn’t",
            "can't",
            "doesn't.",
        ],
        rightAnswer: 0
    },
    {
        question: 'I haven’t seen him for ___ that I don’t think I’d recognise him.',
        options: [
            'such a time',
            'so long time',
            'such a long time',
            'a such long time',
            'long time',
        ],
        rightAnswer: 2
    },
    {
        question: 'I was very busy yesterday. I . . . the report from 3 to 8 o’clock.',
        options: [
            'wrote',
            'is writing',
            'is written',
            'writing',
            'was writing',
        ],
        rightAnswer: 4
    },
    {
        question: '… is a person who serves a menu in a cafe or a restaurant.',
        options: [
            'shop-assistant',
            'waiter',
            'pilot',
            'policeman',
            'fireman',
        ],
        rightAnswer: 1
    },
    {
        question: 'She … around the square.',
        options: [
            'is walked',
            'walking',
            'to be walking',
            'is walking',
            'walking',
        ],
        rightAnswer: 3
    },
    {
        question: "I don't have a pen, but if I _____, I would lend it to you.",
        options: [
            'did',
            'have',
            'has',
            'do',
            'will have',
        ],
        rightAnswer: 0
    },
    {
        question: 'She is very interested ............ history.',
        options: [
            'about',
            'at',
            'in',
            'by',
            'with',
        ],
        rightAnswer: 2
    },
    {
        question: "I don't know what the road is like now because I _____ the place for twenty years.",
        options: [
            "didn't see",
            "saw",
            "don't see",
            "wasn't seeing",
            "haven't seen",
        ],
        rightAnswer: 4
    },
    {
        question: 'Who ... Mr Sanchez to the airport yesterday?',
        options: [
            'have take',
            'took',
            'taken',
            'have tool',
            'take',
        ],
        rightAnswer: 1
    },
    {
        question: 'Jack writes great children’s stories. He’s very . . . . . and always thinks of new ideas.',
        options: [
            'impatient',
            'efficient',
            'talkative',
            'creative',
            'critical',
        ],
        rightAnswer: 3
    },
    {
        question: 'I wouldn’t tell her if I ……….. you. She can’t keep a secret.',
        options: [
            'were',
            'am',
            'will have been',
            'will be',
            'had been',
        ],
        rightAnswer: 0
    },
    {
        question: "If I _____ a house on fire, I'd call the fire station.",
        options: [
            'sees',
            'would see',
            'saw',
            'seen',
            'see',
        ],
        rightAnswer: 2
    },
    {
        question: 'After classes I . . . .',
        options: [
            'go to the library often',
            'go often to the library',
            'the library often go to',
            'to the library go often',
            'often go to the library',
        ],
        rightAnswer: 4
    },
    {
        question: 'The fire spread through the building quickly, but fortunately everybody ___ escape.',
        options: [
            'should',
            'could',
            'succeeded to',
            'can',
            'is able to',
        ],
        rightAnswer: 1
    },
    {
        question: 'How many languages . . . your sister . . .?',
        options: [
            'are / speaking',
            'is / speak',
            'are / speak',
            'does / speak',
            'do / speak',
        ],
        rightAnswer: 3
    },
    {
        question: 'What . . . you talking about when I came in ?',
        options: [
            'were',
            'are',
            'is',
            'did',
            'was',
        ],
        rightAnswer: 0
    },
    {
        question: '… you ever … a letter to your friend in Washington. Yes, I … .',
        options: [
            'have written; written',
            'did; write',
            'have written; have',
            'did; wrote',
            'has written; wrote',
        ],
        rightAnswer: 2
    },
    {
        question: 'We had a party last night. ... spend all morning clearing up the mess.',
        options: [
            "I shouldn’t",
            "I've must",
            "I've been to",
            'I have to',
            'I had to',
        ],
        rightAnswer: 4
    },
    {
        question: 'We went to the cinema, but the film was not very good. We . . . it.',
        options: [
            'liked',
            'didn’t like',
            'doesn’t like',
            'don’t like',
            'like',
        ],
        rightAnswer: 1
    },
    {
        question: 'What foreign… are taught at the University?',
        options: [
            'words',
            'magazines',
            'languages',
            'newspapers',
            'classes',
        ],
        rightAnswer: 3
    },
    {
        question: 'My favourite subject is History. I like . . . very much.',
        options: [
            'it',
            'its',
            'her',
            'his',
            'them',
        ],
        rightAnswer: 0
    },
    {
        question: 'If they invited me to their party. I ………… absolutely delighted.',
        options: [
            'will be',
            'am',
            'would be',
            'was',
            'were',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ring me as ............... as you get home, please.',
        options: [
            'early',
            'until',
            'unless',
            'for',
            'soon',
        ],
        rightAnswer: 4
    },
    {
        question: "Rob _____ English if he hadn't gone to class.",
        options: [
            'would not have learn',
            'would not have learnt',
            'would have',
            'would not learn',
            'would learnt',
        ],
        rightAnswer: 1
    },
    {
        question: "He _____ coffee if he could, but he really can't.",
        options: [
            'would have made',
            'made',
            'will make',
            'would make',
            'makes',
        ],
        rightAnswer: 3
    },
    {
        question: 'I always arrive on time and do good work. My boss never has to worry because I’m . . . . . .',
        options: [
            'reliable',
            'creative',
            'critical',
            'impatient',
            'generous',
        ],
        rightAnswer: 0
    },
    {
        question: '"How old is she now?" "She _____ in 1905."',
        options: [
            'born',
            'was borne',
            'was born',
            'borned',
            'was burn',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which sentence is correct?',
        options: [
            "He has in Japan in 1989",
            "I've been in Japan once.",
            "He was in Japan since 1981.",
            "I've been to Japan in 1989.",
            "He's been to Japan once.",
        ],
        rightAnswer: 4
    },
    {
        question: "If you'd written earlier, I'd have known when you _____ to go on holiday.",
        options: [
            'will want',
            'wanted',
            'want',
            'would want',
            'would intend',
        ],
        rightAnswer: 1
    },
    {
        question: 'Steve . . . English since he was five years old.',
        options: [
            'is learning',
            'was been learning',
            'Learns',
            'has learned',
            'learned',
        ],
        rightAnswer: 3
    },
    {
        question: 'I’m totally fed up ............... politicians at the moment.',
        options: [
            'with',
            'in',
            'of',
            'from',
            'at',
        ],
        rightAnswer: 0
    },
    {
        question: 'A good lawyer has to remember facts. Jerry is a terrible lawyer because he’s very . . . . . .',
        options: [
            'hard-working',
            'talkative',
            'forgetful',
            'impatient',
            'creative',
        ],
        rightAnswer: 2
    },
    {
        question: 'Sarah couldn’t come to the party, ___ was a pity.',
        options: [
            'those',
            'why',
            'when',
            'this',
            'which',
        ],
        rightAnswer: 4
    },
    {
        question: 'Before they built the flats, that’s where the old garage used ... .',
        options: [
            'was',
            'to be',
            'to being',
            'has been',
            'being',
        ],
        rightAnswer: 1
    },
    {
        question: 'I rang home just as the train ... into the station.',
        options: [
            'gotten',
            'had get',
            'get',
            'was getting',
            'has got',
        ],
        rightAnswer: 3
    },
    {
        question: 'We don’t have … homework tonight.',
        options: [
            'much',
            'many',
            'anything',
            'some',
            'few',
        ],
        rightAnswer: 0
    },
    {
        question: 'I had a sandwich in the garden and then I ... back to the office.',
        options: [
            'gone',
            'was gone',
            'Went',
            'have gone',
            'had gone',
        ],
        rightAnswer: 2
    },
    {
        question: 'Excuse me! Can I help you?',
        options: [
            "No, I'm not.",
            'Yes, I do.',
            'Yes, there are',
            'No, I can’t.',
            'Yes, how can I get to the station.',
        ],
        rightAnswer: 4
    },
    {
        question: '"How many eggs have we got?" "_____"',
        options: [
            'Not so lot',
            'Not too many.',
            "They're no in the fridge.",
            "There aren't some.",
            "Not too much.",
        ],
        rightAnswer: 1
    },
    {
        question: '... is Granada like?',
        options: [
            'Do',
            'Does',
            'Who',
            'What',
            'How',
        ],
        rightAnswer: 3
    },
    {
        question: 'They would have telephoned us if they _____ lost.',
        options: [
            'had got',
            'would be got',
            'got',
            'would get',
            'would have got',
        ],
        rightAnswer: 0
    },
    {
        question: "If I _____ in your position, I'd have acted differently.",
        options: [
            'am',
            'shall have been',
            'had been',
            'should have been',
            'were',
        ],
        rightAnswer: 2
    },
    {
        question: 'John _____ this film 2 months ago.',
        options: [
            'sees',
            'has seen',
            'have seen',
            'was seeing',
            'saw',
        ],
        rightAnswer: 4
    },
    {
        question: '"When did you last speak English?" "I _____ English since I was at school."',
        options: [
            "speaks",
            "haven't spoken",
            "don't speak",
            "didn't speak",
            "wasn't speaking",
        ],
        rightAnswer: 1
    },
    {
        question: 'My brother . . . not speak English last year, and now he can.',
        options: [
            'can',
            'must',
            'may',
            'could',
            'should',
        ],
        rightAnswer: 3
    },
    {
        question: 'Steve ............... chips at the moment because he’s on a diet.',
        options: [
            'isn’t eating',
            'is eating',
            'eats',
            'don’t eat',
            'doesn’t eat',
        ],
        rightAnswer: 0
    },
    {
        question: 'Do you have . . . books on world history?',
        options: [
            'something',
            'anything',
            'any',
            'nothing',
            'some',
        ],
        rightAnswer: 2
    },
    {
        question: '... to live in France?',
        options: [
            'Was you used',
            'Do you use',
            'Have you used',
            'Were you used',
            'Did you use',
        ],
        rightAnswer: 4
    },
    {
        question: "The family lost their money on roulette so they're unable to buy _____.",
        options: [
            'something',
            'anything',
            'everything',
            'nothing',
            'any',
        ],
        rightAnswer: 1
    },
    {
        question: 'The … skyscraper in the world is in Chicago',
        options: [
            'tallest',
            'the most tallest',
            'more tallest',
            'the tallest',
            'taller',
        ],
        rightAnswer: 3
    },
    {
        question: "Even if I _____ the money, I wouldn't have given him any.",
        options: [
            'had had',
            'have had',
            'would have',
            'have',
            'had',
        ],
        rightAnswer: 0
    },
    {
        question: 'Is it still raining? No, it . . . already .',
        options: [
            'has been stopped',
            'have stopped',
            'has stopped',
            'was stopped',
            'is stopped',
        ],
        rightAnswer: 2
    },
    {
        question: 'I’m not very good ............ dancing.',
        options: [
            'by',
            'for',
            'in',
            'about',
            'at',
        ],
        rightAnswer: 4
    },
    {
        question: '"Can you lend me a pound?" "_____"',
        options: [
            "No, sadly.",
            "I'm afraid not.",
            "I afraid no.",
            "Not, sorry.",
            "I am afraid",
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
        msgofScore();
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

function msgofScore() {
    if(score == 0 || score == 1)  {
        msgOfResult.innerHTML = 'Bastard';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'Abomination';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Sentimantal fool';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'Dead inside';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'just good';
     } else {
        msgOfResult.innerHTML = 'Lit';
     }
}




const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    coratten();
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