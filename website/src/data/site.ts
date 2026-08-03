// Central source of truth for all business info & content.
// Edit values here to update the whole site.

export const SITE = {
  name: 'SMART COACHING CENTER',
  shortName: 'SMART',
  tagline: 'Excellence in Coaching • Competitive Exams & Academic Success',
  phoneDisplay: '08294103209',
  phoneRaw: '+918294103209', // for tel: links (drop leading 0, add +91)
  whatsapp: '918294103209', // for wa.me links
  email: 'contact@smartcoaching.in',
  addressLine1: 'Tata, Chaibasa Main Road',
  addressLine2: 'Gamdesai, Jharkhand 832113',
  addressFull: 'Tata, Chaibasa Main Road, Gamdesai, Jharkhand 832113',
  mapsLink: 'https://maps.app.goo.gl/pVwbVTqwLuSpWCgh8',
  mapsEmbed:
    'https://www.google.com/maps?q=Tata,+Chaibasa+Main+Road,+Gamdesai,+Jharkhand+832113&t=&z=15&ie=UTF8&iwloc=&output=embed',
  hours: 'Mon – Sat: 7:00 AM – 8:00 PM',
  hoursSunday: 'Sunday: 8:00 AM – 2:00 PM',
  established: 2010,
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
    title: 'Class 6th & 7th — All Subjects (JAC / CBSE)',
    code: 'CLASS-6-7',
    duration: 'Ongoing Batch',
    level: 'Foundation',
    description: 'Complete coaching for Class 6th and 7th covering all JAC and CBSE board subjects with regular tests and revision.',
    topics: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
    icon: 'BookOpen',
    popular: true,
  },
  {
    title: 'Board Exam Special — 8th, 9th, 10th (JAC & CBSE)',
    code: 'BOARD-8-10',
    duration: 'Full Year Program',
    level: 'Board Focused',
    description: 'Dedicated board exam coaching for 8th, 9th and 10th with JAC & CBSE syllabus, previous year papers and revision classes.',
    topics: ['Math', 'Science', 'Social Studies', 'English', 'Hindi', 'Board Practice'],
    icon: 'Award',
    popular: true,
  },
  {
    title: 'Arts & Science — 11th & 12th All Subjects',
    code: 'ARS-SCI-11-12',
    duration: '2 Year Program',
    level: 'Advanced',
    description: 'Full coaching for Arts and Science streams in 11th and 12th covering all board subjects with exam-oriented teaching.',
    topics: ['Physics / Chemistry', 'Mathematics', 'Biology', 'History / Geography', 'English & Hindi', 'Board Prep'],
    icon: 'GraduationCap',
    popular: true,
  },
];
export const STATS = [
  { value: 3500, suffix: '+', label: 'Students Trained' },
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 20, suffix: '+', label: 'Coaching Programs' },
  { value: 95, suffix: '%', label: 'Success Rate' },
];

export const FEATURES = [
  {
    icon: 'ShieldCheck',
    title: 'Exam-Focused Curriculum',
    text: 'Every module is designed around actual exam patterns — past papers, expected questions and scoring strategies.',
  },
  {
    icon: 'Users',
    title: 'Experienced Faculty',
    text: 'Learn from coaches who have years of exam-prep experience and understand exactly what students need to succeed.',
  },
  {
    icon: 'FileText',
    title: 'Modern Study Material',
    text: 'Get updated notes, practice books, online resources and video recordings for revision anytime, anywhere.',
  },
  {
    icon: 'ClipboardCheck',
    title: 'Regular Mock Tests',
    text: 'Weekly full-length mock tests with detailed analysis, ranking and personalized feedback to track progress.',
  },
  {
    icon: 'UserCheck',
    title: 'Small Batch Sizes',
    text: 'Limited seats per batch so every student gets individual attention, quick doubt solving and closer mentoring.',
  },
  {
    icon: 'Wallet',
    title: 'Affordable Fees',
    text: 'Quality coaching at honest, budget-friendly fees with easy monthly instalments so learning is never a burden.',
  },
];

// Gallery photos. Replace the files in public/images/ (same names) with your
// real photos, and edit the labels here if needed.
export const TEACHERS = [
  { name: 'Lochan Sir', role: 'Owner & Founder', rank: 1, image: 'https://i.ibb.co/fVdxSyys/Whats-App-Image-2026-08-01-at-11-44-39-PM-1.jpg', bio: 'Founder of SMART Coaching Center. Over 15 years guiding students to success.' },
  { name: 'Faculty Member 2', role: 'Senior Faculty', rank: 2, image: 'https://i.ibb.co/MkdT48j4/Whats-App-Image-2026-08-01-at-11-44-39-PM-2.jpg', bio: 'Expert in competitive exam mathematics and reasoning.' },
  { name: 'Dukhuram Baskey', role: 'Senior Faculty', rank: 3, image: 'https://i.ibb.co/gBfqkdS/Whats-App-Image-2026-08-01-at-11-42-48-PM.jpg', bio: 'M.Sc (Chemistry)' },
  { name: 'Payal Mam', role: 'Faculty', rank: 4, image: 'https://i.ibb.co/cXSNPfGm/Whats-App-Image-2026-08-01-at-11-44-58-PM-1.jpg', bio: 'B.Sc, Paramedical, Biology Specialist' },
  { name: 'Sona Tudu', role: 'Faculty', rank: 5, image: 'https://i.ibb.co/qYvr5LfM/Whats-App-Image-2026-08-01-at-11-44-38-PM.jpg', bio: 'BA (Santhali)' },
  { name: 'Sushanti Hembram', role: 'Faculty', rank: 6, image: 'https://i.ibb.co/8nn7yqf8/Whats-App-Image-2026-08-01-at-11-44-41-PM-1.jpg', bio: "Art's Special" },
];

