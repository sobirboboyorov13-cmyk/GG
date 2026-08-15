import { University } from '../types';

export const UNIVERSITIES_DATABASE: University[] = [
  // ==========================================
  // 🇺🇿 UZBEKISTAN UNIVERSITIES
  // ==========================================
  {
    id: 'inha-tashkent',
    name: 'INHA University in Tashkent',
    shortName: 'IUT',
    type: 'uzbekistan',
    country: 'Uzbekistan',
    city: 'Tashkent',
    flagEmoji: '🇺🇿',
    rankingNote: 'Top international IT university in Uzbekistan, operating in partnership with Inha University (South Korea).',
    about: 'Established in 2014, Inha University in Tashkent provides South Korean standard higher education in computer engineering, business, and logistics in Uzbekistan. Instruction is 100% in English with dual degree and academic exchange opportunities.',
    campusInfo: 'Modern campus located in Mirzo Ulugbek district, Tashkent. Equipped with high-tech computer labs, digital library, innovation centers, and sports complex.',
    tuitionOverviewUsd: '$3,200 - $3,800 per academic year (payable in UZS at Central Bank rate)',
    scholarshipInfo: 'State grants covering 100% of tuition available for top entrance exam scorers. Founder scholarships and corporate sponsor grants awarded annually.',
    internationalStudentsPolicy: 'Welcomes international applicants with English proficiency certification and secondary education diploma equivalence.',
    programs: [
      {
        id: 'iut-socie-cse',
        name: 'Computer Science and Software Engineering (SOCIE)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst'],
        estimatedAnnualTuitionUsd: 3500,
        scholarshipEligible: true,
        keySubjects: ['Algorithms & Data Structures', 'Object-Oriented Programming', 'Database Systems', 'Operating Systems', 'Calculus']
      },
      {
        id: 'iut-sbl-itb',
        name: 'Business and Logistics / Information Technology in Business',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['product-manager', 'fintech-financial-analyst'],
        estimatedAnnualTuitionUsd: 3300,
        scholarshipEligible: true,
        keySubjects: ['Principles of Management', 'Financial Accounting', 'Business Analytics', 'E-Commerce Systems']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Secondary school completion (Attestat / Lyceum Diploma) with strong grades in Mathematics and Physics.',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '5.5 (overall)',
          recommendedScore: '6.0+'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '71'
        }
      ],
      standardizedTests: [
        {
          test: 'University Internal Exam',
          details: 'Written mathematics entrance exam administered directly by Inha University (South Korea) professors.'
        }
      ],
      requiredHighSchoolSubjects: ['Mathematics (Algebra & Geometry)', 'Physics', 'English Language'],
      requiredDocuments: [
        'High School Diploma (Attestat) or Certificate of Lyceum/College completion',
        'Official IELTS or TOEFL certificate',
        'Passport copy (original for verification)',
        '3x4 photo (digital and physical)',
        'Online registration via admissions portal'
      ],
      applicationDeadlines: [
        { round: 'Early Admission', date: 'Late March - Early May' },
        { round: 'Regular Admission', date: 'June - July' }
      ],
      applicationProcessSummary: [
        '1. Submit online registration on admissions.inha.uz.',
        '2. Upload valid IELTS/TOEFL score certificate and academic transcript.',
        '3. Sit for the South Korean written Mathematics entrance examination in Tashkent.',
        '4. Results announcement and contract/grant distribution.'
      ]
    },
    careerOutcomes: 'Graduates work in top tech companies in Uzbekistan (Uzum, Payme, Click, IT Park), South Korea, Europe, and US tech firms.',
    officialWebsite: 'https://inha.uz',
    socialLinks: [
      { platform: 'telegram', url: 'https://t.me/Inha_Tashkent' },
      { platform: 'instagram', url: 'https://instagram.com/inha_tashkent' },
      { platform: 'facebook', url: 'https://facebook.com/inha.uz' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/inha-university-in-tashkent' }
    ],
    contactEmail: 'admissions@inha.uz',
    lastVerified: '2025-06-15',
    featuredForCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst', 'product-manager']
  },
  {
    id: 'new-uzbekistan-university',
    name: 'New Uzbekistan University',
    shortName: 'NUU / Yangi Oʻzbekiston',
    type: 'uzbekistan',
    country: 'Uzbekistan',
    city: 'Tashkent',
    flagEmoji: '🇺🇿',
    rankingNote: 'Presidential flagship research university established in collaboration with Massachusetts Institute of Technology (MIT) and TUM.',
    about: 'Founded in 2021 by the Agency for Presidential Educational Institutions, New Uzbekistan University is a state-of-the-art institution offering STEM, engineering, and economics education with curriculum designed in consultation with MIT Abdul Latif Jameel World Education Lab and TU Munich.',
    campusInfo: 'Hyper-modern campus in Tashkent featuring cutting-edge clean-room research laboratories, fab labs, advanced robotic testing facilities, and international faculty.',
    tuitionOverviewUsd: '$3,500 - $4,200 per academic year (state grants available for top students)',
    scholarshipInfo: 'El-Yurt Umidi and Presidential grants provide up to 100% full-ride tuition coverage for eligible high-scoring students.',
    internationalStudentsPolicy: 'Admissions open to international applicants with verified high school transcripts and international test scores.',
    programs: [
      {
        id: 'nuu-software-ai',
        name: 'Computer Science and Artificial Intelligence',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst'],
        estimatedAnnualTuitionUsd: 4000,
        scholarshipEligible: true,
        keySubjects: ['Discrete Mathematics', 'Deep Learning & Neural Networks', 'Distributed Systems', 'Algorithms & Complexity']
      },
      {
        id: 'nuu-robotics-mechatronics',
        name: 'Mechanical & Mechatronics Engineering',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['robotics-automation-engineer'],
        estimatedAnnualTuitionUsd: 4000,
        scholarshipEligible: true,
        keySubjects: ['Control Systems', 'Robotics Kinematics', 'Embedded Microcontrollers', 'Fluid Mechanics', 'CAD/CAM']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Top 10% high school academic record with distinction in STEM subjects.',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '6.0 (overall)',
          recommendedScore: '6.5+'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '78'
        }
      ],
      standardizedTests: [
        {
          test: 'SAT',
          details: 'SAT Mathematics score 650+ strongly recommended or passing the University entrance examination.'
        },
        {
          test: 'University Internal Exam',
          details: 'Internal examination in Mathematics and Critical Thinking prepared by international board.'
        }
      ],
      requiredHighSchoolSubjects: ['Advanced Mathematics', 'Physics', 'Informatics', 'English'],
      requiredDocuments: [
        'Secondary School Certificate / Lyceum Diploma',
        'Official IELTS / TOEFL certificate',
        'SAT score report (if applicable)',
        'Motivational Letter / Personal Statement in English',
        'Recommendation letter from STEM teacher'
      ],
      applicationDeadlines: [
        { round: 'Early Round', date: 'April - May' },
        { round: 'General Round', date: 'June - July' }
      ],
      applicationProcessSummary: [
        '1. Online registration at newuu.uz application portal.',
        '2. Document verification and portfolio screening.',
        '3. Cambridge Assessment / internal math and critical thinking examination.',
        '4. Faculty interview for shortlisted candidates.'
      ]
    },
    careerOutcomes: 'Direct pipelines to international master’s programs, leading engineering laboratories, and multinational tech firms.',
    officialWebsite: 'https://newuu.uz',
    socialLinks: [
      { platform: 'telegram', url: 'https://t.me/newuzbekistanuniversity' },
      { platform: 'instagram', url: 'https://instagram.com/newuzbekistanuniversity' },
      { platform: 'facebook', url: 'https://facebook.com/newuzbekistanuniversity' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/new-uzbekistan-university' }
    ],
    contactEmail: 'info@newuu.uz',
    lastVerified: '2025-06-20',
    featuredForCareers: ['software-engineer', 'data-scientist-ai', 'robotics-automation-engineer']
  },
  {
    id: 'wiut-tashkent',
    name: 'Westminster International University in Tashkent',
    shortName: 'WIUT',
    type: 'uzbekistan',
    country: 'Uzbekistan',
    city: 'Tashkent',
    flagEmoji: '🇺🇿',
    rankingNote: 'First international British-accredited university in Central Asia (partner of University of Westminster, London).',
    about: 'Established in 2002, WIUT delivers British higher education diplomas validated by the University of Westminster (UK). It is renowned for its rigorous business, finance, economics, commercial law, and business information systems programs.',
    campusInfo: 'Historic, beautifully restored urban campus in central Tashkent equipped with modern lecture theatres, mock courtroom, Bloomberg terminal access, and student union.',
    tuitionOverviewUsd: '$3,100 - $3,600 per academic year (in UZS)',
    scholarshipInfo: 'Ministry of Higher Education state-funded grants (approx. 30 full scholarships per year) and academic merit discounts.',
    internationalStudentsPolicy: 'Welcomes international students from Central Asia, Russia, and beyond with equivalent secondary qualifications.',
    programs: [
      {
        id: 'wiut-bis',
        name: 'Business Information Systems (BSc Hons)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['product-manager', 'software-engineer', 'product-designer-uiux'],
        estimatedAnnualTuitionUsd: 3400,
        scholarshipEligible: true,
        keySubjects: ['Database Design', 'Software Development', 'Business Analysis', 'Information Systems Management']
      },
      {
        id: 'wiut-finance-econ',
        name: 'Finance with Economics (BSc Hons)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['fintech-financial-analyst', 'product-manager'],
        estimatedAnnualTuitionUsd: 3400,
        scholarshipEligible: true,
        keySubjects: ['Financial Management', 'Microeconomics', 'Econometrics', 'Investment Analysis']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Good secondary school grades and satisfactory performance in Westminster Mathematics entrance test.',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '5.5 (with minimum 5.0 in writing for Foundation) / 6.0 for direct Year 1',
          recommendedScore: '6.5'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '72'
        }
      ],
      standardizedTests: [
        {
          test: 'University Internal Exam',
          details: 'WIUT Mathematics Entrance Examination (paper-based / digital).'
        }
      ],
      requiredHighSchoolSubjects: ['Mathematics', 'English Language', 'Economics / Social Studies'],
      requiredDocuments: [
        'Secondary Education Attestat / Diploma',
        'Valid IELTS or TOEFL certificate',
        'Passport copy',
        'Online admission portal application form'
      ],
      applicationDeadlines: [
        { round: 'Paper Stage 1', date: 'April' },
        { round: 'Paper Stage 2', date: 'June' },
        { round: 'Final Intake', date: 'July' }
      ],
      applicationProcessSummary: [
        '1. Register online at admission.wiut.uz.',
        '2. Submit valid IELTS/TOEFL certificate meeting the minimum requirement.',
        '3. Pass the WIUT Mathematics examination.',
        '4. Receive offer letter from University of Westminster (London).'
      ]
    },
    careerOutcomes: 'Alumni hold prominent leadership positions in big-4 audit firms (PwC, EY, KPMG, Deloitte), banking, and government ministries.',
    officialWebsite: 'https://wiut.uz',
    socialLinks: [
      { platform: 'telegram', url: 'https://t.me/wiutuni' },
      { platform: 'instagram', url: 'https://instagram.com/wiutuni' },
      { platform: 'facebook', url: 'https://facebook.com/wiut.uz' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/westminster-international-university-in-tashkent' }
    ],
    contactEmail: 'admission@wiut.uz',
    lastVerified: '2025-06-10',
    featuredForCareers: ['product-manager', 'fintech-financial-analyst', 'software-engineer']
  },
  {
    id: 'tuit-tashkent',
    name: 'Tashkent University of Information Technologies (TUIT)',
    shortName: 'TATU / TUIT',
    type: 'uzbekistan',
    country: 'Uzbekistan',
    city: 'Tashkent',
    flagEmoji: '🇺🇿',
    rankingNote: 'The national foundation university for telecommunications and computer engineering in Uzbekistan (Muhammad al-Xorazmiy).',
    about: 'TUIT is the historical core of computer science and telecommunication engineering in Uzbekistan. It has regional branches in Samarkand, Fergana, Karshi, Urgench, and Nukus, offering extensive bachelor and master programs in software engineering, cybersecurity, and telecommunication networks.',
    campusInfo: 'Expansive educational campus with dedicated faculties for Software Engineering, Cyber Security, Artificial Intelligence, and Telecoms.',
    tuitionOverviewUsd: '$800 - $1,500 per academic year (state budget grants available for over 1,500 students)',
    scholarshipInfo: 'Extensive state grants awarded based on national DTM (Uzbek Bilimni Baholash Agentligi) entrance scores.',
    internationalStudentsPolicy: 'Accepts foreign students from CIS and Asian countries through interview and transcript evaluation.',
    programs: [
      {
        id: 'tuit-cyber-sec',
        name: 'Cybersecurity Engineering & Information Protection',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['Uzbek', 'Russian', 'English'],
        targetCareers: ['cybersecurity-analyst', 'software-engineer'],
        estimatedAnnualTuitionUsd: 1200,
        scholarshipEligible: true,
        keySubjects: ['Network Security', 'Cryptography', 'Operating System Architecture', 'Malware Analysis']
      },
      {
        id: 'tuit-ai-software',
        name: 'Artificial Intelligence & Software Engineering',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['Uzbek', 'Russian', 'English'],
        targetCareers: ['software-engineer', 'data-scientist-ai'],
        estimatedAnnualTuitionUsd: 1200,
        scholarshipEligible: true,
        keySubjects: ['Algorithms & Data Structures', 'Applied AI', 'Database Management', 'Computer Architecture']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Secondary school completion (Attestat).',
      languageRequirements: [
        {
          test: 'English Medium of Instruction',
          minimumScore: 'B1 / B2 or CEFR certificate (provides bonus points on national DTM)'
        }
      ],
      standardizedTests: [
        {
          test: 'National Entrance Exam (DTM/Uzbek)',
          details: 'Mandatory national testing in Mathematics, Physics/Informatics, and Native Language.'
        }
      ],
      requiredHighSchoolSubjects: ['Mathematics', 'Physics', 'Informatics', 'Native Language'],
      requiredDocuments: [
        'Attestat (Secondary School Diploma)',
        'Passport / ID card (my.uzbmb.uz registration)',
        'National test score sheet'
      ],
      applicationDeadlines: [
        { round: 'National DTM Registration', date: 'June 20 - July 20' }
      ],
      applicationProcessSummary: [
        '1. Register on the official my.uzbmb.uz testing portal.',
        '2. Select TUIT and preferred faculties in priority order.',
        '3. Take the national testing examinations.',
        '4. Enrollment based on nationwide quota score mandate.'
      ]
    },
    careerOutcomes: 'Critical supplier of IT engineers for state ministries, national telecommunications (Uztelecom, Beeline), and local software firms.',
    officialWebsite: 'https://tuit.uz',
    socialLinks: [
      { platform: 'telegram', url: 'https://t.me/tuituz_official' },
      { platform: 'instagram', url: 'https://instagram.com/tuit.official' },
      { platform: 'facebook', url: 'https://facebook.com/tuit.uz' }
    ],
    contactEmail: 'info@tuit.uz',
    lastVerified: '2025-06-01',
    featuredForCareers: ['cybersecurity-analyst', 'software-engineer', 'data-scientist-ai']
  },
  {
    id: 'turin-polytechnic-tashkent',
    name: 'Turin Polytechnic University in Tashkent',
    shortName: 'TTPU',
    type: 'uzbekistan',
    country: 'Uzbekistan',
    city: 'Tashkent',
    flagEmoji: '🇺🇿',
    rankingNote: 'Premier engineering and automotive university in partnership with Politecnico di Torino (Italy).',
    about: 'Established in 2009 in cooperation with Politecnico di Torino (Italy) and UzAvtosanoat, TTPU educates high-caliber mechanical, mechatronics, automotive, and civil engineers with European engineering degree validation.',
    campusInfo: 'Industrial-grade testing laboratories, CNC machinery workshops, automotive test benches, and robotics experimentation facilities.',
    tuitionOverviewUsd: '$2,800 - $3,400 per academic year (in UZS)',
    scholarshipInfo: 'UzAuto Motors corporate grants and academic performance scholarships available for top engineering students.',
    internationalStudentsPolicy: 'Admits foreign students with secondary education validation and English proficiency.',
    programs: [
      {
        id: 'ttpu-mechatronics',
        name: 'Mechatronics and Robotics Engineering',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['robotics-automation-engineer', 'software-engineer'],
        estimatedAnnualTuitionUsd: 3200,
        scholarshipEligible: true,
        keySubjects: ['Applied Mechanics', 'Sensors and Actuators', 'Automatic Controls', 'Industrial Robotics', 'Circuit Analysis']
      },
      {
        id: 'ttpu-software-automotive',
        name: 'Software Engineering in Industrial Automation',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'robotics-automation-engineer'],
        estimatedAnnualTuitionUsd: 3200,
        scholarshipEligible: true,
        keySubjects: ['Embedded Systems', 'Computer Networks', 'Object-Oriented Programming', 'Real-Time Operating Systems']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Strong secondary background in Physics and Advanced Mathematics.',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '5.5',
          recommendedScore: '6.0'
        }
      ],
      standardizedTests: [
        {
          test: 'University Internal Exam',
          details: 'Online/on-campus Politecnico di Torino test (TIL) in Mathematics, Physics, and Logic.'
        }
      ],
      requiredHighSchoolSubjects: ['Physics', 'Mathematics', 'English'],
      requiredDocuments: [
        'High School Diploma (Attestat)',
        'IELTS certificate',
        'Passport copy and digital photo'
      ],
      applicationDeadlines: [
        { round: 'Phase 1 Admission', date: 'April' },
        { round: 'Phase 2 Admission', date: 'June' },
        { round: 'Phase 3 Admission', date: 'July' }
      ],
      applicationProcessSummary: [
        '1. Register online on polito.uz.',
        '2. Take the Italian TIL (Test in Laib) engineering entrance test.',
        '3. Submit verified language certificates.',
        '4. Sign educational contract upon passing score confirmation.'
      ]
    },
    careerOutcomes: 'Direct employment at automotive manufacturing plants, industrial robotics integrators, and engineering firms in Europe and Uzbekistan.',
    officialWebsite: 'https://polito.uz',
    socialLinks: [
      { platform: 'telegram', url: 'https://t.me/polito_uz' },
      { platform: 'instagram', url: 'https://instagram.com/polito_uz' },
      { platform: 'facebook', url: 'https://facebook.com/polito.uz' }
    ],
    contactEmail: 'admission@polito.uz',
    lastVerified: '2025-06-12',
    featuredForCareers: ['robotics-automation-engineer', 'software-engineer']
  },

  // ==========================================
  // 🌍 INTERNATIONAL UNIVERSITIES
  // ==========================================
  {
    id: 'mit-usa',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    type: 'international',
    country: 'United States',
    city: 'Cambridge, MA',
    flagEmoji: '🇺🇸',
    rankingNote: 'Ranked #1 in the world (QS World University Rankings). Global benchmark for technology, AI, and engineering.',
    about: "Founded in 1861, MIT is a world-renowned research powerhouse located in Cambridge, Massachusetts. Known for its intense problem-solving culture, legendary 'Mens et Manus' (Mind and Hand) motto, and transformative contributions to modern computing, AI, and physics.",
    campusInfo: '168-acre urban campus along the Charles River with cutting-edge labs including CSAIL (Computer Science and Artificial Intelligence Lab) and Media Lab.',
    tuitionOverviewUsd: '~$61,990 per academic year (Tuition only, excluding housing & insurance)',
    scholarshipInfo: 'Need-blind admissions for ALL applicants (including international students). 100% of demonstrated financial need met with grants (no loans required).',
    internationalStudentsPolicy: 'International applicants compete in the same holistic review pool with full need-blind financial aid eligibility.',
    programs: [
      {
        id: 'mit-course-6-3',
        name: 'Computer Science and Engineering (Course 6-3)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst'],
        estimatedAnnualTuitionUsd: 62000,
        scholarshipEligible: true,
        keySubjects: ['Computation Structures', 'Algorithms Design & Analysis', 'Artificial Intelligence', 'Theory of Computation']
      },
      {
        id: 'mit-course-6-4',
        name: 'Artificial Intelligence and Decision Making (Course 6-4)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['data-scientist-ai', 'software-engineer', 'robotics-automation-engineer'],
        estimatedAnnualTuitionUsd: 62000,
        scholarshipEligible: true,
        keySubjects: ['Machine Learning', 'Inference and Information', 'Optimization Methods', 'Robotics Systems']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Near-perfect high school GPA in rigorous STEM curriculum (AP / IB / National Olympiad level).',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '7.5',
          recommendedScore: '8.0+'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '100',
          recommendedScore: '105+'
        }
      ],
      standardizedTests: [
        {
          test: 'SAT',
          details: 'Mandatory SAT or ACT. Middle 50% SAT Math score is 790-800.'
        }
      ],
      requiredHighSchoolSubjects: ['Calculus', 'Physics', 'Chemistry / Biology', '4 Years English', 'History / Social Sciences'],
      requiredDocuments: [
        'MIT Application via MyMIT portal',
        '5 Short Answer Essays / Personal Reflections',
        'Secondary School Report & Official Transcripts',
        'Two Teacher Recommendations (One Math/Science, One Humanities)',
        'Standardized SAT/ACT & English testing reports'
      ],
      applicationDeadlines: [
        { round: 'Early Action (EA)', date: 'November 1' },
        { round: 'Regular Action (RA)', date: 'January 4' }
      ],
      applicationProcessSummary: [
        '1. Create account on MyMIT application platform.',
        '2. Complete essay prompts detailing creative projects, curiosity, and collaboration.',
        '3. Submit teacher recommendations and counselor school profile.',
        '4. Optional interview with MIT Educational Council (EC) alumni.'
      ]
    },
    careerOutcomes: 'Graduates lead global tech giants (Google, Apple, OpenAI, Microsoft), start venture-backed unicorns, or join premier PhD research labs.',
    officialWebsite: 'https://mit.edu',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/mit' },
      { platform: 'instagram', url: 'https://instagram.com/mit' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/mit' }
    ],
    contactEmail: 'admissions@mit.edu',
    lastVerified: '2025-05-30',
    featuredForCareers: ['software-engineer', 'data-scientist-ai', 'robotics-automation-engineer']
  },
  {
    id: 'imperial-college-london',
    name: 'Imperial College London',
    shortName: 'Imperial',
    type: 'international',
    country: 'United Kingdom',
    city: 'London',
    flagEmoji: '🇬🇧',
    rankingNote: 'Ranked #2 in the world (QS World University Rankings). Europe’s premier STEM and medical institution.',
    about: 'Located in South Kensington, London, Imperial College London focuses exclusively on science, engineering, medicine, and business. It is celebrated for world-changing discoveries, close industrial links, and high graduate salaries.',
    campusInfo: 'Prime South Kensington campus surrounded by London’s Science Museum and Natural History Museum, featuring the Dyson Design Engineering building and Data Science Institute.',
    tuitionOverviewUsd: '~$48,000 - $55,000 (£38,000 - £44,000) per academic year for international students',
    scholarshipInfo: 'President’s Undergraduate Scholarships and World Scientific Grants awarded on academic excellence.',
    internationalStudentsPolicy: 'More than 50% of the student body is international, representing over 140 nations.',
    programs: [
      {
        id: 'imperial-beng-computing',
        name: 'Computing (BEng / MEng)',
        degreeType: "Bachelor's",
        durationYears: 3,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst'],
        estimatedAnnualTuitionUsd: 50000,
        scholarshipEligible: true,
        keySubjects: ['Computer Architecture', 'Algorithms', 'Software Engineering Design', 'Logic and AI']
      },
      {
        id: 'imperial-design-eng',
        name: 'Design Engineering (MEng)',
        degreeType: 'Integrated Master',
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['product-designer-uiux', 'robotics-automation-engineer', 'product-manager'],
        estimatedAnnualTuitionUsd: 49000,
        scholarshipEligible: true,
        keySubjects: ['Engineering Design', 'Robotics and Control', 'Human-Centered Design', 'Digital Prototyping']
      }
    ],
    admissions: {
      academicGpaRequirement: 'A*A*A in A-Levels or 40-42 points in IB (with 7, 7 in Higher Level Mathematics and Physics).',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '7.0 overall (minimum 6.5 in all sub-bands)',
          recommendedScore: '7.5'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '100 (minimum 22 in all elements)'
        }
      ],
      standardizedTests: [
        {
          test: 'University Internal Exam',
          details: 'TMUA (Test of Mathematics for University Admission) or Imperial Departmental Admissions Test required for Computing.'
        }
      ],
      requiredHighSchoolSubjects: ['Advanced Mathematics (Calculus/Mechanics)', 'Physics / Computer Science', 'English'],
      requiredDocuments: [
        'UCAS Application form',
        'Academic Personal Statement (focused on academic curiosity and technical depth)',
        'Academic reference from school teacher/counselor',
        'Verified TMUA or standardized test scores'
      ],
      applicationDeadlines: [
        { round: 'UCAS Oxbridge & Early STEM Deadline', date: 'October 15' },
        { round: 'UCAS Equal Consideration', date: 'Late January' }
      ],
      applicationProcessSummary: [
        '1. Submit application via UCAS (Universities and Colleges Admissions Service).',
        '2. Register and sit for TMUA mathematics admissions examination in autumn.',
        '3. Selected applicants invited for rigorous technical interview with faculty.',
        '4. Conditional/Unconditional offer letter issued via UCAS Track.'
      ]
    },
    careerOutcomes: 'Graduates consistently achieve the highest starting salaries in the UK, recruited by DeepMind, ARM, Goldman Sachs, and Formula 1 teams.',
    officialWebsite: 'https://imperial.ac.uk',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/imperialcollege' },
      { platform: 'instagram', url: 'https://instagram.com/imperialcollege' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/imperial-college-london' }
    ],
    contactEmail: 'admissions.enquiries@imperial.ac.uk',
    lastVerified: '2025-06-05',
    featuredForCareers: ['software-engineer', 'data-scientist-ai', 'robotics-automation-engineer', 'product-designer-uiux']
  },
  {
    id: 'nus-singapore',
    name: 'National University of Singapore',
    shortName: 'NUS',
    type: 'international',
    country: 'Singapore',
    city: 'Singapore',
    flagEmoji: '🇸🇬',
    rankingNote: 'Ranked #8 in the world and #1 in Asia (QS World University Rankings). Global hub for fintech, AI, and systems engineering.',
    about: 'The National University of Singapore is Singapore’s flagship institution. Renowned for academic rigor, state-of-the-art computational infrastructure, and strategic proximity to Asian financial and technology markets.',
    campusInfo: 'Sprawling Kent Ridge campus featuring modern research hubs (NUS SoC, CREATE research campus) and international residential colleges.',
    tuitionOverviewUsd: '~$14,000 - $22,000 (with Singapore MOE Tuition Grant subsidy) / ~$30,000 full rate',
    scholarshipInfo: 'NUS Global Merit Scholarship and ASEAN Undergraduate Scholarships provide full tuition plus living allowance and accommodation.',
    internationalStudentsPolicy: 'Singapore Ministry of Education (MOE) offers tuition grant subsidies in exchange for a 3-year service obligation in a Singapore-based enterprise.',
    programs: [
      {
        id: 'nus-soc-cs',
        name: 'Bachelor of Computing in Computer Science',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst'],
        estimatedAnnualTuitionUsd: 18000,
        scholarshipEligible: true,
        keySubjects: ['Data Structures & Algorithms', 'Programming Methodology', 'Artificial Intelligence', 'Parallel Computing']
      },
      {
        id: 'nus-business-analytics',
        name: 'Bachelor of Science in Business Analytics',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['data-scientist-ai', 'fintech-financial-analyst', 'product-manager'],
        estimatedAnnualTuitionUsd: 18000,
        scholarshipEligible: true,
        keySubjects: ['Predictive Analytics', 'Operations Research', 'Financial Risk Analytics', 'Big Data Technologies']
      }
    ],
    admissions: {
      academicGpaRequirement: 'Outstanding senior high school results or 40+ IB Diploma score with maximum marks in Mathematics.',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '6.5 (minimum 6.5 in Reading and Writing)',
          recommendedScore: '7.0+'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '92-93'
        }
      ],
      standardizedTests: [
        {
          test: 'SAT',
          details: 'SAT Math 750+ / Reading 650+ or ACT 32+ required for high school diploma holders.'
        }
      ],
      requiredHighSchoolSubjects: ['Advanced Mathematics / Calculus', 'Physics / Chemistry / Informatics', 'English Language'],
      requiredDocuments: [
        'NUS Online International Application',
        'Official Senior High School Examination Transcript',
        'SAT/ACT and IELTS score reports',
        'Proof of international competitions or Olympiad medals'
      ],
      applicationDeadlines: [
        { round: 'International Qualifications', date: 'Late February' }
      ],
      applicationProcessSummary: [
        '1. Submit online application on NUS Admissions Portal.',
        '2. Upload verified academic records and standardized test scores.',
        '3. Apply simultaneously for MOE Tuition Grant and university scholarships.',
        '4. Admission outcome released between May and July.'
      ]
    },
    careerOutcomes: 'Graduates are in high demand across Grab, Sea Group, Google Singapore, ByteDance, and top sovereign wealth funds (GIC, Temasek).',
    officialWebsite: 'https://nus.edu.sg',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/nuscaste' },
      { platform: 'instagram', url: 'https://instagram.com/nus_singapore' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/national-university-of-singapore' }
    ],
    contactEmail: 'admissions@nus.edu.sg',
    lastVerified: '2025-06-18',
    featuredForCareers: ['software-engineer', 'data-scientist-ai', 'fintech-financial-analyst', 'cybersecurity-analyst']
  },
  {
    id: 'tum-germany',
    name: 'Technical University of Munich',
    shortName: 'TUM',
    type: 'international',
    country: 'Germany',
    city: 'Munich',
    flagEmoji: '🇩🇪',
    rankingNote: 'Ranked #1 in Germany and top 30 globally. Europe’s powerhouse for automotive, engineering, and computer science.',
    about: 'Founded in 1868, TUM is one of Europe’s most prestigious technical universities. Situated in Munich, it produces visionary engineers, Nobel laureates, and tech startup founders in collaboration with BMW, Siemens, and Airbus.',
    campusInfo: 'State-of-the-art research campus in Garching (Munich), home to nuclear research reactors, quantum computing centers, and hyperloop test tracks.',
    tuitionOverviewUsd: '~$2,200 - $3,300 (€2,000 - €3,000) per semester for non-EU students (low tuition compared to US/UK)',
    scholarshipInfo: 'Deutschlandstipendium and DAAD scholarships support high-achieving international scholars.',
    internationalStudentsPolicy: 'Over 35% international student body. Many master’s and several bachelor’s programs offered in English.',
    programs: [
      {
        id: 'tum-informatics',
        name: 'Informatics / Computer Science (B.Sc.)',
        degreeType: "Bachelor's",
        durationYears: 3,
        languageOfInstruction: ['German', 'English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'robotics-automation-engineer'],
        estimatedAnnualTuitionUsd: 5500,
        scholarshipEligible: true,
        keySubjects: ['Theoretical Computer Science', 'Algorithms', 'Computer Architecture', 'Software Engineering Praktikum']
      },
      {
        id: 'tum-mech-mechatronics',
        name: 'Mechatronics & Information Technology (B.Sc.)',
        degreeType: "Bachelor's",
        durationYears: 3,
        languageOfInstruction: ['German', 'English'],
        targetCareers: ['robotics-automation-engineer', 'software-engineer'],
        estimatedAnnualTuitionUsd: 5500,
        scholarshipEligible: true,
        keySubjects: ['Control Engineering', 'Robotics Hardware', 'Microcontroller Programming', 'Engineering Mechanics']
      }
    ],
    admissions: {
      academicGpaRequirement: 'University entrance qualification recognized in Germany (Abitur equivalent or 1-2 years university study / Studienkolleg).',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '6.5',
          recommendedScore: '7.0'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '88'
        }
      ],
      standardizedTests: [
        {
          test: 'University Internal Exam',
          details: 'TUM Aptitude Assessment (Eignungsfeststellungsverfahren) evaluating math and science grades.'
        }
      ],
      requiredHighSchoolSubjects: ['Advanced Mathematics', 'Physics', 'Computer Science', 'German / English Language'],
      requiredDocuments: [
        'VPD (Vorprüfungsdokumentation) from Uni-Assist',
        'Certified high school diploma & transcript translations',
        'Language proficiency certificates',
        'Letter of Motivation / Statement of Purpose'
      ],
      applicationDeadlines: [
        { round: 'Winter Semester Intake', date: 'July 15' }
      ],
      applicationProcessSummary: [
        '1. Apply for VPD certificate through Uni-Assist.',
        '2. Submit online application on TUMonline portal.',
        '3. Stage 1 point evaluation based on school grades and motivation.',
        '4. Stage 2 online interview if points are within threshold.'
      ]
    },
    careerOutcomes: 'Direct access to Germany’s high-tech industry (BMW Group, Siemens, Celonis, Infineon Technologies) and European engineering leadership.',
    officialWebsite: 'https://tum.de',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/tum' },
      { platform: 'instagram', url: 'https://instagram.com/tu.muenchen' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/technical-university-of-munich' }
    ],
    contactEmail: 'studium@tum.de',
    lastVerified: '2025-06-25',
    featuredForCareers: ['robotics-automation-engineer', 'software-engineer', 'data-scientist-ai']
  },
  {
    id: 'u-of-toronto',
    name: 'University of Toronto',
    shortName: 'U of T',
    type: 'international',
    country: 'Canada',
    city: 'Toronto, ON',
    flagEmoji: '🇨🇦',
    rankingNote: 'Ranked #1 in Canada and top 20 globally. Birthplace of modern deep learning and neural network research (Geoffrey Hinton).',
    about: 'Founded in 1827, the University of Toronto is Canada’s leading research institution. Famous for inventing artificial neural networks, discovering insulin, and housing the Vector Institute for Artificial Intelligence.',
    campusInfo: 'Historic St. George campus in downtown Toronto, integrating Gothic architecture with cutting-edge Schwartz Reisman Innovation Centre.',
    tuitionOverviewUsd: '~$44,000 - $49,000 (CAD $60,000) per academic year for international students',
    scholarshipInfo: 'Lester B. Pearson International Scholarship covers full 4-year tuition, books, incidental fees, and full residence support.',
    internationalStudentsPolicy: 'Generous post-graduation work permit (PGWP) pathway in Canada allowing up to 3 years of open work authorization.',
    programs: [
      {
        id: 'uoft-cs-ai',
        name: 'Computer Science (Specialist in AI & Systems)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['software-engineer', 'data-scientist-ai', 'cybersecurity-analyst'],
        estimatedAnnualTuitionUsd: 46000,
        scholarshipEligible: true,
        keySubjects: ['Data Structures', 'Introduction to Machine Learning', 'Operating Systems', 'Algorithm Design']
      },
      {
        id: 'uoft-rotman-commerce',
        name: 'Rotman Commerce (Finance & Economics)',
        degreeType: "Bachelor's",
        durationYears: 4,
        languageOfInstruction: ['English'],
        targetCareers: ['fintech-financial-analyst', 'product-manager'],
        estimatedAnnualTuitionUsd: 45000,
        scholarshipEligible: true,
        keySubjects: ['Corporate Finance', 'Financial Accounting', 'Microeconomics', 'Quantitative Methods']
      }
    ],
    admissions: {
      academicGpaRequirement: 'A/A+ average in senior secondary high school curriculum with strong Calculus.',
      languageRequirements: [
        {
          test: 'IELTS',
          minimumScore: '6.5 (minimum 6.0 in every band)',
          recommendedScore: '7.0+'
        },
        {
          test: 'TOEFL iBT',
          minimumScore: '100 (minimum 22 on writing)'
        }
      ],
      standardizedTests: [
        {
          test: 'None Required',
          details: 'Standardized tests optional; high school grade transcripts and supplemental video profile prioritized.'
        }
      ],
      requiredHighSchoolSubjects: ['Calculus / Advanced Functions', 'English', 'Physics / Chemistry / Informatics'],
      requiredDocuments: [
        'OUAC (Ontario Universities’ Application Centre) Form',
        'Official high school transcripts',
        'Supplemental application with short essays and timed video response',
        'Lester B. Pearson nomination (if applying for full scholarship)'
      ],
      applicationDeadlines: [
        { round: 'Early Consideration & Pearson Scholarship', date: 'November 7' },
        { round: 'Regular Deadline', date: 'January 15' }
      ],
      applicationProcessSummary: [
        '1. Apply via OUAC international 105 portal.',
        '2. Access U of T Join portal and complete supplemental video responses.',
        '3. Upload high school mid-term and final transcripts.',
        '4. Admissions decisions released in rounds from February through May.'
      ]
    },
    careerOutcomes: 'Direct access to North America’s second-largest tech corridor (Toronto-Waterloo), AI research labs (Vector Institute), and Bay Street finance.',
    officialWebsite: 'https://utoronto.ca',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/utoronto' },
      { platform: 'instagram', url: 'https://instagram.com/uoft' },
      { platform: 'linkedin', url: 'https://linkedin.com/school/university-of-toronto' }
    ],
    contactEmail: 'admissions.help@utoronto.ca',
    lastVerified: '2025-06-15',
    featuredForCareers: ['software-engineer', 'data-scientist-ai', 'fintech-financial-analyst']
  }
];
