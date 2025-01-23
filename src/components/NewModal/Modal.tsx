import { XMarkIcon } from '@heroicons/react/24/outline';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import cn from '@/utils/class-names';

const sizes = {
  regular: 'max-w-lg',
  medium: 'max-w-xl',
  large: 'max-w-3xl',
  xl: 'max-w-screen-lg',
};

type Props = ComponentPropsWithoutRef<'div'> & {
  closable?: boolean;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  showDialog: boolean;
  titleElement?: ReactNode;
  hasInnerPadding?: boolean;
  onDismiss: () => void;
  size?: keyof typeof sizes;
  zIndex?: string | null;
};

function Modal({
  closable = true,
  children,
  overlayClassName,
  contentClassName,
  headerClassName,
  bodyClassName,
  hasInnerPadding = true,
  onDismiss,
  title,
  titleElement,
  showDialog = false,
  size = 'regular',
  zIndex = 'z-modal-overlay',
  ...props
}: Props) {
  return (
    <DialogOverlay
      allowPinchZoom
      {...props}
      isOpen={showDialog}
      onDismiss={closable ? onDismiss : undefined}
      className={clsx(
        overlayClassName,
        'fixed top-0 bottom-0 left-0 right-0 flex justify-center w-screen',
        'max-h-screen pt-20 mx-auto overflow-y-auto bg-black bg-opacity-50 z-10',
        zIndex,
      )}
    >
      <div
        className={clsx(
          sizes[size],
          'absolute flex items-start justify-center w-full h-auto',
          bodyClassName,
        )}
      >
        <DialogContent
          {...props}
          aria-label={title ?? props['aria-label']}
          className={cn(
            'pt-4 bg-white w-full h-auto mb-20 flex flex-col rounded-xl',
            contentClassName,
            { 'px-4 pb-4': hasInnerPadding },
          )}
        >
          <section
            className={clsx(
              headerClassName,
              'flex items-center justify-between pb-4',
            )}
          >
            {titleElement ?? (
              <p className="text-base font-semibold leading-3 text-grey-12">
                {title}
              </p>
            )}
            <button
              onClick={onDismiss}
              className="text-grey-8 hover:text-grey-10 focus:outline-none"
              type="button"
            >
              {closable && (
                <XMarkIcon className="w-5 h-5 fill-current text-black" />
              )}
            </button>
          </section>
          {children}
        </DialogContent>
      </div>
    </DialogOverlay>
  );
}

export default Modal;
