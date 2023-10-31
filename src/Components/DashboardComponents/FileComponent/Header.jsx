import { faArrowLeftLong, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFile, updateFileData } from "../../../redux/ActionCreators/fileFolderActionCreator";

export default function Header({fileId, fileName,fileData,prevFileData }) {
  const navigate=useNavigate();
 const dispatch =useDispatch()

 const handelDeleteFile=(fileId)=>{
  
 if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(fileId));
      alert("file Deleted sucessfully");
      
    }
    navigate(-1);
 }
 return (
    <nav className="navbar navbar-expand-lg pb-2 mt-2 py-0 navbar-light bg-white shadow-sm">
      <p className="navbar-brand my-0 fw-bold ms-5">{fileName} </p>
      {
        fileData !== prevFileData &&(
          <h5 className="my-0 fw-bold ms-2 text-danger">*[modified]</h5>
        )
  
      }
      <ul className="navbar-nav ms-auto me-5 d-flex ">
        <li className="nav-item mx-2">
          <button className="btn btn-success" 
          onClick={()=>{ dispatch(updateFileData(fileId,fileData)) }}
          disabled={fileData===prevFileData}>
            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Save
            
          </button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-danger" 
           onClick={()=>{handelDeleteFile(fileId)}}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-dark" onClick={()=>navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon> Go Back
          </button>
        </li>
      </ul>
    </nav>
  );
}
