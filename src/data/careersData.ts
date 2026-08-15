import { CareerDetail } from '../types';

export const CAREERS_DATABASE: CareerDetail[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Tech & AI',
    iconName: 'Code',
    shortDescription: 'Designs, builds, and maintains software applications, cloud systems, and scalable backend infrastructure.',
    whatTheyDo: [
      'Write clean, maintainable code in languages such as TypeScript, Python, Java, or Go.',
      'Design software architecture, RESTful and GraphQL APIs, and database schemas.',
      'Collaborate with product designers and managers in agile development sprints.',
      'Debug production systems, write automated tests, and optimize performance.'
    ],
    dailyWorkEnvironment: 'Tech companies, high-growth startups, remote global engineering teams, or enterprise software departments.',
    coreTechnicalSkills: ['Data Structures & Algorithms', 'Web / Backend Frameworks', 'System Architecture', 'Git & CI/CD', 'Database Design'],
    coreSoftSkills: ['Logical Problem Solving', 'Clear Asynchronous Communication', 'Continuous Learning', 'Team Collaboration'],
    recommendedSchoolSubjects: ['Mathematics', 'Computer Science / Informatics', 'Physics', 'English Language'],
    popularTools: ['VS Code', 'GitHub', 'Docker', 'PostgreSQL', 'AWS / Google Cloud', 'Linux'],
    specializations: ['Full-Stack Development', 'Backend & Cloud Systems', 'Mobile App Development (iOS/Android)', 'DevOps & Site Reliability'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Junior Software Engineer', 'Associate Developer', 'Software QA Intern'],
        focus: 'Mastering codebase conventions, shipping bug fixes, and implementing well-scoped features.'
      },
      {
        stage: 'Mid Level',
        roles: ['Software Engineer II', 'Full-Stack Developer'],
        focus: 'Owning entire service modules, designing database structures, and mentoring junior teammates.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Senior Software Engineer', 'Tech Lead', 'Engineering Manager'],
        focus: 'High-level system design, technical trade-offs, architecture roadmap, and developer productivity.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Principal Engineer', 'VP of Engineering', 'Chief Technology Officer (CTO)'],
        focus: 'Organizational technology strategy, multi-year engineering vision, and technical governance.'
      }
    ],
    relevantMajorNames: ['Computer Science', 'Software Engineering', 'Information Technology', 'Computer Engineering'],
    uzbekistanOpportunities: 'Rapidly growing IT Park ecosystem, fintech companies (Payme, Uzum, Click), international outsourcing centers, and digital government initiatives.',
    globalOpportunities: 'High worldwide demand across Silicon Valley, European tech hubs, Singapore, and fully remote international roles.'
  },
  {
    id: 'data-scientist-ai',
    title: 'Data Scientist & AI Specialist',
    category: 'Tech & AI',
    iconName: 'BrainCircuit',
    shortDescription: 'Analyzes massive data volumes and builds machine learning models to solve complex predictive and generative tasks.',
    whatTheyDo: [
      'Collect, clean, and preprocess structured and unstructured data pipelines.',
      'Train, fine-tune, and evaluate machine learning, deep learning, and LLM models.',
      'Formulate statistical hypotheses to discover actionable business and scientific patterns.',
      'Deploy AI models into production environments and monitor performance drift.'
    ],
    dailyWorkEnvironment: 'AI research labs, big tech firms, fintech risk divisions, healthcare analytics, and business intelligence departments.',
    coreTechnicalSkills: ['Applied Statistics & Probability', 'Python (PyTorch, TensorFlow, Pandas)', 'Machine Learning Algorithms', 'SQL & BigQuery', 'Data Visualization'],
    coreSoftSkills: ['Analytical Rigor', 'Translating Complex Math into Business Value', 'Intellectual Curiosity', 'Scientific Skepticism'],
    recommendedSchoolSubjects: ['Higher Mathematics (Calculus & Linear Algebra)', 'Informatics / Python', 'Statistics', 'English'],
    popularTools: ['Jupyter Notebooks', 'PyTorch', 'Hugging Face', 'Scikit-Learn', 'Tableau / PowerBI', 'Pandas'],
    specializations: ['Natural Language Processing (NLP)', 'Computer Vision', 'Generative AI & LLM Systems', 'Predictive Analytics & Quantitative Modeling'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Junior Data Analyst', 'Junior Machine Learning Engineer', 'Data Science Fellow'],
        focus: 'Exploratory data analysis, baseline model tuning, and data cleaning pipelines.'
      },
      {
        stage: 'Mid Level',
        roles: ['Data Scientist', 'Machine Learning Engineer'],
        focus: 'Designing custom model architectures, feature engineering, and deploying inference APIs.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Lead Data Scientist', 'AI Research Lead', 'Head of Analytics'],
        focus: 'Setting data strategy, cross-functional algorithmic product features, and research direction.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Chief Data Officer (CDO)', 'VP of Artificial Intelligence', 'Principal AI Scientist'],
        focus: 'Enterprise-wide AI governance, core IP development, and AI competitive advantage.'
      }
    ],
    relevantMajorNames: ['Data Science', 'Artificial Intelligence', 'Applied Mathematics & Informatics', 'Statistics', 'Computer Science'],
    uzbekistanOpportunities: 'Banking and fintech analytics, telecommunications data optimization, government digitalization, and emerging local AI startups.',
    globalOpportunities: 'Extremely high demand globally with high compensation across US, UK, Germany, Canada, and global remote research labs.'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity & Defense Specialist',
    category: 'Tech & AI',
    iconName: 'ShieldAlert',
    shortDescription: 'Protects computer systems, networks, and sensitive data from cyber attacks, breaches, and unauthorized access.',
    whatTheyDo: [
      'Monitor networks and digital infrastructure for unauthorized intrusions and suspicious activity.',
      'Perform vulnerability assessments, penetration testing, and security audits.',
      'Design encryption, access controls, and zero-trust security policies.',
      'Respond to security incidents, analyze malware, and perform digital forensics.'
    ],
    dailyWorkEnvironment: 'Security Operations Centers (SOC), financial institutions, government agencies, cloud providers, and defense contractors.',
    coreTechnicalSkills: ['Network Protocols & Firewalls', 'Linux Systems Administration', 'Penetration Testing & Ethical Hacking', 'Cryptography', 'SIEM & Threat Hunting'],
    coreSoftSkills: ['Perseverance & Investigation', 'Calm Crisis Management', 'Ethical Integrity', 'Attention to Detail'],
    recommendedSchoolSubjects: ['Computer Science', 'Mathematics', 'Physics', 'English Language'],
    popularTools: ['Wireshark', 'Kali Linux', 'Burp Suite', 'Metasploit', 'Splunk', 'Nmap'],
    specializations: ['Ethical Hacking / Penetration Testing', 'Cloud Security Architecture', 'Incident Response & Forensics', 'Application Security (AppSec)'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Junior SOC Analyst', 'Information Security Officer Assistant', 'Junior Pentester'],
        focus: 'Monitoring intrusion alerts, triaging security logs, and executing standard vulnerability scans.'
      },
      {
        stage: 'Mid Level',
        roles: ['Cybersecurity Specialist', 'Security Engineer', 'Penetration Tester'],
        focus: 'Simulating advanced threat vectors, hardening cloud architectures, and conducting code audits.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Senior Security Architect', 'Incident Response Commander', 'Security Team Lead'],
        focus: 'Enterprise security strategy, disaster recovery planning, and zero-trust implementation.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Chief Information Security Officer (CISO)', 'Director of Information Assurance'],
        focus: 'Cyber risk governance, regulatory compliance, and protecting corporate assets at board level.'
      }
    ],
    relevantMajorNames: ['Information Security', 'Cybersecurity', 'Computer Networks', 'Computer Science'],
    uzbekistanOpportunities: 'State cybersecurity agencies (Cybersecurity Center of UZ), banking sector, telecom security, and enterprise IT defense.',
    globalOpportunities: 'Severe global talent shortage across USA, Europe, Japan, and Middle East with high job security.'
  },
  {
    id: 'product-designer-uiux',
    title: 'Product Designer (UI/UX)',
    category: 'Design & Creative',
    iconName: 'LayoutGrid',
    shortDescription: 'Crafts intuitive, elegant, and user-centered digital product interfaces, user journeys, and design systems.',
    whatTheyDo: [
      'Conduct user interviews, usability testing, and qualitative research to understand pain points.',
      'Create wireframes, interactive prototypes, and high-fidelity visual UI designs.',
      'Build and maintain scalable design systems with reusable components and design tokens.',
      'Collaborate tightly with engineers to ensure pixel-perfect, accessible implementation.'
    ],
    dailyWorkEnvironment: 'Product design studios, consumer tech companies, SaaS startups, and creative agencies.',
    coreTechnicalSkills: ['User Experience (UX) Research', 'UI Visual Hierarchy & Typography', 'Interactive Prototyping', 'Design Systems', 'Usability Testing'],
    coreSoftSkills: ['Deep Empathy for Users', 'Storytelling & Presentation', 'Constructive Feedback Reception', 'Cross-Functional Collaboration'],
    recommendedSchoolSubjects: ['Art / Drawing / Design', 'Psychology / Social Studies', 'Informatics', 'English Language'],
    popularTools: ['Figma', 'FigJam', 'Framer', 'Protopie', 'Adobe Illustrator', 'Maze'],
    specializations: ['Design Systems Engineering', 'UX Research & Behavioral Design', 'Interaction & Micro-Animations', 'Design Strategy & Product Leadership'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Junior UI Designer', 'Junior UX Researcher', 'Product Design Intern'],
        focus: 'Creating component variations, preparing asset specs, and executing defined screen designs.'
      },
      {
        stage: 'Mid Level',
        roles: ['Product Designer', 'UI/UX Designer'],
        focus: 'Leading feature design end-to-end, conducting user tests, and maintaining component libraries.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Senior Product Designer', 'Design Lead', 'Staff UX Specialist'],
        focus: 'Product vision, complex design architecture, user journey optimization, and mentoring.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Head of Design', 'VP of Product Design', 'Chief Design Officer (CDO)'],
        focus: 'Brand identity cohesion, strategic product differentiation, and design organization leadership.'
      }
    ],
    relevantMajorNames: ['Human-Computer Interaction (HCI)', 'Digital Product Design', 'Graphic Design & Multimedia', 'Interactive Media'],
    uzbekistanOpportunities: 'Fintech apps (Uzum, Payme), digital banking interfaces, e-commerce platforms, and creative agency design work.',
    globalOpportunities: 'High flexibility for remote work, freelance contracts, and Silicon Valley / European design studios.'
  },
  {
    id: 'product-manager',
    title: 'Product Manager (Tech)',
    category: 'Business & Product',
    iconName: 'Compass',
    shortDescription: 'Guides the vision, strategy, and roadmap of digital products at the intersection of business, technology, and user experience.',
    whatTheyDo: [
      'Define product vision, feature requirements, and strategic development roadmaps.',
      'Analyze customer feedback, market trends, and key product performance metrics (KPIs).',
      'Align engineering, design, marketing, and executive stakeholders around unified goals.',
      'Prioritize product backlog based on customer impact and business ROI.'
    ],
    dailyWorkEnvironment: 'Tech enterprises, high-growth startups, venture-backed companies, and innovation labs.',
    coreTechnicalSkills: ['Product Strategy & Roadmapping', 'Data-Driven Decision Making', 'Agile / Scrum Methodologies', 'User Journey Mapping', 'A/B Testing & Analytics'],
    coreSoftSkills: ['Strategic Prioritization', 'Influential Communication', 'Conflict Resolution', 'Decisiveness Under Ambiguity'],
    recommendedSchoolSubjects: ['Economics / Business', 'Mathematics', 'Informatics', 'English Language', 'Social Studies'],
    popularTools: ['Jira / Linear', 'Notion', 'Mixpanel / Amplitude', 'Figma', 'Google Analytics', 'Miro'],
    specializations: ['Technical Product Management (API/Infrastructure)', 'Growth Product Management', 'B2B SaaS Product Strategy', 'Consumer Mobile PM'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Associate Product Manager (APM)', 'Junior Product Analyst', 'Product Coordinator'],
        focus: 'Writing user stories, coordinating sprint releases, and monitoring engagement metrics.'
      },
      {
        stage: 'Mid Level',
        roles: ['Product Manager', 'Feature Owner'],
        focus: 'Owning entire product pillars, defining OKRs, and launching major multi-month initiatives.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Senior Product Manager', 'Group Product Manager (GPM)'],
        focus: 'Multi-product portfolio strategy, cross-team alignment, and business model monetization.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Director of Product', 'VP of Product', 'Chief Product Officer (CPO)'],
        focus: 'Company-wide strategic positioning, product investments, and executive team leadership.'
      }
    ],
    relevantMajorNames: ['Business Administration & IT', 'Computer Science + Economics', 'Management Information Systems (MIS)', 'Industrial Engineering'],
    uzbekistanOpportunities: 'E-commerce ecosystems (Uzum Market), super-apps, telecom digital products, and local venture-backed startups.',
    globalOpportunities: 'High-earning, high-influence roles across international tech hubs with pathways to founder/executive careers.'
  },
  {
    id: 'robotics-automation-engineer',
    title: 'Robotics & Automation Engineer',
    category: 'Engineering',
    iconName: 'Cpu',
    shortDescription: 'Develops robotic systems, automated manufacturing machines, sensors, and intelligent hardware-software integration.',
    whatTheyDo: [
      'Design electrical circuits, microcontrollers, motor actuators, and mechanical chassis.',
      'Program embedded firmware in C/C++ and integrate ROS (Robot Operating System).',
      'Implement computer vision, kinematics, and trajectory planning algorithms.',
      'Test autonomous navigation and automated industrial production lines.'
    ],
    dailyWorkEnvironment: 'Robotics laboratories, automotive plants, aerospace facilities, and smart manufacturing plants.',
    coreTechnicalSkills: ['Embedded Systems & C/C++', 'Robotics Operating System (ROS)', 'Control Theory & Kinematics', 'Circuit Design & PCB Layout', 'CAD Modeling'],
    coreSoftSkills: ['Hands-on Tinkering', 'Spatial Reasoning', 'Systemic Debugging', 'Safety Discipline'],
    recommendedSchoolSubjects: ['Physics', 'Advanced Mathematics (Trigonometry & Calculus)', 'Informatics / Programming', 'Chemistry'],
    popularTools: ['MATLAB / Simulink', 'SolidWorks / AutoCAD', 'ROS / ROS2', 'Arduino & STM32', 'Altium Designer'],
    specializations: ['Autonomous Mobile Robots (AMR)', 'Industrial Robotic Arms & PLC', 'Medical Surgical Robotics', 'Drone & Aerial Robotics'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Junior Embedded Engineer', 'Automation Technician', 'Robotics Hardware Assistant'],
        focus: 'Soldering, sensor calibration, basic firmware writing, and testing mechanical prototypes.'
      },
      {
        stage: 'Mid Level',
        roles: ['Robotics Engineer', 'Automation Systems Developer'],
        focus: 'Developing navigation algorithms, designing custom PCBs, and integrating sensor fusion.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Lead Robotics Architect', 'Staff Mechatronics Engineer'],
        focus: 'Designing complete autonomous hardware platforms and multi-robot coordination systems.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Chief Robotics Officer', 'Director of Hardware Engineering'],
        focus: 'Factory automation strategy, physical product certification, and advanced R&D budget.'
      }
    ],
    relevantMajorNames: ['Mechatronics & Robotics', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Control Systems Engineering'],
    uzbekistanOpportunities: 'Automotive manufacturing (UzAuto Motors cluster), Turin Polytechnic R&D projects, agricultural automation, and smart factory lines.',
    globalOpportunities: 'High demand in Germany, Japan, South Korea, USA, and Scandinavian industrial automation companies.'
  },
  {
    id: 'fintech-financial-analyst',
    title: 'Fintech & Quantitative Analyst',
    category: 'Business & Product',
    iconName: 'TrendingUp',
    shortDescription: 'Leverages mathematical modeling, financial analysis, and software to evaluate investments, markets, and digital payment systems.',
    whatTheyDo: [
      'Build financial models, discounted cash flow (DCF) models, and valuation frameworks.',
      'Analyze market trends, financial statements, and digital payment transaction flows.',
      'Design quantitative risk assessment algorithms and automated trading or credit scoring models.',
      'Prepare strategic investment memoranda and business financial forecasts.'
    ],
    dailyWorkEnvironment: 'Investment banks, venture capital funds, fintech neo-banks, and corporate finance departments.',
    coreTechnicalSkills: ['Financial Modeling & Valuation', 'Corporate Accounting', 'Python for Finance / R', 'Advanced Excel & VBA', 'Econometrics & Risk Analysis'],
    coreSoftSkills: ['Quantitative Precision', 'Commercial Acumen', 'High-Stakes Presentation', 'Stress Resilience'],
    recommendedSchoolSubjects: ['Mathematics & Statistics', 'Economics', 'English Language', 'Informatics'],
    popularTools: ['Bloomberg Terminal', 'Microsoft Excel', 'Python (QuantLib, Statsmodels)', 'PowerBI', 'Capital IQ'],
    specializations: ['Venture Capital & Startup Finance', 'Quantitative Trading & Modeling', 'Credit Risk & Neo-Banking', 'Corporate Mergers & Acquisitions (M&A)'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Financial Analyst', 'Junior Investment Analyst', 'Risk Associate'],
        focus: 'Building spreadsheet models, spreading financial statements, and conducting industry research.'
      },
      {
        stage: 'Mid Level',
        roles: ['Senior Financial Analyst', 'Fintech Product Finance Manager', 'Associate Portfolio Manager'],
        focus: 'Leading deal valuations, structuring financial products, and optimizing pricing algorithms.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Finance Director', 'VP of Finance', 'Principal Investment Officer'],
        focus: 'Managing fund allocations, investor relations, capital raising, and treasury operations.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Chief Financial Officer (CFO)', 'Managing Partner (Fund)'],
        focus: 'Enterprise capital strategy, IPO preparation, and macroeconomic risk hedging.'
      }
    ],
    relevantMajorNames: ['Finance & Accounting', 'Economics & Econometrics', 'Quantitative Finance', 'Business Administration'],
    uzbekistanOpportunities: 'Banking sector modernization (Central Bank of Uzbekistan, private banks), fintech unicorns, and Tashkent financial hub expansion.',
    globalOpportunities: 'Wall Street, City of London, Frankfurt, Dubai DIFC, and Singapore financial capitals.'
  },
  {
    id: 'biomedical-scientist',
    title: 'Biomedical & Biotechnology Scientist',
    category: 'Science & Health',
    iconName: 'Dna',
    shortDescription: 'Researches biological mechanisms, genetics, and pharmaceutical solutions to diagnose, prevent, and treat diseases.',
    whatTheyDo: [
      'Conduct laboratory experiments involving DNA sequencing, cell cultures, and molecular assays.',
      'Analyze genetic and bio-informatic datasets using computational biology tools.',
      'Participate in preclinical drug discovery, vaccine testing, and diagnostic kit development.',
      'Write peer-reviewed scientific papers and present clinical research findings.'
    ],
    dailyWorkEnvironment: 'Biotech research laboratories, pharmaceutical companies, university medical institutes, and diagnostic centers.',
    coreTechnicalSkills: ['Molecular Biology Techniques', 'Bioinformatics & Computational Genomics', 'Laboratory Safety & Protocols', 'Statistical Data Analysis', 'Microbiology'],
    coreSoftSkills: ['Patience & Methodical Discipline', 'Curiosity for Living Systems', 'Ethical Scientific Rigor', 'Technical Writing'],
    recommendedSchoolSubjects: ['Biology', 'Chemistry', 'Mathematics', 'English Language'],
    popularTools: ['BLAST / NCBI Databases', 'R / Bioconductor', 'CRISPR Design Tools', 'Flow Cytometers', 'PCR Thermal Cyclers'],
    specializations: ['Genomics & Gene Editing', 'Pharmaceutical Drug Discovery', 'Immunology & Vaccine Development', 'Bioinformatics & Computational Biology'],
    careerProgression: [
      {
        stage: 'Entry Level',
        roles: ['Lab Technician', 'Research Assistant', 'Junior Bioinformatician'],
        focus: 'Executing wet lab protocols, preparing reagents, and recording baseline experimental data.'
      },
      {
        stage: 'Mid Level',
        roles: ['Biomedical Scientist', 'Research Associate', 'Clinical Data Specialist'],
        focus: 'Designing controlled experiment series, analyzing molecular sequences, and authoring papers.'
      },
      {
        stage: 'Senior / Lead',
        roles: ['Principal Investigator (PI)', 'Senior Scientist', 'R&D Project Leader'],
        focus: 'Securing scientific research grants, leading laboratory teams, and translating discoveries to trials.'
      },
      {
        stage: 'Executive / Principal',
        roles: ['Chief Scientific Officer (CSO)', 'Director of Biotechnology Research'],
        focus: 'Setting pharmaceutical pipeline strategy, intellectual property patenting, and regulatory compliance.'
      }
    ],
    relevantMajorNames: ['Biotechnology', 'Biomedical Sciences', 'Molecular Biology & Genetics', 'Bioinformatics', 'Biochemistry'],
    uzbekistanOpportunities: 'Academy of Sciences biotechnology centers, pharmaceutical manufacturing clusters (Tashkent Pharma Park), and genetic diagnostic labs.',
    globalOpportunities: 'Massive biotech clusters in Boston, Cambridge/Oxford UK, Basel Switzerland, and Singapore Biopolis.'
  }
];
