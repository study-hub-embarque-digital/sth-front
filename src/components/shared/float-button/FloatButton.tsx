import React from "react";
import { CustomizedFloatButton } from "./styles";

interface IFloatButtonProps {
  children: React.ReactNode,
  fixed?: boolean,
  position?: 'BOTTOM_RIGTH',
  onClick: () => void
}

function FloatButton({ children, fixed = true, position = 'BOTTOM_RIGTH', onClick }: Readonly<IFloatButtonProps>) {
  return (
    <CustomizedFloatButton position={'BOTTOM_RIGHT'} fixed={true} onClick={onClick}>
      {children}
    </CustomizedFloatButton>
  )
}

export { FloatButton };