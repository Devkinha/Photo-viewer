import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ImageViewer from "./components/ImageViewer";
import ThumbnailBar from "./components/ThumbnailBar";
import ImageInfoBar from "./components/ImageInfoBar";
import ZoomBar from "./components/ZoomBar";

export default function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("photos")) || [];
    setImages(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(images));
  }, [images]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const deleteImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (index === currentIndex) setCurrentIndex(null);
  };

  const nextImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
    setZoom(1);
  };

  const prevImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setZoom(1);
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.15, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.5));

  // ✔ NEW: Reset zoom
  const resetZoom = () => setZoom(1);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0f0f0f",
        color: "white",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        display: "grid",
        gridTemplateRows: "60px 1fr",
        touchAction: "none", // ❗ Add this to prevent page zooming
      }}
    >

      <Header />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setZoom={setZoom}
          onUploadClick={() => fileInputRef.current.click()}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {/* Zoom bar is always visible */}
          <ZoomBar
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetZoom} // ✔ reset always visible
          />

          <ImageViewer images={images} currentIndex={currentIndex} zoom={zoom} setZoom={setZoom} onNext={nextImage} onPrev={prevImage} />



          <ImageInfoBar images={images} currentIndex={currentIndex} />

          <ThumbnailBar images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} deleteImage={deleteImage} />
        </div>

        <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleUpload} hidden />
      </div>
    </div>
  );
}
