import useStore from "../store/useStore";
import useNewItem from "../store/useNewItem";
import ItemComponent from "./ItemComponent";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Empty from "./Empty";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const NewItemList = () => {
  const navigate = useNavigate();
  const { newData } = useNewItem();
  const { data } = useStore();

  console.log(newData);

  const handleAddButton = () => {
    if (newData.length > 0) {
      useStore.setState({ data: [...data, ...newData] });
      navigate("/home");
    } else {
      Swal.fire({
        title: "No items was added",
        text: "Are you sure you want to save?",
        icon: "warning",
        iconColor: "#2a475e",
        color: "#2a475e",
        showCancelButton: true,
        background: "#c7d5e0",
        confirmButtonColor: "#15803D",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
    }
  };

  const handleDeleteButton = (id) => {
    Swal.fire({
      title: "Are you sure to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#2a475e",
      color: "#2a475e",
      showCancelButton: true,
      background: "#c7d5e0",
      confirmButtonColor: "#15803D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newDataList = newData.filter((item) => item.id !== id);
        useNewItem.setState({ newData: newDataList });
        toast.success("Item deleted successfully");

        const storedData = JSON.parse(localStorage.getItem("data")) || [];

        localStorage.setItem(
          "data",
          JSON.stringify(storedData.filter((item) => item.id !== id))
        );
      }
    });
    // if (Swal) {
    //   const newDataList = newData.filter((item) => item.id !== id);
    //   useNewItem.setState({ newData: newDataList });
    //   toast.success("Item deleted successfully");

    //   const storedData = JSON.parse(localStorage.getItem("data")) || [];

    //   localStorage.setItem(
    //     "data",
    //     JSON.stringify(storedData.filter((item) => item.id !== id))
    //   );
    // }
  };

  return (
    <div>
      <ItemComponent
        newData={newData}
        handleDeleteButton={handleDeleteButton}
        handleAddButton={handleAddButton}
      />
      <Toaster />
    </div>
  );
};

export default NewItemList;
