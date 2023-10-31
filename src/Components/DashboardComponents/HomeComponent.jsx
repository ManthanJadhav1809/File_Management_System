import React from "react";
import Showitem from "../ShowItems/Showitem";
import { shallowEqual, useSelector } from "react-redux";

export default function HomeComponent() {

  const { isLoading, userFolders,userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders.filter(folder=>folder.data.parent==="root"),
      userFiles:state.filefolders.userFiles.filter(
        (file)=>file.data.parent==="root"
      )
    }),
    shallowEqual
  );

  return (
    <div className="col-md-12">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (
        <>
          <Showitem
            title={"Created Folder"}
            type={"folder"}
            items={userFolders}
          ></Showitem>
          <Showitem
            title={"Created Files"}
            type={"file"}
            items={userFiles.filter(file=>file.data.url===null)}
          ></Showitem>
          <Showitem
            title={"Uploaded Files"}
            type={"file"}
            items={userFiles.filter(file=>file.data.data===null)}
          ></Showitem>
        </>
      )}
    </div>
  );
}
