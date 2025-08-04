import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Brain, Zap, Target } from 'lucide-react';
import { emojiSampler } from '@/utils/llm-sampler';
import { 
  type LLMSamplingResult, 
  type SupportedModels, 
  type PrimeMappedEmbedding,
  EMOJI_BLOCK_TAPE 
} from '@/types/llm';
import { useToast } from '@/hooks/use-toast';

interface LLMSamplingInterfaceProps {
  className?: string;
}

const AVAILABLE_MODELS: { name: SupportedModels; label: string; description: string }[] = [
  {
    name: 'Xenova/bert-base-uncased',
    label: 'BERT Base',
    description: 'Bidirectional encoder, great for understanding context'
  },
  {
    name: 'Xenova/distilbert-base-uncased', 
    label: 'DistilBERT',
    description: 'Faster, lighter version of BERT'
  },
  {
    name: 'Xenova/all-MiniLM-L6-v2',
    label: 'MiniLM',
    description: 'Optimized for sentence embeddings'
  }
];

export const LLMSamplingInterface: React.FC<LLMSamplingInterfaceProps> = ({ className = '' }) => {
  const [selectedModel, setSelectedModel] = useState<SupportedModels>('Xenova/distilbert-base-uncased');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<LLMSamplingResult[]>([]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const { toast } = useToast();

  const sampleModel = useCallback(async (modelName: SupportedModels) => {
    setIsLoading(true);
    setProgress(0);
    setCurrentPhase('🎩 Initializing model...');

    try {
      // Initialize model
      await emojiSampler.initializeModel(modelName);
      setProgress(25);
      setCurrentPhase('🔢 Tokenizing emoji tape...');

      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(50);
      setCurrentPhase('🧬 Generating embeddings...');

      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(75);
      setCurrentPhase('🎯 Mapping to intrinsic primes...');

      // Sample the tape
      const result = await emojiSampler.sampleTape(modelName);
      setProgress(100);
      setCurrentPhase('🚀 Complete!');

      // Add to results
      setResults(prev => [result, ...prev]);

      toast({
        title: "🎩 Model Sampled Successfully",
        description: `${modelName} processed the emoji tape. Prime 2 (🎩) activation: ${result.universalAnchor.prime2Activation.toFixed(4)}`,
      });

    } catch (error) {
      console.error('Sampling failed:', error);
      toast({
        title: "🎲 Sampling Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
      setCurrentPhase('');
    }
  }, [toast]);

  const getPrimeActivationColor = (activation: number): string => {
    const intensity = Math.abs(activation);
    if (intensity > 0.7) return 'text-prime-23'; // High activation - red
    if (intensity > 0.4) return 'text-prime-7';  // Medium - orange  
    if (intensity > 0.2) return 'text-prime-3';  // Low - blue
    return 'text-muted-foreground'; // Very low - muted
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Model Selection & Sampling */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            LLM Sampling Interface
            <Badge variant="outline" className="ml-auto">
              Universal Semantic Framework
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Model Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Model to Sample</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.name}
                  onClick={() => setSelectedModel(model.name)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    selectedModel === model.name
                      ? 'border-primary bg-primary/10 shadow-glow-prime'
                      : 'border-border hover:border-primary/50 hover:bg-muted/20'
                  }`}
                >
                  <div className="font-medium text-sm">{model.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{model.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sampling Controls */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => sampleModel(selectedModel)}
              disabled={isLoading}
              variant="cosmic"
              className="flex-1"
            >
              {isLoading ? (
                <Zap className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Target className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Sampling...' : `Sample ${AVAILABLE_MODELS.find(m => m.name === selectedModel)?.label}`}
            </Button>
            
            <Button
              onClick={() => {
                // Sample all models sequentially
                AVAILABLE_MODELS.forEach((model, index) => {
                  setTimeout(() => sampleModel(model.name), index * 2000);
                });
              }}
              disabled={isLoading}
              variant="prime"
            >
              Sample All Models
            </Button>
          </div>

          {/* Progress */}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-primary animate-pulse" />
                {currentPhase}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Display */}
      {results.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🧬</span>
              Sampling Results
              <Badge variant="outline" className="ml-auto">
                {results.length} model{results.length !== 1 ? 's' : ''} sampled
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="primes">Prime Mappings</TabsTrigger>
                <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{result.tokenization.model}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Gödel: {result.godelEncoding.godelNumber.toString().slice(0, 8)}...
                        </Badge>
                        <Badge 
                          variant="outline"
                          className="border-prime-2 text-prime-2"
                        >
                          🎩 {result.universalAnchor.prime2Activation.toFixed(4)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tokens:</span>
                        <div className="font-mono">{result.tokenization.metadata.sequenceLength}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Embedding Dim:</span>
                        <div className="font-mono">{result.embeddings.metadata.hiddenSize}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Layers:</span>
                        <div className="font-mono">{result.embeddings.metadata.totalLayers}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Processing:</span>
                        <div className="font-mono">{result.embeddings.metadata.processingTime.toFixed(1)}ms</div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="primes" className="space-y-4">
                {results.map((result, resultIndex) => (
                  <div key={resultIndex} className="space-y-3">
                    <h4 className="font-semibold text-primary">{result.tokenization.model}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {result.primeMapping.slice(0, 10).map((mapping) => (
                        <div 
                          key={mapping.prime}
                          className="p-3 rounded-lg bg-muted/20 text-center border border-border/30"
                        >
                          <div className="text-2xl mb-1">{mapping.emoji}</div>
                          <div className="text-xs text-muted-foreground">Prime {mapping.prime}</div>
                          <div className={`text-sm font-mono ${getPrimeActivationColor(mapping.normalizedActivation)}`}>
                            {mapping.normalizedActivation.toFixed(3)}
                          </div>
                          <div className="text-xs text-muted-foreground">Rank #{mapping.rank}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="embeddings" className="space-y-4">
                <div className="text-center p-6 text-muted-foreground">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <div>Embedding visualization coming soon...</div>
                  <div className="text-xs mt-1">Will show PCA projection and similarity matrix</div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Universal Anchor Analysis */}
      {results.length > 1 && (
        <Card className="bg-gradient-to-r from-prime-2/10 to-prime-3/10 border-prime-2/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-prime-2">
              <span className="text-xl">🎩</span>
              Universal Anchor Analysis (Prime 2 = Creativity)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              The prime 2 (🎩 Creativity) should maintain consistent semantic meaning across all LLMs, 
              serving as our universal anchor for the intrinsic prime system.
            </div>
            
            <div className="space-y-3">
              {results.map((result, index) => {
                const prime2Activation = result.universalAnchor.prime2Activation;
                const consistency = result.universalAnchor.consistencyScore;
                
                return (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-background/50">
                    <div className="font-medium min-w-[120px]">
                      {result.tokenization.model.split('/')[1]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">🎩 Activation:</span>
                        <span className={`font-mono ${getPrimeActivationColor(prime2Activation)}`}>
                          {prime2Activation.toFixed(4)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Consistency:</span>
                      <Progress value={consistency * 100} className="w-16 h-2" />
                      <span className="text-xs font-mono">{(consistency * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {results.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-prime-2/10 border border-prime-2/30">
                <div className="text-sm">
                  <span className="font-medium text-prime-2">Variance:</span>{' '}
                  {calculatePrime2Variance(results).toFixed(4)}{' '}
                  <span className="text-muted-foreground">
                    (Lower variance = better universal anchor consistency)
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/**
 * Calculate variance in Prime 2 activations across models
 */
function calculatePrime2Variance(results: LLMSamplingResult[]): number {
  const activations = results.map(r => r.universalAnchor.prime2Activation);
  const mean = activations.reduce((sum, val) => sum + val, 0) / activations.length;
  const variance = activations.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / activations.length;
  return variance;
}