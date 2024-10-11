
class BarChartModal extends baseModal {
    static dialogId = 'BarChartModal'
    static t = baseModal.makeT(BarChartModal.dialogId)

    constructor() {
        var config = {
            id: BarChartModal.dialogId,
            label: BarChartModal.t('title'),
            modalType: "two",
            RCode: `
            {{ if (options.selected.bar_type === "0") }}
            ## [Bar Chart With Counts]
            detach(package:dplyr)  
            require(plyr)
            require(dplyr)
            require(tidyr)
            require(ggplot2);
            require(ggthemes);
            require(stringr);
            {{dataset.name}}  %>% {{if (options.selected.dropna )}}tidyr::drop_na({{if(options.selected.x[3] !="")}}{{selected.x[3] | safe}}{{/if}} {{if(options.selected.y[3] !="")}},{{selected.y[3] | safe}}{{/if}} {{if(options.selected.fill[3] !="")}},{{selected.fill[4] | safe}}{{/if}}{{if(options.selected.Facetrow[0] !='')}},{{selected.Facetrow | safe}}{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},{{selected.Facetcolumn | safe}}{{/if}}{{if(options.selected.Facetwrap[0] !='')}},{{selected.Facetwrap | safe}}{{/if}} ) %>%{{/if}}
            ggplot( aes({{ if (options.selected.x[0] =="")}}x=''{{#else}}{{selected.x[0] | safe}}{{/if}}{{if( options.selected.y[0] !="")}}{{selected.y[0] | safe}}{{/if}}{{if(options.selected.relFreq == "TRUE")}}, y = ..count../sum(..count..){{/if}}{{selected.fill[0] | safe}})) +\n\tgeom_bar(position="{{selected.radio}}",alpha={{selected.opacity}}{{if( options.selected.y[0] !="")}},stat="identity"{{/if}}{{if (options.selected.fill[0] == "")}}, fill ="{{selected.fill1 | safe}}"{{/if}}) +\n\tlabs({{ if ( options.selected.x[1] =="")}}x='Count'{{#else}}{{selected.x[1] | safe}}{{/if}}{{if( options.selected.y[1] =="" && options.selected.radio != "fill"&& options.selected.relFreq !="TRUE")}},y='Count'{{/if}}{{if( options.selected.y[1] =="" && options.selected.radio == "fill")}},y="Proportion(0-1)"{{/if}}{{if( options.selected.y[1] =="" && options.selected.relFreq =="TRUE")}},y="Proportion(0-1)"{{/if}}{{if( options.selected.y[1] !="" )}}{{selected.y[1] | safe}}{{/if}}{{selected.fill[1] | safe}},title= "Bar chart for {{if( options.selected.x[2] =="")}}{{#else}}{{selected.x[2] | safe}}{{/if}}{{if( options.selected.y[2] =="" && options.selected.radio != "fill" && options.selected.relFreq !="TRUE")}},Y axis: Count{{/if}}{{if( options.selected.y[2] =="" && options.selected.radio == "fill" && options.selected.relFreq !="TRUE")}},Y axis: Proportion(0-1){{/if}}{{if( options.selected.y[1] =="" && options.selected.relFreq =="TRUE")}},Y axis: Proportion(0-1){{/if}}{{if( options.selected.y[2] !="" )}}{{selected.y[2] | safe}}{{/if}}") +\n\txlab("{{selected.x_label|safe}}") +\n\tylab("{{selected.y_label|safe}}") + {{selected.title|safe}}{{selected.flip | safe}} {{selected.Facets | safe}} + {{selected.themes | safe}}
            {{ #else }}
            ## [Bar Chart (with means)]
            require(ggplot2);
            require(ggthemes);
            require(Rmisc);
            {{ if (options.selected.y[0] != "" && options.selected.x[0] != "") }}
            temp <- {{dataset.name}} {{if (options.selected.dropna)}} %>% tidyr::drop_na({{if(options.selected.x[3] !="")}}{{selected.x[3] | safe}}{{/if}} {{if(options.selected.y[3] !="")}},{{selected.y[3] | safe}}{{/if}} {{if(options.selected.fill[3] !="")}},{{selected.fill[4] | safe}}{{/if}}{{if(options.selected.Facetrow[0] !='')}},"{{selected.Facetrow | safe}}"{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},"{{selected.Facetcolumn | safe}}"{{/if}}{{if(options.selected.Facetwrap[0] !='')}},"{{selected.Facetwrap | safe}}"{{/if}} ) {{/if}}
            \ntemp <-Rmisc::summarySE( {{dataset.name}}, measurevar = "{{selected.y[3] | safe }}", groupvars = c("{{ selected.x[3] | safe }}"{{ selected.fill[3] | safe }}{{if(options.selected.Facetrow[0] !='')}},"{{selected.Facetrow | safe}}"{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},"{{selected.Facetcolumn | safe}}"{{/if}}{{if(options.selected.Facetwrap[0] !='')}},"{{selected.Facetwrap | safe}}"{{/if}}), {{ if (options.selected.errorBarRadioSelection =="4")}}conf.interval={{selected.cilevel | safe}},{{/if}} na.rm = TRUE, .drop = TRUE)
            pd <- position_dodge(0.9)
            {{ if (!options.selected.showTopOfBars ) }}
            temp  %>% ggplot( aes({{ selected.x[0] | safe }}{{ selected.y[0] | safe }}{{ selected.fill[0] | safe }})) +
                geom_bar( position="dodge",alpha={{selected.opacity}},stat="identity"{{if (options.selected.fill[0] == "")}}, fill ="{{selected.fill1 | safe}}"{{/if}}) + {{ selected.radio | safe}}
                labs({{selected.x[1] | safe}}{{ selected.y[1] | safe }}{{selected.fill[1] | safe}},title= "Bar Chart (with means) for {{selected.x[2] | safe}}{{selected.y[2] | safe}}{{selected.fill[2] | safe}}") +
                xlab("{{selected.x_label|safe}}") +
                ylab("{{selected.y_label|safe}}") +
                {{selected.title|safe}}
                {{selected.flip | safe}}
                {{selected.Facets | safe}} + {{selected.themes | safe}}
            {{#else}}
            temp  %>% ggplot( aes({{ selected.x[0] | safe }}{{ selected.y[0] | safe }}{{selected.fill[0] | safe}})) +
                {{ selected.radio | safe}}   geom_bar( position="dodge",alpha={{selected.opacity}},stat="identity"{{if (options.selected.fill[0] == "")}}, fill ="{{selected.fill1 | safe}}"{{/if}}) +
                labs({{selected.x[1] | safe}}{{ selected.y[1] | safe }}{{selected.fill[1] | safe}},title= "Bar Chart (with means) for {{selected.x[2] | safe}}{{selected.y[2] | safe}}{{selected.fill[2] | safe}}") +
                xlab("{{selected.x_label|safe}}") +
                ylab("{{selected.y_label|safe}}") +
                {{selected.title|safe}}
                {{selected.flip | safe}}
                {{selected.Facets | safe}} + {{selected.themes | safe}}
            {{/if}}
            {{#else}}
            cat("Error: You must select a Y variable and a X variable/grouping variable to plot a Bar Chart with Means")
            {{/if}}
            {{/if}}
            `,
            pre_start_r: JSON.stringify({
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        var objects = {
            label1: { el: new labelVar(config, { label: BarChartModal.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, {
                    label: BarChartModal.t('y'),
                    no: "y",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: BarChartModal.t('x'),
                    no: "x",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: BarChartModal.t('fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',fill={{fill|safe}}', ',fill="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"', '{{fill|safe}}']
            },
           
            checkbox: { el: new checkbox(config, { label: BarChartModal.t('flipBox'), no: "flipBox" }), r: '\n\tcoord_flip() +' },
            slider: {
                el: new sliderVariable(config, {
                    no: "opacity",
                    label: BarChartModal.t('alpha'),
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
                    label: BarChartModal.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: BarChartModal.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: BarChartModal.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: BarChartModal.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: BarChartModal.t('specify_a_title'),
                    placeholder: "Chart title",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {            
                el: new input(config, {
                    no: 'x_title',
                    label: BarChartModal.t('x_title'),
                    placeholder: "X Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: BarChartModal.t('y_title'),
                    placeholder: "Y Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            fill1: {
                el: new colorInput(config, {
                    no: 'fill1',
                    label: BarChartModal.t('fill1'),
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })},
            dropna: {
                el: new checkbox(config, { 
                    label: BarChartModal.t('dropna'), 
                    no: "dropna", 
                    extraction: "Boolean" 
                })},
                relFreq : {
                    el: new checkbox(config, {
                        label: BarChartModal.t('relFreq'),
                        no: "relFreq",
                        extraction: "Boolean",
                        
                    })
                },
                        
        }
        const tab1 = {
            state: "active",
            no: "count",
            label: "Count",
            content: [
                objects.relFreq.el.content,
               // new checkbox(config, { label: BarChartModal.t('relFreq'), no: "relFreq", value: "relFreq", bs_type: "checkbox", state: "", extraction: "Boolean" }).content,
                new labelVar(config, { label: BarChartModal.t('barType'), h: 6 }).content,
                new radioButton(config, { label: BarChartModal.t('stackedBar'), no: "count", increment: "stack", value: "stack", state: "checked", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: BarChartModal.t('sideBySide'), no: "count", increment: "dodge", value: "dodge", state: "", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: BarChartModal.t('fillPercent'), no: "count", increment: "fill", value: "fill", state: "", extraction: "ValueAsIs" }).content,
                
            ].join("")
        }
        const tab2 = {
            state: "",
            no: "mean",
            label: "Mean",
            content: [
                new radioButton(config, { label: BarChartModal.t('noErrBars'), no: "mean", increment: "stack", value: "1", state: "checked", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: BarChartModal.t('stderr'), no: "mean", increment: "stderr", value: "2", state: "", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: BarChartModal.t('stddev'), no: "mean", increment: "stddev", value: "3", state: "", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: BarChartModal.t('confidenceInterval'), no: "mean", increment: "ci", value: "4", state: "", extraction: "ValueAsIs" }).content,
                new advancedSlider(config, {
                    no: "cilevel",
                    label: BarChartModal.t('cilevel'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    style: "ml-3",
                    extraction: "NoPrefix|UseComma"
                }).content,
                new checkbox(config, {
                    label: BarChartModal.t('hide'),
                    no: "hide",
                    extraction: "Boolean",
                }).content
            ].join("")
        }
        var tabs = new tabsView(config, { no: "bar_type", tabs: [tab1, tab2], extraction: "NoPrefix" })
        var opts = new optionsVar(config, {
            no: "barchart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.fill1.el,
                objects.dropna.el
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
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [ objects.x.el.content, objects.y.el.content, objects.fill.el.content, objects.slider.el.content, objects.checkbox.el.content],
            bottom: [new labelVar(config, { label: "Select Bar Chart ", h: 5 }).content, tabs.content, opts.content, Facets.el.content],
            nav: {
                name: BarChartModal.t('navigation'),
                icon: "icon-chart-bar-regular",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.tabs = tabs
        this.opts = opts
        
        this.help = {
            title: BarChartModal.t('help.title'),
            r_help: "help(data,package='utils')",
            body: BarChartModal.t('help.body')
        }

    }
    prepareExecution(instance) {
        var res = [];
        var errorBarOptions = "";
        if (instance.objects.y.el.getVal() == "") {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    y: instance.dialog.prepareSelected({ y: instance.objects.y.el.getVal()[0] }, instance.objects.y.r),
                    fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal()[0] }, instance.objects.fill.r),
                    bar_type: instance.tabs.getActive('el-index'),
                    radio: instance.tabs.getActive('el-index') === "1" ? "" : common.getCheckedRadio(instance.tabs.getActive('el-group')),
                    //relFreq: common.getCheckedCheckbox(instance.tabs.getActive('el-group')) ? "TRUE":"FALSE",
                    relFreq: instance.objects.relFreq.el.getVal()? "TRUE":"FALSE",
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    opacity: instance.objects.slider.el.getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") +\n `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    fill1: instance.opts.config.content[3].getVal(),
                    dropna: instance.opts.config.content[4].getVal(),
                    
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
           // code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? "Count" : instance.opts.config.content[2].getVal()
           code_vars.selected.y_label =instance.opts.config.content[2].getVal()
            if (code_vars.selected.y_label == "" )
            {
                if (code_vars.selected.radio =="fill" || code_vars.selected.relFreq == "TRUE")
                {
                    code_vars.selected.y_label = "Proportion(0-1)"
                }
                else {
                    code_vars.selected.y_label = "Count"
                }
            }
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
        }
        else {
            instance.objects.y.el.getVal().forEach(function (value) {
                if (instance.tabs.getActive('el-index') === "1") {
                    //Generates the appropriate syntax for the error bars
                    if (common.getCheckedRadio(instance.tabs.getActive('el-group')) == "1") {
                        errorBarOptions = " ";
                    }
                    else if (common.getCheckedRadio(instance.tabs.getActive('el-group')) == "2") {
                        errorBarOptions = 'geom_errorbar( aes(ymin = {{ y | safe }}-se,ymax = {{ y | safe }}+se ),width = .1,position = pd) + ';
                    }
                    else if (common.getCheckedRadio(instance.tabs.getActive('el-group')) == "3") {
                        errorBarOptions = 'geom_errorbar( aes(ymin = {{ y | safe }}-se,ymax = {{ y | safe }}+se ),width = .1,position = pd) + ';
                    }
                    else if (common.getCheckedRadio(instance.tabs.getActive('el-group')) == "4") {
                        errorBarOptions = "geom_errorbar( aes(ymin = {{ y | safe }}-ci,ymax = {{ y | safe }}+ci ),width = .1,position = pd) + ";
                    }
                }
                var code_vars = {
                    dataset: {
                        name: getActiveDataset()
                    },
                    selected: {
                        x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                        y: instance.dialog.prepareSelected({ y: value }, instance.objects.y.r),
                        fill: instance.dialog.prepareSelected({ fill: instance.objects.fill.el.getVal()[0] }, instance.objects.fill.r),
                        //errorBarRadioSelection stores the value of the errorbar selection for Bar chart means
                        //When value is 4 , I know I need error bars with confidence levels, this also makes sure that summarySE is called with the confidence interval parameter
                        errorBarRadioSelection: instance.tabs.getActive('el-index') === "1" ? common.getCheckedRadio(instance.tabs.getActive('el-group')) : "",
                        //Substitutes the value of y in the errorbars syntax
                        radio: instance.tabs.getActive('el-index') === "1" ? instance.dialog.renderSample(errorBarOptions, { y: value }) : common.getCheckedRadio(instance.tabs.getActive('el-group')),
                        //cilevel is used only for Barchart means
                        //cilevel : common.getSliderValueInTab(`${instance.config.id}_cilevel`),
                        relFreq: instance.objects.relFreq.el.getVal()? "TRUE":"FALSE",
                        cilevel: common.getVal(`${instance.config.id}_cilevel`),
                        showTopOfBars: common.getVal(`${instance.config.id}_hide`),
                        flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                        bar_type: instance.tabs.getActive('el-index'),
                        opacity: instance.objects.slider.el.getVal(),
                        title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") +\n`,
                        Facetrow: instance.objects.Facetrow.el.getVal(),
                        Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                        Facetwrap: instance.objects.Facetwrap.el.getVal(),
                        Facetscale: instance.objects.Facetscale.el.getVal(),
                        fill1: instance.opts.config.content[3].getVal(),
                        dropna: instance.opts.config.content[4].getVal(),
                    }
                }

                if (code_vars.selected.y[0] != "" && code_vars.selected.relFreq == "TRUE" && instance.tabs.getActive('el-index')  != "1") {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Invalid option", message: `You cannot specify Y variable(s) when relative frequencies is selected.` })
                    return res
                  }

                code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
                code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
                if (code_vars.selected.y_label == "" )
                {
                    if (code_vars.selected.radio =="fill" || code_vars.selected.relFreq == "TRUE")
                    {
                        code_vars.selected.y_label = "Proportion(0-1)"
                    }
                    else {
                        code_vars.selected.y_label = "Count"
                    }
                }
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
                code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
                code_vars.selected.themes = themeRsyntax;
                let cmd = instance.dialog.renderR(code_vars);
                cmd = removenewline(cmd);
                res.push({ cmd: cmd, cgid: newCommandGroup() })
            })
        }
        return res;
    }
}
module.exports.item = new BarChartModal().render()
