var fileInput = document.getElementById("databaseCSV");
const batchYearBox = document.querySelector(".batchField");

const processData = (results, batchYear) => {
  // console.log(batchYear);
  let outerObj = new Object();
  outerObj.batchId = "batch" + batchYear;
  let resultArr = results.data;
  outerObj.content = resultArr;
  // console.log(outerObj);
  axios.post('/updateDatabase', outerObj, {
    headers:{
        updateDatabase: true,
    }
  }).then((res)=>{
    console.log(res);
  })
};

async function convertToJson(){
    let jsonData = await csvtojson({
    "selector": "databaseCSV",
    "delimiter": ","
    });
    const batchYear = batchYearBox.value;
    processData(jsonData, batchYear);
}

fileInput.addEventListener("change", function (event) {
    convertToJson();
});
