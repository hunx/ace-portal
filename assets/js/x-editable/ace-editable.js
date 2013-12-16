(function (b) {
    var a = function (c) {
        this.init("image", c, a.defaults);
        if ("on_error" in c.image) {
            this.on_error = c.image.on_error;
            delete c.image.on_error
        }
        if ("on_success" in c.image) {
            this.on_success = c.image.on_success;
            delete c.image.on_success
        }
        if ("max_size" in c.image) {
            this.max_size = c.image.max_size;
            delete c.image.max_size
        }
        this.initImage(c, a.defaults)
    };
    b.fn.editableutils.inherit(a, b.fn.editabletypes.abstractinput);
    b.extend(a.prototype, {initImage: function (c, d) {
        this.options.image = b.extend({}, d.image, c.image);
        this.name = this.options.image.name || "editable-image-input"
    }, render: function () {
        var c = this;
        this.$input = this.$tpl.find("input[type=hidden]:eq(0)");
        this.$file = this.$tpl.find("input[type=file]:eq(0)");
        this.$file.attr({name: this.name});
        this.$input.attr({name: this.name + "-hidden"});
        this.options.image.before_change = this.options.image.before_change || function (f, g) {
            var d = f[0];
            if (typeof d === "string") {
                if (!(/\.(jpe?g|png|gif)$/i).test(d)) {
                    if (c.on_error) {
                        c.on_error(1)
                    }
                    return false
                }
            } else {
                var e = b.trim(d.type);
                if ((e.length > 0 && !(/^image\/(jpe?g|png|gif)$/i).test(e)) || (e.length == 0 && !(/\.(jpe?g|png|gif)$/i).test(d.name))) {
                    if (c.on_error) {
                        c.on_error(1)
                    }
                    return false
                }
                if (c.max_size && d.size > c.max_size) {
                    if (c.on_error) {
                        c.on_error(2)
                    }
                    return false
                }
            }
            if (c.on_success) {
                c.on_success()
            }
            return true
        };
        this.options.image.before_remove = this.options.image.before_remove || function () {
            c.$input.val(null);
            return true
        };
        this.$file.ace_file_input(this.options.image).on("change",function () {
            var d = (c.$file.val() || c.$file.data("ace_input_files")) ? Math.random() + "" + (new Date()).getTime() : null;
            c.$input.val(d)
        }).closest(".ace-file-input").css({width: "150px"}).closest(".editable-input").addClass("editable-image")
    }});
    a.defaults = b.extend({}, b.fn.editabletypes.abstractinput.defaults, {tpl: '<span><input type="hidden" /></span><span><input type="file" /></span>', inputclass: "", image: {style: "well", btn_choose: "Change Image", btn_change: null, no_icon: "icon-picture", thumbnail: "large"}});
    b.fn.editabletypes.image = a
}(window.jQuery));
(function (a) {
    var b = function (c) {
        this.init("wysiwyg", c, b.defaults);
        this.options.wysiwyg = a.extend({}, b.defaults.wysiwyg, c.wysiwyg)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput);
    a.extend(b.prototype, {render: function () {
        this.$editor = this.$input.nextAll(".wysiwyg-editor:eq(0)");
        this.$tpl.parent().find(".wysiwyg-editor").show().ace_wysiwyg({toolbar: ["bold", "italic", "strikethrough", "underline", null, "foreColor", null, "insertImage"]}).prev().addClass("wysiwyg-style2").closest(".editable-input").addClass("editable-wysiwyg").closest(".editable-container").css({display: "block"});
        if (this.options.wysiwyg && this.options.wysiwyg.css) {
            this.$tpl.closest(".editable-wysiwyg").css(this.options.wysiwyg.css)
        }
    }, value2html: function (d, c) {
        a(c).html(d);
        return false
    }, html2value: function (c) {
        return c
    }, value2input: function (c) {
        this.$editor.html(c)
    }, input2value: function () {
        return this.$editor.html()
    }, activate: function () {
    }});
    b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {tpl: '<input type="hidden" /><div class="wysiwyg-editor"></div>', inputclass: "editable-wysiwyg", wysiwyg: {}});
    a.fn.editabletypes.wysiwyg = b
}(window.jQuery));
(function (b) {
    var a = function (c) {
        this.init("spinner", c, a.defaults);
        this.initSpinner(c, a.defaults)
    };
    b.fn.editableutils.inherit(a, b.fn.editabletypes.abstractinput);
    b.extend(a.prototype, {initSpinner: function (c, d) {
        this.options.spinner = b.extend({}, d.spinner, c.spinner)
    }, render: function () {
    }, activate: function () {
        if (this.$input.is(":visible")) {
            this.$input.focus();
            b.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length);
            var d = parseInt(this.$input.val());
            var c = b.extend({value: d}, this.options.spinner);
            this.$input.ace_spinner(c)
        }
    }, autosubmit: function () {
        this.$input.keydown(function (c) {
            if (c.which === 13) {
                b(this).closest("form").submit()
            }
        })
    }});
    a.defaults = b.extend({}, b.fn.editabletypes.abstractinput.defaults, {tpl: '<input type="text" />', inputclass: "", spinner: {min: 0, max: 100, step: 1, icon_up: "icon-plus", icon_down: "icon-minus", btn_up_class: "btn-success", btn_down_class: "btn-danger"}});
    b.fn.editabletypes.spinner = a
}(window.jQuery));
(function (b) {
    var a = function (c) {
        this.init("slider", c, a.defaults);
        this.initSlider(c, a.defaults)
    };
    b.fn.editableutils.inherit(a, b.fn.editabletypes.abstractinput);
    b.extend(a.prototype, {initSlider: function (c, d) {
        this.options.slider = b.extend({}, d.slider, c.slider)
    }, render: function () {
    }, activate: function () {
        if (this.$input.is(":visible")) {
            this.$input.focus();
            b.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length);
            var c = this;
            var f = parseInt(this.$input.val());
            var e = this.options.slider.width || 200;
            var d = b.extend(this.options.slider, {value: f, slide: function (g, h) {
                var i = parseInt(h.value);
                c.$input.val(i);
                if (h.handle.firstChild == null) {
                    b(h.handle).append("<div class='tooltip top in' style='display:none;top:-42px;left:-4px;'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>")
                }
                b(h.handle.firstChild).show().children().eq(1).text(i)
            }});
            this.$input.parent().addClass("editable-slider").css("width", e + "px").slider(d)
        }
    }, value2html: function (d, c) {
    }, autosubmit: function () {
        this.$input.keydown(function (c) {
            if (c.which === 13) {
                b(this).closest("form").submit()
            }
        })
    }});
    a.defaults = b.extend({}, b.fn.editabletypes.abstractinput.defaults, {tpl: '<input type="text" /><span class="inline ui-slider-green"><span class="slider-display"></span></span>', inputclass: "", slider: {min: 1, max: 100, step: 1, range: "min"}});
    b.fn.editabletypes.slider = a
}(window.jQuery));