type base_block = {
    type?:string,
    content:any,
    this_block:string
    id?:string
}

type file_block = {
    this_block:"file_block"
    url:string
}


export type rich_text_block = base_block & {
    this_block:"rich_text_block"
    type: "text"|"mention"|"equation",
    link: string,
    content:string,
    annotations: {
      bold?: boolean,
      italic?: boolean,
      strikethrough?: boolean,
      underline?: boolean,
      code?: boolean,
      color?: string
    },
    href?: string
}

export type paragraph_block = base_block & {
    this_block:"paragraph_block"
    content: Array<rich_text_block>,
    color: "string",
}

export type heading_block = base_block & {
    this_block:"heading_block"
    type:"1"|"2"|"3"
    content:rich_text_block,
    color:"string"
}

export type code_block = base_block & {
    this_block:"code_block"
    content:rich_text_block,
    language:'abap'|'arduino'|'bash'|'basic'|'c'|'clojure'|'coffeescript'|'c++'|'c#'|'css'|'dart'|'diff'|'docker'|'elixir'|'elm'|'erlang'|'flow'|'fortran'|'f#'|'gherkin'|'glsl'|'go'|'graphql'|'groovy'|'haskell'|'html'|'java'|'javascript'|'json'|'julia'|'kotlin'|'latex'|'less'|'lisp'|'livescript'|'lua'|'makefile'|'markdown'|'markup'|'matlab'|'mermaid'|'nix'|'objective-c'|'ocaml'|'pascal'|'perl'|'php'|'plain text'|'powershell'|'prolog'|'protobuf'|'python'|'r'|'reason'|'ruby'|'rust'|'sass'|'scala'|'scheme'|'scss'|'shell'|'sql'|'swift'|'typescript'|'vb.net'|'verilog'|'vhdl'|'visual basic'|'webassembly'|'xml'|'yaml'|'java'|'c'|'c++'|'c#'

}


export type image_block = {
    this_block:"image_block"
    content:file_block
    id:string
}

export type any_block = heading_block | rich_text_block | heading_block | code_block |image_block | paragraph_block 