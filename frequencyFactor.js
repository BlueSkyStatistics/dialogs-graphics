/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "Frequency Chart",
        navigation: "Frequencies",
        x: "X axis",
        y: "Color, specify a factor variable",
        bins: "Number of bins (applies only when the variable on the X axis is a factor variable)",
        barcolor: "Line Color (After color selection, click outside the control to apply)",
        tab1: "Numeric",
        tab2: "Factor",
        alpha: "Opacity (0-1)",
        flip: "Flip Axis",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        facets_lbl : "Facets",
        help: {
            title: "Frequency Chart",
            r_help: "help(geom_freqpoly, package='ggplot2')",
            body: `
            <b>Description</b></br>
            Visualise the distribution of a single continuous variable by dividing the x axis into bins and counting the number of observations in each bin. Histograms (geom_histogram()) display the counts with bars; frequency polygons (geom_freqpoly()) display the counts with lines. Frequency polygons are more suitable when you want to compare the distribution across the levels of a categorical variable. </br>
            NOTE: We ignore the color selected if there is a grouping/color variable specified as a different color is selected for each level of the grouping variable.</br>
            When you specify multiple x variables, we create a separate Frequency chart for each x variable.</br>
            <b>Usage</b>
            <br/>
            <code>
            #You can create a Frequency chart for one or more numeric variables. The default number of bins is set to 30.</br>
            #The example below uses the mtcars dataset in the datasets package<br/>
            ggplot(data=mtcars, aes(x=mpg  )) +
                geom_freqpoly(  bins =30, alpha=1, color ="#727272" )​</br></br>
            
            #You can create a Frequency chart for one or more numeric variables and group the chart by a factor variable. The default number of bins is set to 30.</br>
            #The example below uses the mtcars dataset in the datasets package<br/>
            ggplot(data=mtcars, aes(x=mpg,colour=cyl ,group=cyl )) +
                geom_freqpoly(  bins =30, alpha=1,)</br></br>
            
            #You can create a frequency chart/line chart by grouping one factor variable by another</br>
            #You need to right click on cyl and am in the variable view to make it a factor</br>
            ggplot(data=mtcars, aes(x=cyl,colour=am ,group=am )) +
                geom_freqpoly(stat = "Count",alpha=1,)</br></br>
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
            group:  An optional factor/categorical variable. 
            </li>
            <li>
            geom_freqpoly(): Creates the frequency plot
            </li>
            <li>
            bins: Number of bins.
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
            help(geom_freqpoly,package=ggplot2)</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_freqpoly), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)​           
      `}
    }
}
class frequencyFactor extends baseModal {
    constructor() {
        var config = {
            id: "frequencyFactor",
            label: localization.en.title,
            modalType: "two",
            RCode: `## [Frequency Plot]
require(ggplot2);
require(ggthemes);
{{ if (options.selected.frequency_type === "0") }}
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.y[1] | safe}} )) +
    geom_freqpoly({{if (options.selected.bins != "")}}  bins ={{selected.bins | safe}},{{/if}} {{selected.alpha | safe}}{{if (options.selected.y[0] =="")}} {{if (options.selected.barcolor != "")}} , color ="{{selected.barcolor | safe}}" {{/if}}{{/if}}) +
    labs({{selected.x[1] | safe}},y ="Counts" {{selected.y[2] | safe}}, title= "Frequency chart for variable {{selected.x[3] | safe}}  {{selected.y[3] | safe}}") +
    xlab("{{selected.x_label|safe}}") + 
    ylab("{{selected.y_label|safe}}") + 
    {{selected.title|safe}}
    {{selected.flipaxis | safe}}
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}
{{ if (options.selected.frequency_type === "1") }}
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.y[1] | safe}} )) +
    geom_freqpoly(stat = "Count",{{selected.alpha | safe}}) +
    labs({{selected.x[1] | safe}},y ="Counts" {{selected.y[2] | safe}}, title= "Frequency chart for variable {{selected.x[3] | safe}} {{selected.y[3] | safe}}") +
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
            x: {
                el: new dstVariableList(config, { label: localization.en.x, no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: localization.en.y, no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',colour={{y|safe}}', ',group={{y|safe}}', ',colour="{{y|safe}}"', 'grouped by levels of variable {{y|safe}}', '{{y|safe}}']
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
            bins: {
                el: new inputSpinner(config, {
                    no: "bins",
                    label: localization.en.bins,
                    min: 0,
                    max: 100000,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                }), r: ['{{bins|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, no: "flipaxis" }), r: ' coord_flip() +' },
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
                    allow_spaces:true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    allow_spaces:true,
                    label: localization.en.x_title,
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
                objects.x.el.content,
                objects.y.el.content,
                objects.alpha.el.content,
                objects.flipaxis.el.content,
                objects.bins.el.content,
                objects.barcolor.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-frequency_graph_fixed",
                onclick: `r_before_modal('${config.id}')`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts;
        this.help = localization.en.help;
    }
    prepareExecution(instance) {
        let allColAttr = fetchAllColumnAttributes()
        let colinfo = {};
        var res = [];
        let cmd ="";
        let count = 0;
        instance.objects.x.el.getVal().forEach(function (value) {
            colinfo = allColAttr[value]      
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    y: instance.dialog.prepareSelected({ y: instance.objects.y.el.getVal()[0] }, instance.objects.y.r),
                    x: instance.dialog.prepareSelected({ x: value }, instance.objects.x.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    bins: instance.dialog.prepareSelected({ bins: instance.objects.bins.el.getVal() }, instance.objects.bins.r),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            if (colinfo.ColClass =="factor" || colinfo.ColClass =="ordinal")
            {
                code_vars.selected.frequency_type= "1"
            }
            else
            {
                code_vars.selected.frequency_type= "0"
            }
            if ( code_vars.selected.frequency_type ==1 && code_vars.selected.y[4] ==""  )
            {   
                cmd = "cat(\"ERROR. As the x variable: " + value + " is a factor, you must specify a color/grouping variable\")"
                res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else
            {
                code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
                code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? "Counts" : instance.opts.config.content[2].getVal()
                code_vars.selected["barcolor"] = instance.objects.barcolor.el.getVal()
                code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
                code_vars.selected.themes = themeRsyntax;
                cmd = instance.dialog.renderR(code_vars)
                cmd = removenewline(cmd);
                if (count == 0) {
                    res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
                }
                else {
                    res.push({ cmd: cmd, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
                }
                count++
            }
        })
        return res;
    }
}
module.exports.item = new frequencyFactor().render()