import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, List, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlaylist } from '../context/PlaylistContext';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, playlist, nextTrack, previousTrack, setCurrentTrack } = usePlaylist();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      const time = percentage * audioRef.current.duration;
      audioRef.current.currentTime = time;
    }
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 w-full bg-black/80 backdrop-blur-lg border-t border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Progress Bar */}
        <div 
          className="h-1 w-full bg-gray-600 rounded-full mb-3 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={currentTrack?.cover || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
              alt="封面"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-white font-medium">{currentTrack?.title || "未选择歌曲"}</h3>
              <p className="text-gray-400 text-sm">{currentTrack?.artist || "未知艺术家"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousTrack}
              className="text-purple-400 hover:text-purple-300"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-400"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTrack}
              className="text-purple-400 hover:text-purple-300"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleMute}
              className="text-purple-400 hover:text-purple-300"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-purple-500"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-purple-400 hover:text-purple-300"
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showPlaylist && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full mb-2 w-72 right-4 bg-black/90 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20"
            >
              <h3 className="text-lg font-semibold mb-3">播放列表</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {playlist.map((track, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
                      currentTrack === track ? 'bg-purple-500/20' : 'hover:bg-purple-500/10'
                    }`}
                    onClick={() => setCurrentTrack(track)}
                  >
                    <img src={track.cover} alt={track.title} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                  </motion.div>
                ))}
                {playlist.length === 0 && (
                  <p className="text-gray-400 text-center">播放列表为空</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <audio 
        ref={audioRef}
        src={currentTrack?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
    </motion.div>
  );
};

export default MusicPlayer;