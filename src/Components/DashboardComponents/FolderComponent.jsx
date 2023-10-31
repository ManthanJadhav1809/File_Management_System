import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Showitem from "../ShowItems/Showitem";

export default function FolderComponent() {
  const { folderId } = useParams();
  const { currentFolderData, childFolders,childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles:state.filefolders.userFiles.filter(
        (file)=>file.data.parent===folderId
      ),
    }),

    shallowEqual
  );

  const createdFiles=childFiles&& childFiles.filter((file)=>file.data.url === null)
  const uploadedFiles=childFiles&& childFiles.filter((file)=>file.data.data === null)

  return (
    <div>
      {childFolders.length > 0 ? (
        <>
          {childFolders.length>0&&(
               <Showitem
               title={"Created Folder"}
               type={"folder"}
               items={childFolders}
             ></Showitem>
          )}
          {
            createdFiles && createdFiles.length>0 &&(
              <Showitem
              title={"Created Files"}
              type={"file"}
              items={createdFiles}
            ></Showitem>
            )
          }
          {
            uploadedFiles&& uploadedFiles.length>0 &&(
              <Showitem
              title={"Uploded Files"}
              type={"file"}
              items={uploadedFiles}
            ></Showitem>
            )
          }
        </>
      ) : (
        <h1 className="text-center"> Empty Folder</h1>
      )}
    </div>
  );
}
