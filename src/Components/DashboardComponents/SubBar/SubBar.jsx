import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFileUpload,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./SubBar.css";
import {  useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { chageFolder } from "../../../redux/ActionCreators/fileFolderActionCreator";

export default function SubBar({setShowSubBar, setIsCreateFolderModalOpen,setIsFileUploadModalOpen,setIsCreateFileModalOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
      userFolders: state.filefolders.userFolders,
    }),
    shallowEqual
  );


  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(chageFolder(id));
  };

  

  return (
    <nav className="navbar py-2 px-5 navbar-expand-lg mt-2 py-2 navbar-light bg-white">
      <nav className="ms-5" aria-label="breadcrumb">
        <ol class="breadcrumb d-flex align-item-center">
          {currentFolder !== "root" ? (
            <>
              <button
                onClick={() => handleNavigate("/dashboard", "root")}
                className="breadcrumb-item btn btn_link text-decoration-none"
              >
                Root
              </button>
              {currentFolderData?.data.path.map((folder, index) => (
                <button
                  key={index}
                  className="breadcrumb-item btn btn_link text-decoration-none"
                  onClick={() =>
                    handleNavigate(
                      `/dashboard/folder/${
                        userFolders.find((fldr) => folder === fldr.docId).docId
                      }`,
                      userFolders.find((fldr) => folder === fldr.docId).docId
                    )
                  }
                >
                  {userFolders.find((fldr) => folder === fldr.docId).data.name}
                </button>
              ))}
              <li className="breadcrumb-item active text-center">
                {currentFolderData?.data.name}
              </li>
            </>
          ) : (
            <>
              <li className="breadcrumb-item active">Root</li>
            </>
          )}
        </ol>
      </nav>
      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item ms-2">
          <button className="btn btn-outline-dark"
           onClick={()=>setIsFileUploadModalOpen(true)}
          >
            <i class="fa-solid fa-upload"></i>
            <FontAwesomeIcon icon={faFileUpload} />
            &nbsp; Upload File
          </button>
        </li>
        <li className="nav-item ms-2">
          <button className="btn btn-outline-dark"
          onClick={() => setIsCreateFileModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFileAlt} />
            &nbsp; Create File
          </button>
        </li>
        <li className="nav-item ms-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFolderPlus} />
            &nbsp; Create Folder
          </button>
        </li>
      </ul>
    </nav>
  );
}
