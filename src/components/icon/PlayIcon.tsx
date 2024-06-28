export function PlayIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox='0 0 48 48'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g fill='none' fillRule='evenodd'>
        <circle
          stroke='#FFF'
          strokeWidth='2'
          fillOpacity='.24'
          fill='#000'
          cx='24'
          cy='24'
          r='23'
        />
        <path
          d='M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z'
          fill='#FFF'
          fillRule='nonzero'
        />
      </g>
    </svg>
  );
}
