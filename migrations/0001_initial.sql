-- Migration number: 0001        2025-03-14T00:35:00.000Z
-- 기존 테이블 삭제
DROP TABLE IF EXISTS counters;
DROP TABLE IF EXISTS access_logs;
DROP TABLE IF EXISTS manmonths;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;

-- 부서 테이블
CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 직원 테이블
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- 프로젝트 테이블
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 맨먼스 데이터 테이블
CREATE TABLE IF NOT EXISTS manmonths (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  manmonth_value REAL NOT NULL, -- 소수점 값도 허용 (예: 0.5 MM)
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  UNIQUE(employee_id, project_id, year, month) -- 동일 직원, 프로젝트, 연월에 중복 방지
);

-- 사용자 권한 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- 실제 구현에서는 해시된 비밀번호 저장
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')), -- 관리자 또는 일반 사용자
  employee_id INTEGER,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- 인덱스 생성
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_manmonths_employee ON manmonths(employee_id);
CREATE INDEX idx_manmonths_project ON manmonths(project_id);
CREATE INDEX idx_manmonths_year_month ON manmonths(year, month);
CREATE INDEX idx_users_role ON users(role);

-- 초기 데이터 삽입
INSERT INTO departments (name) VALUES 
  ('개발팀'),
  ('기획팀'),
  ('디자인팀'),
  ('마케팅팀'),
  ('경영지원팀');

-- 관리자 계정 생성 (비밀번호: admin123)
INSERT INTO users (username, password, role) VALUES 
  ('admin', 'admin123', 'admin');
