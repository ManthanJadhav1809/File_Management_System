import { toast } from "react-toastify";
import fire from "../../config/firebase";
import * as types from "../ActionTypes/fileFolderActionTypes";

//Action
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// Files
const addFiles = (payload) => ({
  type: types.ADD_FILE,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILES,
  payload,
});

// const deleteFile = (payload) => ({
//   type: types.DELETE_FILE,
//   payload,
// });

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

const Delete=(payload)=>({
  type:types.DELETE_FILE,
  payload,
})

const DeleteFolder=(payload)=>({
  type:types.DELETE_FOLDER,
  payload,
})


// Action creators
export const creatFolder = (data) => (dispatch) => {
  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
      toast.success('folder created sucessfully',{
        position:'top-right',
      })
      
    });
};

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(addFolders(foldersData));
      dispatch(setLoading(false));
    });
};

export const chageFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// For file
export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      dispatch(addFiles(filesData));
      // dispatch(setLoading(false));
    });
};

export const createFile = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
      dispatch(setLoading(true));
      toast.success('File created sucessfully',{
        position:'top-right',
      })
      // alert("File created Successfully");
    })
    .catch((e) => {
      console.log(e);
      setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success('File saved sucessfully',{
        position:'top-right',
      })
      
    })
    .catch(() => {
      toast.error('Something went wrong',{
        position:'top-right',
      })
     
    });
};

export const uploadFile = (file, data, setSuccess,setUploadProgress) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

  uploadFileRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress)
      setUploadProgress(progress);
    },
    (error) => {
      console.log(error);
      setUploadProgress(0);
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = { ...data, url: fileUrl };
      fire
        .firestore()
        .collection("files")
        .add(fullData)
        .then(async (file) => {
          const fileData = await (await file.get()).data();
          const fileId = file.id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          toast.success('File uploaded sucessfully',{
            position:'top-right',
          })
          
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};

export const deleteFile = (fileId) => async (dispatch) => {
  try {
    await fire.firestore().collection("files").doc(fileId).delete();
    dispatch(DeleteFolder(fileId));
    dispatch(setLoading(true));
    
  } catch (error) {
    toast.error('Error while deleting file',{
      position:'top-right',
    })
    
     }
};

export const deleteFolders = (docId) => async (dispatch) => {
  try {
    await fire.firestore().collection("folders").doc(docId).delete();
    dispatch(Delete(docId));
    dispatch(setLoading(true));
    toast.success('File Deleted sucessfully',{
      position:'top-right',
    })
  } catch (error) {
    console.error("Error deleting file:", error);
     }
};

