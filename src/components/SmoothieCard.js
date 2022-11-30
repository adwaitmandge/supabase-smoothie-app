import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const { id, title, method, rating } = smoothie;

  const deleteHandler = async () => {
    try {
      const { data, error } = await supabase
        .from("Smoothies")
        .delete()
        .eq("id", id)
        .select();
      onDelete(id);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{title}</h3>
      <p>{method}</p>
      <div className="rating">
        <h3>{rating}</h3>
      </div>
      <div className="buttons">
        <Link to={`/${id}`}>
          <i className="material-icons">edit</i>
        </Link>

        <i className="material-icons" onClick={deleteHandler}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;
