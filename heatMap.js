/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class heatMap extends baseModal {
    static dialogId = 'heatMap'
    static t = baseModal.makeT(heatMap.dialogId)

    constructor() {
        var config = {
            id: heatMap.dialogId,
            label: heatMap.t('title'),
            modalType: "two",
            RCode: `
require(gplots);
BSkyHeatMap (rowVariable=c({{selected.rowVariables | safe}}), colVariables=c({{selected.columnVariables | safe}}), {{if (options.selected.title  != "") }}main ="{{selected.title | safe}}",{{/if}}Colv={{selected.groupBox2 | safe}}, Rowv={{selected.groupBox1 | safe}}, dendrogram=c("{{selected.dendrogram | safe}}"),  scale=c("{{selected.scale | safe}}"),trace=c("{{selected.trace | safe}}"), density.info=c("{{selected.density | safe}}"),na.rm={{selected.missVals | safe}},noteForCells ={{selected.valsInCell | safe}},notecol =c("{{selected.noteColors | safe}}"),dataset="{{dataset.name}}")         
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            rowVariables: {
                el: new dstVariable(config, {
                    label: heatMap.t('rowVariables'),
                    no: "rowVariables",
                    filter: "String|Numeric|Date|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            columnVariables: {
                el: new dstVariableList(config, {
                    label: heatMap.t('columnVariables'),
                    no: "columnVariables",
                    filter: "String|Numeric|Date|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: heatMap.t('label1'), h: 6, style:"mt-2" }) },
            title: {
                el: new input(config, {
                    no: 'title',
                    label: heatMap.t('title1'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma",
                    type: "character"
                })
            },
            dendrogram: {
                el: new comboBox(config, {
                    no: 'dendrogram',
                    label: heatMap.t('dendrogram'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "row"
                })
            },
            label2: { el: new labelVar(config, { label: heatMap.t('label2'), h: 6 , style:"mt-3" }) },
            plotRowYes: {
                el: new radioButton(config, { label: heatMap.t('plotRowYes'), no: "groupBox1", increment: "plotRowYes", value: "TRUE", state: "checked", extraction: "ValueAsIs" })
            },
            plotRowNo: {
                el: new radioButton(config, { label: heatMap.t('plotRowNo'), no: "groupBox1", increment: "plotRowNo", value: "FALSE", state: "", extraction: "ValueAsIs" })
            },
            label3: { el: new labelVar(config, { label: heatMap.t('label3'), style: "mt-2", h: 6 }) },
            plotColumnYes: {
                el: new radioButton(config, { label: heatMap.t('plotColumnYes'), no: "groupBox2", increment: "plotColumnYes", value: "TRUE", state: "", extraction: "ValueAsIs" })
            },
            plotColumnNo: {
                el: new radioButton(config, { label: heatMap.t('plotColumnNo'), no: "groupBox2", increment: "plotColumnNo", value: "FALSE", state: "checked", extraction: "ValueAsIs" })
            },
            symmetric: {
                el: new radioButton(config, { label: heatMap.t('symmetric'), no: "groupBox2", increment: "symmetric", value: "Rowv", state: "", extraction: "ValueAsIs" })
            },
            trace: {
                el: new comboBox(config, {
                    no: 'trace',
                    label: heatMap.t('trace'),
                    multiple: false,
                    style: "mt-2",
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "none"
                })
            },
            density: {
                el: new comboBox(config, {
                    no: 'density',
                    label: heatMap.t('density'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "none"
                })
            },
            scale: {
                el: new comboBox(config, {
                    no: 'scale',
                    label: heatMap.t('scale'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "none"
                })
            },
            label4: { el: new labelVar(config, { label: heatMap.t('label4'),  style: "mt-2", h: 6 }) },
            Remove: {
                el: new radioButton(config, { label: heatMap.t('Remove'), no: "missVals", increment: "Remove", value: "TRUE", state: "checked", extraction: "ValueAsIs" })
            },
            Keep: {
                el: new radioButton(config, { label: heatMap.t('Keep'), no: "missVals", increment: "Keep", value: "FALSE", state: "", extraction: "ValueAsIs" })
            },
            valuesNo: {
                el: new radioButton(config, { label: heatMap.t('valuesNo'), no: "valsInCell", increment: "valuesNo", value: "TRUE", state: "checked", extraction: "ValueAsIs" })
            },
            valuesYes: {
                el: new radioButton(config, { label: heatMap.t('valuesYes'), no: "valsInCell", increment: "valuesYes", value: "FALSE", state: "", extraction: "ValueAsIs" })
            },
            noteColors: {
                el: new colorInput(config, {
                    no: 'noteColors',
                    label: heatMap.t('noteColors'),
                    placeholder: "#000000",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#000000"
                })
            },
        };
        var opts = {
            el: new optionsVar(config, {
                no: "Heatmap_options",
                name: heatMap.t('advanced_lbl'),
                content: [
                    objects.title.el,
                    objects.dendrogram.el,
                    objects.label1.el,
                    objects.plotRowYes.el,
                    objects.plotRowNo.el,
                    objects.label2.el,
                    objects.plotColumnNo.el,
                    objects.plotColumnYes.el,
                    objects.symmetric.el,
                    objects.trace.el,
                    objects.density.el,
                    objects.scale.el,
                    objects.label3.el,
                    objects.Remove.el,
                    objects.Keep.el,
                    objects.label4.el,
                    objects.valuesNo.el,
                    objects.valuesYes.el,
                    objects.noteColors.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.rowVariables.el.content, objects.columnVariables.el.content],
            bottom: [opts.el.content],
            nav: {
                name: heatMap.t('navigation'),
                icon: "icon-heatmap",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: heatMap.t('help.title'),
            r_help: heatMap.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: heatMap.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new heatMap().render()
}
