import * as React from 'react';

export const enum ResponsiveState {
  Small,
  Medium,
  Large,
}

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Context = React.createContext<ResponsiveState>(
  ResponsiveState.Large
);

export default function ResponsiveStateProvider({ children, ...props }: Props) {
  const [state, setState] = React.useState(ResponsiveState.Large);
  const element = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const { ResizeObserver } = window as any;
    const { current } = element;
    let handle: number = -1;
    let width = 0;

    if (!current) {
      return;
    }

    const onResize = () => {
      const currentWidth = current.offsetWidth;
      if (currentWidth !== width) {
        width = currentWidth;

        if (width > 920) {
          setState(ResponsiveState.Large);
        } else if (width > 580) {
          setState(ResponsiveState.Medium);
        } else {
          setState(ResponsiveState.Small);
        }
      }
    };

    if (ResizeObserver) {
      const observer = new ResizeObserver(onResize);
      observer.observe(current);
      return () => observer.unobserve(current);
    } else {
      const onFrame = () => {
        handle = window.requestAnimationFrame(onFrame);
        onResize();
      };

      onFrame();
      return () => window.cancelAnimationFrame(handle);
    }
  }, []);

  return (
    <div ref={element} {...props}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </div>
  );
}
