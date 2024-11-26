import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface Props {
  text: string;
}

export default function AudioMessage({ text }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlay = () => {
    if (!utteranceRef.current) {
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.lang = 'he-IL';
      utteranceRef.current.onend = () => {
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.speak(utteranceRef.current);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
      title={isPlaying ? 'עצור' : 'השמע'}
    >
      {isPlaying ? (
        <Pause className="w-4 h-4 text-indigo-300" />
      ) : (
        <Play className="w-4 h-4 text-indigo-300" />
      )}
      <span className="text-sm text-indigo-200">
        {isPlaying ? 'עצור' : 'השמע'}
      </span>
    </button>
  );
}