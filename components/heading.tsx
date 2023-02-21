import {FC} from "react"
import {Heading, Box} from "@chakra-ui/react"
import type { heading_block,rich_text_block} from "@/utils/block_type"
import { RichText } from "./rich_text"

export const NotionHeading:FC<heading_block> = (props)=>{
    return (
        <Box paddingTop="2rem" paddingBottom="1rem">
            {props.content.map((richt:rich_text_block,idx:number)=><Heading as={`h${props.type}`} key={idx}><RichText {...richt}/></Heading>)}
        </Box>
    )
}