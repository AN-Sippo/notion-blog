import {useState,useEffect,FC} from "react"
import {Box,Divider,Heading,VStack} from "@chakra-ui/react"
import type { PageObj } from "@/utils/process_page"
import { useRouter } from "next/router"
import type { rich_text_block,heading_block,image_block,paragraph_block,code_block,any_block,bookmark_block } from "@/utils/block_type"
import { RichText } from "@/components/rich_text"
import { Paragraph } from "@/components/paragraph"
import { ImageNotion } from "@/components/image"
import { CodeNotion } from "@/components/code"
import { NotionHeading } from "@/components/heading"
import { Bookmark } from "@/components/bookmark"

type results_inside = {
    content:Array<any_block>
    next_cursor:any
}


const parse_response = (block_l:any):results_inside =>{
    const results:Array<any> = block_l
    let res:Array<any_block> = []
    for (const result of results){
        const type = result.type;
        let block:any_block;
        switch (type){
            // いちブロックずつparseしてresにpushして抜けてくる
            case "paragraph":
                const id:string = result.id;
                const type:string = result.type 
                const content:Array<rich_text_block> = []
                for (const rtxb of result.paragraph.rich_text){
                    const annotation = rtxb.annotations 
                    const text = rtxb.text.content?rtxb.text.content:"\n"
                    const link = rtxb.text.link ? rtxb.text.link : ""
                    const type = rtxb.type
                    content.push({annotations:annotation,content:text,link:link,this_block:"rich_text_block",type:type})
                }
                block = {this_block:"paragraph_block",type:type,id:id,content:content,color:result.color} as paragraph_block
                res.push(block)
                break;

            case "image":
                const url:string = result.image.file.url;
                block = {this_block:"image_block",content:{url:url,this_block:"file_block"},id:result.id} as image_block
                res.push(block)
                break;
            
            case "code":
                block = {
                    content: result.code.rich_text.map((richt:any)=>{
                        return({
                        this_block:"rich_text_block",
                        type: richt.type,
                        link:richt.text.link,
                        content:richt.plain_text,
                        annotations: richt.annotations,
                        href:richt.href,
                    } as rich_text_block)
                    }),
                    this_block:"code_block",
                    language:result.code.language,
                    id:result.id
                } as code_block
                res.push(block)
                break;
            case "heading_1":
                block = {
                    this_block:"heading_block",
                    type:"1",
                    content:result.heading_1.rich_text.map((richt:any)=>{
                        return({
                            this_block:"rich_text_block",
                            type: richt.type,
                            link:richt.text.link,
                            content:richt.plain_text,
                            annotations: richt.annotations,
                            href:richt.href,
                        } as rich_text_block)}
                        ),
                    color:"string",
                } as heading_block
                res.push(block)
                break;
            case "heading_2":
                block = {
                    this_block:"heading_block",
                    type:"2",
                    content:result.heading_2.rich_text.map((richt:any)=>{
                        return({
                            this_block:"rich_text_block",
                            type: richt.type,
                            link:richt.text.link,
                            content:richt.plain_text,
                            annotations: richt.annotations,
                            href:richt.href,
                        } as rich_text_block)}
                        ),
                    color:"string",
                } as heading_block
                res.push(block)
                break;
            case "heading_3":
                block = {
                    this_block:"heading_block",
                    type:"3",
                    content:result.heading_3.rich_text.map((richt:any)=>{
                        return({
                            this_block:"rich_text_block",
                            type: richt.type,
                            link:richt.text.link,
                            content:richt.plain_text,
                            annotations: richt.annotations,
                            href:richt.href,
                        } as rich_text_block)}
                        ),
                    color:"string",
                } as heading_block
                res.push(block)
                break;
            
            case "bookmark":
                block = {
                    id:result.id,
                    content:result.bookmark.url,
                    this_block:"bookmark_block"
                } as bookmark_block
                res.push(block)
                break;
        }
    }// end of results loop
    return {
        next_cursor:block_l.next_cursor,
        content:res,
    };
}   

const swicher = (one_block:any_block,idx:number) =>{
    switch (one_block.this_block){
        case "paragraph_block":
            return <Paragraph {...one_block} key={one_block.id}/>
        case "image_block":
            return <ImageNotion {...one_block} key={one_block.id}/>
        case "code_block":
            return <CodeNotion {...one_block} key={one_block.id}/>
        case "heading_block":
            return <NotionHeading {...one_block} key={idx}/>
        case "bookmark_block":
            return <Bookmark {...one_block} key={idx}/>
    }
}

const Page:FC<PageObj> = () =>{
    const router = useRouter();
    const pid = router.query.pid as string;
    const title = router.query.title as string;
    const [contents,setContents] = useState<Array<any_block>>([])

    useEffect(()=>{
        const fetcher = async () =>{
            const res =  await fetch(`/api/${pid}`)
            const res1 = await res.json()
            return parse_response(res1)
        }
        fetcher().then((res)=>{
            // next cursorは一旦破棄
            setContents(res.content)
        })
    },[])
    

    return (
        <VStack>
            <Box m="1rem">
                <Heading>{title}</Heading>
            </Box>
            <Divider/>
            <Box padding="2rem"> 
            {
                contents.map((i,idx)=>swicher(i,idx))
            }
            </Box>
        </VStack>
    )
}

export default Page

