import supabase from "../config/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormError("FILL ALL THE FORM FIELDS");
      return;
    }
    console.log(title, method, rating);
    const { data, error } = await supabase
      .from("Smoothies")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      setFormError("FILL ALL THE FORM FIELDS");
    } else if (data) {
      console.log(data);
      navigate("/");
      setFormError(null);
    }
  };

  return (
    <div className="page create">
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method:</label>
        <input
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create Smoothie Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
