import React from 'react';
import { useModels } from '../../context/ModelContext';
import { Badge } from '../ui/Badge';

export const ModelSelector: React.FC = () => {
  const { models, selectedModel, selectModel, isLoading } = useModels();

  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col space-y-2 rounded-lg border border-slate-200 p-4">
        <div className="h-6 w-1/3 rounded bg-slate-200"></div>
        <div className="h-10 rounded bg-slate-200"></div>
        <div className="h-24 rounded bg-slate-200"></div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 font-medium text-slate-900">Select Model</h3>
      <div className="space-y-3">
        {models.map((model) => (
          <div
            key={model.id}
            className={`cursor-pointer rounded-lg border p-3 transition-all hover:border-indigo-300 ${
              selectedModel?.id === model.id
                ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                : 'border-slate-200'
            }`}
            onClick={() => selectModel(model.id)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{model.name}</span>
              <Badge
                variant={
                  model.provider === 'openai'
                    ? 'default'
                    : model.provider === 'anthropic'
                    ? 'secondary'
                    : model.provider === 'gcp'
                    ? 'success'
                    : 'outline'
                }
              >
                {model.provider}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {model.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {model.capabilities.map((capability) => (
                <span
                  key={capability}
                  className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};