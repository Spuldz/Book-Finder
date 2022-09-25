import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Modal(props) {
  useEffect(() => {
    const keyDownHandler = (evt) => {
      if (evt.key === "Escape") {
        props.onKey();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
  }, []);

  return (
    <div className="modal">
      <div className="modal-top">
        <div className="modal-imagebar">
          <img src={props.thumbnail} className="modal-img"></img>
        </div>
        <div className="modal-title">{props.title}</div>
      </div>

      <div className="modal-center">
        <p className="modal-snippet">{"Authors: " + props.author}</p>
        <p className="modal-snippet">{"Rating: " + props.rating}</p>
        <p className="modal-snippet">{"Categories: " + props.category}</p>
        <p className="modal-snippet">{"Language: " + props.language}</p>
        <p className="modal-snippet">{props.textSnippet}</p>
        <a href={props.link} className="modal-link">
          go to books page
        </a>
      </div>
    </div>
  );
}
