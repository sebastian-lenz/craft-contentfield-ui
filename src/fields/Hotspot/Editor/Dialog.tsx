import Icon from '@app/components/Icon';
import * as React from 'react';

export type Props = React.HTMLAttributes<HTMLDialogElement> & {
  onClose?: VoidFunction;
};

export function Dialog({ children, ...props }: Props) {
  const ref = React.useRef<HTMLDialogElement>(null);
  React.useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      current.showModal();
    }
  }, []);

  return (
    <dialog {...props} className="tcfHotspotEditor__dialog" ref={ref}>
      <button
        className="tcfHotspotEditor__dialogCloser"
        onClick={props.onClose}
      >
        <Icon name="material:close" />
      </button>

      {children}
    </dialog>
  );
}
