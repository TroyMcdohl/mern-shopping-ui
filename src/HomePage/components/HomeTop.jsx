import { useContext, useEffect, useState } from "react";
import "./homeTop.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AuthContext } from "../../context/AuthContext";

const HomeTop = () => {
  const [move, setMove] = useState(0);
  const [chg, setChg] = useState(false);

  const moveHandler = (way) => {
    way === "left"
      ? setMove(move > 0 ? move - 1 : 2)
      : setMove(move > 1 ? 0 : move + 1);
    setChg(true);
    setTimeout(() => {
      setChg(false);
    }, 3000);
  };

  const dotHandler = (current) => {
    setMove(current);
    setChg(true);
    setTimeout(() => {
      setChg(false);
    }, 5000);
  };

  useEffect(() => {
    if (!chg) {
      setTimeout(() => {
        if (move == 0) {
          return setMove(1);
        } else if (move == 1) {
          return setMove(2);
        } else if (move == 2) {
          return setMove(0);
        }
      }, 1500);
    }
  }, [chg, move]);

  const categoryData = [
    {
      caption: "Summer Fashion",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elitSaep ratione eos quisquam! Illo quos autem ullam, nostrum quia fuga repellendus ab tempore veniam aliquid accusantium. Ipsa quae eaque saepe aliquid",
      img: "https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Glitter-Paparazzi-600x800.jpg",
    },
    {
      caption: "Fall Fashion",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elitSaep ratione eos quisquam! Illo quos autem ullam, nostrum quia fuga repellendus ab tempore veniam aliquid accusantium. Ipsa quae eaque saepe aliquid",
      img: "https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Ombr%C3%A9-Oyster-600x800.jpg",
    },
    {
      caption: "Winter Fashion",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elitSaep ratione eos quisquam! Illo quos autem ullam, nostrum quia fuga repellendus ab tempore veniam aliquid accusantium. Ipsa quae eaque saepe aliquid",
      img: "https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Hashtags-and-Hash-Browns-600x800.jpg",
    },
  ];

  return (
    <div className="home_top_container">
      <div className="home_top_left_arrow" onClick={() => moveHandler("left")}>
        <ArrowLeftIcon />
      </div>
      <div
        className="home_top_right_arrow"
        onClick={() => moveHandler("right")}
      >
        <ArrowRightIcon />
      </div>

      {categoryData.map((d, i) => (
        <div
          className={i == move ? "home_top_wrapper active" : "home_top_wrapper"}
        >
          {move == i && (
            <div className="home_top_card">
              <div className="home_top_des">
                <h5 className="home_top_caption">{d.caption}</h5>
                <p className="home_top_para">{d.caption}</p>
                <button className="home_top_btn">Shop now</button>
              </div>
              <div className="home_top_img_box">
                <img src={d.img} alt="" className="home_top_img" />
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="home_top_dots">
        <div
          className={move == 0 ? "home_top_dot active" : "home_top_dot"}
          onClick={() => dotHandler(0)}
        ></div>
        <div
          className={move == 1 ? "home_top_dot active" : "home_top_dot"}
          onClick={() => dotHandler(1)}
        ></div>
        <div
          className={move == 2 ? "home_top_dot active" : "home_top_dot"}
          onClick={() => dotHandler(2)}
        ></div>
      </div>
    </div>
  );
};

export default HomeTop;
