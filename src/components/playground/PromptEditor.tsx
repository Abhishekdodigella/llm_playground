import React, { useState } from 'react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Send, Save, Repeat, XCircle } from 'lucide-react';
import { useModels } from '../../context/ModelContext';

interface PromptEditorProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const { selectedModel } = useModels();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Tabs
        defaultValue="basic"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium text-slate-700"
                >
                  Prompt
                </label>
                <span className="text-xs text-slate-500">
                  Model: {selectedModel?.name || 'None selected'}
                </span>
              </div>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="min-h-[200px] resize-y"
              />
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setPrompt('')}
                    disabled={!prompt || isLoading}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    disabled={isLoading}
                  >
                    <Save className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                </div>
                <Button
                  type="submit"
                  disabled={!prompt.trim() || isLoading || !selectedModel}
                  className="relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="system-message"
                className="text-sm font-medium text-slate-700"
              >
                System Message
              </label>
              <Textarea
                id="system-message"
                placeholder="Enter system message..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="user-prompt"
                className="text-sm font-medium text-slate-700"
              >
                User Prompt
              </label>
              <Textarea
                id="user-prompt"
                placeholder="Enter user prompt..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-700">
                Parameters
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="temperature"
                    className="text-xs text-slate-600"
                  >
                    Temperature: 0.7
                  </label>
                  <input
                    id="temperature"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.7"
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max-tokens"
                    className="text-xs text-slate-600"
                  >
                    Max Tokens: 1024
                  </label>
                  <input
                    id="max-tokens"
                    type="range"
                    min="1"
                    max="4096"
                    step="1"
                    defaultValue="1024"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <Button
              type="button"
              disabled={isLoading || !selectedModel}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Repeat className="mr-2 h-4 w-4" />
                  Generate Response
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-700">
              Prompt Templates
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                'Summarize content',
                'Generate ideas',
                'Answer questions',
                'Code explanation',
                'Data analysis',
                'Creative writing',
              ].map((template) => (
                <Button
                  key={template}
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setPrompt(
                      `Template: ${template}\n\nInstructions: Please ${template.toLowerCase()} based on the following information:\n\n[Your content here]`
                    );
                    setActiveTab('basic');
                  }}
                >
                  {template}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};