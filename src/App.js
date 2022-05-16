import './App.css';

import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import DiaryPage from './pages/DiaryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      {/* <Route path="/@:email">
      <Route path="/@${providerId}" >
        <Route index element={<MainPage />} />
        <Route path=":diaryID" element={<DiaryPage />} />
      </Route> */}
      <Route path="/read" element={<DiaryPage />} >
        <Route index element={<MainPage />} />
        <Route path=":diaryId" element={<DiaryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
