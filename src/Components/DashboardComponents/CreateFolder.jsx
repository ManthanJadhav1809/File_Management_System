import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { creatFolder } from "../../redux/ActionCreators/fileFolderActionCreator";
import { toast } from "react-toastify";

export default function CreateFolder({ setIsCreateFolderModalOpen }) {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const { userFolders, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFolders: state.filefolders.userFolders,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
    }),
    shallowEqual
  );



  const checkFolderAlreadyExits = (name) => {
    // if (currentFolder === "root") {
    //   const folderPresent = userFolders.find((folder) => folder.name === name);
    //   if (folderPresent) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    // else{
    const folderPresent = userFolders
      .filter((folder) => folder.data.parent === currentFolder)
      .find((folder) => folder.data.name === name);
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
    // }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 3) {
        if (!checkFolderAlreadyExits(folderName)) {
          const data = {
            creatrdAt: new Date(),
            name: folderName,
            userId: user.uid,
            creatrdBy: user.displayName,
            path:
              currentFolder === "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          console.log(data);
          dispatch(creatFolder(data));
          setIsCreateFolderModalOpen(false);
        } else {
          toast.error('folder already present',{
            position:'top-right'
          });
          // alert("folder already present");
        }
        
      } else {
        toast.error('file Name must be at Least 3 character',{
          position:'top-right'
        });
        // alert("File Name must be at least 3 character");
      }
    } else {
      toast.error('folder name cannot be empty',{
        position:'top-right'
      });
      // alert("Folder name cannot be empty");
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
            <h4>Create Folder</h4>
            <button
              className="btn"
              onClick={() => setIsCreateFolderModalOpen(false)}
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
                  id="folderName"
                  placeholder="Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
