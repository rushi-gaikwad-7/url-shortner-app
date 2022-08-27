import styles from "../styles/main.module.css";
import axios from "axios";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Homepage = () => {
  const [Link, newLink] = useState("");
  const [link, setLink] = useState("");
  const [CustomLink, setCustomLink] = useState("");
  const [custom, setCustom] = useState(false);

  const notify = (msg) => toast(`${msg}`);

  const handleClick = async () => {
    if (!link) {
      notify('Enter the url')
    } else {
      notify('url shortened successfully..!')
      const res = await axios.post("http://localhost:8080/shortLink", {
        link,
        CustomLink,
      });
      setLink("");
      setCustomLink("");
      setCustom(false)
      newLink(res.data.newUrl);
    }
  };
  return (
    <div className={styles.mainDiv}>
      <h1>URL SHORTENER</h1>
      {custom?<>
        <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className={styles.inputTag}
        type="text"
        placeholder="Enter url to short"
      /><input
          value={CustomLink}
          onChange={(e) => setCustomLink(e.target.value)}
          className={styles.inputTag}
          type="text"
          placeholder="Custom link"
        />
         <button onClick={() => handleClick()} className={styles.btn}>
        Short Link
      </button></>:<>
      <div id="simple"></div>
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className={styles.inputTag}
        type="text"
        placeholder="Enter url to short"
      />
       <button  onClick={(e) => setCustom(!custom)} className={styles.btn}>
       Custom Url
      </button>{' '}
      <button onClick={() => handleClick()} className={styles.btn}>
        Short Link
      </button></>}
      <div className={styles.output}>
        <a target="_blank" rel="noreferrer" className={styles.aTag} href={Link}>
          {Link}
        </a>{" "}
        {Link ? (
          <CopyToClipboard text={Link}>
            <button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1827/1827938.png"
                alt=""
              />
            </button>
          </CopyToClipboard>
        ) : (
          <></>
        )}
      </div>
      <div>
        
        <ToastContainer />
      </div>
    </div>
  );
};
