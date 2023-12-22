import "./homeCategory.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HomeCategory = () => {
  const boxVariant = {
    visible: { opacity: 1, y: "0px", transition: { duration: 1 } },
    hidden: { opacity: 0, y: "-50px" },
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
      className="homeCategory_container"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <div className="homeCategory_wrapper">
        <div className="homeCategory_top">
          <img
            src="https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Home-Shop-Single-Image-1-1.png"
            alt=""
            className="homeCategory_top_img"
          />
        </div>
        <div className="homeCategory_bot">
          <div className="homeCategory_bot_card">
            <img
              src="https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Home-Shop-Banner-1.jpg"
              alt=""
              className="homeCategory_bot_img"
            />
            <h5 className="homeCategory_bot_caption">Shop Clothes</h5>
          </div>
          <div className="homeCategory_bot_card">
            <img
              src="https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Home-Shop-Banner-2.jpg"
              alt=""
              className="homeCategory_bot_img"
            />
            <h5 className="homeCategory_bot_caption">Shop Accesories</h5>
          </div>
          <div className="homeCategory_bot_card">
            <img
              src="https://kloe.qodeinteractive.com/wp-content/uploads/2015/12/Home-Shop-Banner-3.jpg"
              alt=""
              className="homeCategory_bot_img"
            />
            <h5 className="homeCategory_bot_caption">Shop Clothes</h5>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCategory;
