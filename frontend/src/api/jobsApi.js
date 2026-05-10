import axios from "axios";

//setup the base url so that u need not call this everytime
const API=axios.create({
    baseURL:"http://localhost:3000/api/v1",
});

//attach token automatically (future-proof)

API.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    if(token){
        config.headers.authorization=`Bearer ${token}`;
    }

    return config;
})

export const registerUser=(data)=>API.post('/auth/register',data);
export const loginUser=(data)=>API.post('/auth/login',data);
export const getJobs=()=>API.get('/jobs');

export const createJob=(data)=>{
   return  API.post('/jobs',data);
}

export const getAJob=(id)=>{
    return API.get(`/jobs/${id}`);
}

export const updateJob=(data,id)=>{
    return API.patch(`/jobs/${id}`,data);
}

export const deleteJob = (id) => {
  return API.delete(`/jobs/${id}`);
};
