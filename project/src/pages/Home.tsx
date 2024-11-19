import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Clock, Compass } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

const Home = () => {
  const { addTrack } = usePlaylist();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type === 'audio/mpeg') {
          const url = URL.createObjectURL(file);
          addTrack({
            title: file.name.replace('.mp3', ''),
            artist: '本地文件',
            url,
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
          });
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 px-4 pb-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            欢迎来到星空音乐
          </motion.h1>
          <p className="text-gray-300 text-lg">你的未来音乐伴侣</p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-400 border-dashed rounded-lg cursor-pointer hover:bg-purple-900/20 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-purple-400" />
              <p className="mb-2 text-xl text-gray-200">拖放音乐文件到这里</p>
              <p className="text-sm text-gray-400">或点击选择文件</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".mp3,audio/mpeg"
              multiple
              onChange={handleFileUpload}
            />
          </label>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-lg border border-purple-500/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">精选歌单</h2>
            </div>
            <p className="text-gray-400">即将推出精彩内容...</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-lg border border-purple-500/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">最近上传</h2>
            </div>
            <p className="text-gray-400">这里将显示您最近上传的音乐</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-lg border border-purple-500/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Compass className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">发现音乐</h2>
            </div>
            <p className="text-gray-400">探索更多精彩音乐，即将上线...</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;