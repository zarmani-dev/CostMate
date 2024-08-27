import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import Category from "./Category";
import { Link } from "react-router-dom";
import useNewItem from "../store/useNewItem";
import useEditItem from "../store/useEditItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import getItemAsync from "../utils/getItemAsync";
import { db } from "../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
const View = () => {
  const { data } = useStore();
  const { newData } = useNewItem();
  const { newEditData, setEditData } = useEditItem();
  const [allData, setAllData] = useState([]);
  // console.log(allData);

  // const itemsFromFirestore = async () => {
  //   const querySnapshot = await getDocs(collection(db, "items"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     return doc.data();
  //   });
  // };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllData(items);
    };

    fetchDataFromFirestore();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getItemAsync("data");
      setAllData(storedData);
    };

    fetchData();
    // if (data.length > 0) {
    //   setAllData(data);
    // }
  }, [data]);

  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with a Date object
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Manage visibility

  const handleChange = (date) => {
    if (date) {
      setSelectedDate(date);
      setDatePickerVisible(false); // Hide date picker after selection
    }
  };

  const handleAddButton = () => {
    newData.length = 0;
  };

  const handleEditButton = () => {
    setEditData(filteredItems);
  };

  const filteredItems = allData
    ? allData.filter((item) => {
        return (
          new Date(item.date).toDateString() === selectedDate.toDateString()
        );
      })
    : console.log("No data found");

  // const total = filteredItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center border border-slate-100 px-4 py-2 rounded-xl bg-slate-800">
        <p className="text-slate-100">
          {selectedDate
            ? selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Select a date"}
        </p>
        <button
          onClick={() => setDatePickerVisible(!isDatePickerVisible)}
          className="text-slate-100 bg-transparent border border-slate-200 rounded px-2 py-1"
        >
          {isDatePickerVisible ? (
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <span className="flex gap-2">
              Select a date
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </span>
          )}
        </button>
      </div>
      {isDatePickerVisible && (
        <Calendar
          value={selectedDate}
          onChange={handleChange}
          className={
            "rounded-lg absolute bottom-[280px] right-1/2 translate-x-[50%] sm:bottom-[250px] sm:right-[40%] md:bottom-[280px]  "
          }
        />
      )}
      {/* <div className="absolute  left-1/2 translate-x-[-50%] mt-2 w-full max-w-sm bg-slate-800 border border-slate-200 rounded"> */}
      {/* <DayPicker
            mode="single"
            // selected={selectedDate}
            onSelect={handleChange}
            footer={
              selectedDate
                ? `Selected: ${selectedDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`
                : "Pick a day."
            }
            className="bg-slate-400 border border-slate-200 rounded p-4"
          /> */}
      {/* </div> */}

      <Category filteredItems={filteredItems} />
      <div className="flex justify-center items-center gap-2 border-slate-100 px-4 py-2 text-white">
        <div className="flex gap-3">
          <Link
            to={"/edit"}
            onClick={handleEditButton}
            // state={{ editData: filteredItems }}
            className="text-slate-100 duration-100 active:scale-90 size-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>

          <Link
            onClick={handleAddButton}
            to={"/create"}
            className="text-slate-100 duration-100 active:scale-90 size-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
