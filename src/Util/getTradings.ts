import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../Firebase/service";

const getTradings = async(uid : string) => {
    const q = query(collection(db, "tradings"), where("uid", "==", uid))
    const tradings = await getDocs(q);
    const tradingDocs = tradings.docs;
    const result:any = [];
    tradingDocs.forEach(e => result.push(e.data()));
    return result;
}
export default getTradings;