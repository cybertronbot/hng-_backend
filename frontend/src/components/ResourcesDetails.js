import { useResourcesContext } from "../hooks/useResourcesContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ResourcesDetails = ({ resources }) => {
  const { dispatch } = useResourcesContext();

  const handleClick = async () => {
    const response = await fetch("/api/resources/" + resources._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_RESOURCES", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{resources.title}</h4>
      <p>
      
        {resources.name}
      </p>
      <p>
     
        {resources.role}
      </p>
      <p>

        {resources.company}
      </p>
      <p>

        {resources.ratings}
      </p>
      <p>
 
        {resources.reviews}
      </p>
      <p>
        {formatDistanceToNow(new Date(resources.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ResourcesDetails;
