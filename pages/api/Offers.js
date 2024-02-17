import dbconnect from '../../utiles/dbconnect'
import Offers from '@/Data/Offers';
dbconnect()

export default async function addOffers(req, res) {
    const{method}=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Offers.find();
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case'POST':
        try{
            const data=await Offers.create(req.body);
            res.status(201).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false,error});
        }
        break;
        default:
            res.status(400).json({success:false});
        break;
    }
  }
