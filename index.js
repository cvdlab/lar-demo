var plasm;
var models = {};
var ui = {};

var steps = [];
var counter = 0;
var current;

var step = function (f) {
  steps.push(f);
};

var get_code = function (f) {
  var str = f.toString().trim();
  var start = str.indexOf('{') + 1;
  var end = str.lastIndexOf('}');
  var body = str.substring(start, end);
  return body;
};

var go_next = function () {
  if (counter >= steps.length) {
    return;
  }
  current = steps[counter];
  counter += 1;
  return current;
};

plasm = new Plasm('div_plasm', 'div_framerate');
fun.PLASM(plasm);

lar.Model.prototype.draw = function () {
  if (!this.calculated) {
    this.complex = plasm.simplicialComplex(this.vertices, this.sortedCells);
  }
  this.complex.draw();
  return this;
};

lar.Model.prototype.cancel = function () {
  this.complex.cancel();
  return this;
};

lar.Model.prototype.show = function () {
  this.complex.show();
  return this;
};

lar.Model.prototype.hide = function () {
  this.complex.hide();
  return this;
};

lar.Model.prototype.color = function (v) {
  this.complex.color(v);
  return this;
};

lar.Model.prototype.explode = function (v) {
  var complex = this.complex.explode(v);
  this.calculated = true;
  this.complex = complex;
  return this;
};

ui.input = document.getElementById('input_file');

ui.input.onchange = function () {
  var f = file(ui.input.files[0]);

  var reader = f.toText(function(err, str){
    eval(str);
  });
};

ui.textarea = document.getElementById('textarea_code');

ui.button_next = document.getElementById('button_next');

function on_click_next () {
  var next = go_next();
  if (next === undefined) return;
  var code = get_code(next);
  ui.textarea.value = code;
};

function on_click_eval () {
  var code = ui.textarea.value;
  eval(code);
};

ui.button_next.onclick = on_click_next;

ui.button_eval = document.getElementById('button_eval');

ui.button_eval.onclick = on_click_eval;


