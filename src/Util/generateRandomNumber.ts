import generateBool from "./generateBool";
const generateRandomNumber = (price : number ):number => {
    const rand = Math.random() * 0.005;
    const bool = generateBool();
    const willChange = generateBool();

    let changedPrice;

    if ( bool === true && willChange === true ){
        changedPrice = price * (1 + rand);
        changedPrice = Number(changedPrice.toFixed(2));
    }   else if (bool === false && willChange === true){
        changedPrice = price * (1 - rand);
        changedPrice = Number(changedPrice.toFixed(2));
    }   else {
        return price;    
    }
    return changedPrice;
}
export default generateRandomNumber;

// done by now
