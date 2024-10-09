const nav = 
{
    "name": "Graphics",
    "tab": "graphics",
    "buttons": [
        "./barChart",
        "./boxPlot",
        "./contourPlot",
        "./twoDContourplot",
        {
            "name": "Distribution",
            "icon": "icon-gaussian-function",
            "children": [
                "./density",
                "./histogram",
                "./ppPlots",
                "./qqPlots"
            ]
        },
        "./heatMap",
        {
            "name": "Line Charts",
            "icon": "icon-chart-line-solid",
            "children": [
                "./frequencyFactor",
                "./lineChart",
                "./plotOfMeans",
                "./threeAxisLineChart"
            ]
        },
        {
            "name": "Maps",
            "icon": "icon-earth",
            "children": [
                "./usCountyMap",
                "./usStateMap",
                "./worldMap"
            ]
        },
        {
            "name": "Pie Charts",
            "icon": "icon-chart-pie-solid",
            "children": [
                "./coxComb",
                "./pieChart"
            ]
        },
        {
            "name": "Scatter Plot",
            "icon": "icon-scatter_plot",
            "children": [
                "./scatterPlot",
                "./scatterPlotMatrix",
            ]
        },
        
        "./stemAndLeaf",
        "./stripChart",
        "./violinPlot"
    ]
}

module.exports.nav = nav
