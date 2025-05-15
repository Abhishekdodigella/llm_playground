import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ArrowRight, BarChart2, BookOpen, BrainCog, Database, FileText, FlaskRound as Flask, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const recentActivity = [
    {
      id: '1',
      title: 'Fine-tuned GPT-4 for medical analysis',
      date: '2 days ago',
      type: 'fine-tuning',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Tested prompt variations for product descriptions',
      date: '3 days ago',
      type: 'playground',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Added Claude 3 Opus model to workspace',
      date: '5 days ago',
      type: 'model',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-lg text-slate-600">
            Welcome back, {user?.name}
          </p>
        </div>
        <Button className="hidden sm:inline-flex">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              API Requests
            </CardTitle>
            <Flask className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1,432</div>
            <p className="text-xs text-slate-500">+22% from last month</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Models
            </CardTitle>
            <BrainCog className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">7</div>
            <p className="text-xs text-slate-500">3 added this month</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Datasets
            </CardTitle>
            <Database className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <p className="text-xs text-slate-500">4 GB total size</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Fine-tuning Jobs
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">3</div>
            <p className="text-xs text-slate-500">1 currently running</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 rounded-md border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div className="rounded-full bg-indigo-100 p-2">
                    {activity.type === 'playground' ? (
                      <Flask className="h-4 w-4 text-indigo-700" />
                    ) : activity.type === 'fine-tuning' ? (
                      <BrainCog className="h-4 w-4 text-indigo-700" />
                    ) : (
                      <FileText className="h-4 w-4 text-indigo-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.date}</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/playground">
                <div className="flex cursor-pointer flex-col space-y-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-indigo-50 hover:border-indigo-200">
                  <div className="flex items-center">
                    <Flask className="mr-2 h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium">
                      Open Playground
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Test prompts and experiment with different models
                  </p>
                </div>
              </Link>
              <Link to="/datasets">
                <div className="flex cursor-pointer flex-col space-y-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-indigo-50 hover:border-indigo-200">
                  <div className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium">
                      Manage Datasets
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Upload and organize your training data
                  </p>
                </div>
              </Link>
              <Link to="/models">
                <div className="flex cursor-pointer flex-col space-y-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-indigo-50 hover:border-indigo-200">
                  <div className="flex items-center">
                    <BrainCog className="mr-2 h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium">
                      Connect Models
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Set up connections to cloud AI providers
                  </p>
                </div>
              </Link>
              <Link to="/analytics">
                <div className="flex cursor-pointer flex-col space-y-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-indigo-50 hover:border-indigo-200">
                  <div className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium">
                      View Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Monitor performance metrics and usage
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tutorials">
            <TabsList className="mb-4">
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="api">API Docs</TabsTrigger>
            </TabsList>
            <TabsContent value="tutorials">
              <div className="space-y-4">
                {[
                  'Getting started with prompt engineering',
                  'Fine-tuning models for specialized tasks',
                  'Creating effective evaluation datasets',
                  'Optimizing model performance',
                ].map((tutorial, i) => (
                  <div
                    key={i}
                    className="group flex cursor-pointer items-center justify-between rounded-md border border-slate-200 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                  >
                    <div className="flex items-center">
                      <BookOpen className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-slate-900">
                        {tutorial}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="guides">
              <div className="space-y-4">
                {[
                  'Advanced chaining techniques',
                  'Setting up model evaluation pipelines',
                  'Best practices for dataset creation',
                  'Embedding models for semantic search',
                ].map((guide, i) => (
                  <div
                    key={i}
                    className="group flex cursor-pointer items-center justify-between rounded-md border border-slate-200 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                  >
                    <div className="flex items-center">
                      <FileText className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-slate-900">
                        {guide}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="api">
              <div className="space-y-4">
                {[
                  'API Reference',
                  'Authentication Guide',
                  'Rate Limiting',
                  'Webhook Integration',
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="group flex cursor-pointer items-center justify-between rounded-md border border-slate-200 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                  >
                    <div className="flex items-center">
                      <FileText className="mr-3 h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-slate-900">
                        {doc}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};