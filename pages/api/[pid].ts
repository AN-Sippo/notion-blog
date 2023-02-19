import { Client } from "@notionhq/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const api_key = process.env.api_key
const notion = new Client({ auth: api_key });

const fetch_page = async (
    req:NextApiRequest,
    res:NextApiResponse
)=>{
    const {pid} = req.query
    const page_id = pid as string 
    const data = await notion.blocks.children.list({block_id:page_id,page_size:10});
    return res.status(200).json(data)
}
export default fetch_page