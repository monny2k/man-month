'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiCalendar } from 'react-icons/fi';

export default function ManmonthsPage() {
  const [manmonths, setManmonths] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentManmonth, setCurrentManmonth] = useState({ 
    employee_id: '', 
    project_id: '', 
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    manmonth_value: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState(0); // 0은 모든 월

  // 실제 구현에서는 서버에서 데이터를 가져와야 합니다
  useEffect(() => {
    // 임시 직원 데이터
    setEmployees([
      { id: 1, name: '홍길동', department_name: '개발팀' },
      { id: 2, name: '김철수', department_name: '기획팀' },
      { id: 3, name: '이영희', department_name: '디자인팀' },
      { id: 4, name: '박지성', department_name: '개발팀' },
      { id: 5, name: '손흥민', department_name: '마케팅팀' }
    ]);
    
    // 임시 프로젝트 데이터
    setProjects([
      { id: 1, name: '웹 애플리케이션 개발' },
      { id: 2, name: '모바일 앱 개발' },
      { id: 3, name: '시스템 유지보수' },
      { id: 4, name: '클라우드 마이그레이션' }
    ]);
    
    // 임시 맨먼스 데이터
    setManmonths([
      { 
        id: 1, 
        employee_id: 1, 
        employee_name: '홍길동',
        project_id: 1, 
        project_name: '웹 애플리케이션 개발',
        year: 2025,
        month: 1,
        manmonth_value: 1.0
      },
      { 
        id: 2, 
        employee_id: 1, 
        employee_name: '홍길동',
        project_id: 3, 
        project_name: '시스템 유지보수',
        year: 2025,
        month: 1,
        manmonth_value: 0.2
      },
      { 
        id: 3, 
        employee_id: 2, 
        employee_name: '김철수',
        project_id: 2, 
        project_name: '모바일 앱 개발',
        year: 2025,
        month: 1,
        manmonth_value: 1.0
      },
      { 
        id: 4, 
        employee_id: 3, 
        employee_name: '이영희',
        project_id: 2, 
        project_name: '모바일 앱 개발',
        year: 2025,
        month: 1,
        manmonth_value: 0.5
      },
      { 
        id: 5, 
        employee_id: 4, 
        employee_name: '박지성',
        project_id: 1, 
        project_name: '웹 애플리케이션 개발',
        year: 2025,
        month: 2,
        manmonth_value: 1.0
      }
    ]);
  }, []);

  const handleOpenModal = (manmonth = null) => {
    if (manmonth) {
      setCurrentManmonth(manmonth);
      setIsEditing(true);
    } else {
      setCurrentManmonth({ 
        employee_id: '', 
        project_id: '', 
        year: filterYear || new Date().getFullYear(),
        month: filterMonth || new Date().getMonth() + 1,
        manmonth_value: ''
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentManmonth({ 
      ...currentManmonth, 
      [name]: name === 'manmonth_value' ? parseFloat(value) : 
              (name === 'year' || name === 'month' || name === 'employee_id' || name === 'project_id') ? 
              parseInt(value) : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const employee = employees.find(emp => emp.id === parseInt(currentManmonth.employee_id));
    const project = projects.find(proj => proj.id === parseInt(currentManmonth.project_id));
    
    if (isEditing) {
      // 맨먼스 정보 수정
      const updatedManmonths = manmonths.map(mm => 
        mm.id === currentManmonth.id ? {
          ...currentManmonth,
          employee_name: employee?.name,
          project_name: project?.name
        } : mm
      );
      setManmonths(updatedManmonths);
    } else {
      // 새 맨먼스 추가
      const newManmonth = {
        id: manmonths.length + 1,
        ...currentManmonth,
        employee_name: employee?.name,
        project_name: project?.name
      };
      setManmonths([...manmonths, newManmonth]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 맨먼스 데이터를 삭제하시겠습니까?')) {
      setManmonths(manmonths.filter(mm => mm.id !== id));
    }
  };

  // 필터링된 맨먼스 데이터
  const filteredManmonths = manmonths.filter(mm => {
    const matchesSearch = 
      mm.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mm.project_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = filterYear ? mm.year === parseInt(filterYear) : true;
    const matchesMonth = filterMonth ? mm.month === parseInt(filterMonth) : true;
    
    return matchesSearch && matchesYear && matchesMonth;
  });

  // 월 이름 배열
  const monthNames = [
    '전체', '1월', '2월', '3월', '4월', '5월', '6월', 
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">맨먼스 입력</h1>
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiPlus className="mr-2" /> 맨먼스 추가
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="직원 또는 프로젝트 검색..."
              className="pl-10 w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value={2024}>2024년</option>
              <option value={2025}>2025년</option>
              <option value={2026}>2026년</option>
            </select>
          </div>
          
          <div>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">직원</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">맨먼스</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredManmonths.map((manmonth) => (
                <tr key={manmonth.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manmonth.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{manmonth.employee_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manmonth.project_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manmonth.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manmonth.month}월</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manmonth.manmonth_value.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(manmonth)} 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(manmonth.id)} 
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

        {/* 맨먼스 추가/수정 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? '맨먼스 정보 수정' : '새 맨먼스 추가'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employee_id">
                    직원
                  </label>
                  <select
                    id="employee_id"
                    name="employee_id"
                    value={currentManmonth.employee_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">직원 선택</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.department_name})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project_id">
                    프로젝트
                  </label>
                  <select
                    id="project_id"
                    name="project_id"
                    value={currentManmonth.project_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">프로젝트 선택</option>
                    {projects.map(proj => (
                      <option key={proj.id} value={proj.id}>{proj.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                      연도
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={currentManmonth.year}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value={2024}>2024년</option>
                      <option value={2025}>2025년</option>
                      <option value={2026}>2026년</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
                      월
                    </label>
                    <select
                      id="month"
                      name="month"
                      value={currentManmonth.month}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}월</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manmonth_value">
                    맨먼스 (MM)
                  </label>
                  <input
                    id="manmonth_value"
                    name="manmonth_value"
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="1.0"
                    value={currentManmonth.manmonth_value}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">0.1 ~ 1.0 사이의 값 (0.1 단위)</p>
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
