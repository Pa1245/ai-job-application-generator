import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  resume: string;
  coverLetter: string;
}

const ResultsDisplay = ({ resume, coverLetter }: ResultsDisplayProps) => {
  const [copiedStates, setCopiedStates] = useState<{resume: boolean, coverLetter: boolean}>({
    resume: false,
    coverLetter: false
  });
  const { toast } = useToast();

  const handleCopy = async (content: string, type: 'resume' | 'coverLetter') => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      
      toast({
        title: "Copied to clipboard!",
        description: `Your ${type === 'resume' ? 'resume' : 'cover letter'} has been copied.`,
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: `Your ${filename} is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
        Your Tailored Application Materials
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tailored Resume */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
              Tailored Resume
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(resume, 'resume')}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {copiedStates.resume ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="ml-2">
                    {copiedStates.resume ? 'Copied!' : 'Copy'}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(resume, 'tailored-resume.txt')}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Download className="h-4 w-4" />
                  <span className="ml-2">Download</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border border-border/50 p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                {resume}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tailored Cover Letter */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
              Tailored Cover Letter
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(coverLetter, 'coverLetter')}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {copiedStates.coverLetter ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="ml-2">
                    {copiedStates.coverLetter ? 'Copied!' : 'Copy'}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(coverLetter, 'tailored-cover-letter.txt')}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Download className="h-4 w-4" />
                  <span className="ml-2">Download</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border border-border/50 p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                {coverLetter}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;