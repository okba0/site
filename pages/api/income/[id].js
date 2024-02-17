import dbconnect from '../../../utiles/dbconnect'
import income from '@/Data/income';
dbconnect()

export default async function deleteincome(req, res) {
    const{
        method,
        query:{id}
        }=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await income.findById(id);
            if(!income)
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
            const data=await income.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!income)
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
            const deleteincome=await income.deleteOne({_id:id});
            if(!deleteincome)
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