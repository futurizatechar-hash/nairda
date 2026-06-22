import { Metadata } from 'next';
import AgendaDashboard from '@/components/admin/AgendaDashboard';

export const metadata: Metadata = {
  title: 'Nairda Admin | Agenda',
  manifest: '/manifest-admin.json',
};

export default function AgendaPage() {
  return <AgendaDashboard />;
}
