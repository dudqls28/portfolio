import React from 'react';
import { Mail } from 'lucide-react';
const ContactSection : React.FC = () => {
    return (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">Get in touch</h3>
                <p className="text-gray-600">
                  프로젝트 협업이나 채용 관련 문의를 환영합니다.
                  이메일이나 소셜 미디어를 통해 연락해주세요.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-600" size={20} />
                  <span className="text-gray-600">dudqls28@naver.com</span>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white/50 rounded-lg p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">메시지</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="메시지를 입력하세요"
                  ></textarea>
                </div>
                <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      )
}

export default ContactSection;