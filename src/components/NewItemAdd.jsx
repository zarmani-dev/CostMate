import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useStore from "../store/useStore";
import useNewItem from "../store/useNewItem";
import useEditItem from "../store/useEditItem";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return newDate;
};

const NewItemAdd = () => {
  const { addItem, data } = useStore();
  const { addNewItem, newData } = useNewItem();
  const { addEditItem } = useEditItem();

  const itemName = useRef();
  const itemPrice = useRef();
  const [selectedDate, setSelectedDate] = useState(getTodayDate);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  const handleClick = async () => {
    const newItem = {
      id: uuidv4(),
      date: formatDate(selectedDate),
      category: itemName.current.value,
      price: +itemPrice.current.value,
      editable: false,
      user: auth.currentUser.uid ? auth.currentUser.uid : null,
    };

    if (itemName.current.value && itemPrice.current.value) {
      addNewItem(newItem);
      addEditItem(newItem);

      // Update local storage
      // const storedData = JSON.parse(localStorage.getItem("data")) || [];
      // if (!storedData.includes(newItem.id)) {
      //   localStorage.setItem("data", JSON.stringify([...storedData, newItem]));
      // }

      // Add item to Firestore
      await setDoc(doc(db, "items", newItem.id), newItem);

      itemName.current.value = "";
      itemPrice.current.value = "";
    }
  };

  // console.log(newData);
  // console.log(data);
  // console.log([...data, ...newData]);

  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-4 ">
        <input
          type="text"
          placeholder="Item name"
          ref={itemName}
          className="w-full font-myanmar text-xl border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-slate-50 bg-transparent text-slate-100"
        />
        <div className="grid grid-cols-3 gap-4 mt-3">
          <input
            type="number"
            placeholder="Price"
            ref={itemPrice}
            className="w-full col-span-1 text-base border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-slate-50 bg-transparent text-slate-100"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={handleChange}
            placeholder="Date"
            className="w-full col-span-2 border border-slate-200 p-4 rounded-xl"
          />
        </div>
      </div>
      <div className="col-span-1">
        <button
          className="text-slate-100 border border-slate-200 px-4 py-2 rounded-xl w-full h-full flex items-center justify-center"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewItemAdd;
