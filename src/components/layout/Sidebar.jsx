'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiBriefcase, 
  FiLayers, 
  FiBarChart2, 
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: '대시보드', href: '/dashboard', icon: FiHome },
    { name: '직원 관리', href: '/employees', icon: FiUsers },
    { name: '부서 관리', href: '/departments', icon: FiLayers },
    { name: '프로젝트 관리', href: '/projects', icon: FiBriefcase },
    { name: '맨먼스 입력', href: '/manmonths', icon: FiBarChart2 },
    { name: '설정', href: '/settings', icon: FiSettings },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64 py-4">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold">맨먼스 관리</h1>
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="px-2">
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 mb-1 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-6 py-4">
        <button className="flex items-center text-gray-300 hover:text-white">
          <FiLogOut className="mr-3 h-5 w-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
