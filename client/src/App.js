import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from './components/Editor/Editor';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PrivateRoute>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <Editor />
          </div>
        </DndProvider>
      </PrivateRoute>
    </AuthProvider>
  );
}

export default App;