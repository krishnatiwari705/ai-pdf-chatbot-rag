import { useConversation } from "../context/ConversationContext";
import toast from "react-hot-toast";

function Sidebar() {
    const {
        conversations,
        selectedConversation,
        setSelectedConversation,
        createConversation,
        deleteConversation,
        loading,
    } = useConversation();

    const handleDelete = async (e, conversationId) => {
        // Prevent the click from selecting the conversation
        e.stopPropagation();

        const confirmed = window.confirm(
            "Are you sure you want to delete this conversation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteConversation(conversationId);

            toast.success(
                "Conversation deleted successfully"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to delete conversation"
            );
        }
    };

    return (
        <div className="w-72 bg-slate-900 text-white flex flex-col h-full">

            {/* Header */}
            <div className="p-5 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    AI PDF Chatbot
                </h1>

                <button
                    onClick={createConversation}
                    className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg transition"
                >
                    + New Chat
                </button>

            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto p-4">

                {loading ? (
                    <p className="text-gray-400">
                        Loading...
                    </p>
                ) : conversations.length === 0 ? (
                    <p className="text-gray-400">
                        No conversations yet.
                    </p>
                ) : (
                    conversations.map((conversation) => (
                        <div
                            key={conversation._id}
                            onClick={() =>
                                setSelectedConversation(
                                    conversation
                                )
                            }
                            className={`p-3 rounded-lg mb-3 cursor-pointer transition flex items-center justify-between gap-2 ${
                                selectedConversation?._id ===
                                conversation._id
                                    ? "bg-indigo-600"
                                    : "bg-slate-800 hover:bg-slate-700"
                            }`}
                        >
                            {/* Chat title */}
                            <span className="truncate flex-1">
                                {conversation.title}
                            </span>

                            {/* Delete button */}
                            <button
                                onClick={(e) =>
                                    handleDelete(
                                        e,
                                        conversation._id
                                    )
                                }
                                className="text-gray-400 hover:text-red-400 px-2 py-1 rounded transition"
                                title="Delete conversation"
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default Sidebar;