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
import { toast } from "react-toastify";

export default function FileComponent({ setShowSubBar }) {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");

  const navigate = useNavigate();

  const { currentFile,isAuthenticated } = useSelector(
    (state) => ({
      currentFile: state.filefolders.userFiles.find(
        (file) => file.docId === fileId
      ),
      isAuthenticated:state.auth.isAuthenticated,
    }),
    shallowEqual
  );

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      currentFile.data.url
      // "data:text/plain;charset=utf-8" + encodeURIComponent(fileData)
    );
    element.setAttribute("download", currentFile.data.name);
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
      setShowSubBar(true); // Set setShowSubBar nto true
      navigate(-1);
      toast.success('File Deleted sucessfully',{
        position:'top-right',
      })
    }
  };

  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile.data.data);
      setPrevFileData(currentFile.data.data);
    }
    if(!isAuthenticated){
      navigate("/")
    }
  }, [currentFile, prevFileData,isAuthenticated]);
 
  if(isAuthenticated)
  return (
    
    <div>
      { isAuthenticated && fileData !== null ? ( // Check if currentFile exists
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
          <div className="w-100 h-100 left-0 top-0  text-black ">
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
              {console.log(
                currentFile.data.url + "  " + currentFile.data.extension
              )}
              {currentFile.data.extension.includes("png") ||
              currentFile.data.extension.includes("jpg") ||
              currentFile.data.extension.includes("jpeg") ||
              currentFile.data.extension.includes("gif") ? (
                <img
                  src={currentFile.data.url}
                  alt={currentFile.data.name}
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-item-center">
                  <h3 className="text-center text-black">
                    File Type not supported. Please download file to view it
                  </h3>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return <div>Login first</div>
  
}
