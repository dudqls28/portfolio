import React, { useState, useEffect, memo} from 'react';
import { Code2, Database, Smartphone, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  isWindowOpen: boolean;
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    title: "Frontend Development",
    icon: <Code2 size={24} />,
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: "React/Next.js", level: 'Expert', percentage: 90 },
      { name: "TypeScript", level: 'Expert', percentage: 90 },
      { name: "HTML/CSS", level: 'Expert', percentage: 90 },
      { name: "JavaScript", level: 'Expert', percentage: 90 },
      { name: "Tailwind CSS", level: 'Advanced', percentage: 85 },
    ]
  },
  {
    id: 'backend',
    title: "Backend Development",
    icon: <Database size={24} />,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: "Node.js", level: 'Advanced', percentage: 85 },
      { name: "Python", level: 'Advanced', percentage: 80 },
      { name: "Java", level: 'Advanced', percentage: 80 },
      { name: "Spring", level: 'Advanced', percentage: 80 },
    ]
  },
  {
    id: 'mobile',
    title: "Mobile Development",
    icon: <Smartphone size={24} />,
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: "React Native", level: 'Advanced', percentage: 75 },
      { name: "Android", level: 'Advanced', percentage: 75 },
    ]
  }
];

const toolsData = [
  { name: "Git", category: "Version Control" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Figma", category: "Design" },
  { name: "Postman", category: "API" },
  { name: "Jira", category: "Project Management" },
  { name: "Notion", category: "Documentation" },
  { name: "Slack", category: "Communication" },
];

const SkillBar = memo(({ skill, color }: { skill: Skill; color: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Reset width when skill changes
    setWidth(0);
    const timer = setTimeout(() => {
      setWidth(skill.percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [skill.percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">{skill.name}</span>
        <span className={`text-sm font-medium px-2 py-1 rounded-full
          ${skill.level === 'Expert' ? 'bg-blue-100 text-blue-600' :
            skill.level === 'Advanced' ? 'bg-green-100 text-green-600' :
            skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
            'bg-gray-100 text-gray-600'}`}>
          {skill.level}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
});

const ToolCard = memo(({ name, category }: { name: string; category: string }) => {
  return (
    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300">
      <div className="text-gray-700 font-medium">{name}</div>
      <div className="text-sm text-gray-500 mt-1">{category}</div>
    </div>
  );
});

const SkillsSection: React.FC<SkillsSectionProps> = memo(({ isWindowOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend');
  const [activeSkills, setActiveSkills] = useState<Skill[]>(skillsData[0].skills);
  const [activeColor, setActiveColor] = useState<string>(skillsData[0].color);

  const handleCategoryChange = (categoryId: string) => {
    const category = skillsData.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(categoryId);
      setActiveSkills(category.skills);
      setActiveColor(category.color);
    }
  };

  useEffect(() => {
    if (isWindowOpen) {
      // Reset animations when window opens
      const category = skillsData.find(cat => cat.id === selectedCategory);
      if (category) {
        setActiveSkills(category.skills);
        setActiveColor(category.color);
      }
    }
  }, [isWindowOpen, selectedCategory]);

  return (
    <div className="p-6 space-y-8">
      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {skillsData.map((category) => (
          <button
            key={category.id}
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지
              handleCategoryChange(category.id);
            }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium
              transition-all duration-300 whitespace-nowrap
              ${selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                : 'bg-white/60 text-gray-600 hover:bg-white/80'
              }
            `}
          >
            {category.icon}
            {category.title}
          </button>
        ))}
      </div>

      {/* Skills Display */}
      <div key={selectedCategory} className="space-y-6 animate-fadeIn">
        {activeSkills.map((skill) => (
          <SkillBar
            key={`${selectedCategory}-${skill.name}`}
            skill={skill}
            color={activeColor}
          />
        ))}
      </div>

      {/* Tools Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-800">
          <Wrench size={20} />
          <h3 className="text-lg font-semibold">Tools & Technologies</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toolsData.map((tool) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              category={tool.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';
ToolCard.displayName = 'ToolCard';
SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;