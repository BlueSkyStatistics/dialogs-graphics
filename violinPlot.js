
class violinPlot extends baseModal {
    static dialogId = 'violinPlot'
    static t = baseModal.makeT(violinPlot.dialogId)

    constructor() {
        var config = {
            id: violinPlot.dialogId,
            label: violinPlot.t('title'),
            modalType: "two",
            RCode: `## [Line chart (line drawn in order of variables on X axis)]
require(ggplot2);
require(ggthemes);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.GroupBy[0] | safe}} )) +
    geom_violin( stat = "ydensity",position = "dodge",trim=TRUE,scale="area"{{selected.alpha[0] | safe}}) +
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}, title= "Violin plot for variable {{selected.y[3] | safe}}, grouped by {{selected.x[3] | safe}}{{if (options.selected.GroupBy[1] != "")}} {{selected.GroupBy[1] | safe}}{{/if}}") +
    xlab("{{selected.x_label|safe}}") +
    ylab("{{selected.y_label|safe}}") +
    {{selected.title|safe}}
    {{selected.flipaxis | safe}}  
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
                el: new dstVariableList(config, { label: violinPlot.t('y'), no: "y", required: true, filter: "Numeric|Scale" }),
                r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, { label: violinPlot.t('x'), no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            GroupBy: {
                el: new dstVariable(config, { label: violinPlot.t('fill'), no: "GroupBy", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',fill = {{GroupBy|safe}}', ', filled by {{GroupBy|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: violinPlot.t('alpha'),
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: [',alpha={{alpha|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: violinPlot.t('flip'), no: "flipaxis" }), r: ' coord_flip() +' },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: violinPlot.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: violinPlot.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: violinPlot.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: violinPlot.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
        }
        var opts = new optionsVar(config, {
            no: "violin_options",
            content: [
                new input(config, {
                    no: 'specify_a_title',
                    allow_spaces:true,
                    label: violinPlot.t('specify_a_title'),
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                }),
                new input(config, {
                    no: 'x_title',
                    allow_spaces:true,
                    label: "X Axis Label",
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                }),
                new input(config, {
                    no: 'y_title',
                    allow_spaces:true,
                    label: "Y Axis Label",
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                }),
            ]
        })
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: violinPlot.t('facets_lbl'),
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
                objects.flipaxis.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: violinPlot.t('navigation'),
                icon: "icon-violin",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: violinPlot.t('help.title'),
            r_help: violinPlot.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: violinPlot.t('help.body')
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
                    GroupBy: instance.dialog.prepareSelected({ GroupBy: instance.objects.GroupBy.el.getVal()[0] }, instance.objects.GroupBy.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") +\n`,
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
    render: () => new violinPlot().render()
}
