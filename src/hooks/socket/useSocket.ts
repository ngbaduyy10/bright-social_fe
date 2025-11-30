'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  namespace: string;
  token: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useSocket = (options: UseSocketOptions) => {
  const { namespace, token, onConnect, onDisconnect, onError } = options;
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || token.trim() === '') {
      return;
    }

    const newSocket = io(`${process.env.NEXT_PUBLIC_BE_URL}${namespace}`, {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to socket', newSocket.id);
      setIsConnected(true);
      setError(null);
      onConnect?.();
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from socket:', reason);
      setIsConnected(false);
      onDisconnect?.();
    });

    newSocket.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message);
      setError(err.message);
      setIsConnected(false);
      onError?.(err);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Reconnected after', attemptNumber, 'attempts');
      setIsConnected(true);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      newSocket.close();
      setSocket(null);
      setIsConnected(false);
    };
  }, [token, namespace, onConnect, onDisconnect, onError]);

  return {
    socket,
    isConnected,
    error,
  };
};