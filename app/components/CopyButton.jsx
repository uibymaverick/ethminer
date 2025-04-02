'use client';
import { useOs } from '@mantine/hooks';
import { useCallback } from 'react';
import { Notify } from 'notiflix';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';

function CopyButton({ text, size = 4 }) {
  const os = useOs();

  const copyToClipboard = useCallback(
    async (string) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          // Navigator clipboard API method
          await navigator.clipboard.writeText(string);
          return true;
        } else {
          // Fallback method
          const textarea = document.createElement('textarea');
          textarea.value = string;
          textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
          textarea.style.left = '-9999px'; // Move off-screen
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const result = document.execCommand('copy');
          document.body.removeChild(textarea);
          if (!result) {
            throw new Error('Copy command failed');
          }
          return true;
        }
      } catch (err) {
        console.error(err);
        const isMac = os === 'macos';
        const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
        prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
        return false;
      }
    },
    [os]
  );

  return (
    <button
      onClick={async () => {
        const success = await copyToClipboard(text);
        if (success) {
          Notify.success('Copied to clipboard');
        } else {
          Notify.error('Failed to copy to clipboard');
        }
      }}
      className='rounded-full cursor-pointer text-zinc-500 active:text-success'
    >
      <DocumentDuplicateIcon className={`w-${size} h-${size}`} />
    </button>
  );
}

export default CopyButton;
