import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: RootComponent,
});

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <a
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        Return home
      </a>
    </div>
  );
}

function RootComponent() {
  return (
    <>
      <div className="animate-page-enter">
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </>
  );
}