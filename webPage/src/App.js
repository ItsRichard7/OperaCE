
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginForm } from './components/LoginPage/LoginForm';
import { AdminPage } from './components/AdminPage/AdminPage';
import { OperatorPage } from './components/OperatorPage/OperatorPage';
import { ProfesorPage } from './components/ProfesorPage/ProfesorPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { LabsPro } from './components/LabsPro/LabsPro';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/op" element={<OperatorPage />} />
          <Route path="/pro" element={<ProfesorPage />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/labsPro" element={<LabsPro />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
