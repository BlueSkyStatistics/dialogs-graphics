
class scatterPlot extends baseModal {
    static dialogId = 'scatterPlot'
    static t = baseModal.makeT(scatterPlot.dialogId)

    constructor() {
        var config = {
            id: scatterPlot.dialogId,
            label: scatterPlot.t('title'),
            modalType: "two",
            RCode: `
require(ggplot2);
require(ggthemes);
require(stringr);
{{ if (options.selected.sm == "rlm") }}require(MASS);{{/if}}
{{ if (options.selected.scatter_type === "0") }}
## [Scatterplot (Points)]
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}}{{selected.fill[0] | safe}}{{selected.size[0] | safe}}{{selected.shape[0] | safe}})) +
  {{if (options.selected.sm != "")}}geom_smooth( method ="{{selected.sm | safe}}", alpha={{selected.opacity | safe}}, se={{selected.se | safe}},{{if (options.selected.fill[0] == "")}}{{if (options.selected.lineColor != "")}} , col ="{{selected.lineColor | safe}}"{{/if}}{{/if}}) + {{/if}} 
  {{selected.jitter | safe}}
  {{if (options.selected.referenceLines !="")}}{{selected.referenceLines | safe}}{{/if}}
  labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}{{selected.fill[1] | safe}},title= "Scatterplot for {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.fill[2] | safe}}") +
  xlab("{{selected.x_label | safe}}") +
  ylab("{{selected.y_label | safe}}") +
  {{selected.title | safe}}
  {{selected.flip | safe}}
  {{if (options.selected.rangeXValues !="")}}xlim({{selected.rangeXValues | safe}})+{{/if}}
  {{if (options.selected.rangeYValues !="")}}ylim({{selected.rangeYValues | safe}})+{{/if}}
  {{selected.Facets | safe}} + {{selected.themes | safe}}
  {{if (options.selected.sm != "")}}
\nBSkyModel <- {{selected.sm | safe}}({{selected.y[3] | safe}}~{{selected.x[3] | safe}}, data={{dataset.name}})
summary_model <- summary(BSkyModel)
r_squared <- summary_model$r.squared
adj_r_squared <- summary_model$adj.r.squared
mat <- matrix(c(r_squared, adj_r_squared), nrow = 2, ncol = 1)
rownames(mat) <- c("Rsq", "Adjusted Rsq")
colnames(mat)=c("Values")
BSkyFormat(mat, singleTableOutputHeader="Fitted model statistics")
{{/if}}
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
   {{if (options.selected.rangeXValues !="")}}xlim({{selected.rangeXValues | safe}})+{{/if}}
   {{if (options.selected.rangeYValues !="")}}ylim({{selected.rangeYValues | safe}})+{{/if}}
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
          var objects = {
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, {
                    label: scatterPlot.t('y'),
                    no: "y",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: scatterPlot.t('x'),
                    no: "x",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: scatterPlot.t('Fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',color={{fill|safe}}', ',color="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"']
            },
            size: {
                el: new dstVariable(config, {
                    label: scatterPlot.t('size'),
                    no: "size",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',size={{size|safe}}', ',size="{{size|safe}}"', ', Size: {{size|safe}}', ',"{{size|safe}}"']
            },
            shape: {
                el: new dstVariable(config, {
                    label: scatterPlot.t('shape'),
                    no: "shape",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: [',shape={{shape|safe}}', ',shape="{{shape|safe}}"', ', Shape: {{shape|safe}}', ',"{{shape|safe}}"']
            },
            checkbox: {
                el: new checkbox(config, {
                    label: scatterPlot.t('flipaxis'),
                    no: "flipBox",
                    extraction: "Boolean",
                }), r: 'coord_flip() + '
            },
            jitter: {
                el: new checkbox(config, {
                    label: scatterPlot.t('jitter'),
                    no: "Jitter",
                    newline: true,
                    extraction: "Boolean",
                }), r: 'geom_point( position=\"jitter\") +'
            },
            sm: {
                el: new comboBox(config, {
                    no: 'sm',
                    label: scatterPlot.t('sm'),
                    multiple: false,
                    newline: true,
                    options: ["lm", "glm", "gam", "loess", "rlm", ""],
                    default: ""
                })
            },
            lineColor: {
                el: new colorInput(config, {
                    no: 'lineColor',
                    label: scatterPlot.t('lineColor'),
                    placeholder: "#727272",
                    allow_spaces: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })
            },
            se: {
                el: new checkbox(config, {
                    label: scatterPlot.t('se'),
                    no: "se",
                    extraction: "Boolean",
                }), r: 'TRUE'
            },
            bins: {
                el: new advancedSlider(config, {
                    no: "bins",
                    style: "ml-1",
                    label: scatterPlot.t('bins'),
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
                    label: scatterPlot.t('squaredbins'),
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
                    label: scatterPlot.t('alpha'),
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
                    label: scatterPlot.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: scatterPlot.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: scatterPlot.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: scatterPlot.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: "title",
                    label: scatterPlot.t('specify_a_title'),
                    allow_spaces: true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                })
            },
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: scatterPlot.t('x_title'),
                    allow_spaces: true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                })
            },
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: scatterPlot.t('y_title'),
                    allow_spaces: true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: {
                el: new labelVar(config, {
                    label: scatterPlot.t('label1'),
                    style: "mt-3",
                    h: 5
                })
            },
            yIntercept: {
                el: new input(config, {
                    no: 'yIntercept',
                    label: scatterPlot.t('yIntercept'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            hLineColor: {
                el: new colorInput(config, {
                    no: 'hLineColor',
                    label: scatterPlot.t('hLineColor'),
                    placeholder: "#e22c2c   ",
                    allow_spaces: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#e22c2c"
                })
            },
            lineType: {
                el: new comboBox(config, {
                    no: 'lineType',
                    label: scatterPlot.t('lineType'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dashed"
                })
            },
            horizontalLinelabel: {
                el: new input(config, {
                    no: 'horizontalLinelabel',
                    label: scatterPlot.t('horizontalLinelabel'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            verticalJustification: {
                el: new inputSpinner(config, {
                    no: 'verticalJustification',
                    label: scatterPlot.t('verticalJustification'),
                    min: -100000,
                    max: 100000,
                    step: 0.01,
                    value: -0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },

            veri_VerticalJustification: {
                el: new inputSpinner(config, {
                    no: 'veri_VerticalJustification',
                    label: scatterPlot.t('veri_VerticalJustification'),
                    min: -100000,
                    max: 100000,
                    step: 0.01,
                    value: 0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },
            labelVeri_VerticalJustification: {
                el: new labelVar(config, {
                    label: scatterPlot.t('labelVeri_VerticalJustification'),
                    style: "mt-3",
                    h: 9
                })
            },


            label2: {
                el: new labelVar(config, {
                    label: scatterPlot.t('label2'),
                    style: "mt-3",
                    h: 9
                })
            },
            label3: {
                el: new labelVar(config, {
                    label: scatterPlot.t('label3'),
                    style: "mt-3",
                    h: 5
                })
            },
            xIntercept: {
                el: new input(config, {
                    no: 'xIntercept',
                    label: scatterPlot.t('xIntercept'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            vLineColor: {
                el: new colorInput(config, {
                    no: 'vLineColor',
                    label: scatterPlot.t('vLineColor'),
                    placeholder: "#e22c2c",
                    allow_spaces: true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#e22c2c"
                })
            },
            vlineType: {
                el: new comboBox(config, {
                    no: 'vlineType',
                    label: scatterPlot.t('vlineType'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dashed"
                })
            },
            verticalLinelabel: {
                el: new input(config, {
                    no: 'verticalLinelabel',
                    label: scatterPlot.t('verticalLinelabel'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            horizontalJustification: {
                el: new inputSpinner(config, {
                    no: 'horizontalJustification',
                    label: scatterPlot.t('horizontalJustification'),
                    min: -100000,
                    max: 100000,
                    step: 0.01,
                    value: -1.0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            hori_HorizontalJustification: {
                el: new inputSpinner(config, {
                    no: 'hori_HorizontalJustification',
                    label: scatterPlot.t('hori_HorizontalJustification'),
                    min: -100000,
                    max: 100000,
                    step: 0.01,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            labelHori_HorizontalJustification: {
                el: new labelVar(config, {
                    label: scatterPlot.t('labelHori_HorizontalJustification'),
                    style: "mt-3",
                    h: 9
                })
            },
            label4: {
                el: new labelVar(config, {
                    label: scatterPlot.t('label4'),
                    style: "mt-3",
                    h: 9
                })
            },
            label5: {
                el: new labelVar(config, {
                    label: scatterPlot.t('label5'),
                    style: "mt-3",
                    h: 9
                })
            },
            rangeXValues: {
                el: new input(config, {
                    no: 'rangeXValues',
                    label: scatterPlot.t('rangeXValues'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            rangeYValues: {
                el: new input(config, {
                    no: 'rangeYValues',
                    label: scatterPlot.t('rangeYValues'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
        }
        const tab1 = {
            state: "active",
            no: "Points",
            label: scatterPlot.t('tab1'),
            content: [objects.jitter.el.content, objects.sm.el.content, objects.lineColor.el.content, objects.se.el.content].join("")
        }
        const tab2 = {
            state: "",
            no: "binHex",
            label: scatterPlot.t('tab2'),
            content: [objects.bins.el.content].join("")
        }
        const tab3 = {
            state: "",
            no: "binSq",
            label: scatterPlot.t('tab3'),
            content: [objects.squaredBins.el.content].join("")
        }
        // objects.tabs = {el : new tabsView(config, { no: "bar_type", tabs: [tab1, tab2, tab3], extraction: "NoPrefix" })}
        var tabs = new tabsView(config, { no: "bar_type", tabs: [tab1, tab2, tab3], extraction: "NoPrefix" })
        var opts = new optionsVar(config, {
            no: "Scatterplot_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el
            ]
        })
        var addRefLines = {
            el: new optionsVar(config, {
                no: "addRefLines",
                name: scatterPlot.t('addHoriRefLines'),
                content: [
                    objects.label1.el,
                    objects.yIntercept.el,
                    objects.hLineColor.el,
                    objects.lineType.el,
                    objects.horizontalLinelabel.el,
                    objects.verticalJustification.el,
                    objects.label2.el,
                    
                    objects.hori_HorizontalJustification.el,
                    objects.labelHori_HorizontalJustification.el,

                    objects.label3.el,
                    objects.xIntercept.el,
                    objects.vLineColor.el,
                    objects.vlineType.el,
                    objects.verticalLinelabel.el,
                    objects.horizontalJustification.el,
                    objects.label4.el,

                    objects.veri_VerticalJustification.el,
                    objects.labelVeri_VerticalJustification.el,


                ]
            })
        };
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: scatterPlot.t('facets_lbl'),
                content: [
                    objects.Facetrow.el,
                    objects.Facetcolumn.el,
                    objects.Facetwrap.el,
                    objects.Facetscale.el,
                ]
            })
        };
        var xyLimits = {
            el: new optionsVar(config, {
                no: "xyLimits",
                name: scatterPlot.t('xyLimits'),
                content: [
                    objects.label5.el,
                    objects.rangeXValues.el,
                    objects.rangeYValues.el
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.y.el.content, objects.x.el.content, objects.fill.el.content, objects.size.el.content, objects.shape.el.content, objects.opacity.el.content, objects.checkbox.el.content],
            bottom: [new labelVar(config, {no: "selplot", label: scatterPlot.t('selplot'), h: 5 }).content, tabs.content, opts.content, Facets.el.content, addRefLines.el.content, xyLimits.el.content],
            nav: {
                name: scatterPlot.t('navigation'),
                icon: "icon-scatter_plot",
                onclick: `r_before_modal("${config.id}")`,
                positionInNav: 0,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.tabs = tabs
        this.opts = opts
        
        this.help = {
            title: scatterPlot.t('help.title'),
            r_help: "help(data,package='utils')",
            body: scatterPlot.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let count = 0
        instance.objects.y.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    y: instance.dialog.prepareSelected({ y: value }, instance.objects.y.r),
                    fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal()[0] }, instance.objects.fill.r),
                    scatter_type: instance.tabs.getActive('el-index'),
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
                    yIntercept: instance.objects.yIntercept.el.getVal(),
                    hLineColor: instance.objects.hLineColor.el.getVal(),
                    lineType: instance.objects.lineType.el.getVal(),
                    horizontalLinelabel: instance.objects.horizontalLinelabel.el.getVal(),
                    verticalJustification: instance.objects.verticalJustification.el.getVal(),
                    hori_HorizontalJustification: instance.objects.hori_HorizontalJustification.el.getVal(),
                    xIntercept: instance.objects.xIntercept.el.getVal(),
                    vLineColor: instance.objects.vLineColor.el.getVal(),
                    vlineType: instance.objects.vlineType.el.getVal(),
                    verticalLinelabel: instance.objects.verticalLinelabel.el.getVal(),
                    horizontalJustification: instance.objects.horizontalJustification.el.getVal(),
                    veri_VerticalJustification: instance.objects.veri_VerticalJustification.el.getVal(),
                    rangeXValues: instance.objects.rangeXValues.el.getVal(),
                    rangeYValues: instance.objects.rangeYValues.el.getVal(),
                }
            }
            //String to hold reference lines
            code_vars.selected.referenceLines = ""
            //String for the y intercept    
            code_vars.selected.horizontalLineCode = ""
            code_vars.selected.horizontalLabelCode = ""
            let yIntercepts = []
            let trimmedValue = ""
            let HorizontalLabelArr =[]
            //Create an array of horizontal line labels
            if (code_vars.selected.horizontalLinelabel != "")
            {
                HorizontalLabelArr = code_vars.selected.horizontalLinelabel.split(","); 
            }
            if (code_vars.selected.yIntercept != "") 
            {  
                yIntercepts = code_vars.selected.yIntercept.split(",");
                yIntercepts.forEach(function (val) {
                //I can have 2 horizontal lines, but may have specified labels for just one
                if (HorizontalLabelArr.length > 0)
                {
                    code_vars.selected.horizontalLinelabel = HorizontalLabelArr.shift().trimStart().trimEnd()
                } else{
                code_vars.selected.horizontalLinelabel =""
                }
                trimmedValue = val.trimStart();
                trimmedValue = val.trimEnd();
                code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\ngeom_hline( yintercept=" + trimmedValue + ", linetype =\"" + code_vars.selected.lineType + "\" ,color = \"" + code_vars.selected.hLineColor + "\") +"
                if (code_vars.selected.horizontalLinelabel == "") {
                    code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\nannotate(\"text\", x = max(as.numeric(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.x[3] + "\")]), na.rm = TRUE), y =" + trimmedValue + ", label = \"\n" + trimmedValue + "\", vjust =" + code_vars.selected.verticalJustification +", hjust =" + code_vars.selected.hori_HorizontalJustification + ",color = \"" + code_vars.selected.hLineColor + "\", size = 5, fontface = \"plain\")+"
                } else {
                    code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\nannotate(\"text\", x = max(as.numeric(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.x[3] + "\")]), na.rm = TRUE), y =" + trimmedValue + ", label =\"" + code_vars.selected.horizontalLinelabel + "\n" + trimmedValue + "\", vjust =" + code_vars.selected.verticalJustification + ", hjust =" + code_vars.selected.hori_HorizontalJustification + ",color = \"" + code_vars.selected.hLineColor + "\", size = 5, fontface = \"plain\")+"
                }
                }
                )
            }
            code_vars.selected.verticalLineCode = ""
            code_vars.selected.verticalLabelCode = ""
            let xIntercepts = []
            trimmedValue = ""
            //String for the x intercept
            let VerticalLabelArr =[]

            //Create an array of horizontal line labels
            if (code_vars.selected.verticalLinelabel != "")
            {
                VerticalLabelArr = code_vars.selected.verticalLinelabel.split(","); 
            }

            if (code_vars.selected.xIntercept != "") {
                xIntercepts = code_vars.selected.xIntercept.split(",");
                xIntercepts.forEach(function (val) {
                    //I can have x intercept drawn for x=1 and x=2 but label specified for x=1
                    if (VerticalLabelArr.length > 0)
                        {
                            code_vars.selected.verticalLinelabel = VerticalLabelArr.shift().trimStart().trimEnd()
                        } else{
                        code_vars.selected.verticalLinelabel =""
                        }

                    trimmedValue = val.trimStart();
                    trimmedValue = val.trimEnd();
                    code_vars.selected.verticalLineCode = code_vars.selected.verticalLineCode + "\ngeom_vline( xintercept=" + trimmedValue + ", linetype =\"" + code_vars.selected.vlineType + "\" ,color = \"" + code_vars.selected.vLineColor + "\") +"
                    if (code_vars.selected.verticalLinelabel == "") {
                        code_vars.selected.verticalLineCode = code_vars.selected.verticalLineCode + "\nannotate(\"text\", y = max(as.numeric(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.y[3] + "\")]), na.rm =TRUE), x =" + trimmedValue + ", label = \"\n" + trimmedValue + "\", hjust =" + code_vars.selected.horizontalJustification +", vjust =" + code_vars.selected.veri_VerticalJustification + ",color = \"" + code_vars.selected.vLineColor + "\", size = 5, fontface = \"plain\")+"
                    } else {
                        //code_vars.selected.verticalLineCode = code_vars.selected.verticalLineCode + "\nannotate(\"text\", y = max(" + code_vars.dataset.name + "[,c(\"" +code_vars.selected.y[3] + "\")]), x =" + trimmedValue +", label =\"" + code_vars.selected.verticalLinelabel + "\n" + trimmedValue +"\", hjust =" + code_vars.selected.horizontalJustification +",color = \"" + code_vars.selected.vLineColor + "\", size = 5, fontface = \"plain\")+"
                        code_vars.selected.verticalLineCode = code_vars.selected.verticalLineCode + "\nannotate(\"text\", y = max(as.numeric(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.y[3] + "\")]), na.rm=TRUE), x =" + trimmedValue + ", label =paste(\"" + code_vars.selected.verticalLinelabel + "\\n\",\"" + trimmedValue + "\"), hjust =" + code_vars.selected.horizontalJustification +", vjust =" + code_vars.selected.veri_VerticalJustification + ",color = \"" + code_vars.selected.vLineColor + "\", size = 5, fontface = \"plain\")+"
                    }
                }
                )
            }
            code_vars.selected.referenceLines = code_vars.selected.horizontalLineCode + code_vars.selected.verticalLineCode
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
    render: () => new scatterPlot().render()
}
