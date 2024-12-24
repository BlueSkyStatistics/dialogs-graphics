var localization = {
    en: {
        title: "Box Plot",
        navigation: "Box Plot",
        x: "X variable, specify a Category variable",
        y: "Y variable(s), specify a Numeric variable(s)",
        Fill: "Specify a grouping (Category) variable",
		flipaxis: "Flip axis",
		
		dataPoints: "Select an option to plot data points",
        alpha: "Opacity (0-1)",
        notch: "Notch",
        outliers: "Show Outliers (In Red)",
		barcolor: "Select a color for the lines around the boxes (After color selection, click outside the control to apply)",
		
		//jitterPointsChk: "Spread (jitter effect) the overlapping/crowded points for a group",
        
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",

		angleXaxis_text: "Angle to slant x-axis text values (default 0 for no slanting)",
		angleYaxis_text: "Angle to slant y-axis text values (default 0 for no slanting)",
		axisTickmarksCount: "How many axis values (i.e. tickmark) to display (default 10)",
		
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap (if chosen, any selection of Facet row and column will be ignored)",
        Facetscale: "Facet scale",
		
        label1: "Horizontal lines",
		yIntercept: "Enter comma separated Y intercept value(s) for the horizontal lines, e.g. 100, 200, 300",
        hLineColor: "Select a color for line(s) and label(s)  (After color selection, click outside the control to apply)",
        lineType: "Select the type of line",
        horizontalLinelabel: "Specify comma separated labels (no enclosing quotes) for the horizontal line(s)",
		horizontalLinelabel_angle_text: "Angle to slant horizontal line label text (default 0 for no slanting)", 
										
        label2: "Note: Greater values move the text lower, smaller values move the text higher",
        addHoriRefLines: "Add reference lines",
		
        xyLimits: "X and Y axis limits",
        label5: "Specify a range for X and Y axis values",
        rangeXValues: "Specify the X axis range, for e.g. 0,100 (Leave it blank for categorical/factor axis)",
        rangeYValues: "Specify the Y axis range, for e.g. 0,100",
		
        labelHori_HorizontalJustification: "Note: greater values place the text to the left, smaller values move the text to the right",
        
		//for HORIZONTAL LINES
		verticalJustification: "Control the vertical justification of the label",
		hori_HorizontalJustification: "Control the horizontal justification of the label",
		
		addlLabelHlineTextPositionOffset: "Additional adjustments to position the label text for horizontal lines",
		horiMovementHReflineLabel: "Move text horzontally left or right - use any number with + or - sign (leave 0 for Categorical axis)",
		//isHXaxisDateChk: "Check this box if x-axis is in date or date time (the above number will be converted into number of days)", 
		nobreaklineHRefLabelandValueChk: "Check this box to remove the line break between label value and label text", 
		vertiMovementHReflineLabel: "Move text vertically up or down - use any number with + or - sign (leave 0 for Categorical axis)",
		//isHYaxisDateChk: "Check this box if y-axis is in date or date time (the above number will be converted into number of days)",
		
         help: {
            title: "Box Plot",
            r_help: "help(geom_boxplot, package=ggplot2)",
            body: `
        <b>Description</b></br>
        In descriptive statistics, a box plot or boxplot is a convenient way of graphically depicting groups of numerical data through their quartiles. Box plots may also have lines extending vertically from the boxes (whiskers) indicating variability outside the upper and lower quartiles, hence the terms box-and-whisker plot and box-and-whisker diagram. Outliers may be plotted as individual points. Box and whisker plots are uniform in their use of the box: the bottom and top of the box are always the first and third quartiles, and the band inside the box is always the second quartile (the median). The upper whisker extends from the hinge to the highest value that is within 1.5 * IQR of the hinge, where IQR is the inter-quartile range, or distance between the first and third quartiles. The lower whisker extends from the hinge to the lowest value within 1.5 * IQR of the hinge. Data beyond the end of the whiskers are outliers and plotted as points (as specified by Tukey).​</br>
        Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​</br>
        When you select the option to plot the data points, we do so using geom_dotplot</br>
        By default outliers are shown with black points, when you select the option to show outliers (In Red) via the checkbox, outliers are made more prominent.
        <br/>
        <b>Usage</b>
        <br/>
        <code> 
        ggplot(data =Dataset,aes(x = var1,y = var2,fill = var3)) + geom_boxplot()  + 
        geom_dotplot(binaxis = 'y',stackdir = 'center',dotsize = 0.1)+ coord_flip()+ labs(x = "var1",y = "var2",fill = "var3")   +facet_grid(var4~.)​
        </code> <br/>
        <b>Arguments</b><br/>
        <ul>
        <li>
        data: The default dataset​
        </li>
        <li>
        x: A factor/categorical variable that defines the grouping of the y variable​
        </li>
        <li>
        y: A numeric  variable for which the boxplot is calculated​
        </li>
        <li>
        fill: An optional factor/categorical variable to further group the existing groups. Each sub group will be shown in a distinct color.​
        </li>
        <li>
        aes():    Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.​
        </li>
        <li>
        geom_boxplot():Creates the boxplot. The upper and lower "hinges" correspond to the first and third quartiles (the 25th and 75th percentiles).​
        </li>
        <li>
        geom_dotplot: Plots the data points
        </li>
        <li>
        Labs(): Change axis labels and legend titles (This is optional)​
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
        notch: Notched box plots apply a "notch" or narrowing of the box around the median. Notches are useful in offering a rough guide to significance of difference of medians; if the notches of two boxes do not overlap, this offers evidence of a statistically significant difference between the medians. In a notched box plot, the notches extend 1.58 * IQR / sqrt(n)
        </li>
        </ul>
        <b>Package</b></br>
        ggplot2;ggthemes;stringr</br>
        <b>Help</b></br>
        help(geom_boxplot, package=ggplot2)</br>
        Click the R Help button to get detailed R help. You can also enter help(geom_boxplot), help(labs), help(aes), help(facet_grid), help(theme_calc), help(coord_flip), help (geom_dotplot)
        `}
    }
}
class boxPlot extends baseModal {
    constructor() {
        var config = {
            id: "boxPlot",
            label: localization.en.title,
            modalType: "two",
            RCode:`
require(ggplot2);
require(ggthemes);
require(scales) 
require(lubridate) 


{{if(options.selected.yIntercept !="")}}
bsky_yIntercept =  c({{selected.yIntercept | safe}})
	if(is.Date({{dataset.name}}\${{selected.y[3] | safe}})){
		bsky_yIntercept = as.Date(bsky_yIntercept)
	}else if(is.POSIXct({{dataset.name}}\${{selected.y[3] | safe}})){
		bsky_yIntercept = as.POSIXct(bsky_yIntercept)
	}else bsky_yIntercept = as.numeric(c({{selected.yIntercept | safe}}))	
{{/if}}


{{if(options.selected.rangeXValues !="")}}
bsky_xlim_range =  c({{selected.rangeXValues | safe}})
	if(is.Date({{dataset.name}}\${{selected.x[3] | safe}})){
		bsky_xlim_range = as.Date(bsky_xlim_range)
	}else if(is.POSIXct({{dataset.name}}\${{selected.x[3] | safe}})){
		bsky_xlim_range = as.POSIXct(bsky_xlim_range)
	}else bsky_xlim_range = as.numeric(c({{selected.rangeXValues | safe}}))	
{{/if}}

{{if(options.selected.rangeYValues !="")}}
bsky_ylim_range =  c({{selected.rangeYValues | safe}})
	if(is.Date({{dataset.name}}\${{selected.y[3] | safe}})){
		bsky_ylim_range = as.Date(bsky_ylim_range)
	}else if(is.POSIXct({{dataset.name}}\${{selected.y[3] | safe}})){
		bsky_ylim_range = as.POSIXct(bsky_ylim_range)
	}else bsky_ylim_range = as.numeric(c({{selected.rangeYValues | safe}}))	
{{/if}}


bsky_temp_df = NULL 
bsky_temp_df = with({{dataset.name}}, data.frame({{selected.x[3] | safe}} = as.factor({{selected.x[3] | safe}}),{{selected.y[3] | safe}}{{selected.fill[4] | safe}}
						{{if (options.selected.Facetrow !="")}} ,{{selected.Facetrow | safe}} {{/if}}
						{{if (options.selected.Facetcolumn !="")}} ,{{selected.Facetcolumn | safe}} {{/if}}
						{{if (options.selected.Facetwrap !="")}} ,{{selected.Facetwrap | safe}} {{/if}}
					))
bsky_temp_df = stats::na.omit(bsky_temp_df)


## [Plot name]
bsky_ggplot = NULL 
    
	bsky_ggplot = ggplot(data= bsky_temp_df, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}}{{selected.fill[0] | safe}})) +
	
	geom_boxplot({{if (options.selected.barcolor != "")}} col ="{{selected.barcolor | safe}}",{{/if}} {{selected.outliers | safe }}{{selected.alpha[0] | safe}}{{selected.notch | safe}}) +
    
	{{if (options.selected.chart  =="Stacked")}}geom_dotplot(binaxis = 'y',stackdir = 'center',dotsize = 0.1) +{{/if}}{{ if (options.selected.chart  =="Jitter")}}geom_jitter(shape = 16,position = position_jitter(0.2)) +{{/if}}
    
  {{if (options.selected.referenceLines !="")}}{{selected.referenceLines | safe}}{{/if}}
  labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}{{selected.fill[1] | safe}},title= "Boxplot for variable {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.fill[2] | safe}}") +
  xlab("{{selected.x_label | safe}}") +
  ylab("{{selected.y_label | safe}}") +
  {{selected.title | safe}}
  {{selected.flip | safe}}
  {{selected.Facets | safe}} + {{selected.themes | safe}}
  
					
  if(is.numeric(bsky_temp_df\${{selected.x[3] | safe}})){
	  bsky_ggplot = bsky_ggplot + scale_x_continuous(
					{{if(options.selected.rangeXValues !="")}}
					limits = bsky_xlim_range,
					{{/if}}
					breaks = scales::pretty_breaks(n = c({{selected.axisTickmarksCount | safe}}))
		)
  }
  
  if(is.numeric(bsky_temp_df\${{selected.y[3] | safe}})){
	  bsky_ggplot = bsky_ggplot + scale_y_continuous(
					{{if(options.selected.rangeYValues !="")}}
					limits = bsky_ylim_range,
					{{/if}}
					breaks = scales::pretty_breaks(n = c({{selected.axisTickmarksCount | safe}}))
		)
  }
  
  bsky_ggplot
`,
            pre_start_r: JSON.stringify({
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        //objects;
        var objects = {
            content_var: { el: new srcVariableList(config) },
            y: {
                el: new dstVariableList(config, {
                    label: localization.en.y,
                    no: "y",
                    filter: "Numeric|Scale",
					//filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: localization.en.x,
                    no: "x",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
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
                }), r: [',fill={{fill|safe}}', ',fill="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"', ',{{fill|safe}} = as.factor({{fill|safe}})']
				    
            },
			alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: localization.en.alpha,
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
			notch: { el: new checkbox(config, { label: localization.en.notch, no: "notch" }), r: ' notch = TRUE' },
            outliers: { el: new checkbox(config, { label: localization.en.outliers, no: "outliers" }), r: 'outlier.colour= "red ",outlier.shape=8,outlier.size = 2,' },
			dataPoints: {
                el: new comboBox(config, {
                    no: 'dataPoints',
                    label: localization.en.dataPoints,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "Stacked", "Jitter"],
                    default: "none"
                })
            },
			barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: localization.en.barcolor,
                    placeholder: "#727272",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#727272"
                })
            },
            
			/*
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
			*/
            checkbox: {
                el: new checkbox(config, {
                    label: localization.en.flipaxis,
                    no: "flipBox",
                    extraction: "Boolean",
                }), r: 'coord_flip() + '
            },
			/*
            jitter: {
                el: new checkbox(config, {
                    label: localization.en.jitter,
                    no: "Jitter",
                    newline: true,
                    extraction: "Boolean",
                }), r: 'geom_point( position=\"jitter\") +'
            },
            */
			/*
			jitterPointsChk: { 
                el: new checkbox(config, {
                    label: localization.en.jitterPointsChk, 
					no: "jitterPointsChk",
                    bs_type: "valuebox",
                    //style: "mb-3",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
					//state: "checked",
                }), 
			},
			*/
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
                    no: "title",
                    label: localization.en.specify_a_title,
                    allow_spaces: true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                })
            },
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: localization.en.x_title,
                    allow_spaces: true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                })
            },
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: localization.en.y_title,
                    allow_spaces: true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                })
            },
			angleXaxis_text: {
                el: new inputSpinner(config, { 
					no: 'angleXaxis_text',
                    label: localization.en.angleXaxis_text,
					required: true,
                    min: 0,
                    max: 360,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix",
                    width: "w-25",
            })},
			angleYaxis_text: {
                el: new inputSpinner(config, {
					no: 'angleYaxis_text',
                    label: localization.en.angleYaxis_text,
					required: true,
                    min: 0,
                    max: 360,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix",
                    width: "w-25",
            })},
			axisTickmarksCount: { 
                el: new inputSpinner(config, {  
					no: 'axisTickmarksCount',
                    label: localization.en.axisTickmarksCount,
					required: true,
                    min: 1,
                    max: 200,
                    step: 1,
                    value: 10,
                    extraction: "NoPrefix",
					//style: "ml-3",
                    width: "w-25",
            })},
			
            label1: {
                el: new labelVar(config, {
                    label: localization.en.label1,
                    style: "mt-3",
                    h: 5
                })
            },
            yIntercept: {
                el: new input(config, {
                    no: 'yIntercept',
                    label: localization.en.yIntercept,
                    placeholder: "",
                    //type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
					//allow_spaces:true,
                    //extraction: "NoPrefix|UseComma|Enclosed", 
					//extraction: "CreateArray",
                    value: ""
                })
            },
            hLineColor: {
                el: new colorInput(config, {
                    no: 'hLineColor',
                    label: localization.en.hLineColor,
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
                    label: localization.en.lineType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dashed"
                })
            },
            horizontalLinelabel: {
                el: new input(config, {
                    no: 'horizontalLinelabel',
                    label: localization.en.horizontalLinelabel,
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
			horizontalLinelabel_angle_text: {
                el: new inputSpinner(config, {
					no: 'horizontalLinelabel_angle_text',
                    label: localization.en.horizontalLinelabel_angle_text,
					required: true,
                    min: -360,
                    max: 360,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix",
                    width: "w-25",
            })},
            verticalJustification: {
                el: new inputSpinner(config, {
                    no: 'verticalJustification',
                    label: localization.en.verticalJustification,
                    //min: 0,
                    //max: 1,
                    step: 0.05,
                    value: 0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },
			addlLabelHlineTextPositionOffset: {
                el: new labelVar(config, {
                    label: localization.en.addlLabelHlineTextPositionOffset,
                    style: "mt-3",
                    h: 9
                })
            },
			horiMovementHReflineLabel: {
                el: new input(config, {
                    no: 'horiMovementHReflineLabel',
                    label: localization.en.horiMovementHReflineLabel,
                    placeholder: "",
                    type: "numeric",
                    enforceRobjectRules: false,
                    extraction: "TextAsIs",
                    value: "0",
					width: "w-25",
                })
            },
			/*
			isHXaxisDateChk: { 
                el: new checkbox(config, {
                    label: localization.en.isHXaxisDateChk, 
					no: "isHXaxisDateChk",
                    bs_type: "valuebox",
                    //style: "mt-2 mb-3",
					style: "ml-5",
                    extraction: "BooleanValue",
                    true_value: "lubridate::days",
                    false_value: " ",
					//state: "checked",
					newline: true,
                })
            },
			*/
			vertiMovementHReflineLabel: {
                el: new input(config, {
                    no: 'vertiMovementHReflineLabel',
                    label: localization.en.vertiMovementHReflineLabel,
                    placeholder: "",
                    type: "numeric",
                    enforceRobjectRules: false,
                    extraction: "TextAsIs",
                    value: "0",
					width: "w-25",
                })
            },
			/*
			isHYaxisDateChk: {
                el: new checkbox(config, {
                    label: localization.en.isHYaxisDateChk, 
					no: "isHYaxisDateChk",
                    bs_type: "valuebox",
                    //style: "mt-2 mb-3",
					style: "ml-5",
                    extraction: "BooleanValue",
                    true_value: "lubridate::days",
                    false_value: " ",
					//state: "checked",
					newline: true,
                })
            },
			*/
			nobreaklineHRefLabelandValueChk: {
                el: new checkbox(config, {
                    label: localization.en.nobreaklineHRefLabelandValueChk, 
					no: "nobreaklineHRefLabelandValueChk",
                    bs_type: "valuebox",
                    //style: "mt-2 mb-3",
					//style: "ml-5",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					//state: "checked",
					newline: true,
                })
            },
            label2: {
                el: new labelVar(config, {
                    label: localization.en.label2,
                    style: "mt-3",
                    h: 9
                })
            },
            hori_HorizontalJustification: {
                el: new inputSpinner(config, {
                    no: 'hori_HorizontalJustification',
                    label: localization.en.hori_HorizontalJustification,
                    //min: 0,
                    //max: 1,
                    step: 0.05,
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            labelHori_HorizontalJustification: {
                el: new labelVar(config, {
                    label: localization.en.labelHori_HorizontalJustification,
                    style: "mt-3",
                    h: 9
                })
            },
            label5: {
                el: new labelVar(config, {
                    label: localization.en.label5,
                    style: "mt-3",
                    h: 9
                })
            },
            rangeXValues: {
                el: new input(config, {
                    no: 'rangeXValues',
                    label: localization.en.rangeXValues,
                    placeholder: "",
                    //type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
					//allow_spaces:true,
                    //extraction: "NoPrefix|UseComma|Enclosed",
                    value: ""
                })
            },
            rangeYValues: {
                el: new input(config, {
                    no: 'rangeYValues',
                    label: localization.en.rangeYValues,
                    placeholder: "",
                    //type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
        }
		
        // objects.tabs = {el : new tabsView(config, { no: "bar_type", tabs: [tab1, tab2, tab3], extraction: "NoPrefix" })}
        //var tabs = new tabsView(config, { no: "bar_type", tabs: [tab1, tab2, tab3], extraction: "NoPrefix" })
        var opts = new optionsVar(config, {
            no: "Plot_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el, 
				objects.angleXaxis_text.el,
				objects.angleYaxis_text.el, 
				objects.axisTickmarksCount.el,
				objects.barcolor.el,
            ]
        })
        var addRefLines = {
            el: new optionsVar(config, {
                no: "addRefLines",
                name: localization.en.addHoriRefLines,
                content: [
                    objects.label1.el,
                    objects.yIntercept.el,
                    objects.hLineColor.el,
                    objects.lineType.el,
                    objects.horizontalLinelabel.el,
					objects.horizontalLinelabel_angle_text.el, 
                    objects.verticalJustification.el, 
                    objects.label2.el,
                    
                    objects.hori_HorizontalJustification.el,
                    objects.labelHori_HorizontalJustification.el,
					
					objects.addlLabelHlineTextPositionOffset.el,
					objects.horiMovementHReflineLabel.el,
					//objects.isHXaxisDateChk.el,
					objects.vertiMovementHReflineLabel.el,
					//objects.isHYaxisDateChk.el,
					objects.nobreaklineHRefLabelandValueChk.el,
                ]
            })
        };
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
        var xyLimits = {
            el: new optionsVar(config, {
                no: "xyLimits",
                name: localization.en.xyLimits,
                content: [
                    objects.label5.el,
                    objects.rangeXValues.el,
                    objects.rangeYValues.el
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
				objects.y.el.content, 
				objects.x.el.content, 
				objects.fill.el.content, 
                objects.alpha.el.content,
                objects.dataPoints.el.content,
                objects.notch.el.content,
                objects.outliers.el.content,
				objects.checkbox.el.content
			], 
			bottom: [opts.content, Facets.el.content, addRefLines.el.content, xyLimits.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-scatter_plot",
                onclick: `r_before_modal("${config.id}")`,
                //positionInNav: 10,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        //this.tabs = tabs
        this.opts = opts
        this.help = localization.en.help;
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
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    //jitter: instance.objects.jitter.el.getVal() ? instance.objects.jitter.r : "geom_point() +\n",
					//jitterPointsChk: instance.objects.jitterPointsChk.el.getVal(), 
					
					notch: instance.objects.notch.el.getVal() ? instance.objects.notch.r : "",
                    outliers: instance.objects.outliers.el.getVal() ? instance.objects.outliers.r : "",
                    alpha: instance.dialog.prepareSelected({ alpha: instance.objects.alpha.el.getVal() }, instance.objects.alpha.r),
                    barcolor: instance.opts.config.content[6].getVal(),
                    chart: instance.objects.dataPoints.el.getVal(),
         
                    //size: instance.dialog.prepareSelected({ size: instance.objects.size.el.getVal()[0] }, instance.objects.size.r),
                    //shape: instance.dialog.prepareSelected({ shape: instance.objects.shape.el.getVal()[0] }, instance.objects.shape.r),
                    //opacity: instance.objects.opacity.el.getVal(),
                    
					title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
					
					axisTickmarksCount: instance.objects.axisTickmarksCount.el.getVal(),
					
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
					
                    yIntercept: instance.objects.yIntercept.el.getVal(),
                    hLineColor: instance.objects.hLineColor.el.getVal(),
                    lineType: instance.objects.lineType.el.getVal(),
                    horizontalLinelabel: instance.objects.horizontalLinelabel.el.getVal(), 
					horizontalLinelabel_angle_text: instance.objects. horizontalLinelabel_angle_text.el.getVal(),
                    verticalJustification: instance.objects.verticalJustification.el.getVal(),
                    hori_HorizontalJustification: instance.objects.hori_HorizontalJustification.el.getVal(),
					
					horiMovementHReflineLabel: instance.objects.horiMovementHReflineLabel.el.getVal(), 
					//isHXaxisDateChk: instance.objects.isHXaxisDateChk.el.getVal(),
					nobreaklineHRefLabelandValueChk: instance.objects.nobreaklineHRefLabelandValueChk.el.getVal(),
                    vertiMovementHReflineLabel: instance.objects.vertiMovementHReflineLabel.el.getVal(),
                    //isHYaxisDateChk: instance.objects.isHYaxisDateChk.el.getVal(),
					
                    rangeXValues: instance.objects.rangeXValues.el.getVal(),
                    rangeYValues: instance.objects.rangeYValues.el.getVal(),
                }
            }
			
			if (code_vars.selected.rangeXValues != "") 
            {  
				code_vars.selected.rangeXValues = code_vars.selected.rangeXValues.split(',').map(item => `"${item.trim()}"`).join(', ');
			}
			
			if (code_vars.selected.rangeYValues != "") 
            {  
				code_vars.selected.rangeYValues = code_vars.selected.rangeYValues.split(',').map(item => `"${item.trim()}"`).join(', ');
			}
			
			//code_vars.selected.yInterceptTest = code_vars.selected.yInterceptTest.split(',').map(item => `"${item.trim()}"`).join(', ');
			
			//Forcing to nullify the date axis conversion
			code_vars.selected.isHXaxisDateChk = ""
			code_vars.selected.isHYaxisDateChk = ""
			
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
				code_vars.selected.yIntercept = code_vars.selected.yIntercept.split(',').map(item => `"${item.trim()}"`).join(', ');
                
				yIntercepts = code_vars.selected.yIntercept.split(",");
                yIntercepts.forEach(function (val, index) {
                //I can have 2 horizontal lines, but may have specified labels for just one
					if (HorizontalLabelArr.length > 0)
					{
						code_vars.selected.horizontalLinelabel = HorizontalLabelArr.shift().trimStart().trimEnd()
					} else{
					code_vars.selected.horizontalLinelabel =""
					}
					trimmedValue = val.trimStart(); 
					//trimmedValue = val.trimEnd();
					trimmedValue = trimmedValue.trimEnd();
					//code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\ngeom_hline( yintercept=" + trimmedValue + ", linetype =\"" + code_vars.selected.lineType + "\" ,color = \"" + code_vars.selected.hLineColor + "\") +"
					//code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\ngeom_hline( yintercept= bsky_yIntercept[${index+1}]" + ", linetype =\"" + code_vars.selected.lineType + "\" ,color = \"" + code_vars.selected.hLineColor + "\") +"
					code_vars.selected.horizontalLineCode += `
						geom_hline(yintercept= bsky_yIntercept[${index + 1}], 
						linetype="${code_vars.selected.lineType}", 
						color="${code_vars.selected.hLineColor}")+`;
					
					//if (code_vars.selected.horizontalLinelabel == "") {
					//	code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\nannotate(\"text\", x = max(as.numeric(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.x[3] + "\")]), na.rm = TRUE), y =" + trimmedValue + ", label = \"\n" + trimmedValue + "\", vjust =" + code_vars.selected.verticalJustification +", hjust =" + code_vars.selected.hori_HorizontalJustification + ",color = \"" + code_vars.selected.hLineColor + "\", size = 5, fontface = \"plain\")+"
					//} else {
					//	code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\nannotate(\"text\", x = max(as.numeric(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.x[3] + "\")]), na.rm = TRUE), y =" + trimmedValue + ", label =\"" + code_vars.selected.horizontalLinelabel + "\n" + trimmedValue + "\", vjust =" + code_vars.selected.verticalJustification + ", hjust =" + code_vars.selected.hori_HorizontalJustification + ",color = \"" + code_vars.selected.hLineColor + "\", size = 5, fontface = \"plain\")+"
					//}
					if (code_vars.selected.horizontalLinelabel == "") {                                                                                               
						//	code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\nannotate(\"text\", x = sort(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.x[3] + "\")])[dim("+ code_vars.dataset.name + ")[1]], y =" + trimmedValue + ", label =\n" + trimmedValue + ", vjust =" + code_vars.selected.verticalJustification +", hjust =" + code_vars.selected.hori_HorizontalJustification + ",color = \"" + code_vars.selected.hLineColor + "\", size = 5, fontface = \"plain\")+"
						
						trimmedValue = trimmedValue.replace(/"/g, '') + "\n ";
						trimmedValue = `"${trimmedValue}"`;
						
						//addlLabelHlineTextPositionOffset
					//horiMovementHReflineLabel
					//isHXaxisDateChk
					//vertiMovementHReflineLabel
					//isHYaxisDateChk {{if (options.selected.Facetwrap !="")}} ,{{selected.Facetwrap | safe}} {{/if}}
					
					code_vars.selected.horizontalLineCode += `
						annotate("text", 
							x = sort(bsky_temp_df[,c("${code_vars.selected.x[3]}")])[with(bsky_temp_df, sum(!is.na(${code_vars.selected.x[3]})))] 
							${code_vars.selected.horiMovementHReflineLabel !=0 ? ` + ${code_vars.selected.isHXaxisDateChk}(${code_vars.selected.horiMovementHReflineLabel})` : ''}, 
							y = bsky_yIntercept[${index + 1}]
							${code_vars.selected.vertiMovementHReflineLabel !=0 ? ` + ${code_vars.selected.isHYaxisDateChk}(${code_vars.selected.vertiMovementHReflineLabel})` : ''}, 
							label = ${trimmedValue},  
							vjust = ${code_vars.selected.verticalJustification}, 
							hjust = ${code_vars.selected.hori_HorizontalJustification}, 
							color = "${code_vars.selected.hLineColor}", 
							size = 4, 
							angle = ${code_vars.selected.horizontalLinelabel_angle_text},
							fontface = "plain"
						)+`;
					} else {
						//code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + "\nannotate(\"text\", x = sort(" + code_vars.dataset.name + "[,c(\"" + code_vars.selected.x[3] + "\")])[dim("+ code_vars.dataset.name + ")[1]], y =" + trimmedValue + ", label =\"" + code_vars.selected.horizontalLinelabel + "\n" + trimmedValue + "\", vjust =" + code_vars.selected.verticalJustification + ", hjust =" + code_vars.selected.hori_HorizontalJustification + ",color = \"" + code_vars.selected.hLineColor + "\", size = 5, fontface = \"plain\")+"
						//code_vars.selected.horizontalLineCode = code_vars.selected.horizontalLineCode + 
						
						// Define the label based on the condition
						let Hlabel;
						if (code_vars.selected.nobreaklineHRefLabelandValueChk === "FALSE") {
							Hlabel = `${code_vars.selected.horizontalLinelabel.replace(/"/g, '')}\n${trimmedValue.replace(/"/g, '')}`;
						} else {
							trimmedValue = trimmedValue.replace(/"/g, '') + "\n ";
							trimmedValue = `"${trimmedValue}"`;
							Hlabel = `${code_vars.selected.horizontalLinelabel.replace(/"/g, '')} ${trimmedValue.replace(/"/g, '')}`;
						}
						  
						code_vars.selected.horizontalLineCode += `
						annotate("text", 
							x = sort(bsky_temp_df[,c("${code_vars.selected.x[3]}")])[with(bsky_temp_df, sum(!is.na(${code_vars.selected.x[3]})))] 
							${code_vars.selected.horiMovementHReflineLabel !=0 ? ` + ${code_vars.selected.isHXaxisDateChk}(${code_vars.selected.horiMovementHReflineLabel})` : ''}, 
							y = bsky_yIntercept[${index + 1}]
							${code_vars.selected.vertiMovementHReflineLabel !=0 ? ` + ${code_vars.selected.isHYaxisDateChk}(${code_vars.selected.vertiMovementHReflineLabel})` : ''}, 
							label = "${Hlabel}",
							vjust = ${code_vars.selected.verticalJustification}, 
							hjust = ${code_vars.selected.hori_HorizontalJustification}, 
							color = "${code_vars.selected.hLineColor}", 
							size = 4, 
							angle = ${code_vars.selected.horizontalLinelabel_angle_text},
							fontface = "plain"
						)+`;
					}
                }
                )
            }
			
            code_vars.selected.referenceLines = code_vars.selected.horizontalLineCode //+ code_vars.selected.verticalLineCode
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
			
			code_vars.selected.themes = themeRsyntax + "+\n" + "theme(axis.text.x = element_text(angle =" + instance.opts.config.content[3].getVal() + ", hjust = 1)," + "\n" + "axis.text.y = element_text(angle =" + instance.opts.config.content[4].getVal() + ", hjust = 1))"
			
			//code_vars.selected.themes = themeRsyntax;
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
module.exports.item = new boxPlot().render()