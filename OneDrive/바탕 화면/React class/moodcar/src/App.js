import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/@:email">
        <Route index element={<MainPage />} />
        {/* <Route path=":postId" element={<PostPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
