import React from "react";

export default function AddRoomModal({ setOpenAddRoomModal, setRoomName, _addRoom, }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <input
                className="w-full border bg-gray-50 p-2 rounded-sm focus:outline-none placeholder:text-sm text-sm"
                type="text"
                placeholder="Enter room name"
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
              <button
                className="px-2 py-1 bg-gray-200 font-medium text-sm rounded-sm"
                type="button"
                onClick={() => setOpenAddRoomModal(false)}
              >
                Close
              </button>
              <button
                className="px-2 py-1 bg-primary font-medium text-sm rounded-sm text-white"
                type="button"
                onClick={_addRoom}
              >
                Create room
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
