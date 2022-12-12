var localization = {
    en: {
        title: "Histogram",
        navigation: "Histogram",
        x: "X axis, specify a numeric variable(s)",
        bins: "Specify the number of bins",
        binwidth: "Bin width",
        barcolor: "Optionally select a fill color (click outside color control to select)",
        alpha: "Opacity (0-1)",
        flip: "Flip Axis",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        normalCurveColor: "Optionally select a normal curve color (click outside color control to select)",
        rugPlot: "Display a rug plot (suitable for small datasets)",
        normalCurve: "Display a normal curve (Missing values are removed for curve to display)",
        help: {
            title: "Histogram",
            r_help: "help(geom_histogram, package=ggplot2)",
            body: `
            <b>Description</b></br>
            A histogram is a graphical representation of the distribution of numerical data. It is an estimate of the probability distribution of a continuous variable (quantitative variable). You can specify a bib width or use the default, see below. Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis.</br>
            When you have multiple variables selected for the X axis variable, we create a separate histogram for ach x axis variable. We optionally overlay a normal curve and a rug plot</br>
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            ggplot(data=Dataset2,aes(x=engine) )+  geom_histogram(binwidth=10) +labs(x="engine",y="Counts") +  xlab("")​
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
            x: A numeric/scale variable to plot the histogram for .​
            </li>
            <li>
            geom_histogram: Creates a histogram, by default, stat_bin uses 30 bins - this is not a good default, but the idea is to get you experimenting with different binwidths..
            </li>
            <li>
            geom_rug: Creates a rug plot    
            </li>
            <li>
            stat_function: Creates a normal curve (Note: Missing values need to be removed for curve to display)    
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
            coord_flip(): Flip axis(This is optional)
            </li>
            <li>
            alpha: Takes a value between 0-1, 1 means no opacity. The opacity applies to the fill color of the histogram
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;stringr</br>
            <b>Help</b></br>
            help(geom_histogram, package=ggplot2)</br>
            Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_bar), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)​
           `}
    }
}
class histogram extends baseModal {
    constructor() {
        var config = {
            id: "histogram",
            label: localization.en.title,
            modalType: "two",
            RCode: `## [Histogram]
require(ggplot2);
require(ggthemes);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}})) +
    geom_histogram({{if (options.selected.binwidth != "")}}  binwidth ={{selected.binwidth | safe}},{{/if}} {{if (options.selected.bins != "")}}  bins ={{selected.bins | safe}},{{/if}}{{selected.alpha | safe}}{{if (options.selected.barcolor != "")}}  fill ="{{selected.barcolor | safe}}" {{/if}} {{if( options.selected.normalCurve =="TRUE")}}, aes(y =..density..){{/if}}) +
    {{if( options.selected.normalCurve =="TRUE")}}{{selected.normal | safe}}{{/if}}
    {{selected.rugPlot | safe}}
    labs({{selected.x[1] | safe}}, title= "Histogram for variable {{selected.x[3] | safe}}") +
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
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: localization.en.alpha,
                    min: 0,
                    style: "ml-1",
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            bins: {
                el: new input(config, {
                no: 'bins',
                allow_spaces: true,
                type: "numeric",
                width: "w-25",
                value: "9",
                label: localization.en.bins,
                placeholder: "",
                extraction: "TextAsIs"
              }), r: ['{{bins|safe}}']
            },
           binwidth: {
                el: new input(config, {
                no: 'binwidth',
                allow_spaces: true,
                width: "w-25",
                type: "numeric",
                label: localization.en.binwidth,
                placeholder: "",
                extraction: "TextAsIs"
              }), r: ['{{binwidth|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, no: "flipaxis" }), r: ' coord_flip() +' },
                normalCurve: { el: new checkbox(config, { label: localization.en.normalCurve, newline:true, no: "normalCurve" }), r: 'TRUE' },
            rugPlot: { el: new checkbox(config, { label: localization.en.rugPlot, no: "rugPlot", style : "mt-2" }), r: 'geom_rug() +' },
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
            normalCurveColor: {
                el: new colorInput(config, {
                    no: 'normalCurveColor',
                    label: localization.en.normalCurveColor,
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#eaf820"
                }), r: ['{{normalCurveColor|safe}}']
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
        }
        var opts = new optionsVar(config, {
            no: "histogram_options",
            content: [
                new input(config, {
                    no: 'title',
                    allow_spaces:true,
                    label: localization.en.specify_a_title,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                }),
                new input(config, {
                    no: 'x_title',
                    allow_spaces:true,
                    label: localization.en.x_title,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                }),
                new input(config, {
                    no: 'y_title',
                    allow_spaces:true,
                    label: localization.en.y_title,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                }),
                objects.barcolor.el,
                objects.normalCurveColor.el,
                objects.rugPlot.el
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
                objects.x.el.content,
                objects.bins.el.content,
                objects.binwidth.el.content,
                objects.alpha.el.content,
                objects.flipaxis.el.content,
                objects.normalCurve.el.content
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: "Histogram",
                icon: "icon-histogram",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        this.help = localization.en.help
    }
    prepareExecution(instance) {
        var res = [];
        instance.objects.x.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: value }, instance.objects.x.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",   
                    normalCurve: instance.objects.normalCurve.el.getVal() ? instance.objects.normalCurve.r : "",
                    rugPlot: instance.objects.rugPlot.el.getVal() ? instance.objects.rugPlot.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    binwidth: instance.dialog.prepareSelected({ binwidth: instance.objects.binwidth.el.getVal() }, instance.objects.binwidth.r),
                    bins: instance.dialog.prepareSelected({ bins: instance.objects.bins.el.getVal() }, instance.objects.bins.r),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    normalCurveColor: instance.objects.normalCurveColor.el.getVal()
                }
            }
            if (code_vars.selected.normalCurve =="TRUE")
            {
                code_vars.selected.normal = "stat_function(fun = dnorm, args = list(mean = mean(" + code_vars.dataset.name + "$" + value + ", na.rm = TRUE) , sd = sd(" +
                code_vars.dataset.name + "$" + value + ", na.rm = TRUE)) , col = \"" + code_vars.selected.normalCurveColor +"\", size = 2) +\n"
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            if (code_vars.selected.normalCurve =="TRUE")
            {
                code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? "Density" : instance.opts.config.content[2].getVal()
            } else
            {
                code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? "Counts" : instance.opts.config.content[2].getVal()
            }
            code_vars.selected["barcolor"] = instance.objects.barcolor.el.getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
        })
        return res;
    }
}
module.exports.item = new histogram().render()