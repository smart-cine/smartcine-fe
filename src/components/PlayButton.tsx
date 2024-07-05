import { cn } from '@/lib/utils';

import { TrailerTrigger } from './dialog/TrailerTrigger';
import { PlayIcon } from './icon/PlayIcon';

type ButtonProps = {
  readonly onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  readonly className?: string;
  readonly hasBorder?: boolean;
  readonly outsideClass?: string;
  readonly onClickOutside?: () => void;
};

type PlayButtonProps = ButtonProps & {
  readonly film_id: string;
  readonly hasTrailerTrigger?: boolean;
};

export function PlayButton(props: PlayButtonProps) {
  return props.hasTrailerTrigger ? (
    <TrailerTrigger film_id={props.film_id}>
      <Button
        hasBorder={props.hasBorder}
        className={props.className}
        outsideClass={props.outsideClass}
        onClick={props.onClick}
        onClickOutside={props.onClickOutside}
      />
    </TrailerTrigger>
  ) : (
    <Button
      hasBorder={props.hasBorder}
      className={props.className}
      outsideClass={props.outsideClass}
      onClick={props.onClick}
      onClickOutside={props.onClickOutside}
    />
  );
}

function Button(props: ButtonProps) {
  return (
    <div
      className={cn(
        'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
        props.outsideClass
      )}
      onClick={(e) => {
        if (props.onClickOutside) {
          props.onClickOutside();
          e.stopPropagation();
        }
      }}
    >
      <PlayIcon
        className={cn(
          'mx-auto h-10 w-10 cursor-pointer text-white duration-200 hover:scale-[110%]',
          {
            'rounded-full border-2 border-white bg-black bg-opacity-25':
              props.hasBorder,
          },
          props.className
        )}
        onClick={props.onClick}
      />
    </div>
  );
}
