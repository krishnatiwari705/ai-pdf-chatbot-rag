function Message({ type, text }) {
  const isUser = type === "user";

  return (
    <div
      className={`flex mb-5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl shadow
        ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}

export default Message;