const nav = 
{
    "name": "Graphics",
    "tab": "graphics",
    "buttons": [
        "./barChartModal",
        "./boxPlot",
        "./Contour",
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
                "./lineChartModal",
                "./plotOfMeans",
                "./threeAxisLineChartModal"
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
                "./Coxcomb",
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
