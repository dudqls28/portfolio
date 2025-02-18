import React, { useState, memo } from 'react';
import { Mail, Github, Linkedin, Send, AlertCircle, Book } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactSection: React.FC = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.message.trim()) {
      newErrors.message = '메시지를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // 에러가 있었다면 실시간으로 제거
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 여기에 실제 폼 제출 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1500)); // 임시 딜레이
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputWrapper: React.FC<{
    label: string;
    error?: string;
    children: React.ReactNode;
  }> = memo(({ label, error, children }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  ));

  InputWrapper.displayName = 'InputWrapper';

  return (
    <div className="container max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Contact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Get in touch</h3>
            <p className="text-gray-600 leading-relaxed">
              프로젝트 협업이나 채용 관련 문의를 환영합니다.
              이메일이나 소셜 미디어를 통해 연락해주세요.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <a 
              href="mailto:dudqls28@naver.com"
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-colors">
                <Mail size={20} />
              </div>
              <span>dudqls28@naver.com</span>
            </a>

            <div className="flex space-x-4 pt-4">
              <a 
                href="https://github.com/dudqls28" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/50 hover:bg-white/80 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://blog.naver.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/50 hover:bg-white/80 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Book size={24} />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">근무 시간</h4>
            <p className="text-gray-600">
              월요일 - 금요일: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputWrapper label="이름" error={errors.name}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2`}
                placeholder="이름을 입력하세요"
                disabled={isSubmitting}
              />
            </InputWrapper>

            <InputWrapper label="이메일" error={errors.email}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2`}
                placeholder="이메일을 입력하세요"
                disabled={isSubmitting}
              />
            </InputWrapper>

            <InputWrapper label="메시지" error={errors.message}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.message 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 h-32 resize-none`}
                placeholder="메시지를 입력하세요"
                disabled={isSubmitting}
              />
            </InputWrapper>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full px-6 py-2 rounded-lg flex items-center justify-center space-x-2
                bg-gradient-to-r from-blue-500 to-purple-600 text-white
                hover:opacity-90 transition-opacity
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>전송 중...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>메시지 보내기</span>
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg flex items-center space-x-2">
                <span>메시지가 성공적으로 전송되었습니다!</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center space-x-2">
                <AlertCircle size={18} />
                <span>메시지 전송에 실패했습니다. 다시 시도해주세요.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;