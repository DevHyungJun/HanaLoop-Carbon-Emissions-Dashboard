import NextImage, { type ImageProps } from "next/image";

import cn from "@/app/utils/cn";

type AppImageProps = ImageProps;

const AppImage = ({
  draggable = false,
  className,
  ...props
}: AppImageProps) => {
  return (
    <NextImage
      draggable={draggable}
      className={cn("select-none", className)}
      {...props}
    />
  );
};

export { AppImage };
export type { AppImageProps };
