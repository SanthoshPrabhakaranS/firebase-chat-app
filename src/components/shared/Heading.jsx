import React from "react";
import { Add, Back, Menu } from "../../icons/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const Heading = ({
  title,
  setOpenAddRoomModal,
  roomName,
  openChatRoom,
  setOpenChatRoom,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const _logOut = async () => {
    await signOut(auth);
    cookies.remove("auth_token");
    navigate("/");
  };

  const _menuPopOver = () => {
    return (
      <Popover placement="top-end">
        <PopoverHandler>
          <Button className="!bg-white !text-gray-500 !border-none !shadow-none !p-0 !lowercase font-normal !z-50">
            <p className="flex items-center">{Menu}</p>
          </Button>
        </PopoverHandler>
        <PopoverContent
          className="!px-3 !py-2 !flex !flex-col"
        >
          <span onClick={() => {setOpenAddRoomModal(true)}} className={`cursor-pointer text-[.8rem] !border-b p-1 ${openChatRoom ? "hidden" : "block"}`}>Create room</span>
          <span onClick={() => _logOut()} className="cursor-pointer text-[.8rem] p-1">Logout</span>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div
      className={`w-full flex items-center justify-between font-medium py-3 px-2`}
    >
      <div className="flex items-center gap-1">
        {openChatRoom ? (
          <span
            onClick={() => setOpenChatRoom(false)}
            className="cursor-pointer"
          >
            {Back}
          </span>
        ) : null}
        {openChatRoom ? <p className="whitespace-nowrap">{roomName}</p> : title}
      </div>
      <div>{_menuPopOver()}</div>
    </div>
  );
};

export default Heading;
