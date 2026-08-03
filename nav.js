/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const nav = {
    "id": "menu-graphics",
    "buttons": [
        "./barChartModal",

        {
            "id": "menu-graphics-box-plots",
            "icon": "icon-scatter_plot",
            "children": [
                "./boxPlot",                
            ]
        },        
        "./Contour",
        "./twoDContourplot",
        {
            "id": "menu-graphics-distribution",
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
            "id": "menu-graphics-line-charts",
            "icon": "icon-chart-line-solid",
			"positionInNav":8,
            "children": [
                "./frequencyFactor",
                "./lineChartModal",
                "./plotOfMeans",
                "./threeAxisLineChartModal"
            ]
        },
        {
            "id": "menu-graphics-maps",
            "icon": "icon-earth",
			"positionInNav":9,
            "children": [
                "./usCountyMap",
                "./usStateMap",
                "./worldMap"
            ]
        },
        "./MultiVariChart",
        "./paretoChart",
        {
            "id": "menu-graphics-pie-charts",
            "icon": "icon-chart-pie-solid",
            "children": [
                "./Coxcomb",
                "./pieChart"
            ]
        },
        {
            "id": "menu-graphics-scatter-plot",
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
