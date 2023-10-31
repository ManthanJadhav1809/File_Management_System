import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Showitem.css";
import { faFileAlt, faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { chageFolder, deleteFolders } from "../../redux/ActionCreators/fileFolderActionCreator";

export default function Showitem({ title, items, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelDoubelClick = (itemId) => {
    if (type === "folder") {
      dispatch(chageFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };


  // const {docId}=useSelector((state)=>({
  //   docId:state.filefolders.userFolders
  // }),shallowEqual)

  const deleteFolder = (docId)=>{

    if(window.confirm("Are you want to delete this folder")){
      dispatch(deleteFolders(docId));
      // alert("Folder deleted successfully");
    }
      
      
  }

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom">{ title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          return (
            <p
              key={index * 55}
              className="col-md-2 py-2 d-flex flex-column p-2 text-center border position-relative"
              onDoubleClick={() => handelDoubelClick(item.docId)}
            >
              { type === "folder" ? (
                <>
                  <div className="d-flex align-items-start">
                    <button className="btn btn-danger btn-sm rounded-circle me-2"
                     onClick={()=>deleteFolder(item.docId)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                    <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
                  </div>
                </>
              ) : (
                <FontAwesomeIcon icon={faFileAlt} size="4x" />
              )}
              {item.data.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}
