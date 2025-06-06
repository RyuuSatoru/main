import React from 'react';
import { Home, UserPlus, LogIn, Brain, Trophy, LogOut, User, Settings, Calendar, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, currentUser, logout } = useApp();

  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'register', label: 'Đăng ký', icon: UserPlus, hideWhenLoggedIn: true },
    { id: 'login', label: 'Đăng nhập', icon: LogIn, hideWhenLoggedIn: true },
    { id: 'challenges', label: 'Thử thách', icon: Brain, requireAuth: true },
    { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Trophy },
    { id: 'events', label: 'Sự kiện', icon: Calendar },
    { id: 'forum', label: 'Diễn đàn', icon: MessageSquare, requireAuth: true },
    { id: 'profile', label: 'Hồ sơ', icon: User, requireAuth: true },
    { id: 'admin', label: 'Quản trị', icon: Settings, requireAuth: true, adminOnly: true },
  ];

  const handleMenuClick = (itemId: string) => {
    setCurrentPage(itemId);
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-cyan-500/20 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-mono">VAIC</h1>
            <p className="text-xs text-cyan-300">AI Club</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="p-4 border-b border-cyan-500/20">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center space-x-3 mb-2">
              {currentUser.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-cyan-300 text-sm font-mono">Xin chào,</p>
                <p className="text-white font-semibold text-sm">{currentUser.username}</p>
              </div>
            </div>
            <p className="text-green-400 text-sm font-mono">
              Điểm: {currentUser.score}
            </p>
            {currentUser.role === 'admin' && (
              <span className="inline-block mt-1 px-2 py-1 bg-purple-900/20 text-purple-400 border border-purple-500/50 rounded text-xs font-mono">
                ADMIN
              </span>
            )}
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems
            .filter(item => {
              if (item.hideWhenLoggedIn && currentUser) return false;
              if (item.requireAuth && !currentUser) return false;
              if (item.adminOnly && (!currentUser || currentUser.role !== 'admin')) return false;
              return true;
            })
            .map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-cyan-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-mono text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
        </ul>
      </nav>

      {/* Logout Button */}
      {currentUser && (
        <div className="p-4 border-t border-cyan-500/20">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-mono text-sm">Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;