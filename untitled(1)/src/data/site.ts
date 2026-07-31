// Central source of truth for all business info & content.
// Edit values here to update the whole site.

export const SITE = {
  name: 'IACT 2 Computers Education',
  shortName: 'IACT 2',
  tagline: 'Computer Education Centre',
  phoneDisplay: '080925 76269',
  phoneRaw: '+918092576269', // for tel: links (drop leading 0, add +91)
  whatsapp: '918092576269', // for wa.me links
  email: 'iact2computers@gmail.com',
  addressLine1: 'Phuldungri, Ghatshila',
  addressLine2: 'Jharkhand 832303',
  addressFull: 'Phuldungri, Ghatshila, Jharkhand 832303',
  mapsLink: 'https://maps.app.goo.gl/H19HUGiC8LkqbVzE6',
  mapsEmbed:
    'https://www.google.com/maps?q=Phuldungri,Ghatshila,Jharkhand%20832303&output=embed',
  hours: 'Mon – Sat: 8:00 AM – 7:00 PM',
  hoursSunday: 'Sunday: 9:00 AM – 2:00 PM',
  established: 2015,
};

export type Course = {
  title: string;
  code: string;
  duration: string;
  level: string;
  description: string;
  topics: string[];
  icon: string; // lucide icon name
  popular?: boolean;
};

export const COURSES: Course[] = [
  {
    title: 'DCA – Diploma in Computer Applications',
    code: 'DCA',
    duration: '6 Months',
    level: 'Foundation',
    description:
      'A complete foundation in computers — from operating systems to office tools and the internet. Perfect first step into the digital world.',
    topics: ['Fundamentals of Computer', 'Windows OS', 'MS Office', 'Internet & Email', 'Typing'],
    icon: 'MonitorSmartphone',
    popular: true,
  },
  {
    title: 'ADCA – Advanced Diploma in Computer Applications',
    code: 'ADCA',
    duration: '1 Year',
    level: 'Advanced',
    description:
      'An in-depth advanced diploma covering office automation, accounting, designing and an introduction to programming for a full IT career.',
    topics: ['All DCA Modules', 'Tally Prime + GST', 'DTP & Photoshop', 'Basic Programming', 'Project Work'],
    icon: 'GraduationCap',
    popular: true,
  },
  {
    title: 'Tally Prime with GST',
    code: 'TALLY',
    duration: '3 Months',
    level: 'Job-Oriented',
    description:
      'Master modern accounting with Tally Prime — company setup, inventory, vouchers, payroll and complete GST filing. Highly in demand.',
    topics: ['Accounting Basics', 'Tally Prime', 'GST & TDS', 'Payroll', 'Banking & Reports'],
    icon: 'Calculator',
    popular: true,
  },
  {
    title: 'MS Office Specialist',
    code: 'MS-OFFICE',
    duration: '3 Months',
    level: 'Foundation',
    description:
      'Become fluent in Word, Excel, PowerPoint & Outlook — the essential office productivity skills every employer looks for.',
    topics: ['MS Word', 'MS Excel (Adv.)', 'MS PowerPoint', 'MS Access', 'Outlook'],
    icon: 'FileSpreadsheet',
  },
  {
    title: 'Web Designing & Development',
    code: 'WEB',
    duration: '6 Months',
    level: 'Advanced',
    description:
      'Design and build modern websites from scratch — HTML, CSS, JavaScript and responsive design with live projects.',
    topics: ['HTML5 & CSS3', 'JavaScript', 'Bootstrap', 'WordPress', 'Live Project'],
    icon: 'Code2',
  },
  {
    title: 'Programming (C, C++, Python)',
    code: 'PROG',
    duration: '4 Months',
    level: 'Advanced',
    description:
      'Learn the logic of coding with C and C++, then step into Python — the world’s most popular and versatile language.',
    topics: ['C Programming', 'C++ (OOPs)', 'Python Basics', 'Mini Projects', 'Logic Building'],
    icon: 'Binary',
  },
  {
    title: 'DTP – Desktop Publishing',
    code: 'DTP',
    duration: '3 Months',
    level: 'Creative',
    description:
      'Create stunning print & digital designs — posters, brochures, banners and logos using CorelDRAW and Photoshop.',
    topics: ['CorelDRAW', 'Adobe Photoshop', 'PageMaker', 'Printing Basics', 'Portfolio'],
    icon: 'Palette',
  },
  {
    title: 'CCC – Course on Computer Concepts',
    code: 'CCC',
    duration: '3 Months',
    level: 'Govt. Certified',
    description:
      'Government-recognised certification covering all the essential computer concepts required for many jobs and exams.',
    topics: ['Computer Concepts', 'OS & GUI', 'Word & Excel', 'Internet', 'Digital Payments'],
    icon: 'BadgeCheck',
  },
  {
    title: 'Typing & Data Entry Operator',
    code: 'DEO',
    duration: '2 Months',
    level: 'Foundation',
    description:
      'Build blazing typing speed in Hindi & English and master professional data entry for office and government jobs.',
    topics: ['English Typing', 'Hindi Typing', 'Data Entry', 'Form Filling', 'Speed Tests'],
    icon: 'Keyboard',
  },
];

