/*import Firebase from './config/firebase'
import 'firebase/firestore'
import 'firebase/firebase-storage'
const db = Firebase.firestore()
// chatsRef = db.collection('chats')


export const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {

    const fileRef = Firebase.storage().ref().child(path)

    fetch(media)
        .then(response => response.blob())
        .then(blob => fileRef.put(blob))
        .then(task => task.ref.getDownloadURL())
        .then(downloadUrl => resolve(downloadUrl))
        .catch(() => reject())
})*/