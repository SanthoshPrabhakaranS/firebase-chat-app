import React from "react";

const Room = ({ item, _openCharRoom }) => {
  const _formatTime = (value) => {
    const date = value.toDate(); // Convert Firestore Timestamp to JavaScript Date object
    const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };
    const formattedDateTime = date.toLocaleString("en-US", options);
    return formattedDateTime;
  };
  return (
    <div className="flex flex-row justify-between items-center gap-1 w-full py-3 px-2 border-b">
      <div>
        <p className="font-medium">{item.name}</p>
        <span className="text-[.7rem] text-gray-300">
          {_formatTime(item.createdAt)}
        </span>
      </div>
      <button
        onClick={() => _openCharRoom(item.name)}
        className="py-1 px-2 bg-primary hover:bg-blue-400 text-white text-sm rounded-md font-medium"
      >
        Enter room
      </button>
    </div>
  );
};

export default Room;
