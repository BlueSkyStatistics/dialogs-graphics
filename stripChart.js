/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Strip Chart",
        navigation: "Strip Chart",
        x: "X variable, specify a numeric variable",
        y: "Y variable, specify a numeric variable(s)",
        Fill: "Color, specify a factor variable",
        size: "Make the size of the point proportional to",
        shape: "Shape",
        alpha: "Opacity (0-1)",
        flipaxis: "Flip axis",
        jitter: "Apply jitter effect",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        facets_lbl : "Facets",
        help: {
            title: "Strip Chart",
            r_help: "help(geom_point, package=ggplot2)",
            body: `
            <b>Description</b></br>
            A strip chart is the most basic type of plot available. It plots the data in order along a line with each data point represented as a box.  The shape of the point is dependent on the levels of the factor variable (x). Points can be optionally grouped by a factor variable (y). Facets can be optionally created by specifying a factor variable.</br>
            You can also optionally specify themes, and specify a title and labels for the x and y axis</br>
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            ggplot(Dataset5,aes(x = origin,y = engine,color = cylinder,shape =origin)) + geom_jitter()  + xlab("") +theme_calc() +facet_grid(year~.)​
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: The default dataset​
            </li>
            <li>
            aes(): Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.​
            </li>
            <li>
            x: the  grouping variable. The shape of the point is dependent on the levels of the factor variable​
            </li>
            <li>
            y: the variable for which points are plotted​
            </li>
            <li>
            color: an optional factor variable to group points (by color)​
            </li>
            <li>
            Labs(): Change axis labels and legend titles(This is optional)​
            </li>
            <li>
            facet_grid(): Lay out panels in a grid(This is optional)​
            </li>
            <li>
            theme_calc(): Specifies the calculator theme(This is optional)​
            </li>
            <li>
            geom_jitter():The jitter geom is a convenient default for geom_point with position = 'jitter'. See position_jitter to see how to adjust amount of jittering.
            </li>
            <li>
            coord_flip(): Flip axis(This is optional)​
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;</br>
            <b>Help</b></br>
            help(geom_point, package='ggplot2')</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_jitter), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)
    `}
    }
}
class stripChart extends baseModal {
    constructor() {
        var config = {
            id: "stripChart",
            label: localization.en.title,
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
                    label: localization.en.y,
                    no: "y",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: localization.en.x,
                    no: "x",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: localization.en.Fill,
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',color={{fill|safe}}', ',color="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"']
            },
            size: {
                el: new dstVariable(config, {
                    label: localization.en.size,
                    no: "size",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',size={{size|safe}}', ',size="{{size|safe}}"', ', Size: {{size|safe}}', ',"{{size|safe}}"']
            },
            shape: {
                el: new dstVariable(config, {
                    label: localization.en.shape,
                    no: "shape",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: [',shape={{shape|safe}}', ',shape="{{shape|safe}}"', ', Shape: {{shape|safe}}', ',"{{shape|safe}}"']
            },
            checkbox: {
                el: new checkbox(config, {
                    label: localization.en.flipaxis,
                    no: "flipBox",
                    extraction: "Boolean",
                }), r: 'coord_flip() +\n'
            },
            jitter: {
                el: new checkbox(config, {
                    label: localization.en.jitter,
                    no: "Jitter",
                    extraction: "Boolean",
                }), r: 'geom_point( position=\"jitter\") +\n'
            },
            opacity: {
                el: new advancedSlider(config, {
                    no: "opacity",
                    style: "ml-1",
                    label: localization.en.alpha,
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
                    label: localization.en.Facetrow,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: localization.en.Facetcolumn,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: localization.en.Facetwrap,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: localization.en.Facetscale,
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
                    label: localization.en.specify_a_title,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: localization.en.x_title,
                    allow_spaces:true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {            
                el: new input(config, {
                    no: 'y_title',
                    label: localization.en.y_title,
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
                name: localization.en.facets_lbl,
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
                name: localization.en.navigation,
                icon: "icon-strip_chart",
                onclick: `r_before_modal('${config.id}')`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        this.help = localization.en.help;
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
module.exports.item = new stripChart().render()