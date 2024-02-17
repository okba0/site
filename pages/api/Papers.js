import dbconnect from '../../utiles/dbconnect'
import Papers from '@/Data/Papers';
dbconnect()

export default async function addPapers(req, res) {
    const{method}=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Papers.find();
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case'POST':
        try{
            const data=await Papers.create(req.body);
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
