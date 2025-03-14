'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // 홈 페이지에 접속하면 로그인 페이지로 리다이렉트
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold">맨먼스 관리 시스템</h1>
        <p className="mt-2">로그인 페이지로 이동합니다...</p>
      </div>
    </div>
  );
}
