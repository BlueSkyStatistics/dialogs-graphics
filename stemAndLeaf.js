
class stemAndLeaf extends baseModal {
    static dialogId = 'stemAndLeaf'
    static t = baseModal.makeT(stemAndLeaf.dialogId)

    constructor() {
        var config = {
            id: stemAndLeaf.dialogId,
            label: stemAndLeaf.t('title'),
            modalType: "two",
            RCode: `
## [Stem and Leaf Plot]
require(aplpack)
stem.leaf({{selected.Destination | safe}},{{if (options.selected.Value != "") }}{{selected.Value | safe}},{{/if}}{{if (options.selected.StemValue != "")}}m ={{selected.StemValue | safe}},{{/if}}style=c("{{selected.Style | safe}}"), trim.outliers={{selected.Trim | safe}},  depths = {{selected.Depths | safe}}, reverse.negative.leaves = {{selected.NegativeLeaves | safe}},  na.rm=TRUE)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            Destination: {
                el: new dstVariable(config, {
                    label: stemAndLeaf.t('Destination'),
                    no: "Destination",
                    filter: "Numeric|Scale",
                    extraction: "Prefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: stemAndLeaf.t('label1'), style:"mt-2", h: 6 }) },
            Automatic: {
                el: new radioButton(config, {
                    label: stemAndLeaf.t('Automatic'),
                    no: "outliers",
                    increment: "Automatic",
                    value: "y",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            EnterValue: {
                el: new radioButton(config, {
                    label: stemAndLeaf.t('EnterValue'),
                    no: "outliers",
                    increment: "EnterValue",
                    value: "none",
                    dependant_objects: ["Value"],
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            Value: {
                el: new input(config, {
                    no: 'Value',
                    type: "numeric",
                    label: stemAndLeaf.t('Value'),
                    placeholder: "0",
                    ml: 4,
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma",
                    wrapped: 'unit=%val%',
                    dependant_objects: ["EnterValue"],
                })
            },
            label2: { el: new labelVar(config, { label: stemAndLeaf.t('label2'), style:"mt-4", h: 6 }) },
            StemAutomatic: {
                el: new radioButton(config, {
                    label: stemAndLeaf.t('StemAutomatic'),
                    no: "ps",
                    increment: "StemAutomatic",
                    value: "TRUE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            SpecifyStemValue: {
                el: new radioButton(config, {
                    label: stemAndLeaf.t('SpecifyStemValue'),
                    no: "ps",
                    increment: "SpecifyStemValue",
                    dependant_objects: ["StemValue"],
                    value: "",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            StemValue: {
                el: new input(config, {
                    no: 'StemValue',
                    type: "numeric",
                    ml: 4,
                    label: stemAndLeaf.t('StemValue'),
                    placeholder: "0",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    // wrapped: 'unit=%val%',
                    value: "",
                })
            },
            label3: { el: new labelVar(config, { label: stemAndLeaf.t('label3'), style:"mt-4", h: 6 }) },
            Tukey: {
                el: new radioButton(config, {
                    label: stemAndLeaf.t('Tukey'),
                    no: "Style",
                    increment: "Tukey",
                    value: "Tukey",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Repeated: {
                el: new radioButton(config, {
                    label: stemAndLeaf.t('Repeated'),
                    no: "Style",
                    increment: "Repeated",
                    value: "bare",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label4: { el: new labelVar(config, { label: stemAndLeaf.t('label4'),style:"mt-4", h: 6 }) },
            Trim: {
                el: new checkbox(config, {
                    label: stemAndLeaf.t('Trim'),
                    no: "Trim",
                    newline: true,
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            Depths: {
                el: new checkbox(config, {
                    label: stemAndLeaf.t('Depths'),
                    no: "Depths",
                    newline: true,
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            NegativeLeaves: {
                el: new checkbox(config, {
                    label: stemAndLeaf.t('NegativeLeaves'),
                    no: "NegativeLeaves",
                    newline: true,
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.Destination.el.content, objects.label1.el.content,
            objects.Automatic.el.content, objects.EnterValue.el.content, objects.Value.el.content,  objects.label2.el.content,objects.StemAutomatic.el.content,
            objects.SpecifyStemValue.el.content, objects.StemValue.el.content, objects.label3.el.content, objects.Tukey.el.content, objects.Repeated.el.content,
            objects.label4.el.content, objects.Trim.el.content, objects.Depths.el.content, objects.NegativeLeaves.el.content],
            nav: {
                name: stemAndLeaf.t('navigation'),
                icon: "icon-plant",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: stemAndLeaf.t('help.title'),
            r_help: stemAndLeaf.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: stemAndLeaf.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new stemAndLeaf().render()
}
