import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Heart } from 'lucide-react';

interface SongCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  onNext?: () => void;
  onPrev?: () => void;
}

function formatTime(sec: number): string {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const SongCard = ({ title, artist, imageUrl, audioUrl, onNext, onPrev }: SongCardProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // Sync audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); onNext?.(); };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [onNext]);

  // If audioUrl changes, stop current playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.load();
    setIsPlaying(false);
    setCurrentTime(0);
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skipTime = (amount: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + amount));
    setCurrentTime(audio.currentTime);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const btnStyle = (id: string, base: React.CSSProperties): React.CSSProperties => ({
    ...base,
    transition: 'transform 0.15s ease, opacity 0.15s ease',
    transform: hoveredBtn === id ? 'scale(1.18)' : 'scale(1)',
    opacity: hoveredBtn === id ? 1 : 0.85,
    cursor: 'pointer',
  });

  return (
    <div 
      className="card-fade-in"
      style={{
        width: '320px',
        height: '480px',
        background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(10,10,10,0.98) 100%)',

      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)',
      color: 'white',
      userSelect: 'none',
      overflow: 'hidden',
      boxSizing: 'border-box',
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Album Art - Ampliada para resaltar las fotos */}
      <div style={{
        width: '100%',
        height: '250px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '20px',
        flexShrink: 0,
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
      }}>
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
        <Shuffle
          size={18}
          color="rgba(255,255,255,0.5)"
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
        />
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, letterSpacing: '0.4px' }}>{title}</h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{artist}</p>
        </div>
        <Heart
          size={18}
          color={liked ? '#e05' : 'white'}
          fill={liked ? '#e05' : 'none'}
          style={{ cursor: 'pointer', transition: 'transform 0.2s, color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => setLiked(l => !l)}
        />
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '15px', padding: '0 4px' }}>
        <div
          ref={progressRef}
          onClick={handleSeek}
          style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', position: 'relative', cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.height = '8px')}
          onMouseLeave={e => (e.currentTarget.style.height = '6px')}
        >
          <div style={{
            width: `${progress}%`, height: '100%',
            background: 'linear-gradient(90deg, #c0a060, #fff)',
            borderRadius: '3px', transition: 'width 0.2s linear'
          }} />
          <div style={{
            width: '12px', height: '12px', background: 'white',
            borderRadius: '50%', position: 'absolute',
            left: `${progress}%`, top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px rgba(0,0,0,0.5)',
            transition: 'left 0.2s linear'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: 'auto', paddingBottom: '10px' }}>
        <SkipBack
          size={22} color="white" fill="white"
          style={btnStyle('prev', {})}
          onMouseEnter={() => setHoveredBtn('prev')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => skipTime(-5)}
        />

        <div
          style={{
            width: '56px', height: '56px', borderRadius: '50%', background: 'white',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexShrink: 0, transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            transform: hoveredBtn === 'play' ? 'scale(1.1)' : 'scale(1)',
            boxShadow: hoveredBtn === 'play' ? '0 0 16px rgba(255,255,255,0.4)' : '0 6px 14px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHoveredBtn('play')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={togglePlay}
        >
          {isPlaying
            ? <Pause size={24} color="black" fill="black" />
            : <Play size={24} color="black" fill="black" style={{ marginLeft: '4px' }} />
          }
        </div>

        <SkipForward
          size={22} color="white" fill="white"
          style={btnStyle('next', {})}
          onMouseEnter={() => setHoveredBtn('next')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => skipTime(5)}
        />
      </div>
    </div>
  );
};

export default SongCard;
