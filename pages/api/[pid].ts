import { Client } from "@notionhq/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const api_key = process.env.api_key
const notion = new Client({ auth: api_key });

const fetch_page = async (
    req:NextApiRequest,
    res:NextApiResponse
)=>{
    let ans_stack:Array<any> = []
    const {pid} = req.query
    const page_id = pid as string 
    let next_cursor:string = ""
    while (true){
        const data = await notion.blocks.children.list({block_id:page_id,page_size:100,start_cursor:next_cursor?next_cursor:undefined})
        ans_stack = ans_stack.concat(data.results)
        if (data.has_more){next_cursor = data.next_cursor!}
        else{break;}

    }
    return res.status(200).json(ans_stack)
}
export default fetch_page