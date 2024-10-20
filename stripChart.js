

class stripChart extends baseModal {
    static dialogId = 'stripChart'
    static t = baseModal.makeT(stripChart.dialogId)

    constructor() {
        var config = {
            id: stripChart.dialogId,
            label: stripChart.t('title'),
            modalType: "two",
            RCode: `
## [Strip Chart]
require(ggplot2);
require(ggthemes);
require(stringr);   
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}}{{selected.fill[0] | safe}}{{selected.size[0] | safe}}{{selected.shape[0] | safe}})) +
    {{selected.jitter | safe}}
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}{{selected.fill[1] | safe}},title= "Strip chart for {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.fill[2] | safe}}") +
    xlab("{{selected.x_label | safe}}") +
    ylab("{{selected.y_label | safe}}") +
    {{selected.title | safe}}
    {{selected.flip | safe}}
    {{selected.Facets | safe}} + {{selected.themes | safe}}
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
                    label: stripChart.t('y'),
                    no: "y",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: stripChart.t('x'),
                    no: "x",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: stripChart.t('Fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',color={{fill|safe}}', ',color="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"']
            },
            size: {
                el: new dstVariable(config, {
                    label: stripChart.t('size'),
                    no: "size",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',size={{size|safe}}', ',size="{{size|safe}}"', ', Size: {{size|safe}}', ',"{{size|safe}}"']
            },
            shape: {
                el: new dstVariable(config, {
                    label: stripChart.t('shape'),
                    no: "shape",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: [',shape={{shape|safe}}', ',shape="{{shape|safe}}"', ', Shape: {{shape|safe}}', ',"{{shape|safe}}"']
            },
            checkbox: {
                el: new checkbox(config, {
                    label: stripChart.t('flipaxis'),
                    no: "flipBox",
                    extraction: "Boolean",
                }), r: 'coord_flip() +\n'
            },
            jitter: {
                el: new checkbox(config, {
                    label: stripChart.t('jitter'),
                    no: "Jitter",
                    extraction: "Boolean",
                }), r: 'geom_point( position=\"jitter\") +\n'
            },
            opacity: {
                el: new advancedSlider(config, {
                    no: "opacity",
                    style: "ml-1",
                    label: stripChart.t('alpha'),
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: stripChart.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: stripChart.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: stripChart.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: stripChart.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: 'specify_a_title',
                    allow_spaces:true,
                    label: stripChart.t('specify_a_title'),
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: stripChart.t('x_title'),
                    allow_spaces:true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {            
                el: new input(config, {
                    no: 'y_title',
                    label: stripChart.t('y_title'),
                    allow_spaces:true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
            })},
        }
        var opts = new optionsVar(config, {
            no: "Stripchart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el
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
            right: [objects.y.el.content, objects.x.el.content, objects.fill.el.content, objects.size.el.content, objects.shape.el.content, objects.opacity.el.content, objects.jitter.el.content, objects.checkbox.el.content],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: stripChart.t('navigation'),
                icon: "icon-strip_chart",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: stripChart.t('help.title'),
            r_help: "help(data,package='utils')",
            body: stripChart.t('help.body')
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
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    jitter: instance.objects.jitter.el.getVal() ? instance.objects.jitter.r : "geom_point() +\n",
                    size: instance.dialog.prepareSelected({ size: instance.objects.size.el.getVal()[0] }, instance.objects.size.r),
                    shape: instance.dialog.prepareSelected({ shape: instance.objects.shape.el.getVal()[0] }, instance.objects.shape.r),
                    opacity: instance.objects.opacity.el.getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") +\n `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
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
    render: () => new stripChart().render()
}
