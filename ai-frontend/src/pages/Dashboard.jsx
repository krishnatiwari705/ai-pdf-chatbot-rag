import Sidebar from "../components/Sidebar";
import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";
import { useConversation } from "../context/ConversationContext";

function Dashboard() {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              AI PDF Chatbot
            </h1>

            <p className="text-gray-500 mt-1">
              {selectedConversation
                ? `Current Chat : ${selectedConversation.title}`
                : "Create a new conversation"}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* Upload */}
          <UploadBox />

          {/* Chat */}
          <div className="mt-8">
            <ChatBox />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;