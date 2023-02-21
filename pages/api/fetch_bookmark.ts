import type { NextApiRequest, NextApiResponse } from 'next'

 const fetch_bookmark = async (
    req:NextApiRequest,
    res:NextApiResponse
)=>{
    const url:string = req.query.url! as string;
    const data = await fetch(url);
    res.status(200).json({txt:await data.text()})

      
        
}

export default fetch_bookmark