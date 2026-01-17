import React, { useState, useEffect } from 'react';
import heroImage from '../assets/hero1.webp';
import heroMobileImage from '../assets/hero_mobile.webp';

interface HeroV2Props {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export const HeroV2: React.FC<HeroV2Props> = ({ title, subtitle }) => {
  const width = useWindowWidth();
  const imageUrl = width < 768 ? heroMobileImage : heroImage;

  return (
    <section 
      style={{ 
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center center',
      }} 
      className="h-screen w-full bg-cover flex items-center"
    >
      <div className="ml-0 sm:ml-12 md:ml-24 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-black/70 p-8 sm:p-12 rounded-none sm:rounded-lg text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg sm:text-xl leading-8">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
