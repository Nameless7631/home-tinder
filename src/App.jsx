import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './main_page';
import { Survey } from "./survey"
import { SavedPage } from './SavedPage';
import { LoginPage } from './LoginPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;
