import "./homeFeacture.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HomeFeacture = () => {
  const boxVariant = {
    visible: { opacity: 1, y: "0px", transition: { duration: 1 } },
    hidden: { opacity: 0, y: "50px" },
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="home_feacture_container"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <div className="home_feacture_wrapper">
        <div className="home_feacture_card_wrapper">
          <div className="home_feacture_card">
            <div className="home_feacture_card_img_box">
              <img
                src="https://cdn.justluxe.com/articles/images/news/news1782867.jpg"
                alt=""
                className="home_feacture_card_img"
              />
              <h4 className="home_feacture_card_img_caption">Men's Wears</h4>
              <button className="home_feacture_card_img_btn">Shop Now</button>
            </div>
          </div>
          <div className="home_feacture_card">
            <div className="home_feacture_card_img_box">
              <img
                src="https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Black-Sequin-Dress-600x767.jpg"
                alt=""
                className="home_feacture_card_img"
              />
              <h4 className="home_feacture_card_img_caption">Women's Wears</h4>
              <button className="home_feacture_card_img_btn">Shop Now</button>
            </div>
          </div>
          <div className="home_feacture_card">
            <div className="home_feacture_card_img_box">
              <img
                src="https://cdn.justluxe.com/articles/images/news/news1782867.jpg"
                alt=""
                className="home_feacture_card_img"
              />
              <h4 className="home_feacture_card_img_caption">Other's Wears</h4>
              <button className="home_feacture_card_img_btn">Shop Now</button>
            </div>
          </div>
        </div>
        <div className="home_feacture_bot_wrapper">
          <ul className="home_feacture_bot_items">
            <li className="home_feacture_bot_item">
              <img
                src="https://www.bing.com/th?id=OIP.CWZwV4wBY1AAqBSGdHwl7gHaFo&w=286&h=217&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt=""
                className="home_feacture_bot_item_img"
              />
            </li>
            <li className="home_feacture_bot_item">
              <img
                src="https://3.bp.blogspot.com/-vDRrQWJtLYQ/ViU4lRWr3fI/AAAAAAAAAG0/iE_tFUAQRXw/s1600/timberland-logo.png"
                alt=""
                className="home_feacture_bot_item_img"
              />
            </li>
            <li className="home_feacture_bot_item">
              <img
                src="https://th.bing.com/th/id/OIP.WKnbRNwE5fZZWKMywfKO4AHaD0?pid=ImgDet&rs=1"
                alt=""
                className="home_feacture_bot_item_img"
              />
            </li>
            <li className="home_feacture_bot_item">
              <img
                src="https://th.bing.com/th/id/OIP.W1VIeT7kt3wnBGnrhDJ4wAHaJQ?w=130&h=180&c=7&r=0&o=5&pid=1.7"
                alt=""
                className="home_feacture_bot_item_img"
              />
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeFeacture;

// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect } from "react";

// const boxVariant = {
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
//   hidden: { opacity: 0, scale: 0 }
// };

// const Box = ({ num }) => {

//   const control = useAnimation();
//   const [ref, inView] = useInView();

//   useEffect(() => {
//     if (inView) {
//       control.start("visible");
//     } else {
//       control.start("hidden");
//     }
//   }, [control, inView]);

//   return (
//     <motion.div
//       className="box"
//       ref={ref}
//       variants={boxVariant}
//       initial="hidden"
//       animate={control}
//     >
//       <h1>Box {num} </h1>
//     </motion.div>
//   );
// };

// export default function App() {
//   return (
//     <div className="App">
//       <Box num={1} />
//       <Box num={2} />
//       <Box num={3} />
//     </div>
//   );
// }
