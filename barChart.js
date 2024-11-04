
class barChart extends baseModal {
    static dialogId = 'barChart'
    static t = baseModal.makeT(barChart.dialogId)

    constructor() {
        var config = {
            id: barChart.dialogId,
            label: barChart.t('title'),
            modalType: "two",
            RCode: `
            
            ## [Bar Chart With Counts]
            detach(package:dplyr)  
            require(plyr)
            require(dplyr)
            require(tidyr)
            require(ggplot2);
            require(ggthemes);
            require(stringr);
            {{ if (options.selected.bar_type === "0") }}
            ## [Bar Chart With Counts]
          
            {{if (options.selected.dropna )}}
            BSkyTemp = {{dataset.name}} %>% tidyr::drop_na({{if(options.selected.x[3] !="")}}{{selected.x[3] | safe}}{{/if}} {{if(options.selected.y[3] !="")}},{{selected.y[3] | safe}}{{/if}} {{if(options.selected.fill[3] !="")}},{{selected.fill[4] | safe}}{{/if}}{{if(options.selected.Facetrow[0] !='')}},{{selected.Facetrow | safe}}{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},{{selected.Facetcolumn | safe}}{{/if}}{{if(options.selected.Facetwrap[0] !='')}},{{selected.Facetwrap | safe}}{{/if}} )
            {{/if}}

            {{if (options.selected.y[3] !="")}}

            {{if(options.selected.fill[4] != "")}}
            BSkyTemp <- {{if (options.selected.dropna )}}BSkyTemp{{#else}}{{dataset.name}}{{/if}} %>%\n dplyr::group_by({{selected.fill[4] | safe}}{{if (options.selected.x[3] != undefined)}}, {{selected.x[3] | safe}}{{/if}}) %>%\n dplyr::summarize ({{selected.newVariable | safe}} = sum({{selected.y[3] | safe}}, na.rm = TRUE), .groups ='drop')
            names(BSkyTemp) <- {{selected.namesOfDataset | safe}}
            {{#else}}
            BSkyTemp <- {{if (options.selected.dropna )}}BSkyTemp{{#else}}{{dataset.name}}{{/if}} %>%\n dplyr::group_by({{selected.x[3] | safe}}) %>%\n dplyr::summarize ({{selected.newVariable | safe}} = sum({{selected.y[3] | safe}}, na.rm = TRUE), .groups ='drop')
            names(BSkyTemp) <- {{selected.namesOfDataset | safe}}
            {{/if}}

            {{if(options.selected.x[3] != undefined)}}
            {{if(options.selected.fill[4] != "")}}
            #Creating a new factor variable if x variable is specified
            BSkyTemp <- BSkyTemp  %>%
            dplyr::mutate({{selected.fill[4] | safe }}_{{selected.x[3] | safe }} = paste({{selected.fill[4] | safe }}, {{selected.x[3] | safe }}, sep = "_"))
            {{#else}}
            #Creating a new factor variable if x variable is specified
            BSkyTemp <- BSkyTemp  %>%
            dplyr::mutate({{selected.x[3] | safe }} = paste({{selected.x[3] | safe }}, sep = ""))
            {{/if}}

            {{/if}}
            
            
            #Calculating percents
            #BSkyTemp$Percentage <- with(BSkyTemp, {{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100)
            BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
            BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
            BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)" , sep="")
            {{#else}}
            BSkyTemp <- base::table({{if (options.selected.dropna )}}BSkyTemp{{#else}}{{dataset.name}}{{/if}}[,{{selected.stringForDatasetWithFreqPercents | safe}}], useNA = c("ifany"))
            BSkyTemp <- as.data.frame(BSkyTemp)
            names(BSkyTemp) <- {{selected.namesOfDataset | safe}}\n
            BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
            BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
            BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)" , sep="")
            BSkyTemp <- BSkyTemp %>%
            dplyr::mutate(
                PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
                {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
                )
            {{/if}}
            BSkyTemp %>% ggplot( aes({{ if (options.selected.x[0] =="")}}x=''{{#else}}{{selected.x[0] | safe}}{{/if}}, {{if(options.selected.relFreq == "TRUE")}} y = Percentage/100{{#else}}y = {{selected.newVariable | safe}}{{/if}}{{selected.fill[0] | safe}})) +\n\tgeom_bar(position="{{selected.radio}}",alpha={{selected.opacity}},stat="identity"{{if (options.selected.fill[0] == "")}}, fill ="{{selected.fill1 | safe}}"{{/if}}) {{if (options.selected.suppressLabels != "TRUE" && options.selected.radio != "fill")}}+\n\tgeom_text(aes(label = paste({{if (options.selected.y[3] ==undefined)}}{{selected.newVariable |safe}}AsString{{#else}}{{selected.newVariable | safe}}AsString{{/if}}, "\n",  PercentageAsString )), {{if(options.selected.radio =="dodge")}}position = position_dodge(width = 0.8)){{#else}}position = position_stack(vjust = 0.5)){{/if}}{{/if}}+\n\tlabs({{ if ( options.selected.x[1] =="")}}x='Count'{{#else}}{{selected.x[1] | safe}}{{/if}}{{if( options.selected.y[1] =="" && options.selected.radio != "fill"&& options.selected.relFreq !="TRUE")}},y='Count'{{/if}}{{if( options.selected.y[1] =="" && options.selected.radio == "fill")}},y="Proportion(0-1)"{{/if}}{{if( options.selected.y[1] =="" && options.selected.relFreq =="TRUE")}},y="Proportion(0-1)"{{/if}}{{if( options.selected.y[1] !="" )}}{{selected.y[1] | safe}}{{/if}}{{selected.fill[1] | safe}},title= "Bar chart for {{if( options.selected.x[2] =="")}}{{#else}}{{selected.x[2] | safe}}{{/if}}{{if( options.selected.y[2] =="" && options.selected.radio != "fill" && options.selected.relFreq !="TRUE")}},Y axis: Count{{/if}}{{if( options.selected.y[2] =="" && options.selected.radio == "fill" && options.selected.relFreq !="TRUE")}},Y axis: Proportion(0-1){{/if}}{{if( options.selected.y[1] =="" && options.selected.relFreq =="TRUE")}},Y axis: Proportion(0-1){{/if}}{{if( options.selected.y[2] !="" )}}{{selected.y[2] | safe}}{{/if}}") +\n\txlab("{{selected.x_label|safe}}") +\n\tylab("{{selected.y_label|safe}}") + {{selected.title|safe}}{{selected.flip | safe}} {{selected.Facets | safe}} + {{selected.themes | safe}}
            {{ #else }}
            ## [Bar Chart (with means)]
            require(ggplot2);
            require(ggthemes);
            require(Rmisc);
            {{ if (options.selected.y[0] != "" && options.selected.x[0] != "") }}
            BSkyTemp <- {{dataset.name}} {{if (options.selected.dropna)}} %>% tidyr::drop_na({{if(options.selected.x[3] !="")}}{{selected.x[3] | safe}}{{/if}} {{if(options.selected.y[3] !="")}},{{selected.y[3] | safe}}{{/if}} {{if(options.selected.fill[3] !="")}},{{selected.fill[4] | safe}}{{/if}}{{if(options.selected.Facetrow[0] !='')}},"{{selected.Facetrow | safe}}"{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},"{{selected.Facetcolumn | safe}}"{{/if}}{{if(options.selected.Facetwrap[0] !='')}},"{{selected.Facetwrap | safe}}"{{/if}} ) {{/if}}
            \nBSkyTemp <-Rmisc::summarySE( BSkyTemp, measurevar = "{{selected.y[3] | safe }}", groupvars = c("{{ selected.x[3] | safe }}"{{ selected.fill[3] | safe }}{{if(options.selected.Facetrow[0] !='')}},"{{selected.Facetrow | safe}}"{{/if}}{{if(options.selected.Facetcolumn[0] !='')}},"{{selected.Facetcolumn | safe}}"{{/if}}{{if(options.selected.Facetwrap[0] !='')}},"{{selected.Facetwrap | safe}}"{{/if}}), {{ if (options.selected.errorBarRadioSelection =="4")}}conf.interval={{selected.cilevel | safe}},{{/if}} na.rm = TRUE, .drop = TRUE)
   
            BSkyTemp$Percentage <- with(BSkyTemp, base::round(N / sum(N) * 100), digits =BSkyGetDecimalDigitSetting())
            BSkyTemp$NAsString = as.character(BSkyTemp$N)
            BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)", sep="" )
            BSkyTemp <- BSkyTemp %>%
            dplyr::mutate(
                PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
                {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", NAsString),
                )
            
            pd <- position_dodge(0.9)
            {{ if (!options.selected.showTopOfBars ) }}
            BSkyTemp  %>% ggplot( aes({{ selected.x[0] | safe }}{{ selected.y[0] | safe }}{{ selected.fill[0] | safe }})) +
                geom_bar( position="dodge",alpha={{selected.opacity}},stat="identity"{{if (options.selected.fill[0] == "")}}, fill ="{{selected.fill1 | safe}}"{{/if}}) + {{ selected.radio | safe}} 
                {{if (options.selected.suppressLabels != "TRUE")}}+\n\tgeom_text(aes(label = paste({{if (options.selected.y[3] ==undefined)}}{{selected.newVariable |safe}}AsString{{#else}}{{selected.newVariable | safe}}AsString{{/if}}, "\n",  PercentageAsString )), position = position_dodge(width = 0.8))+ {{/if}}
                labs({{selected.x[1] | safe}}{{ selected.y[1] | safe }}{{selected.fill[1] | safe}},title= "Bar Chart (with means) for {{selected.x[2] | safe}}{{selected.y[2] | safe}}{{selected.fill[2] | safe}}") +
                xlab("{{selected.x_label|safe}}") +
                ylab("{{selected.y_label|safe}}") +
                {{selected.title|safe}}
                {{selected.flip | safe}}
                {{selected.Facets | safe}} + {{selected.themes | safe}}
            {{#else}}
            BSkyTemp  %>% ggplot( aes({{ selected.x[0] | safe }}{{ selected.y[0] | safe }}{{selected.fill[0] | safe}})) +
                {{ selected.radio | safe}}   geom_bar( position="dodge", alpha={{selected.opacity}}, stat="identity"{{if (options.selected.fill[0] == "")}}, fill ="{{selected.fill1 | safe}}"{{/if}}) +
                {{if (options.selected.suppressLabels != "TRUE")}}+\n\tgeom_text(aes(label = paste({{if (options.selected.y[3] ==undefined)}}{{selected.newVariable |safe}}AsString{{#else}}{{selected.newVariable | safe}}AsString{{/if}}, "\n",  PercentageAsString )), position = position_dodge(width = 0.8)) + {{/if}}
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
            label1: { el: new labelVar(config, { label: barChart.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, {
                    label: barChart.t('y'),
                    no: "y",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: barChart.t('x'),
                    no: "x",
                    required:true,
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}' ]
            },
            fill: {
                el: new dstVariable(config, {
                    label: barChart.t('fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',fill={{fill|safe}}', ',fill="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"', '{{fill|safe}}']
            },
           
            checkbox: { el: new checkbox(config, { label: barChart.t('flipBox'), no: "flipBox" }), r: '\n\tcoord_flip() +' },
            slider: {
                el: new sliderVariable(config, {
                    no: "opacity",
                    label: barChart.t('alpha'),
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
                    label: barChart.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: barChart.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: barChart.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: barChart.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: barChart.t('specify_a_title'),
                    placeholder: "Chart title",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {            
                el: new input(config, {
                    no: 'x_title',
                    label: barChart.t('x_title'),
                    placeholder: "X Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: barChart.t('y_title'),
                    placeholder: "Y Axis",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma"
            })},
            fill1: {
                el: new colorInput(config, {
                    no: 'fill1',
                    label: barChart.t('fill1'),
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })},
            dropna: {
                el: new checkbox(config, { 
                    label: barChart.t('dropna'), 
                    no: "dropna", 
                    style: "mt-3",
                    extraction: "Boolean" 
                })},
                relFreq : {
                    el: new checkbox(config, {
                        label: barChart.t('relFreq'),
                        no: "relFreq",
                        extraction: "Boolean",
                        
                    })
                },

                optionsLabels: { el: new labelVar(config, { no: 'optionsLabels', style: "mt-2",label: barChart.t('optionsLabels'), h: 5 }) },

            suppressLabels: {
                el: new checkbox(config, {
                    label: barChart.t('suppressLabels'),
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "suppressLabels"
                })
            },
            suppressThreshold: {
                el: new inputSpinner(config, {
                  no: 'suppressThreshold',
                  label: barChart.t('suppressThreshold'),
                  min: 0,
                  max: 100,
                  step: 0.1,
                  value: 0,
                  extraction: "NoPrefix|UseComma"
                })
              },





                        
        }
        const tab1 = {
            state: "active",
            no: "count",
            label: "Count",
            content: [
                objects.relFreq.el.content,
               // new checkbox(config, { label: barChart.t('relFreq'), no: "relFreq", value: "relFreq", bs_type: "checkbox", state: "", extraction: "Boolean" }).content,
                new labelVar(config, { label: barChart.t('barType'), h: 6 }).content,
                new radioButton(config, { label: barChart.t('stackedBar'), no: "count", increment: "stack", value: "stack", state: "checked", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: barChart.t('sideBySide'), no: "count", increment: "dodge", value: "dodge", state: "", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: barChart.t('fillPercent'), no: "count", increment: "fill", value: "fill", state: "", extraction: "ValueAsIs" }).content,
                
            ].join("")
        }
        const tab2 = {
            state: "",
            no: "mean",
            label: "Mean",
            content: [
                new radioButton(config, { label: barChart.t('noErrBars'), no: "mean", increment: "stack", value: "1", state: "checked", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: barChart.t('stderr'), no: "mean", increment: "stderr", value: "2", state: "", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: barChart.t('stddev'), no: "mean", increment: "stddev", value: "3", state: "", extraction: "ValueAsIs" }).content,
                new radioButton(config, { label: barChart.t('confidenceInterval'), no: "mean", increment: "ci", value: "4", state: "", extraction: "ValueAsIs" }).content,
                new advancedSlider(config, {
                    no: "cilevel",
                    label: barChart.t('cilevel'),
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.95,
                    style: "ml-3",
                    extraction: "NoPrefix|UseComma"
                }).content,
                new checkbox(config, {
                    label: barChart.t('hide'),
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
                objects.dropna.el,
                objects.optionsLabels.el,
                objects.suppressLabels.el,
                objects.suppressThreshold.el
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
                name: barChart.t('navigation'),
                icon: "icon-chart-bar-regular",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.tabs = tabs
        this.opts = opts
        
        this.help = {
            title: barChart.t('help.title'),
            r_help: "help(data,package='utils')",
            body: barChart.t('help.body')
        }

    }
    prepareExecution(instance) {
        var res = [];
        let count = 0
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
                    suppressThreshold: instance.objects.suppressThreshold.el.getVal(),
                    //rdgrp1: instance.objects.rdgrp1.el.getVal(),
                    suppressLabels: instance.objects.suppressLabels.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    fill1: instance.opts.config.content[3].getVal(),
                    dropna: instance.opts.config.content[4].getVal(),
                    
                }
            }

            code_vars.selected.barVar = code_vars.selected.x[3]
            if (code_vars.selected.y[0] != "" && code_vars.selected.relFreq == "TRUE" && instance.tabs.getActive('el-index')  != "1") {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Invalid option", message: `You cannot specify Y variable(s) when relative frequencies is selected.` })
                return res
              }

              code_vars.selected.stringForDatasetWithFreqPercents = ""
              // Initialize an empty array to hold non-empty strings
              let nonEmptyStrings = [];
         
              if (code_vars.selected.fill[4] !== '') {
                  nonEmptyStrings.push(code_vars.selected.fill[4]);
              }
  
              // Check if each input string is not empty, then add it to the array
              if (code_vars.selected.x[3] !== '') {
                  nonEmptyStrings.push(code_vars.selected.x[3]);
              }
              //Creates a , separated string with the contents of the array
              //so if the 1st element of the array is val1 and the 2nd element is val2
              //arr.concat() = val1,val2
              let namesOfDataset = nonEmptyStrings.concat()
  
              let vars4 = nonEmptyStrings.map(nonEmptyStrings => '\"' + nonEmptyStrings + "\"");
          
          code_vars.selected.stringForDatasetWithFreqPercents = "c(" + vars4.join(",") + ")";
          code_vars.selected.generatedVarName = undefined
          if (code_vars.selected.fill[4] != "" && code_vars.selected.x[3] != ""){
              code_vars.selected.generatedVarName = code_vars.selected.fill[4] + "_" + code_vars.selected.x[3]
              code_vars.selected.barVar = code_vars.selected.generatedVarName
          }
          if (code_vars.selected.y[3] == "" || code_vars.selected.y[3] == undefined)
          {
              code_vars.selected.newVariable = "Counts"+"_for_each_" + code_vars.selected.barVar
              namesOfDataset.push("Counts"+"_for_each_" + code_vars.selected.barVar) 
          } else
          {
              namesOfDataset.push("Sum_" + code_vars.selected.y[3] + "_for_each_" + code_vars.selected.barVar) 
              code_vars.selected.newVariable = "Sum_" + code_vars.selected.y[3] + "_for_each_" + code_vars.selected.barVar
          }
          let vars5 = namesOfDataset.map(namesOfDataset => '\"' + namesOfDataset + "\"");
          code_vars.selected.namesOfDataset = "c(" + vars5.join(",") + ")";
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
            res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
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
                        suppressThreshold: instance.objects.suppressThreshold.el.getVal(),
                        //rdgrp1: instance.objects.rdgrp1.el.getVal(),
                        suppressLabels: instance.objects.suppressLabels.el.getVal(),
                        title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") +\n`,
                        Facetrow: instance.objects.Facetrow.el.getVal(),
                        Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                        Facetwrap: instance.objects.Facetwrap.el.getVal(),
                        Facetscale: instance.objects.Facetscale.el.getVal(),
                        fill1: instance.opts.config.content[3].getVal(),
                        dropna: instance.opts.config.content[4].getVal(),
                    }
                }
                code_vars.selected.barVar = code_vars.selected.x[3]
                if (code_vars.selected.y[0] != "" && code_vars.selected.relFreq == "TRUE" && instance.tabs.getActive('el-index')  != "1") {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Invalid option", message: `You cannot specify Y variable(s) when relative frequencies is selected.` })
                    return res
                  }

