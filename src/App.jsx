import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './main_page';
import { Survey } from "./survey";
import { Home } from "./home";
import { SavedPage } from './SavedPage';
// import { LoginPage } from './LoginPage';
import { DarkModeButton } from './darkmodeButton';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/darkModeSwitch" element={<DarkModeButton />} />
          {/* <Route path="/saved" element={<SavedPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<SavedPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
