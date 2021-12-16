/*import Firebase from './config/firebase'
import 'firebase/firestore'
const db = Firebase.firestore()
import {saveMediaToStorage} from './FirebaseVideo'
// chatsRef = db.collection('chats')
import uuid from 'uuid-random'


export const createPost = (video) => new Promise((resolve, reject) => {
    saveMediaToStorage(video,`post/${uuid()}`).then((downloadUrl) => {
        db.collection('post').add({
            downloadUrl,
            creation: Firebase.firestore.FieldValue.serverTimestamp()

        }).then(() => resolve())
            .catch(() => reject())
    })
})*/