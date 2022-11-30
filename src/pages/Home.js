import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import SmoothieCard from "../components/SmoothieCard";
import "../index.css";

const Home = () => {
  console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderby] = useState("created_at");

  const handleDelete = (id) => {
    const newSmoothies = smoothies.filter((smoothie) => smoothie.id !== id);
    setSmoothies(newSmoothies);
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("Smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch data");
        console.log(error);
        setSmoothies(null);
      }
      if (data) {
        console.log(data);
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button
              onClick={(e) => {
                setOrderby("created_at");
                e.target.classList.toggle("active");
              }}
            >
              Time Created
            </button>
            <button
              onClick={(e) => {
                setOrderby("title");
                e.target.classList.toggle("active");
              }}
            >
              Title
            </button>
            <button
              onClick={(e) => {
                setOrderby("rating");
                e.target.classList.toggle("active");
              }}
            >
              Rating
            </button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                onDelete={handleDelete}
                key={smoothie.id}
                smoothie={smoothie}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
