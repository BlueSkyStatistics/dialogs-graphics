var localization = {
    en: {
        title: "Coxcomb Plot",
        navigation: "Coxcomb",
        x: "X axis variable(s), specify a factor variable(s)",
        y: "Y variable, specify a numeric variable",
        fill: "Fill, specify a factor variable",
        alpha: "Opacity (0-1)",
        width: "Width",
        rdgrp1: "Fill proportions",
        flip: "Flip axis",
        barcolor: "Bar color (After color selection, click outside the control to apply)",
        specify_a_title: "Enter a title",
        x_title: "X Axis Label",
        y_title: "Y Axis Label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        help: {
            title: "Coxcomb Plot",
            r_help: "help(coord_polar, package='ggplot2')",
            body: `
            <b>Description</b></br>
A Coxcomb/Bulls Eye chart (or a circle chart) is a circular statistical graphic, which is divided into slices/concentric circles to illustrate numerical proportion. In a Coxcomb/Bulls Eye chart, the width length of each concentric circle (and consequently its  area), is proportional to the quantity it represents. The quantity can be represented as a count or percentage.</br>​
Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis.</br>
When you specify multiple x variables, we create a separate Coxcomb/Bulls eye for each x variable.</br>
<b>Usage</b>
<br/>
<code>
#You can create a Bulls Eye chart for a single factor variable, a concentric circle will be created for each level of the factor variable. The width of the concentric circle is proportional to the counts of each level of the factor level. Here the factor variable will correspond to the fill as below<br/>
#penguins is a dataset in the equatiomatic R package
ggplot(data=penguins,aes(x ='',fill=species)) +​
                 geom_bar(alpha=1,width =0.9) +​
                 coord_polar("x") +​
                 labs(y ="Count",fill ="var1",title= "Bulls Eye Chart  with Fill: species")​</br></br>
#You can create a Bulls Eye chart by specifying a scale/numeric variable as the y variable and a factor variable that serves as a fill. Here a concentric circle is created for each level of the fill factor variable. The width of the concentric circle is proportional to the sum of the y values at each level of the factor level. Here the factor variable will correspond to the fill as below<br/>
ggplot(data=penguins,aes(x ='', y = bill_length_mm, fill = species)) +​
                 geom_bar(alpha=1,width =0.9,stat="identity") +​
                 coord_polar("x") +​
                 labs(y ="var1",fill ="var2",title= "Bulls Eye chart  with X aesthetic:,Y aesthetic: var1,Fill: var2") </br></br>

#You can create a Coxcomb plot by specifying an x variable, The slices are created for every level of the x variable, the radius of each slice is proportional to the count<br/>
    ggplot(data=penguins, aes(x=island, )) +
        geom_bar( alpha=1,width=1,) +
        coord_polar("x") +
        labs(x="island",  title= "Coxcomb plot with X aesthetic: island") +
        xlab("island") + ylab("Count")</br></br>

#You can generate a Coxcomb plot by specifying a X variable and a fill. Slices are created for each level of the x variable. Each slice is filled by the count of the cases in each level of the fill variable specified.
ggplot(data=penguins, aes(x=island,fill=species )) +
	geom_bar( alpha=1, width=1) +
	coord_polar("x") +
	labs(x="island",  title= "Coxcomb plot with X aesthetic: island fill: species") +
	xlab("island") + ylab("Count")</br></br>


#You can create a Coxcomb plot by specifying an x variable, y variable and fill. The slices are created for every level of the x variable and filled by the sum of the values of the y variable for each level of the variable specified in the fill. The slices are divided by levels of the fill variable. The area occupied by each level of the fill variable within the slice is proportional to the sum of the counts of the y variable that match the slice and fill variable.<br/>
ggplot(data=penguins, aes(x=island,y=bill_depth_mm,fill=species )) +
	geom_bar( alpha=1,width=1,stat = "identity") +
	coord_polar("x") +
	labs(x="island", y="bill_depth_mm", title= "Coxcomb plot with X aesthetic: island Y aesthetic: bill_depth_mm fill: species") +
	xlab("island") + ylab("bill_depth_mm")</br></br>
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
x: (Optional) A factor/categorical variable. The length of the bar corresponds to the counts of each level of the factor variable.​
</li>
<li>
Y: (Optional) a numeric variable
</li>
<li>
fill: (Optional)An optional factor/categorical variable to group the counts of the levels in x: (see above)​
</li>
<li>
geom_bar(): Creates the bar graph, position ="fill" fills the bar with a percentage of each grouping level.​
</li>
<li>
Coor_polar(): The polar coordinate system is most commonly used for pie charts, which are a stacked bar chart in polar coordinates.
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
<li>
alpha: Controls opacity, takes values between 0-1. 1 means no opacity.
</li>
</ul>
<b>Package</b></br>
ggplot2;ggthemes;</br>
<b>Help</b></br>
help(coord_polar, package=ggplot2)</br>
Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_bar),help(cord_polar), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)​
    `}
    }
}
class Coxcomb extends baseModal {
    constructor() {
        var config = {
            id: "Coxcomb",
            label: localization.en.title,
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
                el: new dstVariableList(config, { label: localization.en.x, no: "x", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}},', 'x="{{x|safe}}",', '{{x|safe}}', '{{x|safe}}', ' X aesthetic: {{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: localization.en.y, no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['y={{y|safe}},', 'y="{{y|safe}}",', 'y="{{y|safe}}",', '{{y|safe}}', ' Y aesthetic: {{y|safe}}']
            },
            color: {
                el: new dstVariable(config, { label: localization.en.fill, no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: ['fill={{color|safe}}', ',group={{color|safe}}', ',color="{{color|safe}}"', '{{color|safe}}', ' fill: {{color|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: localization.en.alpha,
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
                    label: localization.en.width,
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['width={{width|safe}},']
            },
            rdgrp1: {
                el: new checkbox(config, {
                    label: localization.en.rdgrp1,
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "rdgrp1"
                })
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, newline: true, no: "flipaxis" }), r: ' coord_flip() +' },
            barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: localization.en.barcolor,
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
                    no: 'title',
                    label: localization.en.specify_a_title,
                    placeholder: "Chart title",
                    allow_spaces:true,
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
                    allow_spaces:true,
                    label: localization.en.y_title,
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
                name: localization.en.navigation,
                icon: "icon-coxcomb",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        this.help = localization.en.help;
    }
    prepareExecution(instance) {
        var res = [];
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
            res.push({ cmd: cmd, cgid: newCommandGroup() })
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
                res.push({ cmd: cmd, cgid: newCommandGroup() })
            }
            )
        }
        return res;
    }
}
module.exports.item = new Coxcomb().render()