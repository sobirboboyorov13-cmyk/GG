import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    questionNumber: 1,
    questionText: {
      en: "You are given a complex problem you have never seen before. What do you naturally do first?",
      uz: "Sizga ilgari hech qachon duch kelmagan murakkab muammo berildi. Odatda birinchi nima qilasiz?",
      ru: "Вам дали сложную проблему, с которой вы никогда раньше не сталкивались. Что вы обычно делаете первым делом?"
    },
    contextNote: {
      en: "Measures fundamental problem-solving orientation and cognitive instinct.",
      uz: "Muammolarni hal qilish uslubi va dastlabki fikrlash yo'nalishini aniqlaydi.",
      ru: "Определяет стиль решения задач и когнитивный подход."
    },
    dimensionTags: ['analytical_thinking', 'problem_solving', 'creativity', 'action_orientation'],
    options: [
      {
        id: 'q1_a',
        text: {
          en: "Break it down into logical pieces, mathematical rules, or underlying mechanics.",
          uz: "Uni mantiqiy bo'laklarga, matematik qoidalarga yoki tub mexanizmlarga ajrataman.",
          ru: "Разбираю на логические части, математические правила или базовые механизмы."
        },
        dimensionWeights: { analytical_thinking: 25, logic: 20, technology_interest: 15 }
      },
      {
        id: 'q1_b',
        text: {
          en: "Brainstorm unconventional ideas, sketch visual concepts, and experiment with alternatives.",
          uz: "Noodatiy g'oyalarni o'ylab topaman, vizual eskizlar chizaman va turli variantlarni sinab ko'raman.",
          ru: "Придумываю нестандартные идеи, делаю наброски и экспериментирую с альтернативами."
        },
        dimensionWeights: { creativity: 25, design_interest: 20, innovation: 15 }
      },
      {
        id: 'q1_c',
        text: {
          en: "Talk to people involved, understand who is affected, and find a collaborative human solution.",
          uz: "Ishtirokchilar bilan gaplashaman, bu kimga qanday ta'sir qilishini tushunaman va jamoaviy yechim izlayman.",
          ru: "Общаюсь с людьми, выясняю, на кого это влияет, и ищу совместное человеческое решение."
        },
        dimensionWeights: { communication: 25, people_helping: 20, leadership: 15 }
      },
      {
        id: 'q1_d',
        text: {
          en: "Immediately start building or testing a quick prototype to see what breaks first.",
          uz: "Nima ishlamasligini tezda bilish uchun darhol amaliy prototip yasash yoki sinashni boshlayman.",
          ru: "Сразу начинаю собирать или тестировать быстрый прототип, чтобы увидеть, что сломается первым."
        },
        dimensionWeights: { engineering: 25, action_orientation: 20, risk_tolerance: 15 }
      }
    ]
  },
  {
    id: 'q2',
    questionNumber: 2,
    questionText: {
      en: "You have a completely free weekend to explore any project. Which one sounds most energizing?",
      uz: "Sizda mutlaqo bo'sh dam olish kuni bor. Quyidagilardan qaysi biri sizga eng ko'p ilhom beradi?",
      ru: "У вас полностью свободные выходные для любого проекта. Какой из них вас больше всего вдохновляет?"
    },
    contextNote: {
      en: "Evaluates intrinsic motivation and natural domain curiosity.",
      uz: "Ichki motivatsiya va qiziqish sohasini aniqlaydi.",
      ru: "Оценивает внутреннюю мотивацию и естественную любознательность."
    },
    dimensionTags: ['technology_interest', 'business_interest', 'design_interest', 'science_interest'],
    options: [
      {
        id: 'q2_a',
        text: {
          en: "Coding a personal web app, game, automation script, or AI assistant from scratch.",
          uz: "Noldan shaxsiy veb-ilova, o'yin, avtomatlashtirish skripti yoki sun'iy intellekt botini yozish.",
          ru: "Написание с нуля веб-приложения, игры, скрипта автоматизации или AI-помощника."
        },
        dimensionWeights: { technology_interest: 25, analytical_thinking: 15, software_aptitude: 25 }
      },
      {
        id: 'q2_b',
        text: {
          en: "Analyzing financial trends, developing a startup business model, or pitching a product concept.",
          uz: "Moliyaviy tendensiyalarni tahlil qilish, startap biznes-modelini tuzish yoki mahsulot g'oyasini taqdim etish.",
          ru: "Анализ финансовых трендов, разработка бизнес-модели стартапа или питч концепта продукта."
        },
        dimensionWeights: { business_interest: 25, leadership: 20, strategic_thinking: 15 }
      },
      {
        id: 'q2_c',
        text: {
          en: "Designing a stunning user interface, 3D render, animation, or multimedia brand story.",
          uz: "Ajoyib foydalanuvchi interfeysi, 3D vizualizatsiya, animatsiya yoki brend dizaynini yaratish.",
          ru: "Создание красивого пользовательского интерфейса, 3D-рендера, анимации или дизайн-системы бренда."
        },
        dimensionWeights: { design_interest: 25, creativity: 25, visual_arts: 20 }
      },
      {
        id: 'q2_d',
        text: {
          en: "Tinkering with hardware microcontrollers, electronics, mechanics, or biology experiments.",
          uz: "Mikrokontrollerlar, elektronika, mexanik qismlar yoki biologik tajribalar bilan amaliy ishlash.",
          ru: "Работа с микроконтроллерами, электроникой, механикой или научными экспериментами."
        },
        dimensionWeights: { engineering: 25, science_interest: 25, hardware_aptitude: 20 }
      }
    ]
  },
  {
    id: 'q3',
    questionNumber: 3,
    questionText: {
      en: "When working in a school or hackathon team, what role do you naturally gravitate toward?",
      uz: "Maktab yoki xakaton jamoasida ishlaganda, tabiiy ravishda qaysi rolni o'z zimmangizga olasiz?",
      ru: "Работая в команде в школе или на хакатоне, какую роль вы естественно выбираете?"
    },
    contextNote: {
      en: "Evaluates team dynamics, collaboration preference, and leadership style.",
      uz: "Jamoada ishlash va yetakchilik uslubini aniqlaydi.",
      ru: "Оценивает динамику работы в команде и стиль лидерства."
    },
    dimensionTags: ['leadership', 'teamwork', 'technical_execution', 'communication'],
    options: [
      {
        id: 'q3_a',
        text: {
          en: "The Architect / Builder: Writing core logic, structuring technical foundation, and fixing tough bugs.",
          uz: "Arxitektor / Dasturchi: Asosiy mantiqni yozish, texnik poydevor qurish va qiyin xatolarni tuzatish.",
          ru: "Архитектор / Разработчик: Написание основной логики, построение фундамента и исправление багов."
        },
        dimensionWeights: { technical_execution: 25, analytical_thinking: 20, software_aptitude: 15 }
      },
      {
        id: 'q3_b',
        text: {
          en: "The Product Lead / Captain: Setting priorities, managing timeline, and pitching the final demo.",
          uz: "Mahsulot yetakchisi / Sardor: Vazifalarni taqsimlash, vaqtni boshqarish va loyihani hakamlarga taqdim etish.",
          ru: "Лидер продукта / Капитан: Расстановка приоритетов, тайм-менеджмент и финальная презентация."
        },
        dimensionWeights: { leadership: 25, business_interest: 20, communication: 20 }
      },
      {
        id: 'q3_c',
        text: {
          en: "The Experience Designer: Making sure everything looks polished, feels intuitive, and delights users.",
          uz: "Dizayner: Hamma narsa chiroyli, tushunarli va foydalanuvchiga yoqadigan bo'lishini ta'minlash.",
          ru: "Дизайнер опыта: Обеспечение удобства, интуитивности и эстетичности продукта для пользователей."
        },
        dimensionWeights: { design_interest: 25, creativity: 20, empathy: 15 }
      },
      {
        id: 'q3_d',
        text: {
          en: "The Data / Research Specialist: Finding facts, verifying feasibility, and structuring evidence.",
          uz: "Ma'lumotlar va tadqiqot mutaxassisi: Aniq dalillarni topish, hisob-kitob qilish va natijalarni tekshirish.",
          ru: "Специалист по данным и исследованиям: Поиск фактов, проверка осуществимости и анализ цифр."
        },
        dimensionWeights: { research_aptitude: 25, analytical_thinking: 20, science_interest: 15 }
      }
    ]
  },
  {
    id: 'q4',
    questionNumber: 4,
    questionText: {
      en: "How do you feel about learning mathematics and quantitative reasoning?",
      uz: "Matematika va miqdoriy mantiqni o'rganishga munosabatingiz qanday?",
      ru: "Как вы относитесь к изучению математики и количественного мышления?"
    },
    contextNote: {
      en: "Determines comfort with STEM foundations, algorithms, and financial modeling.",
      uz: "Matematik va analitik chuqurlik darajasini baholaydi.",
      ru: "Определяет предрасположенность к строгой математике и алгоритмам."
    },
    dimensionTags: ['analytical_thinking', 'logic', 'math_comfort'],
    options: [
      {
        id: 'q4_a',
        text: {
          en: "I love it when formulas click and reveal elegant patterns behind real-world systems.",
          uz: "Formulalar haqiqiy dunyo tizimlari ortidagi go'zal qonuniyatlarni ochib berishini juda yaxshi ko'raman.",
          ru: "Мне очень нравится, когда формулы открывают изящные закономерности реального мира."
        },
        dimensionWeights: { analytical_thinking: 30, logic: 25, math_comfort: 30 }
      },
      {
        id: 'q4_b',
        text: {
          en: "I appreciate math as a practical tool for building algorithms, money calculations, or coding.",
          uz: "Matematikani dasturlash, algoritm tuzish yoki moliyaviy hisob-kitoblar uchun amaliy vosita sifatida qadrlayman.",
          ru: "Ценю математику как практический инструмент для создания алгоритмов, расчетов или кода."
        },
        dimensionWeights: { analytical_thinking: 15, software_aptitude: 15, business_interest: 15 }
      },
      {
        id: 'q4_c',
        text: {
          en: "I can handle it when necessary, but I prefer visual, verbal, or human-oriented topics.",
          uz: "Zarur bo'lsa bajara olaman, lekin vizual, ijodiy yoki insoniy mavzularni ko'proq yoqtiraman.",
          ru: "Справлюсь, если нужно, но предпочитаю визуальные, вербальные или гуманитарные темы."
        },
        dimensionWeights: { design_interest: 15, communication: 15, creativity: 15 }
      },
      {
        id: 'q4_d',
        text: {
          en: "I find abstract formulas tedious unless connected directly to building physical machines.",
          uz: "Mavhum formulalarni zerikarli deb bilaman, agar ular to'g'ridan-to'g'ri real mexanizmlarga bog'lanmasa.",
          ru: "Считаю абстрактные формулы скучными, если они не связаны напрямую с созданием физических машин."
        },
        dimensionWeights: { engineering: 20, action_orientation: 20 }
      }
    ]
  },
  {
    id: 'q5',
    questionNumber: 5,
    questionText: {
      en: "You discover a brand new technology or AI tool you have never used. What is your immediate reaction?",
      uz: "Ilgari hech qachon ishlatmagan yangi texnologiya yoki sun'iy intellekt vositasini ko'rib qoldingiz. Birinchi munosabatingiz?",
      ru: "Вы увидели новую технологию или AI-инструмент, которым никогда не пользовались. Ваша первая реакция?"
    },
    contextNote: {
      en: "Measures technological adaptability and deep curiosity toward digital innovation.",
      uz: "Texnologik moslashuvchanlik va yangiliklarga qiziqishni o'lchaydi.",
      ru: "Определяет технологическую гибкость и интерес к цифровым инновациям."
    },
    dimensionTags: ['technology_interest', 'innovation', 'learning_style'],
    options: [
      {
        id: 'q5_a',
        text: {
          en: "Inspect how it works under the hood, read the documentation, and test its limitations.",
          uz: "U qanday ishlashini ichidan o'rganaman, hujjatlarini (documentation) o'qiyman va chegaralarini sinayman.",
          ru: "Смотрю, как это устроено под капотом, читаю документацию и тестирую границы возможностей."
        },
        dimensionWeights: { technology_interest: 30, software_aptitude: 25, analytical_thinking: 20 }
      },
      {
        id: 'q5_b',
        text: {
          en: "Think about what real business problem it solves and how to create value with it.",
          uz: "U qanday real biznes muammosini hal qilishi va uning yordamida qanday qiymat yaratish mumkinligini o'ylayman.",
          ru: "Думаю о том, какую реальную бизнес-проблему это решает и какую выгоду может принести."
        },
        dimensionWeights: { business_interest: 25, strategic_thinking: 20, leadership: 15 }
      },
      {
        id: 'q5_c',
        text: {
          en: "Look at the user experience, interface responsiveness, and how it simplifies human life.",
          uz: "Foydalanuvchi tajribasiga, interfeys qulayligiga va odamlar hayotini qanday osonlashtirishiga qarayman.",
          ru: "Оцениваю удобство интерфейса, дизайн и то, как это упрощает жизнь обычным людям."
        },
        dimensionWeights: { design_interest: 25, empathy: 20, creativity: 15 }
      },
      {
        id: 'q5_d',
        text: {
          en: "Consider the ethical, security, and privacy implications of the technology.",
          uz: "Texnologiyaning xavfsizlik, shaxsiy ma'lumotlar maxfiyligi va axloqiy oqibatlarini tahlil qilaman.",
          ru: "Размышляю об этических рисках, безопасности данных и защите систем."
        },
        dimensionWeights: { cybersecurity_aptitude: 30, critical_thinking: 20, analytical_thinking: 15 }
      }
    ]
  },
  {
    id: 'q6',
    questionNumber: 6,
    questionText: {
      en: "What type of daily work environment do you imagine yourself thriving in most?",
      uz: "O'zingizni eng samarali va baxtli his qiladigan ish muhiti qanday?",
      ru: "В какой рабочей обстановке вы чувствуете себя наиболее продуктивно и комфортно?"
    },
    contextNote: {
      en: "Evaluates physical workspace, autonomy, and pace preferences.",
      uz: "Ish joyi, mustaqillik va ish sur'atini afzal ko'rish darajasini o'lchaydi.",
      ru: "Оценивает предпочтения по атмосфере, самостоятельности и темпу работы."
    },
    dimensionTags: ['work_environment', 'independence', 'social_preference'],
    options: [
      {
        id: 'q6_a',
        text: {
          en: "Deep focused environment with high autonomy, dual monitors, headphones, and minimal interruptions.",
          uz: "Yuqori mustaqillik, katta monitorlar, quloqchinlar va chuqur e'tibor talab qiladigan tinch muhit.",
          ru: "Глубокая концентрация, высокая автономия, наушники, пара мониторов и минимум отвлечений."
        },
        dimensionWeights: { independence: 25, software_aptitude: 20, analytical_thinking: 15 }
      },
      {
        id: 'q6_b',
        text: {
          en: "Fast-paced, dynamic collaborative office with brainstorm whiteboards, product sprints, and pitches.",
          uz: "Tezkor, dinamik jamoaviy ofis: doimiy muhokamalar, taqdimotlar va strategik uchrashuvlar.",
          ru: "Динамичный современный офис: брейнштормы у доски, спринты, питчи и командный драйв."
        },
        dimensionWeights: { leadership: 20, teamwork: 25, business_interest: 20 }
      },
      {
        id: 'q6_c',
        text: {
          en: "Hands-on engineering lab or workshop with soldering stations, 3D printers, and test benches.",
          uz: "Amaliy muhandislik laboratoriyasi: 3D-printerlar, lehimlash stansiyalari va sinov uskunalari.",
          ru: "Инженерная лаборатория или мастерская: 3D-принтеры, паяльные станции и тестовые стенды."
        },
        dimensionWeights: { engineering: 30, hardware_aptitude: 25, science_interest: 15 }
      },
      {
        id: 'q6_d',
        text: {
          en: "Flexible global remote setup allowing work with international teams from anywhere.",
          uz: "Dunyoning istalgan nuqtasidan xalqaro jamoalar bilan ishlash imkonini beruvchi erkin masofaviy format.",
          ru: "Гибкий международный удаленный формат с возможностью работать с глобальными командами."
        },
        dimensionWeights: { independence: 25, technology_interest: 20, global_outlook: 25 }
      }
    ]
  },
  {
    id: 'q7',
    questionNumber: 7,
    questionText: {
      en: "Which of the following long-term outcomes would make you feel most proud in your career?",
      uz: "Kelajakda qaysi natijaga erishish sizni eng ko'p faxrlantiradi?",
      ru: "Какое долгосрочное достижение принесет вам наибольшую гордость в карьере?"
    },
    contextNote: {
      en: "Identifies core vocational values and driving purpose.",
      uz: "Asosiy kasbiy qadriyatlar va hayotiy maqsadni aniqlaydi.",
      ru: "Определяет фундаментальные ценности и главную мотивацию."
    },
    dimensionTags: ['values', 'long_term_goals', 'impact'],
    options: [
      {
        id: 'q7_a',
        text: {
          en: "Building a software product or system used seamlessly by millions of people every single day.",
          uz: "Har kuni millionlab odamlar foydalanadigan dasturiy mahsulot yoki tizimni yaratish.",
          ru: "Создание программного продукта или системы, которой ежедневно пользуются миллионы людей."
        },
        dimensionWeights: { software_aptitude: 25, technology_interest: 25, innovation: 20 }
      },
      {
        id: 'q7_b',
        text: {
          en: "Founding an impactful technology company, creating high-value jobs, and leading global operations.",
          uz: "Katta ta'sirga ega texnologik kompaniya ochish, yangi ish o'rinlari yaratish va global biznesni boshqarish.",
          ru: "Основание технологической компании, создание рабочих мест и руководство международным бизнесом."
        },
        dimensionWeights: { leadership: 25, business_interest: 30, strategic_thinking: 20 }
      },
      {
        id: 'q7_c',
        text: {
          en: "Designing iconic digital products, interfaces, or experiences that set international design standards.",
          uz: "Xalqaro dizayn standartlarini belgilab beruvchi ajoyib interfeyslar va raqamli mahsulotlar yaratish.",
          ru: "Создание знаковых цифровых продуктов и интерфейсов, задающих мировые стандарты дизайна."
        },
        dimensionWeights: { design_interest: 30, creativity: 25, visual_arts: 20 }
      },
      {
        id: 'q7_d',
        text: {
          en: "Inventing an intelligent autonomous robot, clean technology, or biomedical breakthrough.",
          uz: "Aqlli avtonom robot, ekologik toza texnologiya yoki biotibbiyot kashfiyotini ixtiro qilish.",
          ru: "Изобретение автономного робота, чистых технологий или прорывного биомедицинского решения."
        },
        dimensionWeights: { engineering: 25, science_interest: 30, innovation: 20 }
      }
    ]
  },
  {
    id: 'q8',
    questionNumber: 8,
    questionText: {
      en: "When studying or preparing for an exam, which learning method works best for you?",
      uz: "Imtihonga tayyorlanayotganda yoki yangi mavzuni o'rganayotganda qaysi usul sizga eng yaxshi samara beradi?",
      ru: "Когда вы готовитесь к экзамену или изучаете тему, какой метод работает лучше всего?"
    },
    contextNote: {
      en: "Assesses learning preferences and study habit structure.",
      uz: "O'rganish uslubi va bilim olish odatlarini aniqlaydi.",
      ru: "Определяет предпочтительный стиль обучения."
    },
    dimensionTags: ['learning_style', 'discipline', 'curiosity'],
    options: [
      {
        id: 'q8_a',
        text: {
          en: "Building a small interactive project or solving practice coding/math challenges repeatedly.",
          uz: "Kichik amaliy loyiha yaratish yoki amaliy masalalar va dasturlash mashqlarini qayta-qayta yechish.",
          ru: "Создание небольшого проекта или многократное решение практических задач по коду/математике."
        },
        dimensionWeights: { software_aptitude: 20, analytical_thinking: 20, action_orientation: 15 }
      },
      {
        id: 'q8_b',
        text: {
          en: "Synthesizing the big picture, drawing concept maps, and explaining it simply to a friend.",
          uz: "Umumiy tushunchalarni umumlashtirish, sxemalar chizish va buni do'stimga sodda tilda tushuntirib berish.",
          ru: "Сведение темы в общую картину, рисование схем и объяснение сути простыми словами другу."
        },
        dimensionWeights: { communication: 20, strategic_thinking: 20, creativity: 15 }
      },
      {
        id: 'q8_c',
        text: {
          en: "Reading official documentation, scientific papers, and taking detailed structured notes.",
          uz: "Rasmiy hujjatlar, ilmiy maqolalarni o'qish va tartibli batafsil konspektlar yozish.",
          ru: "Чтение официальной документации, научных статей и ведение структурированных заметок."
        },
        dimensionWeights: { research_aptitude: 25, analytical_thinking: 15, discipline: 20 }
      },
      {
        id: 'q8_d',
        text: {
          en: "Watching video breakdowns, inspecting visual diagrams, and prototyping visual mockups.",
          uz: "Video tahlillarni ko'rish, vizual diagrammalarni o'rganish va vizual maketlar yasab ko'rish.",
          ru: "Просмотр видеоразборов, изучение наглядных диаграмм и создание визуальных макетов."
        },
        dimensionWeights: { design_interest: 20, visual_arts: 20, creativity: 15 }
      }
    ]
  }
];
