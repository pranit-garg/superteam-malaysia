"use client";

import { useRef, useEffect, useState } from "react";

interface TweetEmbedProps {
  tweetId: string;
  fallback?: {
    author_name: string;
    author_title: string;
    content: string;
  };
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          tweetId: string,
          container: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<HTMLElement | undefined>;
      };
      ready: (callback: () => void) => void;
    };
  }
}

export default function TweetEmbed({ tweetId, fallback }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadWidget = () => {
      if (!containerRef.current) return;

      window.twttr?.widgets
        .createTweet(tweetId, containerRef.current, {
          theme: "dark",
          conversation: "none",
          dnt: true,
        })
        .then((el) => {
          if (el) {
            setLoaded(true);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true));
    };

    if (window.twttr) {
      window.twttr.ready(loadWidget);
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => window.twttr?.ready(loadWidget);
      script.onerror = () => setError(true);
      document.head.appendChild(script);
    }
  }, [tweetId]);

  if (error && fallback) {
    return (
      <div className="bg-card border border-card-border rounded-2xl p-6 border-l-2 border-l-gold/40">
        <p className="text-text text-sm leading-relaxed mb-4">
          &ldquo;{fallback.content}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
            <span className="text-gold text-xs font-bold">
              {fallback.author_name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{fallback.author_name}</p>
            <p className="text-xs text-text-muted">{fallback.author_title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="break-inside-avoid">
      {!loaded && !error && (
        <div className="bg-card border border-card-border rounded-2xl p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-card-border" />
            <div className="flex-1">
              <div className="h-3 bg-card-border rounded w-24 mb-2" />
              <div className="h-2 bg-card-border rounded w-16" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-card-border rounded w-full" />
            <div className="h-3 bg-card-border rounded w-3/4" />
          </div>
        </div>
      )}
      <div ref={containerRef} className={loaded ? "" : "hidden"} />
    </div>
  );
}
