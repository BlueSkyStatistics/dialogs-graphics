
class usStateMap extends baseModal {
    static dialogId = 'usStateMap'
    static t = baseModal.makeT(usStateMap.dialogId)

    constructor() {
        var config = {
            id: usStateMap.dialogId,
            label: usStateMap.t('title'),
            modalType: "two",
            RCode: `
## [US State Map]
require(choroplethr);
require(choroplethrMaps)
BSkyDfForMap =data.frame(region={{dataset.name}}[,c("{{selected.region | safe}}")], value ={{dataset.name}}[,c("{{selected.value | safe}}")])
print(state_choropleth(BSkyDfForMap, title="{{selected.title | safe}}", legend="{{selected.legend | safe}}",num_colors ={{selected.colors | safe}}{{if (options.selected.zoomByStates !="c('')")}},zoom={{selected.zoomByStates | safe}}{{/if}}))
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            region: {
                el: new dstVariable(config, {
                    label: usStateMap.t('region'),
                    required: true,
                    no: "region",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            value: {
                el: new dstVariable(config, {
                    label: usStateMap.t('value'),
                    required: true,
                    no: "value",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            colors: {
                el: new advancedSlider(config, {
                    no: "colors",
                    label: usStateMap.t('colors'),
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
                    label: usStateMap.t('zoomByStates'),
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
                    label: usStateMap.t('specify_a_title'),
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
                    label: usStateMap.t('legend'),
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
                name: usStateMap.t('navigation'),
               // icon: "icon-usa",
               icon: "icon-usa",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: usStateMap.t('help.title'),
            r_help: "help(data,package='utils')",
            body: usStateMap.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new usStateMap().render()
}
