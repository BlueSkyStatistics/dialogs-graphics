/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "Line Chart with two Y axis",
        navigation: "Two Y axis",
        x: "X axis",
        y: "Y1 axis, specify a numeric variable",
        y2: "Y2 axis, specify a numeric variable",
        y1_sf: "Y1 scale factor",
        y2_sf: "Y2 scale factor",
        help: {
            title: "Line Chart",
            r_help: "help(geom_line, package=ggplot2)",
            body: `
            <b>Description</b></br>
            Creates a line chart (connected by order) or stair step plot or orders the line chart by occurrence of the points in the dataset. Click on the tab corresponding to the type of line chart you want.</br>
            Line chart (connected by order): A line chart plots a line through points defined by the x and y coordinates and connects them in the order of variables on the x axis. When a color is set to a factor variable, the points are grouped by color and a separate line is generated for each color group.Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​</br>
            Stair step plot: A line chart plots a line through points defined by the x and y coordinates and creates a stair step plot, highlighting exactly when changes occur. When a color is set to a factor variable, the points are grouped by color and a separate line is generated for each color group. Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​</br>
            Ordered by occurrence: A line chart plots a line through points defined by the x and y coordinates and connects them in the order of in which variables occur in the dataset. When a color is set to a factor variable, the points are grouped by color and a separate line is generated for each color group. Facets can be optionally created by specifying a factor variable. You can also optionally specify themes, and specify a title and labels for the x and y axis​.</br>
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            #Line chart<br/>
            ggplot(data=Dataset2,aes(x =var1,y =var2)) +
             geom_line( stat = "identity",position = "identity",aes (color = var3),alpha=0.5) +
             labs(x ="var1",y ="var2",title= "Line chart for ...")<br/>
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
class threeAxisLineChartModal extends baseModal {
    constructor() {
        const config = {
            id: "threeAxisLineChartModal",
            label: localization.en.title,
            modalType: "two",
            RCode: `require(ggplot2);
coef1 <- {{selected.y1_sf | safe}};
coef2 <- {{selected.y2_sf | safe}};
ggplot(data={{dataset.name}}, aes(x={{selected.x | safe}})) +
    geom_line( aes(y={{selected.y | safe}} / coef1), size=1, color='green') + 
    geom_line( aes(y={{selected.y2 | safe}} / coef2), size=1, color='red') +
    scale_y_continuous(
        name = "{{selected.y | safe}}",
        sec.axis = sec_axis(~.*coef2, name="{{selected.y2 | safe}}"));
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            x: { el: new dstVariable(config, { label: localization.en.x, no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }) },
            y: { el: new dstVariable(config, { label: localization.en.y, no: "y", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }) },
            y2: { el: new dstVariable(config, { label: localization.en.y2, no: "y2", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }) },
            y1_sf: { el: new input(config, { no: 'y1_sf', ml: 3, label: localization.en.y1_sf, allow_spaces:true, value: 1, type: 'numeric', extraction: "NoPrefix|UseComma" }) },
            y2_sf: { el: new input(config, { no: 'y2_sf', ml: 3, label: localization.en.y2_sf, allow_spaces:true, value: 1, type: 'numeric', extraction: "NoPrefix|UseComma" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [
                objects.x.el.content,
                objects.y.el.content,
                objects.y2.el.content,
                objects.y1_sf.el.content,
                objects.y2_sf.el.content,
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chart-line-solid",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new threeAxisLineChartModal().render()