import dbconnect from '../../../utiles/dbconnect'
import Policy from '@/Data/Policy';
dbconnect()

export default async function deletePolicy(req, res) {
    const{
        method,
        query:{id}
        }=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Policy.findById(id);
            if(!Policy)
            {
               return res.status(400).json({success:false});
            }
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case'PUT':
        try{
            const data=await Policy.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!Policy)
            {
               return res.status(400).json({success:false});
            }
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false,error});
        }
        break;
        case'DELETE':
        try{
            const deletePolicy=await Policy.deleteOne({_id:id});
            if(!deletePolicy)
            {
               return res.status(400).json({success:false});
            }
            res.status(200).json({success:true,data:{}});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        default:
            res.status(400).json({success:false});
        break;
    }
  }