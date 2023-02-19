import {FC,useState} from "react";
import {Tag,TagLabel,TagCloseButton,TagLeftIcon} from "@chakra-ui/react"
import {AddIcon,CloseIcon} from "@chakra-ui/icons"

type search_tag_prop = {
    "name":string,
    "color":string,
    "selected":boolean
}

type _search_tag_prop = search_tag_prop &{
    setTagState?:any
}

const SearchTag:FC<_search_tag_prop> = (props:_search_tag_prop) =>{
    const setTrue = () =>{
        props.setTagState(props.name,true)
    }

    const setFalse = () =>{
        props.setTagState(props.name,false)
    }

    return (
        <Tag 
            fontSize="0.7rem"
            colorScheme={props.color}
            borderRadius="full"
            variant="solid"
            cursor="pointer"
            onClick={props.selected ? setFalse:setTrue}
            width="100%"
            >
            {props.selected?
                <TagLeftIcon as={CloseIcon}/>:<TagLeftIcon as={AddIcon}/>
            }
            <TagLabel >{props.name}</TagLabel>
        </Tag>
    )
}

const SearchTagInBox:FC<_search_tag_prop> = (props:_search_tag_prop) =>{
    const setFalse = () =>{
        props.setTagState(props.name,false)
    }

    return (
        <Tag 
            fontSize="0.7rem"
            colorScheme={props.color}
            borderRadius="full"
            variant="solid"
            cursor="pointer"
            onClick={setFalse}
            >
            <TagLeftIcon as={CloseIcon}/>
            <TagLabel >{props.name}</TagLabel>
        </Tag>
    )
}

export {SearchTag,SearchTagInBox}
export type {search_tag_prop}
