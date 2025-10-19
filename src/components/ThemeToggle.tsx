import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 text-foreground hover:text-primary transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
};

export default ThemeToggle;
