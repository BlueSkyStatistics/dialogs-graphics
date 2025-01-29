
class usCountyMap extends baseModal {
    static dialogId = 'usCountyMap'
    static t = baseModal.makeT(usCountyMap.dialogId)

    constructor() {
        var config = {
            id: usCountyMap.dialogId,
            label: usCountyMap.t('title'),
            modalType: "two",
            RCode: `
## [US County map]
require(choroplethr);
require(choroplethrMaps)
BSkyDfForMap =data.frame(region={{dataset.name}}[,c("{{selected.region | safe}}")], value ={{dataset.name}}[,c("{{selected.value | safe}}")])
print(county_choropleth(BSkyDfForMap, title="{{selected.title | safe}}", legend="{{selected.legend | safe}}",num_colors ={{selected.colors | safe}}{{if (options.selected.zoomByStates !="c('')")}},state_zoom={{selected.zoomByStates | safe}}{{/if}}))
	
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
                    label: usCountyMap.t('region'),
                    required: true,
                    no: "region",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            value: {
                el: new dstVariable(config, {
                    label: usCountyMap.t('value'),
                    required: true,
                    no: "value",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            colors: {
                el: new advancedSlider(config, {
                    no: "colors",
                    label: usCountyMap.t('colors'),
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
                    label: usCountyMap.t('zoomByStates'),
                    allow_spaces:true,
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
                    label: usCountyMap.t('specify_a_title'),
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
                    label: usCountyMap.t('legend'),
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
                name: usCountyMap.t('navigation'),
                icon: "icon-place",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: usCountyMap.t('help.title'),
            r_help: "help(data,package='utils')",
            body: usCountyMap.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new usCountyMap().render()
}
