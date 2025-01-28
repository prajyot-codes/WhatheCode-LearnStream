// Import necessary components
import Login from "./components/Login-common";
import Component from "./flowbite-componets/Navbar1";
import LoginT from "./components/Login-teacher";
import LoginS from "./components/Login-students";
import Student from "/pages/Student ";

function App() {
  return (
    <Router data-oid="y:lel3u">
      <div data-oid="817iid5">
        {/* Navbar always visible */}
        <Navbar data-oid=".9rxcp7" />

        {/* Define Routes */}
        <Routes data-oid="di_8rzt">
          <Route
            path="/"
            element={<Login data-oid="csy-ybe" />}
            data-oid="4.l8fqs"
          />
          <Route
            path="/teacher-login"
            element={<LoginT data-oid="s.x21so" />}
            data-oid="tybo8cg"
          />
          <Route
            path="/student-login"
            element={<LoginS data-oid="tjk3z68" />}
            data-oid="sk_eh3v"
          />
          <Route
            path="/Student"
            element={<Student data-oid="1huzaju" />}
            data-oid="gcq:43:"
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
