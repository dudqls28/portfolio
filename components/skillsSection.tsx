import React from 'react';

const SkiilsSection: React.FC = () => {
    return (
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
      )
}

export default SkiilsSection;