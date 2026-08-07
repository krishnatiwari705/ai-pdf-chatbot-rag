import { useConversation } from "../context/ConversationContext";

function Sidebar() {
  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    createConversation,
    loading,
  } = useConversation();

  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">

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
          <p className="text-gray-400">Loading...</p>
        ) : conversations.length === 0 ? (
          <p className="text-gray-400">
            No conversations yet.
          </p>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() =>
                setSelectedConversation(conversation)
              }
              className={`p-3 rounded-lg mb-3 cursor-pointer transition
                ${
                  selectedConversation?._id === conversation._id
                    ? "bg-indigo-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
            >
              {conversation.title}
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Sidebar;