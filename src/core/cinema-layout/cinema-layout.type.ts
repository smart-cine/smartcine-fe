export type TCinemaLayout = {
  id: string;
} & (
  | {
      type: ECinemaLayoutType.RECTANGLE;
      data: {
        width: number;
        height: number;
      };
    }
  | {
      type: ECinemaLayoutType.DYNAMIC;
      data: any;
    }
);

export enum ECinemaLayoutType {
  RECTANGLE,
  DYNAMIC,
}
