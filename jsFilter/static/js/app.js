// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select table body
var tbody = d3.select("tbody");

//select the dropdown menu for shape
var shapeDropDown = d3.select("#shape-dropdown");

//generate a unique list of shapes for dropdown menus for users to select
var shapeList = [...new Set(tableData.map(entry => entry.shape))];
//empty string means select all shapes
shapeList.push("");
//console.log(shapeList);

//append the options to the dropdown lists
shapeList.forEach(shape => {let option=shapeDropDown.append("option"); option.text(shape)});

//select filter and select button
var filterBtn = d3.select("#filter-btn");
var resetBtn = d3.select("#reset-btn");

//function used to fill table
function fillTable(dataTable){
    dataTable.forEach(entry => 
        {let row = tbody.append("tr");
            Object.entries(entry).forEach(
                ([key,value]) =>{
                    let cell = row.append("td");
                    cell.text(value)
                });
        });
}


// function which display default(unfiltered) data when "reset" button is clicked
function resetTable(){
    d3.event.preventDefault();
    //remove table contents first
    tbody.selectAll("tr").remove();
    //reset table with default(unfiltered) data
    fillTable(tableData);
};

// function used to filter data, dataEntry=entries of data from data.js, e.g. 'datetime','city'. While userInput=user input on the corresponding forms, 
// if user input is empty, then nothing is filtered, otherwise we filter according to user input
function checkContent(dataEntry,userInput){
    if (userInput === ""){
        return true
    }else{
        return dataEntry === userInput
    }
}

//function which filter table data by criterion
function filterTable(){
    //same as resetTable, when filter button is clicked, prevent page from refresh and clean up table content
    d3.event.preventDefault();
    tbody.selectAll("tr").remove();

    //get input values for filters
    let dateInputValue = d3.select("#datetime").property("value");
    let cityInputValue = d3.select("#city").property("value");
    let stateInputValue = d3.select("#state").property("value");
    let countryInputValue = d3.select("#country").property("value");
    let shapeInputValue = shapeDropDown.property("value");
    //node().value;
    //
    
    
    filteredTableData = tableData.filter(
        entry => ( checkContent(entry['datetime'], dateInputValue) &&
                   checkContent(entry['city'], cityInputValue) && 
                   checkContent(entry['state'], stateInputValue) &&
                   checkContent(entry['country'], countryInputValue) &&
                   checkContent(entry['shape'], shapeInputValue)
        ));
    console.log(filteredTableData);

    fillTable(filteredTableData);

};


resetBtn.on("click", resetTable);
filterBtn.on("click", filterTable);

