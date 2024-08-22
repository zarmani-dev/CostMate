import NewItemAdd from "../components/NewItemAdd";
import NewItemList from "../components/NewItemList";
import ProtectedRoute from "./ProtectedRoute";

const CreateTask = () => {
  return (
    <div className="p-10">
      <NewItemAdd />
      <NewItemList />
    </div>
  );
};

export default CreateTask;
