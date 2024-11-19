import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, User, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="backdrop-blur-lg bg-black/30 fixed w-full z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Music2 className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            星空音乐
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300"
                >
                  <User className="w-5 h-5" />
                  <span>个人中心</span>
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={logout}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300"
              >
                <LogOut className="w-5 h-5" />
                <span>退出登录</span>
              </motion.button>
            </>
          ) : (
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300"
              >
                <LogIn className="w-5 h-5" />
                <span>登录</span>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;