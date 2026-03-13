import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from './components/Editor/Editor';
import AboutPage from './pages/AboutPage/AboutPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('editor'); // 'editor' | 'about'

  return (
    <AuthProvider>
      <PrivateRoute>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            {currentPage === 'about' ? (
              <AboutPage onBack={() => setCurrentPage('editor')} />
            ) : (
              <Editor onNavigateAbout={() => setCurrentPage('about')} />
            )}
          </div>
        </DndProvider>
      </PrivateRoute>
    </AuthProvider>
  );
}

export default App;