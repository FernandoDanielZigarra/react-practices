import { useState } from "react";
import { allFiles, uploadFile } from "./firebase/config";
import { useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [allUrls, setAllUrls] = useState(async()=>{
    const result = await allFiles();
    return result ? result : [];
  });

  const refreshAllItems = async () => {
    try {
      const result = await allFiles();
      setAllUrls(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshAllItems();
  }, [allUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadFile(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          name=""
          id=""
          accept="image/*"
        />
        <button disabled={file === null}>Upload</button>
      </form>
      <h2>All images in database</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        { allUrls.length > 0 &&
          allUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          ))}
      </div>
    </>
  );
}

export default App;
