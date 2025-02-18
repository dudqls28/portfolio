import React, { memo } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import { Github, ExternalLink } from 'lucide-react';
import projectImage from "../assets/img/project1_image.jpg";
interface Project {
  id: number;
  title: string;
  description: string;
  image: any;
  technologies: Array<{
    name: string;
    color: string;
  }>;
  links: {
    github?: string;
    demo?: string;
  };
  period: string;
  type: 'company' | 'personal';
}

const projects: Project[] = [
  {
    id: 1,
    title: '책무구조도 시스템',
    description: '조직의 업무 프로세스와 책임 구조를 시각화하고 관리하는 시스템. 부서별 업무 흐름을 다이어그램으로 표현하고, 담당자 할당 및 업무 진행 상황을 추적할 수 있습니다.',
    image: projectImage,
    technologies: [
      { name: 'Next.js', color: 'blue' },
      { name: 'NestJS', color: 'green' },
      { name: 'PostgreSQL', color: 'yellow' }
    ],
    links: {
      demo: 'https://project-demo.com'
    },
    period: '2025.02 - Present',
    type: 'company'
  },
  {
    id: 2,
    title: '삼성생명 더헬스 앱',
    description: '보험 고객을 위한 건강관리 서비스 앱 운영 및 신규 기능 개발. 건강 데이터 분석, 운동 추천, 보험 연계 서비스 등을 제공합니다.',
    image: projectImage,
    technologies: [
      { name: 'React Native', color: 'blue' },
      { name: 'Spring', color: 'green' },
      { name: 'Oracle', color: 'yellow' }
    ],
    links: {
      demo: 'https://project-demo.com'
    },
    period: '2023.01 - 2024.12',
    type: 'company'
  }
];

const ProjectCard: React.FC<{ project: Project }> = memo(({ project }) => {
  return (
    <div className="p-4">
      <div className="bg-white/40 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative h-[300px] group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <p className="text-sm mb-2">{project.period}</p>
              <p className="text-lg font-medium mb-4">{project.type === 'company' ? '회사 프로젝트' : '개인 프로젝트'}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-1 rounded-full text-sm
                  ${tech.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    tech.color === 'green' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ExternalLink size={20} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsSection: React.FC = memo(() => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    customPaging: (i: number) => (
      <div className="w-2 h-2 mx-1 rounded-full bg-gray-400 hover:bg-gray-600 transition-colors" />
    )
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <div className="space-x-2">
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            All
          </button>
          <button className="px-4 py-2 text-sm bg-white/50 text-gray-600 rounded-lg hover:bg-white/80 transition-colors">
            Company
          </button>
          <button className="px-4 py-2 text-sm bg-white/50 text-gray-600 rounded-lg hover:bg-white/80 transition-colors">
            Personal
          </button>
        </div>
      </div>

      <Slider {...sliderSettings} className="project-carousel -mx-4">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Slider>

      <style jsx global>{`
        .project-carousel .slick-dots {
          bottom: -30px;
        }
        .project-carousel .slick-dots li button:before {
          display: none;
        }
        .project-carousel .slick-prev,
        .project-carousel .slick-next {
          z-index: 10;
          width: 40px;
          height: 40px;
        }
        .project-carousel .slick-prev {
          left: 10px;
        }
        .project-carousel .slick-next {
          right: 10px;
        }
      `}</style>
    </div>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;