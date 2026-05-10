import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/login';
import Jobs from './pages/Jobs/getJobs';
import CreateJob from './pages/Jobs/createJob';
import SingleJob from './pages/jobs/singleJob';
import ProtectedRoute from "./components/ProtectedRoute";



function App(){
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Register/>} />        
        <Route path="/login" element={<Login />} />

        
        
        {/* Protected Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createJob"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <SingleJob />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  )
};

export default App;

