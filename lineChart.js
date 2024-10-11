
class lineChartModal extends baseModal {
    static dialogId = 'lineChartModal'
    static t = baseModal.makeT(lineChartModal.dialogId)

    constructor() {
        const config = {
            id: "lineChartModal",
            label: lineChartModal.t('title'),
            modalType: "two",
            RCode: `## [Line chart (line drawn in order of variables on X axis)]
require(ggplot2);
require(ggthemes);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.color[0]}})) +
    {{selected.chart}}(stat = "identity", position = "identity", alpha=0.5{{if (options.selected.sizeLine != "")}}, size = {{selected.sizeLine | safe }}{{/if}}{{selected.linetype[0] | safe}}) +
    geom_point({{if (options.selected.sizePoint != "")}}size = {{selected.sizePoint | safe }}{{/if}}) +
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}, title= "Line chart ({{selected.label}})\nfor {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.color[1]}}") +
    xlab("{{selected.x_label|safe}}") + ylab("{{selected.y_label|safe}}") + {{selected.title|safe}}{{selected.flip}} 
    {{selected.Facets | safe}} + {{selected.themes | safe}}
`,
            pre_start_r: JSON.stringify({
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        var objects = {
            label1: { el: new labelVar(config, { label: lineChartModal.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config) },
            y: { el: new dstVariableList(config, { label: lineChartModal.t('y'), no: "y", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}'] },
            x: { el: new dstVariable(config, { label: lineChartModal.t('x'), no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}'] },
            color: { el: new dstVariable(config, { label: lineChartModal.t('color'), no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: [', color = {{color|safe}}, group = {{color|safe}}, shape ={{color|safe}}', 'grouped in colors by: {{color|safe}}'] },

            linetype: { el: new dstVariable(config, { label: lineChartModal.t('linetype'), no: "linetype", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: [', aes (group = {{linetype |safe}}, linetype = {{linetype |safe}})', 'grouped in colors by: {{color|safe}}'] },


            checkbox: { el: new checkbox(config, { label: lineChartModal.t('flipBox'), style: "mt-2", no: "flipBox" }), r: 'coord_flip() + ' },
            Facetrow: {
                el: new comboBox(config, {
                    no: 'Facetrow',
                    label: lineChartModal.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: lineChartModal.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: lineChartModal.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: lineChartModal.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                                no: 'title',
                                label: lineChartModal.t('specify_a_title'),
                                allow_spaces:true,
                                placeholder: "Chart title",
                                extraction: "NoPrefix|UseComma"
                            })},
                            
                 x_title: {
                el:	new input(config, {
                                no: 'x_title',
                                label: lineChartModal.t('x_title'),
                                allow_spaces:true,
                                placeholder: "X Axis",
                                extraction: "NoPrefix|UseComma"
                            })},
                            
                y_title: {
                           el: new input(config, {
                                no: 'y_title',
                                allow_spaces:true,
                                label: lineChartModal.t('y_title'),
                                placeholder: "Y Axis",
                                extraction: "NoPrefix|UseComma"
                            })},
                sizePoint: {
                    el: new inputSpinner(config, {
                        no: 'sizePoint',
                        label: lineChartModal.t('sizePoint'),
                        min: 0,
                        max: 20,
                        step: 0.1,
                        value: 1,
                        extraction: "NoPrefix|UseComma"
                    })
                    },
                sizeLine: {
                        el: new inputSpinner(config, {
                            no: 'sizeLine',
                            label: lineChartModal.t('sizeLine'),
                            min: 0,
                            max: 20,
                            step: 0.1,
                            value: 1,
                            width:"w-25",
                            extraction: "NoPrefix|UseComma"
                        })
                        },
        }
        const tab1 = {
            state: "active",
            no: "line",
            label: lineChartModal.t('line'),
            r_value: "geom_line",
            content: "Observations connected by order of values on x axis"
        }
        const tab2 = {
            state: "",
            no: "stair",
            label: lineChartModal.t('stair'),
            r_value: "geom_step",
            content: "Stair Steps"
        }
        const tab3 = {
            state: "",
            no: "path",
            label: lineChartModal.t('path'),
            r_value: "geom_path",
            content: "Ordered by occurrence of variable values in data"
        }
        var opts = new optionsVar(config, {
            no: "linechart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.sizePoint.el,
                objects.sizeLine.el
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
        var navs = new tabsView(config, { no: "line_type", invisible: true, tabs: [tab1, tab2, tab3] })
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [
                objects.y.el.content,
                objects.x.el.content,
                objects.color.el.content,
                objects.linetype.el.content,
                new labelVar(config, { label: lineChartModal.t('lineChartType'), h: 7 }).content,
                navs.content,
                objects.checkbox.el.content],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: lineChartModal.t('navigation'),
                icon: "icon-chart-line-solid",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.navs = navs
        this.opts = opts
        
        this.help = {
            title: lineChartModal.t('help.title'),
            r_help: "help(data,package='utils')",
            body: lineChartModal.t('help.body')
        }

    }
    prepareExecution(instance) {
        var res = [];
        instance.objects.y.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    y: instance.dialog.prepareSelected({ y: value }, instance.objects.y.r),
                    color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                    linetype: instance.dialog.prepareSelected({ linetype: instance.objects.linetype.el.getVal()[0] }, instance.objects.linetype.r),
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    chart: instance.navs.getActive('r-value'),
                    label: instance.navs.tabs[parseInt(instance.navs.getActive('el-index'))].content,
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    sizePoint: instance.objects.sizePoint.el.getVal(),
                    sizeLine: instance.objects.sizeLine.el.getVal()
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
        })
        return res;
    }
}

module.exports = {
    render: () => new lineChartModal().render()
}
