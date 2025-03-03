/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "Contour Plot",
        navigation: "Contour Plot",
        x: "X variable, specify a numeric variable",
        y: "Y variable(s), specify a numeric variable(s)",
        flip: "Flip Axis",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        facets_lbl : "Facets",
		colorHintLabel1 : "Select a color (After color selection, click outside the control to apply)",
        help: {
            title: "Contour Plot",
            r_help: "help(geom_density2d, package=ggplot2)",
            body: `
            <b>Description</b></br>
            Perform a 2D kernel density estimation using MASS::kde2d() and display the results with contours. This can be useful for dealing with overplotting. This is a 2d version of geom_density().</br>
            Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​
            <br/>
            <b>Usage</b>
            <br/>
            <code>
            ggplot(data=Dataset,aes(x = var1,y =var2)) +
            geom_density2d( stat = "density2d",position = "identity") +
            labs(x ="var1",y ="var2",title= "Contour chart for...")
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
            x: A numeric variable
            </li>
            <li>
            y: A numeric variable
            </li>
            <li>
            geomdensity2d: Creates the plot
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
            coord_flip(): Flip axis(This is optional)​
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;</br>
            <b>Help</b></br>
            help(geom_density2d, package=ggplot2)</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_density2d), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)​
    `}
    }
}
class Contour extends baseModal {
    constructor() {
        var config = {
            id: "Contour",
            label: localization.en.title,
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
                    label: localization.en.y,
                    no: "y",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: localization.en.x,
                    no: "x",
                    required: true,
                    filter: "Numeric|Date|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, no: "flipaxis" }), r: ' coord_flip() +' },
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
                    label: localization.en.specify_a_title,
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
                    label: localization.en.colorHintLabel1,
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
            right: [
                objects.y.el.content,
                objects.x.el.content,
                objects.flipaxis.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-contour",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts;
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
module.exports.item = new Contour().render()