export const cinemaList = [
  'CGV',
  'BHD',
  'Galaxy',
  'Lotte',
  'MegaGS',
  'Beta',
  'DongDai',
  'CineStar',
  'AMong',
  'AMong us',
  'AMong us',
  'AMong us',
  'AMong us',
];

export function ListCinema() {
  return (
    <div className='listrap flex flex-row gap-x-5'>
      {cinemaList.map((cinema) => (
        <div
          key={cinema}
          className='flex w-[50px] flex-col items-center justify-center gap-y-2'
        >
          <div className='h-12 w-12 rounded-md border border-gray-200 p-2' />
          <p className='line-clamp-1 text-sm text-gray-500'>{cinema}</p>
        </div>
      ))}
    </div>
  );
}
