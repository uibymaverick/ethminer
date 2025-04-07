'use client';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  router.push('/games');
  return (
    <>

    </>
  )
}

export default page