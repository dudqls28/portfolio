import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import project1 from '../assets/img/project1_image.jpg';
const ProjectsSection : React.FC = () => {
    return (
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
                    src={project1}
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
                    src={project1}
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
      )
};

export default ProjectsSection;