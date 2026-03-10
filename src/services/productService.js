import {
    addDoc,
    collection,
    query,
    updateDoc,
    getDocs,
    getDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import {
    deleteObject,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebaseConfig.js";
import * as Crypto from "expo-crypto";
import Toast from "react-native-toast-message";

const COLLECTION_NAME = process.env.EXPO_PUBLIC_COLLECTION_NAME;
export async function create(fullProductData) {
    const isLocalFile =
        fullProductData.imageUrl?.startsWith("file://") ||
        fullProductData.imageUrl?.includes("ph://") ||
        fullProductData.imageUrl?.includes("content://");

    if (isLocalFile) {
        const { imageUrl, ...productData } = fullProductData;

        const imageUrlFromStore = await uploadImage(imageUrl);

        const result = await addDoc(collection(db, COLLECTION_NAME), {
            ...productData,
            imageUrl: imageUrlFromStore,
        });

        return { id: result.id, ...productData, imageUrl: imageUrlFromStore };
    } else {
        const result = await addDoc(collection(db, COLLECTION_NAME), {
            ...fullProductData,
        });

        return { id: result.id, ...fullProductData };
    }
}

const productsRef = collection(db, COLLECTION_NAME);
export async function getProductsByCategory(categoryId) {
    const q = query(productsRef, where("categoryId", "==", categoryId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function getAll() {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        
        throw error;
    }
}

export async function update(productId, updateData) {
    try {
        const docRef = doc(db, COLLECTION_NAME, productId);

        const oldProduct = await getDoc(docRef);
        const oldData = oldProduct.data();
        const oldImageUrl = oldData?.imageUrl;
        const createdAt = oldData?.created_at;

        let newImageUrl = updateData.imageUrl;

        const isLocalFile =
            updateData.imageUrl?.startsWith("file://") ||
            updateData.imageUrl?.includes("ph://") ||
            updateData.imageUrl?.includes("content://");
        if (oldImageUrl?.includes("firebasestorage")) {
            
               
                const oldImageRef = ref(storage, oldImageUrl);
                await deleteObject(oldImageRef);
          
        }

        if (isLocalFile) {
         
            try{
                newImageUrl = await uploadImage(updateData.imageUrl);
            }catch(err){
                Toast.show({ type: 'error', text1: 'Failed to upload image' });
            }
           
        }

        const updatedProduct = {
            ...updateData,
            imageUrl: newImageUrl,
            id:productId,
            created_at: createdAt,
           
        };
       
        await updateDoc(docRef, updatedProduct);

        return updatedProduct
        
    } catch (error) {
        throw error;
    }
}

export async function deleteProduct(productId, imageUrl) {
    try {
        const docRef = doc(db, COLLECTION_NAME, productId);
        await deleteDoc(docRef);

        if (imageUrl?.includes("firebasestorage")) {
            
               
                try{
                    const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
                }catch{
                    Toast.show({type:'error',text1:'Failedto delete Image'})
                }
           
        }

        return { success: true, id: productId };
    } catch (error) {
        throw error;
    }
}

async function uploadImage(localUri) {
    const response = await fetch(localUri);
    const imageBlob = await response.blob();

    const imageRef = ref(storage, `products/${Crypto.randomUUID()}.jpg`);
    await uploadBytes(imageRef, imageBlob);
    return await getDownloadURL(imageRef);
}
