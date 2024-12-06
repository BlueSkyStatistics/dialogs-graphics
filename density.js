var localization = {
    en: {
        title: "Density Plot",
        navigation: "Density",
        x: "Select a variable(s) to plot",
        y: "Color, specify a factor variable",
        fill: "Fill, specify a factor variable",
        label1: "Select a position to control overlapping",
        rd1: "Stack densities",
        rd2: "Stack densities and standardize each stack to have unit height",
        rd3: "Side by side (Dodge)",
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
            title: "Density Plot",
            r_help: "help(geom_density, package='ggplot2')",
            body: `
            <b>Description</b></br>
            Plots the density counts (1d kernel density estimate).Allows you to separate densities by a factor variable. You can also optionally create facets, themes and specify a title and labels for the x and y axis.
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            ggplot(data=datasetname, aes(x=var1 )) +
                geom_density(position = "dodge",alpha=0.5 ) +
                labs(x="var1",title= "Density plot for variable var1") +
                xlab("var1")  +     
                theme_grey() + theme(text=element_text(family="sans",face="plain",color="#000000",size=12,hjust=0.5,vjust=0.5))
            ggplot(data=datasetname, aes(x=var1, colour=var2)) +
                geom_density(position = "stack	",alpha=0.5 ) +
                labs(x="var1",title= "Density plot for variable var1, color by levels of var2") +
                xlab("var1")  +     
                theme_grey() + theme(text=element_text(family="sans",face="plain",color="#000000",size=12,hjust=0.5,vjust=0.5))
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: The default dataset
            </li>
            <li>
            aes():Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.
            </li>
            <li>
            x: the numeric variable to plot densities for
            </li>
            <li>
            y: ..count specifies counts of the numeric variable
            </li>
            <li>
            fill: the factor variable to group plot by
            </li>
            <li>
            position: Position adjustment, either as a string, or the result of a call to a position adjustment function. Valid values are "stack","dodge","fill"
            </li>
            <li>
            geom_density ():1d kernel density estimate, the position parameter allows you to specify the position adjustment to use for overlapping points on this layer.
            </li>
            <li>
            Labs(): Change axis labels and legend titles(This is optional).
            </li>
            <li>
            facet_grid(): Lay out panels in a grid(This is optional)
            </li>
            <li>
            theme_excel(): The excel theme(This is optional)
            </li>
            <li>
            alpha: sets transparency
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes</br>
            <b>Help</b></br>
            help(geom_density)</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(geom_density), help(labs), help(aes), help(facet_grid), help(theme_excel)
    `}
    }
}
class density extends baseModal {
    constructor() {
        var config = {
            id: "density",
            label: localization.en.title,
            modalType: "two",
            RCode: `
## [Density Plot]
require(ggplot2);
require(ggthemes);
{{ if (options.selected.position === "fill" &&  options.selected.y[0] =="" && options.selected.fill[0] =="")}}
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}},y =..count.. )) +
    geom_density({{if (options.selected.fillcolor != "")}} color ="{{selected.fillcolor | safe}}" {{/if}}) +
    labs({{selected.x[1] | safe}},title= "Density plot for variable {{selected.x[3] | safe}}{{selected.y[3] | safe}}") +
    xlab("{{selected.x_label|safe}}") {{if (options.selected.y_label != "")}} + ylab("{{selected.y_label | safe}}") {{/if}} + {{selected.title|safe}}  {{selected.flipaxis | safe}}  
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{#else}}
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.fill[0] | safe}} )) +
    geom_density(position = "{{selected.position | safe}}",{{selected.alpha | safe}} {{if (options.selected.fillcolor != "")}} , color ="{{selected.fillcolor | safe}}" {{/if}}) +
    labs({{selected.x[1] | safe}},title= "Density plot for variable {{selected.x[3] | safe}} {{selected.y[3] | safe}}{{selected.fill[3] | safe}}") +
    xlab("{{selected.x_label|safe}}") {{if (options.selected.y_label != "")}} + ylab("{{selected.y_label | safe}}") {{/if}} + {{selected.title|safe}}  {{selected.flipaxis | safe}}  
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
                r: [',colour={{y|safe}}', ',group={{y|safe}}', ',colour="{{y|safe}}"', ', color by levels of {{y|safe}}']
            },
            fill: {
                el: new dstVariable(config, { label: localization.en.fill, no: "fill", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: [',fill={{fill|safe}}', ',fill={{fill|safe}}', ',fill="{{fill|safe}}"', ', fill by levels of {{fill|safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5, style: "mt-2" }) },
            rd1: { el: new radioButton(config, { label: localization.en.rd1, no: "position", increment: "rd1", value: "dodge", state: "checked", extraction: "ValueAsIs" }) },
            rd2: { el: new radioButton(config, { label: localization.en.rd2, no: "position", increment: "rd2", value: "stack", state: "", extraction: "ValueAsIs" }) },
            rd3: { el: new radioButton(config, { label: localization.en.rd3, no: "position", increment: "rd3", style: "mb-3", value: "fill", state: "", extraction: "ValueAsIs" }) },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: localization.en.alpha,
                    min: 0,
                    style: "ml-2",
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}}']
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, no: "flipaxis" }), r: ' coord_flip() +' },
            fillcolor: {
                el: new colorInput(config, {
                    no: 'fillcolor',
                    label: "Fill Color (After color selection, click outside the control to apply)",
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
                    allow_spaces:true,
                    label: localization.en.specify_a_title,
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
                    label: localization.en.x_title,
                    placeholder: "Y Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},            
        }
        var opts = new optionsVar(config, {
            no: "density_chart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.fillcolor.el,
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
                objects.fill.el.content,
                objects.label1.el.content,
                objects.rd1.el.content,
                objects.rd2.el.content,
                objects.rd3.el.content,
                objects.alpha.el.content,
                objects.flipaxis.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chart",
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
                    fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal()[0] }, instance.objects.fill.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    position: common.getCheckedRadio("density_position"),
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal()
            code_vars.selected["fillcolor"] = instance.objects.fillcolor.el.getVal()
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
module.exports.item = new density().render()