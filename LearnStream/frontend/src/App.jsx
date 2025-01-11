// Import necessary components
import Login from './components/Login-common';
import Component from './flowbite-componets/Navbar1';
import LoginT from './components/Login-teacher';
import LoginS from './components/Login-students';
import Student from '/pages/Student '

function App() {
  return (
    <Router>
    <div>
      {/* Navbar always visible */}
      <Navbar />
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher-login" element={<LoginT />} />
        <Route path="/student-login" element={<LoginS />} />
        <Route path="/Student" element={<Student />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
