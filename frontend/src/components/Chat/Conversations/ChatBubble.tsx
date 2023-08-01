import React from "react";

interface ChatBubbleProps {
    username: string;
    messageBody: string;
    time: string;
    bubbleType: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
    username,
    messageBody,
    time,
    bubbleType
}) => {
    return (
        <div className="flex justify-start">
            <div className={`chat ${bubbleType}`}>
                <div className="chat-header">
                    {username}
                    <time className="text-xs opacity-50">{time}</time>
                </div>
                <div className="chat-bubble">{messageBody}</div>
            </div>
        </div>
    );
};

export default ChatBubble;