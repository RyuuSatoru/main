import React from 'react';
import { Users, Trophy, Brain, BookOpen, Code, Lightbulb, Target, Calendar, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { setCurrentPage, currentUser } = useApp();

  const handleJoinClick = () => {
    if (currentUser) {
      setCurrentPage('challenges');
    } else {
      setCurrentPage('register');
    }
  };

  const roadmapSteps = [
    {
      title: 'Khởi đầu với AI',
      description: 'Tìm hiểu các khái niệm cơ bản về trí tuệ nhân tạo',
      icon: BookOpen,
      color: 'from-green-400 to-cyan-500',
      topics: ['Machine Learning cơ bản', 'Python cho AI', 'Toán học AI']
    },
    {
      title: 'Thực hành Deep Learning',
      description: 'Xây dựng và huấn luyện mạng neural đầu tiên',
      icon: Brain,
      color: 'from-cyan-400 to-blue-500',
      topics: ['Neural Networks', 'TensorFlow/PyTorch', 'Computer Vision']
    },
    {
      title: 'Dự án thực tế',
      description: 'Áp dụng kiến thức vào các bài toán thực tế',
      icon: Code,
      color: 'from-blue-400 to-purple-500',
      topics: ['NLP Projects', 'Image Recognition', 'Data Analysis']
    },
    {
      title: 'Chuyên gia AI',
      description: 'Nghiên cứu sâu và đóng góp cho cộng đồng',
      icon: Star,
      color: 'from-purple-400 to-pink-500',
      topics: ['Research Papers', 'Open Source', 'AI Ethics']
    }
  ];

  const clubFeatures = [
    {
      icon: Users,
      title: 'Cộng đồng 500+ thành viên',
      description: 'Kết nối với những người đam mê AI từ khắp Việt Nam'
    },
    {
      icon: Calendar,
      title: 'Workshop hàng tuần',
      description: 'Các buổi học và thảo luận chuyên sâu về AI'
    },
    {
      icon: Trophy,
      title: 'Cuộc thi AI thường niên',
      description: 'Tham gia các cuộc thi lập trình AI với giải thưởng hấp dẫn'
    },
    {
      icon: Lightbulb,
      title: 'Mentorship 1-1',
      description: 'Được hướng dẫn bởi các chuyên gia AI hàng đầu'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Thành viên tích cực' },
    { number: '50+', label: 'Dự án AI hoàn thành' },
    { number: '20+', label: 'Workshop chuyên sâu' },
    { number: '95%', label: 'Tỷ lệ hài lòng' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 font-mono">
            Chào mừng đến với
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              VAIC AI Club
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nơi kết nối những tâm hồn đam mê trí tuệ nhân tạo. Khám phá, học hỏi và thử thách bản thân 
            cùng cộng đồng AI hàng đầu Việt Nam.
          </p>
          
          <button
            onClick={handleJoinClick}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <span className="font-mono">
              {currentUser ? 'Bắt đầu thử thách' : 'Tham gia ngay'}
            </span>
            <Brain className="w-5 h-5 group-hover:animate-pulse" />
            
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">Thử thách trí tuệ</h3>
            <p className="text-slate-300 leading-relaxed">
              Giải quyết các câu hỏi về AI, machine learning và deep learning với độ khó tăng dần.
            </p>
          </div>
          
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-600 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">Cộng đồng sôi động</h3>
            <p className="text-slate-300 leading-relaxed">
              Kết nối với những người cùng đam mê AI, chia sẻ kiến thức và học hỏi lẫn nhau.
            </p>
          </div>
          
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-6">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">Bảng xếp hạng</h3>
            <p className="text-slate-300 leading-relaxed">
              Tranh tài với các thành viên khác và leo lên vị trí cao nhất trong bảng xếp hạng.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">Về VAIC AI Club</h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto">
              VAIC AI Club được thành lập với mục tiêu tạo ra một cộng đồng học tập AI chất lượng cao, 
              nơi mọi người có thể phát triển kỹ năng, mở rộng kiến thức và cùng nhau xây dựng tương lai 
              của trí tuệ nhân tạo tại Việt Nam. Chúng tôi tin rằng AI không chỉ là công nghệ, 
              mà là chìa khóa mở ra những cơ hội vô hạn.
            </p>
          </div>

          {/* Club Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {clubFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-slate-300">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-cyan-400 font-mono mb-2">
                  {achievement.number}
                </div>
                <div className="text-slate-300 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Roadmap */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">Lộ trình học tập</h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Từ người mới bắt đầu đến chuyên gia AI, chúng tôi có lộ trình học tập phù hợp cho mọi cấp độ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="text-sm text-cyan-400 font-mono mb-2">Bước {index + 1}</div>
                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-300 text-sm mb-4">{step.description}</p>
                    
                    <div className="space-y-2">
                      {step.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-slate-400 text-xs">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Arrow connector */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-cyan-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4 font-mono">Sẵn sàng bắt đầu hành trình AI?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Tham gia cùng hàng trăm thành viên khác trong việc khám phá và chinh phục thế giới trí tuệ nhân tạo. 
            Hành trình của bạn bắt đầu từ đây!
          </p>
          <button
            onClick={handleJoinClick}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="font-mono">
              {currentUser ? 'Tiếp tục học tập' : 'Đăng ký miễn phí'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;