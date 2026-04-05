// src/shared/ui/AppButton/AppButton.tsx
import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";
import type { CSSProperties, FC } from "react";

export type AppButtonProps = AntButtonProps & {
  fullWidth?: boolean;
};

export const AppButton: FC<AppButtonProps> = ({
  fullWidth,
  style,
  type,
  ...rest
}) => {
  const primary = type === "primary";

  const baseStyle: CSSProperties = {
    height: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    fontSize: 18,
  };

  const primaryStyle: CSSProperties = primary
    ? {
        backgroundColor: "#242EDB",
        border: "1px solid #367AFF",
      }
    : {};

  return (
    <AntButton
      block={fullWidth}
      type={type}
      style={{
        ...baseStyle,
        ...primaryStyle,
        ...style,
      }}
      {...rest}
    />
  );
};
