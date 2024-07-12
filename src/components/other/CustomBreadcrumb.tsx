import { useRouter } from 'next/router';
import { HomeIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type TBreadcrumbRoute = {
  readonly route: string;
  readonly label: string;
};

export function CustomBreadcrumb({
  routes,
}: {
  readonly routes: TBreadcrumbRoute[];
}) {
  const router = useRouter();
  if (!routes.length) return null;

  return (
    <Breadcrumb className='py-4'>
      <BreadcrumbList className=''>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>
            <HomeIcon className='h-4 w-4' />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {routes.map((route, index) => (
          <div key={route.route} className='flex items-center gap-x-2'>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={route.route}
                className={cn({
                  'text-black': index < routes.length - 1,
                })}
              >
                {route.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < routes.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
