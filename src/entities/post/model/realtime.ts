import { useEffect, useRef } from 'react';

import { API_BASE_URL, API_TOKEN } from '@/shared/config';
import {
  applyPostLikeCacheUpdate,
  incrementPostCommentsCountCache,
  insertCommentIntoCache,
} from './cache';
import type { Comment } from './types';

const RECONNECT_DELAY_MS = 2_000;

type RealtimeEvent =
  | { type: 'ping' }
  | { type: 'like_updated'; postId: string; likesCount: number }
  | { type: 'comment_added'; postId: string; comment: Comment };

function buildRealtimeUrl() {
  const httpUrl = new URL(API_BASE_URL);
  httpUrl.protocol = httpUrl.protocol === 'https:' ? 'wss:' : 'ws:';
  httpUrl.pathname = `${httpUrl.pathname.replace(/\/$/, '')}/ws`;
  httpUrl.search = '';
  httpUrl.searchParams.set('token', API_TOKEN);

  return httpUrl.toString();
}

function parseRealtimeEvent(data: WebSocketMessageEvent['data']): RealtimeEvent | null {
  if (typeof data !== 'string') {
    return null;
  }

  try {
    const payload = JSON.parse(data) as Partial<RealtimeEvent>;

    if (payload.type === 'ping') {
      return { type: 'ping' };
    }

    if (
      payload.type === 'like_updated' &&
      typeof payload.postId === 'string' &&
      typeof payload.likesCount === 'number'
    ) {
      return payload as RealtimeEvent;
    }

    if (
      payload.type === 'comment_added' &&
      typeof payload.postId === 'string' &&
      typeof payload.comment === 'object' &&
      payload.comment !== null
    ) {
      return payload as RealtimeEvent;
    }
  } catch {
    return null;
  }

  return null;
}

export function usePostRealtimeSync() {
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let shouldReconnect = true;

    const clearReconnectTimeout = () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    const connect = () => {
      clearReconnectTimeout();

      const socket = new WebSocket(buildRealtimeUrl());
      socketRef.current = socket;

      socket.onmessage = (message) => {
        const event = parseRealtimeEvent(message.data);

        if (!event || event.type === 'ping') {
          return;
        }

        if (event.type === 'like_updated') {
          applyPostLikeCacheUpdate(event.postId, { likesCount: event.likesCount });
          return;
        }

        const insertStatus = insertCommentIntoCache(event.postId, event.comment);

        if (insertStatus !== 'duplicate') {
          incrementPostCommentsCountCache(event.postId);
        }
      };

      socket.onclose = () => {
        if (!shouldReconnect) {
          return;
        }

        reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
      };

      socket.onerror = () => {
        socket.close();
      };
    };

    connect();

    return () => {
      shouldReconnect = false;
      clearReconnectTimeout();
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);
}
