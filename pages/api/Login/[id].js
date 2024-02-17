import dbconnect from '../../../utiles/dbconnect'
import Login from '@/Data/Login';
dbconnect()

export default async function deleteLogin(req, res) {
    const{
        method,
        query:{id}
        }=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Login.findById(id);
            if(!Login)
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
            const data=await Login.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!Login)
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
            const deleteLogin=await Login.deleteOne({_id:id});
            if(!deleteLogin)
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