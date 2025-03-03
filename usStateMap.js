/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "US State Map",
        navigation: "US State Map",
        region: "Variable with US State names:",
        value: "Variable with values to map:",
        colors: "Enter number of colors",
        zoomByStates: "Enter the states to zoom into, for e.g. california,oregon,washington",
        specify_a_title: "Enter a title",
        legend: "Legend:",
        help: {
            title: "US State Map",
            r_help: "help(state_choropleth, package='choroplethr')",
            body: `
            <b>Description</b></br>
            Draws a state map and allows you to optionally zoom into 1 or more states
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            state_choropleth(BSkyDfForMap, title="", legend="", num_colors =1,zoom=NULL)
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            BSkyDfForMap: A data.frame with a column named "region" and a column named "value". Elements in the "region" column must exactly match how regions are named in the "region" column in state.map. Run the commands under the other section below to access the state.map dataset
            </li>
            <li>
            Title: An optional title for the map.
            </li>
            <li>
            Legend: An optional name for the legend.
            </li>
            <li>
            num_colors: The number of colors on the map. A value of 1 will use a continuous scale. A value in [2, 9] will use that many colors.
            </li>
            <li>
            zoom: An optional vector of states to zoom in on. Elements of this vector must exactly match the names of states as they appear in the "region" column of ?state.regions.
            </li>
            </ul>
            <b>Package</b></br>
            choroplethr;choroplethrMaps;</br>
            <b>Help</b></br>
            help(state_choropleth, package='choroplethr')</br>
            <b>Other</b></br>
            <code> 
            # Run the code below to access the state.map dataset<br/>
            library(choroplethr)<br/>
            library(choroplethrMaps)<br/>
            data(state.map)<br/>
            state.map <br/>
            </code> <br/>
    `}
    }
}
class usStateMap extends baseModal {
    constructor() {
        var config = {
            id: "usStateMap",
            label: localization.en.title,
            modalType: "two",
            RCode: `
## [US State Map]
require(choroplethr);
require(choroplethrMaps)
BSkyDfForMap =data.frame(region={{dataset.name}}[,c("{{selected.region | safe}}")], value ={{dataset.name}}[,c("{{selected.value | safe}}")])
print(state_choropleth(BSkyDfForMap, title="{{selected.title | safe}}", legend="{{selected.legend | safe}}",num_colors ={{selected.colors | safe}}{{if (options.selected.zoomByStates !="c('')")}},zoom={{selected.zoomByStates | safe}}{{/if}}))
	
#Cleanup the acs and XML libs conflict with base::apply() and tools::toHTML()
if ("package:choroplethr" %in% search()) {
  suppressWarnings(detach("package:choroplethr", unload = TRUE))
}


if ("package:acs" %in% search()) {
  suppressWarnings(detach("package:acs", unload = TRUE))
}

if ("package:XML" %in% search()) {
  suppressWarnings(detach("package:XML", unload = TRUE))
}

if ("package:choroplethrMaps" %in% search()) {
  suppressWarnings(detach("package:choroplethrMaps", unload = TRUE))
}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            region: {
                el: new dstVariable(config, {
                    label: localization.en.region,
                    required: true,
                    no: "region",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            value: {
                el: new dstVariable(config, {
                    label: localization.en.value,
                    required: true,
                    no: "value",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            colors: {
                el: new advancedSlider(config, {
                    no: "colors",
                    label: localization.en.colors,
                    style:"ml-1",
                    min: 1,
                    max: 9,
                    step: 1,
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            zoomByStates: {
                el: new input(config, {
                    no: 'zoomByStates',
                    allow_spaces:true,
                    label: localization.en.zoomByStates,
                    placeholder: "",
                    type: "character",
                    extraction: "CreateArray",
                    value: ""
                }),
            },
            title: {
                el: new input(config, {
                    no: 'title',
                    allow_spaces:true,
                    label: localization.en.specify_a_title,
                    placeholder: "",
                    type: "character",
                    extraction: "TextAsIs",
                    value: ""
                }),
            },
            legend: {
                el: new input(config, {
                    no: 'legend',
                    allow_spaces:true,
                    label: localization.en.legend,
                    placeholder: "",
                    type: "character",
                    extraction: "TextAsIs",
                    value: ""
                }),
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.region.el.content, objects.value.el.content, objects.colors.el.content, objects.zoomByStates.el.content, objects.title.el.content, objects.legend.el.content],
            nav: {
                name: localization.en.navigation,
               // icon: "icon-usa",
               icon: "icon-usa",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new usStateMap().render()