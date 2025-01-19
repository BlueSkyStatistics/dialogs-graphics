
class histogram extends baseModal {
    static dialogId = 'histogram'
    static t = baseModal.makeT(histogram.dialogId)

    constructor() {
        var config = {
            id: histogram.dialogId,
            label: histogram.t('title'),
            modalType: "two",
            RCode: `## [Histogram]
require(ggplot2);
require(ggthemes);
{{if (options.selected.settingPalette !="")}}{{selected.settingPalette | safe}}{{/if}}
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{if (options.selected.fill[4] !="")}}{{selected.fill[0] | safe}}{{/if}})) +
    geom_histogram({{if (options.selected.binwidth != "")}} binwidth ={{selected.binwidth | safe}},{{/if}} {{if (options.selected.bins != "")}}  bins ={{selected.bins | safe}},{{/if}}{{selected.alpha | safe}}{{if (options.selected.fill[4] =="")}}  fill ="{{selected.barcolor | safe}}" {{/if}} {{if( options.selected.normalCurve =="TRUE")}}, aes(y =after_stat(density)){{/if}}) +
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
                el: new dstVariableList(config, { label: histogram.t('x'), no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: histogram.t('fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',colour={{fill|safe}}', ',fill="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"', "{{fill|safe}}"]
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: histogram.t('alpha'),
                    min: 0,
                    style: "ml-1",
                    max: 1,
                    step: 0.1,
                    value: 0.4,
                }), r: ['alpha={{alpha|safe}},']
            },
            bins: {
                el: new input(config, {
                no: 'bins',
                allow_spaces: true,
                type: "numeric",
                width: "w-25",
                value: "9",
                label: histogram.t('bins'),
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
                label: histogram.t('binwidth'),
                placeholder: "",
                extraction: "TextAsIs"
              }), r: ['{{binwidth|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: histogram.t('flip'), no: "flipaxis" }), r: ' coord_flip() +' },
                normalCurve: { el: new checkbox(config, { label: histogram.t('normalCurve'), newline:true, no: "normalCurve" }), r: 'TRUE' },
            rugPlot: { el: new checkbox(config, { label: histogram.t('rugPlot'), no: "rugPlot", style : "mt-2" }), r: 'geom_rug() +' },
            barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: histogram.t('barcolor'),
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
                    label: histogram.t('normalCurveColor'),
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
                    label: histogram.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: histogram.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: histogram.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: histogram.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: 'title',
                    allow_spaces:true,
                    label: histogram.t('specify_a_title'),
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    allow_spaces:true,
                    label: histogram.t('x_title'),
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    allow_spaces:true,
                    label: histogram.t('y_title'),
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
            })},            
        }
        var opts = new optionsVar(config, {
            no: "histogram_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.barcolor.el,
                objects.normalCurveColor.el,
                objects.rugPlot.el
            ]
        })
        var Facets = {
            el: new optionsVar(config, {
                no: "Facets",
                name: histogram.t('facets_lbl'),
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
                objects.fill.el.content,
                objects.bins.el.content,
                objects.binwidth.el.content,
                objects.alpha.el.content,
                objects.flipaxis.el.content,
                objects.normalCurve.el.content
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: histogram.t('navigation'),
                icon: "icon-histogram",
                onclick: `r_before_modal("${config.id}")`,
				positionInNav: 1,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: histogram.t('help.title'),
            r_help: "help(data,package='utils')",
            body: histogram.t('help.body')
        }

    }
    prepareExecution(instance) {
        var res = [];

        var dataset = getActiveDataset();
                   
        var data = store.get(dataset);
        let count = 0 ;
        instance.objects.x.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: value }, instance.objects.x.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",   
                    fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal() }, instance.objects.fill.r),
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
            code_vars.selected.settingPalette =""
            if (code_vars.selected.normalCurve =="TRUE")
            {
               let normalCurveSyntax =""
                if (code_vars.selected.fill[4] != "")
                {
                    
                    data.cols.forEach(function(element){
                        if (element.Name == code_vars.selected.fill[4]){
                            code_vars.selected.settingPalette ="library(RColorBrewer)\n"
                            code_vars.selected.settingPalette += "num_levels <- " + element.Levels.length +"\n";
                            code_vars.selected.settingPalette += "palette <- brewer.pal(num_levels, \"Set1\")\n"

                            element.Levels.forEach (function(val){
                                normalCurveSyntax =normalCurveSyntax +"stat_function(fun = dnorm, args = list(mean = mean(" + code_vars.dataset.name + "[which(" + code_vars.dataset.name + "$" + code_vars.selected.fill[4] + " == " + val +"),c(\"" +value+ "\")]" + ", na.rm = TRUE) , sd = sd(" +
                                code_vars.dataset.name + "[which(" + code_vars.dataset.name + "$" + code_vars.selected.fill[4] + " == " + val +"),c(\"" +value+ "\")]" + ", na.rm = TRUE)) , aes (color = factor(" +val+ ")), linewidth  = 1) +\n"
                            })                                                             
                            }         
                        })
                        code_vars.selected.normal =normalCurveSyntax
                } else {
                code_vars.selected.normal = "stat_function(fun = dnorm, args = list(mean = mean(" + code_vars.dataset.name + "$" + value + ", na.rm = TRUE) , sd = sd(" +
                code_vars.dataset.name + "$" + value + ", na.rm = TRUE)) , col = \"" + code_vars.selected.normalCurveColor +"\", linewidth = 1) +\n"
                }
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
    render: () => new histogram().render()
}
