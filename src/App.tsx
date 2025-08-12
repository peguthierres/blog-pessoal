import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './hooks/useAuth';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { Login } from './pages/Login';
import { NewPost } from './pages/NewPost';
import { EditPost } from './pages/EditPost';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <Router>
          <div className="min-h-screen bg-stone-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:slug" element={<PostDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/nova-publicacao" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
                <Route path="/editar/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
                <Route path="/painel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/sobre" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;