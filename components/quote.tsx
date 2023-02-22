import {FC} from "react"
import type {rich_text_block, quote_block } from "@/utils/block_type"
import { RichText } from "./rich_text"
import styled from "styled-components"

const Text = styled.p`
    font-size: 1rem;
    font-family: serif sans-serif ; 
`

const QuoteDiv = styled.div`
    padding-left: 1rem;
    border-left: thick solid gray;
    margin:1rem;
`

export const Quote:FC<quote_block> = (props)=>{
    return (
        <QuoteDiv>
            {props.content.map((richt:rich_text_block,idx:number)=><Text key={idx}>{richt.content}</Text>)}
        </QuoteDiv>
    )
}