

class twoDContourplot extends baseModal {
    static dialogId = 'twoDContourplot'
    static t = baseModal.makeT(twoDContourplot.dialogId)

    constructor() {
        var config = {
            id: twoDContourplot.dialogId,
            label: twoDContourplot.t('title'),
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
                    label: twoDContourplot.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariable(config, {
                    label: twoDContourplot.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox3: {
                el: new dstVariable(config, {
                    label: twoDContourplot.t('tvarbox3'),
                    no: "tvarbox3",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
            // chk1: { el: new checkbox(config, { label: twoDContourplot.t('chk1'), no: "chk1", extraction: "Boolean" }) },
            // chk2: { el: new checkbox(config, { label: twoDContourplot.t('chk2'), newline: true, no: "chk2", extraction: "Boolean" }) }
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content, objects.tvarbox3.el.content, 
                //objects.chk1.el.content, objects.chk2.el.content
            ],
            nav: {
                name: twoDContourplot.t('navigation'),
                icon: "icon-anova_blocks",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: twoDContourplot.t('help.title'),
            r_help: "help(data,package='utils')",
            body: twoDContourplot.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new twoDContourplot().render()
}
