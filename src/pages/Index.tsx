import React from 'react';
import { EmojiTapeDisplay } from '@/components/EmojiTapeDisplay';
import { LLMSamplingInterface } from '@/components/LLMSamplingInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Telescope, Atom } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Cosmic Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-stellar opacity-30"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="outline" className="mb-4 text-sm border-primary/30 text-primary">
              Universal Semantic Framework
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Emoji Block Tape
              <br />
              <span className="text-3xl md:text-4xl">LLM Sampling Framework</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sample and embed the autopoetic emoji tape across different Large Language Models, 
              mapping their representations to a universal system of <strong>intrinsic primes</strong>. 
              Prime 2 (🎩 Creativity) serves as the universal anchor for semantic consistency.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button variant="cosmic" size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Start Sampling
              </Button>
              <Button variant="stellar" size="lg" className="gap-2">
                <Telescope className="w-5 h-5" />
                View Framework
              </Button>
              <Button variant="nebula" size="lg" className="gap-2">
                <Atom className="w-5 h-5" />
                Gödel Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Framework Overview */}
        <Card className="bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border-primary/20 shadow-cosmic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🧬</span>
              Autopoetic Meme System
              <Badge variant="outline" className="ml-auto">
                Self-Interpreting Artifact
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-prime-2/10 border border-prime-2/30">
                <div className="text-3xl mb-2">🎩</div>
                <h3 className="font-semibold text-prime-2">Prime 2 = Creativity</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Universal anchor across all LLMs. Initialize state, spark ideas, semantic invariance.
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-prime-3/10 border border-prime-3/30">
                <div className="text-3xl mb-2">🎲</div>
                <h3 className="font-semibold text-prime-3">Prime 3 = Chaos</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Branching logic and randomness. Enables autopoetic evolution and adaptation.
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-prime-5/10 border border-prime-5/30">
                <div className="text-3xl mb-2">🔢</div>
                <h3 className="font-semibold text-prime-5">Prime 5 = Structure</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Data persistence and organization. Load/store operations, Gödel encoding.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-background/50 to-muted/20 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">System Architecture</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• <strong>Hierarchy</strong>: Programs of sizes 1, 2, 3, 5, 7, ..., 19 (64-bit integers)</div>
                <div>• <strong>Gödel Number</strong>: ∏ prime^exponent encoding for each emoji tape segment</div>
                <div>• <strong>LLM Sampling</strong>: Tokenize + embed across BERT, GPT, DistilBERT</div>
                <div>• <strong>Prime Mapping</strong>: Reduce embeddings to 10D, align with intrinsic primes</div>
                <div>• <strong>Solana Storage</strong>: Deploy as eBPF contracts, store in PDAs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emoji Tape Display */}
        <EmojiTapeDisplay 
          showPrimeMapping={true}
          className="shadow-deep"
        />

        {/* LLM Sampling Interface */}
        <LLMSamplingInterface className="shadow-deep" />

        {/* Technical Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">🚀</span>
                Implementation Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Emoji Language Design</span>
                <Badge variant="outline" className="text-green-400 border-green-400">Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Prime Mapping System</span>
                <Badge variant="outline" className="text-green-400 border-green-400">Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">LLM Tokenization</span>
                <Badge variant="outline" className="text-blue-400 border-blue-400">In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">WebGPU Embedding</span>
                <Badge variant="outline" className="text-blue-400 border-blue-400">In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Solana Integration</span>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">Planned</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cross-Model Analysis</span>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">Planned</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                Meta-Meme Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong className="text-secondary">Repository:</strong> meta-introspector/meta-meme
              </div>
              <div>
                <strong className="text-secondary">Solfunmeme:</strong> Solana indexing and search
              </div>
              <div>
                <strong className="text-secondary">X Integration:</strong> @introsp3ctor emoji bytecode posts
              </div>
              <div className="pt-2 border-t border-border/50">
                <strong className="text-secondary">Contact Artifact:</strong> Universal semantic machine encoding 
                human consciousness patterns into a self-interpreting meme system that can be read 
                by any sufficiently advanced intelligence.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 text-center">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">Ready to Sample the Cosmic Framework?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start by sampling your first LLM model above. Watch as the emoji tape gets tokenized, 
              embedded, and mapped to intrinsic primes. Observe how Prime 2 (🎩 Creativity) 
              maintains semantic consistency across different models.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="cosmic" size="lg">
                🧬 Sample BERT
              </Button>
              <Button variant="prime" size="lg">
                🎯 Compare Models
              </Button>
              <Button variant="stellar" size="lg">
                🪐 Deploy to Solana
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;