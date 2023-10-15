import { useResourcesContext } from "../hooks/useResourcesContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ResourcesDetails = ({ resources }) => {
  const { dispatch } = useResourcesContext();

 

  return (
    <div >
   
      <p>
      
        {resources.name}
      </p>
      <p>
      
        {resources.title}
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
 
        {resources.currrency}
      </p>
      <p>
 
        {resources.price}
      </p>
      <p>
 
        {resources.coursetype}
      </p>
      <p>
 
        {resources.category}
      </p>
      <p>
        {formatDistanceToNow(new Date(resources.createdAt), {
          addSuffix: true,
        })}
      </p>
    
    </div>
  );
};

export default ResourcesDetails;
