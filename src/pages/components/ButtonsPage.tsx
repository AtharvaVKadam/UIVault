import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ComponentCard } from "@/components/ComponentCard";
import { ComponentViewer } from "@/components/ComponentViewer";
import { useComponents } from "@/lib/component-data";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { useSearch } from "./SearchContext";

export default function ButtonsPage() {
  const { buttonComponents } = useComponents();
  const { id } = useParams();

  const { searchQuery } = useSearch();

  const [radius, setRadius] = useState(4);
  const [selectedColor, setSelectedColor] = useState("blue");

  const selectedComponent = id
    ? buttonComponents.find((component) => component.id === id)
    : null;

  const filteredButtons = buttonComponents.filter((component) => {
    const query = searchQuery.toLowerCase();

    return (
      component.title.toLowerCase().includes(query) ||
      component.description.toLowerCase().includes(query)
    );
  });

  const colors = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "purple", label: "Purple" },
  ];

  const colorMap: Record<string, string> = {
    blue: "#2563eb",
    green: "#10b981",
    red: "#ef4444",
    purple: "#8b5cf6",
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {selectedComponent ? (
          <div>
            <h1 className="text-3xl font-bold mb-6">Button Components</h1>

            <ComponentViewer
              title={selectedComponent.title}
              description={selectedComponent.description}
              preview={selectedComponent.preview}
              html={selectedComponent.html}
              css={selectedComponent.css}
            />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Button Components</h1>

              <p className="text-muted-foreground">
                Collection of button styles and variants for your web projects.
              </p>
            </div>

            {filteredButtons.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">
                  No components found
                </h2>

                <p className="text-muted-foreground">
                  Try another search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredButtons.map((component) => (
                  <ComponentCard
                    key={component.id}
                    title={component.title}
                    description={component.description}
                    preview={component.preview}
                    href={`/components/buttons/${component.id}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
