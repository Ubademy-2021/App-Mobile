



export default function getCapitalLetters (username) {
    if(username === undefined){
        return "UN";
    }
    let newStr = "";
    for (let i = 0; i < username.length; i++) {
        if (username[i].match(/[A-Z]/)) {
            newStr += username[i];
        }
    }
    if(newStr.length===0){
        return username.substring(0,2).toUpperCase();
    }
    return newStr;
}
