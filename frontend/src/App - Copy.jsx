import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/login';
import Jobs from './pages/Jobs/getJobs';
import CreateJob from './pages/Jobs/createJob';
import SingleJob from './pages/jobs/singleJob';



function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<Register/>} />        
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/createJob" element={<CreateJob />} />
        <Route path="/jobs/:id" element={<SingleJob />} />
        
      </Routes>
    </BrowserRouter>
  )
};

export default App;

