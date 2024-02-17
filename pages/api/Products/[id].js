import dbconnect from '../../../utiles/dbconnect'
import Products from '@/Data/Products';
dbconnect()

export default async function deleteProducts(req, res) {
    const{
        method,
        query:{id}
        }=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Products.findById(id);
            if(!Products)
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
            const data=await Products.findByIdAndUpdate(id,req.body,
                {
                    new:true,
                    runValidators:true
                });
            if(!Products)
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
            const deleteProducts=await Products.deleteOne({_id:id});
            if(!deleteProducts)
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