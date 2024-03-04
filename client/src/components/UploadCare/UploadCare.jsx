import { Widget } from "@uploadcare/react-widget";

const AddImage = ({ setFormData }) => {
  return (
    <>
      <Widget
        publicKey="4ca5612cce133cd675bc"
        id="file"
        onFileSelect={(file) => {
          if (file) {
            file.progress((info) => {
              console.log("file progress: ", info.progress);
            });
            file.done((info) => {
              console.log("file uploaded: ", info.cdnUrl);
              setFormData((prevState) => {
                return { ...prevState, image: info.cdnUrl };
              });
              // navigate('/adminPanel');
              //   setInputs((prevState) => ({
              //     ...prevState,
              //     product_image: info.cdnUrl,
              //   }));
            });
          }
        }}
        onChange={(info) => {
          console.log("upload completed: ", info);
        }}
      />
    </>
  );
};

export default AddImage;
