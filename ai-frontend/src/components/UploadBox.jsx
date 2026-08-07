import { useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useConversation } from "../context/ConversationContext";

function UploadBox() {
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);

  const { selectedConversation } = useConversation();

  const uploadFile = async (file) => {
    if (!file) return;

    if (!selectedConversation) {
      toast.error("Please create or select a conversation first.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("conversationId", selectedConversation._id);

    try {
      setLoading(true);

      const { data } = await api.post(
        "/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      console.log("Upload Success:", data);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Document upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-2">
        Upload PDF
      </h2>

      <p className="text-gray-500 mb-6">
        Upload a PDF and start chatting with AI.
      </p>

      {selectedConversation && (
        <div className="mb-5 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          <p className="text-sm text-indigo-700">
            <strong>Current Chat:</strong>{" "}
            {selectedConversation.title}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) =>
          uploadFile(e.target.files[0])
        }
      />

      <button
        onClick={() => inputRef.current.click()}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition"
      >
        {loading ? "Uploading..." : "Choose PDF"}
      </button>

    </div>
  );
}

export default UploadBox;