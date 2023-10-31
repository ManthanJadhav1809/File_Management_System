import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFile } from "../../redux/ActionCreators/fileFolderActionCreator";

export default function CreateFile({ setIsCreateFileModalOpen }) {
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.filefolders.userFiles,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
    }),
    shallowEqual
  );

  useEffect(()=>{
   if(success){
    setFileName("");
    setSuccess(false);
    setIsCreateFileModalOpen(false);
   }
  },[success])

  const checkFileAlreadyExits = (name,extension) => {
    if(!extension){
      name=name+".txt"
    }
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((fldr) => fldr.data.name === name);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
    // }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (fileName) {
      if (fileName.length > 3) {
        // check file Extensionn
        let extension=false;
        if(fileName.split(".").length>1){
          extension=true;
        }
        if (!checkFileAlreadyExits(fileName,extension)) {
          const data = {
            creatrdAt: new Date(),
            name: extension ? fileName:`${fileName}.txt`,
            userId: user.uid,
            creatrdBy: user.displayName,
            path:
              currentFolder === "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
            extension:extension ? fileName.split(".")[1]:"txt",
            data: "",
            url: null,
          };
         console.log(data)
         dispatch(createFile(data,setSuccess));
        } else {
          alert("file already present");
        }
      } else {
        alert("File Name must be at least 3 character");
      }
    } else {
      alert("File name cannot be empty");
    }
  };
  return (
    <div
      className="col-md-12  position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgb(0,0,0,0.3)", zIndex: 9999 }}
    >
      <div className="row alignitems-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Create File</h4>
            <button
              className="btn"
              onClick={() => setIsCreateFileModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-item-center">
            <form className="mt-3 w-100" onSubmit={handelSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fileName"
                  placeholder="File name e.g file.txt,index.txt"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Create File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
