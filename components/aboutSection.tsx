import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Book, Award, Terminal, Users, Briefcase, Heart } from 'lucide-react';
import myImage from '../assets/img/myImage.jpg';

const AboutSection: React.FC = () => {
  return (
    <div className="h-[calc(100%-2rem)] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-full p-6">
        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {/* About Me Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-200">
              About Me
            </h2>
            
            <div className="prose prose-sm space-y-4">
              <p className="text-gray-600 leading-relaxed">
                안녕하세요! 풀스택 개발자 임영빈입니다. 
                사용자 중심의 웹 서비스를 개발하는 것을 즐기며, 
                새로운 기술을 학습하고 적용하는 것을 좋아합니다.
              </p>
              
              {/* Development Philosophy */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                  <Terminal className="w-6 h-6 text-blue-500 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-2">개발 철학</h3>
                  <p className="text-gray-600 text-sm">
                    "사용자 경험을 최우선으로 생각하며, 확장 가능하고 유지보수가 용이한 코드를 작성하는 것을 추구합니다."
                  </p>
                </div>
                <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
                  <Heart className="w-6 h-6 text-red-500 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-2">열정 분야</h3>
                  <p className="text-gray-600 text-sm">
                    "새로운 기술 학습과 팀 협업을 통한 성장, 그리고 효율적인 개발 프로세스 구축에 큰 관심이 있습니다."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200">
              Experience
            </h3>
            <div className="space-y-8">
              {/* Current Position */}
              <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-blue-500 to-purple-500">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[7px]" />
                <div className="p-6 bg-white/40 backdrop-blur-sm rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">(주)이엘온소프트</h4>
                      <p className="text-sm text-gray-600 mt-1">대리 / 금융사업팀</p>
                    </div>
                    <span className="text-sm text-gray-500">2025.02 - Present</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">주요 프로젝트</h5>
                      <div className="space-y-3">
                        <div className="p-3 bg-white/60 rounded-lg">
                          <h6 className="font-medium text-gray-800">책무구조도 시스템 개발</h6>
                          <p className="text-sm text-gray-600 mt-1">
                            조직의 업무 프로세스와 책임 구조를 시각화하고 관리하는 시스템 개발
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Next.js</span>
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">NestJS</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">PostgreSQL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Position */}
              <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-purple-500 to-pink-500">
                <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -translate-x-[7px]" />
                <div className="p-6 bg-white/40 backdrop-blur-sm rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">(주)한울아이씨티</h4>
                      <p className="text-sm text-gray-600 mt-1">대리 / 헬스케어 사업부</p>
                    </div>
                    <span className="text-sm text-gray-500">2021.01 - 2024.12</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">주요 프로젝트</h5>
                      <div className="space-y-3">
                        <div className="p-3 bg-white/60 rounded-lg">
                          <h6 className="font-medium text-gray-800">삼성생명 더헬스 앱 운영</h6>
                          <p className="text-sm text-gray-600 mt-1">
                            건강관리 서비스 앱 운영 및 신규 기능 개발
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">React Native</span>
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Spring</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">Oracle</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-white/60 rounded-lg">
                          <h6 className="font-medium text-gray-800">전주 대자인병원 장비 인터페이스 솔루션</h6>
                          <p className="text-sm text-gray-600 mt-1">
                            의료장비 데이터 통합 및 관리 시스템 개발
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Node.js</span>
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">HL7</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">MySQL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Profile Image */}
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

          {/* Info Cards */}
          <div className="space-y-6 sticky top-4">
            {/* Personal Info */}
            <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200 mb-4">
                Personal Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">1996.03.21</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">서울특별시</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200 mb-4">
                <Book className="w-4 h-4 inline-block mr-2" />
                Education
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="text-gray-700 font-medium">학점은행제 (컴퓨터공학)</div>
                  <div className="text-gray-500 text-sm">2024.02</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b-2 border-gray-200 mb-4">
                <Award className="w-4 h-4 inline-block mr-2" />
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
  );
};

export default AboutSection;