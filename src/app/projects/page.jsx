'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiCalendar } from 'react-icons/fi';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({ 
    name: '', 
    description: '', 
    start_date: '', 
    end_date: '' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 실제 구현에서는 서버에서 데이터를 가져와야 합니다
  useEffect(() => {
    // 임시 데이터
    setProjects([
      { 
        id: 1, 
        name: '웹 애플리케이션 개발', 
        description: '고객사 웹 애플리케이션 개발 프로젝트',
        start_date: '2025-01-01',
        end_date: '2025-06-30'
      },
      { 
        id: 2, 
        name: '모바일 앱 개발', 
        description: '안드로이드/iOS 앱 개발',
        start_date: '2025-02-15',
        end_date: '2025-08-15'
      },
      { 
        id: 3, 
        name: '시스템 유지보수', 
        description: '기존 시스템 유지보수 및 개선',
        start_date: '2025-01-01',
        end_date: '2025-12-31'
      },
      { 
        id: 4, 
        name: '클라우드 마이그레이션', 
        description: '온프레미스 시스템의 클라우드 이전',
        start_date: '2025-03-01',
        end_date: '2025-07-31'
      }
    ]);
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setIsEditing(true);
    } else {
      setCurrentProject({ name: '', description: '', start_date: '', end_date: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // 프로젝트 정보 수정
      const updatedProjects = projects.map(proj => 
        proj.id === currentProject.id ? currentProject : proj
      );
      setProjects(updatedProjects);
    } else {
      // 새 프로젝트 추가
      const newProject = {
        id: projects.length + 1,
        ...currentProject
      };
      setProjects([...projects, newProject]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      setProjects(projects.filter(proj => proj.id !== id));
    }
  };

  const filteredProjects = projects.filter(proj => 
    proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">프로젝트 관리</h1>
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiPlus className="mr-2" /> 프로젝트 추가
          </button>
        </div>

        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="프로젝트명 또는 설명 검색..."
            className="pl-10 w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시작일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종료일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{project.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.start_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.end_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(project)} 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 프로젝트 추가/수정 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? '프로젝트 정보 수정' : '새 프로젝트 추가'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    프로젝트명
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={currentProject.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    설명
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentProject.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_date">
                    시작일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      id="start_date"
                      name="start_date"
                      type="date"
                      value={currentProject.start_date}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_date">
                    종료일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={currentProject.end_date}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    {isEditing ? '수정' : '추가'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
