import "./Features.css";

import { featuresData } from "./FeaturesEnum";

const Features = () => {
  console.log(featuresData);
  return (
    <>
      <div className="title_container">
        <h2>Features</h2>
      </div>
      <div className="features_container">
        {featuresData.map(({ title, description }) => {
          return (
            <article className="feature">
              <h4 className="feature_title">{title}</h4>
              <p className="feature_description">{description}</p>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Features;
