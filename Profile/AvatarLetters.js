



export default function getCapitalLetters (username) {

    let newStr = "";
    for (let i = 0; i < username.length; i++) {
        if (username[i].match(/[A-Z]/)) {
            newStr += username[i];
        }
    }
    if(newStr.length===0){
        return "US";
    }
    return newStr;
}
