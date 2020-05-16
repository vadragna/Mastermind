(function () {
  let target = 9;
  let colors = [
    "blue",
    "aqua",
    "hotpink",
    "lime",
    "yellow",
    "indigo",
    "red",
    "black",
  ];

  $("#checkButton").on("click", function (e) {
    var sameColor = 0;
    var samePosition = 0;
    var dontCheck = [];
    let rowToCheck = $(".row" + target);
    let keyRow = $(".key");
    let positionsToCheck = [0, 1, 2, 3];
    let KeyToCheck = [0, 1, 2, 3];

    for (var i = 0; i <= 3; i++) {
      console.log("positionsToCheck", positionsToCheck);
      for (var j = 0; j <= 3; j++) {
        if (positionsToCheck.length + i < 4) {
          console.log("continue", positionsToCheck.length, i);
          continue;
        }
        if (
          rowToCheck.eq(i) &&
          rowToCheck.eq(i).prop("classList")[2] ===
            keyRow.eq(j).prop("classList")[3]
        ) {
          console.log(
            rowToCheck.eq(i).prop("classList")[2],
            keyRow.eq(j).prop("classList")[3],
            i,
            j
          );
          if (i === j) {
            samePosition++;
            dontCheck.push(j);
            positionsToCheck.splice(i, 1);
            KeyToCheck.splice(j, 1);
          } else {
            sameColor++;
            dontCheck.push(j);
            positionsToCheck.splice(i, 1);
            KeyToCheck.splice(j, 1);
          }
        }
      }
    }

    console.log(
      "sameColor",
      sameColor,
      "samePosition",
      samePosition,
      "dontCheck",
      dontCheck
    );
    target--;
  });

  for (let i = 0; i <= 3; i++) {
    let random = Math.floor(Math.random() * 8);
    let keyBox = $(".key" + i);
    keyBox.addClass(colors[random]);
  }

  $(".column").on("click", function (e) {
    var col = $(e.currentTarget);
    var targetSlot = col.children();
    for (let i = 0; i < colors.length; i++) {
      if (targetSlot.eq(target).hasClass(colors[i])) {
        targetSlot.eq(target).removeClass(colors[i]);
        targetSlot.eq(target).addClass(colors[i + 1]);
        return;
      }
    }

    targetSlot.eq(target).addClass(colors[0]);
  });
})();
