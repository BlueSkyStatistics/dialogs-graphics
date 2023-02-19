var localization = {
    en: {
        title: "Box Plot",
        dropna: "Drop missing values",
        navigation: "Box Plot",
        x: "X variable, specify a factor variable",
        y: "Y variable(s), specify a numeric variable(s)",
        fill: "Fill, specify a factor variable",
        dataPoints: "Select an option to plot data points",
        alpha: "Opacity (0-1)",
        flip: "Flip axis",
        notch: "Notch",
        outliers: "Show Outliers (In Red)",
        specify_a_title: "Enter a title",
        x_title: "X Axis Label",
        y_title: "Y Axis Label",
        barcolor: "Select a color for the lines around the boxes (After color selection, click outside the control to apply)",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        help: {
            title: "Box Plot",
            r_help: "help(geom_boxplot, package=ggplot2)",
            body: `
        <b>Description</b></br>
        In descriptive statistics, a box plot or boxplot is a convenient way of graphically depicting groups of numerical data through their quartiles. Box plots may also have lines extending vertically from the boxes (whiskers) indicating variability outside the upper and lower quartiles, hence the terms box-and-whisker plot and box-and-whisker diagram. Outliers may be plotted as individual points. Box and whisker plots are uniform in their use of the box: the bottom and top of the box are always the first and third quartiles, and the band inside the box is always the second quartile (the median). The upper whisker extends from the hinge to the highest value that is within 1.5 * IQR of the hinge, where IQR is the inter-quartile range, or distance between the first and third quartiles. The lower whisker extends from the hinge to the lowest value within 1.5 * IQR of the hinge. Data beyond the end of the whiskers are outliers and plotted as points (as specified by Tukey).​</br>
        Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​</br>
        When you select the option to plot the data points, we do so using geom_dotplot</br>
        By default outliers are shown with black points, when you select the option to show outliers (In Red) via the checkbox, outliers are made more prominent.
        <br/>
        <b>Usage</b>
        <br/>
        <code> 
        ggplot(data =Dataset,aes(x = var1,y = var2,fill = var3)) + geom_boxplot()  + 
        geom_dotplot(binaxis = 'y',stackdir = 'center',dotsize = 0.1)+ coord_flip()+ labs(x = "var1",y = "var2",fill = "var3")   +facet_grid(var4~.)​
        </code> <br/>
        <b>Arguments</b><br/>
        <ul>
        <li>
        data: The default dataset​
        </li>
        <li>
        x: A factor/categorical variable that defines the grouping of the y variable​
        </li>
        <li>
        y: A numeric  variable for which the boxplot is calculated​
        </li>
        <li>
        fill: An optional factor/categorical variable to further group the existing groups. Each sub group will be shown in a distinct color.​
        </li>
        <li>
        aes():    Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.​
        </li>
        <li>
        geom_boxplot():Creates the boxplot. The upper and lower "hinges" correspond to the first and third quartiles (the 25th and 75th percentiles).​
        </li>
        <li>
        geom_dotplot: Plots the data points
        </li>
        <li>
        Labs(): Change axis labels and legend titles (This is optional)​
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
        notch: Notched box plots apply a "notch" or narrowing of the box around the median. Notches are useful in offering a rough guide to significance of difference of medians; if the notches of two boxes do not overlap, this offers evidence of a statistically significant difference between the medians. In a notched box plot, the notches extend 1.58 * IQR / sqrt(n)
        </li>
        </ul>
        <b>Package</b></br>
        ggplot2;ggthemes;stringr</br>
        <b>Help</b></br>
        help(geom_boxplot, package=ggplot2)</br>
        Click the R Help button to get detailed R help. You can also enter help(geom_boxplot), help(labs), help(aes), help(facet_grid), help(theme_calc), help(coord_flip), help (geom_dotplot)
        `}
    }
}
class boxPlotModal extends baseModal {
    constructor() {
        var config = {
            id: "boxPlot",
            label: localization.en.title,
            modalType: "two",
            RCode: `## [Box Plot]
require(ggplot2);
require(ggthemes);
{{dataset.name}}  %>% {{if (options.selected.dropna )}}tidyr::drop_na({{if(options.selected.x[3] !="")}}{{selected.x[3] | safe}}{{/if}} {{if(options.selected.y[3] !="")}},{{selected.y[3] | safe}}{{/if}}{{if(options.selected.Facetrow[0] !='')}},{{selected.Facetrow | safe}}{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},{{selected.Facetcolumn | safe}}{{/if}}{{if(options.selected.Facetwrap[0] !='')}},{{selected.Facetwrap | safe}}{{/if}} ) %>%{{/if}}
ggplot( aes({{if (options.selected.x[0] != "")}}{{selected.x[0] | safe}}{{/if}}{{selected.y[0] | safe}} {{selected.GroupBy[0] | safe}} )) +
    geom_boxplot({{if (options.selected.barcolor != "")}} col ="{{selected.barcolor | safe}}",{{/if}} {{selected.outliers | safe }}{{selected.alpha[0] | safe}}{{selected.notch | safe}}) +
    {{if (options.selected.chart  =="Stacked")}}geom_dotplot(binaxis = 'y',stackdir = 'center',dotsize = 0.1) +{{/if}}{{ if (options.selected.chart  =="Jitter")}}geom_jitter(shape = 16,position = position_jitter(0.2)) +{{/if}}
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}, title= "Boxplot for variable: {{selected.y[3] | safe}}{{if (options.selected.x[0] != "")}}, grouped by: {{selected.x[3] | safe}}{{/if}}{{if (options.selected.GroupBy[1] != "")}}{{selected.GroupBy[1] | safe}}{{/if}}") +
    xlab("{{selected.x_label|safe}}") + ylab("{{selected.y_label|safe}}") + {{selected.title|safe}}  {{selected.flipaxis | safe}}  {{selected.Facets | safe}} + {{selected.themes | safe}}  
`,
            pre_start_r: JSON.stringify({
                //Anil add 3 lines below
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, { label: localization.en.y, no: "y", required: true, filter: "Numeric|Scale" }),
                r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, { label: localization.en.x, no: "x", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            GroupBy: {
                el: new dstVariable(config, { label: localization.en.fill, no: "GroupBy", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',fill = {{GroupBy|safe}}', ', filled by: {{GroupBy|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: localization.en.alpha,
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, no: "flipaxis" }), r: ' coord_flip() +' },
            notch: { el: new checkbox(config, { label: localization.en.notch, no: "notch" }), r: ' notch = TRUE' },
            outliers: { el: new checkbox(config, { label: localization.en.outliers, no: "outliers" }), r: 'outlier.colour= "red ",outlier.shape=8,outlier.size = 2,' },
            dataPoints: {
                el: new comboBox(config, {
                    no: 'dataPoints',
                    label: localization.en.dataPoints,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "Stacked", "Jitter"],
                    default: "none"
                })
            },
            specify_a_title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: localization.en.specify_a_title,
                    placeholder: "Chart title",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: localization.en.x_title,
                    placeholder: "X Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: localization.en.y_title,
                    placeholder: "Y Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: localization.en.barcolor,
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })
            },

