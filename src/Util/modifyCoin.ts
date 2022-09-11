import generateBool from "./generateBool";
import generateRandomNumber from "./generateRandomNumber";

type Coin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}
const modifyCoin = (coin : Coin):Coin => {
    const modifiedPrice = generateRandomNumber(coin.quotes.KRW.price);
    const coinObj:Coin = {
        ...coin,
        quotes : {
            KRW : {
                price : modifiedPrice
            }
        }
    }
    return coinObj;
}
export default modifyCoin;

// done by now
