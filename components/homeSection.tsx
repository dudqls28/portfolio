import React from 'react';
import { Code, Users, Briefcase, Award } from 'lucide-react';

interface HomeSectionProps {
    onOpenSection: (sectionId: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onOpenSection }) => {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                임영빈의 개발 이야기
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
                안녕하세요! 저는 프론트엔드와 백엔드를 아우르는 5년차 풀스택 개발자로, 
                창의적인 문제 해결과 아름다운 사용자 경험을 만드는 개발자입니다.
                다양한 산업에서의 경험을 바탕으로 효율적이고 혁신적인 
                사용자 중심의 웹 애플리케이션을 만들고, 새로운 기술을 학습하며 성장하는 것을 즐깁니다.
            </p>
            {/* Stats Section */}
            <div className="grid grid-cols-4 gap-6">
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-gray-800">4+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg text-center">
                <Code className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-gray-800">15+</div>
                <div className="text-sm text-gray-600">Tech Stack</div>
                </div>
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-gray-800">30+</div>
                <div className="text-sm text-gray-600">Team Collaborations</div>
                </div>
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold text-gray-800">10+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
            </div>
            
            {/* Expertise Section */}
            <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Frontend Development</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">HTML</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">React</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">TypeScript</span>
                </div>
                </div>
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Backend Development</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Java</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Node.js</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Python</span>
                </div>
                </div>
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Mobile Development</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">React Native</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">Android</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">Swift</span>
                </div>
                </div>
            </div>
            {/* Recent Projects */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Recent Side Projects</h2>
                <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">사이드 프로젝트 1</h3>
                    <p className="text-gray-600 mb-4">사이드 프로젝트 1</p>
                    <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Next.js</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">NestJS</span>
                    </div>
                </div>
                <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">사이드 프로젝트 2</h3>
                    <p className="text-gray-600 mb-4">사이드 프로젝트 2</p>
                    <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">React Native</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Spring</span>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex space-x-4">
                <button 
                    onClick={() => onOpenSection('projects')}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                프로젝트 보기
                </button>
                <button 
                    onClick={() => onOpenSection('contact')}
                    className="px-6 py-2 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                연락하기
                </button>
            </div>
        </div>
    )
}

export default HomeSection;