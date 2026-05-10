const { UnauthenticatedError ,NotFoundError,BadRequestError} = require('../errors/index');
const Job=require('../models/Job');
const {StatusCodes}=require('http-status-codes');

const getAllJobs=async (req,res)=>{
    const jobs=await Job.find({createdBy:req.user.userId});
    res.status(StatusCodes.OK).json({user:{name:req.user.name},jobs,count:jobs.length});
}

const createJob=async(req,res)=>{
    req.body.createdBy=req.user.userId;
    const job=await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
}

const getAJob=async(req,res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    }=req

    const job=await Job.findOne({
        _id:jobId,
        createdBy:userId
    });
    if(!job){
        throw new NotFoundError('the job id for the user does not exist');
    }
    res.status(StatusCodes.OK).json(job);
}

const updateJob=async(req,res)=>{
    const {
        body:{company,position},
        user:{userId},
        params:{id:jobId}
    }=req;

    if(company===''|| position===''){
        throw new BadRequestError('company or position field cannot be empty');
    }
    const job=await Job.findByIdAndUpdate(
        {_id:jobId,createdBy:userId},
        req.body,
        
    );
    if(!job){
        throw new NotFoundError('the job id for the user does not exist');
    }
    res.status(StatusCodes.OK).json(job);
}

const deleteJob=async(req,res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    }=req;

    const job=await Job.findOneAndDelete({_id:jobId,createdBy:userId});
    if(!job){
        throw new NotFoundError('the job id for the user does not exist');
    }
    res.status(StatusCodes.OK).send('deleted successfully');
}

module.exports={
    getAJob,
    getAllJobs,
    createJob,
    updateJob,
    deleteJob
};