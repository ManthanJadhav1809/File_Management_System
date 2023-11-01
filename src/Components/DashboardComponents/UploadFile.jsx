// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { uploadFile } from "../../redux/ActionCreators/fileFolderActionCreator";

// export default function UploadFile({ setIsFileUploadModalOpen }) {
//   const [file, setFile] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const dispatch = useDispatch();
//   const { userFiles, user, currentFolder, currentFolderData } = useSelector(
//     (state) => ({
//       userFiles: state.filefolders.userFiles,
//       user: state.auth.user,
//       currentFolder: state.filefolders.currentFolder,
//       currentFolderData: state.filefolders.userFolders.find(
//         (folder) => folder.docId === state.filefolders.currentFolder
//       ),
//     }),
//     shallowEqual
//   );

//   useEffect(()=>{
//    if(success){
//     setFile("");
//     setSuccess(false);
//     setIsFileUploadModalOpen(false);
//    }
//   },[success,setIsFileUploadModalOpen])

//   const checkFileAlreadyExits = (name) => {
    
//     const filePresent = userFiles
//       .filter((file) => file.data.parent === currentFolder)
//       .find((fldr) => fldr.data.name === name);
//     if (filePresent) {
//       return true;
//     } else {
//       return false;
//     }
//     // }
//   };
//   const handelSubmit = (e) => {
//     e.preventDefault();
//     if (file) {
      
//        if (!checkFileAlreadyExits(file.name)) {
//           const data = {
//             creatrdAt: new Date(),
//             name: file.name,
//             userId: user.uid,
//             creatrdBy: user.displayName,
//             path:
//               currentFolder === "root"
//                 ? []
//                 : [...currentFolderData?.data.path, currentFolder],
//             parent: currentFolder,
//             lastAccessed: null,
//             updatedAt: new Date(),
//             extension:file.name.split(".")[1],
//             data: null,
//             url: "",
//           };
//          console.log(data)
//          dispatch(uploadFile(file,data,setSuccess,setUploadProgress));
//         } else {
//           alert("file already present");
//         }
      
//     } else {
//       alert("File name cannot be empty");
//     }
//   };
//   return (
//     <div
//       className="col-md-12  position-fixed top-0 left-0 w-100 h-100"
//       style={{ background: "rgb(0,0,0,0.3)", zIndex: 9999 }}
//     >
//       <div className="row alignitems-center justify-content-center">
//         <div className="col-md-4 mt-5 bg-white rounded p-4">
//           <div className="d-flex justify-content-between">
//             <h4>Upload File</h4>
//             <button
//               className="btn"
//               onClick={() => setIsFileUploadModalOpen(false)}
//             >
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className="text-black"
//                 size="sm"
//               />
//             </button>
//           </div>
//           <hr />
//           <div className="d-flex flex-column align-item-center">
//             <form className="mt-3 w-100" onSubmit={handelSubmit}>
//               <div className="form-group">
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary mt-5 form-control"
//               >
//                 Upload File
//               </button>
//               {uploadProgress > 0 && uploadProgress < 100 && (
//             <div className="progress mt-3">
//               <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }} aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100">
//                 {uploadProgress}%
//               </div>
//             </div>
//           )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../redux/ActionCreators/fileFolderActionCreator";

export default function UploadFile({ setIsFileUploadModalOpen }) {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  useEffect(() => {
    if (success) {
      setFile("");
      setSuccess(false);
      setIsFileUploadModalOpen(false);
    }
  }, [success, setIsFileUploadModalOpen]);

  const checkFileAlreadyExists = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((fldr) => fldr.data.name === name);
    return !!filePresent; // Return true if file is present, otherwise false
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      if (!checkFileAlreadyExists(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          userId: user.uid,
          createdBy: user.displayName,
          path:
            currentFolder === "root"
              ? []
              : [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccessed: null,
          updatedAt: new Date(),
          extension: file.name.split(".")[1],
          data: null,
          url: "",
        };
        dispatch(uploadFile(file, data, setSuccess, setUploadProgress));
      } else {
        alert("File already present");
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
            <h4>Upload File</h4>
            <button
              className="btn"
              onClick={() => setIsFileUploadModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="text-black" size="sm" />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5 form-control">
                Upload File
              </button>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
