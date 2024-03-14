import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewsList from './components/reviewsList';
import ReviewForm from './components/reviewForm';
import ReviewDetail from './components/reviewDetail';
import HelloWorld from './components/testApi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/reviews/create" element={<ReviewForm />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
