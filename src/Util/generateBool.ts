 const generateBool = ():boolean => {
    const rand : number = Math.random();
    if (rand > 0.5){
        return true;
    }   else {
        return false;
    }
}

export default generateBool;

// done by now
