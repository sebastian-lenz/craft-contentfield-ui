import * as React from 'react';

export type Props = Omit<
  React.HTMLAttributes<SVGSVGElement>,
  'height' | 'width'
> & {
  url: string;
  height: number;
  width: number;
  onImagePointerDown?: VoidFunction;
};

export const Image = React.forwardRef<SVGSVGElement, Props>(
  ({ children, onImagePointerDown, url, ...props }, ref) => (
    <svg {...props} ref={ref}>
      <image
        href={url}
        height={props.height}
        onPointerDown={onImagePointerDown}
        width={props.width}
      />
      {children}
    </svg>
  )
);
