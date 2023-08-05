var localization = {
    en: {
        title: "2D Contour Plot",
        navigation: "2D Contour Plot",
        tvarbox1: "X",
        tvarbox2: "Y",
        tvarbox3: "Z",
        chk1: "Option1",
        chk2: "Option2",
        help: {
            title: "2D Contour Plot",
            r_help: "help(geom_contour_filled, package='ggplot2')",
            body: `

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
geom_contour_filled() + scale_fill_brewer(palette = "Spectral") + geom_point()
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
            chk2: { el: new checkbox(config, { label: localization.en.chk2, newline: true, no: "chk2", extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.tvarbox3.el.content, objects.chk1.el.content, objects.chk2.el.content],
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