import { useEffect, useRef, useState } from "react";
import noImage from "../assets/no_image.png";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

export default function Card(props) {
  const [clicked, setClicked] = useState(false);
  const image = useRef(null);
  const items = useRef(null);
  const textSnippet = useRef(null);

  return (
    <>
      {props.book.map((item, i) => {
        let thumbnail =
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
        console.log(props.book);

        if (typeof item.volumeInfo.averageRating === "undefined") {
          item.volumeInfo.averageRating = "not specified";
        }

        if (typeof item.volumeInfo.categories === "undefined") {
          item.volumeInfo.categories = "not specified";
        }

        return (
          <>
            <div
              className="card"
              onClick={() => {
                setClicked(true);
                document
                  .querySelector("body")
                  .classList.toggle("body-disabled-scroll");
                items.current = item.volumeInfo;
                image.current = thumbnail;
                if (typeof textSnippet.current === "undefined") {
                  textSnippet.current = "";
                } else {
                  textSnippet.current = item.searchInfo.textSnippet;
                }
              }}
            >
              <p>{item.volumeInfo.title}</p>

              <img src={thumbnail} alt="Image" className="cardImage"></img>
            </div>
          </>
        );
      })}

      {clicked ? (
        <>
          <Backdrop />
          <Modal
            title={items.current.title}
            thumbnail={image.current}
            link={items.current.infoLink}
            textSnippet={items.current.description}
            author={items.current.authors}
            rating={items.current.averageRating}
            language={items.current.language}
            category={items.current.categories}
            onKey={() => {
              document
                .querySelector("body")
                .classList.remove("body-disabled-scroll");
              setClicked(false);
            }}
          />
        </>
      ) : null}
    </>
  );
}
