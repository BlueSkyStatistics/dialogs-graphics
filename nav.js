/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

//const {getT} = global.requireFromRoot("localization");
let t = getT('menutoolbar')
const nav = () => ({
    "name": t('graphics_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "graphics",
    "buttons": [
        "./barChartModal",
        "./boxPlot",
        "./Contour",
        "./twoDContourplot",
        {
            "name": t('graphics_Distribution'),// {ns: 'menutoolbar'}),
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
            "name": t('graphics_Line_Charts'),// {ns: 'menutoolbar'}),
            "icon": "icon-chart-line-solid",
            "children": [
                "./frequencyFactor",
                "./lineChartModal",
                "./plotOfMeans",
                "./threeAxisLineChartModal"
            ]
        },
        {
            "name": t('graphics_Maps'),// {ns: 'menutoolbar'}),
            "icon": "icon-earth",
            "children": [
                "./usCountyMap",
                "./usStateMap",
                "./worldMap"
            ]
        },
        {
            "name": t('graphics_Pie_Charts'),// {ns: 'menutoolbar'}),
            "icon": "icon-chart-pie-solid",
            "children": [
                "./Coxcomb",
                "./pieChart"
            ]
        },
        {
            "name": t('graphics_Scatter_Plot'),// {ns: 'menutoolbar'}),
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
})

module.exports = {
    nav: nav(),
    render: () => nav()
}
