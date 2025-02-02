

class plotOfMeans extends baseModal {
    static dialogId = 'plotOfMeans'
    static t = baseModal.makeT(plotOfMeans.dialogId)

    constructor() {
        var config = {
            id: plotOfMeans.dialogId,
            label: plotOfMeans.t('title'),
            modalType: "two",
            RCode: `
## [Plot of Means]
require(ggplot2);
require(ggthemes);
require(stringr);
require(Rmisc)
{{if (options.selected.tempFacets =="ERROR") }} 
cat("Error: You have specified more than one facet. You can only specify one facet at a time (namely one of Facetrow, Facetcol, Facetwrap)")
{{#else}}
{{if (options.selected.tempFacets =="")}}
temp <-Rmisc::summarySE( {{dataset.name}}, measurevar = "{{ selected.y[3] | safe }}", groupvars = c("{{ selected.x[3] | safe }}"{{ selected.fill[3] | safe }}),
conf.interval ={{selected.confidenceInterval | safe}}, na.rm = TRUE, .drop = TRUE)
{{/if}}
{{if (options.selected.tempFacets !="")}}
temp <-Rmisc::summarySE( {{dataset.name}}, measurevar = "{{ selected.y[3] | safe }}", groupvars = c("{{ selected.x[3] | safe }}"{{ selected.fill[3] | safe }},"{{ selected.tempFacets | safe }}"),
conf.interval ={{selected.confidenceInterval | safe}}, na.rm = TRUE, .drop = TRUE)
{{/if}}
pd <- position_dodge(0.3)
ggplot(data=temp, aes({{ selected.x[0] | safe }}{{ selected.y[0] | safe }}{{ selected.fill[0] | safe }}{{ selected.fill[4] | safe }})) + {{selected.radio | safe}}
    geom_line(position = pd,{{if (options.selected.fill[3] == "")}} group = 1, {{/if}} alpha={{selected.alpha | safe}})  +
    geom_point(position = pd)  +
    labs({{selected.x[1] | safe}}{{ selected.y[1] | safe }}{{selected.fill[1] | safe}},title= "Plot of Means for {{selected.y[2] | safe}} by {{selected.x[2] | safe}} {{selected.fill[2] | safe}}") +
    xlab("{{selected.x_label|safe}}") +
    ylab("{{selected.y_label|safe}}") +
    {{selected.title|safe}}
    {{selected.flip}}
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}
`,
            pre_start_r: JSON.stringify({
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, {
                    label: plotOfMeans.t('y'),
                    no: "y",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', '{{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: plotOfMeans.t('x'),
                    no: "x",
                    required: true,
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', '{{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: plotOfMeans.t('fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',colour={{fill|safe}}', ',colour="{{fill|safe}}"', ', Color: {{fill|safe}}', ',"{{fill|safe}}"', ',group={{fill|safe}}', ',group="{{fill|safe}}"', ', Grouped by: {{fill|safe}}', ',"{{fill|safe}}"']
            },
            checkbox: {
                el: new checkbox(config, {
                    label: plotOfMeans.t('flip'),
                    no: "flipBox",
                    extraction: "Boolean",
                }), r: 'coord_flip() + '
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "aplha",
                    label: plotOfMeans.t('alpha'),
                    min: 0,
                    max: 1,
                    style: "ml-1",
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            label1: { el: new labelVar(config, { label: plotOfMeans.t('label1'), h: 6 }) },
            radiobuttonNo: {
                el: new radioButton(config, {
                    label: plotOfMeans.t('radiobuttonNo'), no: "Eb",
                    increment: "No", value: " ", state: "checked", extraction: "ValueAsIs"
                })
            },
            radiobuttonSe: {
                el: new radioButton(config, {
                    label: plotOfMeans.t('radioButtonSe'),
                    no: "Eb",
                    increment: "stderr",
                    value: 'geom_errorbar( aes(ymin = {{ y | safe }}-se,ymax = {{ y | safe }}+se ),width = .1,position = pd) + ',
                    state: "", extraction: "ValueAsIs"
                })
            },
            radiobuttonSd: {
                el: new radioButton(config, {
                    label: plotOfMeans.t('radiobuttonSd'),
                    no: "Eb",
                    increment: "stddev",
                    value: "geom_errorbar( aes(ymin = {{ y | safe }}-sd,ymax = {{ y | safe }}+sd ),width = .1,position = pd) + ",
                    state: "", extraction: "ValueAsIs"
                })
            },
            radiobuttonCi: {
                el: new radioButton(config, {
                    label: plotOfMeans.t('radiobuttonCi'),
                    no: "Eb",
                    increment: "ci",
                    value: "geom_errorbar( aes(ymin = {{ y | safe }}-ci,ymax = {{ y | safe }}+ci ),width = .1,position = pd) + ",
                    state: "", extraction: "ValueAsIs"
                })
            },
            confidenceInterval: {
                el: new advancedSlider(config, {
                    no: "confidenceInterval",
                    label: plotOfMeans.t('confidenceInterval'),
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.95,
                }), r: ['confidenceInterval={{confidenceInterval|safe}},']
            },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: plotOfMeans.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: plotOfMeans.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: plotOfMeans.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: plotOfMeans.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["", "fixed", "none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: 'title',
                    label: "Chart Title",
                    allow_spaces:true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                })},	
			x_title: {
                el: new input(config, {
                    no: 'x_title',
                    allow_spaces:true,
                    label: "X Axis Label",
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                })},
			y_title: {
                el: new input(config, {
                    no: 'y_title',
                    allow_spaces:true,
                    label: "Y Axis Label",
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                })},
        }
        var opts = {el: new optionsVar(config, {
            no: "plotOfMeans_options",
            content: [
                objects.title.el,
                    objects.x_title.el,
                    objects.y_title.el,
            ]
        })};
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: plotOfMeans.t('facets_lbl'),
                content: [
                    objects.Facetrow.el,
                    objects.Facetcolumn.el,
                    objects.Facetwrap.el,
                    objects.Facetscale.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.y.el.content, objects.x.el.content, objects.fill.el.content, objects.checkbox.el.content, objects.alpha.el.content, objects.label1.el.content, objects.radiobuttonNo.el.content, objects.radiobuttonSe.el.content, objects.radiobuttonSd.el.content, objects.radiobuttonCi.el.content, objects.confidenceInterval.el.content,],
            bottom: [opts.el.content, Facets.el.content],
            nav: {
                name: plotOfMeans.t('navigation'),
                icon: "icon-line-dot-chart",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: plotOfMeans.t('help.title'),
            r_help: plotOfMeans.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: plotOfMeans.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let count = 0;
        instance.objects.y.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    y: instance.dialog.prepareSelected({ y: value }, instance.objects.y.r),
                    fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal()[0] }, instance.objects.fill.r),
                    radio: instance.dialog.renderSample(common.getCheckedRadio("plotOfMeans_Eb"), { y: value }),
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    alpha: instance.objects.alpha.el.getVal(),
                    confidenceInterval: instance.objects.confidenceInterval.el.getVal(),
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            //Aaron: please retain the comments below, I may want to reuse thus
           // code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
           // code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
           code_vars.selected["title"] = instance.objects.title.el.getVal() === "" ? "" : `ggtitle("${instance.objects.title.el.getVal()}") + `
           code_vars.selected["x_label"] = instance.objects.x_title.el.getVal() === "" ? code_vars.selected.x[3] : instance.objects.x_title.el.getVal()
           code_vars.selected["y_label"] = instance.objects.y_title.el.getVal() === "" ? code_vars.selected.y[3] : instance.objects.y_title.el.getVal()
            if (!(code_vars.selected.Facetcolumn.length == 0 && code_vars.selected.Facetrow.length == 0 && code_vars.selected.Facetwrap.length == 0)) {
                code_vars.selected.tempFacets = stringWithFacetsForPlotOfMeans(code_vars.selected.Facetrow, code_vars.selected.Facetcolumn, code_vars.selected.Facetwrap)
            }
            else {
                code_vars.selected.tempFacets = ""
            }
            if (code_vars.selected.tempFacets != "Error") {
                code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            }
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            if (count == 0) {
                res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: cmd, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++
        })
        return res;
    }
}

module.exports = {
    render: () => new plotOfMeans().render()
}
