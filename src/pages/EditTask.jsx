import EditItem from "../components/EditItem";
import NewItemAdd from "../components/NewItemAdd";

const EditTask = () => {
  return (
    <div className="p-10">
      <NewItemAdd />
      <EditItem />
    </div>
  );
};

export default EditTask;
