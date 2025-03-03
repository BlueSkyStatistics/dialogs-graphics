/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "2D Contour Plot",
        navigation: "2D Contour Plot",
        tvarbox1: "X",
        tvarbox2: "Y",
        tvarbox3: "Z",
        chk1: "Add raw data points (black dots) based on x and y onto the contour plot",
        //chk2: "Option2",
        help: {
            title: "2D Contour Plot",
            r_help: "help(geom_contour_filled, package='ggplot2')",
            body: `
			 <b>Description</b></br>
			Filled contour regions
			</br>
			Contour lines separate regions where the z variable falls into different ranges.
			</br>
			The areas between contour lines are filled with colors, representing different z value ranges.
			</br>
			</br>
			Color scale
			</br>
			The Spectral palette from ColorBrewer is applied to fill the contour regions.
			</br>
			The Spectral palette is a diverging color scheme, transitioning from cool to warm colors, ideal for showing gradients in data.
			</br>
			</br>
			Optionally add raw data points to the plot
			</br>
			This layer plots individual points based on the x and y values in the dataset (points are black dots).
			</br>
			It provides a way to overlay the raw data points onto the contour plot, giving more context to the contour visualization.
    `}
    }
}

class twoDContourplot extends baseModal {
    constructor() {
        var config = {
            id: "twoDContourplot",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(ggplot2)
require(ggthemes)
ggplot({{dataset.name}}, aes(x={{selected.tvarbox1 | safe}}, y={{selected.tvarbox2 | safe}}, z={{selected.tvarbox3 | safe}})) +
geom_contour_filled() + scale_fill_brewer(palette = "Spectral"){{if(options.selected.chk1 ==="TRUE")}}+ geom_point(){{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            tvarbox1: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox2,
                    no: "tvarbox2",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox3: {
                el: new dstVariable(config, {
                    label: localization.en.tvarbox3,
                    no: "tvarbox3",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            chk1: { el: new checkbox(config, { label: localization.en.chk1, no: "chk1", extraction: "Boolean" }) },
            //chk2: { el: new checkbox(config, { label: localization.en.chk2, newline: true, no: "chk2", extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.tvarbox3.el.content, objects.chk1.el.content, 
			       //objects.chk2.el.content
				   ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-anova_blocks",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new twoDContourplot().render()