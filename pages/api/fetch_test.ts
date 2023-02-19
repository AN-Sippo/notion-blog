import { Client } from "@notionhq/client"
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (
    req:NextApiRequest,
    res:NextApiResponse
)=>{
    const api_key = process.env.api_key!
    const database_id = process.env.database_id!


    const notion = new Client({ auth: api_key });
    const data = await notion.databases.query({
      "database_id": database_id,
      "filter": {
        "property": "status",
        "select": {
            "equals": "public"
        }
      }

    });
    return res.status(200).json(data)
}
export default handler
