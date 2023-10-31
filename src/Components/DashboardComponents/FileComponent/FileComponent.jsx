//
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faDownload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteFile } from "../../../redux/ActionCreators/fileFolderActionCreator";

export default function FileComponent({ setShowSubBar }) {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");

  const navigate = useNavigate();

  const { currentFile } = useSelector(
    (state) => ({
      currentFile: state.filefolders.userFiles.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8" + encodeURIComponent(fileData)
    );
    element.setAttribute("download", currentFile.data.url);
    element.setAttribute("target", "_blank");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const dispatch = useDispatch();
  const handelDeleteFile = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(fileId));
      alert("File deleted successfully");
      // setShowSubBar(true); // Set setShowSubBar to true
      // navigate(-1);
    }
  };

  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile.data.data);
      setPrevFileData(currentFile.data.data);
    }
  }, [currentFile, prevFileData]);

  return (
    <div>
      {fileData != null ? ( // Check if currentFile exists
        <>
          <Header
            setShowSubBar={setShowSubBar}
            fileName={currentFile.data.name}
            fileData={fileData}
            prevFileData={currentFile.data.data}
            fileId={fileId}
          ></Header>
          <CodeEditor
            fileName={currentFile.data.name}
            data={fileData}
            setData={setFileData}
          ></CodeEditor>
        </>
      ) : (
        <>
          <div className="position-fixed w-100 h-100 left-0 top-0 bg-black text-white ">
            {/* sub menu bar */}
            <div className="d-flex py-4  px-5 justify-content-between align-items-center h-100">
              <p title={currentFile.data.name} className="my-0">
                {currentFile.data.name.length > 40
                  ? currentFile.data.name.slice(0, 40) +
                    "..." +
                    currentFile.data.extension
                  : currentFile.data.name}
              </p>
              <div className="d-flex align-item-center">
                <button
                  className="btn btn-sm btn-outline-light me-2 bg-white text-black mr-2"
                  onClick={() => {
                    navigate(-1);
                    setShowSubBar(true);
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
                  Go Back
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handelDeleteFile(fileId);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
                </button>

                <button
                  className="btn btn-sm btn-primary text-white mr-2"
                  onClick={downloadFile}
                >
                  <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                  Download
                </button>
              </div>
            </div>
            <div className="w-100 mt-4">
              {currentFile.data.extension.includes("png") ||
              currentFile.data.extension.includes("jpg") ||
              currentFile.data.extension.includes("jpeg") ||
              currentFile.data.extension.includes("gif") ? (
                <img
                  src={currentFile.data.url}
                  alt={currentFile.data.name}
                  className="w-100 h-100"
                />
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-item-center">
                  <p className="text-center text-light">
                    File Type not supported. Please download file to view it
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
