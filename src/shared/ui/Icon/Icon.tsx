import type { SVGProps } from "react";
import Logo from "./assets/logo.svg?react";

export const icons = {
  logo: Logo,
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
