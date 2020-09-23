const modes = {
	brush: false,
	eraser: false
};
const canvasArea = getComputedStyle(document.querySelector("#canvasArea"));
const CANVAS_WIDTH = parseInt(canvasArea.width);
const CANVAS_HEIGHT = parseInt(canvasArea.height);
const BACKGROUND_COLOR = "#FFFFFF";

let hexColor = "#555555";
let canvas = null;

// Enable tootltips
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

// brushWidthRange
document
	.querySelector("#brushWidthRange")
	.addEventListener("input", function(e) {
		const strokeWidth = e.target.value;

		// display the width value
		$("#brushWidthRangeLabel").text(strokeWidth + "%");
	});

$("#brushWidthRangeLabel").text(
	document.querySelector("#brushWidthRange").value + "%"
);

// enable color picker
const picker = Pickr.create({
	el: ".color-picker",
	theme: "classic", // or 'monolith', or 'nano'
	default: hexColor,
	swatches: [
		"rgba(244, 67, 54, 1)",
		"rgba(233, 30, 99, 0.95)",
		"rgba(156, 39, 176, 0.9)",
		"rgba(103, 58, 183, 0.85)",
		"rgba(63, 81, 181, 0.8)",
		"rgba(33, 150, 243, 0.75)",
		"rgba(3, 169, 244, 0.7)",
		"rgba(0, 188, 212, 0.7)",
		"rgba(0, 150, 136, 0.75)",
		"rgba(76, 175, 80, 0.8)",
		"rgba(139, 195, 74, 0.85)",
		"rgba(205, 220, 57, 0.9)",
		"rgba(255, 235, 59, 0.95)",
		"rgba(255, 193, 7, 1)"
	],

	components: {
		// Main components
		preview: true,
		opacity: true,
		hue: true,

		// Input / output Options
		interaction: {
			hex: true,
			rgba: true,
			hsla: true,
			hsva: true,
			cmyk: true,
			input: true,
			clear: false,
			save: true
		}
	}
});
picker.on("save", (color, instance) => {
	console.log("new color", color.toHEXA().toString());
	hexColor = color.toHEXA().toString();
	instance.hide();
});
