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
  const [coursetype, setCoursetype] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the selected file is an image
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setError("Please select a valid image file (e.g., JPG, PNG, GIF).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !name ||
      !role ||
      !company ||
      !ratings ||
      !reviews ||
      !currency ||
      !price
    ) {
      setEmptyFields([
        "title",
        "name",
        "role",
        "company",
        "ratings",
        "reviews",
        "currency",
        "price",
      ]);
      setError("Please fill in all fields.");
    }

    if (!file) {
      setEmptyFields(["file"]);
      setError("Please select an image file.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("company", company);
    formData.append("ratings", ratings);
    formData.append("reviews", reviews);
    formData.append("currency", currency);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("coursetype", coursetype);

    formData.append("file", file);

    const response = await fetch("https://hngmentorme.onrender.com/api/resources", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();
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
      setCoursetype("");
      setDescription("");
      setCategory("");
      setFile(null); //
      dispatch({ type: "CREATE_RESOURCES", payload: json });
    } else {
      const json = await response.json();
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes("title") ? "error" : ""}
      />
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields?.includes("name") ? "error" : ""}
      />

      <label>Role:</label>
      <input
        type="text"
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className={emptyFields?.includes("role") ? "error" : ""}
      />
      <label>Company:</label>
      <input
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className={emptyFields?.includes("company") ? "error" : ""}
      />
      <label>Rating:</label>
      <input
        type="number"
        onChange={(e) => setRatings(e.target.value)}
        value={ratings}
        className={emptyFields?.includes("ratings") ? "error" : ""}
      />
      <label>Review:</label>
      <input
        type="number"
        onChange={(e) => setReviews(e.target.value)}
        value={reviews}
        className={emptyFields?.includes("reviews") ? "error" : ""}
      />
      <label>Currency:</label>
      <input
        type="text"
        onChange={(e) => setCurrency(e.target.value)}
        value={currency}
        className={emptyFields?.includes("currency") ? "error" : ""}
      />
      <label>Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields?.includes("price") ? "error" : ""}
      />
      <label>Coursetype:</label>
      <input
        type="text"
        onChange={(e) => setCoursetype(e.target.value)}
        value={coursetype}
        className={emptyFields?.includes("coursetype") ? "error" : ""}
      />
      <label>category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields?.includes("category") ? "error" : ""}
      />
      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields?.includes("description") ? "error" : ""}
      />

      <label>Image:</label>

      <input
        type="file"
        accept="image/*"
        name="file"
        onChange={handleFileChange}
      />

      <button>Add Resources</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ResourcesForm;
