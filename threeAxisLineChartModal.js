/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


class threeAxisLineChartModal extends baseModal {
    static dialogId = 'threeAxisLineChartModal'
    static t = baseModal.makeT(threeAxisLineChartModal.dialogId)

    constructor() {
        const config = {
            id: "threeAxisLineChartModal",
            label: threeAxisLineChartModal.t('title'),
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
            x: { el: new dstVariable(config, { label: threeAxisLineChartModal.t('x'), no: "x", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }) },
            y: { el: new dstVariable(config, { label: threeAxisLineChartModal.t('y'), no: "y", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }) },
            y2: { el: new dstVariable(config, { label: threeAxisLineChartModal.t('y2'), no: "y2", required: true, filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale" }) },
            y1_sf: { el: new input(config, { no: 'y1_sf', ml: 3, label: threeAxisLineChartModal.t('y1_sf'), allow_spaces:true, value: 1, type: 'numeric', extraction: "NoPrefix|UseComma" }) },
            y2_sf: { el: new input(config, { no: 'y2_sf', ml: 3, label: threeAxisLineChartModal.t('y2_sf'), allow_spaces:true, value: 1, type: 'numeric', extraction: "NoPrefix|UseComma" }) },
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
                name: threeAxisLineChartModal.t('navigation'),
                icon: "icon-chart-line-solid",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: threeAxisLineChartModal.t('help.title'),
            r_help: threeAxisLineChartModal.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: threeAxisLineChartModal.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new threeAxisLineChartModal().render()
}
