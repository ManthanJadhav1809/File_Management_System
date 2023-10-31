import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Showitem.css";
import { faFileAlt, faFolder } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chageFolder } from "../../redux/ActionCreators/fileFolderActionCreator";

export default function Showitem({ title, items, type }) {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handelDoubelClick=(itemId)=>{
        if(type==="folder"){
            dispatch(chageFolder(itemId))
            navigate(`/dashboard/folder/${itemId}`);
        }
        else{
            navigate(`/dashboard/file/${itemId}`)
        }
    }
  
    return (
    <div className="w-100">
      <h4 className="text-center border-bottom">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap ">
        { items.map((item, index) => {
          return (
            <p
              key={index * 55}
              className="col-md-2 py-3 d-flex flex-column p-5 text-center border"
             onDoubleClick={()=>handelDoubelClick(item.docId)}
            >
              {type === "folder" ? (
                <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
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
