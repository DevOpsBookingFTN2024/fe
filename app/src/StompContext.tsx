import { createContext, useContext, useEffect, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const SOCKET_URL = `${import.meta.env.VITE_NOTIFICATION_API_URL}ws`;

interface StompContextType {
  sendMessage: (destination: string, body: any) => void;
  subscribe: (destination: string, callback: (message: any) => void) => void;
}

const StompContext = createContext<StompContextType | null>(null);

export const StompSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000,
      onConnect: () => console.log("Connected to WebSocket"),
      onStompError: (error) => console.error("WebSocket error", error),
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = (destination: string, body: any) => {
    stompClient?.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  const subscribe = (
    destination: string,
    callback: (message: any) => void
  ): StompSubscription | undefined => {
    return stompClient?.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  };

  return (
    <StompContext.Provider value={{ sendMessage, subscribe }}>
      {children}
    </StompContext.Provider>
  );
};

export const useStomp = () => {
  const context = useContext(StompContext);
  if (!context)
    throw new Error("useStomp must be used within a StompSessionProvider");
  return context;
};