export const GALLERY = [
  { src: 'https://i.ibb.co/CKPTrhjr/Screenshot-2026-07-31-151228.png', label: 'Smart Coaching — Group with Banner' },
  { src: 'https://i.ibb.co/pv5cYSL1/Screenshot-2026-07-31-151218.png', label: 'Students & Faculty — Outdoor Batch' },
  { src: 'https://i.ibb.co/p6TfYVTq/Screenshot-2026-07-31-151208.png', label: 'Close Group — Smart Coaching' },
  { src: 'https://i.ibb.co/GN22mDR/Screenshot-2026-07-31-151250.png', label: 'Indoor Classroom Session' },
  { src: 'https://i.ibb.co/99DTgnst/Screenshot-2026-07-31-151240.png', label: 'Centre Building & Signboard' },
  { src: 'https://i.ibb.co/TDx7qkbh/Whats-App-Image-2026-08-01-at-11-44-58-PM.jpg', label: 'Coaching Session' },
  { src: 'https://i.ibb.co/dsK4gFwS/Whats-App-Image-2026-08-01-at-11-44-57-PM.jpg', label: 'Student Guidance' },
  { src: 'https://i.ibb.co/ymhv56zz/Whats-App-Image-2026-08-01-at-11-44-41-PM.jpg', label: 'Classroom Learning' },
  { src: 'https://i.ibb.co/LD0MKkLp/Whats-App-Image-2026-08-01-at-11-44-40-PM.jpg', label: 'Exam Practice' },
  { src: 'https://i.ibb.co/Nnyj7qB4/Whats-App-Image-2026-08-01-at-11-44-39-PM.jpg', label: 'Study Material' },
  { src: 'https://i.ibb.co/6CWL2MJ/Whats-App-Image-2026-08-01-at-11-44-38-PM-1.jpg', label: 'Batch Learning' },
  { src: 'https://i.ibb.co/23s1qmVL/Whats-App-Image-2026-08-01-at-11-44-37-PM.jpg', label: 'Interactive Class' },
  { src: 'https://i.ibb.co/YBFF0tvg/Whats-App-Image-2026-08-01-at-11-44-36-PM.jpg', label: 'Success Moments' },
];

export const STEPS = [
  {
    no: '01',
    title: 'Visit or Call Us',
    text: 'Drop by SMART Coaching Center on Chaibasa Main Road, Gamdesai or call 08294103209. We help you pick the right course.',
  },
  {
    no: '02',
    title: 'Free Counselling',
    text: 'Get free expert counselling about exam targets, course duration, fees and the best batch schedule for you.',
  },
  {
    no: '03',
    title: 'Enroll & Start Learning',
    text: 'Complete a simple admission and begin regular classes with flexible morning, afternoon and evening batches.',
  },
  {
    no: '04',
    title: 'Mock Tests, Revision & Results',
    text: 'Take regular mock tests, attend revision classes and get result-focused guidance until you clear your exam.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ravi Kumar',
    course: 'SSC & Railway Program',
    rating: 5,
    text: 'SMART Coaching changed my life. The teachers are very clear and the mock tests really helped me understand my weak points. I cleared SSC CGL in my first attempt!',
  },
  {
    name: 'Priya Singh',
    course: 'Banking Exam Program',
    rating: 5,
    text: 'The banking course is excellent. Study material is updated and faculties teach with real exam examples. I got selected for SBI Clerk thanks to SMART.',
  },
  {
    name: 'Ankit Das',
    course: 'JEE Main & Advanced',
    rating: 5,
    text: 'Best coaching for JEE in the Tata region. The physics and math classes are exceptional. The small batch size means I never hesitate to ask doubts.',
  },
  {
    name: 'Sunita Kumari',
    course: 'NEET Program',
    rating: 5,
    text: 'As a NEET aspirant, I needed strong biology and chemistry coaching. SMART provided both with regular tests and revision. Highly recommended!',
  },
];

export const FAQS = [
  {
    q: 'Where is SMART Coaching Center located?',
    a: 'We are located at Tata, Chaibasa Main Road, Gamdesai, Jharkhand 832113 — easily reachable from Tata and Chaibasa. You can find directions on our Google Maps link.',
  },
  {
    q: 'Which exams and courses do you offer coaching for?',
    a: 'We offer coaching for SSC, Railway, Banking, Insurance, JEE, NEET, General Studies, Mathematics, English, Hindi and Coaching Basics with typing. We also provide interview preparation.',
  },
  {
    q: 'Do you provide study material and mock tests?',
    a: 'Yes. Every student receives updated printed and digital study material. We conduct weekly full-length mock tests with detailed analysis and ranking.',
  },
  {
    q: 'What are the batch sizes and timings?',
    a: 'We maintain small batches (max 20–25 students) for personal attention. Classes run from 7:00 AM to 8:00 PM on weekdays and 8:00 AM to 2:00 PM on Sunday.',
  },
  {
    q: 'Are the fees affordable? Is there a payment plan?',
    a: 'Yes. Our fees are kept affordable for every family. We offer monthly instalments and easy payment options so you can focus on learning without financial stress.',
  },
  {
    q: 'How can I enroll or ask more questions?',
    a: 'Call 08294103209, send a WhatsApp message to the same number or visit our centre directly. We also have a quick enquiry form on this website for instant response.',
  },
];
