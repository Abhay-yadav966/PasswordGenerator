const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#ccc");
inputSlider.value = passwordLength;
lengthDisplay.innerText = passwordLength;

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return (Math.floor(Math.random()*(max-min)))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    return symbols.charAt(getRndInteger(0,symbols.length));
}

function calcStrength(){
    let numChk;
    let upperChk;
    let lowerChk;
    let symbolChk;
    if (uppercaseCheck.checked) {
        upperChk=true;
    }
    if (lowercaseCheck.checked) {
        lowerChk=true;
    }
    if (numbersCheck.checked) {
        numChk=true;
    }
    if (symbolsCheck.checked) {
        symbolChk=true;
    }
    if(upperChk && lowerChk && (symbolChk||numChk) && passwordLength >= 8 )
    {
        setIndicator('#0f0')
    }
    else if ( (upperChk || lowerChk) && (symbolChk||numChk) && passwordLength > 6 && passwordLength < 8 )
    {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText='Copied';
    }
    catch(e){
        copyMsg.innerText='Failed';
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

inputSlider.addEventListener('input', (e)=> {
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

function handleCheckCount() {
    checkCount=0;
    allCheckBox.forEach((checkBox)=>{
        if(checkBox.checked){
            checkCount++;
        }
    })

    if(checkCount>passwordLength){
        passwordLength=checkCount;
        handleSlider();
    }
}


allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change', handleCheckCount);
})

function shufflePassword(arr){
    for(let i = arr.length-1 ; i>=0 ; i-- ){
            let j = Math.floor(Math.random()*(i+1))
            let temp = arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
    }
    let tempPassword = "";
    arr.forEach((i)=>{
        tempPassword+=i;
    })
    return tempPassword;
}
generateBtn.addEventListener('click', ()=>{
    if (checkCount==0) {
        return
    }

    if (checkCount>passwordLength)
    {
        passwordLength=checkCount;
        handleSlider();
    }
    console.log("Starting the Journey");
    password = "" 
    let funcArr= [];
    if (uppercaseCheck.checked){
        funcArr.push(generateUpperCase);        
    }

    if (lowercaseCheck.checked){
        funcArr.push(generateLowerCase);        
    }
    if (numbersCheck.checked){
        funcArr.push(generateRandomNumber);        
    }
    if (symbolsCheck.checked){
        funcArr.push(generateSymbol);        
    }
    console.log("Array generated");
    for (let i = 0; i < funcArr.length; i++) {
        password+=funcArr[i]();
    }
    console.log("Compulsory Addition done");
    for (let i = 0; i < passwordLength-checkCount; i++) {
        let rndInt = getRndInteger(0,funcArr.length);
        password+=funcArr[rndInt]();
    }
    console.log("Remaining Addition done");
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    passwordDisplay.value=password;
    console.log("UI display done");
    calcStrength();
})


