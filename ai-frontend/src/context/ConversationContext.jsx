import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import api from "../api/axios";

const ConversationContext = createContext();

export const ConversationProvider = ({
    children,
}) => {
    const [conversations, setConversations] =
        useState([]);

    const [selectedConversation, setSelectedConversation] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const fetchConversations = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(
                "/conversations"
            );

            const fetchedConversations =
                data.conversations || [];

            setConversations(
                fetchedConversations
            );

            /*
             * Only select the first conversation
             * when nothing is currently selected.
             */
            setSelectedConversation(
                (currentSelected) => {
                    if (currentSelected) {
                        const updatedSelected =
                            fetchedConversations.find(
                                (conversation) =>
                                    conversation._id ===
                                    currentSelected._id
                            );

                        return (
                            updatedSelected ||
                            currentSelected
                        );
                    }

                    return (
                        fetchedConversations[0] ||
                        null
                    );
                }
            );

        } catch (error) {
            console.error(
                "Fetch conversations error:",
                error.response?.data ||
                    error.message
            );
        } finally {
            setLoading(false);
        }
    };

    const createConversation = async () => {
        try {
            const { data } =
                await api.post(
                    "/conversations",
                    {
                        title: "New Chat",
                    }
                );

            setConversations((previous) => [
                data.conversation,
                ...previous,
            ]);

            setSelectedConversation(
                data.conversation
            );

            return data.conversation;

        } catch (error) {
            console.error(
                "Create conversation error:",
                error.response?.data ||
                    error.message
            );
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    return (
        <ConversationContext.Provider
            value={{
                conversations,
                selectedConversation,
                setSelectedConversation,
                createConversation,
                fetchConversations,
                loading,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

export const useConversation = () => {
    return useContext(
        ConversationContext
    );
};