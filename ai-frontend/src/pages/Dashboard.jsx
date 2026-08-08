import Sidebar from "../components/Sidebar";
import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";
import { useConversation } from "../context/ConversationContext";

function Dashboard() {
    const { selectedConversation } = useConversation();

    return (
        <div className="h-screen flex bg-slate-950 overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Application */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-100">

                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">

                    <div className="min-w-0">
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                                <span className="text-xl">
                                    ✨
                                </span>
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    AI PDF Chatbot
                                </h1>

                                <p className="text-xs text-slate-500">
                                    Ask questions and get answers from your documents
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Current conversation */}
                    <div className="hidden md:flex items-center gap-3 max-w-xs">

                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />

                        <div className="text-right min-w-0">
                            <p className="text-xs text-slate-400">
                                CURRENT CHAT
                            </p>

                            <p className="font-medium text-slate-700 truncate">
                                {selectedConversation?.title ||
                                    "No conversation selected"}
                            </p>
                        </div>

                    </div>

                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">

                    <div className="max-w-6xl mx-auto w-full px-6 py-8">

                        {/* Welcome / Empty State */}
                        {!selectedConversation && (
                            <div className="mb-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">

                                <div className="max-w-2xl">

                                    <p className="text-indigo-200 text-sm font-medium mb-2">
                                        AI DOCUMENT ASSISTANT
                                    </p>

                                    <h2 className="text-3xl font-bold mb-3">
                                        Chat with your PDF
                                    </h2>

                                    <p className="text-indigo-100 leading-relaxed">
                                        Upload a PDF and ask questions about
                                        its content. Your documents are processed
                                        using AI-powered retrieval to give you
                                        relevant answers.
                                    </p>

                                </div>

                            </div>
                        )}

                        {/* Upload Section */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                            <div className="flex items-center justify-between mb-5">

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Document
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Upload a PDF to start asking questions
                                    </p>
                                </div>

                                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
                                    <span>📄</span>
                                    PDF only
                                </div>

                            </div>

                            <UploadBox />

                        </section>

                        {/* Chat Section */}
                        <section className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

                                <div>
                                    <h2 className="font-semibold text-slate-900">
                                        Conversation
                                    </h2>

                                    <p className="text-xs text-slate-500 mt-1">
                                        {selectedConversation
                                            ? "Ask questions about your uploaded document"
                                            : "Create a conversation to begin"}
                                    </p>
                                </div>

                                {selectedConversation && (
                                    <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        Active
                                    </div>
                                )}

                            </div>

                            <div className="h-[calc(100vh-310px)] min-h-[450px]">

                                <ChatBox
                                    key={
                                        selectedConversation?._id ||
                                        "no-conversation"
                                    }
                                />

                            </div>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;