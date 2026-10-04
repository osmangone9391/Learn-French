import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Radio } from 'lucide-react';
import { audioPlayer, AudioSourceType } from '../utils/audioPlayer';
import { i18n } from '../i18n/en';

export const AudioSourceIndicator: React.FC = () => {
  const [source, setSource] = useState<AudioSourceType>('none');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = audioPlayer.subscribe((src, playing) => {
      setSource(src);
      setIsPlaying(playing);
    });
    return () => {
      unsub();
    };
  }, []);

  if (!isPlaying || source === 'none') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 text-white backdrop-blur-md shadow-lg border border-stone-700 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
      {source === 'neural' ? (
        <>
          <Sparkles size={13} className="text-amber-400 animate-pulse" />
          <span className="font-medium text-amber-300">
            {i18n.common.audioSourceNeural}
          </span>
        </>
      ) : (
        <>
          <Volume2 size={13} className="text-sky-400" />
          <span className="font-medium text-sky-200">
            {i18n.common.audioSourceBrowser}
          </span>
        </>
      )}
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
    </div>
  );
};
