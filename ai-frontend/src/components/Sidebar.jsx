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
        e.stopPropagation();

        const confirmed = window.confirm(
            "Are you sure you want to delete this conversation?"
        );

        if (!confirmed) return;

        try {
            await deleteConversation(conversationId);
            toast.success("Conversation deleted");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to delete conversation"
            );
        }
    };

    return (
        <aside className="w-72 h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800">

            {/* Branding */}
            <div className="px-5 py-6 border-b border-slate-800">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-xl">
                            ✨
                        </span>
                    </div>

                    <div>
                        <h1 className="font-bold text-lg">
                            AI PDF Chatbot
                        </h1>

                        <p className="text-xs text-slate-400">
                            Intelligent document assistant
                        </p>
                    </div>

                </div>

                {/* New Chat */}
                <button
                    onClick={createConversation}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-indigo-900/20"
                >
                    <span className="text-lg">+</span>
                    New Chat
                </button>

            </div>

            {/* Conversation Header */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-300">
                        Conversations
                    </span>
                </div>

                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md">
                    {conversations.length}
                </span>

            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto px-3 pb-4">

                {loading ? (
                    <div className="space-y-3 px-2 pt-2">

                        <div className="h-12 rounded-xl bg-slate-800 animate-pulse" />
                        <div className="h-12 rounded-xl bg-slate-800 animate-pulse" />
                        <div className="h-12 rounded-xl bg-slate-800 animate-pulse" />

                    </div>
                ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center px-5 pt-16">

                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mb-4">
                            💬
                        </div>

                        <p className="text-sm font-medium text-slate-300">
                            No conversations yet
                        </p>

                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Create a new chat to start talking with your PDF.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-2">

                        {conversations.map((conversation) => {

                            const isSelected =
                                selectedConversation?._id ===
                                conversation._id;

                            return (
                                <div
                                    key={conversation._id}
                                    onClick={() =>
                                        setSelectedConversation(
                                            conversation
                                        )
                                    }
                                    className={`group flex items-center gap-2 px-3 py-3 rounded-xl cursor-pointer border transition-all duration-200 ${
                                        isSelected
                                            ? "bg-indigo-600/20 border-indigo-500/40 text-white shadow-sm"
                                            : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900 hover:border-slate-800 hover:text-slate-200"
                                    }`}
                                >

                                    {/* Chat Icon */}
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                                            isSelected
                                                ? "bg-indigo-600 text-white"
                                                : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                                        }`}
                                    >
                                        💬
                                    </div>

                                    {/* Title */}
                                    <span className="flex-1 min-w-0 text-sm font-medium truncate">
                                        {conversation.title}
                                    </span>

                                    {/* Delete */}
                                    <button
                                        onClick={(e) =>
                                            handleDelete(
                                                e,
                                                conversation._id
                                            )
                                        }
                                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-200"
                                        title="Delete conversation"
                                    >
                                        🗑️
                                    </button>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

            {/* Bottom Status */}
            <div className="px-5 py-4 border-t border-slate-800">

                <div className="flex items-center gap-3">

                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />

                    <div>
                        <p className="text-xs font-medium text-slate-300">
                            AI Assistant Online
                        </p>

                        <p className="text-[11px] text-slate-500">
                            Ready to answer questions
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;