            dropna: {
                el:new checkbox(config, { label: localization.en.dropna, no: "dropna", extraction: "Boolean" 
            }
            )},

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
        }
        var opts = new optionsVar(config, {
            no: "boxplot_options",
            content: [
                objects.specify_a_title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.barcolor.el,
                objects.dropna.el,

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
                objects.y.el.content,
                objects.x.el.content,
                objects.GroupBy.el.content,
                objects.alpha.el.content,
                objects.dataPoints.el.content,
                objects.flipaxis.el.content,
                objects.notch.el.content,
                objects.outliers.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-box_plot",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts;
        this.help = localization.en.help
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
                    GroupBy: instance.dialog.prepareSelected({ GroupBy: instance.objects.GroupBy.el.getVal()[0] }, instance.objects.GroupBy.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    notch: instance.objects.notch.el.getVal() ? instance.objects.notch.r : "",
                    outliers: instance.objects.outliers.el.getVal() ? instance.objects.outliers.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    barcolor: instance.opts.config.content[3].getVal(),
                    chart: instance.objects.dataPoints.el.getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    dropna: instance.objects.dropna.el.getVal()
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            if (code_vars.selected.Facetrow[0] ==undefined )
            {
                code_vars.selected.Facetrow[0] =""
            }
            if (code_vars.selected.Facetcolumn[0] ==undefined )
            {
                code_vars.selected.Facetcolumn[0] =""
            }
            if (code_vars.selected.Facetwrap[0] ==undefined )
            {
                code_vars.selected.Facetwrap[0] =""
            }
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
        })
        return res;
    }
}
module.exports.item = new boxPlotModal().render()