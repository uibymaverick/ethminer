'use client';
import { useEffect, useCallback, useMemo } from 'react';
import { Howl } from 'howler';
import { useGameContext } from '../games/layout';

function useSound() {
  const { gameSettings } = useGameContext();

  const sounds = useMemo(
    () => ({
      win: new Howl({
        src: ['/audios/win.mp3'],
        preload: true,
        html5: true,
        pool: 2,
      }),
      mines: new Howl({
        src: ['/audios/mines.mp3'],
        preload: true,
        html5: true,
        pool: 2,
      }),
      gems: new Howl({
        src: ['/audios/gems.mp3'],
        preload: true,
        html5: true,
        pool: 2,
      }),
      check: new Howl({
        src: ['/audios/check.mp3'],
        preload: true,
        html5: true,
        pool: 2,
      }),
      bet: new Howl({
        src: ['/audios/bet.mp3'],
        preload: true,
        html5: true,
        pool: 2,
      }),
    }),
    []
  );

  useEffect(() => {
    // Stop all sounds when muted
    if (!gameSettings?.sound) {
      Object.values(sounds).forEach((sound) => {
        sound.stop();
      });
    }

    // Cleanup function to stop all sounds when component unmounts
    return () => {
      Object.values(sounds).forEach((sound) => {
        sound.stop();
        sound.unload();
      });
    };
  }, [gameSettings?.sound, sounds]);

  const playSound = useCallback(
    (soundName) => {
      if (sounds[soundName] && gameSettings?.sound) {
        try {
          sounds[soundName].play();
        } catch (error) {
          console.error('Error playing sound:', error);
        }
      }
    },
    [gameSettings?.sound, sounds]
  );

  return { playSound };
}

export default useSound;
