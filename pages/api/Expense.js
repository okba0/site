import dbconnect from '../../utiles/dbconnect'
import Expense from '@/Data/Expense';
dbconnect()

export default async function addExpense(req, res) {
    const{method}=req;
    switch(method)
    {
        case'GET':
        try{
            const data=await Expense.find();
            res.status(200).json({success:true,data:data});
        }catch(error){
            res.status(400).json({success:false});
        }
        break;
        case'POST':
        try{
            const data=await Expense.create(req.body);
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
