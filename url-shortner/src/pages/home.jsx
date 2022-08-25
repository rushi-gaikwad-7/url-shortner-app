
import styles from "../css/index.module.css";
import axios from "axios";
import { useState } from "react";
export const Homepage = () => {
  const [Link, newLink] = useState("");
  const [link, setLink] = useState("");
  const [CustomLink, setCustomLink] = useState("");
  const [custom,setCustom]=useState(false)

  

  const handleClick = async () => {
    const res = await axios.post("http://localhost:8080/shortLink", {
      link,
      CustomLink,
    });
    setLink("");
    setCustomLink("");
    newLink(res.data.newUrl);
  };
  return (
    <div className={styles.mainDiv}>
      <h1>LINK SHORTENER</h1>
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className={styles.inputTag}
        type="text"
        placeholder="Enter link to short"
      />
   <br />
      <input className={styles.Check} onChange={(e)=>setCustom(!custom)} type="checkbox" name="customUrl" id="customUrl" />
      <label htmlFor="customUrl">customUrl</label>
    <br />
      {
        custom?
        <input
          value={CustomLink}
          onChange={(e) => setCustomLink(e.target.value)}
          className={styles.inputTag}
          type="text"
          placeholder="Custom link"
        />:<></>
      }
      <br />
      <button onClick={() => handleClick()} className={styles.btn}>
        Short Link
      </button>
      <br />
      <a target="_blank" rel="noreferrer" className={styles.aTag} href={Link}>
        {Link}
      </a>
    </div>
  );
};
