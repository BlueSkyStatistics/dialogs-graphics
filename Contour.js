/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class Contour extends baseModal {
    static dialogId = 'Contour'
    static t = baseModal.makeT(Contour.dialogId)

    constructor() {
        var config = {
            id: Contour.dialogId,
            label: Contour.t('title'),
            modalType: "two",
            RCode: `## [Contour Plot]
require(ggplot2);
require(ggthemes);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} )) +
    geom_density2d(stat = "density2d",position = "identity"{{if (options.selected.color != "")}} , color ="{{selected.color | safe}}" {{/if}}) +
    labs({{selected.x[1] | safe}}{{ selected.y[1] | safe }}, title= "Contour plot  for X axis variable: {{selected.x[3] | safe}}, Y axis variable: {{selected.y[3] | safe}}") +
    xlab("{{selected.x_label|safe}}") +
    ylab("{{selected.y_label|safe}}") +
    {{selected.title|safe}}
    {{selected.flipaxis | safe}}  
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
                    label: Contour.t('y'),
                    no: "y",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: Contour.t('x'),
                    no: "x",
                    required: true,
                    filter: "Numeric|Date|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: Contour.t('flip'), no: "flipaxis" }), r: ' coord_flip() +' },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: Contour.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: Contour.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: Contour.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: Contour.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: 'specify_a_title',
                    label: Contour.t('specify_a_title'),
                    placeholder: "Chart title",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: "X Axis Label",
                    placeholder: "X Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: "Y Axis Label",
                    placeholder: "Y Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            color: {
                el: new colorInput(config, {
                    no: 'color',
                    label: Contour.t('colorHintLabel1'),
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
            })}

        }
        var opts = new optionsVar(config, {
            no: "Contour_plot_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.color.el
            ]
        })
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: Contour.t('facets_lbl'),
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
                objects.flipaxis.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: Contour.t('navigation'),
                icon: "icon-contour",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts;
        
        this.help = {
            title: Contour.t('help.title'),
            r_help: Contour.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: Contour.t('help.body')
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
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected["color"] = instance.opts.config.content[3].getVal(),
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
    render: () => new Contour().render()
}
