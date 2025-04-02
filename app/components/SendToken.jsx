import { useWriteContract } from 'wagmi';
import { erc20Abi, parseUnits } from 'viem';

export default function SendToken({ token, to, amount, address, disabled }) {
  const { writeContract, isPending, isSuccess, data } = useWriteContract();

  return (
    <div className='w-full'>
      <button
        disabled={disabled || isPending}
        onClick={() => {
          try {
            const parsedAmount = amount
              ? parseUnits(amount, token.decimals)
              : undefined;
            console.log(parsedAmount, address, to, token, erc20Abi);

            writeContract({
              abi: erc20Abi,
              address: token.address,
              functionName: 'transfer',
              args: [to, parsedAmount],
            });
          } catch (error) {
            console.error(error);
          }
        }}
        className='w-full button button-success'
      >
        {isPending ? 'Sending...' : 'Send'}
      </button>

      {isSuccess && (
        <p className='text-success'>
          ✅ Transaction sent:{' '}
          <a href={`https://etherscan.io/tx/${data?.hash}`} target='_blank'>
            View on Etherscan
          </a>
        </p>
      )}
    </div>
  );
}
