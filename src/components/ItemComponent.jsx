import { Link } from "react-router-dom";
import Empty from "./Empty";

const ItemComponent = ({
  newData = [],
  handleDeleteButton,
  handleAddButton,
}) => {
  return (
    <div className="border border-slate-100 p-4 rounded-xl mt-8">
      <div className="border border-slate-200 p-3 rounded-xl">
        <ul>
          {newData.length === 0 && <Empty />}
          {newData.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b border-slate-100  py-2"
            >
              <p className="text-slate-100 text-[18px]">{item.category}</p>
              <div className="flex gap-3 text-slate-100">
                <p className="text-[18px]">{item.price} B</p>

                <button
                  className="text-red-600"
                  onClick={() => handleDeleteButton(item.id)}
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        {newData.length === 0 || (
          <p className="text-slate-50 text-right mt-3 mr-6 text-xl">
            Total - {newData.reduce((acc, item) => acc + item.price, 0)} B
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Link
          onClick={handleAddButton}
          className="bg-green-700 text-slate-100 px-4 py-2 rounded-xl text-center"
        >
          Save
        </Link>
        <Link
          to={"/home"}
          className="bg-red-700 text-slate-100 px-4 py-2 rounded-xl text-center"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default ItemComponent;
