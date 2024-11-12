import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { List1 } from "./list1/page";
import { List2 } from "./list2/page";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex gap-6">
            <a
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 
                                 dark:hover:text-primary-400 transition-colors"
            >
              Home
            </a>
            <a
              href="/list1"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 
                                      dark:hover:text-primary-400 transition-colors"
            >
              List 1
            </a>
            <a
              href="/list2"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 
                                      dark:hover:text-primary-400 transition-colors"
            >
              List 2
            </a>
          </div>
        </div>
      </nav>
      <main className="py-8">
        <Outlet />
      </main>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Welcome! Select a list.</div>,
});

const list1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/list1",
  component: List1,
});

const list2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/list2",
  component: List2,
});

const routeTree = rootRoute.addChildren([indexRoute, list1Route, list2Route]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient(),
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
