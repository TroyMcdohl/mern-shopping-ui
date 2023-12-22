import "./botbar.css";

const Botbar = () => {
  return (
    <div className="botbar_container">
      <div className="botbar_wrapper">
        <ul className="botbar_items">
          <li className="botbar_item">
            <div className="botbar_item_box">
              <h5 className="botbar_item_title">Instagram</h5>
              <p className="botbar_item_para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident maiores distinctio eum, qui sunt molestiae amet modi
                et odio soluta aperiam, nemo, itaque rem dolores aspernatur
                molestias inventore nesciunt saepe?
              </p>
            </div>
          </li>
          <li className="botbar_item">
            <div className="botbar_item_box">
              <h5 className="botbar_item_title">Instagram</h5>
              <p className="botbar_item_para">Could not connect on @twitter</p>
            </div>
          </li>
          <li className="botbar_item">
            <div className="botbar_item_box">
              <h5 className="botbar_item_title">Facebook</h5>
              <p className="botbar_item_para">follow At @fb</p>
            </div>
          </li>
          <li className="botbar_item">
            <div className="botbar_item_box">
              <h5 className="botbar_item_title">Instagram</h5>
              <ul className="botbar_item_items">
                <li className="botbar_item_item">loremis not joke</li>
                <li className="botbar_item_item">am is not a perfect </li>
                <li className="botbar_item_item">know the fesactiure</li>
                <li className="botbar_item_item">things are ahppen</li>
                <li className="botbar_item_item">we are the on e</li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="botbar_copyright">
          &#9400; 2022 Qode Interactive,All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Botbar;
