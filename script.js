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
  keysToCheck0 = true;
  keysToCheck1 = true;
  keysToCheck2 = true;
  keysToCheck3 = true;

  $("#checkButton").on("click", function (e) {
    var sameColor = 0;
    var samePosition = 0;
    var dontCheck = [];
    let rowToCheck = $(".row" + target);
    let keyRow = $(".key");
    let keyToCheck = [true, true, true, true];
    let positionsToCheck = [0, 1, 2, 3];

    for (var i = 0; i <= 3; i++) {
      console.log("positionsToCheck", positionsToCheck, "");
      if (
        rowToCheck.eq(i) &&
        rowToCheck.eq(i).prop("classList")[2] ===
          keyRow.eq(i).prop("classList")[3]
      ) {
        samePosition++;
        dontCheck.push(i);
        positionsToCheck.splice(i, 1);
        if (!keyToCheck[i]) {
          sameColor--;
        }
        keyToCheck[i] = false;
        continue;
      }
      for (var j = 0; j <= 3; j++) {
        console.log(
          "i",
          i,
          "j",
          j,
          "positionsToCheck.length",
          positionsToCheck.length
        );

        if (positionsToCheck.length + i < 4) {
          console.log("continue", positionsToCheck.length, i);
          continue;
        }
        if (
          rowToCheck.eq(i) &&
          rowToCheck.eq(i).prop("classList")[2] ===
            keyRow.eq(j).prop("classList")[3] &&
          keyToCheck[j]
        ) {
          console.log(
            rowToCheck.eq(i).prop("classList")[2],
            keyRow.eq(j).prop("classList")[3],
            i,
            j
          );
          if (i != j) {
            sameColor++;
            dontCheck.push(j);
            positionsToCheck.splice(i, 1);
            keyToCheck[j] = false;
            j = 4;
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
