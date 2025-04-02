'use client';

import { useEffect } from 'react';
import { recoverMessageAddress } from 'viem';
import { useAccount, useSignMessage } from 'wagmi';
function SignMessage() {
  const { address } = useAccount();
  const { data, isError, error, status, isSuccess, signMessage, variables } =
    useSignMessage({
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  async function login(data) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          signature: data,
          message: variables?.message,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
  }

  useEffect(() => {
    if (isSuccess) {
      login(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, data, isError]);

  const verify = async (message, signature, address) => {
    console.log(message, signature, address);

    const signer = await recoverMessageAddress({
      message,
      signature,
    });
    if (signer.toLowerCase() === address.toLowerCase()) {
      console.log('✅ Verified! Signed by the correct wallet.');
    } else {
      console.log('❌ Signature invalid or from different wallet.');
    }
  };

  return (
    <div className='flex gap-2 w-full items-center p-1 justify-center'>
      <button
        className='button button-success w-full'
        onClick={() =>
          signMessage({
            account: address,
            message: JSON.stringify({
              text: `Log me in ${address}`,
              timestamp: Date.now(),
            }),
          })
        }
        disabled={!address || status === 'pending'}
      >
        {status === 'pending' ? 'Signing...' : 'Sign message'}
      </button>
      <button
        className='button w-full'
        onClick={() => {
          if (data) {
            verify(variables?.message, data, address);
          }
        }}
        disabled={!data}
      >
        Verify signature
      </button>
    </div>
  );
}

export default SignMessage;
