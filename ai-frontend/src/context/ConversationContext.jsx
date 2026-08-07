import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/conversations");

      setConversations(data.conversations);

      if (data.conversations.length > 0) {
        setSelectedConversation(data.conversations[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async () => {
    try {
      const { data } = await api.post("/conversations", {
        title: "New Chat",
      });

      setConversations((prev) => [
        data.conversation,
        ...prev,
      ]);

      setSelectedConversation(data.conversation);

      return data.conversation;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        selectedConversation,
        setSelectedConversation,
        createConversation,
        fetchConversations,
        loading,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  return useContext(ConversationContext);
};