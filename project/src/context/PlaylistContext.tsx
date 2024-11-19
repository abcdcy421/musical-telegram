import React, { createContext, useContext, useState } from 'react';

interface Track {
  title: string;
  artist: string;
  url: string;
  cover: string;
}

interface PlaylistContextType {
  currentTrack: Track | null;
  playlist: Track[];
  addTrack: (track: Track) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setCurrentTrack: (track: Track) => void;
}

const PlaylistContext = createContext<PlaylistContextType>({} as PlaylistContextType);

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  const addTrack = (track: Track) => {
    setPlaylist([...playlist, track]);
    if (currentTrackIndex === -1) {
      setCurrentTrackIndex(0);
    }
  };

  const setCurrentTrack = (track: Track) => {
    const index = playlist.indexOf(track);
    if (index !== -1) {
      setCurrentTrackIndex(index);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  return (
    <PlaylistContext.Provider 
      value={{
        currentTrack: currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null,
        playlist,
        addTrack,
        nextTrack,
        previousTrack,
        setCurrentTrack
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};