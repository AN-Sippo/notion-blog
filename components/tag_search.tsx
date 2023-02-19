import {useState,FC,useEffect} from "react";
import {Grid,GridItem} from "@chakra-ui/react";

import type { search_tag_prop } from "./tag";
import { Tag ,Box} from "@chakra-ui/react";
import { SearchTag ,SearchTagInBox} from "./tag";
import type { propsToHandleTags } from "./sider";

const Tag_Search:FC<propsToHandleTags> = (props:propsToHandleTags) =>{
    const allTags = props.allTags;
    const setTagState = props.setTagState

    return (
        <Grid
            templateRows="1fr 3fr"
        >
            <GridItem bg="whitesmoke" borderRadius="1rem" m="0.4rem" h="6rem">
                {
                    Object.keys(allTags).map((tag_name)=>{
                        const tag = allTags[tag_name];
                        return(
                        tag.selected ?
                            <Box m="0.2rem" display="inline-block">
                                <SearchTagInBox name={tag.name} color={tag.color} selected={tag.selected} setTagState={setTagState}/>
                            </Box>
                            :<></>
                            )
                    })
                }
            </GridItem>
            <GridItem width="100%">
                {
                    Object.keys(allTags).map((tag_name)=>{
                        const tag = allTags[tag_name];
                        return (
                        <Box margin="1%" marginLeft="5%" display="inline-block">
                            <SearchTag name={tag.name} color={tag.color} selected={tag.selected} setTagState={setTagState}/>
                        </Box>
                        )
                    }
                    )
                    }
                        
            </GridItem>
        </Grid>
    )
}

export {Tag_Search}