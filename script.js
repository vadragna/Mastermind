let target = 9;
let colors = [
  "blue",
  "aqua",
  "hotpink",
  "lime",
  "yellow",
  "indigo",
  "maroon",
  "black",
];

$(".column").on("click", function (e) {
  var col = $(e.currentTarget);
  console.log("col", col);
  var targetSlot = col.children();
  console.log("targetSlot", targetSlot.eq(target));
  for (let i = 0; i < colors.length; i++) {
    if (targetSlot.eq(target).hasClass(colors[i])) {
      console.log("true");
      targetSlot.eq(target).removeClass(colors[i]);
      targetSlot.eq(target).addClass(colors[i + 1]);
      return;
    }
  }
  if (!targetSlot.eq(target).hasClass(colors[0])) {
    targetSlot.eq(target).addClass(colors[0]);
  }
});
