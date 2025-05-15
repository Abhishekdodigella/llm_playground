export interface User {
  id: string;
  name: string;
  email: string;
  role: 'researcher' | 'developer' | 'admin';
  avatar?: string;
}

export interface Model {
  id: string;
  name: string;
  provider: 'aws' | 'azure' | 'gcp' | 'anthropic' | 'openai' | 'custom';
  description: string;
  capabilities: string[];
  parameters?: Record<string, any>;
  apiEndpoint?: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tags: string[];
  version: number;
  parentId?: string;
}

export interface PromptResponse {
  id: string;
  promptId: string;
  modelId: string;
  content: string;
  createdAt: string;
  metrics: {
    latency: number;
    tokens: {
      input: number;
      output: number;
    };
    cost?: number;
  };
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  entries: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tags: string[];
}

export interface FineTuningJob {
  id: string;
  name: string;
  modelId: string;
  datasetId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  metrics?: Record<string, any>;
  userId: string;
}

export interface ApiKey {
  id: string;
  provider: 'aws' | 'azure' | 'gcp' | 'anthropic' | 'openai' | 'custom';
  name: string;
  key: string;
  userId: string;
  createdAt: string;
}