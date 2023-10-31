import fire from "../../config/firebase";
import * as types from "../ActionTypes/authactionTypes";

const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const logOutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

// const registerUser=(payload)=>{
//     return{
//      type:types.REGISTER_USER,
//      payload
//     }
//  }

// action creator
export const signInUser = (email, password, setSucess) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        loginUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
      setSucess(true);
    })
    .catch((err) => {
      alert("Invalid email or password");
      console.log(err);
    });
};

export const signUpUser = (name, email, password, setSucess) => (dispatch) => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      fire
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(async () => {
          const currentUser = await fire.auth().currentUser;
          dispatch(
            loginUser({
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
            })
          );
          setSucess(true);
          console.log(currentUser.user);
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => {
      if (e.code == "auth/email-already-in-use") {
        alert("Email already in use");
      }
      if (e.code == "auth/invalid-e-email") {
        alert("Invalid email");
      }
    });
};

export const SignOutUser = () => (dispatch) => {
   fire.auth().signOut().then(()=>{
    dispatch(logOutUser());
   })
    
};


export const checkIsLoggedIn=()=>dispatch=>{
    fire.auth().onAuthStateChanged(user=>{
        if(user){
            dispatch(loginUser({
                uid:user.uid,
                email:user.email,
                displayName:user.displayName,
            }))
        }
    })
}