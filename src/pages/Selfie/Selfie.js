import { useRef, useState } from "react";
import "./selfie.css";
function Selfie() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const imageRef = useRef();

  const [imageUrl, setImageUrl] = useState();

  const [error, setError] = useState(null);

  const startCamera = async () => {
    setImageUrl("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      setError(err.message);
    }
  };

  const stopCam = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  };

  const takeSelfie = async () => {
    // Get the exact size of the video element.
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    // get the context object of hidden canvas
    const ctx = canvasRef.current.getContext("2d");

    // Set the canvas to the same dimensions as the video.
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // Draw the current frame from the video on the canvas.
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    // Get an image dataURL from the canvas.
    const imageDataURL = canvasRef.current.toDataURL("image/png");

    // Set the dataURL as source of an image element, showing the captured photo.
    stopCam();

    setImageUrl(imageDataURL);
  };

  return (
    <div className='selfie'>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className='action-container'>
          <div className='video-wrapper'>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            {imageUrl ? (
              <img
                className='preview-img'
                src={imageUrl}
                ref={imageRef}
                alt='selfieImage'
              />
            ) : (
              <video
                width='100%'
                height='100%'
                className='video-player'
                autoPlay={true}
                ref={videoRef}
              ></video>
            )}
          </div>

          <div className='actions'>
            <button className='primary' onClick={startCamera}>
              Start Video
            </button>
            <button className='primary' onClick={takeSelfie}>
              Take Selfie
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Selfie;
