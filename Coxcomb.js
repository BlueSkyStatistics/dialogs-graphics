
class Coxcomb extends baseModal {
    static dialogId = 'Coxcomb'
    static t = baseModal.makeT(Coxcomb.dialogId)

    constructor() {
        var config = {
            id: Coxcomb.dialogId,
            label: Coxcomb.t('title'),
            modalType: "two",
            RCode: `## [Coxcomb Plot]
require(ggplot2);
require(ggthemes);
require(stringr);
ggplot(data={{dataset.name}}, aes({{if (options.selected.x[0] == "")}}x='', {{#else}}{{selected.x[0] | safe}}{{/if}}{{selected.y[0] | safe}}{{selected.color[0] | safe}} )) +
    geom_bar( {{if (options.selected.rdgrp1=="TRUE")}}position = "fill",{{/if}}{{selected.alpha | safe}}{{selected.width | safe}}{{if(options.selected.y[0] != "")}}stat = "identity"{{/if}}) +
    coord_polar("x") +
    labs({{selected.x[1] | safe}} {{selected.y[1] | safe}} title= "Coxcomb plot with{{selected.x[4] | safe}}{{selected.y[4] | safe}}{{selected.color[4] | safe}}") +
    xlab("{{selected.x_label|safe}}") + ylab("{{if (options.selected.y_label == "")}}{{if (options.selected.rdgrp1=="TRUE")}}Proportion{{#else}}Count{{/if}}{{#else}}{{selected.y_label | safe}}{{/if}}") + {{selected.title|safe}}  {{selected.flipaxis | safe}}  
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
            x: {
                el: new dstVariableList(config, { label: Coxcomb.t('x'), no: "x", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}},', 'x="{{x|safe}}",', '{{x|safe}}', '{{x|safe}}', ' X aesthetic: {{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: Coxcomb.t('y'), no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['y={{y|safe}},', 'y="{{y|safe}}",', 'y="{{y|safe}}",', '{{y|safe}}', ' Y aesthetic: {{y|safe}}']
            },
            color: {
                el: new dstVariable(config, { label: Coxcomb.t('fill'), no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: ['fill={{color|safe}}', ',group={{color|safe}}', ',color="{{color|safe}}"', '{{color|safe}}', ' fill: {{color|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: Coxcomb.t('alpha'),
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            width: {
                el: new advancedSlider(config, {
                    no: "width",
                    label: Coxcomb.t('width'),
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['width={{width|safe}},']
            },
            rdgrp1: {
                el: new checkbox(config, {
                    label: Coxcomb.t('rdgrp1'),
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "rdgrp1"
                })
            },
            flipaxis: { el: new checkbox(config, { label: Coxcomb.t('flip'), newline: true, no: "flipaxis" }), r: ' coord_flip() +' },
            barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: Coxcomb.t('barcolor'),
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                }), r: ['{{barcolor|safe}}']
            },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: Coxcomb.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: Coxcomb.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: Coxcomb.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: Coxcomb.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: 'title',
                    label: Coxcomb.t('specify_a_title'),
                    placeholder: "Chart title",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: Coxcomb.t('x_title'),
                    allow_spaces:true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    allow_spaces:true,
                    label: Coxcomb.t('y_title'),
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
            })},            
        }
        var opts = new optionsVar(config, {
            no: "frequency_chart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el
            ]
        })
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: Coxcomb.t('facets_lbl'),
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
                objects.color.el.content,
                objects.y.el.content,
                objects.x.el.content,
                objects.alpha.el.content,
                objects.width.el.content,
                objects.rdgrp1.el.content,
                objects.flipaxis.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: Coxcomb.t('navigation'),
                icon: "icon-coxcomb",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: Coxcomb.t('help.title'),
            r_help: Coxcomb.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: Coxcomb.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let count = 0;
        if (instance.objects.x.el.getVal() == "") {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    y: instance.dialog.prepareSelected({ y: instance.objects.y.el.getVal()[0] }, instance.objects.y.r),
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    width: instance.dialog.prepareSelected({ width: instance.objects.width.el.getVal() }, instance.objects.width.r),
                    color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                    rdgrp1: instance.objects.rdgrp1.el.getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal(),
                code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        }
        else {
            instance.objects.x.el.getVal().forEach(function (value) {
                var code_vars = {
                    dataset: {
                        name: getActiveDataset()
                    },
                    selected: {
                        y: instance.dialog.prepareSelected({ y: instance.objects.y.el.getVal()[0] }, instance.objects.y.r),
                        x: instance.dialog.prepareSelected({ x: value }, instance.objects.x.r),
                        flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                        alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                        width: instance.dialog.prepareSelected({ width: instance.objects.width.el.getVal() }, instance.objects.width.r),
                        color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                        rdgrp1: instance.objects.rdgrp1.el.getVal(),
                        title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
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
            }
            )
        }
        return res;
    }
}

module.exports = {
    render: () => new Coxcomb().render()
}
