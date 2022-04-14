import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import firestoneInstance from "../config/firebase.config";

const { REACT_APP_FIREBASE_COLLECTION_NAME: FIREBASE_COLLECTION_NAME } =
  process.env;

class FirebaseService {
  db;
  constructor(firestoneInstanceReference) {
    this.db = firestoneInstanceReference;
  }

  async getAllParticipations() {
    try {
      const querySnapshot = await getDocs(
        collection(this.db, FIREBASE_COLLECTION_NAME)
      );

      return querySnapshot?.docs?.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error(e.message);
    }
  }

  async createParticipation(participationBody) {
    try {
      await addDoc(
        collection(this.db, FIREBASE_COLLECTION_NAME),
        participationBody
      );
    } catch (e) {
      console.error(e.message);
    }
  }

  async updateParticipation(participationId, participationBody) {
    try {
      await updateDoc(
        doc(this.db, FIREBASE_COLLECTION_NAME, participationId),
        participationBody
      );
    } catch (e) {
      console.error(e.message);
    }
  }

  async deleteParticipation(participationId) {
    try {
      await deleteDoc(
        doc(
          this.db,
          process.env.REACT_APP_FIREBASE_COLLECTION_NAME,
          participationId
        )
      );
    } catch (e) {
      console.error(e.message);
    }
  }
}

export default new FirebaseService(firestoneInstance);
