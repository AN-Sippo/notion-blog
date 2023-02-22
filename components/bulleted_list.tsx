import {FC} from "react"
import styled from "styled-components"
import type { bulleted_list_block,rich_text_block } from "@/utils/block_type"

const BulletedListUl = styled.ul`
    margin:1rem;
    margin-left: 2rem;
`

export const BulletedList:FC<bulleted_list_block> = (props)=>{
    return (
        <BulletedListUl>
            {props.content.map((richt:rich_text_block,idx:number)=><li key={idx}>{richt.content}</li>)}
        </BulletedListUl>
    )
}
