'use client';
import { useEffect, useCallback, useMemo } from 'react';
import { Howl } from 'howler';
import { useGameContext } from '../games/layout';
const bgSound = new Howl({
  src: ['/audios/bg.mp3'],
  preload: true,
  html5: true,
  pool: 5,
  loop: true,
  volume: 0.5,
});
const sounds = {
  win: new Howl({
    src: ['/audios/win.mp3'],
    preload: true,
    html5: true,
    pool: 5,
  }),
  mines: new Howl({
    src: ['/audios/mines.mp3'],
    preload: true,
    html5: true,
    pool: 5,
  }),
  gems: new Howl({
    src: ['/audios/gems.mp3'],
    preload: true,
    html5: true,
    pool: 5,
  }),
  check: new Howl({
    src: ['/audios/check.mp3'],
    preload: true,
    html5: true,
    pool: 5,
  }),
  bet: new Howl({
    src: ['/audios/bet.mp3'],
    preload: true,
    html5: true,
    pool: 5,
  }),
};

function useSound() {
  const { gameSettings } = useGameContext();

  useEffect(() => {
    // Stop all sounds when muted

    if (gameSettings?.sound) {
    } else {
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

  useEffect(() => {
    if (gameSettings?.music) {
      bgSound.play();
      bgSound.once('unlock', () => {
        bgSound.play();
      });
    } else {
      bgSound.stop();
    }
    return () => {
      bgSound.stop();
      bgSound.unload();
    };
  }, [gameSettings?.music, bgSound]);

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

  const stopSound = useCallback(
    (soundName) => {
      if (sounds[soundName]) {
        sounds[soundName].stop();
      }
    },
    [sounds]
  );

  return { playSound, stopSound };
}

export default useSound;
