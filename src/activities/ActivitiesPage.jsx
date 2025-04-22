import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import Activity from "./activity";
// this is a componant. its just a reuseable piece of code, but we treat it as HTML

export default function ActivitiesPage() {
  // activities is itself a componant, and we export it to use in the app
  const { data, loading, error } = useQuery("/activities");
  // when we get a reponse back from the API it will give us data loading or error

  const {
    mutate,
    data: mutatedata,
    loading: mutateloading,
    error: muatateerror,
  } = useMutation("POST", "/activities");
  // method and the end point that we want to send mutations too. receive a mutate function to perform the operation and we are going to receieve the data, loading and error, if they exist back form the API

  console.log(data, loading, error);
  const renderActivites = () => {
    return data?.map((activity) => {
      return <Activity activity={activity} key={activity.id} />;
      // activity is a seperate componant
    });
  };
  // mapping over all the actitivtes. data will give us an array, we make a new one with map.

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    //prevents it from refreshing the page
    const formdata = new FormData(event.target);
    // event.target =is the form element. taking the whole form and taking all the data thats inside. getting inputs (name, description)
    // key:vaule = name of the input: what the user types. description:"description activity"
    await mutate(
      {
        name: formdata.get("name"),
        description: formdata.get("description"),
      },
      []
    );
  };

  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label>Name</label>
          <input name={"name"} />
        </div>
        <div>
          <label>Description</label>
          <input name={"description"} />
        </div>
        <button type="submit">Create</button>
      </form>
      {muatateerror && <p>could not add new activity</p>}
      {/*this is going to check if there are errors in the mutation repsponse if there are its going to show this paragraph */}
      <ul>{renderActivites()}</ul>
    </>
  );
}
// this UL renders out the un ordered list of activites that we get from the query
