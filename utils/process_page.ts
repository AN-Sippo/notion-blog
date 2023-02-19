type PageObj = {
    "status":("secret"|"public"),
    "caption":string,
    "tags":Array<TagObj>,
    "name":string,
    "id":string,
    "created_at":Date,
}

type TagObj = {
    "name":string,
    "color":string,
}



const create_page_to_pageobj:(page:Object)=>PageObj = (page:any) => {
    const status:("secret"|"public")= page.properties.status.select.name ? page.properties.status.select.name :false
    const caption:string = page.properties.caption.rich_text[0] ?  page.properties.caption.rich_text[0].plain_text:"no cption"
    const name = page.properties["名前"].title[0] ? page.properties["名前"].title[0].plain_text:"untitled" //i don't like this key name, but don't know how to fix.
    const created_at:Date = new Date(page.created_time)
    const id:string = page.id
    
    let tags:Array<TagObj> = []
    for (const tag_info of page.properties.tags.multi_select){
        const tag:TagObj = {name:tag_info.name,color:tag_info.color}
        tags.push(tag)
    }

    const res:PageObj = {
        "name":name,
        "status":status,
        "caption":caption,
        "created_at":created_at,
        "tags":tags,
        "id":id
    }
    
    return res
}

export type {PageObj,TagObj};
export {create_page_to_pageobj}