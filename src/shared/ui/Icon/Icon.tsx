import type { ComponentType, HTMLAttributes, SVGProps } from "react";
import Logo from "./assets/logo.svg?react";
import EyeOff from "./assets/eyeOff.svg?react";
import UserIcon from "./assets/userIcon.svg?react";
import Close from "./assets/close.svg?react";
import Lock from "./assets/lock.svg?react";
import { EyeOutlined } from "@ant-design/icons";

const svgIcons = {
  logo: Logo,
  userIcon: UserIcon,
  close: Close,
  eyeOff: EyeOff,
  lock: Lock,
} as const;

const antIcons = {
  eye: EyeOutlined,
} as const;

export type IconName = keyof typeof svgIcons | keyof typeof antIcons;

type CommonIconProps = {
  name: IconName;
  size?: number;
  color?: string;
} & HTMLAttributes<HTMLElement>;

export const Icon = ({
  name,
  size = 24,
  color,
  style,
  ...props
}: CommonIconProps) => {
  if (name in svgIcons) {
    const Svg = svgIcons[name as keyof typeof svgIcons] as ComponentType<
      SVGProps<SVGSVGElement>
    >;

    return (
      <Svg
        width={size}
        height={size}
        color={color}
        {...(props as SVGProps<SVGSVGElement>)}
        style={style}
      />
    );
  }

  const AntIcon = antIcons[name as keyof typeof antIcons] as typeof EyeOutlined;

  return <AntIcon style={{ fontSize: size, color, ...style }} {...props} />;
};
