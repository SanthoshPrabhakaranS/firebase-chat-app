import React from "react";
import { auth } from "../../firebase/config";

const RenderingMessages = ({ messages, _formatTime }) => {
  return (
    <>
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={`w-full flex ${
              auth?.currentUser?.displayName == message.name
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <p
              className={`py-[.5rem] px-2 text-[.89rem] flex flex-col ${
                auth?.currentUser?.displayName == message.name
                  ? "bg-primary text-white rounded-tl-md rounded-tr-md rounded-bl-md"
                  : "bg-white text-black rounded-tl-md rounded-tr-md rounded-br-md"
              }`}
            >
              {message.imageFile ? (
                <img
                  src={message.imageFile}
                  alt="img"
                  className="w-full max-w-[300px] h-full max-h-[500px]"
                />
              ) : null}

              <span className="flex justify-start text-[.6rem] text-primary">
                {auth?.currentUser?.displayName == message.name
                  ? null
                  : message.name}
              </span>
              {message.text}
              <span
                className={`text-[.6rem] flex mt-[5px] ${
                  auth?.currentUser?.displayName == message.name
                    ? "text-white justify-end"
                    : "text-gray-400 justify-start"
                }`}
              >
                {_formatTime(message?.timeStamp)}
              </span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default RenderingMessages;
