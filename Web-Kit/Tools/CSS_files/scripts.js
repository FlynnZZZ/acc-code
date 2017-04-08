var result;
$(document).ready(function () {

    $(".slider").slider();
    $(".button").button();

    //define properties
    $('.slider[id$="50"]').slider({
        max: 100,
        min: 0,
        value: 0
    });

    //Change Radius
    $("#slider_border_1_50").slider({
        slide: function (event, ui) {
            $("#lbl_border_1").val(ui.value);
            first_border_radius();
        },
        change: function (event, ui) {
            $("#lbl_border_1").val(ui.value);
            first_border_radius();
        }
    });
    $("#slider_border_2_50").slider({
        slide: function (event, ui) {
            $("#lbl_border_2").val(ui.value);
            first_border_radius();
        },
        change: function (event, ui) {
            $("#lbl_border_2").val(ui.value);
            first_border_radius();
        }
    });
    $("#slider_border_3_50").slider({
        slide: function (event, ui) {
            $("#lbl_border_3").val(ui.value);
            first_border_radius();
        },
        change: function (event, ui) {
            $("#lbl_border_3").val(ui.value);
            first_border_radius();
        }
    });
    $("#slider_border_4_50").slider({
        slide: function (event, ui) {
            $("#lbl_border_4").val(ui.value);
            first_border_radius();
        },
        change: function (event, ui) {
            $("#lbl_border_4").val(ui.value);
            first_border_radius();
        }
    });

    $("#lbl_border_1").change(function () {
        $("#slider_border_1_50").slider({
            value: $("#lbl_border_1").val()
        });
        first_border_radius();
    });
    $("#lbl_border_2").change(function () {
        $("#slider_border_2_50").slider({
            value: $("#lbl_border_2").val()
        });
        first_border_radius();
    });
    $("#lbl_border_3").change(function () {
        $("#slider_border_3_50").slider({
            value: $("#lbl_border_3").val()
        });
        first_border_radius();
    });
    $("#lbl_border_4").change(function () {
        $("#slider_border_4_50").slider({
            value: $("#lbl_border_4").val()
        });
        first_border_radius();
    });

    //Box Shadow   

    $("#slider_ds_vertical_length").slider({
        orientation: "vertical",
        max: 50,
        min: -50,
        value: -5,
        slide: function (event, ui) {
            box_shadow();
        },
        change: function (event, ui) {
            box_shadow();
        }
    });
    $("#slider_ds_horizontal_length").slider({
        max: 50,
        min: -50,
        value: 5,
        slide: function (event, ui) {
            box_shadow();
        },
        change: function (event, ui) {
            box_shadow();
        }
    });
    $("#slider_ds_blur_radius").slider({
        max: 50,
        min: 0,
        value: 5,
        slide: function (event, ui) {
            box_shadow();
        },
        change: function (event, ui) {
            box_shadow();
        }
    });
    $("#drop_shadow_color").miniColors({
        change: function (hex, rgb) {
            box_shadow();
        }
    });
    box_shadow();

    //Text-Shadow Generator
    $("#slider_ts_vertical_length").slider({
        orientation: "vertical",
        max: 20,
        min: -20,
        value: -2,
        slide: function (event, ui) {
            text_shadow();
        },
        change: function (event, ui) {
            text_shadow();
        }
    });
    $("#slider_ts_horizontal_length").slider({
        max: 20,
        min: -20,
        value: 2,
        slide: function (event, ui) {
            text_shadow();
        },
        change: function (event, ui) {
            text_shadow();
        }
    });
    $("#slider_ts_blur_radius").slider({
        max: 20,
        min: 0,
        value: 3,
        slide: function (event, ui) {
            text_shadow();
        },
        change: function (event, ui) {
            text_shadow();
        }
    });
    $("#text_shadow_color").miniColors({
        change: function (hex, rgb) {
            text_shadow();
        }
    });
    text_shadow();

    //Opacity
    $("#slider_opacity").slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0.5,
        slide: function (event, ui) {
            opacity();
        },
        change: function (event, ui) {
            opacity();
        }
    });
    opacity();

    //RGBA
    $("#rgba_color").miniColors({
        change: function (hex, rgb) {
            rgba();
        }
    });
    $("#slider_rgba").slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0.5,
        slide: function (event, ui) {
            rgba();
        },
        change: function (event, ui) {
            rgba();
        }
    });
    rgba();

    //Transform
    $("#slider_scale_height").slider({
        orientation: "vertical",
        max: 2,
        min: 0.5,
        step: 0.1,
        value: 1,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    $("#slider_translate_hor").slider({
        max: 20,
        min: -20,
        value: 0,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    $("#slider_skew_hor").slider({
        max: 30,
        min: -30,
        value: 0,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    $("#slider_translate_ver").slider({
        orientation: "vertical",
        max: 20,
        min: -20,
        value: 0,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    $("#slider_skew_ver").slider({
        orientation: "vertical",
        max: 30,
        min: -30,
        value: 0,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    $("#slider_scale_width").slider({
        max: 2,
        min: 0.5,
        step: 0.1,
        value: 1,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    $("#slider_rotate").slider({
        max: 360,
        min: 0,
        value: 0,
        slide: function (event, ui) {
            transform();
        },
        change: function (event, ui) {
            transform();
        }
    });
    transform();
    $("#button_reset").click(function () {
        $("#slider_translate_hor").slider({ value: 0 });
        $("#slider_translate_ver").slider({ value: 0 });
        $("#slider_rotate").slider({ value: 0 });
        $("#slider_scale_height").slider({ value: 1 });
        $("#slider_scale_width").slider({ value: 1 });
        $("#slider_skew_hor").slider({ value: 0 });
        $("#slider_skew_ver").slider({ value: 0 });
        $("#slider_rotate").slider({ value: 0 });
        transform();

        return false;
    });

});
function first_border_radius() {
    // Change value type
    if (($("#slider_border_1_50").slider("value") == $("#slider_border_2_50").slider("value")) && ($("#slider_border_1_50").slider("value") == $("#slider_border_3_50").slider("value")) && ($("#slider_border_1_50").slider("value") == $("#slider_border_4_50").slider("value"))) {
        result = $("#slider_border_1_50").slider("value") + "px"
    }
    else {
        result = $("#slider_border_1_50").slider("value") + "px " + $("#slider_border_2_50").slider("value") + "px " + $("#slider_border_3_50").slider("value") + "px " + $("#slider_border_4_50").slider("value") + "px";
    };
    $("#border-radius-preview").css("border-radius", result);
    $("#border-radius-preview").css("-webkit-border-radius", result);
    $("#border-radius-preview").css("-moz-border-radius", result);
    $("#border-radius-result").html(".div_radius</br>{ </br>border-radius: " + result + "; </br>-webkit-border-radius: " + result + "; </br>-moz-border-radius: " + result + "; </br>}");
};

function box_shadow() {
    var drop_result = "";
    drop_result = $("#slider_ds_horizontal_length").slider("value") + "px " + (-$("#slider_ds_vertical_length").slider("value")) + "px " + $("#slider_ds_blur_radius").slider("value") + "px " + $("#drop_shadow_color").miniColors("value");
    $("#box-shadow-preview").html(".div_shadow</br>{ </br>box-shadow: " + drop_result + "; </br>-webkit-box-shadow: " + drop_result + "; </br>-moz-box-shadow: " + drop_result + "; </br>}");
    $("#box-shadow-preview").css("box-shadow", drop_result);
    $("#box-shadow-preview").css("-webkit-box-shadow", drop_result);
    $("#box-shadow-preview").css("-moz-box-shadow", drop_result);
};

function text_shadow() {
    var text_result = "";
    text_result = $("#slider_ts_horizontal_length").slider("value") + "px " + (-$("#slider_ts_vertical_length").slider("value")) + "px " + $("#slider_ts_blur_radius").slider("value") + "px " + $("#text_shadow_color").miniColors("value");
    $("#div_text_result").html(".div_text_shadow</br>{ </br>text-shadow: " + text_result + "; </br>}");
    $("#text-shadow-preview").css("text-shadow", text_result);
};


function opacity() {
    var opacity_result = "";
    opacity_result = $("#slider_opacity").slider("value");
    $("#opacity_result").html(".div_opacity</br>{ </br>opacity: " + opacity_result + "; </br>}");
    $("#opacity_preview").css("opacity", opacity_result);
};


function rgba() {
    var rgba_result = "";
    var h, r, g, b;
    h = $("#rgba_color").miniColors("value")
    r = parseInt(h.substring(1, 3), 16)
    g = parseInt(h.substring(3, 5), 16)
    b = parseInt(h.substring(5, 7), 16)

    rgba_result = "rgba(" + r + ", " + g + ", " + b + ", " + $("#slider_rgba").slider("value") + ")";
    $("#RGBA_result").html(".div_rgba</br>{ </br>background-color: " + rgba_result + "; </br>}");
    $("#RGBA_preview").css("background-color", rgba_result);
};

function transform() {
    var trans_result = "";
    trans_result = "translate(" + $("#slider_translate_hor").slider("value") + "px, " + (-$("#slider_translate_ver").slider("value")) + "px) rotate(" + $("#slider_rotate").slider("value") + "deg) skew(" + $("#slider_skew_hor").slider("value") + "deg, " + (-$("#slider_skew_ver").slider("value")) + "deg) scale(" + $("#slider_scale_width").slider("value") + ", " + $("#slider_scale_height").slider("value") + ")";
    $("#transform_preview").css("-webkit-transform", trans_result);
    $("#transform_preview").css("-moz-transform", trans_result);
    $("#transform_preview").css("-o-transform", trans_result);
    $("#transform_preview").css("-ms-transform", trans_result);
    $("#transform_result").html(".div_transform</br>{ </br>-webkit-transform: " + trans_result + "; </br>-moz-transform: " + trans_result + "; </br>-o-transform: " + trans_result + "; </br>-ms-transform: " + trans_result + "; </br>transform: " + trans_result + "; </br>}");
};



