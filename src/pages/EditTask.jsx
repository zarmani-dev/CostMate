import EditItem from "../components/EditItem";
import NewItemAdd from "../components/NewItemAdd";
import ProtectedRoute from "./ProtectedRoute";

const EditTask = () => {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <NewItemAdd />
        <EditItem />
      </div>
    </ProtectedRoute>
  );
};

export default EditTask;