                  code_vars.selected.stringForDatasetWithFreqPercents = ""
                  // Initialize an empty array to hold non-empty strings
                  let nonEmptyStrings = [];
             
                  if (code_vars.selected.fill[4] !== '') {
                      nonEmptyStrings.push(code_vars.selected.fill[4]);
                  }
      
                  // Check if each input string is not empty, then add it to the array
                  if (code_vars.selected.x[3] !== '') {
                      nonEmptyStrings.push(code_vars.selected.x[3]);
                  }
                  //Creates a , separated string with the contents of the array
                  //so if the 1st element of the array is val1 and the 2nd element is val2
                  //arr.concat() = val1,val2
                  let namesOfDataset = nonEmptyStrings.concat()
      
                  let vars4 = nonEmptyStrings.map(nonEmptyStrings => '\"' + nonEmptyStrings + "\"");
              
              code_vars.selected.stringForDatasetWithFreqPercents = "c(" + vars4.join(",") + ")";
              code_vars.selected.generatedVarName = undefined
              if (code_vars.selected.fill[4] != "" && code_vars.selected.x[3] != ""){
                  code_vars.selected.generatedVarName = code_vars.selected.fill[4] + "_" + code_vars.selected.x[3]
                  code_vars.selected.barVar = code_vars.selected.generatedVarName
              }
              if (code_vars.selected.y[3] == "" || code_vars.selected.y[3] == undefined)
              {
                  code_vars.selected.newVariable = "Counts"+"_for_each_" + code_vars.selected.barVar
                  namesOfDataset.push("Counts"+"_for_each_" + code_vars.selected.barVar) 
              } else
              {
                  namesOfDataset.push("Sum_" + code_vars.selected.y[3] + "_for_each_" + code_vars.selected.barVar) 
                  code_vars.selected.newVariable = "Sum_" + code_vars.selected.y[3] + "_for_each_" + code_vars.selected.barVar
              }
      
              
             
              let vars5 = namesOfDataset.map(namesOfDataset => '\"' + namesOfDataset + "\"");
              code_vars.selected.namesOfDataset = "c(" + vars5.join(",") + ")";
      
      

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
                if (count == 0) {
                    res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
                }
                else {
                    res.push({ cmd: cmd, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
                }
                count++  
            })
        }
        return res;
    }
}
module.exports.item = new barChart().render()
