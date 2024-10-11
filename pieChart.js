
class pieChart extends baseModal {
    static dialogId = 'pieChart'
    static t = baseModal.makeT(pieChart.dialogId)

    constructor() {
        var config = {
            id: pieChart.dialogId,
            label: pieChart.t('title'),
            modalType: "two",
            RCode: `## [Pie Chart]
require(ggplot2);
require(ggthemes);
require(stringr);
#Only fill
{{if (options.selected.yVar ==undefined && options.selected.xVar ==undefined && options.selected.color[5] !=undefined)}}
BSkyTemp <- base::table({{dataset.name}}[,{{selected.stringForDatasetWithFreqPercents | safe}}], useNA = c("ifany"))
BSkyTemp <- as.data.frame(BSkyTemp)
#names(counts_df) <- c("{{selected.pieVar | safe}}", "Count")
names(BSkyTemp) <- {{selected.namesOfDataset | safe}}\n
BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)" , sep="")
BSkyTemp <- BSkyTemp %>%
  dplyr::mutate(
    PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
    {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
    )
ggplot(BSkyTemp, aes({{if( options.selected.xVar != undefined)}} x = {{selected.xVar | safe}}{{#else}}x = ""{{/if}}, {{if( options.selected.yVar != undefined)}} y = {{selected.yVar | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
  geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
  coord_polar("y", start = 0) + {{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x ={{selected.radius | safe}},label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}AsString{{#else}}{{selected.yVar | safe}}AsString{{/if}}, "\n",  PercentageAsString )), position = position_stack(vjust = 0.5)) +{{/if}}
  theme_void() +
  labs( title= "Pie chart with{{selected.x[4] | safe}}{{selected.y[4] | safe}}{{selected.color[4] | safe}}") +
    ylab("{{if (options.selected.x_label == "")}}Each pie represents the count of the fill variable: {{selected.color[5] | safe}}{{#else}}{{selected.x_label | safe}}{{/if}}") + 
    xlab("{{if (options.selected.y_label != "")}}{{selected.y_label | safe}}{{/if}}") + {{selected.title|safe}} {{selected.flipaxis | safe}}  
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}




#Fill and x variable but no y variable
{{if (options.selected.yVar ==undefined && options.selected.xVar !=undefined && options.selected.color[5] != undefined)}}
{{if (options.selected.concentricCircles)}} 
#Aggregating the dataset
BSkyTemp <- {{dataset.name}} %>%\n dplyr::group_by({{selected.color[5] | safe}},{{selected.xVar | safe}}) %>%\n dplyr::summarize( {{selected.newVariable | safe}} = dplyr::n(), .groups ='drop')
names(BSkyTemp) <- {{selected.namesOfDataset | safe}}
#Creating a new factor variable
BSkyTemp <- BSkyTemp  %>%
  dplyr::mutate({{selected.colorVar | safe }}_{{selected.xVar | safe }} = paste({{selected.colorVar | safe }}, {{selected.xVar | safe }}, sep = "_"))
#Calculating percents
#BSkyTemp$Percentage <- with(BSkyTemp, {{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100)
BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)", sep="" )
BSkyTemp <- BSkyTemp %>%
  dplyr::mutate(
    PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
    {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
    )
ggplot(BSkyTemp, aes({{if( options.selected.xVar != undefined)}} x = {{selected.xVar | safe}}{{#else}}x = ""{{/if}}, {{if( options.selected.yVar != undefined)}} y = {{selected.yVar | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
  geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
  coord_polar("y", start = 0) + {{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x="", label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}AsString{{#else}}{{selected.yVar | safe}}{{/if}}, "\n", PercentageAsString )), position = position_stack(vjust = 0.5)) +{{/if}}
  theme_void() +
    labs( title= "Chart with{{selected.x[4] | safe}}{{selected.y[4] | safe}}{{selected.color[4] | safe}}") +
    ylab("{{if (options.selected.x_label == "")}}Each pie represents the count of the fill variable: {{selected.color[5] | safe}} grouped by the variable: {{selected.xVar | safe}}{{#else}}{{selected.x_label | safe}}{{/if}}") + 
    xlab("{{if (options.selected.y_label != "")}}{{selected.y_label | safe}}{{/if}}") + {{selected.title|safe}} {{selected.flipaxis | safe}}  
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{#else}}
#No concentric circles
#Aggregating the dataset
BSkyTemp <- {{dataset.name}} %>%\n dplyr::group_by({{selected.color[5] | safe}},{{selected.xVar | safe}}) %>%\n dplyr::summarize( {{selected.newVariable | safe}} = dplyr::n(), .groups ='drop')
names(BSkyTemp) <- {{selected.namesOfDataset | safe}}
#Creating a new factor variable
BSkyTemp <- BSkyTemp  %>%
  dplyr::mutate({{selected.colorVar | safe }}_{{selected.xVar | safe }} = paste({{selected.colorVar | safe }}, {{selected.xVar | safe }}, sep = "_"))
#Calculating percents
#BSkyTemp$Percentage <- with(BSkyTemp, {{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100)
BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)", sep="" )
BSkyTemp <- BSkyTemp %>%
  dplyr::mutate(
    PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
    {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
    )
ggplot(BSkyTemp, aes(x = "", {{if( options.selected.yVar != undefined)}} y = {{selected.yVar | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
  geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
  coord_polar("y", start = 0) + {{if (options.selected.suppressLabels!="TRUE")}}\n\tgeom_text(aes(x={{selected.radius | safe}}, label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}AsString{{#else}}{{selected.yVar | safe}}AsString{{/if}}, "\n", PercentageAsString )), position = position_stack(vjust = 0.5)) +{{/if}}
  theme_void() +
  labs( title= "Pie chart with{{selected.x[4] | safe}}{{selected.y[4] | safe}}{{selected.color[4] | safe}}") +
  ylab("{{if (options.selected.x_label == "")}}Each pie represents the count of the fill variable: {{selected.color[5] | safe}} grouped by the variable: {{selected.xVar | safe}}{{#else}}{{selected.x_label | safe}}{{/if}}") + 
  xlab("{{if (options.selected.y_label != "")}}{{selected.y_label | safe}}{{/if}}") + {{selected.title|safe}} {{selected.flipaxis | safe}}  
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{/if}}
{{/if}}



#Fill and y variable with and without or with x variable
{{if (options.selected.yVar !=undefined && options.selected.color[5] != undefined)}}
{{if (options.selected.concentricCircles)}} 
#Aggregating the dataset
BSkyTemp <- {{dataset.name}} %>%\n dplyr::group_by({{selected.color[5] | safe}}{{if (options.selected.xVar != undefined)}}, {{selected.xVar | safe}}{{/if}}) %>%\n dplyr::summarize ({{selected.newVariable | safe}} = sum({{selected.yVar | safe}}, na.rm = TRUE), .groups ='drop')
names(BSkyTemp) <- {{selected.namesOfDataset | safe}}
{{if(options.selected.xVar != undefined)}}
#Creating a new factor variable if x variable is specified
BSkyTemp <- BSkyTemp  %>%
  dplyr::mutate({{selected.colorVar | safe }}_{{selected.xVar | safe }} = paste({{selected.colorVar | safe }}, {{selected.xVar | safe }}, sep = "_"))
{{/if}}
#Calculating percents
#BSkyTemp$Percentage <- with(BSkyTemp, {{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100)
BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)", sep="" )
BSkyTemp <- BSkyTemp %>%
    dplyr::mutate(
    PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
    {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
    )
ggplot(BSkyTemp, aes({{if( options.selected.xVar != undefined)}} x = {{selected.xVar | safe}}{{#else}}x = ""{{/if}}, {{if( options.selected.yVar != undefined)}} y = {{selected.newVariable | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
  geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
  coord_polar("y", start = 0) +{{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x="",label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}AsString{{#else}}{{selected.newVariable | safe}}AsString{{/if}}, "\n", Percentage )), position = position_stack(vjust = 0.5)) +{{/if}}
  theme_void() +
  labs( title= "Chart with{{selected.x[4] | safe}}{{selected.y[4] | safe}}{{selected.color[4] | safe}}") +
      ylab("{{if (options.selected.x_label == "")}}Each pie represents the total of variable {{selected.yVar | safe}} for each group created by variable(s) {{selected.color[5] | safe}} {{if (options.selected.xVar != undefined)}} and {{selected.xVar | safe}}{{/if}}{{#else}}{{selected.x_label | safe}}{{/if}}") + 
      xlab("{{if (options.selected.y_label != "")}}{{selected.y_label | safe}}{{/if}}") + {{selected.title|safe}} {{selected.flipaxis | safe}}  
    {{selected.Facets | safe}} + {{selected.themes | safe}}
{{#else}}
#No concentric circles
#Aggregating the dataset
BSkyTemp <- {{dataset.name}} %>%\n dplyr::group_by({{selected.color[5] | safe}}{{if (options.selected.xVar != undefined)}}, {{selected.xVar | safe}}{{/if}}) %>%\n dplyr::summarize({{selected.newVariable | safe}} = sum({{selected.yVar | safe}}, na.rm = TRUE), .groups ='drop')
    names(BSkyTemp) <- {{selected.namesOfDataset | safe}}
{{if(options.selected.xVar != undefined)}}
#Creating a new factor variable if x variable is specified
BSkyTemp <- BSkyTemp  %>%
  dplyr::mutate({{selected.colorVar | safe }}_{{selected.xVar | safe }} = paste({{selected.colorVar | safe }}, {{selected.xVar | safe }}, sep = "_"))
{{/if}}
   #Calculating percents
   # BSkyTemp$Percentage <- with(BSkyTemp, {{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100)
   BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
   BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
   BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, "%)", sep="" )
   BSkyTemp <- BSkyTemp %>%
    dplyr::mutate(
    PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
    {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
    )
   ggplot(BSkyTemp, aes(x = "", {{if( options.selected.yVar != undefined)}} y = {{selected.newVariable | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
      geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
      coord_polar("y", start = 0) +{{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x={{selected.radius | safe}},label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}AsString{{#else}}{{selected.newVariable | safe}}AsString{{/if}}, "\n", PercentageAsString)), position = position_stack(vjust = 0.5)) +{{/if}}
      theme_void() +
      labs( title= "Pie chart with{{selected.x[4] | safe}}{{selected.y[4] | safe}}{{selected.color[4] | safe}}") +
      ylab("{{if (options.selected.x_label == "")}}Each pie represents the total of variable {{selected.yVar | safe}} for each group created by variable(s) {{selected.color[5] | safe}} {{if (options.selected.xVar != undefined)}} and {{selected.xVar | safe}}{{/if}}{{#else}}{{selected.x_label | safe}}{{/if}}") + 
      xlab("{{if (options.selected.y_label != "")}}{{selected.y_label | safe}}{{/if}}") + {{selected.title|safe}} {{selected.flipaxis | safe}}  
      {{selected.Facets | safe}} + {{selected.themes | safe}}
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
           
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            x: {
                el: new dstVariableList(config, { label: pieChart.t('x'), no: "x", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}},', 'x="{{x|safe}}",', '{{x|safe}}', '{{x|safe}}', ' X aesthetic: {{x|safe}}', '{{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: pieChart.t('y'), no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['y={{y|safe}},', 'y="{{y|safe}}",', 'y="{{y|safe}}",', '{{y|safe}}', ' Y aesthetic: {{y|safe}}', '{{y|safe}}']
            },
            color: {
                el: new dstVariable(config, { label: pieChart.t('fill'), no: "color", required:true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: ['fill={{color|safe}}', ',group={{color|safe}}', ',color="{{color|safe}}"', '{{color|safe}}', ' fill: {{color|safe}}','{{color|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    style: "ml-1",
                    label: pieChart.t('alpha'),
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            width: {
                el: new advancedSlider(config, {
                    no: "width",
                    label: pieChart.t('width'),
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['width={{width|safe}},']
            },
            rdgrp1: {
                el: new checkbox(config, {
                    label: pieChart.t('rdgrp1'),
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "rdgrp1"
                })
            },
            flipaxis: { el: new checkbox(config, { label: pieChart.t('flip'), newline: true, no: "flipaxis" }), r: ' coord_flip() +' },
            concentricCircles: { el: new checkbox(config, { label: pieChart.t('concentricCircles'), newline: true, no: "concentricCircles" }) },
            barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: pieChart.t('barcolor'),
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
                    label: pieChart.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: pieChart.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: pieChart.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: pieChart.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: "specify_a_title",
                    label: pieChart.t('specify_a_title'),
                    allow_spaces:true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
            })},
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: pieChart.t('x_title'),
                    allow_spaces:true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: pieChart.t('y_title'),
                    allow_spaces:true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
            })},

            label1: { el: new labelVar(config, { no: 'label1', style: "mt-2",label: pieChart.t('optionsLabels'), h: 5 }) },

            suppressLabels: {
                el: new checkbox(config, {
                    label: pieChart.t('suppressLabels'),
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
                  label: pieChart.t('suppressThreshold'),
                  min: 0,
                  max: 100,
                  step: 0.1,
                  value: 0,
                  extraction: "NoPrefix|UseComma"
                })
              },

              radius: {
                el: new inputSpinner(config, {
                  no: 'radius',
                  label: pieChart.t('radius'),
                  min: 0,
                  max: 5,
                  step: 0.1,
                  value: 1,
                  extraction: "NoPrefix|UseComma"
                })
              },
              label2: { el: new labelVar(config, { no: 'label2', label: pieChart.t('radiusNote'), h: 9 }) }            
        }
        var opts = new optionsVar(config, {
            no: "frequency_chart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.label1.el,
                objects.suppressLabels.el,
                objects.suppressThreshold.el,
                objects.radius.el,
                objects.label2.el
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
                objects.color.el.content,
                objects.y.el.content,
                objects.x.el.content,
                objects.alpha.el.content,
                objects.width.el.content,
                objects.flipaxis.el.content,
                objects.concentricCircles.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: pieChart.t('navigation'),
                icon: "icon-chart-pie-solid",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.opts = opts
        
        this.help = {
            title: pieChart.t('help.title'),
            r_help: "help(data,package='utils')",
            body: pieChart.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        if (instance.objects.x.el.getVal() == "") {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    y: instance.dialog.prepareSelected({ y: instance.objects.y.el.getVal()[0] }, instance.objects.y.r),
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    flipaxis: instance.objects.flipaxis.el.getVal() ? instance.objects.flipaxis.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    width: instance.dialog.prepareSelected({ width: instance.objects.width.el.getVal() }, instance.objects.width.r),
                    color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                    pieVar: instance.objects.color.el.getVal()[0],
                    colorVar: instance.objects.color.el.getVal()[0],
                    concentricCircles: instance.objects.concentricCircles.el.getVal(),
                    xVar: instance.objects.x.el.getVal()[0],
                    yVar: instance.objects.y.el.getVal()[0],
                    radius :instance.objects.radius.el.getVal(),
                    suppressThreshold: instance.objects.suppressThreshold.el.getVal(),
                    //rdgrp1: instance.objects.rdgrp1.el.getVal(),
                    suppressLabels: instance.objects.suppressLabels.el.getVal(),
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                }
            }

            code_vars.selected.stringForDatasetWithFreqPercents = ""
            // Initialize an empty array to hold non-empty strings
            let nonEmptyStrings = [];
           
            if (code_vars.selected.color[5] !== '') {
                nonEmptyStrings.push(code_vars.selected.color[5]);
            }

            // Check if each input string is not empty, then add it to the array
            if (code_vars.selected.x[5] !== '') {
                nonEmptyStrings.push(code_vars.selected.x[5]);
            }
            let namesOfDataset = nonEmptyStrings.concat()

            let vars4 = nonEmptyStrings.map(nonEmptyStrings => '\"' + nonEmptyStrings + "\"");
            
            code_vars.selected.stringForDatasetWithFreqPercents = "c(" + vars4.join(",") + ")";
            code_vars.selected.generatedVarName = undefined
            if (code_vars.selected.color[5] != "" && code_vars.selected.x[5] != ""){
                code_vars.selected.generatedVarName = code_vars.selected.color[5] + "_" + code_vars.selected.x[5]
                code_vars.selected.pieVar = code_vars.selected.generatedVarName
            }
            if (code_vars.selected.yVar == undefined)
            {
                code_vars.selected.newVariable = "Counts"+"_for_each_" + code_vars.selected.pieVar
                namesOfDataset.push("Counts"+"_for_each_" + code_vars.selected.pieVar) 
            } else
            {
                namesOfDataset.push("Sum_" + code_vars.selected.yVar + "_for_each_" + code_vars.selected.pieVar) 
                code_vars.selected.newVariable = "Sum_" + code_vars.selected.yVar + "_for_each_" + code_vars.selected.pieVar
            }

            
           
            let vars5 = namesOfDataset.map(namesOfDataset => '\"' + namesOfDataset + "\"");
            code_vars.selected.namesOfDataset = "c(" + vars5.join(",") + ")";
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() 
            //code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
            
        }
        else {
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
                        width: instance.dialog.prepareSelected({ width: instance.objects.width.el.getVal() }, instance.objects.width.r),
                        color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                        pieVar: instance.objects.color.el.getVal()[0],
                        colorVar: instance.objects.color.el.getVal()[0],
                        concentricCircles: instance.objects.concentricCircles.el.getVal(),
                        radius :instance.objects.radius.el.getVal(),
                        xVar: value,
                        yVar: instance.objects.y.el.getVal()[0],
                        suppressThreshold: instance.objects.suppressThreshold.el.getVal(),
                        //   rdgrp1: instance.objects.rdgrp1.el.getVal(),
                        suppressLabels: instance.objects.suppressLabels.el.getVal(),
                        title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                        Facetrow: instance.objects.Facetrow.el.getVal(),
                        Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                        Facetwrap: instance.objects.Facetwrap.el.getVal(),
                        Facetscale: instance.objects.Facetscale.el.getVal(),
                    }
                }

                code_vars.selected.stringForDatasetWithFreqPercents = ""
                // Initialize an empty array to hold non-empty strings
                let nonEmptyStrings = [];
           
                if (code_vars.selected.color[5] !== '') {
                    nonEmptyStrings.push(code_vars.selected.color[5]);
                }

                // Check if each input string is not empty, then add it to the array
                if (code_vars.selected.x[5] !== '') {
                    nonEmptyStrings.push(code_vars.selected.x[5]);
                }
                //Creates a , separated string with the contents of the array
                //so if the 1st element of the array is val1 and the 2nd element is val2
                //arr.concat() = val1,val2
                let namesOfDataset = nonEmptyStrings.concat()

                let vars4 = nonEmptyStrings.map(nonEmptyStrings => '\"' + nonEmptyStrings + "\"");
            
            code_vars.selected.stringForDatasetWithFreqPercents = "c(" + vars4.join(",") + ")";
            code_vars.selected.generatedVarName = undefined
            if (code_vars.selected.color[5] != "" && code_vars.selected.x[5] != ""){
                code_vars.selected.generatedVarName = code_vars.selected.color[5] + "_" + code_vars.selected.x[5]
                code_vars.selected.pieVar = code_vars.selected.generatedVarName
            }
            if (code_vars.selected.yVar == undefined)
            {
                code_vars.selected.newVariable = "Counts"+"_for_each_" + code_vars.selected.pieVar
                namesOfDataset.push("Counts"+"_for_each_" + code_vars.selected.pieVar) 
            } else
            {
                namesOfDataset.push("Sum_" + code_vars.selected.yVar + "_for_each_" + code_vars.selected.pieVar) 
                code_vars.selected.newVariable = "Sum_" + code_vars.selected.yVar + "_for_each_" + code_vars.selected.pieVar
            }

            
           
            let vars5 = namesOfDataset.map(namesOfDataset => '\"' + namesOfDataset + "\"");
            code_vars.selected.namesOfDataset = "c(" + vars5.join(",") + ")";
           
                code_vars.selected["x_label"] = instance.opts.config.content[1].getVal()
                //code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
                code_vars.selected["y_label"] = instance.opts.config.content[2].getVal()
                code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
                code_vars.selected.themes = themeRsyntax;
                let cmd = instance.dialog.renderR(code_vars)
                cmd = removenewline(cmd);
                res.push({ cmd: cmd, cgid: newCommandGroup() })
            }
            )
        }
        return res;
    }
}

module.exports = {
    render: () => new pieChart().render()
}
