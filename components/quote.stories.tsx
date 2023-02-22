import { Quote } from "./quote";
import type { quote_block,rich_text_block } from "@/utils/block_type";

export default {
    title:"Quote",
    component:Quote
}

const defaultargs = {
    this_block:"quote_block",
    content:[{ this_block:"rich_text_block",content:"こんにちは。"} ,{this_block:"rich_text_block",content:"今日の晩御飯は"},{this_block:"rich_text_block",content:"鍋でした。\n"},{this_block:"rich_text_block",content:"美味しかったです"}]
} as quote_block

export const DefaultQuote = ()=> <Quote {...defaultargs}/>