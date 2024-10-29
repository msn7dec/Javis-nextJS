'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, Pause, Music, VolumeX } from 'lucide-react';

export default function JarvisUI() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate AI response after a delay
      setTimeout(() => {
        setResponse(
          "Certainly, sir. I've analyzed the data and prepared a report on the latest clean energy developments. Would you like me to display it on the main screen?"
        );
        setShowResponse(true);
      }, 2000);
    } else {
      setShowResponse(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => {
        setShowResponse(false);
      }, 10000); // Hide response after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [showResponse]);

  return (
    <div className="h-screen w-full bg-jarvis-dark-500 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl aspect-video bg-jarvis-dark-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Background hexagon grid */}
        <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4 opacity-20">
          {[...Array(72)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-jarvis-blue-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 4,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          <motion.div
            className="w-48 h-48 rounded-full border-4 border-jarvis-blue-500 flex items-center justify-center mb-8"
            animate={{
              scale: isListening ? [1, 1.1, 1] : 1,
            }}
            transition={{
              repeat: isListening ? Infinity : 0,
              duration: 1,
            }}
          >
            <motion.div
              className="w-40 h-40 rounded-full bg-jarvis-blue-500 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleListening}
            >
              {isListening ? (
                <Pause className="w-16 h-16 text-white" />
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-jarvis-blue-500 text-center max-w-2xl"
              >
                <p className="text-lg font-semibold mb-2">Jarvis:</p>
                <p className="text-white">{response}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated circles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full border border-jarvis-blue-500 opacity-20"
            style={{ x: '-50%', y: '-50%' }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 60,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full border border-jarvis-blue-400 opacity-30"
            style={{ x: '-50%', y: '-50%' }}
            animate={{
              rotate: -360,
            }}
            transition={{
              repeat: Infinity,
              duration: 45,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full border border-jarvis-blue-300 opacity-40"
            style={{ x: '-50%', y: '-50%' }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: 'linear',
            }}
          />
        </div>

        {/* Music control */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={toggleMusic}
            className="bg-jarvis-blue-500 text-white p-2 rounded-full hover:bg-jarvis-blue-600 transition-colors"
            aria-label={
              isMusicPlaying
                ? 'Pause background music'
                : 'Play background music'
            }
          >
            {isMusicPlaying ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Music className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Audio player */}
        <audio
          ref={audioRef}
          loop
          crossOrigin="anonymous"
          src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_1MB_MP3.mp3"
        />
      </div>
    </div>
  );
}
