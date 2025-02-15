"use client"
import React, { useState, useEffect } from 'react';
import { Home, User, Code, FolderGit2, Mail, Settings, Chrome } from 'lucide-react';
import "tailwindcss";

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
        Loading your space...
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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      return [...prev, { 
        id, 
        isOpen: true, 
        isMinimized: false,
        position: { x: 50, y: 50 },
        zIndex: newZIndex
      }];
    });
  };

  const handleWindowClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false } : w
    ));
  };

  const handleWindowMinimize = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

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

    return (
      <div 
        className={`absolute w-3/4 h-3/4 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl
          transition-all duration-300
          ${window.isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        `}
        style={{
          transform: `translate(${window.position.x}px, ${window.position.y}px)`,
          zIndex: window.zIndex
        }}
        onMouseDown={(e) => handleMouseDown(e, id)}
      >
        <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-between px-4 cursor-move">
          <div className="flex items-center space-x-2 window-controls">
            <button 
              onMouseDown={(e) => handleWindowClose(e, id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button 
              onMouseDown={(e) => handleWindowMinimize(e, id)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <button 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
            {title}
          </div>
        </div>

        <div className="p-6">
          {id === 'home' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                임영빈의 개발 이야기
              </h1>
              <p className="text-gray-600 text-lg">
                안녕하세요! 창의적인 문제 해결과 아름다운 사용자 경험을 만드는 개발자입니다.
              </p>
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
        {/* 산 모양의 배경 요소 */}
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