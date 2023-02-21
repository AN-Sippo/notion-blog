import {FC, useEffect, useState} from "react"
import {Box,Text,Grid,GridItem, Card, CardHeader, CardBody, Divider, Heading} from "@chakra-ui/react"
import type { bookmark_block } from "@/utils/block_type"
import { useRouter } from "next/router"



export const Bookmark:FC<bookmark_block> = (props)=>{
    const parser = new DOMParser();
    const [title,setTitle] = useState<string>("")
    const [caption,setCaption] = useState<string>("")
    

    useEffect(()=>{
        const fetcher = async ()=>{
            const res = await fetch(`/api/fetch_bookmark?url=${props.content}`)
            const data = await res.json()
            const txt = data.txt
            const htmlDoc = parser.parseFromString(txt,"text/html")

            const title_tag = htmlDoc.title
            const caption_tag = htmlDoc.querySelector(`meta[property="og:description"]`)
            setTitle(title_tag ?  title_tag : "no title");
            setCaption(caption_tag? (caption_tag as HTMLMetaElement).content:"no caption");

        }
        fetcher()
    },[])
    return(
        <a style={{display:"block"}} href={props.content}>
        <Card _hover={{bg:"rgb(230,230,230)"}}>
            <CardHeader><Heading as="h3" size="sm">{title}</Heading></CardHeader>
            <Divider/>
            <CardBody >
                <Text transform="scale(0.8,0.8)" fontSize={"1rem"}>{caption}</Text>
                <Text transform="scale(0.6,0.6)">{props.content.length > 50 ? props.content.slice(0,40) + "..." : props.content}</Text>
            </CardBody>
        </Card>            
        </a>
    )

}
