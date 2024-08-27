import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Total = () => {
  const [total, setTotal] = useState(0);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTotal(items.reduce((sum, item) => sum + item.price, 0));
    };

    fetchDataFromFirestore();
  }, []);

  return (
    <section className="px-10 py-6">
      <h1 className="text-slate-200 text-2xl mb-3 px-4">Total Amount - </h1>
      <h1 className="text-center text-slate-50 text-4xl">
        {total.toFixed(2)} THB
      </h1>
    </section>
  );
};

export default Total;
