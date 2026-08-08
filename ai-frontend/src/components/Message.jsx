function Message({ type, text }) {
    const isUser = type === "user";

    return (
        <div
            className={`flex items-start gap-3 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            {/* AI Avatar */}
            {!isUser && (
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                    ✨
                </div>
            )}

            {/* Message */}
            <div
                className={`max-w-[75%] ${
                    isUser
                        ? "items-end"
                        : "items-start"
                } flex flex-col`}
            >
                <div
                    className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-6 whitespace-pre-wrap break-words ${
                        isUser
                            ? "bg-indigo-600 text-white rounded-tr-md"
                            : "bg-white text-slate-800 border border-slate-200 rounded-tl-md"
                    }`}
                >
                    {text}
                </div>

                {/* Label */}
                <span
                    className={`text-[10px] text-slate-400 mt-1.5 px-1 ${
                        isUser
                            ? "text-right"
                            : "text-left"
                    }`}
                >
                    {isUser ? "You" : "AI Assistant"}
                </span>
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm">
                    👤
                </div>
            )}
        </div>
    );
}

export default Message;