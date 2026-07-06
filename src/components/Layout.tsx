import { ReactNode, useState } from "react";
import { SidebarNav } from "./SidebarNav";
import { Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "./ui/input";
import { useSearch } from "@/pages/components/SearchContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 w-full">
        <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 md:px-6">
            <div className="flex items-center gap-2 md:ml-auto mr-4 lg:mr-6 md:gap-4">
              <div className="relative w-full md:w-64 lg:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                <Input
                  type="search"
                  placeholder="Search components..."
                  className="w-full pl-8 md:w-64 lg:w-96"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
