import React, { useState } from "react";

const NewSubmissionModal = () => {
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Picture:", picture);
    console.log("Description:", description);
  };

  return (
    <div>
      {/* Modal content */}
      <h2>New Submission</h2>
      <input type="file" accept="image/*" onChange={handlePictureChange} />
      <textarea value={description} onChange={handleDescriptionChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewSubmissionModal;
