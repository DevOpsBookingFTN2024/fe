import { createContext, useContext, useEffect, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const SOCKET_URL = `${import.meta.env.VITE_NOTIFICATION_API_URL}ws`;

interface StompContextType {
  sendMessage: (destination: string, body: any) => void;
  subscribe: (destination: string, callback: (message: any) => void) => void;
  isConnected: boolean; // Add a flag to track connection status
}

const StompContext = createContext<StompContextType | null>(null);

export const StompSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection status

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        setIsConnected(true); // Set connection status to true
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
        setIsConnected(false); // Set connection status to false
      },
      onStompError: (error) => console.error("WebSocket error", error),
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setIsConnected(false); // Reset connection status on cleanup
    };
  }, []);

  const sendMessage = (destination: string, body: any) => {
    if (!isConnected || !stompClient) {
      console.error("STOMP connection not established");
      return;
    }
    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  const subscribe = (
    destination: string,
    callback: (message: any) => void
  ): StompSubscription | undefined => {
    if (!isConnected || !stompClient) {
      console.error("STOMP connection not established");
      return;
    }
    return stompClient.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  };

  return (
    <StompContext.Provider value={{ sendMessage, subscribe, isConnected }}>
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
