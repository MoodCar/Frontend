import './App.css';

import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import DiaryPage from './pages/DiaryPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/search" element={<SearchPage />} />
      {/* <Route path="/@:email">
      <Route path="/@${providerId}" >
        <Route index element={<MainPage />} />
        <Route path=":diaryID" element={<DiaryPage />} />
      </Route> */}
      <Route path="/read" element={<DiaryPage />} >
        <Route index element={<MainPage />} />
        <Route path=":diaryId" element={<DiaryPage />} />
      </Route>
      <Route path="/statistics" element={<StatisticsPage />} />
    </Routes>
  );
}

export default App;
