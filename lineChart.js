var localization = {
    en: {
        title: "Line Chart",
        navigation: "Points",
        label1: "Click on the tab below corresponding to the type of line chart you want. The default is connected by order.",
        x: "X axis",
        y: "Y axis, specify a numeric variable(s)",
        color: "Group/Color, specify a factor variable",
        line: "By Order",
        linetype: "A separate line type will be used for each level of the factor variable",
        stair: "Stair Steps",
        path: "By occurrence",
        lineChartType: "Click on the type of Line Chart below",
        alpha: "Opacity (0-1)",
        flipBox: "Flip Axis",
        specify_a_title: "Enter a title",
        x_title: "X axis label",
        y_title: "Y axis label",
        Facetrow: "Facet row",
        Facetcolumn: "Facet column",
        Facetwrap: "Facet wrap",
        Facetscale: "Facet scale",
        sizePoint: "Size of the points",
        sizeLine:"Width of the line",
        help: {
            title: "Line Chart",
            r_help: "help(geom_line, package=ggplot2)",
            body: `
            <b>Description</b></br>
            The option to use a different line type for each level of the factor variable specified is provided to support publications that don't support color. 
            Creates a line chart (connected by order) or stair step plot or orders the line chart by occurrence of the points in the dataset. Click on the tab corresponding to the type of line chart you want.</br>
            Line chart (connected by order): A line chart plots a line through points defined by the x and y coordinates and connects them in the order of variables on the x axis. When a group/color is set to a factor variable, the points are grouped by color and a separate line is generated for each group. Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​</br>
            Stair step plot: A line chart plots a line through points defined by the x and y coordinates and creates a stair step plot, highlighting exactly when changes occur. When a color is set to a factor variable, the points are grouped by color and a separate line is generated for each color group. Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​</br>
            Ordered by occurrence: A line chart plots a line through points defined by the x and y coordinates and connects them in the order of in which variables occur in the dataset. When a color is set to a factor variable, the points are grouped by color and a separate line is generated for each color group. Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​.</br>
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            #Line chart<br/>
            ggplot(data=Dataset2,aes(x =var1,y =var2)) +
             geom_line( stat = "identity",position = "identity",aes (color = var3),alpha=0.5) +
             labs(x ="var1",y ="var2", title= "Line chart for ...")<br/>
            #Stair step plot<br/>
            ggplot(data=Dataset2,aes(x =var1,y =var2)) +
             geom_step( stat = "identity",position = "identity",aes (color = var3),alpha=0.5) +
             labs(x ="var1",y ="var2",title= "Line chart for ...")<br/>
            #Ordered by occurrence<br/>
            ggplot(data=Dataset2,aes(x =var1,y =var2)) +
             geom_path( stat = "identity",position = "identity",aes (color = var3),alpha=0.5) +
             labs(x ="var1",y ="var2",title= "Line chart for ...")
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: The default dataset​
            </li>
            <li>
            aes(): Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms.​
            </li>
            <li>
            x: A numeric or factor variable
            </li>
            <li>
            y: the numeric/scale  variable for which points are plotted on the y axis​
            </li>
            <li>
            color: an optional factor variable to group points (by color)​
            </li>
            <li>
            labs(): Change axis labels and legend titles(This is optional)​
            </li>
            <li>
            facet_grid(): Lay out panels in a grid(This is optional)​
            </li>
            <li>
            theme_calc(): Specifies the calculator theme(This is optional)​
            </li>
            <li>
            geom_line(): Connect observations ordered by x value, see x:​
            </li>
            <li>
            coord_flip(): Flip axis(This is optional)​
            </li>
            </ul>
            <b>Package</b></br>
            ggplot2;ggthemes;</br>
            <b>Help</b></br>
            #Line chart
            help(geom_line, package='ggplot2')
            #Line chart stair step
            help(geom_step, package=ggplot2)
            #Variable order
            help(geom_path, package='ggplot2')
            Other: Click the R Help button to get detailed R help. You can also enter help(labs), help(geom_line), help(aes), help(facet_grid), help(theme_calc), help(coord_flip)​            
    `}
    }
}
class lineChartModal extends baseModal {
    constructor() {
        const config = {
            id: "lineChartModal",
            label: localization.en.title,
            modalType: "two",
            RCode: `## [Line chart (line drawn in order of variables on X axis)]
require(ggplot2);
require(ggthemes);
ggplot(data={{dataset.name}}, aes({{selected.x[0] | safe}}{{selected.y[0] | safe}} {{selected.color[0]}})) +
    {{selected.chart}}(stat = "identity", position = "identity", alpha=0.5{{if (options.selected.sizeLine != "")}}, size = {{selected.sizeLine | safe }}{{/if}}{{selected.linetype[0] | safe}}) +
    geom_point({{if (options.selected.sizePoint != "")}}size = {{selected.sizePoint | safe }}{{/if}}) +
    labs({{selected.x[1] | safe}}{{selected.y[1] | safe}}, title= "Line chart ({{selected.label}})\nfor {{selected.x[2] | safe}} {{selected.y[2] | safe}} {{selected.color[1]}}") +
    xlab("{{selected.x_label|safe}}") + ylab("{{selected.y_label|safe}}") + {{selected.title|safe}}{{selected.flip}} 
    {{selected.Facets | safe}} + {{selected.themes | safe}}
`,
            pre_start_r: JSON.stringify({
                Facetrow: "returnFactorNamesOfFactorVars('{{dataset.name}}', cross=TRUE)",
                Facetcolumn: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
                Facetwrap: "returnFactorNamesOfFactorVars('{{dataset.name}}',cross=TRUE)",
            })
        }
        var objects = {
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            content_var: { el: new srcVariableList(config) },
            y: { el: new dstVariableList(config, { label: localization.en.y, no: "y", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: [',y={{y|safe}}', ',y="{{y|safe}}"', ',Y axis: {{y|safe}}', '{{y|safe}}'] },
            x: { el: new dstVariable(config, { label: localization.en.x, no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: ['x={{x|safe}}', 'x="{{x|safe}}"', 'X axis: {{x|safe}}', '{{x|safe}}'] },
            color: { el: new dstVariable(config, { label: localization.en.color, no: "color", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: [', color = {{color|safe}}, group = {{color|safe}}, shape ={{color|safe}}', 'grouped in colors by: {{color|safe}}'] },

            linetype: { el: new dstVariable(config, { label: localization.en.linetype, no: "linetype", filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }), r: [', aes (group = {{linetype |safe}}, linetype = {{linetype |safe}})', 'grouped in colors by: {{color|safe}}'] },


            checkbox: { el: new checkbox(config, { label: localization.en.flipBox, style: "mt-2", no: "flipBox" }), r: 'coord_flip() + ' },
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
                                label: localization.en.specify_a_title,
                                allow_spaces:true,
                                placeholder: "Chart title",
                                extraction: "NoPrefix|UseComma"
                            })},
                            
                 x_title: {
                el:	new input(config, {
                                no: 'x_title',
                                label: localization.en.x_title,
                                allow_spaces:true,
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
                sizePoint: {
                    el: new inputSpinner(config, {
                        no: 'sizePoint',
                        label: localization.en.sizePoint,
                        min: 0,
                        max: 20,
                        step: 0.1,
                        value: 1,
                        extraction: "NoPrefix|UseComma"
                    })
                    },
                sizeLine: {
                        el: new inputSpinner(config, {
                            no: 'sizeLine',
                            label: localization.en.sizeLine,
                            min: 0,
                            max: 20,
                            step: 0.1,
                            value: 1,
                            width:"w-25",
                            extraction: "NoPrefix|UseComma"
                        })
                        },
        }
        const tab1 = {
            state: "active",
            no: "line",
            label: localization.en.line,
            r_value: "geom_line",
            content: "Observations connected by order of values on x axis"
        }
        const tab2 = {
            state: "",
            no: "stair",
            label: localization.en.stair,
            r_value: "geom_step",
            content: "Stair Steps"
        }
        const tab3 = {
            state: "",
            no: "path",
            label: localization.en.path,
            r_value: "geom_path",
            content: "Ordered by occurrence of variable values in data"
        }
        var opts = new optionsVar(config, {
            no: "linechart_options",
            content: [
                objects.title.el,
                objects.x_title.el,
                objects.y_title.el,
                objects.sizePoint.el,
                objects.sizeLine.el
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
        var navs = new tabsView(config, { no: "line_type", invisible: true, tabs: [tab1, tab2, tab3] })
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [
                objects.y.el.content,
                objects.x.el.content,
                objects.color.el.content,
                objects.linetype.el.content,
                new labelVar(config, { label: localization.en.lineChartType, h: 7 }).content,
                navs.content,
                objects.checkbox.el.content],
            bottom: [opts.content, Facets.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chart-line-solid",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.navs = navs
        this.opts = opts
        this.help = localization.en.help
    }
    prepareExecution(instance) {
        var res = [];
        instance.objects.y.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    x: instance.dialog.prepareSelected({ x: instance.objects.x.el.getVal()[0] }, instance.objects.x.r),
                    y: instance.dialog.prepareSelected({ y: value }, instance.objects.y.r),
                    color: instance.dialog.prepareSelected({ color: instance.objects.color.el.getVal()[0] }, instance.objects.color.r),
                    linetype: instance.dialog.prepareSelected({ linetype: instance.objects.linetype.el.getVal()[0] }, instance.objects.linetype.r),
                    flip: instance.objects.checkbox.el.getVal() ? instance.objects.checkbox.r : "",
                    chart: instance.navs.getActive('r-value'),
                    label: instance.navs.tabs[parseInt(instance.navs.getActive('el-index'))].content,
                    title: instance.opts.config.content[0].getVal() === "" ? "" : `ggtitle("${instance.opts.config.content[0].getVal()}") + `,
                    Facetrow: instance.objects.Facetrow.el.getVal(),
                    Facetcolumn: instance.objects.Facetcolumn.el.getVal(),
                    Facetwrap: instance.objects.Facetwrap.el.getVal(),
                    Facetscale: instance.objects.Facetscale.el.getVal(),
                    sizePoint: instance.objects.sizePoint.el.getVal(),
                    sizeLine: instance.objects.sizeLine.el.getVal()
                }
            }
            code_vars.selected["x_label"] = instance.opts.config.content[1].getVal() === "" ? code_vars.selected.x[3] : instance.opts.config.content[1].getVal()
            code_vars.selected["y_label"] = instance.opts.config.content[2].getVal() === "" ? code_vars.selected.y[3] : instance.opts.config.content[2].getVal()
            code_vars.selected.Facets = createfacets(code_vars.selected.Facetwrap, code_vars.selected.Facetcolumn, code_vars.selected.Facetrow, code_vars.selected.Facetscale)
            code_vars.selected.themes = themeRsyntax;
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            res.push({ cmd: cmd, cgid: newCommandGroup() })
        })
        return res;
    }
}
module.exports.item = new lineChartModal().render()