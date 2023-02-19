import type { PageObj,TagObj} from "./process_page";
import type { search_tag_prop } from "@/components/tag";

export const filterTags = (content:Array<PageObj>,allTags:{[key:string]:search_tag_prop}):Array<PageObj>=>{
    // struct content for search
    const tag_only:Array<Array<string>> = []
    for (const page of content){
        let res:Array<string> = []
        const tags = page.tags
        for (const tag of tags){
            res.push(tag.name)
        }
        tag_only.push(res)
    }

    //tf for filter
    let mask:Array<boolean> = []
    for (let i=0;i<content.length;i++){
        mask.push(true) //init. ここから、タグを含まないものをfalseにしていく
    }


    for (const tag_key of Object.keys(allTags)){
        if(allTags[tag_key].selected === false) continue ;
        const selected_tag = allTags[tag_key];
        
        for (let i=0;i < tag_only.length;i++){
            if(!tag_only[i].includes(tag_key)) mask[i]=false;
        }
    }

    return content.filter((_,idx)=>mask[idx])
}