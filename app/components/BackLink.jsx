import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

function BackLink() {
  const router = useRouter();
  return (
    <div className='flex'>
      <button
        onClick={() => router.back()}
        className='flex font-semibold items-center text-primary rounded-full'
      >
        <ChevronLeftIcon className='w-6 h-6' />
        Back
      </button>
    </div>
  );
}

export default BackLink;
