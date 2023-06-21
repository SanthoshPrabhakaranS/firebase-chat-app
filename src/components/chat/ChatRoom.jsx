import React, { useEffect, useState } from "react";
import { Image, Send } from "../../icons/icons";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import RenderingMessages from "./RenderingMessages";
import { useRef } from "react";

const ChatRoom = ({ currRoomName }) => {
  const arr = ["Hi How are you ?", "Hi, I'm fine", "What're you doing ?"];
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [messages, setmessages] = useState([]);
  let scrollToBorromRef = useRef(null);
  const messageRef = collection(db, "messages");

  //Sending Message
  const _sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage == "" && newImage == "") return;
    try {
      await addDoc(messageRef, {
        text: newMessage,
        name: auth?.currentUser?.displayName,
        room: currRoomName,
        imageFile: newImage ? newImage : null,
        timeStamp: serverTimestamp(),
      });
      setNewMessage("");
      setNewImage("");
    } catch (error) {
      console.error(error);
    }
  };

  //Query to get messages
  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", currRoomName),
      orderBy("timeStamp")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setmessages(messages);
    });

    return () => unsubscribe();
  }, []);

  //Formatting date for timeStamp
  const _formatTime = (value) => {
    const date = value?.toDate(); // Convert Firestore Timestamp to JavaScript Date object
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedDateTime = date?.toLocaleString("en-US", options);
    return formattedDateTime;
  };

  //uploading image in firebase
  const _uploadImage = async (file) => {
    if (!file) return;

    const imageRef = ref(storage, `/images/${file.name}`);
    await uploadBytes(imageRef, file)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((imageUrl) => {
        setNewImage(imageUrl);
        console.log(imageUrl, "url");
      });
  };

  const _scrollToBottom = () => {
    if (scrollToBorromRef.current) {
      scrollToBorromRef.current.scrollTo({
        top: scrollToBorromRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    _scrollToBottom();
  }, [messages]);

  return (
    <div className="relative h-[calc(100vh_-_7vh)]">
      {/* Messages */}
      <div
        ref={scrollToBorromRef}
        className="h-[90%] text-sm bg-[#F7F7FC] pt-2 pb-2 flex flex-col gap-2 px-2 overflow-y-scroll"
      >
        <RenderingMessages messages={messages} _formatTime={_formatTime} />
      </div>
      {/* Type Message */}
      <form
        onSubmit={_sendMessage}
        className="h-[10%] absolute z-50 bg-white py-3 bottom-0 flex w-full gap-2 items-center px-2"
      >
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          type="text"
          placeholder="Your Message"
          className=" w-[93%] border bg-gray-50 p-2 rounded-sm focus:outline-none placeholder:text-sm text-sm"
        />
        <label className="cursor-pointer" htmlFor="img">
          {Image}
        </label>
        <input
          id="img"
          className="hidden"
          onChange={(e) => _uploadImage(e.target.files[0])}
          type="file"
        />
        <button type="submit">{Send}</button>
      </form>
    </div>
  );
};

export default ChatRoom;
