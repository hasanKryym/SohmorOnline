import "./ContactUs.css";

const ContactUs = () => {
  return (
    <>
      <div className="contact_us-container">
        <div style={{ paddingBottom: "1rem", color: "#373234" }}>
          <h3>Contact Us: </h3>
        </div>
        <div className="contact_us-inputs">
          <input className="custom-input" type="text" placeholder="Full name" />
          <input
            className="custom-input"
            type="text"
            placeholder="Email address"
          />
          <textarea
            className="custom-input"
            type="text"
            placeholder="Message"
          />
          <button className="custom-button">Send Message</button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
