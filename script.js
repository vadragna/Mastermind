(function () {
  let target = 9;
  let level;
  let colors;

  $("#levels")
    .children()
    .on("click", function (e) {
      if (level) {
        return;
      }
      level = e.currentTarget.id;
      console.log("level", level);
      if (level == "medium") {
        colors = [
          "blue",
          "aqua",
          "hotpink",
          "lime",
          "yellow",
          "indigo",
          "red",
          "black",
        ];
        console.log("level");
        randomCode();
        for (i = 8; i <= 9; i++) {
          $(".instructions").children().eq(i).css("visibility", "hidden");
        }
        $(".settingsBox").css("visibility", "hidden");
        $("#medium").css("opacity", 1);
      }
      if (level === "easy") {
        colors = ["blue", "aqua", "hotpink", "lime", "yellow", "indigo"];
        randomCode();
        $(".settingsBox").css("visibility", "hidden");
        for (i = 6; i <= 9; i++) {
          $(".instructions").children().eq(i).css("visibility", "hidden");
        }
      }
      if (level === "hard") {
        colors = [
          "blue",
          "aqua",
          "hotpink",
          "lime",
          "yellow",
          "indigo",
          "red",
          "black",
          "teal",
          "saddlebrown",
        ];
        randomCode();
        $(".settingsBox").css("visibility", "hidden");
      }
    });

  function randomCode() {
    for (let i = 0; i <= 3; i++) {
      let random = Math.floor(Math.random() * colors.length);
      let keyBox = $(".key" + i);
      keyBox.addClass(colors[random]);
    }
  }

  let instructions = $(".instructions");

  let newCoinSound = new Audio("./sounds/newCoin.mp3");
  let samePositionSound = new Audio("./sounds/samePosition.mp3");
  let sameColorSound = new Audio("./sounds/sameColor.mp3");
  let wrongSound = new Audio("./sounds/wrong.mp3");
  let backgroudSound = new Audio("./sounds/background.mp3");
  backgroudSound.controls = true;
  let isPlaying = false;
  let effects = true;

  $("#checkButton").on("click", function (e) {
    let resultsHoles = $(".r" + target).children();
    var sameColor = 0;
    var samePosition = 0;
    let rowToCheck = $(".row" + target);

    for (let i = 0; i < rowToCheck.length; i++) {
      if (rowToCheck.eq(i).prop("classList").length < 3) {
        $("#alert").css("visibility", "visible");
        return;
      }
    }
    let keyRow = $(".key");
    let keysToCheck = [true, true, true, true];
    let combinations = {};
    let positionsToCheck = 4;

    for (var i = 0; i <= 3; i++) {
      if (
        rowToCheck.eq(i) &&
        rowToCheck.eq(i).prop("classList")[2] ===
          keyRow.eq(i).prop("classList")[3]
      ) {
        samePosition++;
        positionsToCheck--;
        if (!keysToCheck[i]) {
          let dobleCheck = combinations[i];
          if (dobleCheck || dobleCheck == 0) {
            for (let k = 0; k <= 3; k++) {
              if (
                $(rowToCheck[dobleCheck]).prop("classList")[2] ===
                  keyRow.eq(k).prop("classList")[3] &&
                keysToCheck[k]
              ) {
                keysToCheck[k] = false;
                sameColor++;
              }
            }
          }
          sameColor--;
        }
        keysToCheck[i] = false;
        continue;
      }
      for (var j = 0; j <= 3; j++) {
        if (positionsToCheck + i < 4) {
          continue;
        }
        if (
          rowToCheck.eq(i) &&
          rowToCheck.eq(i).prop("classList")[2] ===
            keyRow.eq(j).prop("classList")[3] &&
          keysToCheck[j]
        ) {
          if (i != j) {
            sameColor++;
            positionsToCheck--;
            keysToCheck[j] = false;
            combinations[j] = i;
            j = 4;
          }
        }
      }
    }
    if (samePosition == 4) {
      $("#keys").css("visibility", "visible");
      $("#victory").css("visibility", "visible");
      return;
    }
    for (let i = 0; i < resultsHoles.length; i++) {
      if (
        !resultsHoles.eq(i).hasClass("yellow") &&
        !resultsHoles.eq(i).hasClass("green")
      )
        if (!samePosition && !sameColor && effects) {
          wrongSound.play();
        }
      {
        if (samePosition > 0) {
          resultsHoles.eq(i).addClass("green");
          samePosition--;
          if (effects) {
            samePositionSound.play();
          }
        } else {
          if (sameColor > 0) {
            resultsHoles.eq(i).addClass("yellow");
            sameColor--;
            if (effects) {
              sameColorSound.play();
            }
          }
        }
      }
    }
    if (target >= 1) {
      target--;
    } else {
      $("#gameOver").css("visibility", "visible");
    }
  });

  $(".column").on("click", function (e) {
    var col = $(e.currentTarget);
    var targetSlot = col.children();
    for (let i = 0; i < colors.length; i++) {
      if (targetSlot.eq(target).hasClass(colors[i])) {
        targetSlot.eq(target).removeClass(colors[i]);
        targetSlot.eq(target).addClass(colors[i + 1]);
        if (effects) {
          newCoinSound.play();
        }
        return;
      }
    }
    targetSlot.eq(target).addClass(colors[0]);
    if (effects) {
      newCoinSound.play();
    }
  });

  $(".reload").on("click", function () {
    location.reload();
  });

  $(".close").on("click", function () {
    $("#alert").css("visibility", "hidden");
  });

  $("#info").on("click", function () {
    $(".legendBox").css("visibility", "visible");
  });

  $(".x").on("click", function () {
    if (!level) {
      return;
    }
    $(".legendBox").css("visibility", "hidden");
    $(".settingsBox").css("visibility", "hidden");
  });

  instructions.children().on("click", function (e) {
    if (!!e.currentTarget.id) {
      return;
    }
    let rowToCheck = $(".row" + target);
    for (let i = 0; i < rowToCheck.length; i++) {
      if (rowToCheck.eq(i).prop("classList").length < 3) {
        rowToCheck.eq(i).addClass($(e.target).prop("classList")[1]);
        if (effects) {
          newCoinSound.play();
        }
        break;
      }
    }
  });
  $("#music").on("click", function () {
    if (!isPlaying) {
      backgroudSound.play();
      isPlaying = true;
      $("#music").html("PAUSE BACKGROUND MUSIC");
      return;
    }
    if (isPlaying) {
      console.log("isPlaying", isPlaying);
      backgroudSound.pause();
      isPlaying = false;
      $("#music").html("PLAY BACKGROUND MUSIC");
    }
  });

  $("#settings").on("click", function () {
    $(".settingsBox").css("visibility", "visible");
  });

  $("#effects").on("click", function () {
    if (effects) {
      effects = false;
      $("#effects").html("SOUND EFFECTS ON");
      return;
    }
    if (!effects) {
      effects = true;
      $("#effects").html("SOUND EFFECTS OFF");
    }
  });
})();
