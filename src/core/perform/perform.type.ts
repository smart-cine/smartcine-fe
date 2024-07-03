export type TPerform = {
  id: string;
  film_id: string;
  dest_id: string;
  price: number;
  translate_type: ETranslate;
  view_type: EView;
  start_time: Date;
  end_time: Date;
};

export enum ETranslate {
  VOICEOVER = 'voiceover',
  NARRATION = 'narration',
  SUBTITLE = 'subtitle',
}

export enum EView {
  V2D = '2d',
  V3D = '3d',
  IMAX = 'imax',
}
