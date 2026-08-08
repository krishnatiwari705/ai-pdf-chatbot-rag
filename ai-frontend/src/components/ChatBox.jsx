import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Message from "./Message";
import { useConversation } from "../context/ConversationContext";

function ChatBox() {
  const { selectedConversation } = useConversation();

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const bottomRef = useRef(null);

  /*
   * Get the conversation ID safely.
   * MongoDB normally gives us _id.
   */
  const conversationId =
    selectedConversation?._id || selectedConversation?.id;

  /*
   * Load messages whenever the selected conversation changes.
   */
  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    loadMessages(conversationId);
  }, [conversationId]);

  /*
   * Scroll to the latest message.
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /*
   * Get messages from MongoDB.
   */
  const loadMessages = async (id) => {
    try {
      setLoadingMessages(true);

      const { data } = await api.get(`/messages/${id}`);

      if (data.success) {
        const formattedMessages = data.messages.map((message) => ({
          type: message.role === "assistant" ? "ai" : "user",
          text: message.content,
        }));

        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error(
        "Failed to load messages:",
        error.response?.data || error.message
      );

      setMessages([]);

      toast.error("Failed to load conversation.");
    } finally {
      setLoadingMessages(false);
    }
  };

  /*
   * Ask AI question.
   */
  const askQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    if (!conversationId) {
      toast.error("Please select a conversation first.");
      return;
    }

    const userQuestion = question.trim();

    /*
     * Immediately show user's message.
     */
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const { data } = await api.post("/rag/ask", {
        conversationId,
        question: userQuestion,
      });

      /*
       * Show AI response.
       */
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "ai",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.error(
        "Ask question error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to get answer."
      );

      /*
       * Reload from database so frontend
       * matches the actual saved state.
       */
      await loadMessages(conversationId);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Allow Enter to send.
   * Shift + Enter creates a new line.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-[550px] flex flex-col">

      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-gray-800">
          {selectedConversation?.title || "AI Chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">

        {!conversationId && (
          <div className="text-center text-gray-400 mt-20">
            Select a conversation to start chatting.
          </div>
        )}

        {conversationId && loadingMessages && (
          <div className="text-center text-gray-400 mt-20">
            Loading conversation...
          </div>
        )}

        {conversationId &&
          !loadingMessages &&
          messages.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              No messages yet.
              <br />
              Ask a question about your PDF.
            </div>
          )}

        {messages.map((message, index) => (
          <Message
            key={`${conversationId}-${index}`}
            type={message.type}
            text={message.text}
          />
        ))}

        {loading && (
          <Message
            type="ai"
            text="Thinking..."
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 flex gap-3">

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!conversationId || loading}
          placeholder={
            conversationId
              ? "Ask anything about your PDF..."
              : "Select a conversation first..."
          }
          rows={1}
          className="flex-1 border rounded-lg px-4 py-3 outline-none resize-none disabled:bg-gray-100"
        />

        <button
          onClick={askQuestion}
          disabled={
            !conversationId ||
            !question.trim() ||
            loading
          }
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 rounded-lg"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>
    </div>
  );
}

export default ChatBox;