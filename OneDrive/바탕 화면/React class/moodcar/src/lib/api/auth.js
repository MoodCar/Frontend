import client from "./client";

// 로그인
export const login = ({ email, password }) =>
    client.post('/signin', { email, password });
    // client.post('/auth/login', { email, password });

// 회원가입
export const register = ({ email, password }) =>
    client.post('/signup', { email, password });
    // client.post('/api/auth/register', { email, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/logout');