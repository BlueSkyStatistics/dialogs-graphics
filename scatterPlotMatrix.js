
class scatterPlotMatrix extends baseModal {
    static dialogId = 'scatterPlotMatrix'
    static t = baseModal.makeT(scatterPlotMatrix.dialogId)

  constructor() {
      var config = {
            id: scatterPlotMatrix.dialogId,
          label: scatterPlotMatrix.t('title'),
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
              el: new dstVariableList(config, { label: scatterPlotMatrix.t('x'), no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }),
              r: ['{{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}']
          },
          fill: {
            el: new dstVariable(config, {
                label: scatterPlotMatrix.t('fill'),
                no: "fill",
                filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma",
            }), r: ['{{fill|safe}}']

            

        },
          alpha: {
              el: new advancedSlider(config, {
                  no: "alpha",
                  label: scatterPlotMatrix.t('alpha'),
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
              label: scatterPlotMatrix.t('bins'),
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
              label: scatterPlotMatrix.t('binwidth'),
              placeholder: "",
              extraction: "TextAsIs"
            }), r: ['{{binwidth|safe}}']
          },
          flipaxis: { el: new checkbox(config, { label: scatterPlotMatrix.t('flip'), no: "flipaxis" }), r: ' coord_flip() +' },
              normalCurve: { el: new checkbox(config, { label: scatterPlotMatrix.t('normalCurve'), newline:true, no: "normalCurve" }), r: 'TRUE' },
          rugPlot: { el: new checkbox(config, { label: scatterPlotMatrix.t('rugPlot'), no: "rugPlot", style : "mt-2" }), r: 'geom_rug() +' },
          barcolor: {
              el: new colorInput(config, {
                  no: 'barcolor',
                  label: scatterPlotMatrix.t('barcolor'),
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
                  label: scatterPlotMatrix.t('normalCurveColor'),
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
                  label: scatterPlotMatrix.t('Facetrow'),
                  multiple: false,
                  extraction: "NoPrefix|UseComma",
                  options: [],
                  default: ""
              })
          },
          Facetcolumn: {
              el: new comboBox(config, {
                  no: 'Facetcolumn',
                  label: scatterPlotMatrix.t('Facetcolumn'),
                  multiple: false,
                  extraction: "NoPrefix|UseComma",
                  options: [],
                  default: ""
              })
          },
          Facetwrap: {
              el: new comboBox(config, {
                  no: 'Facetwrap',
                  label: scatterPlotMatrix.t('Facetwrap'),
                  multiple: false,
                  extraction: "NoPrefix|UseComma",
                  options: [],
                  default: ""
              })
          },
          Facetscale: {
              el: new comboBox(config, {
                  no: 'Facetscale',
                  label: scatterPlotMatrix.t('Facetscale'),
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
                  label: scatterPlotMatrix.t('specify_a_title'),
                  value: "Scatterplot matrix",
                  extraction: "NoPrefix|UseComma"
          })},
          x_title: {
              el: new input(config, {
                  no: 'x_title',
                  allow_spaces:true,
                  label: scatterPlotMatrix.t('x_title'),
                  placeholder: "X Axis",
                  extraction: "NoPrefix|UseComma"
          })},
          y_title: {
              el: new input(config, {
                  no: 'y_title',
                  allow_spaces:true,
                  label: scatterPlotMatrix.t('y_title'),
                  placeholder: "Y Axis",
                  extraction: "NoPrefix|UseComma"
          })},  
          
          diagContinuous: {
              el: new comboBox(config, {
                no: "diagContinuous",
                label: scatterPlotMatrix.t('diagContinuous'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["densityDiag", "barDiag", "blankDiag"],
                default: "densityDiag"
              })
            },

            diagDiscrete: {
              el: new comboBox(config, {
                no: "diagDiscrete",
                label: scatterPlotMatrix.t('diagDiscrete'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["barDiag",  "blankDiag"],
                default: "barDiag"
              })
            },

            diagNa: {
              el: new comboBox(config, {
                no: "diagNa",
                label: scatterPlotMatrix.t('diagNa'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["naDiag",  "blankDiag"],
                default: "naDiag"
              })
            },

            label1: { el: new labelVar(config, { no: 'label1', label: scatterPlotMatrix.t('label1'), h: 5 }) },

            label2: { el: new labelVar(config, { no: 'label2', label: scatterPlotMatrix.t('label2'), h: 5 }) },
            label3: { el: new labelVar(config, { no: 'label3', label: scatterPlotMatrix.t('label3'), h: 5 }) },
            

            upperContinuous: {
              el: new comboBox(config, {
                no: "upperContinuous",
                label: scatterPlotMatrix.t('upperContinuous'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "points"
              })
            },

            upperCombo: {
              el: new comboBox(config, {
                no: "upperCombo",
                label: scatterPlotMatrix.t('upperCombo'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: [ "autopoint",  "barDiag", "blank", "box","box_no_facet", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "box_no_facet"
              })
            },

            upperDiscrete: {
              el: new comboBox(config, {
                no: "upperDiscrete",
                label: scatterPlotMatrix.t('upperDiscrete'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "count"
              })
            },

            upperNa: {
              el: new comboBox(config, {
                no: "upperNa",
                label: scatterPlotMatrix.t('upperNa'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["na"],
                default: "na"
              })
            },

            lowerContinuous: {
              el: new comboBox(config, {
                no: "lowerContinuous",
                label: scatterPlotMatrix.t('lowerContinuous'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "points"
              })
            },

            lowerCombo: {
              el: new comboBox(config, {
                no: "lowerCombo",
                label: scatterPlotMatrix.t('lowerCombo'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "facethist"
              })
            },

            lowerDiscrete: {
              el: new comboBox(config, {
                no: "lowerDiscrete",
                label: scatterPlotMatrix.t('lowerDiscrete'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["autopoint",  "barDiag", "blank", "box", "cor", "count", "density", "densityDiag", "dot","facetbar", "facethist", "facetDensity", "ggpairs", "hist", "histDiag", "nostic_box", "nostic_hat", "nostic_resid", "nostic_se_fit", "nostic_sigma", "nostic_sl", "pcor", "points", "prcomp", "ratio", "smooth", "smoothloess", "smooth_lm", "text", "xspline"],
                default: "facetbar"
              })
            },

            lowerNa: {
              el: new comboBox(config, {
                no: "lowerNa",
                label: scatterPlotMatrix.t('lowerNa'),
                multiple: false,
                extraction: "NoPrefix|UseComma",
                options: ["na"],
                default: "na"
              })
            },



      }

     
      var opts = { el:new optionsVar(config, {
          no: "histogram_options",
          name: "Options",
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
              name: "Scatterplot Matrix",
              icon: "icon-scatter-graph",
              modal: config.id
          }
      }
      super(config, objects, content);
      
        this.help = {
            title: scatterPlotMatrix.t('help.title'),
            r_help: "help(data,package='utils')",
            body: scatterPlotMatrix.t('help.body')
        }

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
          res.push({ cmd: cmd, cgid: newCommandGroup() })
      return res;
  }
}
module.exports.item = new scatterPlotMatrix().render()
