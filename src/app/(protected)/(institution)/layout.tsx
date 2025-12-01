'use client';

import { ReactNode } from 'react';
import RouteGuard from '@/components/RouteGuard';

export default function InstitutionLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard allowedRoles={['Institution']}>
      {children}
    </RouteGuard>
  );
}