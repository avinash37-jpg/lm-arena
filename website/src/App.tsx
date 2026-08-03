import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Admissions from './components/Admissions';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Teachers from './components/Teachers';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Courses />
        <WhyChooseUs />
        <Admissions />
        <Gallery />
        <Testimonials />
        <Faq />
        <LocationContact />
      <Teachers />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
