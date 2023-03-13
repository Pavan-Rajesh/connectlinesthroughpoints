const body = document.getElementsByTagName("body")[0];
let previousX = 0;
let previousY = 0;
let startNew = false;

const dotAppender = (e) => {
  // console.log("clicked");
  const clientX = e.clientX;
  const clientY = e.clientY;
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.left = `${clientX}px`;
  dot.style.top = `${clientY}px`;
  body.appendChild(dot);
  drawLine(clientX, clientY);
};

body.addEventListener("click", dotAppender);

const drawLine = (x1, y1) => {
  const line = document.createElement("div");
  line.classList.add("line");
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;

  let lineHeight = Math.sqrt(
    Math.pow(x1 - previousX, 2) + Math.pow(y1 - previousY, 2)
  );
  line.style.height = `${lineHeight}px`;
  // console.log(x1, y1, previousX, previousY);
  if (x1 < previousX) {
    line.style.left = `${previousX}px`;
    line.style.top = `${previousY}px`;
  }
  const angleRadian = Math.atan((y1 - previousY) / (x1 - previousX));
  const angleDegree = (angleRadian * 180) / Math.PI;
  // console.log(angleDegree);
  line.style.transform = `rotate(${angleDegree + 90}deg)`;
  previousX = x1;
  previousY = y1;
  if (startNew === true) {
    line.style.height = `0px`;
    startNew = false;
    console.log(startNew);
  }
  body.appendChild(line);
};

const undoButton = document.getElementById("undo");

undoButton.addEventListener("click", removeLine);

function removeLine(e) {
  e.stopPropagation();

  body.lastChild.remove();
  body.lastChild.remove();
  const lastLine = body.lastChild;
  previousX = parseInt(lastLine.style.left);
  previousY = parseInt(lastLine.style.top);
}

const drop = document.getElementById("drop");

drop.addEventListener("click", (e) => {
  console.log("line drop");
  e.stopPropagation();
  startNew = true;
});

const backgroundRemover = document.getElementById("bgButton");
backgroundRemover.addEventListener("click", removeBackground);
function removeBackground(e) {
  e.stopPropagation();
  body.style.backgroundImage = "none";
}

document.getElementById("savePNG").addEventListener("click", function (e) {
  e.stopPropagation();
  html2canvas(body, {
    onrendered: function (canvas) {
      // document.body.appendChild(canvas);
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
});
