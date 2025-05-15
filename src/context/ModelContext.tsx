import React, { createContext, useContext, useState, useEffect } from 'react';
import { Model } from '../types';

interface ModelContextType {
  models: Model[];
  selectedModel: Model | null;
  isLoading: boolean;
  error: string | null;
  selectModel: (modelId: string) => void;
  addModel: (model: Omit<Model, 'id'>) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModels = () => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModels must be used within a ModelProvider');
  }
  return context;
};

// Mock data
const mockModels: Model[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'Advanced language model with improved reasoning capabilities',
    capabilities: ['chat', 'completion', 'embedding', 'function-calling'],
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    description: 'State-of-the-art model with strong reasoning and safety features',
    capabilities: ['chat', 'completion', 'reasoning'],
  },
  {
    id: '3',
    name: 'Gemini 1.5 Pro',
    provider: 'gcp',
    description: 'Google\'s multimodal model with strong context handling',
    capabilities: ['chat', 'completion', 'multimodal', 'reasoning'],
  },
  {
    id: '4',
    name: 'Llama 3 70B',
    provider: 'custom',
    description: 'Meta\'s open model with excellent performance',
    capabilities: ['chat', 'completion', 'embedding'],
    apiEndpoint: 'https://api.example.com/llama3',
  },
];

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setModels(mockModels);
        setSelectedModel(mockModels[0]);
      } catch (err) {
        setError('Failed to load models');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  const selectModel = (modelId: string) => {
    const model = models.find((m) => m.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
  };

  const addModel = (modelData: Omit<Model, 'id'>) => {
    const newModel: Model = {
      ...modelData,
      id: Date.now().toString(),
    };
    setModels((prevModels) => [...prevModels, newModel]);
  };

  return (
    <ModelContext.Provider
      value={{
        models,
        selectedModel,
        isLoading,
        error,
        selectModel,
        addModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};