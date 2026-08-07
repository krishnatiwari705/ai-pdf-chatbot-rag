import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Message from "./Message";
import { useConversation } from "../context/ConversationContext";

function ChatBox() {
  const { selectedConversation } = useConversation();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Load messages whenever conversation changes
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get(
        `/messages/${selectedConversation._id}`
      );

      const formatted = data.messages.map((msg) => ({
        type: msg.role === "assistant" ? "ai" : "user",
        text: msg.content,
      }));

      setMessages(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    if (!selectedConversation) {
      toast.error("Please select a conversation.");
      return;
    }

    const userQuestion = question;

    // Show user message instantly
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const { data } = await api.post("/rag/ask", {
        conversationId: selectedConversation._id,
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to get answer."
      );

      // Reload saved messages if request fails
      fetchMessages();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-[550px] flex flex-col">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">

        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            Upload a PDF and ask your first question.
          </div>
        )}

        {messages.map((msg, index) => (
          <Message
            key={index}
            type={msg.type}
            text={msg.text}
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

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          type="text"
          placeholder="Ask anything about your PDF..."
          className="flex-1 border rounded-lg px-4 py-3 outline-none"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg"
        >
          Send
        </button>

      </div>
    </div>
  );
}

export default ChatBox;