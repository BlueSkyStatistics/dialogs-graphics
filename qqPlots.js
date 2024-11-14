var localization = {
    en: {
        title: "Q-Q Plots",
        navigation: "Q-Q",
        x: "X axis, specify a numeric variable(s)",
        alpha: "Opacity (0-1)",
        y: "Shape, specify a factor variable",
        color: "Color, specify a factor variable",
        referenceline: "Reference line",
        band: "Show bands",
        detrend: "Detrend",
        flip: "Flip Axis",
        distribution: "Select a distribution",
        x_title: "X Axis Label",
        y_title: "Y Axis Label",
        label1: "Distibution parameters, for e.g. for a normal distribution, the distribution parameters could be  mean=2, sd=2 so enter mean=2, sd=2 . For an exponential distribution the parameters could be rate =2, so enter rate=2.",
        specify_a_title: "Enter a title",
        dparams: "Optionally enter distribution parameters",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        help: {
            title: "Q-Q Plots",
            r_help: "help(stat_qq_point,package='qqplotr')",
            body: `
            <b>Description</b></br>
            A Q–Q (quantile-quantile) plot is a probability plot, which is a graphical method for comparing two probability distributions by plotting their quantiles against each other. By default we compare the probability distribution of selected variable against the normal distribution, however you can compare against several other distributions including beta, cauchy, chisq, exp, f, gamma... You can also specify the distribution parameters associated with the distribution being compared against.  Click options button on the main dialog to select a distribution and specify distribution parameters. You can select a factor variable to group the selected variable. In this case a separate Q-Q plot is drawn for each group.
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            ggplot(data=Dataset2,aes(sample = var1,shape = var2)) +
             stat_qq_band(distribution="norm",detrend = TRUE) +
             stat_qq_line(distribution="norm",detrend = TRUE) +
             stat_qq_point(distribution="norm",detrend = TRUE) +
             coord_flip() +
             labs(x = "Probability Points",y ="Sample Quantiles",title = "QQ Plot for variable var1")</br></br>
            ggplot(data=Dataset2,aes(sample = var1,shape = var2)) +
             stat_qq_band(distribution="exp",dparams= list(rate=2),detrend = TRUE) +
             stat_qq_line(distribution="exp",dparams= list(rate=2),detrend = TRUE) +
             stat_qq_point(distribution="exp",dparams= list(rate=2),detrend = TRUE)+
             labs(x = "Probability Points",y ="Sample Quantiles",title = "QQ Plot for variable var1")
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
            sample: the  numeric  variable to plot the P-P plot for
            </li>
            <li>
            stat_qq_point: This is a modified version of ggplot2::stat_qq with some parameters adjustments and a new option to detrend the points.
            </li>
            <li>
            stat_qq_line: Draws a reference line based on the data quantiles, as in stats::qqline.
            </li>
            <li>
            stat_qq_band: Draws confidence bands based on three methods: "normal","boot" and"ts":
            "normal" constructs simultaneous confidence bands based on Normal confidence intervals;
            "boot" creates pointwise confidence bands based on a parametric boostrap;
            "ts" constructs tail-sensitive confidence bands, as proposed by Aldor-Noiman et al. (2013).
            </li>
            <li>
            shape: An optional factor variable that groups the values assigned to sample. A separate P-P plot is created for each group as determined by levels of the factor variable​. Each group is indicated by a different shape
            </li>
            <li>
            Labs(): Change axis labels and legend titles(This is optional)​
            </li>
            <li>
            facet_grid(): Lay out panels in a grid(This is optional)​. See help(facet_grid) for more details.
            </li>
            <li>  ​
            coord_flip(): Flip axis(This is optional)​
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;qqplotr;</br>
            <b>Help</b></br>
            help(stat_qq_point,package='qqplotr')</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(stat_qq_point), help(aes), help(facet_grid), help(coord_flip)​
            https://cran.r-project.org/web/packages/qqplotr/vignettes/introduction.html
`}
    }
}
class qqPlots extends baseModal {
    constructor() {
        var config = {
            id: "qqPlots",
            label: localization.en.title,
            modalType: "two",
            RCode: `## [P-P Plot]
require(ggplot2);
require(ggthemes);
require(qqplotr);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.color[0] | safe}} )) +
    stat_qq_point(distribution = "{{selected.distribution | safe}}"{{if (options.selected.dparams != "" )}}, dparams = list ({{selected.dparams | safe}}){{/if}}, detrend = {{selected.detrend | safe}}) +
    {{if (options.selected.referenceline == "TRUE")}}stat_qq_line(detrend = {{selected.detrend | safe}}) + \n{{/if}}
    {{if (options.selected.band == "TRUE")}}stat_qq_band(distribution="{{selected.distribution | safe}}"{{if (options.selected.dparams != "" )}} ,dparams = list ({{selected.dparams | safe}}){{/if}}, detrend = {{selected.detrend | safe}}) + {{/if}}
    labs({{selected.x[1] | safe}} {{selected.y[2] | safe}}, title= "Q-Q Plot for variable {{selected.x[3] | safe}}{{selected.y[3] | safe}}{{selected.color[3] | safe}}") +
    xlab("{{selected.x_label|safe}}") +
    ylab("{{selected.y_label|safe}}") + {{selected.title|safe}}  {{selected.flipaxis | safe}}  
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
                el: new dstVariableList(config, { label: localization.en.x, no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['sample={{x|safe}}', 'sample="{{x|safe}}"', '{{x|safe}}', '{{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: localization.en.y, no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',shape={{y|safe}}', ',group={{y|safe}}', ',shape="{{y|safe}}"', ', shapes defined by levels of {{y|safe}}']
            },
            color: {
                el: new dstVariable(config, { label: localization.en.color, no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',color={{color|safe}}', ',group={{color|safe}}', ',color="{{color|safe}}"', ', color defined by levels of variable {{color|safe}}']
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
            referenceline: {
                el: new checkbox(config, {
                    label: localization.en.referenceline,
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "referenceline"
                })
            },
            band: {
                el: new checkbox(config, {
                    label: localization.en.band,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    newline: true, no: "band"
                })
            },
            detrend: {
                el: new checkbox(config, {
                    label: localization.en.detrend,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    newline: true, no: "detrend"
                })
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, newline: true, no: "flipaxis" }), r: ' coord_flip() +' },
            distribution: {
                el: new comboBox(config, {
                    no: 'distribution',
                    label: localization.en.distribution,
                    multiple: false,
                    options: ["norm", "beta", "cauchy", "chisq", "exp", "f", "gamma"],
                    default: "norm"
                })
            },
            label1: { el: new labelVar(config, { no: 'label1', label: localization.en.label1, h: 9 }) },
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
                    no: "specify_a_title",
                    label: localization.en.specify_a_title,
                    allow_spaces:true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: localization.en.x_title,
                    placeholder: "X Axis",
                    allow_spaces:true,
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
            dparams: {
                el: new input(config, {
                    no: 'dparams',
                    allow_spaces:true,
                    label: localization.en.dparams,
                    extraction: "NoPrefix|UseComma"
            })}         
        }
        var opts = new optionsVar(config, {
            no: "frequency_chart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.distribution.el,
                objects.label1.el,
                objects.dparams.el
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
                objects.y.el.content,
                objects.color.el.content,
                objects.referenceline.el.content,
                objects.band.el.content,
                objects.detrend.el.content,
                objects.flipaxis.el.content,
                objects.alpha.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-qq_fixed",
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
        let count = 0;
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
                    color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                    referenceline: instance.objects.referenceline.el.getVal() ? "TRUE" : "FALSE",
                    band: instance.objects.band.el.getVal() ? "TRUE" : "FALSE",
                    detrend: instance.objects.detrend.el.getVal() ? "TRUE" : "FALSE",
                    distribution: instance.objects.distribution.el.getVal(),
                    dparams: instance.opts.config.content[5].getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? "Theoretical Quantiles" : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? "Sample Quantiles" : instance.opts.config.content[2].getVal()
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
module.exports.item = new qqPlots().render()