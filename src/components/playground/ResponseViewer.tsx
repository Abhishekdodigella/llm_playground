import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Copy, Download, Code, FileText } from 'lucide-react';

interface ResponseViewerProps {
  response: string | null;
  metrics?: {
    latency: number;
    tokens: {
      input: number;
      output: number;
    };
  };
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({
  response,
  metrics,
}) => {
  const [activeView, setActiveView] = useState('text');

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response);
    }
  };

  if (!response) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-3 py-12">
          <div className="rounded-full bg-slate-100 p-3">
            <FileText className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">
            No Response Yet
          </h3>
          <p className="max-w-md text-sm text-slate-500">
            Submit a prompt to see the model response here. You can test
            different prompts and compare results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="font-medium text-slate-900">Model Response</h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title="Download response"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="text" onValueChange={setActiveView} className="p-4">
        <TabsList className="mb-4">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="min-h-[300px]">
          <div className="prose max-w-none rounded-md bg-white p-4">
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        </TabsContent>

        <TabsContent value="raw" className="min-h-[300px]">
          <div className="rounded-md bg-slate-950 p-4">
            <pre className="text-sm text-slate-50">{response}</pre>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="min-h-[300px]">
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">Latency</p>
                <p className="text-2xl font-bold text-slate-900">
                  {metrics?.latency || 0}ms
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">Input Tokens</p>
                <p className="text-2xl font-bold text-slate-900">
                  {metrics?.tokens.input || 0}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">Output Tokens</p>
                <p className="text-2xl font-bold text-slate-900">
                  {metrics?.tokens.output || 0}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h4 className="mb-2 font-medium text-slate-900">
                Performance Analysis
              </h4>
              <p className="text-sm text-slate-700">
                Response was generated in {metrics?.latency || 0}ms with a total of{' '}
                {(metrics?.tokens.input || 0) + (metrics?.tokens.output || 0)}{' '}
                tokens. The model processed input efficiently and produced a
                comprehensive response.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};