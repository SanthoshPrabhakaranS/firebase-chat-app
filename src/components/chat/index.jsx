import React, { useEffect, useState } from "react";
import Heading from "../shared/Heading";
import Cookies from "universal-cookie";
import Search from "../shared/Search";
import AddRoomModal from "../modals/AddRoomModal";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Room from "./Room";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";

const Chat = () => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoogedIn] = useState(cookies.get("auth_token"));
  const [openAddRoomModal, setOpenAddRoomModal] = useState(false);
  const [openChatRoom, setOpenChatRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [currRoomName, setcurrRoomName] = useState("");
  const [rooms, setrooms] = useState([]);
  const navigate = useNavigate();
  const addRoomRef = collection(db, "rooms");

  const _addRoom = async (e) => {
    e.preventDefault();
    if (roomName === "") return;
    try {
      await addDoc(addRoomRef, {
        name: roomName,
        createdAt: serverTimestamp(),
      });
      setRoomName("");
      setOpenAddRoomModal(false);
      _getAllRooms();
    } catch (error) {
      console.error(error);
    }
  };

  const _getAllRooms = async () => {
    const data = await getDocs(addRoomRef, orderBy("createdAt"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setrooms(filteredData);
  };

  useEffect(() => {
    if (!isLoggedIn) return navigate("/");
    _getAllRooms();
  }, []);

  const _openCharRoom = (roomName) => {
    setOpenChatRoom(true);
    setcurrRoomName(roomName);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {openAddRoomModal ? (
        <AddRoomModal
          setOpenAddRoomModal={setOpenAddRoomModal}
          setRoomName={setRoomName}
          _addRoom={_addRoom}
        />
      ) : null}
      <Heading
        title={"Rooms"}
        roomName={currRoomName}
        setOpenAddRoomModal={setOpenAddRoomModal}
        openChatRoom={openChatRoom}
        setOpenChatRoom={setOpenChatRoom}
      />
      {openChatRoom ? null : <Search />}

      {openChatRoom ? (
        <ChatRoom currRoomName={currRoomName} />
      ) : (
        <div>
          {rooms &&
            rooms.map((item) => {
              return (
                <Room key={item.id} item={item} _openCharRoom={_openCharRoom} />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Chat;
