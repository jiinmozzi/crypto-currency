import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../Firebase/service";

// type userParam = {
//     userId : string, 
// }
type User = {
    assets? : object[],
    cash? : number,
    email? : string,
    uid? : string,
}
const getUser = async(uid : string): Promise<any>  => {
    
    const userRef = doc(db, "users", uid);
    console.log(userRef);
    const user = await getDoc(userRef);
     
    console.log(user.data());
    // console.log(uid)
    // const q = query(collection(db, "users"), where("uid", "==", uid));
    // const users = await getDocs(q);
    // console.log(users)
    // console.log(users.docs[0].id)
    // const userRef = doc(db, "users", users.docs[0].id);
    
    // const userObj = (await getDoc(userRef)).data();
    
    // const user = userObj;
    
    return {user : user.data(), userRefId : userRef.id};
}


export default getUser;

// done by now; 
// 