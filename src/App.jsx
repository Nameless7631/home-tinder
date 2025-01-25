import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './main_page';
import { Survey } from "./survey"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
    </Router>
  );
}

export default App;
