import React, { useState, useCallback } from "react";
import { FaUpload } from "react-icons/fa";

const FileInput = (props) => {
  const [preview, setPreview] = useState(props.image);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        const base64String = reader.result.split(",")[1]; // Extract base64 string
        if (props.onFileChange) {
          props.onFileChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onSelectFile = (event) => {
    const file = event.target.files[0];
    console.log(file, "..........");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        const base64String = reader?.result?.split(",")[1]; // Extract
        if (props.onFileChange) {
          props.onFileChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => document.getElementById("fileInput").click()}
        className="relative flex h-full min-h-[90px] w-full cursor-pointer items-center justify-center rounded-md border-[3px] border-dashed border-blueSecondary/40  py-7 hover:border-blueSecondary"
      >
        {preview || props.image ? (
          <img
            src={preview || props.image}
            alt="Preview"
            className="max-h-[10rem] max-w-[100%] object-contain object-center"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <FaUpload className="h-[3rem] w-[1.5rem] text-blueSecondary" />
            <p className="text-sm text-blueSecondary">
              Drag & drop or click to select file
            </p>
          </div>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onSelectFile}
      />
    </div>
  );
};

export default FileInput;
