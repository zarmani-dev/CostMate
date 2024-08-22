import NewItemAdd from "../components/NewItemAdd";
import NewItemList from "../components/NewItemList";
import ProtectedRoute from "./ProtectedRoute";

const CreateTask = () => {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <NewItemAdd />
        <NewItemList />
      </div>
    </ProtectedRoute>
  );
};

export default CreateTask;
