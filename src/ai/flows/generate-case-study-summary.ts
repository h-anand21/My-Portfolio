'use server';
/**
 * @fileOverview Generates a short case study summary for a project using AI.
 *
 * - generateCaseStudySummary - A function that generates the case study summary.
 * - GenerateCaseStudySummaryInput - The input type for the generateCaseStudySummary function.
 * - GenerateCaseStudySummaryOutput - The return type for the generateCaseStudySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaseStudySummaryInputSchema = z.object({
  projectId: z.string().describe('The ID of the project for which to generate the case study summary.'),
  promptOptions: z.string().optional().describe('Optional prompt options to customize the summary generation.'),
});
export type GenerateCaseStudySummaryInput = z.infer<typeof GenerateCaseStudySummaryInputSchema>;

const GenerateCaseStudySummaryOutputSchema = z.object({
  summary: z.string().describe('The generated short summary of the project case study.'),
});
export type GenerateCaseStudySummaryOutput = z.infer<typeof GenerateCaseStudySummaryOutputSchema>;

export async function generateCaseStudySummary(input: GenerateCaseStudySummaryInput): Promise<GenerateCaseStudySummaryOutput> {
  return generateCaseStudySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaseStudySummaryPrompt',
  input: {schema: GenerateCaseStudySummaryInputSchema},
  output: {schema: GenerateCaseStudySummaryOutputSchema},
  prompt: `You are an expert marketing writer, and your job is to write compelling summaries of case studies.

  Given the project ID: {{{projectId}}}, generate a concise and engaging one-sentence summary of the project's case study, optimized for quick comprehension.
  The prompt options are: {{{promptOptions}}}
  `
});

const generateCaseStudySummaryFlow = ai.defineFlow(
  {
    name: 'generateCaseStudySummaryFlow',
    inputSchema: GenerateCaseStudySummaryInputSchema,
    outputSchema: GenerateCaseStudySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
