"use client"
import React, { useState, useEffect } from 'react';
import { Home, User, Code, FolderGit2, Mail, Settings, Chrome } from 'lucide-react';
import Image from 'next/image';
import myImage from '../../assets/img/myImage.jpg';
import "tailwindcss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
}

interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

interface DragState {
  isDragging: boolean;
  windowId: string | null;
  startPos: { x: number; y: number };
  startOffset: { x: number; y: number };
}

const LoadingScreen: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-7xl font-bold text-white mb-8 tracking-wide">
        Been
      </div>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-gray-400 mt-4">
        Loading been space...
      </div>
    </div>
  );
};

const MacDesktop: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [hoveredDockItem, setHoveredDockItem] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    windowId: null,
    startPos: { x: 0, y: 0 },
    startOffset: { x: 0, y: 0 }
  });
  const [maxZIndex, setMaxZIndex] = useState(1);
  
  const dockItems: DockItem[] = [
    { id: 'home', icon: <Home size={32} />, label: 'Home', title: 'Welcome to Been\'s Space' },
    { id: 'about', icon: <User size={32} />, label: 'About', title: 'About Been' },
    { id: 'skills', icon: <Code size={32} />, label: 'Skills', title: 'Been\'s Skills' },
    { id: 'projects', icon: <FolderGit2 size={32} />, label: 'Projects', title: 'Been\'s Projects' },
    { id: 'contact', icon: <Mail size={32} />, label: 'Contact', title: 'Contact Been' },
    { id: 'settings', icon: <Settings size={32} />, label: 'Settings', title: 'Preferences' },
    { id: 'browser', icon: <Chrome size={32} />, label: 'Links', title: 'Been\'s Links' }
  ];
  /* 로딩바 */
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          handleWindowOpen('home');
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    /*unmount시 타임클리어어 */
    return () => clearInterval(timer);
  }, []);
  /*시간체크 */
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    }, 1000);
    /*unmount시 타임클리어어 */
    return () => clearInterval(timer);
  }, []);
  /* 화면 오픈 이벤트 */
  const handleWindowOpen = (id: string) => {
    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === id);
      if (existingWindow) {
        const newZIndex = maxZIndex + 1;
        setMaxZIndex(newZIndex);
        return prev.map(w => 
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: newZIndex } : w
        );
      }

      // 화면 중앙 위치 계산
      const windowWidth = window.innerWidth * 0.75; // 윈도우 너비 (w-3/4)
      const windowHeight = window.innerHeight * 0.75; // 윈도우 높이 (h-3/4)
      const centerX = (window.innerWidth - windowWidth) / 2;
      const centerY = (window.innerHeight - windowHeight) / 2;

      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      return [...prev, { 
        id, 
        isOpen: true, 
        isMinimized: false,
        position: { x: centerX, y: centerY },
        zIndex: newZIndex
      }];
    });
  };
  /** 화면 종료 이벤트 */
  const handleWindowClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const targetWindow = windows.find(w => w.id === id);
    if (!targetWindow) return;

    // 먼저 최소화 애니메이션 실행
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));

    // 애니메이션이 끝난 후 창 닫기
    setTimeout(() => {
      setWindows(prev => prev.map(w => 
        w.id === id ? { ...w, isOpen: false } : w
      ));
    }, 500); // transition-duration과 일치
  };
  /** 화면 최소화 이벤트트 */
  const handleWindowMinimize = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };
  /** 드래그 이벤트 클릭 시  */
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest('.window-controls')) {
      return;
    }
  
    const window = windows.find(w => w.id === id);
    if (!window) return;
  
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
  
    setDragState({
      isDragging: true,
      windowId: id,
      startPos: { x: e.clientX, y: e.clientY },
      startOffset: window.position
    });
  };
  /** 마우스 이동 이벤트 */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.windowId) return;

    const deltaX = e.clientX - dragState.startPos.x;
    const deltaY = e.clientY - dragState.startPos.y;

    setWindows(prev => prev.map(w => 
      w.id === dragState.windowId
        ? {
            ...w,
            position: {
              x: dragState.startOffset.x + deltaX,
              y: dragState.startOffset.y + deltaY
            }
          }
        : w
    ));
  };
 
  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      windowId: null,
      startPos: { x: 0, y: 0 },
      startOffset: { x: 0, y: 0 }
    });
  };

  const Window: React.FC<{ id: string; title: string; }> = ({ id, title }) => {
    const window = windows.find(w => w.id === id);
    if (!window?.isOpen) return null;

    const transitionClass = dragState.isDragging ? '' : 'transition-all duration-500 ease-in-out';

    return (
      <div 
        className={`absolute w-3/4 h-3/4 
          bg-white/95 backdrop-blur-md rounded-lg shadow-2xl
          ${transitionClass}
          ${window.isMinimized ? 'opacity-0 scale-75 translate-y-full' : 'opacity-100 scale-100 translate-y-0'}
        `}
        style={{
          transform: `translate3d(${window.position.x}px, ${window.position.y}px, 0)`,
          zIndex: window.zIndex,
        }}
        onMouseDown={(e) => handleMouseDown(e, id)}
      >
        <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-between px-4 cursor-move">
          <div className="flex items-center space-x-2 window-controls">
            <button 
              onMouseDown={(e) => handleWindowClose(e, id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
              
            />
            <button 
              onMouseDown={(e) => handleWindowMinimize(e, id)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 transform hover:scale-110"
            />
            <button 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
            {title}
          </div>
        </div>

        <div className={`
          p-6 h-[calc(100%-2rem)] overflow-auto
          transition-all duration-500 ease-in-out
          ${window.isMinimized ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
           {id === 'home' && (
            <div className="space-y-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                임영빈의 개발 이야기
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                안녕하세요! 저는 프론트엔드와 백엔드를 아우르는 풀스택 개발자로, 
                창의적인 문제 해결과 아름다운 사용자 경험을 만드는 개발자입니다.
                다양한 산업에서의 경험을 바탕으로 효율적이고 혁신적인 
                사용자 중심의 웹 애플리케이션을 만들고, 새로운 기술을 학습하며 성장하는 것을 즐깁니다.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Frontend</h3>
                  <p className="text-gray-600">HTML, JS, React, TypeScript, CSS</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Backend</h3>
                  <p className="text-gray-600">Java, JSP,  Python, Node.js, Express</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Database</h3>
                  <p className="text-gray-600">Oracle, MySQL, Elastic, MariaDB</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">FrontEnd Framework</h3>
                  <p className="text-gray-600">Next.js,Tailwind CSS </p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">BackEnd Framework</h3>
                  <p className="text-gray-600">Spring, NestJS, Eclipse, 전자정부 프레임워크</p>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Mobile App</h3>
                  <p className="text-gray-600">React Native, AndroidStudio, Swift</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  프로젝트 보기
                </button>
                <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  연락하기
                </button>
              </div>
            </div>
          )}

          {id === 'about' && (
            <div className="h-[calc(100%-2rem)] overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-full p-6">
                <div className="md:col-span-3 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-200">
                    About Me
                  </h2>
                  
                  <div className="prose prose-sm">
                    <p className="text-gray-600 leading-relaxed">
                      안녕하세요! 풀스택 개발자 임영빈입니다.
                      사용자 중심의 웹 서비스를 개발하는 것을 즐기며, 
                      새로운 기술을 학습하고 적용하는 것을 좋아합니다.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                        Experience
                      </h3>
                      <div className="space-y-6">
                        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-blue-500 to-purple-500">
                          <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[7px]" />
                          <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">(주)이엘온소프트</h4>
                                <p className="text-sm text-gray-600 mt-1">대리 / 금융사업팀</p>
                              </div>
                              <span className="text-sm text-gray-500">2025.02 - Present</span>
                            </div>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              <li>책무구조도 시스템 개발</li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-purple-500 to-pink-500">
                          <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -translate-x-[7px]" />
                          <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">(주)한울아이씨티</h4>
                                <p className="text-sm text-gray-600 mt-1">대리 / 헬스케어 사업부</p>
                              </div>
                              <span className="text-sm text-gray-500">2021.01 - 2024.12</span>
                            </div>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              <li>삼성생명 더헬스 앱 운영(24.06 ~ 24.12)</li>
                              <li>전주 대자인병원 장비 인터페이스 솔루션 개발(23.11 ~ 24.06)</li>
                              <li>산림청 R&D 재활운동 분석 시스템 시각화 개발 (23.06 ~ 23.11)</li>
                              <li>국군의무사령부 차세대 병원정보시스템 개발(22.12 ~ 23.06)</li>
                              <li>삼성생명 더헬스 앱 2차 고도화 개발(22.04 ~ 22.12)</li>
                              <li>LH 스마트홈 사용자 하이브리드앱 개발(21.06 ~ 22.02)</li>
                              <li>RIS(방사선정보시스템) 개발(21.01 ~ 21.05)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 relative">
                      <div className="w-full h-full rounded-full border-4 border-white/50 shadow-xl overflow-hidden">
                        <Image 
                          src={myImage}
                          alt="Profile"
                          fill
                          className="object-cover rounded-full"
                          sizes="(max-width: 768px) 100vw, 192px"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 sticky top-4">
                    <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                        Personal Info
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700 font-medium min-w-[80px]">Birth</span>
                          <span className="text-gray-600">1996.03.21</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700 font-medium min-w-[80px]">Phone</span>
                          <span className="text-gray-600">010-3672-1855</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                        Education
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">학점은행제 (컴퓨터공학)</span>
                        <span className="text-gray-500 text-sm">2024.02</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                        Certifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">JLPT N1</span>
                          <span className="text-gray-500 text-sm">2021.12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">정보처리산업기사</span>
                          <span className="text-gray-500 text-sm">2020.12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">컴퓨터활용능력 1급</span>
                          <span className="text-gray-500 text-sm">2020.07</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {id === 'skills' && (
            <div className="grid grid-cols-2 gap-8 p-6">
              {/* Frontend */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                  Frontend
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">HTML</span>
                      <span className="text-gray-600">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">React</span>
                      <span className="text-gray-600">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">JavaScript</span>
                      <span className="text-gray-600">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">TypeScript</span>
                      <span className="text-gray-600">90%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">CSS</span>
                      <span className="text-gray-600">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                  Backend
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Node.js</span>
                      <span className="text-gray-600">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Python</span>
                      <span className="text-gray-600">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Java</span>
                      <span className="text-gray-600">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">JSP</span>
                      <span className="text-gray-600">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                  Database
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">MySQL</span>
                      <span className="text-gray-600">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">MongoDB</span>
                      <span className="text-gray-600">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile App */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                  Mobile App
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">React Native</span>
                      <span className="text-gray-600">75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Android</span>
                      <span className="text-gray-600">75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools & Others - 전체 너비 사용 */}
              <div className="col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
                  Tools & Others
                </h3>
                <div className="grid grid-cols-4 gap-4">  {/* 4열 그리드로 변경 */}
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Git</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Docker</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">AWS</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Figma</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Postman</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Jira</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Notion</span>
                  </div>
                  <div className="p-3 bg-white/40 backdrop-blur-sm rounded-lg text-center">
                    <span className="text-gray-700">Slack</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {id === 'projects' && (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-200">
                Projects
              </h2>
              
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={4000}
                className="project-carousel"
              >
                {/* 프로젝트 1 */}
                <div className="p-4">
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg overflow-hidden">
                    <div className="relative h-[300px]">
                      <Image
                        src="/path/to/project1-image.jpg"
                        alt="Project 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800">프로젝트 제목</h3>
                      <p className="text-gray-600">프로젝트 설명</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">React</span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Node.js</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">TypeScript</span>
                      </div>
                      <div className="flex gap-4">
                        <a 
                          href="https://github.com/username/project" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <span>GitHub</span>
                        </a>
                        <a 
                          href="https://project-demo.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 프로젝트 2 */}
                <div className="p-4">
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg overflow-hidden">
                    <div className="relative h-[300px]">
                      <Image
                        src="/path/to/project1-image.jpg"
                        alt="Project 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800">프로젝트 제목2</h3>
                      <p className="text-gray-600">프로젝트 설명2</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">React</span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Node.js</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">TypeScript</span>
                      </div>
                      <div className="flex gap-4">
                        <a 
                          href="https://github.com/username/project" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <span>GitHub</span>
                        </a>
                        <a 
                          href="https://project-demo.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          )}

          {id === 'contact' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700">Get in touch</h3>
                    <p className="text-gray-600">
                      프로젝트 협업이나 채용 관련 문의를 환영합니다.
                      이메일이나 소셜 미디어를 통해 연락해주세요.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-gray-600" size={20} />
                      <span className="text-gray-600">dudqls28@naver.com</span>
                    </div>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-github text-2xl"></i>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-linkedin text-2xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">메시지</label>
                      <textarea
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="메시지를 입력하세요"
                      ></textarea>
                    </div>
                    <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                      보내기
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && <LoadingScreen progress={progress} />}
      <div 
        className={`h-screen w-full relative overflow-hidden transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: `
            linear-gradient(170deg, 
              rgba(58, 141, 186, 0.9) 0%, 
              rgba(199, 144, 207, 0.9) 40%, 
              rgba(139, 164, 212, 0.9) 70%, 
              rgba(89, 124, 182, 0.9) 100%
            ),
            radial-gradient(circle at 50% 50%, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(0, 0, 0, 0.1) 100%
            )
          `,
          backgroundBlendMode: 'overlay'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* 그라데이션 배경 요소 */}
        <div 
          className="absolute bottom-0 left-0 w-full h-2/3 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 100%, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.1) 100%
              )
            `
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 70% 100%, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.1) 100%
              )
            `
          }}
        />

        {/* Menu Bar */}
        <div className="w-full h-7 bg-black/20 backdrop-blur-md fixed top-0 flex justify-between items-center px-4 text-white z-50">
          <div className="flex items-center space-x-4 font-medium">
            Been's Space
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Windows */}
        {dockItems.map(item => (
          <Window key={item.id} id={item.id} title={item.title} />
        ))}

        {/* Dock */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-end space-x-2 bg-white/20 backdrop-blur-md p-2 rounded-2xl">
          {dockItems.map((item) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredDockItem(item.id)}
              onMouseLeave={() => setHoveredDockItem(null)}
              onClick={() => handleWindowOpen(item.id)}
            >
              <div 
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 
                  ${hoveredDockItem === item.id ? 'scale-125 bg-white/30' : 'hover:bg-white/10'}
                  ${windows.find(w => w.id === item.id)?.isOpen ? 'bg-white/20' : ''}
                `}
              >
                <div className="text-white">
                  {item.icon}
                </div>
              </div>
              
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 
                ${hoveredDockItem === item.id ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-200 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MacDesktop;