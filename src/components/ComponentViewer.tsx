import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clipboard, Wand2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSyntaxHighlighter } from "@/hooks/useSyntaxHighlighter";
import { Input } from "@/components/ui/input";
import DOMPurify from "dompurify";

interface ComponentViewerProps {
  title: string;
  description?: string;
  preview: React.ReactNode;
  html: string;
  css: string;
  customization?: React.ReactNode;
}

export function ComponentViewer({
  title,
  description,
  preview,
  html,
  css,
  customization,
}: ComponentViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const { toast } = useToast();

  // --- NEW: AI Feature State ---
  const [displayHtml, setDisplayHtml] = useState(html);
  const [displayCss, setDisplayCss] = useState(css);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPreviewHtml, setAiPreviewHtml] = useState<string | null>(null);

  useSyntaxHighlighter();

  const copyToClipboard = () => {
    // Updated to use the state variables so we copy the AI's changes
    const codeToCopy =
      activeTab === "html"
        ? displayHtml
        : activeTab === "css"
          ? displayCss
          : `${displayHtml}\n\n/* CSS */\n${displayCss}`;

    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: `${activeTab.toUpperCase()} code has been copied to your clipboard.`,
      });

      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Prism) {
      window.Prism.highlightAll();
    }
  }, [activeTab, displayHtml, displayCss]);

  // --- NEW: AI Fetch Function ---
  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/customize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          html: displayHtml,
          css: displayCss,
        }),
      });

      const data = await response.json();

      if (data.html) {
        setDisplayHtml(data.html);
        setAiPreviewHtml(data.html);
      }

      if (data.css) {
        setDisplayCss(data.css);
      }

      toast({
        title: "AI Customization Complete",
        description: "Your component has been updated.",
      });
      setAiPrompt("");
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not reach the AI service.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 p-6 border rounded-lg flex items-center justify-center bg-secondary/50 min-h-[200px] relative overflow-hidden">
            {/* CORRECTED: DOMPurify is now safely in the UI render block */}
            {aiPreviewHtml ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(aiPreviewHtml),
                }}
              />
            ) : (
              preview
            )}

            {/* Loading Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </div>

          {customization && (
            <div className="w-full lg:w-72 space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium">Settings</h3>
              {customization}
            </div>
          )}
        </div>

        {/* --- Ask AI Input UI --- */}
        <div className="flex items-center gap-2 p-3 bg-secondary/30 border rounded-lg">
          <Input
            placeholder="Ask AI to customize this component (e.g. 'make it red with rounded corners')"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
            className="flex-1 border-none bg-transparent focus-visible:ring-0 px-2"
          />
          <Button
            onClick={handleAskAI}
            disabled={isGenerating || !aiPrompt.trim()}
            size="sm"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Wand2 className="h-4 w-4 mr-2" />
            )}
            Customize
          </Button>
        </div>

        {/* Code Tabs */}
        <Tabs
          defaultValue="html"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex items-center justify-between mb-2">
            <TabsList>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
          <TabsContent value="html" className="mt-0">
            <pre>
              <code className="language-html">{displayHtml}</code>
            </pre>
          </TabsContent>
          <TabsContent value="css" className="mt-0">
            <pre>
              <code className="language-css">{displayCss}</code>
            </pre>
          </TabsContent>
          <TabsContent value="all" className="mt-0">
            <pre>
              <code className="language-html">{displayHtml}</code>
            </pre>
            <pre className="mt-4">
              <code className="language-css">{displayCss}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <h4 className="font-medium text-foreground mb-1">Usage Notes:</h4>
        <p>
          Copy and paste this code into your project. Customize as needed to
          match your project's design system.
        </p>
      </CardFooter>
    </Card>
  );
}
