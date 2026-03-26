/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class MultiVariChart extends baseModal {
    static dialogId = 'MultiVariChart'
    static t = baseModal.makeT(MultiVariChart.dialogId)

    constructor() {
        var config = {
            id: MultiVariChart.dialogId,
            label: MultiVariChart.t('title'),
            modalType: "two",
            RCode:`

require(dplyr)
require(ggplot2)

	multiVariGroupingPlot <- function(data, 
                                    x, 
                                    y, 
                                    group, 
                                    color1          = "blue", 
                                    color2          = "black", 
                                    chart_title     = "MultiVari Chart",
                                    showMeanValues  = TRUE,
									digits = 2,
                                    ref_line_y      = NULL,
                                    ref_line_labels = NULL) {

  # ── 1. Subset and rename ──────────────────────────────────────
  data <- data[, c(x, y, group)]

  data <- dplyr::rename(data,
                         "x"   = all_of(x),
                         "y"   = all_of(y),
                         "grp" = all_of(group))

  # ── 2. Compute group means ────────────────────────────────────
  means <- data %>%
    dplyr::group_by(x) %>%
    dplyr::summarize(y = mean(y, na.rm = TRUE))

  mean_y_range       <- range(means$y, na.rm = TRUE)
  offset_mean_text_y <- (mean_y_range[2] - mean_y_range[1]) *
                         c({{selected.pctMeanRangeAsYoffset | safe}})

  # ── 3. Validate and build reference lines data frame ──────────
  ref_df <- NULL

  if (!is.null(ref_line_y)) {

    ref_line_y <- as.numeric(ref_line_y)

    if (!is.null(ref_line_labels)) {

      ref_line_labels <- as.character(ref_line_labels)

      # Trim if more labels than y values
      ref_line_labels <- ref_line_labels[seq_along(ref_line_y)]

      # Pad with y value string if fewer labels than y values
      if (length(ref_line_labels) < length(ref_line_y)) {
        ref_line_labels <- c(
          ref_line_labels,
          as.character(
            ref_line_y[(length(ref_line_labels) + 1):length(ref_line_y)]
          )
        )
      }

      # Stacked format: "LSL-15" — label on top, y value below
      ref_df <- data.frame(
        y_val = ref_line_y,
        label = paste0(ref_line_labels, "\n", ref_line_y),
        stringsAsFactors = FALSE
      )

    } else {

      # No labels provided — show y value only e.g. "15"
      ref_df <- data.frame(
        y_val = ref_line_y,
        label = as.character(ref_line_y),
        stringsAsFactors = FALSE
      )
    }
  }

  # ── 4. Build base plot ────────────────────────────────────────
  p <- ggplot(data, aes(x, y)) +

    # Vertical lines within each x group
    #geom_line(
    #  aes(group = x),
    # color = color1
   # ) +
	
	{
		  # Only draw vertical lines if any group has more than 1 observation
		  counts <- data %>% dplyr::count(x)
		  if (any(counts$n > 1)) {
			geom_line(
			  aes(group = x),
			  color = color1
			)
		  } else {
			geom_blank()           # ← draws nothing, no warning
		  }
	} +

    # Individual points colored and shaped by group
    geom_point(
      aes(shape = grp, color = grp),
      size = 4
    ) +

    # Dashed line connecting group means
    geom_line(
      data     = means,
      aes(group = 1),
      color    = color2,
      linetype = "dashed"
    ) +

    # Mean square points
    geom_point(
      data  = means,
      aes(x = x, y = y),
      shape = 15,
      size  = 4
    ) +

    # Annotation explaining mean line color
    annotate(
      geom  = "text",
      x     = Inf,
      y     = Inf,
      vjust = 1,
      hjust = 1,
      label = paste("Mean values in", color2),
      color = "black"
    ) +

    labs(
      x     = as.character(ensym(x)),
      y     = as.character(ensym(y)),
      shape = as.character(ensym(group)),
      color = as.character(ensym(group))
    ) +

    {{selected.BSkyThemes | safe}} +

    ggtitle(chart_title) +

    theme(
      plot.title  = element_text(size = 16, face = "bold"),
      axis.text.x = element_text(
                      angle = {{selected.angleXaxis_text | safe}},
                      hjust = 1)
    )

  # ── 5. Conditionally add mean value text labels ───────────────
  if (isTRUE(showMeanValues)) {
    p <- p +
      geom_text(
        data = means,
        aes(x     = x,
            y     = y + offset_mean_text_y,
            #label = round(y, 1),
			 label = round(y, digits),
            hjust = c({{selected.pctMeanRangeAsXoffset | safe}}),
            vjust = 0)
      )
  }

  # ── 6. Add optional reference lines and labels ────────────────
  if (!is.null(ref_df)) {
    for (i in seq_len(nrow(ref_df))) {
      p <- p +

        # Horizontal dashed red reference line
        geom_hline(
          yintercept = ref_df$y_val[i],
          color      = "red",
          linetype   = "dashed",
          linewidth  = 0.5,
          alpha      = 0.8
        ) +

        # Label at far right end of line
        annotate(
          geom     = "text",
          x        = Inf,
          y        = ref_df$y_val[i],
          label    = ref_df$label[i],
          color    = "red",
          size     = 3,
          hjust    = 1.1,
          vjust    = 0.5,
          fontface = "plain"
        )
    }
  }

  p
}


#########################################

multiVariNestedPlot <- function(data,
                                 outer_group,
                                 inner_group,
                                 y,
                                 color1          = "blue",
                                 color2          = "black",
                                 chart_title     = "Multi-Vari Chart",
                                 showMeanValues  = TRUE,
								 digits = 2,
                                 ref_line_y      = NULL,
                                 ref_line_labels = NULL) {

  # ── 1. Subset and rename ──────────────────────────────────────
  df <- data[, c(outer_group, inner_group, y)]
  colnames(df) <- c("outer", "inner", "y")

  df$outer <- as.factor(df$outer)
  df$inner <- as.factor(df$inner)

  # ── 2. Build x positions with gap between outer groups ────────
  outer_levels <- levels(df$outer)
  inner_levels <- levels(df$inner)

  n_inner <- length(inner_levels)
  gap     <- 2.5

  position_map <- data.frame(
    outer = rep(outer_levels, each  = n_inner),
    inner = rep(inner_levels, times = length(outer_levels))
  )

  position_map$x_pos <- unlist(lapply(
    seq_along(outer_levels), function(i) {
      start <- (i - 1) * (n_inner + gap) + 1
      seq(start, by = 1, length.out = n_inner)
    }
  ))

  # ── 3. Merge positions into data ──────────────────────────────
  df <- merge(df, position_map, by = c("outer", "inner"))

  # Force y to numeric after merge to prevent factor ghost label
  df$y <- as.numeric(as.character(df$y))

  # ── 4. Compute means per inner+outer group ────────────────────
  range_df <- df %>%
    dplyr::group_by(outer, inner, x_pos) %>%
    dplyr::summarize(
      y_mean = mean(y, na.rm = TRUE),
      .groups = "drop"
    )

  # ── 5. Outer group means and x centroids ─────────────────────
  outer_means <- df %>%
    dplyr::group_by(outer) %>%
    dplyr::summarize(
      y_mean = mean(y, na.rm = TRUE),
      .groups = "drop"
    ) %>%
    dplyr::left_join(
      position_map %>%
        dplyr::group_by(outer) %>%
        dplyr::summarize(x_pos = mean(x_pos), .groups = "drop"),
      by = "outer"
    )

  # ── 6. Y range and offsets ────────────────────────────────────
  y_range <- range(df$y, na.rm = TRUE)
  y_span  <- y_range[2] - y_range[1]
  offset  <- y_span * 0.10

  # ── 7. X axis label positions ─────────────────────────────────
  inner_x_labels <- position_map %>%
    dplyr::group_by(outer, inner) %>%
    dplyr::summarize(x_pos = mean(x_pos), .groups = "drop")

  outer_x_labels <- position_map %>%
    dplyr::group_by(outer) %>%
    dplyr::summarize(x_pos = mean(x_pos), .groups = "drop")

  # ── 8. Grand mean and its x position ─────────────────────────
  grand_mean   <- mean(df$y, na.rm = TRUE)
  grand_mean_x <- min(position_map$x_pos) - 0.6

  # ── 9. Validate and build reference lines data frame ──────────
  ref_df      <- NULL
  ref_label_x <- max(position_map$x_pos) + 0.3

  if (!is.null(ref_line_y)) {

    ref_line_y <- as.numeric(ref_line_y)

    if (!is.null(ref_line_labels)) {

      ref_line_labels <- as.character(ref_line_labels)

      # Trim if more labels than y values
      ref_line_labels <- ref_line_labels[seq_along(ref_line_y)]

      # Pad with y value string if fewer labels than y values
      if (length(ref_line_labels) < length(ref_line_y)) {
        ref_line_labels <- c(
          ref_line_labels,
          as.character(
            ref_line_y[(length(ref_line_labels) + 1):length(ref_line_y)]
          )
        )
      }

      # Stacked format: "LSL-15" — label string on top, y value below
      ref_df <- data.frame(
        y_val = ref_line_y,
        label = paste0(ref_line_labels, "\n", ref_line_y),
        stringsAsFactors = FALSE
      )

    } else {

      # No labels provided — show y value only e.g. "15"
      ref_df <- data.frame(
        y_val = ref_line_y,
        label = as.character(ref_line_y),
        stringsAsFactors = FALSE
      )
    }

    # Expand y range to include reference lines outside data range
    y_range <- range(c(y_range, ref_line_y), na.rm = TRUE)
    y_span  <- y_range[2] - y_range[1]
  }

  # ── 10. Build plot ────────────────────────────────────────────
  p <- ggplot(df, aes(x = x_pos, y = y)) +

    # Grand mean horizontal reference line
    geom_hline(
      yintercept = grand_mean,
      color      = "steelblue",
      linetype   = "solid",
      linewidth  = 0.5,
      alpha      = 0.7
    ) +

    # Lines connecting means within each outer group
    # colored distinctly per outer group
    geom_line(
      data      = range_df,
      aes(x     = x_pos,
          y     = y_mean,
          group = outer,
          color = outer),        # ← mapped to outer group
      linewidth = 0.8
    ) +

    # Mean square points per inner+outer combination
    # colored distinctly per outer group
    geom_point(
      data  = range_df,
      aes(x     = x_pos,
          y     = y_mean,
          color = outer),        # ← mapped to outer group
      shape = 15,
      size  = 3
    ) +

    # Dashed line connecting ALL inner+outer group means (color2)
    # kept in fixed color2 so it stands apart from group colors
    #geom_line(
    #  data      = range_df,
    # aes(x     = x_pos,
    #     y     = y_mean,
    #     group = 1),
    # color     = color2,
    #  linetype  = "dashed",
    # linewidth = 0.7
    #) +

    # Mean square points in color2 on top of colored points
    # small size so colored point still shows around the edge
    #geom_point(
    #  data  = range_df,
    #  aes(x = x_pos,
    #     y = y_mean),
    #  shape = 15,
    #  size  = 1.5,               # ← smaller so color points visible behind
    #  color = color2
    #) +

    # Add legend title for outer group color
    scale_color_discrete(
      name = outer_group         # ← legend labelled with actual column name
    ) +

    # Annotation explaining mean line color
    #annotate(
    #  geom  = "text",
    #  x     = Inf,
    #  y     = Inf,
    #  vjust = 1.5,
    #  hjust = 1.1,
    #  label = paste("Mean values in", color2),
    #  size  = 3,
    #  color = "black"
    #) +

    # Inner group labels on x axis
    #scale_x_continuous(
    #  breaks = inner_x_labels$x_pos,
    # labels = inner_x_labels$inner
    #) +

    scale_x_continuous(
		  breaks = inner_x_labels$x_pos,
		  labels = inner_x_labels$inner,
		  expand = c(0.05, 0.05),        # ← minimal padding, was default ~0.05 but
										  #   the continuous scale also adds an
										  #   additive term — setting both removes it
		  limits = c(
			min(position_map$x_pos) - 0.5,   # ← tight left limit
			max(position_map$x_pos) + 0.5    # ← tight right limit
		  )
	) +

    labs(
      x     = paste(outer_group, "_", inner_group),
      y     = y,
      title = chart_title
    ) +

    {{selected.BSkyThemes | safe}} +
	
    theme(
      plot.title  = element_text(size  = 16,
                                  face  = "bold",
                                  hjust = 0.5),
      axis.text.x = element_text(angle = {{selected.angleXaxis_text | safe}},
                                  hjust = 0.5,
                                  size  = 9),
      text        = element_text(family = "sans",
                                  size   = 12),
	  axis.title.x = element_text(margin = margin(t = 25)), 
     # plot.margin = margin(t = 10, r = 80, b = 60, l = 50)
	  plot.margin = margin(t = 10, r = 20, b = 35, l = 10)  # ← r increased for ref labels
    )

  # ── 11. Conditionally add outer group mean value labels ───────
  if (isTRUE(showMeanValues)) {
    p <- p +
      geom_label(
        data       = outer_means,
        aes(x      = x_pos,
            y      = y_mean + offset,
            label  = round(y_mean, digits)),
        color      = color2,
        size       = 3.5,
        label.size = 0,
        fill       = "white",
        alpha      = 0.8
      )+
	  # Grand mean label on the left end of the line
		annotate(
		  geom     = "text",              # ← text not label, no box
		  x        = min(position_map$x_pos),  # ← start of first data point
		  y        = grand_mean,
		  label    = paste0("Overall Mean\n", round(grand_mean, digits)),
		  color    = "steelblue",
		  size     = 3,
		  hjust    = 0.5,                   # ← left-align so text goes rightward
		  vjust    = 0.8,                # ← nudge slightly above the line
		  fontface = "bold"
		)
	  }

  # ── 12. Add optional reference lines and labels ───────────────
  if (!is.null(ref_df)) {
    for (i in seq_len(nrow(ref_df))) {
      p <- p +

        # Horizontal dashed red reference line
        geom_hline(
          yintercept = ref_df$y_val[i],
          color      = "red",
          linetype   = "dashed",
          linewidth  = 0.5,
          alpha      = 0.8
        ) +

        # Label at far right end of line
        annotate(
          geom     = "text",
          x        = ref_label_x,
          y        = ref_df$y_val[i],
          label    = ref_df$label[i],
          color    = "red",
          size     = 3,
          hjust    = 0,
          vjust    = 0.5,
          fontface = "plain"
        )
    }
  }

  # ── 13. Add outer group labels below x axis ───────────────────
  for (i in seq_along(outer_x_labels$outer)) {
    p <- p + annotate(
      geom     = "text",
      x        = outer_x_labels$x_pos[i],
      y        = -Inf,
      label    = outer_x_labels$outer[i],
      vjust    = 5.5,
      size     = 3.8,
      fontface = "bold"
    )
  }

  # ── 14. Constrain y axis to data range with padding ───────────
  #p + coord_cartesian(
  #  clip = "off",
  #  ylim = c(
  #    y_range[1] - y_span * 0.10,
  #    y_range[2] + y_span * 0.15
  #  )
 # )
  p + coord_cartesian(
  clip = "off",
  xlim = c(
    min(position_map$x_pos) - 0.5,   # ← matches scale limits
    max(position_map$x_pos) + 0.5
  ),
  ylim = c(
    y_range[1] - y_span * 0.10,
    y_range[2] + y_span * 0.15
  )
)
}

#########################################

{{dataset.name}}_tmp = {{dataset.name}}[,c('{{selected.X_variableSelcted | safe}}', '{{selected.Y_variableRespSelcted | safe}}', '{{selected.G_variableSelcted | safe}}')]
{{dataset.name}}_tmp = na.omit({{dataset.name}}_tmp)

{{dataset.name}}_tmp[,1] = as.factor({{dataset.name}}_tmp[,1])
{{dataset.name}}_tmp[,3] = as.factor({{dataset.name}}_tmp[,3])

bsky_yIntercept = NULL
bsky_hRefLabels = NULL

{{if(options.selected.yIntercept !="")}}
bsky_yIntercept = as.numeric(c({{selected.yIntercept | safe}}))	 
{{/if}} 


bsky_hRefLabels = c({{selected.horizontalLinelabel | safe}})
if(length(bsky_hRefLabels) == 1 && trimws(bsky_hRefLabels) == "") bsky_hRefLabels = rep(c(" "), length(bsky_yIntercept))


multiVariGroupingPlot(data = {{dataset.name}}_tmp, 
					x = '{{selected.X_variableSelcted | safe}}', 
					y = '{{selected.Y_variableRespSelcted | safe}}', 
					group ='{{selected.G_variableSelcted | safe}}', 
					chart_title = "Multi-Vari Chart for {{selected.Y_variableRespSelcted | safe}} (with mean) by {{selected.X_variableSelcted | safe}}",
					showMeanValues = {{selected.showMeanNumbersChk | safe}},
					digits = {{selected.digits | safe}},
					 ref_line_y        = bsky_yIntercept,
                     ref_line_labels   = bsky_hRefLabels
					) 

BSkyFormat("\n")

{{dataset.name}}_tmp\${{selected.X_variableSelcted | safe}}_{{selected.G_variableSelcted | safe}} = with({{dataset.name}}_tmp, paste({{selected.X_variableSelcted | safe}}, {{selected.G_variableSelcted | safe}}, sep='_'))
{{dataset.name}}_tmp\${{selected.X_variableSelcted | safe}}_{{selected.G_variableSelcted | safe}} = with({{dataset.name}}_tmp, factor({{selected.X_variableSelcted | safe}}_{{selected.G_variableSelcted | safe}}, levels=unlist(lapply(levels({{selected.X_variableSelcted | safe}}),function(x)paste(x,levels({{selected.G_variableSelcted | safe}}), sep='_')))))

multiVariGroupingPlot(data = {{dataset.name}}_tmp, 
					x = '{{selected.X_variableSelcted | safe}}_{{selected.G_variableSelcted | safe}}', 
					y = '{{selected.Y_variableRespSelcted | safe}}', 
					group ='{{selected.G_variableSelcted | safe}}',
					chart_title = "Multi-Vari Chart for {{selected.Y_variableRespSelcted | safe}} (with mean) by ({{selected.X_variableSelcted | safe}} and {{selected.G_variableSelcted | safe}})",
					 showMeanValues = {{selected.showMeanNumbersChk | safe}}, 
					 digits = {{selected.digits | safe}},
					 ref_line_y        = bsky_yIntercept,
                     ref_line_labels   = bsky_hRefLabels
					)				


{{if(options.selected.plotNestedMultiVariChk === 'TRUE')}}
BSkyFormat("Nested Multi-Vari Chart")

multiVariNestedPlot(data = {{dataset.name}}_tmp, 
					outer_group = '{{selected.X_variableSelcted | safe}}', 
					y = '{{selected.Y_variableRespSelcted | safe}}', 
					inner_group ='{{selected.G_variableSelcted | safe}}', 
					chart_title = "Multi-Vari (Nested) Chart for {{selected.Y_variableRespSelcted | safe}} (with mean) by ({{selected.X_variableSelcted | safe}} and {{selected.G_variableSelcted | safe}})",
					showMeanValues = {{selected.showMeanNumbersChk | safe}},
					digits = {{selected.digits | safe}},
					ref_line_y        = bsky_yIntercept,
                     ref_line_labels   = bsky_hRefLabels
					) 
{{/if}}


{{if(options.selected.printStatChk === 'TRUE')}}
	{{dataset.name}}_tmp %>%
	dplyr::group_by({{selected.X_variableSelcted | safe}}) %>%
		dplyr::select({{selected.Y_variableRespSelcted | safe}},{{selected.X_variableSelcted | safe}}) %>%
			BSkySummaryStats(stats = c(min=TRUE, 
										max=TRUE, 
										mean=TRUE, 
										median=TRUE, 
										quantiles=FALSE) 
										) %>%
			BSkyFormat(outputTableIndex = c(2), outputTableRenames = "Stats for {{selected.Y_variableRespSelcted | safe}} by {{selected.X_variableSelcted | safe}}", decimalDigitsRounding = c({{selected.digits | safe}}))	 

	{{dataset.name}}_tmp %>%
	dplyr::group_by({{selected.G_variableSelcted | safe}},{{selected.X_variableSelcted | safe}}) %>%
		dplyr::select({{selected.Y_variableRespSelcted | safe}},{{selected.G_variableSelcted | safe}},{{selected.X_variableSelcted | safe}}) %>%
			BSkySummaryStats(stats = c(min=TRUE, 
										max=TRUE, 
										mean=TRUE, 
										median=TRUE, 
										quantiles=FALSE)
										) %>%
			BSkyFormat(outputTableIndex = c(2), outputTableRenames = "Stats for {{selected.Y_variableRespSelcted | safe}} by ({{selected.X_variableSelcted | safe}} and {{selected.G_variableSelcted | safe}})", decimalDigitsRounding = c({{selected.digits | safe}})) 	
			
{{/if}}

rm({{dataset.name}}_tmp)

`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			Y_variableRespSelcted: {
                el: new dstVariable(config, {
                    label: MultiVariChart.t('Y_variableRespSelcted'),
                    no: "Y_variableRespSelcted",
                    required: true,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					//style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			X_variableSelcted: {
                el: new dstVariable(config, {
                    label: MultiVariChart.t('X_variableSelcted'),
                    no: "X_variableSelcted",
                    required: true,
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					//filter: "String|Ordinal|Nominal",
					style: "mb-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			G_variableSelcted: {
                el: new dstVariable(config, {
                    label: MultiVariChart.t('G_variableSelcted'),
                    no: "G_variableSelcted",
                    required: true,
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					//filter: "String|Ordinal|Nominal",
					style: "mb-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			plotNestedMultiVariChk: {
                el: new checkbox(config, {
                    label: MultiVariChart.t('plotNestedMultiVariChk'), 
					no: "plotNestedMultiVariChk",
                    bs_type: "valuebox",
                    style: "mt-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					//state: "checked",
					newline: true,
                })
            },
			showMeanNumbersChk: {
                el: new checkbox(config, {
                    label: MultiVariChart.t('showMeanNumbersChk'), 
					no: "showMeanNumbersChk",
                    bs_type: "valuebox",
                    style: "mt-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					//state: "checked",
					newline: true,
                })
            },
			digits: {
                el: new inputSpinner(config, {
                    no: 'digits',
                    label: MultiVariChart.t('digits'),
                    required: true,
                    min: 0,
                    max: 15,
                    step: 1,
                    value: 1,
					width: "w-25",
					style: "ml-5",
                })
            }, 
			printStatChk: {
                el: new checkbox(config, {
                    label: MultiVariChart.t('printStatChk'), 
					no: "printStatChk",
                    bs_type: "valuebox",
                    style: "mt-3 mb-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					//state: "checked",
					newline: true,
                })
            },
			pctMeanRangeAsYoffset: {
			el: new inputSpinner(config, {
			  no: 'pctMeanRangeAsYoffset',
			  label: MultiVariChart.t('pctMeanRangeAsYoffset'),
			  min: 0.01,
			  max: 2,
			  step: 0.01,
			  value: 0.05,
			  extraction: "NoPrefix|UseComma",
			  style: "ml-5"
			})
		  },
		  pctMeanRangeAsXoffset: {
			el: new inputSpinner(config, {
			  no: 'pctMeanRangeAsXoffset',
			  label: MultiVariChart.t('pctMeanRangeAsXoffset'),
			  min: -2.5,
			  max: 3.5,
			  step: 0.5,
			  value: 2.0,
			  extraction: "NoPrefix|UseComma",
			  style: "ml-5"
			})
		  },
		  angleXaxis_text: {
                el: new inputSpinner(config, {
					no: 'angleXaxis_text',
                    label: MultiVariChart.t('angleXaxis_text'),
					required: true,
                    min: 0,
                    max: 360,
                    step: 1,
                    value: 30,
                    extraction: "NoPrefix",
                    width: "w-25",
            })
		  },
		  label1: {
                el: new labelVar(config, {
                    label: MultiVariChart.t('label1'),
                    style: "mt-3",
                    h: 5
                })
            },
		yIntercept: {
                el: new input(config, {
                    no: 'yIntercept',
                    label: MultiVariChart.t('yIntercept'),
                    placeholder: "",
                    //type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
					//allow_spaces:true,
                    //extraction: "NoPrefix|UseComma|Enclosed", 
					//extraction: "CreateArray",
                    value: ""
                })
            },
		/*
		horizontalLinelabel: {
                el: new input(config, {
                    no: 'horizontalLinelabel',
                    label: MultiVariChart.t('horizontalLinelabel'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
			*/
			horizontalLinelabel: {
                el: new input(config, {
                    no: 'horizontalLinelabel',
                    label: MultiVariChart.t('horizontalLinelabel'),
                    placeholder: "",
                    required: false,
                    type: "character",
					style: "mb-3",
                    extraction: "CreateArray",
					allow_spaces:true,
                    //value: ,
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
					objects.Y_variableRespSelcted.el.content,
					objects.X_variableSelcted.el.content,
					objects.G_variableSelcted.el.content,
					
					objects.plotNestedMultiVariChk.el.content,
					
					objects.showMeanNumbersChk.el.content,
					objects.digits.el.content,
					objects.pctMeanRangeAsYoffset.el.content,
					objects.pctMeanRangeAsXoffset.el.content, 
					
					objects.label1.el.content,
					objects.yIntercept.el.content,
					objects.horizontalLinelabel.el.content,
					
					objects.printStatChk.el.content,
					objects.angleXaxis_text.el.content,
					],
            nav: {
                name: MultiVariChart.t('navigation'),
                icon: "icon-sixsigma",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: MultiVariChart.t('help.title'),
            r_help: MultiVariChart.t('help.r_help'), //Fix by Anil //r_help: "help(data,package='utils')",
            body: MultiVariChart.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new MultiVariChart().render()
}

