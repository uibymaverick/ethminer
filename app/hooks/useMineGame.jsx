'use client';
import { useState } from 'react';
import Notify from '../components/Notification';

export function useMineGame() {
  const [gameState, setGameState] = useState({
    gems: [],
    isPlaying: false,
    selectedTiles: [],
    multiplier: 1,
    roundId: null,
  });

  const placeBet = (amount, numberOfGems) => {
    numberOfGems = 25 - numberOfGems;
    setGameState({
      gems: [],
      isPlaying: false,
      selectedTiles: [],
      multiplier: 1,
      roundId: null,
    });
    if (gameState.isPlaying) return;
    if (amount < 1) return;
    if (numberOfGems < 1) return;
    if (numberOfGems > 24) return;
    // Create array of 25 positions
    const positions = Array.from({ length: 25 }, (_, i) => i);

    // Randomly select positions for gems
    const gems = [];
    for (let i = 0; i < numberOfGems; i++) {
      const randomIndex = Math.floor(Math.random() * positions.length);
      gems.push(positions[randomIndex]);
      positions.splice(randomIndex, 1);
    }

    // Generate unique round ID
    const roundId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    setGameState({
      gems,
      isPlaying: true,
      selectedTiles: [],
      multiplier: 1,
      betAmount: amount,
      roundId,
    });
    Notify.success('Game started');
  };

  const checkIsGem = (index) => {
    if (!gameState.isPlaying) return false;

    // Add tile to selected
    setGameState((prev) => ({
      ...prev,
      selectedTiles: [...prev.selectedTiles, index],
    }));

    // Check if gem exists at index
    const isGem = gameState.gems.includes(index);

    if (!isGem) {
      // Game over
      setGameState((prev) => ({
        ...prev,
        isPlaying: false,
      }));
      Notify.failure('Game over');
      return false;
    } else {
      // Update multiplier - increases with each correct guess
      setGameState((prev) => ({
        ...prev,
        multiplier: prev.multiplier * 1.2,
      }));
      return true;
    }
  };

  const cashout = () => {
    if (!gameState.isPlaying) return { winnings: 0, roundId: null };

    const winnings = gameState.betAmount * gameState.multiplier;

    // Reset game state
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
    }));
    Notify.success(`cashout successful ${winnings}`);
  };

  return {
    placeBet,
    checkIsGem,
    cashout,
    gameState,
  };
}
