import FinanzasDashboard from '@/components/admin/FinanzasDashboard';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nairda Admin | Finanzas',
  manifest: '/manifest-admin.json',
};

export default function FinanzasPage() {
  return <FinanzasDashboard />;
}
