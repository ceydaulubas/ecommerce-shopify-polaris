import firebase from "../firebase";

export const FirebaseFactory = () => ({
    signUp: async (values:any) => {
        return await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
    },
    signIn: async (values:any) => {
        return await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
    },

    signOut: async () => {
        return await firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('User Logged Out!');
          }).catch(function(error) {
            // An error happened.
            console.log(error);
          });
    },
});
