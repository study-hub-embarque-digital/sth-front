import React from "react";
import { IArticleContentRender } from "./interfaces";
import { STHEditorContentRender } from "./styles";

function ArticleContentRender({ editor }: IArticleContentRender) {
  return <STHEditorContentRender editor={editor} />
}