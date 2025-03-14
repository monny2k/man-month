'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function DashboardPage() {
  const [manmonths, setManmonths] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // 실제 구현에서는 서버에서 데이터를 가져와야 합니다
  useEffect(() => {
    // 임시 맨먼스 데이터
    const dummyManmonths = [
      { employee_id: 1, employee_name: '홍길동', department_id: 1, department_name: '개발팀', project_id: 1, project_name: '웹 애플리케이션 개발', year: 2025, month: 1, manmonth_value: 1.0 },
      { employee_id: 1, employee_name: '홍길동', department_id: 1, department_name: '개발팀', project_id: 3, project_name: '시스템 유지보수', year: 2025, month: 1, manmonth_value: 0.2 },
      { employee_id: 2, employee_name: '김철수', department_id: 2, department_name: '기획팀', project_id: 2, project_name: '모바일 앱 개발', year: 2025, month: 1, manmonth_value: 1.0 },
      { employee_id: 3, employee_name: '이영희', department_id: 3, department_name: '디자인팀', project_id: 2, project_name: '모바일 앱 개발', year: 2025, month: 1, manmonth_value: 0.5 },
      { employee_id: 4, employee_name: '박지성', department_id: 1, department_name: '개발팀', project_id: 1, project_name: '웹 애플리케이션 개발', year: 2025, month: 2, manmonth_value: 1.0 },
      { employee_id: 1, employee_name: '홍길동', department_id: 1, department_name: '개발팀', project_id: 1, project_name: '웹 애플리케이션 개발', year: 2025, month: 2, manmonth_value: 0.8 },
      { employee_id: 2, employee_name: '김철수', department_id: 2, department_name: '기획팀', project_id: 2, project_name: '모바일 앱 개발', year: 2025, month: 2, manmonth_value: 1.0 },
      { employee_id: 3, employee_name: '이영희', department_id: 3, department_name: '디자인팀', project_id: 2, project_name: '모바일 앱 개발', year: 2025, month: 2, manmonth_value: 0.7 },
      { employee_id: 5, employee_name: '손흥민', department_id: 4, department_name: '마케팅팀', project_id: 4, project_name: '클라우드 마이그레이션', year: 2025, month: 3, manmonth_value: 0.5 },
      { employee_id: 1, employee_name: '홍길동', department_id: 1, department_name: '개발팀', project_id: 1, project_name: '웹 애플리케이션 개발', year: 2025, month: 3, manmonth_value: 0.7 },
      { employee_id: 4, employee_name: '박지성', department_id: 1, department_name: '개발팀', project_id: 4, project_name: '클라우드 마이그레이션', year: 2025, month: 3, manmonth_value: 1.0 },
      { employee_id: 2, employee_name: '김철수', department_id: 2, department_name: '기획팀', project_id: 2, project_name: '모바일 앱 개발', year: 2025, month: 3, manmonth_value: 0.8 },
    ];
    
    setManmonths(dummyManmonths);
    
    // 선택된 연도의 데이터만 필터링
    const filteredData = dummyManmonths.filter(mm => mm.year === selectedYear);
    
    // 월별 맨먼스 합계 계산
    const monthlyTotals = Array(12).fill(0).map((_, i) => ({
      month: `${i + 1}월`,
      value: 0
    }));
    
    filteredData.forEach(mm => {
      monthlyTotals[mm.month - 1].value += mm.manmonth_value;
    });
    
    setMonthlyData(monthlyTotals);
    
    // 프로젝트별 맨먼스 합계 계산
    const projectTotals = {};
    filteredData.forEach(mm => {
      if (!projectTotals[mm.project_id]) {
        projectTotals[mm.project_id] = {
          name: mm.project_name,
          value: 0
        };
      }
      projectTotals[mm.project_id].value += mm.manmonth_value;
    });
    
    setProjectData(Object.values(projectTotals));
    
    // 부서별 맨먼스 합계 계산
    const departmentTotals = {};
    filteredData.forEach(mm => {
      if (!departmentTotals[mm.department_id]) {
        departmentTotals[mm.department_id] = {
          name: mm.department_name,
          value: 0
        };
      }
      departmentTotals[mm.department_id].value += mm.manmonth_value;
    });
    
    setDepartmentData(Object.values(departmentTotals));
    
  }, [selectedYear]);

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-md"
          >
            <option value={2024}>2024년</option>
            <option value={2025}>2025년</option>
            <option value={2026}>2026년</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 월별 맨먼스 차트 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">월별 맨먼스</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="맨먼스" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 프로젝트별 맨먼스 분포 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">프로젝트별 맨먼스 분포</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toFixed(1)} MM`, '맨먼스']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 부서별 맨먼스 분포 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">부서별 맨먼스 분포</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toFixed(1)} MM`, '맨먼스']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 맨먼스 요약 정보 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">맨먼스 요약 정보</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-blue-800">총 맨먼스</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {monthlyData.reduce((sum, item) => sum + item.value, 0).toFixed(1)} MM
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-green-800">프로젝트 수</h3>
                <p className="text-2xl font-bold text-green-600">{projectData.length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-yellow-800">부서 수</h3>
                <p className="text-2xl font-bold text-yellow-600">{departmentData.length}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-purple-800">평균 월별 맨먼스</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {(monthlyData.reduce((sum, item) => sum + item.value, 0) / 12).toFixed(1)} MM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
