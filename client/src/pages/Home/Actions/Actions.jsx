import "./Actions.css";
import { homeActions } from "./ActionsEnum";
import imageAction1 from "../../../assets/images/homePage/shopbag.jpg";
import imageAction2 from "../../../assets/images/homePage/buyOnline.jpg";

const Actions = () => {
  return (
    <>
      <div className="actions_container">
        <div className="title_container"></div>

        {homeActions.map(({ title, description, button }, i) => {
          return (
            <article className={`action ${i % 2 !== 0 && "reverse"}`}>
              <img
                src={(i === 0 && imageAction1) || (i === 1 && imageAction2)}
                alt=""
              />
              <div className="action_details">
                <h2 className="action_title">{title}</h2>
                <p className="action_description">{description}</p>
                <button className="custom-button">{button}</button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Actions;
