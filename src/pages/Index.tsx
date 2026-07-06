import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Code,
  ComponentIcon,
  Copy,
  Palette,
} from "lucide-react";
import { useSearch } from "@/pages/components/SearchContext";

export default function Index() {
  const { searchQuery } = useSearch();

  const categories = [
    {
      title: "Buttons",
      description: "Collection of button styles and variants",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/buttons",
    },
    {
      title: "Toggles",
      description: "Toggle switches and controls",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/toggles",
    },
    {
      title: "Checkboxes",
      description: "Checkbox inputs with various styles",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/checkboxes",
    },
    {
      title: "Cards",
      description: "Card layouts and designs",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/cards",
    },
    {
      title: "Forms",
      description: "Form controls and layouts",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/forms",
    },
    {
      title: "Navigation Bars",
      description: "Navigation components and menus",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/navigation",
    },
    {
      title: "Loaders",
      description: "Loading indicators and spinners",
      icon: <ComponentIcon className="h-10 w-10 text-primary" />,
      href: "/components/loaders",
    },
  ];

  const filteredCategories = categories.filter((category) => {
    const query = searchQuery.toLowerCase();

    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  });

  const features = [
    {
      title: "Copy & Paste Ready",
      description:
        "All components are ready to use with simple copy and paste functionality",
      icon: <Copy className="h-10 w-10 text-primary" />,
    },
    {
      title: "Customizable",
      description:
        "Easily customize components to match your project's design system",
      icon: <Palette className="h-10 w-10 text-primary" />,
    },
    {
      title: "Well Documented",
      description:
        "Each component comes with usage guidelines and best practices",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
    },
    {
      title: "Modern Code",
      description: "Clean, semantic HTML and modern CSS techniques",
      icon: <Code className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <Layout>
      <section className="py-12 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            UI Vault
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse, customize, and copy beautiful UI components for your web
            projects.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Component Categories</h2>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {filteredCategories.map((category) => (
              <Link key={category.title} to={category.href}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="mb-2">{category.icon}</div>

                    <CardTitle>{category.title}</CardTitle>

                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <div className="flex items-center text-primary">
                      <span className="mr-1">Browse components</span>

                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>

                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
