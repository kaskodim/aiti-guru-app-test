import type { ComponentType, HTMLAttributes, SVGProps } from "react";
import Logo from "./assets/logo.svg?react";
import EyeOff from "./assets/eyeOff.svg?react";
import { EyeOutlined } from "@ant-design/icons";

const icons = {
  logo: Logo,
  eye: EyeOutlined,
  eyeOff: EyeOff,
} as const;

export type IconName = keyof typeof icons;

type CommonIconProps = {
  name: IconName;
  size?: number;
  color?: string;
} & HTMLAttributes<HTMLElement>; // без SVGProps

export const Icon = ({
  name,
  size = 24,
  color,
  style,
  ...props
}: CommonIconProps) => {
  const IconComponent = icons[name];

  if (name === "logo") {
    // SVG `?react`
    const Svg = IconComponent as ComponentType<SVGProps<SVGSVGElement>>;
    return (
      <Svg
        width={size}
        height={size}
        color={color}
        {...(props as SVGProps<SVGSVGElement>)}
      />
    );
  }

  // ant-design icon
  const AntIcon = IconComponent as typeof EyeOutlined;
  return <AntIcon style={{ fontSize: size, color, ...style }} {...props} />;
};
