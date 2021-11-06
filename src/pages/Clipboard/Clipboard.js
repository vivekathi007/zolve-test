import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import useQuery from "../../shared/hooks/useQuery";
import "./clipboard.css";
function Clipboard() {
  let query = useQuery();

  const [showNotificaiton, toggleNotificaiton] = useState(false);

  useEffect(() => {
    if (showNotificaiton) {
      setTimeout(() => {
        toggleNotificaiton(false);
      }, 2000);
    }
  }, [showNotificaiton]);

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("success", "copied to clipboard");
      toggleNotificaiton(true);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
  };
  const copyTextToClipboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(query.get("name"));
      return;
    }
    navigator.clipboard.writeText(query.get("name")).then(
      () => {
        console.log("success", "copied to clipboard");
        toggleNotificaiton(true);
      },
      (err) => {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      <div className='clipboard'>
        <input
          type='text'
          className='input-style'
          disabled
          value={query.get("name")}
        />
        <button className='copy-clipboard' onClick={copyTextToClipboard}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              d='M13,18H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h7c1.657,0,3,1.343,3,3v9 C16,16.657,14.657,18,13,18z'
              opacity='.35'
            ></path>
            <path d='M11,1H8C6.895,1,6,1.895,6,3c0,1.105,0.895,2,2,2h3c1.105,0,2-0.895,2-2C13,1.895,12.105,1,11,1z'></path>
            <path d='M20,22h-2c-0.552,0-1-0.448-1-1s0.448-1,1-1h2v-2c0-0.552,0.448-1,1-1s1,0.448,1,1v2C22,21.103,21.103,22,20,22z'></path>
            <path d='M13,22h-2c-1.103,0-2-0.897-2-2v-2c0-0.552,0.448-1,1-1s1,0.448,1,1v2h2c0.552,0,1,0.448,1,1S13.552,22,13,22z'></path>
            <path d='M10,14c-0.552,0-1-0.448-1-1v-2c0-1.103,0.897-2,2-2h2c0.552,0,1,0.448,1,1s-0.448,1-1,1h-2v2C11,13.552,10.552,14,10,14z'></path>
            <path d='M21,14c-0.552,0-1-0.448-1-1v-2h-2c-0.552,0-1-0.448-1-1s0.448-1,1-1h2c1.103,0,2,0.897,2,2v2C22,13.552,21.552,14,21,14z'></path>
          </svg>
        </button>
        {showNotificaiton ? <p className="notification">Successfully Copied</p> : null}
      </div>
    </>
  );
}

export default Clipboard;
