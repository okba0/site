import dbconnect from '../../../utiles/dbconnect'
import Offers from '@/Data/Offers';
dbconnect()

export default async function deleteOffers(req, res) {
    const{
        method,
        query:{id}
        }=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Offers.findById(id);
            if(!Offers)
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
            const data=await Offers.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!Offers)
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
            const deleteOffers=await Offers.deleteOne({_id:id});
            if(!deleteOffers)
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