export const STATS = [
  { value: 5000, suffix: '+', label: 'Students Trained' },
  { value: 12, suffix: '+', label: 'Years of Experience' },
  { value: 25, suffix: '+', label: 'Professional Courses' },
  { value: 98, suffix: '%', label: 'Placement Support' },
];

export const FEATURES = [
  {
    icon: 'BadgeCheck',
    title: 'Govt. Recognised Certificates',
    text: 'Valid, recognised certification that adds real value to your CV and is accepted by employers.',
  },
  {
    icon: 'Users',
    title: 'Experienced Faculty',
    text: 'Learn from friendly, qualified trainers who give every student personal attention and guidance.',
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Modern Computer Lab',
    text: 'One-student-one-computer practice on the latest systems and updated software.',
  },
  {
    icon: 'Briefcase',
    title: 'Placement Assistance',
    text: 'Dedicated career support, interview prep and job referrals to help you get hired.',
  },
  {
    icon: 'IndianRupee',
    title: 'Affordable Fees',
    text: 'Quality computer education at honest, budget-friendly fees with easy instalment options.',
  },
  {
    icon: 'Wrench',
    title: '100% Practical Training',
    text: 'Learn by doing — real projects, hands-on practice and real-world skills, not just theory.',
  },
];

export const STEPS = [
  {
    no: '01',
    title: 'Visit or Call Us',
    text: 'Drop by our centre in Phuldungri or call 080925 76269. Our team helps you choose the right course.',
  },
  {
    no: '02',
    title: 'Free Counselling',
    text: 'Get free expert counselling about courses, fees, duration and career opportunities.',
  },
  {
    no: '03',
    title: 'Enroll & Start Learning',
    text: 'Complete a simple admission and begin classes with flexible morning, afternoon & evening batches.',
  },
  {
    no: '04',
    title: 'Get Certified & Placed',
    text: 'Finish your course, earn your certificate and get placement assistance to start your career.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Kumari',
    course: 'ADCA Graduate',
    rating: 5,
    text: 'IACT 2 is the best computer institute in Ghatshila. The teachers are very supportive and I learned Tally and MS Office with full practical work. I got a job right after my course!',
  },
  {
    name: 'Rahul Mahato',
    course: 'Tally Prime with GST',
    rating: 5,
    text: 'Excellent teaching and a great computer lab. The GST and accounting training was very practical. Highly recommended for anyone who wants a real accounting job.',
  },
  {
    name: 'Sneha Das',
    course: 'Web Designing',
    rating: 5,
    text: 'I came in knowing nothing about computers. Now I can design full websites! The faculty gives personal attention to every student. Thank you IACT 2.',
  },
  {
    name: 'Aman Singh',
    course: 'DCA Student',
    rating: 5,
    text: 'Affordable fees, friendly teachers and modern computers. The certificate is valid and helped me a lot. The best place in Phuldungri to learn computers.',
  },
];

export const FAQS = [
  {
    q: 'Where is IACT 2 Computers Education located?',
    a: 'We are located in Phuldungri, Ghatshila, Jharkhand 832303. You can find us easily on Google Maps or call 080925 76269 for directions.',
  },
  {
    q: 'Which courses do you offer?',
    a: 'We offer DCA, ADCA, Tally Prime with GST, MS Office, Web Designing, Programming (C/C++/Python), DTP, CCC, Typing & Data Entry and many more job-oriented courses.',
  },
  {
    q: 'Do you provide a valid certificate after the course?',
    a: 'Yes. We provide recognised certificates on successful completion of every course, which are valued by employers and useful for jobs.',
  },
  {
    q: 'Are the fees affordable? Can I pay in instalments?',
    a: 'Absolutely. Our course fees are budget-friendly and we offer easy instalment options so that money never comes in the way of your learning.',
  },
  {
    q: 'Do you offer placement assistance?',
    a: 'Yes. We provide dedicated placement support, interview preparation and job referrals to help our students start their careers.',
  },
  {
    q: 'What are the class timings?',
    a: 'We run flexible morning, afternoon and evening batches from Monday to Saturday (8:00 AM – 7:00 PM) and a special Sunday batch (9:00 AM – 2:00 PM).',
  },
];
