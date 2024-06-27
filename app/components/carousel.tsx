'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGithub, FaLock } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Image {
  src: string;
  alt: string;
  text: string;
  title: string;
  index: number;
  languages: string;
  link: string;
  github: string;
}

const ImageCarousel = ({ images }: { images: Image[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      handlePrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <main className="flex flex-col items-center justify-between p-2 sm:p-4">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-1/3 space-y-3 sm:space-y-4">
            <p className="text-4xl sm:text-5xl lg:text-7xl text-center lg:text-left font-extrabold text-outline text-transparent group-hover:text-outline-hover">
              {images[currentIndex].index.toString().padStart(2, '0')}
            </p>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-center lg:text-left font-semibold">
              {images[currentIndex].title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-left text-gray-400">
              {images[currentIndex].text}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-left text-blue-700">
              {images[currentIndex].languages}
            </p>
            <div className="border-b border-white border-opacity-40 w-4/5 mx-auto lg:w-full"></div>
            <div className="flex justify-center lg:justify-start space-x-4">
              {images[currentIndex].link ? (
                <div className="p-1 sm:p-2 w-fit border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                  <a
                    href={images[currentIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaArrowUpLong
                      className="rotate-45 hover:rotate-0 transition-transform duration-300 ease-in-out"
                      size={20}
                    />
                  </a>
                </div>
              ) : (
                <div className="p-1 sm:p-2 w-fit border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                  <FaLock size={20} />
                </div>
              )}
              {images[currentIndex].github ? (
                <div className="p-1 sm:p-2 w-fit border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                  <a
                    href={images[currentIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              ) : (
                <div className="p-1 sm:p-2 w-fit border-2 text-blue-900 hover:text-black border-blue-900 rounded-full hover:bg-blue-900 hover:border-blue-900 cursor-pointer">
                  <FaLock size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Right side: Image and Navigation */}
          <div className="w-full lg:w-2/3 relative">
            <div
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] relative cursor-pointer p-4 "
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-full h-full relative overflow-visible">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  style={{
                    objectFit: 'contain',
                    transformOrigin: 'center center',
                  }}
                  className="z-10 hover:scale-105 transition-transform duration-300 ease-in-out"
                  priority
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute right-0 flex space-x-2 mt-4">
              <button
                className="bg-opacity-50 p-1 sm:p-2 bg-blue-800"
                onClick={handlePrevious}
              >
                <MdKeyboardArrowLeft className="text-lg sm:text-xl lg:text-2xl text-black" />
              </button>
              <button
                className="bg-opacity-50 p-1 sm:p-2 bg-blue-800"
                onClick={handleNext}
              >
                <MdKeyboardArrowRight className="text-lg sm:text-xl lg:text-2xl text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImageCarousel;
