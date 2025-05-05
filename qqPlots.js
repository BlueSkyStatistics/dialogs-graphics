/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class qqPlots extends baseModal {
    static dialogId = 'qqPlots'
    static t = baseModal.makeT(qqPlots.dialogId)

    constructor() {
        var config = {
            id: qqPlots.dialogId,
            label: qqPlots.t('title'),
            modalType: "two",
            RCode: `## [P-P Plot]
require(ggplot2);
require(ggthemes);
require(qqplotr);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.color[0] | safe}} )) +
    stat_qq_point(distribution = "{{selected.distribution | safe}}"{{if (options.selected.dparams != "" )}}, dparams = list ({{selected.dparams | safe}}){{/if}}, detrend = {{selected.detrend | safe}}) +
    {{if (options.selected.referenceline == "TRUE")}}stat_qq_line(detrend = {{selected.detrend | safe}}) + \n{{/if}}
    {{if (options.selected.band == "TRUE")}}stat_qq_band(distribution="{{selected.distribution | safe}}"{{if (options.selected.dparams != "" )}} ,dparams = list ({{selected.dparams | safe}}){{/if}}, detrend = {{selected.detrend | safe}}) + {{/if}}
    labs({{selected.x[1] | safe}} {{selected.y[2] | safe}}, title= "Q-Q Plot for variable {{selected.x[3] | safe}}{{selected.y[3] | safe}}{{selected.color[3] | safe}}") +
    xlab("{{selected.x_label|safe}}") +
    ylab("{{selected.y_label|safe}}") + {{selected.title|safe}}  {{selected.flipaxis | safe}}  
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
                el: new dstVariableList(config, { label: qqPlots.t('x'), no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['sample={{x|safe}}', 'sample="{{x|safe}}"', '{{x|safe}}', '{{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: qqPlots.t('y'), no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',shape={{y|safe}}', ',group={{y|safe}}', ',shape="{{y|safe}}"', ', shapes defined by levels of {{y|safe}}']
            },
            color: {
                el: new dstVariable(config, { label: qqPlots.t('color'), no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',color={{color|safe}}', ',group={{color|safe}}', ',color="{{color|safe}}"', ', color defined by levels of variable {{color|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: qqPlots.t('alpha'),
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            referenceline: {
                el: new checkbox(config, {
                    label: qqPlots.t('referenceline'),
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "referenceline"
                })
            },
            band: {
                el: new checkbox(config, {
                    label: qqPlots.t('band'),
                    true_value: "TRUE",
                    false_value: "FALSE",
                    newline: true, no: "band"
                })
            },
            detrend: {
                el: new checkbox(config, {
                    label: qqPlots.t('detrend'),
                    true_value: "TRUE",
                    false_value: "FALSE",
                    newline: true, no: "detrend"
                })
            },
            flipaxis: { el: new checkbox(config, { label: qqPlots.t('flip'), newline: true, no: "flipaxis" }), r: ' coord_flip() +' },
            distribution: {
                el: new comboBox(config, {
                    no: 'distribution',
                    label: qqPlots.t('distribution'),
                    multiple: false,
                    options: ["norm", "beta", "cauchy", "chisq", "exp", "f", "gamma"],
                    default: "norm"
                })
            },
            label1: { el: new labelVar(config, { no: 'label1', label: qqPlots.t('label1'), h: 9 }) },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: qqPlots.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: qqPlots.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: qqPlots.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: qqPlots.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: qqPlots.t('specify_a_title'),
                    allow_spaces:true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: qqPlots.t('x_title'),
                    placeholder: "X Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    allow_spaces:true,
                    label: qqPlots.t('y_title'),
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
            })},   
            dparams: {
                el: new input(config, {
                    no: 'dparams',
                    allow_spaces:true,
                    label: qqPlots.t('dparams'),
                    extraction: "NoPrefix|UseComma"
            })}         
        }
        var opts = new optionsVar(config, {
            no: "frequency_chart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.distribution.el,
                objects.label1.el,
                objects.dparams.el
            ]
        })
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: qqPlots.t('facets_lbl'),
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
                objects.x.el.content,
                objects.y.el.content,
                objects.color.el.content,
                objects.referenceline.el.content,
                objects.band.el.content,
                objects.detrend.el.content,
                objects.flipaxis.el.content,
                objects.alpha.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: qqPlots.t('navigation'),
                icon: "icon-qq_fixed",
                onclick: `r_before_modal('${config.id}')`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: qqPlots.t('help.title'),
            r_help: qqPlots.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: qqPlots.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let count = 0;
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
                    color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                    referenceline: instance.objects.referenceline.el.getVal() ? "TRUE" : "FALSE",
                    band: instance.objects.band.el.getVal() ? "TRUE" : "FALSE",
                    detrend: instance.objects.detrend.el.getVal() ? "TRUE" : "FALSE",
                    distribution: instance.objects.distribution.el.getVal(),
                    dparams: instance.opts.config.content[5].getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? "Theoretical Quantiles" : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? "Sample Quantiles" : instance.opts.config.content[2].getVal()
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
    render: () => new qqPlots().render()
}
