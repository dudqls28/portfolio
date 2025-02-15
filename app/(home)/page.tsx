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

const MacDesktop: React.FC = () => {
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
    { id: 'home', icon: <Home size={32} />, label: 'Home', title: 'Welcome' },
    { id: 'about', icon: <User size={32} />, label: 'About', title: 'About Me' },
    { id: 'skills', icon: <Code size={32} />, label: 'Skills', title: 'My Skills' },
    { id: 'projects', icon: <FolderGit2 size={32} />, label: 'Projects', title: 'My Projects' },
    { id: 'contact', icon: <Mail size={32} />, label: 'Contact', title: 'Contact Me' },
    { id: 'settings', icon: <Settings size={32} />, label: 'Settings', title: 'Settings' },
    { id: 'browser', icon: <Chrome size={32} />, label: 'Links', title: 'Links' }
  ];

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
        position: { x: 50, y: 50 }, // 초기 위치 설정
        zIndex: newZIndex
      }];
    });
  };

  const handleWindowClose = (e: React.MouseEvent, id: string) => {
    console.log(e.target);
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
    // 창 닫기, 최소화 버튼들의 부모 div를 체크
    console.log(e.target);
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

    const handleTitleBarMouseDown = (e: React.MouseEvent) => {
      // 컨트롤 버튼들을 클릭했을 때는 드래그 시작하지 않음
      const controlsClicked = (e.target as HTMLElement).closest('.window-controls');
      if (controlsClicked) return;
      
      handleMouseDown(e, id);
    };

    return (
      <div 
        className={`absolute w-3/4 h-3/4 bg-white/90 backdrop-blur-md rounded-lg shadow-2xl
          transition-all duration-300
          ${window.isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        `}
        style={{
          transform: `translate(${window.position.x}px, ${window.position.y}px)`,
          zIndex: window.zIndex
        }}
      >
        <div 
          className="h-8 bg-gray-100 rounded-t-lg flex items-center justify-between px-4 cursor-move"
          onMouseDown={handleTitleBarMouseDown}
        >
          <div className="flex items-center space-x-2 window-controls">
            <button 
              onClick={(e) => {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();
                handleWindowClose(e, id);
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button 
              onClick={(e) => {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();
                handleWindowMinimize(e, id);
              }}
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
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
              <p className="text-gray-600">This is the home page content.</p>
            </div>
          )}
          {id === 'about' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">About Me</h1>
              <p className="text-gray-600">Here you can add your personal information.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="h-screen w-full bg-gradient-to-b from-blue-600 to-purple-600 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Menu Bar */}
      <div className="w-full h-7 bg-black/20 backdrop-blur-md fixed top-0 flex justify-between items-center px-4 text-white z-50">
        <div className="flex items-center space-x-4">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
          </svg>
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
              transition-opacity duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacDesktop;