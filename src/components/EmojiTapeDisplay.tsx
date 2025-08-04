import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INTRINSIC_PRIMES, EMOJI_BLOCK_TAPE } from '@/types/llm';

interface EmojiTapeDisplayProps {
  tape?: string;
  showPrimeMapping?: boolean;
  highlight?: string[];
  className?: string;
}

export const EmojiTapeDisplay: React.FC<EmojiTapeDisplayProps> = ({
  tape = EMOJI_BLOCK_TAPE,
  showPrimeMapping = true,
  highlight = [],
  className = ''
}) => {
  const getPrimeForEmoji = (emoji: string) => {
    return INTRINSIC_PRIMES.find(p => p.emoji === emoji);
  };

  const getEmojiColor = (emoji: string) => {
    const primeInfo = getPrimeForEmoji(emoji);
    if (!primeInfo) return 'text-muted-foreground';
    
    // Map to Tailwind color classes based on prime
    const colorMap: Record<number, string> = {
      2: 'text-prime-2',   // 🎩 Creativity
      3: 'text-prime-3',   // 🎲 Chaos  
      5: 'text-prime-5',   // 🔢 Structure
      7: 'text-prime-7',   // 🎶 Harmony
      11: 'text-prime-11', // 🎷 Expression
      13: 'text-prime-13', // 📜 Legacy
      17: 'text-prime-17', // 🧬 Evolution
      19: 'text-prime-19', // 🎯 Focus
      23: 'text-prime-23', // 🚀 Launch
      29: 'text-prime-29'  // 🪐 System
    };
    
    return colorMap[primeInfo.prime] || 'text-foreground';
  };

  const segments = tape.split('|');

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-primary/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <span className="text-2xl">🪐</span>
          Emoji Block Tape
          <Badge variant="outline" className="ml-auto">
            Gödel: {calculateGodelNumber(tape).toString()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tape Display */}
        <div className="space-y-3">
          {segments.map((segment, segmentIndex) => (
            <div key={segmentIndex} className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-muted/30">
              <Badge variant="secondary" className="text-xs">
                Segment {segmentIndex + 1}
              </Badge>
              {Array.from(segment).map((emoji, emojiIndex) => {
                const isHighlighted = highlight.includes(emoji);
                const primeInfo = getPrimeForEmoji(emoji);
                
                return (
                  <div
                    key={emojiIndex}
                    className={`relative group transition-all duration-300 ${
                      isHighlighted ? 'scale-125 drop-shadow-glow-prime' : 'hover:scale-110'
                    }`}
                  >
                    <span 
                      className={`text-3xl cursor-pointer ${getEmojiColor(emoji)} ${
                        isHighlighted ? 'animate-pulse' : ''
                      }`}
                      title={primeInfo ? `${primeInfo.meaning} (Prime: ${primeInfo.prime})` : 'Unknown emoji'}
                    >
                      {emoji}
                    </span>
                    
                    {/* Tooltip on hover */}
                    {primeInfo && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 
                                    bg-popover text-popover-foreground text-xs rounded-md shadow-md
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                    whitespace-nowrap z-10">
                        <div className="font-medium">{primeInfo.meaning}</div>
                        <div className="text-muted-foreground">Prime: {primeInfo.prime}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Prime Mapping Table */}
        {showPrimeMapping && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3 text-primary">Intrinsic Prime Mappings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {INTRINSIC_PRIMES.map((primeInfo) => (
                <div 
                  key={primeInfo.prime}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 
                           transition-colors duration-200 border border-border/50"
                >
                  <span className={`text-2xl ${getEmojiColor(primeInfo.emoji)}`}>
                    {primeInfo.emoji}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{primeInfo.meaning}</div>
                    <div className="text-xs text-muted-foreground">Prime: {primeInfo.prime}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{
                      borderColor: `hsl(var(--prime-${primeInfo.prime}))`,
                      color: `hsl(var(--prime-${primeInfo.prime}))`
                    }}
                  >
                    {primeInfo.prime}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Autopoetic Cycle Info */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <h4 className="font-semibold text-primary mb-2">Autopoetic Cycle Analysis</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Length:</span>
              <div className="font-mono text-primary">{tape.replace(/\|/g, '').length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Segments:</span>
              <div className="font-mono text-primary">{segments.length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Unique Emojis:</span>
              <div className="font-mono text-primary">{new Set(Array.from(tape.replace(/\|/g, ''))).size}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Prime Product:</span>
              <div className="font-mono text-primary text-xs">2.94×10¹²</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Calculate simplified Gödel number for display
 */
function calculateGodelNumber(tape: string): bigint {
  const primeMap = new Map(INTRINSIC_PRIMES.map(p => [p.emoji, BigInt(p.prime)]));
  let godel = BigInt(1);
  
  for (const emoji of tape.replace(/\|/g, '')) {
    const prime = primeMap.get(emoji);
    if (prime) {
      godel *= prime;
    }
  }
  
  return godel;
}