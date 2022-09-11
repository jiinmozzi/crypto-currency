import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../Firebase/service";

const getUndoneTradings = async(uid : string) => {
    const q = query(collection(db, "undoneTradings"), where("uid", "==", uid))
    const tradings = await getDocs(q);
    const tradingDocs = tradings.docs;
    const result:any = [];
    tradingDocs.forEach(e => result.push(e.data()));
    return result;
}
export default getUndoneTradings;