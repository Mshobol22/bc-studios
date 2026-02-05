/**
 * Protected app layout for the SaaS dashboard.
 * Wrap children with ClerkProvider + auth check when you add @clerk/nextjs.
 * For now: placeholder layout; add <ClerkProvider> and redirect unauthenticated users to /dashboard (login) or sign-in page.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: When Clerk is installed, use:
  // - ClerkProvider wrapper
  // - auth() or useAuth() to redirect unauthenticated users to sign-in
  return (
    <div className="relative z-10 min-h-screen">
      {children}
    </div>
  );
}
