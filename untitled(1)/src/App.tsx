import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import DrinksCarousel from './components/DrinksCarousel';
import Events from './components/Events';
import VideoGallery from './components/VideoGallery';
import GoogleReviews from './components/GoogleReviews';
import InstagramFeed from './components/InstagramFeed';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import InactivityModal from './components/InactivityModal';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <VideoGallery />
        <Menu />
        <DrinksCarousel />
        <Events />
        <GoogleReviews />
        <InstagramFeed />
        <LocationContact />
      </main>
      <Footer />
      <InactivityModal />
    </div>
  );
}
