
class boxPlot extends baseModal {
    static dialogId = 'boxPlot'
    static t = baseModal.makeT(boxPlot.dialogId)

    constructor() {
        var config = {
            id: boxPlot.dialogId,
            label: boxPlot.t('title'),
            modalType: "two",
            RCode: `## [Box Plot]
require(ggplot2);
require(ggthemes);
{{dataset.name}}  %>% {{if (options.selected.dropna )}}tidyr::drop_na({{if(options.selected.x[3] !="")}}{{selected.x[3] | safe}}{{/if}} {{if(options.selected.y[3] !="")}},{{selected.y[3] | safe}}{{/if}}{{if(options.selected.Facetrow[0] !='')}},{{selected.Facetrow | safe}}{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},{{selected.Facetcolumn | safe}}{{/if}}{{if(options.selected.Facetwrap[0] !='')}},{{selected.Facetwrap | safe}}{{/if}} ) %>%{{/if}}
ggplot( aes({{if (options.selected.x[0] != "")}}{{selected.x[0] | safe}}{{/if}}{{selected.y[0] | safe}} {{selected.GroupBy[0] | safe}} )) +
    geom_boxplot({{if (options.selected.barcolor != "")}} col ="{{selected.barcolor | safe}}",{{/if}} {{selected.outliers | safe }}{{selected.alpha[0] | safe}}{{selected.notch | safe}}) +
    {{if (options.selected.chart  =="Stacked")}}geom_dotplot(binaxis = 'y',stackdir = 'center',dotsize = 0.1) +{{/if}}{{ if (options.selected.chart  =="Jitter")}}geom_jitter(shape = 16,position = position_jitter(0.2)) +{{/if}}
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}, title= "Boxplot for variable: {{selected.y[3] | safe}}{{if (options.selected.x[0] != "")}}, grouped by: {{selected.x[3] | safe}}{{/if}}{{if (options.selected.GroupBy[1] != "")}}{{selected.GroupBy[1] | safe}}{{/if}}") +
    xlab("{{selected.x_label|safe}}") + ylab("{{selected.y_label|safe}}") + {{selected.title|safe}}  {{selected.flipaxis | safe}}  {{selected.Facets | safe}} + {{selected.themes | safe}}  
`,
            pre_start_r: JSON.stringify({
                //Anil add 3 lines below
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, { label: boxPlot.t('y'), no: "y", required: true, filter: "Numeric|Scale" }),
                r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, { label: boxPlot.t('x'), no: "x", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            GroupBy: {
                el: new dstVariable(config, { label: boxPlot.t('fill'), no: "GroupBy", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',fill = {{GroupBy|safe}}', ', filled by: {{GroupBy|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: boxPlot.t('alpha'),
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            flipaxis: { el: new checkbox(config, { label: boxPlot.t('flip'), no: "flipaxis" }), r: ' coord_flip() +' },
            notch: { el: new checkbox(config, { label: boxPlot.t('notch'), no: "notch" }), r: ' notch = TRUE' },
            outliers: { el: new checkbox(config, { label: boxPlot.t('outliers'), no: "outliers" }), r: 'outlier.colour= "red ",outlier.shape=8,outlier.size = 2,' },
            dataPoints: {
                el: new comboBox(config, {
                    no: 'dataPoints',
                    label: boxPlot.t('dataPoints'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "Stacked", "Jitter"],
                    default: "none"
                })
            },
            specify_a_title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: boxPlot.t('specify_a_title'),
                    placeholder: "Chart title",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: boxPlot.t('x_title'),
                    placeholder: "X Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: boxPlot.t('y_title'),
                    placeholder: "Y Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: boxPlot.t('barcolor'),
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })
            },

            dropna: {
                el:new checkbox(config, { label: boxPlot.t('dropna'), no: "dropna", extraction: "Boolean" 
            }
            )},

            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: boxPlot.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: boxPlot.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: boxPlot.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: boxPlot.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
        }
        var opts = new optionsVar(config, {
            no: "boxplot_options",
            content: [
                objects.specify_a_title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.barcolor.el,
                objects.dropna.el,

            ]
        })
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: "Facets",
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
            right: [
                objects.y.el.content,
                objects.x.el.content,
                objects.GroupBy.el.content,
                objects.alpha.el.content,
                objects.dataPoints.el.content,
                objects.flipaxis.el.content,
                objects.notch.el.content,
                objects.outliers.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: boxPlot.t('navigation'),
                icon: "icon-box_plot",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts;
        
        this.help = {
            title: boxPlot.t('help.title'),
            r_help: "help(data,package='utils')",
            body: boxPlot.t('help.body')
        }

    }
    prepareExecution(instance) {
        var res = [];
        let count = 0
        instance.objects.y.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    y: instance.dialog.prepareSelected({ y: value }, instance.objects.y.r),
                    GroupBy: instance.dialog.prepareSelected({ GroupBy: instance.objects.GroupBy.el.getVal()[0] }, instance.objects.GroupBy.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    notch: instance.objects.notch.el.getVal() ? instance.objects.notch.r : "",
                    outliers: instance.objects.outliers.el.getVal() ? instance.objects.outliers.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    barcolor: instance.opts.config.content[3].getVal(),
                    chart: instance.objects.dataPoints.el.getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    dropna: instance.objects.dropna.el.getVal()
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            if (code_vars.selected.Facetrow[0] ==undefined )
            {
                code_vars.selected.Facetrow[0] =""
            }
            if (code_vars.selected.Facetcolumn[0] ==undefined )
            {
                code_vars.selected.Facetcolumn[0] =""
            }
            if (code_vars.selected.Facetwrap[0] ==undefined )
            {
                code_vars.selected.Facetwrap[0] =""
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
    render: () => new boxPlot().render()
}
