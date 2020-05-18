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
    let resultsHoles = $(".r" + target).children();
    var sameColor = 0;
    var samePosition = 0;
    let rowToCheck = $(".row" + target);
    let keyRow = $(".key");
    let keysToCheck = [true, true, true, true];
    let positionsToCheck = 4;

    for (var i = 0; i <= 3; i++) {
      console.log("positionsToCheck", positionsToCheck);
      if (
        rowToCheck.eq(i) &&
        rowToCheck.eq(i).prop("classList")[2] ===
          keyRow.eq(i).prop("classList")[3]
      ) {
        for (let i = 0; i < resultsHoles.length; i++) {
          if (
            !resultsHoles.eq(i).hasClass("yellow") &&
            !resultsHoles.eq(i).hasClass("green")
          ) {
            resultsHoles.eq(i).addClass("green");
            break;
          }
        }
        samePosition++;
        positionsToCheck--;
        if (!keysToCheck[i]) {
          for (let i = 0; i < resultsHoles.length; i++) {
            if (
              !resultsHoles.eq(i).hasClass("yellow") &&
              !resultsHoles.eq(i).hasClass("green")
            ) {
              resultsHoles.eq(i).removeClass("green");
              break;
            }
          }
          sameColor--;
        }
        keysToCheck[i] = false;
        continue;
      }
      for (var j = 0; j <= 3; j++) {
        console.log("i", i, "j", j, "positionsToCheck", positionsToCheck);

        if (positionsToCheck + i < 4) {
          console.log("continue", positionsToCheck, i);
          continue;
        }
        if (
          rowToCheck.eq(i) &&
          rowToCheck.eq(i).prop("classList")[2] ===
            keyRow.eq(j).prop("classList")[3] &&
          keysToCheck[j]
        ) {
          console.log(
            rowToCheck.eq(i).prop("classList")[2],
            keyRow.eq(j).prop("classList")[3],
            i,
            j
          );
          if (i != j) {
            for (let i = 0; i < resultsHoles.length; i++) {
              if (
                !resultsHoles.eq(i).hasClass("yellow") &&
                !resultsHoles.eq(i).hasClass("green")
              ) {
                resultsHoles.eq(i).addClass("yellow");
                break;
              }
            }
            sameColor++;
            positionsToCheck--;
            keysToCheck[j] = false;
            j = 4;
          }
        }
      }
    }
    if (samePosition == 4) {
      console.log("won");
      $("#keys").css("visibility", "visible");
    }
    console.log("sameColor", sameColor, "samePosition", samePosition);
    // $(".r" + target);
    target--;
  });

  for (let i = 0; i <= 3; i++) {
    let random = Math.floor(Math.random() * 8);
    let keyBox = $(".key" + i);
    keyBox.addClass(colors[random]);
    console.log(colors[random]);
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
