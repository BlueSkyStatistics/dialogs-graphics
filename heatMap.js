/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "HeatMap",
        navigation: "HeatMap",
        rowVariables: "Target variable",
        columnVariables: "Column variables",
        options: "Options",
        title1: "Title of Heatmap",
        dendrogram: "Dendogram:",
        label1: "Row dendrogram options:",
        plotRowYes: "Reorder dendrogram based on row means",
        plotRowNo: "No reordering (dendrogram will not be computed)",
        label2: "Column dendrogram options",
        plotColumnYes: "Reorder dendrogram based on column means",
        plotColumnNo: "No",
        symmetric: "In the case of symmetric matrix treat columns like rows",
        trace: "Options for drawing solid trace line across rows, columns, both rows and columns or none",
        density: "Density options:",
        scale: "Values should be centered in row direction, column direction or none",
        label3: "Missing values",
        Remove: "Remove all rows that contain a missing value",
        Keep: "Keep rows that contain missing values",
        label4: "Place values in the cell",
        valuesNo: "Yes",
        valuesYes: "No",
        noteColors: "Choose a color for cell values (After color selection, click outside the control to apply):",
		advanced_lbl: "Advanced",
        help: {
            title: "HeatMap",
            r_help: "help(heatmap.2,package='gplots')",
            body: `
            <b>Description</b></br>
            A heat map is a graphical representation of data where the individual values contained in a matrix are represented as colors.  Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis</br>
            The dataset must be in the format  column1, column2…columnN where</br>
            column1: Identifies the subjects e.g. names of people whose the cholesterol values are plotted</br>
            column2:  Identifies the cholesterol values at time 1</br>
            column3:  Identifies the cholesterol values at time 2</br>
            column4:  Identifies the cholesterol values at time 3</br>
            column5:  Identifies the cholesterol values at time 4…</br>
            Column1 is a label for each row in the heatmap.</br>
            For Column 2 onwards, values in each row of the column are represented as colors in the heatmap.</br>
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            BSkyHeatMap(rowVariable=c('Subject'),colVariables=c('chol1','chol2','chol3','chol4'),Colv=FALSE,Rowv=TRUE,dendrogram=c("row"),scale=c("none"),trace=c("none"),density.info=c("none"),na.rm=TRUE,noteForCells =FALSE,notecol =c("black"),dataset="Dataset4")<br/>
            The above function is in the BlueSky package and invokes the heatmap.2 function in the gplots package.
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: The default dataset
            </li>
            <li>
            rowVariable: The column variable that contains information about the subjects that the graph is constructed for, see above
            </li>
            <li>
            colVariables:  a list of column variables that contain values that will be represented as colors in the heatmap
            </li>
            <li>
            Colv: determines if and how the column dendrogram should be reordered. Has the options as the Rowv argument above and additionally when x is a square matrix, Colv="Rowv" means that columns should be treated identically to the rows.
            </li>
            <li>
            Rowv:   determines if and how the row dendrogram should be reordered. By default, it is TRUE, which implies dendrogram is computed and reordered based on row means. If NULL or FALSE, then no dendrogram is computed and no reordering is done. If a dendrogram, then it is used "as-is", i.e. without any reordering. If a vector of integers, then dendrogram is computed and reordered based on the order of the vector.
            </li>
            <li>
            na.rm: logical determining whether NA’s should be removed
            </li>
            <li>
            dendrogram: character string indicating whether to draw 'none', 'row', 'column' or 'both' dendrograms. Defaults to 'both'. However, if Rowv (or Colv) is FALSE or NULL and dendrogram is 'both', then a warning is issued and Rowv (or Colv) arguments are honored.
            </li>
            <li>
            scale: character indicating if the values should be centered and scaled in either the row direction or the column direction, or none. The default is "none".
            </li>
            <li>
            trace: character indicating if the values should be centered and scaled in either the row direction or the column direction, or none. The default is "none".
            </li>
            <li>
            density.info: character string indicating whether to superimpose a 'histogram', a 'density' plot, or no plot ('none') on the color-key.
            </li>
            <li>
            noteForCells: logical indicating whether values should be placed in the cells of the heatmap.
            </li>
            <li>
            notecol: color of notes. If specified values are noted in the heatmap cells in color specified..
            </li>
            </ul>
            <b>Package</b></br>
            BlueSky;gplots;</br>
            <b>Help</b></br>
            help(heatmap.2,package='gplots')</br>
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_histogram), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)</br>
            Sample Datasets: See Heatmaps.Rdata in the Sample Datasets\Sample R Datasets folder</br>
     `}
    }
}
class heatMap extends baseModal {
    constructor() {
        var config = {
            id: "heatMap",
            label: localization.en.title,
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
                    label: localization.en.rowVariables,
                    no: "rowVariables",
                    filter: "String|Numeric|Date|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            columnVariables: {
                el: new dstVariableList(config, {
                    label: localization.en.columnVariables,
                    no: "columnVariables",
                    filter: "String|Numeric|Date|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6, style:"mt-2" }) },
            title: {
                el: new input(config, {
                    no: 'title',
                    label: localization.en.title1,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma",
                    type: "character"
                })
            },
            dendrogram: {
                el: new comboBox(config, {
                    no: 'dendrogram',
                    label: localization.en.dendrogram,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "row"
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 , style:"mt-3" }) },
            plotRowYes: {
                el: new radioButton(config, { label: localization.en.plotRowYes, no: "groupBox1", increment: "plotRowYes", value: "TRUE", state: "checked", extraction: "ValueAsIs" })
            },
            plotRowNo: {
                el: new radioButton(config, { label: localization.en.plotRowNo, no: "groupBox1", increment: "plotRowNo", value: "FALSE", state: "", extraction: "ValueAsIs" })
            },
            label3: { el: new labelVar(config, { label: localization.en.label3, style: "mt-2", h: 6 }) },
            plotColumnYes: {
                el: new radioButton(config, { label: localization.en.plotColumnYes, no: "groupBox2", increment: "plotColumnYes", value: "TRUE", state: "", extraction: "ValueAsIs" })
            },
            plotColumnNo: {
                el: new radioButton(config, { label: localization.en.plotColumnNo, no: "groupBox2", increment: "plotColumnNo", value: "FALSE", state: "checked", extraction: "ValueAsIs" })
            },
            symmetric: {
                el: new radioButton(config, { label: localization.en.symmetric, no: "groupBox2", increment: "symmetric", value: "Rowv", state: "", extraction: "ValueAsIs" })
            },
            trace: {
                el: new comboBox(config, {
                    no: 'trace',
                    label: localization.en.trace,
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
                    label: localization.en.density,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "none"
                })
            },
            scale: {
                el: new comboBox(config, {
                    no: 'scale',
                    label: localization.en.scale,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["none", "row", "column", "both"],
                    default: "none"
                })
            },
            label4: { el: new labelVar(config, { label: localization.en.label4,  style: "mt-2", h: 6 }) },
            Remove: {
                el: new radioButton(config, { label: localization.en.Remove, no: "missVals", increment: "Remove", value: "TRUE", state: "checked", extraction: "ValueAsIs" })
            },
            Keep: {
                el: new radioButton(config, { label: localization.en.Keep, no: "missVals", increment: "Keep", value: "FALSE", state: "", extraction: "ValueAsIs" })
            },
            valuesNo: {
                el: new radioButton(config, { label: localization.en.valuesNo, no: "valsInCell", increment: "valuesNo", value: "TRUE", state: "checked", extraction: "ValueAsIs" })
            },
            valuesYes: {
                el: new radioButton(config, { label: localization.en.valuesYes, no: "valsInCell", increment: "valuesYes", value: "FALSE", state: "", extraction: "ValueAsIs" })
            },
            noteColors: {
                el: new colorInput(config, {
                    no: 'noteColors',
                    label: localization.en.noteColors,
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
                name: localization.en.advanced_lbl,
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
                name: localization.en.navigation,
                icon: "icon-heatmap",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new heatMap().render()