import React from "react";
import { StyledSTHEditor } from "./styles";
import { ISTHEditor } from "./interfaces";

function STHEditor({ editor }: Readonly<ISTHEditor>) {
  return <StyledSTHEditor editor={editor} />
}

export { STHEditor };