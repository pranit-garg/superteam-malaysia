"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface SeamlessVideoProps {
  src: string;
  webmSrc?: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
  overlay?: string;
}

export default function SeamlessVideo({
  src,
  webmSrc,
  poster,
  className = "",
  style,
  eager = false,
  overlay,
}: SeamlessVideoProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIsA, setActiveIsA] = useState(true);
  const [crossfading, setCrossfading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [reducedMotion, setReducedMotion] = useState(false);
  const crossfadeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Detect prefers-reduced-motion and save-data
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      setReducedMotion(true);
      return;
    }
  }, []);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (eager || shouldLoad || reducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, shouldLoad, reducedMotion]);

  // Crossfade logic
  const handleTimeUpdate = useCallback(() => {
    const active = activeIsA ? videoARef.current : videoBRef.current;
    const backup = activeIsA ? videoBRef.current : videoARef.current;

    if (!active || !backup || crossfading) return;
    if (!active.duration || active.duration === Infinity) return;

    if (active.currentTime > active.duration - 0.5) {
      setCrossfading(true);

      backup.currentTime = 0;
      backup.play().catch(() => {});

      crossfadeTimeoutRef.current = setTimeout(() => {
        setActiveIsA((prev) => !prev);
        setCrossfading(false);
      }, 500);
    }
  }, [activeIsA, crossfading]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (crossfadeTimeoutRef.current) clearTimeout(crossfadeTimeoutRef.current);
    };
  }, []);

  // Attach timeupdate listener
  useEffect(() => {
    if (reducedMotion || !shouldLoad) return;

    const active = activeIsA ? videoARef.current : videoBRef.current;
    if (!active) return;

    active.addEventListener("timeupdate", handleTimeUpdate);
    return () => active.removeEventListener("timeupdate", handleTimeUpdate);
  }, [activeIsA, handleTimeUpdate, reducedMotion, shouldLoad]);

  // Start playback when loaded
  useEffect(() => {
    if (reducedMotion || !shouldLoad) return;
    videoARef.current?.play().catch(() => {});
  }, [shouldLoad, reducedMotion]);

  // Reduced motion: just show poster
  if (reducedMotion) {
    return (
      <div ref={containerRef} className={`relative ${className}`} style={style}>
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {overlay && <div className={`absolute inset-0 ${overlay}`} />}
      </div>
    );
  }

  const opacityA = crossfading ? (activeIsA ? 0 : 1) : activeIsA ? 1 : 0;
  const opacityB = crossfading ? (activeIsA ? 1 : 0) : activeIsA ? 0 : 1;

  const videoSources = (
    <>
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </>
  );

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      {shouldLoad && (
        <>
          <video
            ref={videoARef}
            muted
            playsInline
            poster={poster}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: opacityA,
              transition: "opacity 500ms ease-in-out",
            }}
          >
            {videoSources}
          </video>
          <video
            ref={videoBRef}
            muted
            playsInline
            poster={poster}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: opacityB,
              transition: "opacity 500ms ease-in-out",
            }}
          >
            {videoSources}
          </video>
        </>
      )}
      {!shouldLoad && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
    </div>
  );
}
