
var localization = {
    en: {
        title: "Scatter Plot",
        navigation: "Scatter Plot",
        x: "X variable, specify a numeric variable",
        y: "Y variable, specify a numeric variable(s)",
        Fill: "Color, specify a factor variable",
        size: "Make the size of the point proportional to",
        shape: "Shape",
        alpha: "Opacity (0-1)",
        flipaxis: "Flip axis",
        jitter: "Apply jitter effect",
        sm: "Smoothing model",
        lineColor: "Color of the smoothing line (click outside color control to select)",
        se: "Plot standard errors",
        bins: "Number of bins",
        squaredbins: "Number of bins",
        tab1: "Points",
        tab2: "Binned Hex",
        tab3: "Binned Square",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        help: {
            title: "Scatter Plot",
            r_help: "help(geom_point, package='ggplot2')",
            body: `
            <b>Description</b></br>
            Creates a scatter plot, allows you to optionally group points by a factor variable, optionally make the size of the points proportional to a numeric variable, optionally add a smoothing line, optionally make the opacity of a point proportional to a numeric variable. You can also optionally create facets, themes and specify a title and labels for the x and y axis.
            When multiple y variables are specified, a separate graph is drawn for every Y variable against the X variable.​
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            ggplot(data=Dataset,aes(x =var1,y=var2,color=var3,size=var4,alpha=var5,shape=var6)) +
             geom_point( position="jitter") +
             labs(x ="var1",y ="var2",color ="var3",title= "Scatter plot for ...") +
             geom_smooth(method ="lm",color="red",se=TRUE)
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: The default dataset​
            </li>
            <li>
            aes():Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.
            </li>
            <li>
            x: the numeric variable plotted on the x axis​
            </li>
            <li>
            y: the numeric variable plotted on the y axis​
            </li>
            <li>
            color: A factor variable to group points by. Each group is shown in a different color.​
            </li>
            <li>
            size: a numeric variable that the size of the point is proportional to​
            </li>
            <li>
            alpha: A numeric variable that the transparency of a point is proportional to​
            </li>
            <li>
            geom_point():The point geom is used to create scatterplots.​
            </li>
            <li>
            Labs(): Change axis labels and legend titles(This is optional)​
            </li>
            <li>
            geom_smooth() : Adds a smoothed conditional mean(This is optional)​
            </li>
            <li>
            facet_grid(): Lay out panels in a grid(This is optional)​
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;</br>
            <b>Help</b></br>
            help(geom_point, package=ggplot2)</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(geom_point), help(labs), help(geom_smooth), help(aes), help(facet_grid), help(theme_excel)​
    `}
    }
}
class scatterPlot extends baseModal {
    constructor() {
        var config = {
            id: "scatterPlot",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(ggplot2);
require(ggthemes);
require(stringr);
{{ if (options.selected.sm == "rlm") }}require(MASS);{{/if}}
{{ if (options.selected.scatter_type === "0") }}
## [Scatterplot (Points)]
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}}{{selected.fill[0] | safe}}{{selected.size[0] | safe}}{{selected.shape[0] | safe}})) +
    {{selected.jitter | safe}}
    {{if (options.selected.sm != "")}}geom_smooth( method ="{{selected.sm | safe}}", alpha={{selected.opacity | safe}}, se={{selected.se | safe}},{{if (options.selected.fill[0] == "")}}{{if (options.selected.lineColor != "")}} , col ="{{selected.lineColor | safe}}"{{/if}}{{/if}}) + {{/if}} 
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}{{selected.fill[1] | safe}},title= "Scatterplot for {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.fill[2] | safe}}") +
    xlab("{{selected.x_label | safe}}") +
    ylab("{{selected.y_label | safe}}") +
    {{selected.title | safe}}
    {{selected.flip | safe}}
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}
{{ if (options.selected.scatter_type === "1") }}
## [Scatterplot (Bin-Hex)]
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}})) +
	 geom_hex( stat = "binhex",position = "identity",aes ({{selected.fill[0] | safe}}),alpha={{selected.opacity | safe}},bins={{selected.bins | safe}}) +
     labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}{{selected.fill[1] | safe}},title= "Binned Scatterplot (Hex) for {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.fill[2] | safe}}") +
     xlab("{{selected.x_label|safe}}") +
     ylab("{{selected.y_label|safe}}") +
     {{selected.title | safe}}
     {{selected.flip | safe}}
     {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}
{{ if (options.selected.scatter_type === "2") }}
## [Scatterpoint (Bin Squared)]
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}})) +
	 geom_tile( stat = "bin2d",position = "identity",aes ({{selected.fill[0] | safe}}),alpha={{selected.opacity | safe}},bins={{selected.squaredBins | safe}}) +
     labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}{{selected.fill[1] | safe}},title= "Binned Scatterplot (Square) for {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.fill[2] | safe}}") +
     xlab("{{selected.x_label|safe}}") +
     ylab("{{selected.y_label|safe}}") +
     {{selected.title|safe}}
     {{selected.flip}}
     {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}`,
            pre_start_r: JSON.stringify({
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        objects;
        var objects = {
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, {
                    label: localization.en.y,
                    no: "y",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: localization.en.x,
                    no: "x",
                    filter: "Numeric|Scale",
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
                }), r: 'coord_flip() + '
            },
            jitter: {
                el: new checkbox(config, {
                    label: localization.en.jitter,
                    no: "Jitter",
                    newline: true,
                    extraction: "Boolean",
                }), r: 'geom_point( position=\"jitter\") +'
            },
            sm: {
                el: new comboBox(config, {
                    no: 'sm',
                    label: localization.en.sm,
                    multiple: false,
                    newline: true,
                    options: ["lm", "glm", "gam", "loess", "rlm", ""],
                    default: ""
                })
            },
            lineColor: {
                el: new colorInput(config, {
                    no: 'lineColor',
                    label: localization.en.lineColor,
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })
            },
            se: {
                el: new checkbox(config, {
                    label: localization.en.se,
                    no: "se",
                    extraction: "Boolean",
                }), r: 'TRUE'
            },
            bins: {
                el: new advancedSlider(config, {
                    no: "bins",
                    style: "ml-1",
                    label: localization.en.bins,
                    min: 0,
                    max: 100,
                    step: 10,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
            },
            squaredBins: {
                el: new advancedSlider(config, {
                    no: "squaredBins",
                    style: "ml-1",
                    label: localization.en.squaredbins,
                    min: 0,
                    max: 100,
                    step: 10,
                    value: 30,
                    extraction: "NoPrefix|UseComma"
                })
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
            tabs: {}
        }
        const tab1 = {
            state: "active",
            no: "Points",
            label: localization.en.tab1,
            content: [objects.jitter.el.content, objects.sm.el.content, objects.lineColor.el.content, objects.se.el.content].join("")
        }
        const tab2 = {
            state: "",
            no: "binHex",
            label: localization.en.tab2,
            content: [objects.bins.el.content].join("")
        }
        const tab3 = {
            state: "",
            no: "binSq",
            label: localization.en.tab3,
            content: [objects.squaredBins.el.content].join("")
        }
        objects.tabs = {el : new tabsView(config, { no: "bar_type", tabs: [tab1, tab2, tab3], extraction: "NoPrefix" })}
        var opts = new optionsVar(config, {
            no: "Scatterplot_options",
            content: [
                new input(config, {
                    no: "title",
                    label: localization.en.specify_a_title,
                    allow_spaces:true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                }),
                new input(config, {
                    no: 'x_title',
                    label: localization.en.x_title,
                    allow_spaces:true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                }),
                new input(config, {
                    no: 'y_title',
                    label: localization.en.y_title,
                    allow_spaces:true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                })
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
            right: [objects.y.el.content, objects.x.el.content, objects.fill.el.content, objects.size.el.content, objects.shape.el.content, objects.opacity.el.content, objects.checkbox.el.content],
            bottom: [new labelVar(config, { label: "Select the type of Scatterplot", h: 5 }).content, objects.tabs.el.content, opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-scatter_plot",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.tabs = objects.tabs
        this.opts = opts
        this.help = localization.en.help;
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
                    fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal()[0] }, instance.objects.fill.r),
                    scatter_type: instance.tabs.el.getActive('el-index'),
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    jitter: instance.objects.jitter.el.getVal() ? instance.objects.jitter.r : "geom_point() +\n",
                    lineColor: instance.objects.lineColor.el.getVal(),
                    se: instance.objects.se.el.getVal() ? instance.objects.se.r : "FALSE",
                    bins: instance.objects.bins.el.getVal(),
                    squaredBins: instance.objects.squaredBins.el.getVal(),
                    sm: instance.objects.sm.el.getVal(),
                    size: instance.dialog.prepareSelected({ size: instance.objects.size.el.getVal()[0] }, instance.objects.size.r),
                    shape: instance.dialog.prepareSelected({ shape: instance.objects.shape.el.getVal()[0] }, instance.objects.shape.r),
                    opacity: instance.objects.opacity.el.getVal(),
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
        })
        return res;
    }
}
module.exports.item = new scatterPlot().render()