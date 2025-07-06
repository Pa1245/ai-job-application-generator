import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FileUploader from "@/components/FileUploader";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Sparkles, Brain, Zap } from "lucide-react";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{resume: string, coverLetter: string} | null>(null);

  const handleGenerate = async () => {
    if (!selectedFile || !jobDescription.trim()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('job_description', jobDescription);

      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults({
        resume: data.resume,
        coverLetter: data.cover_letter
      });
    } catch (error) {
      console.error('Error generating materials:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerate = selectedFile && jobDescription.trim();

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="bg-gradient-primary shadow-elegant">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-background/10 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              AI Resume & Cover Letter Generator
            </h1>
          </div>
          <p className="text-center text-white/90 mt-3 text-lg">
            Get perfectly tailored application materials in seconds
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!results ? (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-card border-border/50 bg-card/95 backdrop-blur-sm">
              <CardContent className="p-8 space-y-8">
                {!isLoading ? (
                  <>
                    {/* File Upload */}
                    <FileUploader 
                      onFileSelect={setSelectedFile}
                      selectedFile={selectedFile}
                    />

                    {/* Job Description Input */}
                    <JobDescriptionInput
                      value={jobDescription}
                      onChange={setJobDescription}
                    />

                    {/* Generate Button */}
                    <div className="pt-4">
                      <Button
                        onClick={handleGenerate}
                        disabled={!canGenerate}
                        className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Application Materials
                        <Zap className="h-5 w-5 ml-2" />
                      </Button>
                      
                      {!canGenerate && (
                        <p className="text-sm text-muted-foreground text-center mt-3">
                          Please upload your resume and paste a job description to continue
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <LoadingSpinner />
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <Button
                onClick={() => {
                  setResults(null);
                  setSelectedFile(null);
                  setJobDescription("");
                }}
                variant="outline"
                className="mb-4"
              >
                Generate New Materials
              </Button>
            </div>
            
            <ResultsDisplay 
              resume={results.resume}
              coverLetter={results.coverLetter}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Powered by AI • Built for job seekers worldwide
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;