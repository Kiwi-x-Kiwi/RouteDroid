const DEFAULT_MARGIN = "0";
const DRAG_OVER_MARGIN = "10px";

let dragElem;
let eClone;

function addWaypoint() {
  const waypointsList = document.getElementById("waypoints-list");

  const newWaypointValue = document.getElementById("add-waypoints").value;

  const newLi =
    `<li draggable = "true" class = "waypoints"><input type="text" id="waypoints" name="waypoints" value="${newWaypointValue}"></li>`

  waypointsList.innerHTML += newLi;

  const waypoints = document.getElementsByClassName("waypoints")
  for (let i = 0; i < waypoints.length; i++) {
    initializeWaypoint(waypoints[i]);
  }
}

function dragStart(e) {
  // e.preventDefault();
  e.dataTransfer.setData("text", e.target);
  dragElem = e.target;
  eClone = e.target.cloneNode(true);
  eClone.style = "position: absolute; top: -150px;";
  document.body.appendChild(eClone);
  e.dataTransfer.setDragImage(eClone, 0, 0);
}

function dragOver(e) {
  e.preventDefault();
  e.target.style.marginTop = DRAG_OVER_MARGIN;

}

function dragLeave(e) {
  e.preventDefault();
  e.target.style.marginTop = DEFAULT_MARGIN;
}

function drop(e) {
  e.preventDefault();
  e.target.parentNode.before(dragElem);
  e.target.style.marginTop = DEFAULT_MARGIN;
  // eClone.remove();
}

function dragEnd(e) {
  e.preventDefault();
  eClone.remove();
}

function initializeWaypoint(node){
  node.addEventListener("dragstart", e => {
    dragStart(e);
  })
  node.addEventListener("dragover", e => {
    dragOver(e);
  })
  node.addEventListener("dragleave", e => {
    dragLeave(e);
  })
  node.addEventListener("drop", e => {
    drop(e);
  })
  node.addEventListener("dragend", e => {
    dragEnd(e);
  })
}

document.addEventListener('DOMContentLoaded', () =>{
  // const query = window.location.search.slice(1);
  // console.log(query);

  document.getElementById("route-form").addEventListener("keydown", e =>{
    if(e.key == "Enter"){
      e.preventDefault();
    }
  })

  document.getElementById("add-waypoints").addEventListener("keyup", e =>{
    if(e.key == "Enter"){
      const newWaypoint = addWaypoint();
      // initializeWaypoint(newWaypoint)
    }
  })

  document.getElementById("add-waypoints-btn").addEventListener("click", e => {
    const newWaypoint = addWaypoint();
    // initializeWaypoint(newWaypoint)
  })

  let waypoints = document.getElementsByClassName("waypoints");
  for (let i = 0; i < waypoints.length; i++) {
    initializeWaypoint(waypoints[i]);
  }
})

