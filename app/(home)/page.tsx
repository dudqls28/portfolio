"use client"
import React, { useState, useEffect, useCallback, memo } from 'react';
import { Home, User, Code, FolderGit2, Mail, Settings, Chrome, Clock, Zap } from 'lucide-react';
import "tailwindcss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSection from '../../components/homeSection';
import AboutSection from '../../components/aboutSection';
import SkiilsSection from '../../components/skillsSection';
import ProjectsSection from '../../components/projectsSection';
import ContactSection from '../../components/contactSection';
import SkillsSection from '../../components/skillsSection';
import TimelineSection from '../../components/timelineSection';

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
        Been's Portfolio
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
    { id: 'timeline', icon: <Clock size={32} />, label: 'Timeline', title: 'My Journey' }
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
  // Dock hover 핸들러 메모이제이션
  const handleDockHover = useCallback((id: string | null) => {
    setHoveredDockItem(id);
  }, []);

  // 드래그 이벤트 핸들러 메모이제이션
  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest('.window-controls') || 
        (e.target as HTMLElement).tagName === 'BUTTON') {
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
  }, [windows, maxZIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
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
  }, [dragState]);

  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging) {
      setDragState({
        isDragging: false,
        windowId: null,
        startPos: { x: 0, y: 0 },
        startOffset: { x: 0, y: 0 }
      });
    }
  }, [dragState.isDragging]);

  const Window = memo(({ id, title }: { id: string; title: string }) => {
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
      >
        <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-between px-4 cursor-move" 
        onMouseDown={(e) => handleMouseDown(e, id)}>
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
           {id === 'home' && <HomeSection onOpenSection={handleWindowOpen} />}

          {id === 'about' && <AboutSection />}

          {id === 'skills' && <SkillsSection isWindowOpen={window.isOpen} />}

          {id === 'projects' && <ProjectsSection />}

          {id === 'contact' && <ContactSection />}
          
          {id === 'timeline' && <TimelineSection />}
        </div>
      </div>
    );
  });

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
              onMouseEnter={() => handleDockHover(item.id)}
              onMouseLeave={() => handleDockHover(null)}
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

export default memo(MacDesktop);