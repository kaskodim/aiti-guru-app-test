// src/shared/ui/AppButton/AppButton.tsx
import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";
import type { FC } from "react";

export type AppButtonProps = AntButtonProps & {
  fullWidth?: boolean;
};

export const AppButton: FC<AppButtonProps> = ({
  fullWidth,
  style,
  ...rest
}) => {
  return (
    <AntButton
      block={fullWidth}
      style={{
        backgroundColor: "#242EDB",
        border: "1px solid #367AFF",
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        fontSize: 18,
        ...style,
      }}
      {...rest}
    />
  );
};
