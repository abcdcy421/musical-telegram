import React from 'react';
import { motion } from 'framer-motion';
import { User, Music, Heart, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 px-4 pb-32"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">用户名</h1>
              <p className="text-gray-400">user@example.com</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Music className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold">我的音乐</h2>
              </div>
              <p className="text-gray-400">0 首歌曲</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Heart className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold">收藏</h2>
              </div>
              <p className="text-gray-400">0 个收藏</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold">设置</h2>
              </div>
              <p className="text-gray-400">账号管理</p>
            </motion.div>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              退出登录
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;