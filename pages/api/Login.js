import dbconnect from '../../utiles/dbconnect'
import login from '../../Data/Login'
dbconnect()

export default async function addtest(req, res) {
    const{method}=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await login.find({});
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case'POST':
        try{
            const data=await login.create(req.body);
            res.status(201).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        default:
            res.status(400).json({success:false});
        break;
    }
  }
