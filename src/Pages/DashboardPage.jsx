import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavbarDash from "../Components/DashboardComponents/NavbarDash";
import SubBar from "../Components/DashboardComponents/SubBar/SubBar";
import HomeComponent from "../Components/DashboardComponents/HomeComponent";
import CreateFolder from "../Components/DashboardComponents/CreateFolder";
import { getFiles, getFolders } from "../redux/ActionCreators/fileFolderActionCreator";
import FolderComponent from "../Components/DashboardComponents/FolderComponent";
import CreateFile from "../Components/DashboardComponents/CreateFile";
import FileComponent from "../Components/DashboardComponents/FileComponent/FileComponent";
import UploadFile from "../Components/DashboardComponents/UploadFile";

export default function DashboardPage() {
  
  const {isLoggedIn,isLoading,userId} = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.filefolders.isLoading,
      userId:state.auth.user.uid,
    }),
    shallowEqual
    
  );
  const navigate = useNavigate();
 const dispatch=useDispatch();

  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

  const [showSubBar,setShowSubBar]=useState(true);
 const {pathname}=useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if(isLoading && userId){
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading,userId,dispatch]);

  useEffect(()=>{
     if(pathname.includes("/file/")){
      
      setShowSubBar(false);
     }
     
  },[pathname])
  return (
    <>
      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}
      {isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} />
      )}
      <NavbarDash></NavbarDash>
      {
        showSubBar
        &&(
          <SubBar 
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          setIsCreateFileModalOpen={setIsCreateFileModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
          ></SubBar>
        )
      }
      
      <Routes>
        <Route path="" element={<HomeComponent/>}></Route>
        <Route path="/folder/:folderId" element={<FolderComponent/>}></Route>
        <Route path="/file/:fileId" element={<FileComponent/>}></Route>
      </Routes>
    </>
  );
}
