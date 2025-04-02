import React from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@mantine/hooks';
import { ChevronLeftIcon, XCircleIcon } from '@heroicons/react/24/solid';

function Modal({
  title,
  open,
  setOpen,
  children,
  hFit = false,
  important = false,
  hideX = false,
}) {
  const clickOutsideRef = useClickOutside(() => {
    if (!important) {
      setOpen(false);
    }
  });
  return (
    open &&
    createPortal(
      <div
        style={{
          zIndex: 1000,
        }}
        className='fixed top-0 left-0 flex flex-col items-center justify-center w-full p-4 h-dvh bg-black/70 backdrop-blur-sm'
      >
        {open && (
          <div
            ref={clickOutsideRef}
            className={`flex flex-col w-full max-h-full max-w-lg p-3 border-2 rounded-3xl bg-base-300 border-base-200/50 scrollbar-thin scrollbar-track-white/30 scrollbar-thumb-white/10 animate__animated animate__slideInUp animate__faster ${
              hFit ? 'h-fit' : 'h-full'
            }`}
          >
            <div
              onClick={() => setOpen(false)}
              className='flex font-bold items-center w-full text-2xl max-w-lg pb-2 pl-2 text-white justify-between'
            >
              {title && title}
              {!hideX && (
                <button onClick={() => setOpen()} className='text-base-100'>
                  <XCircleIcon className='w-8 h-8' />
                </button>
              )}
            </div>
            <div className='flex-grow overflow-y-auto'>{children}</div>
          </div>
        )}
      </div>,
      document.body
    )
  );
}

export default Modal;
