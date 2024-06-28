export function CheckCircleIcon({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle opacity='0.1' cx='12' cy='12' r='12' fill='#A50064' />
      <path
        d='M17.3332 8L9.99984 15.3333L6.6665 12'
        stroke='#A50064'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}
