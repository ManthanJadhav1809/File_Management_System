import * as types from "../ActionTypes/fileFolderActionTypes";
const initialState = {
  isLoading: true,
  currentFolder: "root",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const fileFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };
    case types.ADD_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };

    // for file
    case types.CREATE_FILES:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };
    case types.ADD_FILE:
      return {
        ...state,
        userFiles: action.payload,
      };
      case types.SET_FILE_DATA:
        const {fileId,data}=action.payload;
        const allFiles=state.userFiles;
        const currrentFile=allFiles.find((file)=>file.docId===fileId);
        currrentFile.data.data=data;
        return{
          ...state,
          userFiles:state.userFiles.map((file)=>file.docId===fileId ?currrentFile:file),
        }
       case types.DELETE_FILE:
        const updatedFiles = state.userFiles.filter(
          (file) => file.docId !== action.payload
        );
        return{
          ...state,
          userFiles: updatedFiles,
        } 
         
    default:
      return state;
  }
};

export default fileFolderReducer;
