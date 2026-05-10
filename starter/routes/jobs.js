const express=require('express');
const router=express.Router();

const {
    getAJob,
    getAllJobs,
    createJob,
    updateJob,
    deleteJob
} =require('../controllers/jobs');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getAJob).patch(updateJob).delete(deleteJob);

module.exports=router;