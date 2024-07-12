import { useState } from 'react';
import dynamic from 'next/dynamic';

import { province } from '@/lib/fake/province';
import { cn } from '@/lib/utils';
import { useManagedState } from '@/hooks/useManageState';
import { useScreenDetector } from '@/hooks/useScreenDetector';
import { useBookForm } from '@/components/book-form/hooks/useBookForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

Content.displayName = 'ListAreaModalContent';
export function Content({
  className,
  setOpen,
}: {
  readonly className?: string;
  readonly setOpen: (open: boolean) => void;
}) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className='flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 sm:justify-between md:flex-nowrap md:px-10'>
        <p className='text-xl font-bold'>Chọn địa điểm</p>
        <Input className='h-8 max-w-64' placeholder='Tìm địa điểm ...' />
      </div>
      <Separator orientation='horizontal' />
      <div className='flex flex-col overflow-auto p-4'>
        <div className='grid grid-cols-2 px-6 text-black md:grid-cols-3 md:gap-3 md:px-10 lg:grid-cols-4'>
          {province.map((p) => (
            <Box key={p} setOpen={setOpen} value={p} />
          ))}
        </div>
      </div>
      <div className='grow' />
      <Separator orientation='horizontal' />
      <div className='flex w-full justify-end self-end p-3'>
        <Button
          variant='momo'
          className='text-md h-8 font-semibold'
          onClick={() => {
            setOpen(false);
          }}
        >
          Đóng
        </Button>
      </div>
    </div>
  );
}

Box.displayName = 'ListAreaModalBox';
function Box({
  value,
  setOpen,
}: {
  readonly value: string;
  readonly setOpen: (open: boolean) => void;
}) {
  const isSelected = useBookForm((state) => state.selectedArea === value);
  const setSelectedArea = useBookForm((state) => state.setSelectedArea);

  return (
    <div
      className={cn(
        'hover: cursor-pointer rounded-md border border-transparent p-2 transition-colors hover:bg-gray-200',
        {
          'border-momo text-momo': isSelected,
        }
      )}
      onClick={() => {
        setSelectedArea(value);
        setOpen(false);
      }}
    >
      {value}
    </div>
  );
}

MyDrawer.displayName = 'ListAreaModalDrawer';
function MyDrawer({
  children,
  className,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}) {
  const [open, onOpenChange] = useManagedState(
    externalOpen,
    externalOnOpenChange
  );

  return (
    <Drawer handleOnly open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className={className}>{children}</DrawerTrigger>
      <DrawerContent
        hasHandleBar={false}
        className={cn('flex max-h-[90vh] flex-col')}
      >
        <Content
          setOpen={onOpenChange}
          className='max-lg:max-h-[calc(100vh-200px)]'
        />
      </DrawerContent>
    </Drawer>
  );
}

MyDialog.displayName = 'ListAreaModalDialog';
function MyDialog({
  children,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  className,
}: {
  readonly children?: React.ReactNode;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly className?: string;
}) {
  const [open, onOpenChange] = useManagedState(
    externalOpen,
    externalOnOpenChange
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'flex h-full max-h-[calc(100%-80px)] max-w-3xl flex-col p-0'
        )}
      >
        <Content setOpen={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

export const ListAreaModal = dynamic(
  async () =>
    Promise.resolve(
      ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className?: string;
      }) => {
        const { isDesktop } = useScreenDetector();
        const [open, setOpen] = useState(false);

        if (isDesktop) {
          return (
            <MyDialog className={className} open={open} onOpenChange={setOpen}>
              {children}
            </MyDialog>
          );
        }

        return (
          <MyDrawer className={className} open={open} onOpenChange={setOpen}>
            {children}
          </MyDrawer>
        );
      }
    ),
  {
    ssr: false,
  }
);
ListAreaModal.displayName = 'ListAreaModal';
