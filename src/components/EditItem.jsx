import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemComponent from "./ItemComponent";
import useEditItem from "../store/useEditItem";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const EditItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newEditData } = useEditItem();

  console.log(newEditData);

  const handleAddButton = () => {
    if (newEditData.length == 0) {
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
    } else {
      navigate("/home");
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
        toast.success("Item deleted successfully");
        const newDataList = newEditData.filter((item) => item.id !== id);
        useEditItem.setState({ newEditData: newDataList });

        // Delete from firestore
        const deletedItem = async (id) => {
          const docRef = doc(db, "items", id);
          await deleteDoc(docRef);
        };
        deletedItem(id);
        // const storedData = JSON.parse(localStorage.getItem("data")) || [];

        // localStorage.setItem(
        //   "data",
        //   JSON.stringify(storedData.filter((item) => item.id !== id))
        // );
      }
    });
  };

  return (
    <div>
      <ItemComponent
        newData={newEditData}
        handleAddButton={handleAddButton}
        handleDeleteButton={handleDeleteButton}
      />
      <Toaster />
    </div>
  );
};

export default EditItem;
