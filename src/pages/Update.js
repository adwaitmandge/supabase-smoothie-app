import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const [smoothie, setSmoothie] = useState({
    title: "",
    method: "",
    rating: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!smoothie.title || !smoothie.method || !smoothie.rating) {
      console.log("error");
      return;
    } else {
      console.log(smoothie);
      const { data, error } = await supabase
        .from("Smoothies")
        .update({
          title: smoothie.title,
          method: smoothie.method,
          rating: smoothie.rating,
        })
        .eq("id", id)
        .select()
        .single();
      console.log(data);
    }
  };

  const changeHandler = (e) => {
    setSmoothie({ ...smoothie, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      try {
        const { data, error } = await supabase
          .from("Smoothies")
          .select("*")
          .eq("id", id)
          .single();
        setSmoothie(data);
        console.log(data);
      } catch (err) {
        console.log("OH NO!!, ERROR OCCURRED");
        console.error(err.message);
        navigate("/");
      }
    };
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page create">
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          id="title"
          value={smoothie.title}
          onChange={changeHandler}
        />
        <label htmlFor="method">Method:</label>
        <input
          name="method"
          type="text"
          id="method"
          value={smoothie.method}
          onChange={changeHandler}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          name="rating"
          type="number"
          id="rating"
          value={smoothie.rating}
          onChange={changeHandler}
        />
        <button>Update Smoothie Recipe</button>
        {/* {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  );
};

export default Update;
