
class boxPlot extends baseModal {
    static dialogId = 'boxPlot'
    static t = baseModal.makeT(boxPlot.dialogId)

    constructor() {
        var config = {
            id: boxPlot.dialogId,
            label: boxPlot.t('title'),
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
                    label: boxPlot.t('y'),
                    no: "y",
                    filter: "Numeric|Scale",
					//filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}']
            },
            x: {
                el: new dstVariable(config, {
                    label: boxPlot.t('x'),
                    no: "x",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
            },
            fill: {
                el: new dstVariable(config, {
                    label: boxPlot.t('Fill'),
                    no: "fill",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',fill={{fill|safe}}', ',fill="{{fill|safe}}"', ', Fill: {{fill|safe}}', ',"{{fill|safe}}"', ',{{fill|safe}} = as.factor({{fill|safe}})']
				    
            },
			alpha: {
                el: new advancedSlider(config, {
                    no: "alpha",
                    label: boxPlot.t('alpha'),
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 1,
                }), r: ['alpha={{alpha|safe}},']
            },
			notch: { el: new checkbox(config, { label: boxPlot.t('notch'), no: "notch" }), r: ' notch = TRUE' },
            outliers: { el: new checkbox(config, { label: boxPlot.t('outliers'), no: "outliers" }), r: 'outlier.colour= "red ",outlier.shape=8,outlier.size = 2,' },
			dataPoints: {
                el: new comboBox(config, {
                    no: 'dataPoints',
                    label: boxPlot.t('dataPoints'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "Stacked", "Jitter"],
                    default: "none"
                })
            },
			barcolor: {
                el: new colorInput(config, {
                    no: 'barcolor',
                    label: boxPlot.t('barcolor'),
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
                    label: boxPlot.t('size'),
                    no: "size",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: [',size={{size|safe}}', ',size="{{size|safe}}"', ', Size: {{size|safe}}', ',"{{size|safe}}"']
            },
            shape: {
                el: new dstVariable(config, {
                    label: boxPlot.t('shape'),
                    no: "shape",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                }), r: [',shape={{shape|safe}}', ',shape="{{shape|safe}}"', ', Shape: {{shape|safe}}', ',"{{shape|safe}}"']
            },
			*/
            checkbox: {
                el: new checkbox(config, {
                    label: boxPlot.t('flipaxis'),
                    no: "flipBox",
                    extraction: "Boolean",
                }), r: 'coord_flip() + '
            },
			/*
            jitter: {
                el: new checkbox(config, {
                    label: boxPlot.t('jitter'),
                    no: "Jitter",
                    newline: true,
                    extraction: "Boolean",
                }), r: 'geom_point( position=\"jitter\") +'
            },
            */
			/*
			jitterPointsChk: { 
                el: new checkbox(config, {
                    label: boxPlot.t('jitterPointsChk'), 
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
                    label: boxPlot.t('Facetrow'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetcolumn: {
                el: new comboBox(config, {
                    no: 'Facetcolumn',
                    label: boxPlot.t('Facetcolumn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetwrap: {
                el: new comboBox(config, {
                    no: 'Facetwrap',
                    label: boxPlot.t('Facetwrap'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            Facetscale: {
                el: new comboBox(config, {
                    no: 'Facetscale',
                    label: boxPlot.t('Facetscale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "free_x", "free_y", "free_x_and_y"],
                    default: ""
                })
            },
            title: {
                el: new input(config, {
                    no: "title",
                    label: boxPlot.t('specify_a_title'),
                    allow_spaces: true,
                    placeholder: "Chart title",
                    extraction: "NoPrefix|UseComma"
                })
            },
            x_title: {
                el: new input(config, {
                    no: 'x_title',
                    label: boxPlot.t('x_title'),
                    allow_spaces: true,
                    placeholder: "X Axis",
                    extraction: "NoPrefix|UseComma"
                })
            },
            y_title: {
                el: new input(config, {
                    no: 'y_title',
                    label: boxPlot.t('y_title'),
                    allow_spaces: true,
                    placeholder: "Y Axis",
                    extraction: "NoPrefix|UseComma"
                })
            },
			angleXaxis_text: {
                el: new inputSpinner(config, { 
					no: 'angleXaxis_text',
                    label: boxPlot.t('angleXaxis_text'),
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
                    label: boxPlot.t('angleYaxis_text'),
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
                    label: boxPlot.t('axisTickmarksCount'),
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
                    label: boxPlot.t('label1'),
                    style: "mt-3",
                    h: 5
                })
            },
            yIntercept: {
                el: new input(config, {
                    no: 'yIntercept',
                    label: boxPlot.t('yIntercept'),
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
                    label: boxPlot.t('hLineColor'),
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
                    label: boxPlot.t('lineType'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dashed"
                })
            },
            horizontalLinelabel: {
                el: new input(config, {
                    no: 'horizontalLinelabel',
                    label: boxPlot.t('horizontalLinelabel'),
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
                    label: boxPlot.t('horizontalLinelabel_angle_text'),
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
                    label: boxPlot.t('verticalJustification'),
                    //min: 0,
                    //max: 1,
                    step: 0.05,
                    value: 0.5,
                    extraction: "NoPrefix|UseComma"
                })
            },
			addlLabelHlineTextPositionOffset: {
                el: new labelVar(config, {
                    label: boxPlot.t('addlLabelHlineTextPositionOffset'),
                    style: "mt-3",
                    h: 9
                })
            },
			horiMovementHReflineLabel: {
                el: new input(config, {
                    no: 'horiMovementHReflineLabel',
                    label: boxPlot.t('horiMovementHReflineLabel'),
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
                    label: boxPlot.t('isHXaxisDateChk'), 
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
                    label: boxPlot.t('vertiMovementHReflineLabel'),
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
                    label: boxPlot.t('isHYaxisDateChk'), 
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
                    label: boxPlot.t('nobreaklineHRefLabelandValueChk'), 
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
                    label: boxPlot.t('label2'),
                    style: "mt-3",
                    h: 9
                })
            },
            hori_HorizontalJustification: {
                el: new inputSpinner(config, {
                    no: 'hori_HorizontalJustification',
                    label: boxPlot.t('hori_HorizontalJustification'),
                    //min: 0,
                    //max: 1,
                    step: 0.05,
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            labelHori_HorizontalJustification: {
                el: new labelVar(config, {
                    label: boxPlot.t('labelHori_HorizontalJustification'),
                    style: "mt-3",
                    h: 9
                })
            },
            label5: {
                el: new labelVar(config, {
                    label: boxPlot.t('label5'),
                    style: "mt-3",
                    h: 9
                })
            },
            rangeXValues: {
                el: new input(config, {
                    no: 'rangeXValues',
                    label: boxPlot.t('rangeXValues'),
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
                    label: boxPlot.t('rangeYValues'),
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
                name: boxPlot.t('addHoriRefLines'),
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
                name: boxPlot.t('facets_lbl'),
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
                name: boxPlot.t('xyLimits'),
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
                name: boxPlot.t('navigation'),
                icon: "icon-scatter_plot",
                onclick: `r_before_modal("${config.id}")`,
                //positionInNav: 10,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        //this.tabs = tabs
        this.opts = opts
        this.help = boxPlot.t('help');
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

module.exports = {
    render: () => new boxPlot().render()
}
