import { useEffect, useRef } from 'react';

export function useEvent<T extends Event = Event>(
  target: Element | Window,
  type: string,
  handler: (event: T) => void
) {
  const ref = useRef(handler);
  ref.current = handler;

  useEffect(() => {
    const handler = (event: any) => ref.current(event);
    target.addEventListener(type, handler);

    return () => {
      target.removeEventListener(type, handler);
    };
  }, []);
}
