import { useState } from "react";
import { useResourcesContext } from "../hooks/useResourcesContext";

const ResourcesForm = () => {
  const { dispatch } = useResourcesContext();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [ratings, setRatings] = useState("");
  const [reviews, setReviews] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resources = {title, name, role,company,ratings,reviews};

    const response = await fetch("/api/resources", {
      method: "POST",
      body: JSON.stringify(resources),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setName("");
      setRole("");
      setCompany("");
      setRatings("");
      setReviews("");
      dispatch({ type: "CREATE_RESOURCES", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      

   
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />

     
      <input
        type="text"
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className={emptyFields.includes("role") ? "error" : ""}
      />
    
      <input
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className={emptyFields.includes("company") ? "error" : ""}
      />
 
      <input
        type="number"
        onChange={(e) => setRatings(e.target.value)}
        value={ratings}
        className={emptyFields.includes("ratings") ? "error" : ""}
      />
      
      <input
        type="number"
        onChange={(e) => setReviews(e.target.value)}
        value={reviews}
        className={emptyFields.includes("reviews") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ResourcesForm;
