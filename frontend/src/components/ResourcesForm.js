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
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resources = { title, name, role, company, ratings, reviews,currency,price };

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
      setCurrency("");
      setPrice("");
      dispatch({ type: "CREATE_RESOURCES", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />

      <label>Role:</label>
      <input
        type="text"
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className={emptyFields.includes("role") ? "error" : ""}
      />
      <label>Company:</label>
      <input
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className={emptyFields.includes("company") ? "error" : ""}
      />
      <label>Rating:</label>
      <input
        type="number"
        onChange={(e) => setRatings(e.target.value)}
        value={ratings}
        className={emptyFields.includes("ratings") ? "error" : ""}
      />
      <label>Review:</label>
      <input
        type="number"
        onChange={(e) => setReviews(e.target.value)}
        value={reviews}
        className={emptyFields.includes("reviews") ? "error" : ""}
      />
      <label>Currency:</label>
      <input
        type="text"
        onChange={(e) => setCurrency(e.target.value)}
        value={currency}
        className={emptyFields.includes("currency") ? "error" : ""}
      />
      <label>Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes("price") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ResourcesForm;
