import type { SVGProps } from "react";
import Logo from "./assets/logo.svg?react";
import EyeOff from "./assets/eyeOff.svg?react";
import UserIcon from "./assets/userIcon.svg?react";
import Close from "./assets/close.svg?react";
import Lock from "./assets/lock.svg?react";

const icons = {
  logo: Logo,
  userIcon: UserIcon,
  close: Close,
  eyeOff: EyeOff,
  lock: Lock,
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, size = 24, color, ...props }: IconProps) => {
  const IconComponent = icons[name];

  return <IconComponent width={size} height={size} color={color} {...props} />;
};
