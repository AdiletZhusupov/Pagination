// Variables
const endpoint = "https://rickandmortyapi.com/api/character?page=";
const tableBody = document.querySelector(".table-body");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const btnLeft = document.querySelector("#btn-left");
const btnMiddle = document.querySelector("#btn-middle");
const btnRight = document.querySelector("#btn-right");


// Controlling Pages and Buttons
let pageNumber = 1;
let maxNumPages;
btnPrev.disabled = true;
btnNext.disabled = false;


btnLeft.innerText = pageNumber;
btnMiddle.innerText = pageNumber+1;
btnRight.innerText = pageNumber+2;


// Functions

const fetchApi = async (url) => {
    try{
        const resp = await fetch(url);
        const data = await resp.json();
        maxNumPages = data.info.pages;
        return data.results;
    }catch(error){
        console.error(`Something went wrong! ${error}`)
    }
}

const renderData = (data) => {
    data.forEach((item) => {
        createElement(item);
    })
}

const createElement = (item) => {
    const tableRow = document.createElement("tr");
    const tableCellId = document.createElement("td");
    tableCellId.innerText = item.id;
    const tableCellFullName = document.createElement("td");
    const tableCellGender = document.createElement("td");
    tableCellGender.innerText = item.gender;
    const tableCellLocation = document.createElement("td");
    tableCellLocation.innerText = item.location.name;

    const tableLink = document.createElement("a");
    tableLink.href = item.image;
    tableLink.innerText = item.name;
    tableCellFullName.append(tableLink);


    tableRow.append(tableCellId, tableCellFullName, tableCellGender, tableCellLocation);
    tableBody.append(tableRow);
}

const enableDisableBtn = () => {
    if(pageNumber === maxNumPages){
        btnNext.disabled = true;
        btnNext.classList.add("btn-disabled");
    }else{
        btnNext.disabled = false;
        btnNext.classList.remove("btn-disabled");
    }

    if(pageNumber === 1){
        btnPrev.disabled = true;
        btnPrev.classList.add("btn-disabled");
    }else{
        btnPrev.disabled = false;
        btnPrev.classList.remove("btn-disabled");
    }
}

const changeBtnNumsForward = () => {
    const btnActive = document.querySelector(".active");

    if(btnLeft === btnActive){
        btnLeft.innerText = pageNumber;
        btnMiddle.innerText = pageNumber+1;
        btnRight.innerText = pageNumber+2;
    }
    if(btnRight === btnActive){
        btnRight.innerText = pageNumber;
        btnMiddle.innerText = pageNumber-1;
        btnLeft.innerText = pageNumber-2;
    }

}
const changeBtnNumsBackward = () => {
    const btnActive = document.querySelector(".active");

    if(btnRight === btnActive){
        btnRight.innerText = pageNumber;
        btnMiddle.innerText = pageNumber-1;
        btnLeft.innerText = pageNumber-2;
    }

}

// Fetching API

fetchApi(endpoint + pageNumber).then((data)=>{
    renderData(data)
});


// Event Listeners
btnNext.addEventListener("click", () => {
    tableBody.innerHTML = "";
    pageNumber += 1;
    fetchApi(endpoint + pageNumber).then((data)=>{
        renderData(data);
    });
    enableDisableBtn();
    
    // think about this part
    const btnActive = document.querySelector(".active");
    if(btnActive.nextElementSibling){
        btnActive.nextElementSibling.classList.add("active");
        btnActive.classList.remove("active");
    }else{
        btnActive.previousElementSibling.previousElementSibling.classList.add("active");
        btnActive.classList.remove("active");
    }
    changeBtnNumsForward();

});

btnPrev.addEventListener("click", () => {
    tableBody.innerHTML = "";
    pageNumber -= 1;
    fetchApi(endpoint + pageNumber).then((data)=>{
        renderData(data);
    });
    enableDisableBtn();


    // think about this part
    const btnActive = document.querySelector(".active");
    if(btnActive.previousElementSibling){
        btnActive.previousElementSibling.classList.add("active");
        btnActive.classList.remove("active");
    }else{
        btnActive.nextElementSibling.nextElementSibling.classList.add("active");
        btnActive.classList.remove("active");
    }
    changeBtnNumsBackward();

});

btnLeft.addEventListener("click",()=>{
    tableBody.innerHTML = "";
    pageNumber = Number(btnLeft.innerText);
    const btnActive = document.querySelector(".active");
    btnActive.classList.remove("active");
    btnLeft.classList.add("active");
    fetchApi(endpoint + btnLeft.innerText).then((data)=>{
        renderData(data);
    });
    enableDisableBtn();
});
btnMiddle.addEventListener("click",()=>{
    tableBody.innerHTML = "";
    pageNumber = Number(btnMiddle.innerText);
    const btnActive = document.querySelector(".active");
    btnActive.classList.remove("active");
    btnMiddle.classList.add("active");
    fetchApi(endpoint + btnMiddle.innerText).then((data)=>{
        renderData(data);
    });
    enableDisableBtn();
});
btnRight.addEventListener("click",()=>{
    tableBody.innerHTML = "";
    pageNumber = Number(btnRight.innerText);
    const btnActive = document.querySelector(".active");
    btnActive.classList.remove("active");
    btnRight.classList.add("active");
    fetchApi(endpoint + btnRight.innerText).then((data)=>{
        renderData(data);
    });
    enableDisableBtn();
});
