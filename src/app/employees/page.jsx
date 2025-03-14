'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({ name: '', department_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 실제 구현에서는 서버에서 데이터를 가져와야 합니다
  useEffect(() => {
    // 임시 데이터
    setDepartments([
      { id: 1, name: '개발팀' },
      { id: 2, name: '기획팀' },
      { id: 3, name: '디자인팀' },
      { id: 4, name: '마케팅팀' },
      { id: 5, name: '경영지원팀' }
    ]);
    
    setEmployees([
      { id: 1, name: '홍길동', department_id: 1, department_name: '개발팀' },
      { id: 2, name: '김철수', department_id: 2, department_name: '기획팀' },
      { id: 3, name: '이영희', department_id: 3, department_name: '디자인팀' },
      { id: 4, name: '박지성', department_id: 1, department_name: '개발팀' },
      { id: 5, name: '손흥민', department_id: 4, department_name: '마케팅팀' }
    ]);
  }, []);

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setIsEditing(true);
    } else {
      setCurrentEmployee({ name: '', department_id: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // 직원 정보 수정
      const updatedEmployees = employees.map(emp => 
        emp.id === currentEmployee.id 
          ? { 
              ...currentEmployee, 
              department_name: departments.find(d => d.id === parseInt(currentEmployee.department_id))?.name 
            } 
          : emp
      );
      setEmployees(updatedEmployees);
    } else {
      // 새 직원 추가
      const newEmployee = {
        id: employees.length + 1,
        ...currentEmployee,
        department_id: parseInt(currentEmployee.department_id),
        department_name: departments.find(d => d.id === parseInt(currentEmployee.department_id))?.name
      };
      setEmployees([...employees, newEmployee]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 직원을 삭제하시겠습니까?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">직원 관리</h1>
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiPlus className="mr-2" /> 직원 추가
          </button>
        </div>

        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="직원 또는 부서 검색..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">부서</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(employee)} 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(employee.id)} 
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

        {/* 직원 추가/수정 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? '직원 정보 수정' : '새 직원 추가'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    이름
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={currentEmployee.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department_id">
                    부서
                  </label>
                  <select
                    id="department_id"
                    name="department_id"
                    value={currentEmployee.department_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">부서 선택</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
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
