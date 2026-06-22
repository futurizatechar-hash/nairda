import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nairda Admin | Login',
  manifest: '/manifest-admin.json',
};

// Force Cloudflare to treat this route as dynamic to prevent 405 errors on Server Actions
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
