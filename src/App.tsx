import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PhotographyLanding from './pages/photography/PhotographyLanding';
import PhotographyShowcase from './pages/photography/PhotographyShowcase';
import PhotographyContact from './pages/photography/PhotographyContact';
import PhotographyOrdering from './pages/photography/PhotographyOrdering';
import Live2DLanding from './pages/live2d/Live2DLanding';
import Live2DShowcase from './pages/live2d/Live2DShowcase';
import Live2DContact from './pages/live2d/Live2DContact';
import Live2DTOS from './pages/live2d/Live2DTOS';
import GameDevShowcase from './pages/gamedev/GameDevShowcase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/photography" element={<PhotographyShowcase />} />
        <Route path="/photography/showcase" element={<PhotographyShowcase />} />
        <Route path="/photography/contact" element={<PhotographyContact />} />
        <Route path="/photography/ordering" element={<PhotographyOrdering />} />

        <Route path="/live2d" element={<Live2DShowcase />} />
        <Route path="/live2d/showcase" element={<Live2DShowcase />} />
        <Route path="/live2d/contact" element={<Live2DContact />} />
        <Route path="/live2d/inquire" element={<Live2DContact />} />
        <Route path="/live2d/tos" element={<Live2DTOS />} />

        <Route path="/gamedev" element={<GameDevShowcase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
