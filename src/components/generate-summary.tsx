"use client";

import { useState } from "react";
import { generateCaseStudySummary } from "@/ai/flows/generate-case-study-summary";
import { Button } from "./ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";

type GenerateSummaryProps = {
    projectId: string;
};

export default function GenerateSummary({ projectId }: GenerateSummaryProps) {
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setSummary(null);

        try {
            const result = await generateCaseStudySummary({ projectId });
            if (result.summary) {
                setSummary(result.summary);
            } else {
                setError("Failed to generate a summary. The result was empty.");
            }
        } catch (e) {
            setError("An error occurred while generating the summary.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="not-prose my-12 p-6 border rounded-lg bg-secondary/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="font-headline text-xl font-semibold">AI-Generated Summary</h3>
                    <p className="text-muted-foreground text-sm">Click the button to generate a short case study summary with Genkit.</p>
                </div>
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Generating...' : 'Generate Summary'}
                </Button>
            </div>

            {isLoading && (
                 <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            )}
            
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {summary && !isLoading && (
                <Alert className="mt-4">
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>Summary</AlertTitle>
                    <AlertDescription>
                        {summary}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
