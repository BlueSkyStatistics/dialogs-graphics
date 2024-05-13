var localization = {
    en: {
        title: "Pie Chart",
        suppressLabels: "Suppress all labels for counts and percentages",
        optionsLabels: "Options for labels",
        suppressThreshold: "Suppress labels for counts and percentage below the specified threshold percentage",
        radius: "Specify a radius to display labels (increasing the radius moves labels outwards)",
        radiusNote: "Note: Above option does not apply when the option to display concentric circles is selected.",

        navigation: "Pie Chart",
        concentricCircles: "Display concentric circles (Applies only when X axis variable specified)",
        x: "X axis, specify factor variable(s)",
        y: "Y variable, specify a numeric variable",
        fill: "Fill, specify a factor variable",
        alpha: "Opacity (0-1)",
        width: "Width",
        rdgrp1: "Fill proportions",
        flip: "Flip axis",
        barcolor: "Bar color (After color selection, click outside the control to apply)",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        help: {
            title: "Pie Chart",
            r_help: "help(coord_polar, package='ggplot2')",
            body: `
            Document radius = 1.6
            Document width makes the pie chart smaller

            <b>Description</b></br>
            A pie chart (or a circle chart) is a circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents. The quantity can be represented as a count or percentage.
            Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis.</br>
            When you specify multiple x variables, we create a separate pie chart for each x variable. 
            <br/>
            <b>Usage</b>
            <br/>
            <code>
            #You can create a pie chart for a single factor variable, the pies will represent the counts of each level of the factor level. Here the factor variable will correspond to the fill<br/>
            ggplot(data=penguins, aes(x='', fill=species )) +
	geom_bar( alpha=1,width=1,) +
	coord_polar("y") +
	labs(  title= "Pie chart with fill: species") +
	ylab("") + 
	xlab("Count")</br></br>
            #You can create a pie chart  by specifying a scale/numeric variable as the y variable,  and filling the slices of the pie by a factor variable. The pies are filled by summing the values of the y variable for each  level of the factor variable, see example below<br/>
            ggplot(data = penguins, aes(x = "", y = bill_length_mm, fill = species)) + geom_bar(alpha = 1,
                width = 0.9, stat = "identity") + coord_polar("y") </br></br>
    #You can specify a x variable, y variable and fill. The slices are created for every level of the x variable and filled by the sum of the values of the y variable for each level of the variable specified in the fill.<br/>
    ggplot(data = penguins, aes(x = island, y = bill_length_mm, fill = species)) + geom_bar(alpha = 1,
        width = 0.9, stat = "identity")<br/><br/>
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: The default dataset​
            </li>
            <li>
            aes():    Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.​
            </li>
            <li>
            x: (Optional) A factor/categorical variable. The length of the bar corresponds to the counts of each level of the factor variable.​
            </li>
            <li>
            Y: (Optional) a numeric variable
            </li>
            <li>
            fill: (Optional)An optional factor/categorical variable to group the counts of the levels in x: (see above)​
            </li>
            <li>
            geom_bar(): Creates the bar graph, position ="fill" fills the bar with a percentage of each grouping level.​
            </li>
            <li>
            Coor_polar(): The polar coordinate system is most commonly used for pie charts, which are a stacked bar chart in polar coordinates.
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
            coord_flip(): Flip axis(This is optional)​
            </li>
            <li>
            alpha: Controls opacity, takes values between 0-1. 1 means no opacity.
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;</br>
            <b>Help</b></br>
            help(coord_polar, package=ggplot2)</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_bar),help(cord_polar), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)​            
    `}
    }
}
class pieChartNew extends baseModal {
    constructor() {
        var config = {
            id: "pieChartNew",
            label: localization.en.title,
            modalType: "two",
            RCode: `## [Pie Chart]
require(ggplot2);
require(ggthemes);
require(stringr);
#Only fill
{{if (options.selected.yVar ==undefined && options.selected.xVar ==undefined && options.selected.color[5] !=undefined)}}
BSkyTemp <- table({{dataset.name}}[,{{selected.stringForDatasetWithFreqPercents | safe}}])
BSkyTemp <- as.data.frame(BSkyTemp)
#names(counts_df) <- c("{{selected.pieVar | safe}}", "Count")
names(BSkyTemp) <- {{selected.namesOfDataset | safe}}\n
BSkyTemp$Percentage <- with(BSkyTemp, base::round(({{selected.newVariable | safe}} / sum({{selected.newVariable | safe}}) * 100), digits =BSkyGetDecimalDigitSetting() ))
BSkyTemp\${{selected.newVariable | safe}}AsString = as.character(BSkyTemp\${{selected.newVariable | safe}})
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, ")%" )
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
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, ")%" )
BSkyTemp <- BSkyTemp %>%
  dplyr::mutate(
    PercentageAsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", PercentageAsString),
    {{selected.newVariable | safe}}AsString = if_else(Percentage < {{selected.suppressThreshold | safe}}, "", {{selected.newVariable | safe}}AsString),
    )
ggplot(BSkyTemp, aes({{if( options.selected.xVar != undefined)}} x = {{selected.xVar | safe}}{{#else}}x = ""{{/if}}, {{if( options.selected.yVar != undefined)}} y = {{selected.yVar | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
  geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
  coord_polar("y", start = 0) + {{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x={{selected.radius | safe}}, label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}AsString{{#else}}{{selected.yVar | safe}}{{/if}}, "\n", PercentageAsString )), position = position_stack(vjust = 0.5)) +{{/if}}
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
BSkyTemp$PercentageAsString = paste( "(",BSkyTemp$Percentage, ")%" )
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
ggplot(BSkyTemp, aes({{if( options.selected.xVar != undefined)}} x = {{selected.xVar | safe}}{{#else}}x = ""{{/if}}, {{if( options.selected.yVar != undefined)}} y = {{selected.newVariable | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
  geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
  coord_polar("y", start = 0) +{{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x={{selected.radius | safe}},label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}{{#else}}{{selected.newVariable | safe}}{{/if}}, "\n", "(", Percentage, "%)")), position = position_stack(vjust = 0.5)) +{{/if}}
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
   ggplot(BSkyTemp, aes(x = "", {{if( options.selected.yVar != undefined)}} y = {{selected.newVariable | safe}},{{#else}}y = {{selected.newVariable | safe}},{{/if}} fill = {{selected.pieVar | safe}})) +
      geom_bar({{selected.alpha | safe}}{{selected.width | safe}} stat = "identity") +
      coord_polar("y", start = 0) +{{if (options.selected.suppressLabels != "TRUE")}}\n\tgeom_text(aes(x={{selected.radius | safe}},label = paste({{if (options.selected.yVar ==undefined)}}{{selected.newVariable | safe}}{{#else}}{{selected.newVariable | safe}}{{/if}}, "\n", "(", Percentage, "%)")), position = position_stack(vjust = 0.5)) +{{/if}}
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
                el: new dstVariableList(config, { label: localization.en.x, no: "x", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['x={{x|safe}},', 'x="{{x|safe}}",', '{{x|safe}}', '{{x|safe}}', ' X aesthetic: {{x|safe}}', '{{x|safe}}']
            },
            y: {
                el: new dstVariable(config, { label: localization.en.y, no: "y", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
                r: ['y={{y|safe}},', 'y="{{y|safe}}",', 'y="{{y|safe}}",', '{{y|safe}}', ' Y aesthetic: {{y|safe}}', '{{y|safe}}']
            },
            color: {
                el: new dstVariable(config, { label: localization.en.fill, no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal" }),
                r: ['fill={{color|safe}}', ',group={{color|safe}}', ',color="{{color|safe}}"', '{{color|safe}}', ' fill: {{color|safe}}','{{color|safe}}']
            },
            alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    style: "ml-1",
                    label: localization.en.alpha,
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
            width: {
                el: new advancedSlider(config, {
                    no: "width",
                    label: localization.en.width,
                    style: "ml-1",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['width={{width|safe}},']
            },
            rdgrp1: {
                el: new checkbox(config, {
                    label: localization.en.rdgrp1,
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    newline: true,
                    true_value: "TRUE",
                    false_value: "FALSE",
                    no: "rdgrp1"
                })
            },
            flipaxis: { el: new checkbox(config, { label: localization.en.flip, newline: true, no: "flipaxis" }), r: ' coord_flip() +' },
            concentricCircles: { el: new checkbox(config, { label: localization.en.concentricCircles, newline: true, no: "concentricCircles" }) },
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
                    allow_spaces:true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
            })},
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: localization.en.y_title,
                    allow_spaces:true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
            })},

            label1: { el: new labelVar(config, { no: 'label1', style: "mt-2",label: localization.en.optionsLabels, h: 7 }) },

            suppressLabels: {
                el: new checkbox(config, {
                    label: localization.en.suppressLabels,
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
                  label: localization.en.suppressThreshold,
                  min: 0,
                  max: 100,
                  step: 0.1,
                  value: 0,
                  style: "ml-2",
                  extraction: "NoPrefix|UseComma"
                })
              },

              radius: {
                el: new inputSpinner(config, {
                  no: 'radius',
                  label: localization.en.radius,
                  min: 0,
                  max: 5,
                  step: 0.1,
                  value: 1,
                  extraction: "NoPrefix|UseComma"
                })
              },
              label2: { el: new labelVar(config, { no: 'label2', label: localization.en.radiusNote, h: 9 }) }
         
            
            
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
              //  objects.rdgrp1.el.content,
                objects.flipaxis.el.content,
                objects.concentricCircles.el.content,
            ],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chart-pie-solid",
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


          /*   if (code_vars.selected.y[5] !== '') {
                nonEmptyStrings.push(code_vars.selected.y[5]);
            } */
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
module.exports.item = new pieChartNew().render()