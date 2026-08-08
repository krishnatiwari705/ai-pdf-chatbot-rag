import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Message from "./Message";
import { useConversation } from "../context/ConversationContext";

function ChatBox() {
    const {
        selectedConversation,
        fetchConversations,
    } = useConversation();

    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const bottomRef = useRef(null);

    const conversationId = selectedConversation?._id;

    /*
     * Load messages whenever the selected conversation changes.
     */
    useEffect(() => {
        const loadMessages = async () => {
            if (!conversationId) {
                setMessages([]);
                setLoadingMessages(false);
                return;
            }

            try {
                setLoadingMessages(true);

                const { data } = await api.get(
                    `/messages/${conversationId}`
                );

                if (data.success) {
                    const formattedMessages =
                        data.messages.map((message) => ({
                            type:
                                message.role === "assistant"
                                    ? "ai"
                                    : "user",
                            text: message.content,
                        }));

                    setMessages(formattedMessages);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.error(
                    "Load messages error:",
                    error.response?.data ||
                        error.message
                );

                setMessages([]);

                toast.error(
                    "Failed to load messages."
                );
            } finally {
                setLoadingMessages(false);
            }
        };

        loadMessages();
    }, [conversationId]);

    /*
     * Scroll to latest message.
     */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    /*
     * Ask question.
     */
    const askQuestion = async () => {
        if (!question.trim()) {
            return;
        }

        if (!conversationId) {
            toast.error(
                "Please select a conversation first."
            );
            return;
        }

        const userQuestion = question.trim();

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
            const { data } = await api.post(
                "/rag/ask",
                {
                    conversationId,
                    question: userQuestion,
                }
            );

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    type: "ai",
                    text: data.answer,
                },
            ]);

            await fetchConversations();

        } catch (error) {
            console.error(
                "Ask question error:",
                error.response?.data ||
                    error.message
            );

            toast.error(
                error.response?.data?.message ||
                    "Unable to get answer."
            );
        } finally {
            setLoading(false);
        }
    };

    /*
     * Enter = send
     * Shift + Enter = new line
     */
    const handleKeyDown = (event) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            askQuestion();
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">

            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <span className="text-lg">
                            ✨
                        </span>
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900">
                            {selectedConversation?.title ||
                                "AI Chat"}
                        </h2>

                        <p className="text-xs text-slate-500">
                            AI document assistant
                        </p>
                    </div>

                </div>

                {conversationId && (
                    <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Ready
                    </div>
                )}

            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50">

                {!conversationId && (
                    <div className="h-full flex items-center justify-center">

                        <div className="text-center max-w-md">

                            <div className="w-20 h-20 mx-auto rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-3xl mb-5">
                                💬
                            </div>

                            <h3 className="text-xl font-semibold text-slate-800">
                                Start a conversation
                            </h3>

                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                Create a new chat from the sidebar,
                                upload your PDF, and ask questions
                                about its content.
                            </p>

                        </div>

                    </div>
                )}

                {conversationId &&
                    loadingMessages && (
                        <div className="h-full flex items-center justify-center">

                            <div className="text-center">

                                <div className="flex justify-center gap-1.5 mb-3">
                                    <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
                                    <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>

                                <p className="text-sm text-slate-500">
                                    Loading conversation...
                                </p>

                            </div>

                        </div>
                    )}

                {conversationId &&
                    !loadingMessages &&
                    messages.length === 0 && (
                        <div className="h-full flex items-center justify-center">

                            <div className="text-center max-w-sm">

                                <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">
                                    📄
                                </div>

                                <h3 className="font-semibold text-slate-800">
                                    Ready when you are
                                </h3>

                                <p className="text-sm text-slate-500 mt-2">
                                    Upload a PDF and ask a question
                                    to start your conversation.
                                </p>

                            </div>

                        </div>
                    )}

                {messages.length > 0 && (
                    <div className="max-w-4xl mx-auto space-y-4">

                        {messages.map((message, index) => (
                            <Message
                                key={`${conversationId}-${index}`}
                                type={message.type}
                                text={message.text}
                            />
                        ))}

                    </div>
                )}

                {loading && (
                    <div className="max-w-4xl mx-auto mt-4">

                        <div className="flex items-start gap-3">

                            <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                                ✨
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">

                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>

                            </div>

                        </div>

                    </div>
                )}

                <div ref={bottomRef} />

            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 bg-white p-4">

                <div className="max-w-4xl mx-auto">

                    <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition">

                        <textarea
                            value={question}
                            onChange={(event) =>
                                setQuestion(
                                    event.target.value
                                )
                            }
                            onKeyDown={handleKeyDown}
                            disabled={
                                !conversationId ||
                                loading
                            }
                            placeholder={
                                conversationId
                                    ? "Ask a question about your PDF..."
                                    : "Select a conversation first..."
                            }
                            rows={1}
                            className="flex-1 bg-transparent border-none outline-none resize-none px-3 py-3 text-sm text-slate-800 placeholder:text-slate-400 disabled:cursor-not-allowed"
                        />

                        <button
                            onClick={askQuestion}
                            disabled={
                                !conversationId ||
                                !question.trim() ||
                                loading
                            }
                            className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-sm"
                            title="Send message"
                        >
                            {loading ? (
                                <span className="text-sm">
                                    ...
                                </span>
                            ) : (
                                <span className="text-lg">
                                    ➤
                                </span>
                            )}
                        </button>

                    </div>

                    <p className="text-[11px] text-slate-400 text-center mt-2">
                        Press Enter to send · Shift + Enter for a new line
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ChatBox;