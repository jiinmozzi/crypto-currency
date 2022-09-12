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
    const user = await getDoc(userRef);
    
    return {user : user.data(), userRefId : userRef.id};
}


export default getUser;

// done by now; 
// 