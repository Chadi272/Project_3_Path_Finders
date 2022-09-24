// const data = 'C:/Users/chadi/Desktop/Project 3/static/Resources/Extracts.json';
const data = './static/Extracts.json';
let start = 0;
let end = 121;
let year = 2022;
let factor = "guardian score / 100";

let radarLabels = [
    'guardian score / 100',
    'Satisfied with course',
    'Satisfied with teaching',
    'Satisfied with feedback',
    'Career After 15 months',
    'Continuation'
];

let uni1 = [];
let uni2 = [];

let radarData1 = [];
let radarData2 = [];

d3.json(data).then(function(data) {
    
    jsonData = data;

    var select = document.getElementById("selDataset");
    var options = Object.values(data.column);
    
    for(var i = 4; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    var select2 = document.getElementById("selDataset2");
    var options2 = Object.values(data.year);
    let uniqueItems = [...new Set(options2)];
    
    for(var f = 0; f < uniqueItems.length; f++) {
        var opt2 = uniqueItems[f];
        var el2 = document.createElement("option");
        el2.textContent = opt2;
        el2.value = opt2;
        select2.appendChild(el2);
    }

    var select3 = document.getElementById("selDataset3");
    var options3 = Object.values(data.institution).slice(0, 121);
    
    for(var j = 0; j < options3.length; j++) {
        var opt3 = options3[j];
        var el3 = document.createElement("option");
        el3.textContent = opt3;
        el3.value = opt3;
        select3.appendChild(el3);
    }

    var select4 = document.getElementById("selDataset4");
    for(var j = 0; j < options3.length; j++) {
        var opt3 = options3[j];
        var el3 = document.createElement("option");
        el3.textContent = opt3;
        el3.value = opt3;
        select4.appendChild(el3);
    }
    
    var firstUniKey = Object.keys(data.institution).find(key => data.institution[key] === uni1);
    var secUniKey = Object.keys(data.institution).find(key => data.institution[key] === uni2);
    let rdata = [];
    let rdata2 = [];

    for (i=0; i<radarLabels.length; i++) {
        rdata.push(Object.values(data[radarLabels[i]]));
        rdata2.push(Object.values(data[radarLabels[i]]));
    }
    for (i=0; i<rdata.length; i++) {
        radarData1.push(rdata[i][firstUniKey]);
        radarData2.push(rdata2[i][secUniKey]);
    }
    
    plotData = Object.values(data[factor]);
    createPlot(plotData, start, end);
    createRadar(radarData1, radarData2);
    return jsonData, plotData, uni1, uni2;
});

function optionChanged(value) {
    factor = value;
    console.log(value);
    plotData = Object.values(jsonData[value]);
    createPlot(plotData, start, end);
    return factor;
};

function optionChanged2(value) {

    year = value;

    if (value === "2022") {
        start = 0;
        end = 121;
    } 
    else if (value === "2021") {
        start = 121;
        end = 242;
    } 
    else if (value === "2020") {
        start = 242;
        end = 363;
    }
    else if (value === "2019") {
        start = 363;
        end = 484;
    }
    else if (value === "2018") {
        start = 484;
        end = 605;
    }
    else if (value === "2017") {
        start = 605;
        end = 724;
    }
    else if (value === "2016") {
        start = 724;
        end = 843;
    }
    else if (value === "2015") {
        start = 843;
        end = 959;
    }
    else if (value === "2014") {
        start = 959;
        end = 1078;
    }
    else if (value === "2013"){
        start = 1078;
        end = 1198;
    };

    console.log(start);
    console.log(end);
    createPlot(plotData, start, end);
    return start, end
};


function createPlot(plotData, start, end) {
    
    x_values = Object.values(jsonData.institution);
    y_values = plotData.slice(start, end);
    
    var trace0 = {
        x: x_values,
        y: y_values,
        xaxis: 'x1',
        yaxis: 'y1',
        title: factor + " " + year,
        type: 'bar',
        text: x_values
    };

    var trace1 = {
        x: x_values,
        y: Object.values(jsonData.rank).slice(start, end),
        xaxis: 'x2',
        yaxis: 'y2',
        title: "Rank " + year,
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: 5
        },
        text: x_values
    };

    let layout0 = {
        title: factor + " for year " + year,
        autosize: true,
        width: 1500,
        height: 500,
        showlegend: false,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        barmode: 'stack',
        xaxis: {
            categoryorder: 'total descending'
        }

    };

    let layout1 = {
        title: "University by rank for year " + year,
        autosize: true,
        width: 1500,
        height: 500,
        showlegend: false,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
        
    };

    var headers = Object.values(jsonData.column);
    let tableValues = [];
    for(var i = 0; i < headers.length; i++) {
        tableValues.push(Object.values(jsonData[headers[i]]).slice(start, end));
    };

    var table = {
        type: 'table',
        columnwidth: [1400, 1400, 1400, 5000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
        header: {
          values: headers,
          align: "center",
          line: {width: 1.5, color: '#FFFBF2'},
          fill: {color: '#33211D'},
          font: {family: "Arial", size: 11, color: "white"}
        },
        cells: {
          values: tableValues,
          align: "center",
          line: {color: "#33211D", width: 1},
          fill: {color: '#FFFBF2'},
          font: {family: "Arial", size: 10, color: ["black"]}
        },
        xaxis: 'x3',
        yaxis: 'y3',
    };

    let layout = {
        autosize: true,
        width: 1500,
        height: 500,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };

    let traceData = [table];

    let traceData0 = [trace0];
    let traceData1 = [trace1];

    Plotly.newPlot("bar", traceData0, layout0);
    Plotly.newPlot("scatter", traceData1, layout1);
    Plotly.newPlot("table", traceData, layout);
    
}

function optionChanged3(value) {
    uni1.splice(0);
    uni1.push(value);
    console.log(value);
    var firstUniKey = Object.keys(jsonData.institution).find(key => jsonData.institution[key] === value);
    console.log(firstUniKey);
    let data = []
    for (i=0; i<radarLabels.length; i++) {
        data.push(Object.values(jsonData[radarLabels[i]]));
    }
    radarData1.splice(0);
    for (i=0; i<data.length; i++) {
        radarData1.push(data[i][firstUniKey]);
    }

    createRadar(radarData1, radarData2);
    return uni1, radarData1
};

function optionChanged4(value) {
    uni2.splice(0);
    uni2.push(value);
    console.log(value);
    var secUniKey = Object.keys(jsonData.institution).find(key => jsonData.institution[key] === value);
    console.log(secUniKey);
    let data = []
    for (i=0; i<radarLabels.length; i++) {
        data.push(Object.values(jsonData[radarLabels[i]]));
    }
    radarData2.splice(0);
    for (i=0; i<data.length; i++) {
        radarData2.push(data[i][secUniKey]);
    }

    createRadar(radarData1, radarData2);
    return uni2, radarData2
};

function createRadar(radarData1, radarData2) {
    const data = {
        labels: radarLabels,
        datasets: [{
        label: uni1,
        data: radarData1,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
        label: uni2,
        data: radarData2,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };
    new Chart("radar", {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scale: {
                ticks: {
                    max: 100,
                    min: 0
                }
            }
        },
    });
}