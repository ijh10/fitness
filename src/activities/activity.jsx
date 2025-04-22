import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function Activity({ activity }) {
  const { token } = useAuth();

  const { mutate, data, loading, error } = useMutation(
    "DELETE",
    `/activities/${activity.id}`
  );
  const handleDeleteActivity = async () => {
    await mutate();
    console.log(data, loading, error);
  };

  return (
    <>
      <li>
        {activity.name}
        {token && (
          <button onClick={() => handleDeleteActivity(activity.id)}>
            Delete{" "}
          </button>
        )}
        {error && <p>error deleting activity</p>}
      </li>
    </>
  );
}
