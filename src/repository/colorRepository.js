import {db} from "./init"
import {addDoc, collection, deleteDoc, doc, getDocs} from 'firebase/firestore/lite';

const COLOR_COLLECTION_NAME = "colors"
const collectionRef = collection(db, COLOR_COLLECTION_NAME)


class ColorRepository {

    constructor(collection) {
        this.collection = collection
    }

    async getAllColors() {
        const colors = []
        await getDocs(collectionRef)
            .then(querySnapshot => querySnapshot.forEach(doc => colors.push({id: doc.id, ...doc.data()})))
        return colors
    }


    async addColor(color) {
        try {
            await addDoc(this.collection, color)
        } catch (e) {
            console.log("Error while adding document ", e)
        }
    }

    async deleteColor(color) {
        const ref = doc(db, COLOR_COLLECTION_NAME, color.id)
        await deleteDoc(ref)
    }

}

export const colorsRepository = new ColorRepository(collectionRef)
