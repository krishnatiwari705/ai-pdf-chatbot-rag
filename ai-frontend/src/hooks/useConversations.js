import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get("/conversations");
      setConversations(data.conversations);
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    loading,
    createConversation,
  };
}