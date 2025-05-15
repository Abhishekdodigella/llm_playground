import React, { useState } from 'react';
import { ModelSelector } from '../components/playground/ModelSelector';
import { PromptEditor } from '../components/playground/PromptEditor';
import { ResponseViewer } from '../components/playground/ResponseViewer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Save, Share } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Playground: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    latency: 0,
    tokens: { input: 0, output: 0 },
  });

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with random delay
      const startTime = Date.now();
      await new Promise((resolve) => 
        setTimeout(resolve, 1000 + Math.random() * 2000)
      );
      const latency = Date.now() - startTime;
      
      // Generate a mock response
      const mockResponses = [
        "Based on your prompt, I've analyzed the data and found several interesting patterns. The key insights are:\n\n1. User engagement increases by 27% when personalized recommendations are implemented\n2. The average session duration is 4.5 minutes\n3. Mobile users account for 68% of total traffic\n\nThese findings suggest that focusing on mobile optimization and personalization would yield the best results for improving overall user experience and retention.",
        "I've examined the code you provided and identified a few potential improvements:\n\n```javascript\n// Original code\nfunction processData(data) {\n  let results = [];\n  for (let i = 0; i < data.length; i++) {\n    results.push(data[i] * 2);\n  }\n  return results;\n}\n\n// Improved version\nfunction processData(data) {\n  return data.map(item => item * 2);\n}\n```\n\nThe improved version uses array methods which are more readable and concise. This approach also eliminates the need for manual index tracking and array mutation.",
        "The research paper you've referenced makes several important claims about artificial intelligence development. Here's my analysis:\n\n- The authors present a novel approach to transformer architecture that reduces computational requirements by 35%\n- Their findings suggest that sparse attention mechanisms can maintain accuracy while significantly improving efficiency\n- The evaluation methodology is robust, using multiple benchmarks and comparison against four state-of-the-art models\n\nHowever, I noticed some limitations in their approach. The model still struggles with long-term dependencies beyond certain context lengths, and the performance gains diminish on smaller datasets."
      ];
      
      // Select a random response
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      // Generate random token counts
      const inputTokens = Math.floor(prompt.length / 4);
      const outputTokens = Math.floor(randomResponse.length / 4);
      
      setResponse(randomResponse);
      setMetrics({
        latency,
        tokens: {
          input: inputTokens,
          output: outputTokens,
        }
      });
    } catch (error) {
      console.error('Error submitting prompt:', error);
      setResponse('An error occurred while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Playground</h1>
          <p className="text-slate-600">
            Test and experiment with different models and prompts
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ModelSelector />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Saved Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Data analysis template', 'Code review', 'Creative writing'].map((prompt, i) => (
                <div 
                  key={i}
                  className="cursor-pointer rounded-md border border-slate-200 p-2 text-sm hover:border-indigo-300 hover:bg-indigo-50"
                >
                  {prompt}
                  <div className="mt-1 flex">
                    <Badge variant="secondary" className="text-xs">
                      {['Analysis', 'Code', 'Creative'][i]}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs">
                View all saved prompts
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-3">
          <PromptEditor onSubmit={handlePromptSubmit} isLoading={isLoading} />
          <ResponseViewer response={response} metrics={metrics} />
        </div>
      </div>
    </div>
  );
};