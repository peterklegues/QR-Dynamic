import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarNavItem {
  title: string;
  icon: LucideIcon;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  activeTitle: string;
  onSelect: (title: string) => void;
}

export function SidebarNav({ items, activeTitle, onSelect }: SidebarNavProps) {
  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          className={cn(
            "justify-start px-4 py-2 rounded-md text-sm font-medium",
            activeTitle === item.title
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "text-muted-foreground hover:bg-transparent hover:underline"
          )}
          onClick={() => onSelect(item.title)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      ))}
    </nav>
  );
}