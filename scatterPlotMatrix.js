var localization = {
  en: {
      title: "Scatterplot Matrix",
      fill: "Specify a variable to group by color",
      label3: "Options for lower diagonal",
      lowerNa: "Option when all X data is NA and all Y data is NA in lower diagonal",
      lowerDiscrete :"Option for categorical X and Y data in the lower diagonal",
      lowerCombo: "Option for continuous X and categorical Y or categorical X and continuous Y in lower diagonal",
      lowerContinuous: "Option for continuous X and continuous Y in lower diagonal",
      label1: "Options for upper diagonal",
      upperNa: "Option when all X data is NA and all Y data is NA in upper diagonal",
      upperDiscrete :"Option for categorical X and Y data in the upper diagonal",
      upperCombo: "Option for continuous X and categorical Y or categorical X and continuous Y in upper diagonal",
      upperContinuous: "Option for continuous X and continuous Y in upper diagonal",
      label2: "Options for diagonal",
      diagNa: "Option when all X data is NA and all Y data is NA in the diagonal",
      diagDiscrete: "Option for categorical X and Y data in the diagonal",
      diagContinuous: "Option for continuous X and continuous Y in the diagonal",
      navigation: "Scatterplot Matrix",
      x: "Specify 2 or more variables",
      bins: "Specify the number of bins",
      binwidth: "Bin width",
      barcolor: "Optionally select a fill color (After color selection, click outside the control to apply)",
      alpha: "Opacity (0-1)",
      flip: "Flip Axis",
      specify_a_title: "Enter a title",
      x_title: "X axis label",
      y_title: "Y axis label",
      Facetrow: "Facet row",
      Facetcolumn: "Facet column",
      Facetwrap: "Facet wrap",
      Facetscale: "Facet scale",
      normalCurveColor: "Optionally select a normal curve color (After color selection, click outside the control to apply)",
      rugPlot: "Display a rug plot (suitable for small datasets)",
      normalCurve: "Display a normal curve (Missing values are removed for curve to display)",
      help: {
          title: "Scatterplot matrix",
          r_help: "help(ggpairs, package=GGally)",
          body: `
          <b>Description</b></br>
          A scatterplot matrix is a grid of scatter plots that shows the relationships between multiple variables. Each scatter plot in the matrix represents the relationship between two variables. </br>
          If there are all NAs in When either the X or Y variable, NA is displayed 
          <br/>
          <b>Usage</b>
          <br/>
          <code> 
          ggpairs(data=dataset1, mapping = ggplot2::aes(color = var1),  columns = c("var2","var3","var4","var5"...), 
          upper = list(continuous = "points", combo = "box_no_facet", discrete = "count", na = "na"),
          lower = list(continuous = "points", combo = "facethist", discrete = "facetbar", na ="na"),
          diag = list(continuous = "densityDiag", discrete = "barDiag", na = "naDiag")
          )
          </code> <br/>
          <b>Arguments</b><br/>
          <ul>
          <li>
          data: The default dataset​
          </li>
          <li>
          mapping: Generate aesthetic mappings, this is user to group by color.​
          </li>
          <li>
          x: Specify the columns to plot.​
          </li>
          <li>
          upper: Specify what you want in the upper diagonal in the following scenarios<br/>
          1. continuous: When you have both X and Y as continuous variables, for e.g. a scatter plot, density, smoothing line...<br/>
          2. combo: When you have X as continuous and Y as factor and vice versa, for e.g. a bar chart, box plot...<br/>
          3. discrete: When both X and Y are factors, for e.g. bar chart, counts...<br/>
          4. What to display in the matrix when X or Y or both contain all NAs
          </li>
          <li>
          lower: Specify what you want in the lower diagonal in the following scenarios<br/>
          1. continuous: When you have both X and Y as continuous variables, for e.g. a scatter plot, density, smoothing line...<br/>
          2. combo: When you have X as continuous and Y as factor and vice versa, for e.g. a bar chart, box plot...<br/>
          3. discrete: When both X and Y are factors, for e.g. bar chart, counts...<br/>         
          4. What to display in the matrix when X or Y or both contain all NAs
          </li>
          <li>
          diag: Specfies what you want in the diagonals in the following scenarios<br/>    
          1. continuous: When you have both X and Y as continuous variables, for e.g. density, bar chart or nothing<br/>
          2. discrete: When both X and Y are factors, for e.g. bar chart, counts...<br/>         
          3. What to display in the matrix when X or Y or both contain all NAs
          </li>      
          </ul>
          <b>Package</b></br>
          GGally;ggplot2;ggthemes</br>
          <b>Help</b></br>
          help(ggpairs, package=GGally)</br>
          Click the R Help button to get detailed R help. You can also enter help(ggpairs), help(aes)​
         `}
  }
}
class scatterPlotMatrix extends baseModal {
  constructor() {
      var config = {
          id: "scatterPlotMatrix",
          label: localization.en.title,
          modalType: "two",
          RCode: `## [Scatterplot matrix]
require(ggplot2);
require(ggthemes);
library(GGally)
ggpairs(data={{dataset.name}}, {{if(options.selected.fill != "")}}\nmapping = ggplot2::aes(color = {{selected.fill|safe}}),{{/if}}
  columns = {{selected.x | safe}}, 
  {{if(options.selected.title != "")}}title = "{{selected.title | safe}}",{{/if}}
  {{if(options.selected.x_title != "")}}xlab = "{{selected.x_title | safe}}",{{/if}}
  {{if(options.selected.y_title != "")}}ylab = "{{selected.y_title | safe}}",{{/if}}
  upper = list(continuous = "{{selected.upperContinuous | safe}}", combo = "{{selected.upperCombo | safe}}", discrete = "{{selected.upperDiscrete | safe}}", na = "{{selected.upperNa | safe}}"),
  lower = list(continuous = "{{selected.lowerContinuous | safe}}", combo = "{{selected.lowerCombo | safe}}", discrete = "{{selected.lowerDiscrete | safe}}", na ="{{selected.lowerNa | safe}}"),
  diag = list(continuous = "{{selected.diagContinuous | safe}}", discrete = "{{selected.diagDiscrete | safe}}", na = "{{selected.diagNa | safe}}")
  ) + {{selected.themes | safe}}
`
      }
      var objects = {
          content_var: { el: new srcVariableList(config, { action: "move" }) },
          x: {
              el: new dstVariableList(config, { label: localization.en.x, no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
              r: ['{{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
          },
          fill: {
            el: new dstVariable(config, {
                label: localization.en.fill,
                no: "fill",
                filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma",
            }), r: ['{{fill|safe}}']

            

        },
          alpha: {
              el: new advancedSlider(config, {
                  no: "alpha",
                  label: localization.en.alpha,
                  min: 0,
                  style: "ml-1",
                  max: 1,
                  step: 0.1,
                  value: 1,
              }), r: ['alpha={{alpha|safe}},']
          },
          bins: {
              el: new input(config, {
              no: 'bins',
              allow_spaces: true,
              type: "numeric",
              width: "w-25",
              value: "9",
              label: localization.en.bins,
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
              label: localization.en.binwidth,
              placeholder: "",
              extraction: "TextAsIs"
            }), r: ['{{binwidth|safe}}']
          },
          flipaxis: { el: new checkbox(config, { label: localization.en.flip, no: "flipaxis" }), r: ' coord_flip() +' },
              normalCurve: { el: new checkbox(config, { label: localization.en.normalCurve, newline:true, no: "normalCurve" }), r: 'TRUE' },
          rugPlot: { el: new checkbox(config, { label: localization.en.rugPlot, no: "rugPlot", style : "mt-2" }), r: 'geom_rug() +' },
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
          normalCurveColor: {
              el: new colorInput(config, {
                  no: 'normalCurveColor',
                  label: localization.en.normalCurveColor,
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
                  value: "Scatterplot matrix",
                  extraction: "NoPrefix|UseComma"
          })},
          x_title: {
              el: new input(config, {
                  no: 'x_title',
                  allow_spaces:true,
                  label: localization.en.x_title,
                  placeholder: "X Axis",
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
          
          diagContinuous: {
              el: new comboBox(config, {
                no: "diagContinuous",
                label: localization.en.diagContinuous,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["densityDiag", "barDiag", "blankDiag"],
                default: "densityDiag"
              })
            },

            diagDiscrete: {
              el: new comboBox(config, {
                no: "diagDiscrete",
                label: localization.en.diagDiscrete,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["barDiag",  "blankDiag"],
                default: "barDiag"
              })
            },

            diagNa: {
              el: new comboBox(config, {
                no: "diagNa",
                label: localization.en.diagNa,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["naDiag",  "blankDiag"],
                default: "naDiag"
              })
            },

            label1: { el: new labelVar(config, { no: 'label1', label: localization.en.label1, h: 5 }) },

            label2: { el: new labelVar(config, { no: 'label2', label: localization.en.label2, h: 5 }) },
            label3: { el: new labelVar(config, { no: 'label3', label: localization.en.label3, h: 5 }) },
            

            upperContinuous: {
              el: new comboBox(config, {
                no: "upperContinuous",
                label: localization.en.upperContinuous,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "points"
              })
            },

            upperCombo: {
              el: new comboBox(config, {
                no: "upperCombo",
                label: localization.en.upperCombo,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: [ "autopoint",  "barDiag", "blank", "box","box_no_facet", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "box_no_facet"
              })
            },

            upperDiscrete: {
              el: new comboBox(config, {
                no: "upperDiscrete",
                label: localization.en.upperDiscrete,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "count"
              })
            },

            upperNa: {
              el: new comboBox(config, {
                no: "upperNa",
                label: localization.en.upperNa,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["na"],
                default: "na"
              })
            },

            lowerContinuous: {
              el: new comboBox(config, {
                no: "lowerContinuous",
                label: localization.en.lowerContinuous,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "points"
              })
            },

            lowerCombo: {
              el: new comboBox(config, {
                no: "lowerCombo",
                label: localization.en.lowerCombo,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "facethist"
              })
            },

            lowerDiscrete: {
              el: new comboBox(config, {
                no: "lowerDiscrete",
                label: localization.en.lowerDiscrete,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot","facetbar", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "facetbar"
              })
            },

            lowerNa: {
              el: new comboBox(config, {
                no: "lowerNa",
                label: localization.en.lowerNa,
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["na"],
                default: "na"
              })
            },



      }

     
      var opts = { el:new optionsVar(config, {
          no: "histogram_options",
          //name: "Options",
          content: [
            objects.label1.el,
            objects.upperContinuous.el,
            objects.upperCombo.el,
            objects.upperDiscrete.el,
            objects.upperNa.el,
            objects.label2.el,
            objects.diagContinuous.el,
            objects.diagDiscrete.el,
            objects.diagNa.el,
            objects.label3.el,
            objects.lowerContinuous.el,
            objects.lowerCombo.el,
            objects.lowerDiscrete.el,
            objects.lowerNa.el,
            objects.title.el,
            objects.x_title.el,
            objects.y_title.el,
          ]
      })};
      const content =   {
          left: [objects.content_var.el.content],
          right: [
              objects.x.el.content,
              objects.fill.el.content,
          ],
          bottom: [opts.el.content],
          nav: {
              name: localization.en.navigation,
              icon: "icon-scatter-graph",
              modal: config.id
          }
      }
      super(config, objects, content);
      this.help = localization.en.help
  }
  prepareExecution(instance) {
      var res = [];
      var code_vars = {
              dataset: {
                  name: getActiveDataset()
              },
              selected: {
              x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal() }, instance.objects.x.r),
              fill: instance.objects.fill.el.getVal(),
              lowerNa: instance.objects.lowerNa.el.getVal(),
              lowerDiscrete :instance.objects.lowerDiscrete.el.getVal(),
              lowerCombo: instance.objects.lowerCombo.el.getVal(),
              lowerContinuous: instance.objects.lowerContinuous.el.getVal(),
              upperNa: instance.objects.upperNa.el.getVal(),
              upperDiscrete : instance.objects.upperDiscrete.el.getVal(),
              upperCombo: instance.objects.upperCombo.el.getVal(),
              upperContinuous: instance.objects.upperContinuous.el.getVal(),  
              diagNa: instance.objects.diagNa.el.getVal(),
              diagDiscrete: instance.objects.diagDiscrete.el.getVal(),
              diagContinuous: instance.objects.diagContinuous.el.getVal(),
              title: instance.objects.title.el.getVal(),
              x_title: instance.objects.x_title.el.getVal(),
              y_title: instance.objects.y_title.el.getVal(),
              }
          }
          if (code_vars.selected.x[0].includes(",")) {
              let vars3 = code_vars.selected.x[0].split(",");
              let vars4 = vars3.map(vars3 => '\"' + vars3.trim() + "\"");
              code_vars.selected.x = "c(" + vars4.join(",") + ")";
            }
          code_vars.selected["x_label"] = instance.objects.x_title.el.getVal() 
          code_vars.selected["y_label"] = instance.objects.y_title.el.getVal() 
          code_vars.selected.themes = themeRsyntax;
          let cmd = instance.dialog.renderR(code_vars)
          cmd = removenewline(cmd);
          res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
      return res;
  }
}
module.exports.item = new scatterPlotMatrix().render()
