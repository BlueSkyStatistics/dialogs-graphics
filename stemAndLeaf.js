var localization = {
    en: {
        title: "Stem and Leaf Plot",
        navigation: "Stem and Leaf",
        Destination: "Select variable to plot",
        label1: "Leafs digit",
        label2: "Parts per stem",
        label3: "Style of divided stems",
        label4: "Options",
        Value: "Enter a value",
        Automatic: "Automatic",
        EnterValue: "Specify value",
        StemAutomatic: "Automatic",
        SpecifyStemValue: "Specify value",
        StemValue: "Enter a value",
        Tukey: "Tukey",
        Repeated: "Repeated stem digits",
        Trim: "Trim outliers",
        Depths: "Show depths",
        NegativeLeaves: "Reverse negative leaves",
        help: {
            title: "Stem and Leaf Plot",
            r_help: "help(stem.leaf, package='aplpack')",
            body: `
            <b>Description</b></br>
            stem and leaf display and back to back stem and leaf display
            Creates a classical ("Tukey-style") stem and leaf display / back-to-back stem and leaf display.
            <br/>
            <b>Usage</b>
            <br/>
            <code> 
            stem.leaf(data, unit, m, Min, Max, rule.line = c("Dixon", "Velleman", "Sturges"),
                style = c("Tukey", "bare"), trim.outliers = TRUE, depths = TRUE,
                reverse.negative.leaves = TRUE, na.rm = FALSE, printresult = TRUE)<br/><br/>
            stem.leaf.backback(x,y, unit, m, Min, Max, rule.line = c("Dixon", "Velleman", 
                "Sturges"), style = c("Tukey", "bare"), trim.outliers = TRUE, 
                depths = TRUE, reverse.negative.leaves = TRUE, na.rm = FALSE,
                printresult=TRUE, show.no.depths = FALSE, add.more.blanks = 0,
                back.to.back = TRUE)
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            data: a numeric vector of data
            </li>
            <li>
            x: first dataset for stem.leaf.backback
            </li>
            <li>
            y: first dataset for stem.leaf.backback
            </li>
            <li>
            unit: leaf unit, as a power of 10 (e.g., 100, .01); if unit is missing unit is choosen by stem.leaf.
            </li>
            <li>
            m: number of parts (1, 2, or 5) into which each stem will be separated; if m is missing the number of parts/stem (m) is choosen by stem.leaf.
            </li>
            <li>
            Min: smallest non-outlying value; omit for automatic choice.
            </li>
            <li>
            Max: largest non-outlying value; omit for automatic choice.
            </li>
            <li>
            rule.line: the rule to use for choosing the desired number of lines in the display; "Dixon" = 10*log10(n); "Velleman" = 2*sqrt(n); "Sturges" = 1 + log2(n); the default is "Dixon".
            </li>
            <li>
            style: "Tukey" (the default) for "Tukey-style" divided stems; "bare" for divided stems that simply repeat the stem digits.
            </li>
            <li>
            trim.outliers: if TRUE (the default), outliers are placed on LO and HI stems.
            </li>
            <li>
            depths: if TRUE (the default), print a column of "depths" to the left of the stems; the depth of the stem containing the median is the stem-count enclosed in parentheses.
            </li>
            <li>
            reverse.negative.leaves: if TRUE (the default), reverse direction the leaves on negative stems (so, e.g., the leaf 9 comes before the leaf 8, etc.).
            </li>
            <li>
            na.rm: if TRUE "NA" values are removed otherwise the number of NAs are counted.
            </li>
            <li>
            printresult: if TRUE output of the stem and leaf display by cat.
            </li>
            <li>
            show.no.depths: if TRUE no depths are printed.
            </li>
            <li>
            add.more.blanks: number of blanks that are added besides the leaves.
            </li>
            <li>
            back.to.back: if FALSE two parallel stem and leaf displays are constructed.
            </li>
            </ul>
            <b>Details</b></br>
            Unlike the stem function in the base package, stem.leaf produces classic stem-and-leaf displays, as described in Tukey's Exploratory Data Analysis. The function stem.leaf.backback creates back-to-back stem and leaf displays.
            <br/>
            <b>Value</b></br>
            The computed stem and leaf display is printed out. Invisibly stem.leaf returns the stem and leaf display as a list containing the elements info (legend), display (stem and leaf display as character vecter), lower (very small values), upper (very large values), depths (vector of depths), stem (stem information as a vector), and leaves (vector of leaves).</br>
            <b>Examples</b></br>
            stem.leaf(co2)
            stem.leaf.backback(co2[1:120],co2[121:240])</br>
            stem.leaf.backback(co2[1:120],co2[121:240], back.to.back = FALSE)</br>
            stem.leaf.backback(co2[1:120],co2[121:240], back.to.back = FALSE,
                               add.more.blanks = 3, show.no.depths = TRUE)</br>
            stem.leaf.backback(rivers[-(1:30)],rivers[1:30], back.to.back = FALSE, unit=10, m=5, 
                               Min=200, Max=900, add.more.blanks = 20, show.no.depths = TRUE)</br>
            <b>Package</b></br>
            aplpack</br>
            <b>Help</b></br>
            help(stem.leaf, package=aplpack)</br>
    `}
    }
}
class stemAndLeaf extends baseModal {
    constructor() {
        var config = {
            id: "stemAndLeaf",
            label: localization.en.title,
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
                    label: localization.en.Destination,
                    no: "Destination",
                    filter: "Numeric|Scale",
                    extraction: "Prefix|UseComma",
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, style:"mt-2", h: 6 }) },
            Automatic: {
                el: new radioButton(config, {
                    label: localization.en.Automatic,
                    no: "outliers",
                    increment: "Automatic",
                    value: "y",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            EnterValue: {
                el: new radioButton(config, {
                    label: localization.en.EnterValue,
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
                    label: localization.en.Value,
                    placeholder: "0",
                    ml: 4,
                    allow_spaces:true,
                    extraction: "NoPrefix|UseComma",
                    wrapped: 'unit=%val%',
                    dependant_objects: ["EnterValue"],
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, style:"mt-4", h: 6 }) },
            StemAutomatic: {
                el: new radioButton(config, {
                    label: localization.en.StemAutomatic,
                    no: "ps",
                    increment: "StemAutomatic",
                    value: "TRUE",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            SpecifyStemValue: {
                el: new radioButton(config, {
                    label: localization.en.SpecifyStemValue,
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
                    label: localization.en.StemValue,
                    placeholder: "0",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    // wrapped: 'unit=%val%',
                    value: "",
                })
            },
            label3: { el: new labelVar(config, { label: localization.en.label3, style:"mt-4", h: 6 }) },
            Tukey: {
                el: new radioButton(config, {
                    label: localization.en.Tukey,
                    no: "Style",
                    increment: "Tukey",
                    value: "Tukey",
                    state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            Repeated: {
                el: new radioButton(config, {
                    label: localization.en.Repeated,
                    no: "Style",
                    increment: "Repeated",
                    value: "bare",
                    state: "",
                    extraction: "ValueAsIs"
                })
            },
            label4: { el: new labelVar(config, { label: localization.en.label4,style:"mt-4", h: 6 }) },
            Trim: {
                el: new checkbox(config, {
                    label: localization.en.Trim,
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
                    label: localization.en.Depths,
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
                    label: localization.en.NegativeLeaves,
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
                name: localization.en.navigation,
                icon: "icon-plant",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new stemAndLeaf().render()