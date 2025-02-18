import React, { memo } from 'react';
import {  Briefcase, GraduationCap, Code, Award } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'project' | 'achievement';
  details?: string[];
  technologies?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: '2025.02 - Present',
    title: '(주)이엘온소프트',
    description: '금융사업팀 대리',
    type: 'work',
    details: [
      '책무구조도 시스템 개발',
      '조직 프로세스 관리 시스템 구축',
      'Next.js, NestJS 기반 웹 애플리케이션 개발'
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript']
  },
  {
    id: 2,
    date: '2021.01 - 2024.12',
    title: '(주)한울아이씨티',
    description: '헬스케어 사업부 대리',
    type: 'work',
    details: [
      '삼성생명 더헬스 앱 운영 및 개발',
      '전주 대자인병원 장비 인터페이스 솔루션 개발',
      'React Native, Spring 기반 모바일/웹 애플리케이션 개발'
    ],
    technologies: ['React Native', 'Spring', 'Oracle', 'Node.js', 'HL7']
  },
  {
    id: 3,
    date: '2024.02',
    title: '학점은행제 컴퓨터공학',
    description: '학사 학위 취득',
    type: 'education'
  },
  {
    id: 4,
    date: '2021.12',
    title: 'JLPT N1 취득',
    description: '일본어 능력 최고 등급 취득',
    type: 'achievement'
  }
];

const getIconByType = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'work':
      return <Briefcase className="w-6 h-6" />;
    case 'education':
      return <GraduationCap className="w-6 h-6" />;
    case 'project':
      return <Code className="w-6 h-6" />;
    case 'achievement':
      return <Award className="w-6 h-6" />;
    default:
      return null;
  }
};

const getGradientByType = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'work':
      return 'from-blue-500 to-cyan-400';
    case 'education':
      return 'from-purple-500 to-pink-500';
    case 'project':
      return 'from-green-500 to-emerald-400';
    case 'achievement':
      return 'from-yellow-500 to-orange-400';
    default:
      return 'from-gray-500 to-gray-400';
  }
};

const TimelineSection: React.FC = memo(() => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-200">
        Timeline
      </h2>

      <div className="relative space-y-8">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative pl-16">
            {/* Dot */}
            <div 
              className={`absolute left-7 w-4 h-4 rounded-full -translate-x-1/2 
                bg-gradient-to-r ${getGradientByType(event.type)}`}
            />

            <div className="relative">
              {/* Event Card */}
              <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 space-y-4 
                transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/50">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradientByType(event.type)} text-white`}>
                        {getIconByType(event.type)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>

                {event.details && (
                  <div className="space-y-2">
                    <ul className="space-y-1">
                      {event.details.map((detail, i) => (
                        <li key={i} className="text-gray-600 text-sm flex items-center space-x-2">
                          <span className="w-1 h-1 rounded-full bg-gray-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {event.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TimelineSection.displayName = 'TimelineSection';

export default TimelineSection;