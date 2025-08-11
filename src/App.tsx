import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { NewPost } from './pages/NewPost';
import { EditPost } from './pages/EditPost';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-stone-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/nova-publicacao" element={<NewPost />} />
              <Route path="/editar/:id" element={<EditPost />} />
              <Route path="/painel" element={<Dashboard />} />
              <Route path="/sobre" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;