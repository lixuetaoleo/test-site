// 设置图片切换
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/firefox/files/2017/12/firefox-logo-300x310.png'){
        myImage.setAttribute('src', 'https://img.icons8.com/plasticine/2x/chrome.png');
    }else{
        myImage.setAttribute('src', 'https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/firefox/files/2017/12/firefox-logo-300x310.png');
    }
};

// 设置个性化欢迎信息
// 获取新按钮和标题的引用
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

// 个性化欢迎信息设置函数
function setUserName(){
    let myName = prompt("input your name");
    if(!myName || myName === null){
        setUserName();
    }
    else{
        localStorage.setItem('name', myName);
        myHeading.textContent = "Mozilla is fucking cool " + myName;
    }
}

// 初始化代码：在页面初次读取时进行构造工作：
if(!localStorage.getItem('name')){
    setUserName();
}else{
    let storedName = localStorage.getItem('name');
    myHeading.textContent = "Mozilla is fucking cool " + storedName;
}

// 为按钮设置 onclick 事件处理器：
myButton.onclick = function(){
    setUserName();
};

// 